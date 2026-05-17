// TurboWarp Hub — Auth Utilities
// Uses Web Crypto API (SHA-256) for password hashing — no server required

const Auth = (() => {
  const SESSION_KEY = 'twh_session';
  const USERS_URL = './users.json';

  // SHA-256 hash using Web Crypto API
  async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Salt + hash password: "username:password" prevents rainbow tables
  async function hashPassword(username, password) {
    return await sha256(username.toLowerCase() + ':' + password);
  }

  // Load users from users.json
  async function loadUsers() {
    try {
      const res = await fetch(USERS_URL + '?t=' + Date.now());
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  }

  // Save session to localStorage
  function saveSession(user) {
    const session = {
      userId: user.id,
      username: user.username,
      role: user.role,
      loginTime: Date.now(),
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  // Get current session (returns null if expired/missing)
  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw);
      if (Date.now() > session.expires) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return session;
    } catch (e) {
      return null;
    }
  }

  // Clear session
  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  // Attempt login — returns { success, user, error }
  async function login(username, password) {
    const users = await loadUsers();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) return { success: false, error: 'user not found' };

    // First-time setup: if no hash stored yet, reject and direct to setup
    if (!user.passwordHash) return { success: false, error: 'account not set up — visit setup.html' };

    const hash = await hashPassword(username, password);
    if (hash !== user.passwordHash) return { success: false, error: 'incorrect password' };

    const session = saveSession(user);
    return { success: true, user, session };
  }

  // Check if current user is admin
  function isAdmin() {
    const s = getSession();
    return s && s.role === 'admin';
  }

  // Check if logged in at all
  function isLoggedIn() {
    return getSession() !== null;
  }

  return { sha256, hashPassword, loadUsers, saveSession, getSession, logout, login, isAdmin, isLoggedIn };
})();
