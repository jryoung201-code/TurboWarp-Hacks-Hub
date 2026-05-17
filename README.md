# ⚡ TurboWarp Ext Hub

A GitHub Pages website for sharing TurboWarp extensions, hacks, and mods.

## 📁 Folder Structure

```
turbowarp-hub/
├── index.html          ← the website
├── extensions.json     ← list of all extensions (you edit this)
├── uploads/            ← all .js extension files go here
│   ├── turboclone_x.js
│   ├── god_mode.js
│   └── custom_blocks_plus.js
└── README.md
```

## 🚀 How to set up on GitHub Pages

1. Create a new GitHub repo (e.g. `turbowarp-hub`)
2. Upload all these files keeping the same folder structure
3. Go to **Settings → Pages → Source → main branch → / (root)**
4. Your site will be live at `https://yourusername.github.io/turbowarp-hub/`

## ➕ Adding a new extension

1. Put your `.js` file in the `uploads/` folder
2. Add an entry to `extensions.json`:

```json
{
  "id": 4,
  "name": "My Extension",
  "author": "YourName",
  "desc": "What it does.",
  "type": "extension",
  "emoji": "🎮",
  "downloads": 0,
  "rating": 0,
  "reviews": 0,
  "tags": ["tag1", "tag2"],
  "file": "uploads/my_extension.js",
  "versions": [
    { "v": "v1.0", "date": "May 2026", "notes": "Initial release", "file": "uploads/my_extension.js" }
  ]
}
```

3. Commit and push — the site updates automatically!

## 🛠 Extension types

| Type | Description |
|------|-------------|
| `extension` | Adds new blocks to TurboWarp |
| `hack` | Modifies TurboWarp internals/limits |
| `mod` | Reskins or tweaks the TurboWarp UI |

## 📝 Accepting community submissions

Tell users to open a **Pull Request** adding their `.js` to `uploads/` and their entry to `extensions.json`. Review and merge to publish!

## 🔐 Login System

### Default credentials
| username | password | role |
|----------|----------|------|
| `admin` | `turboadmin2026` | admin |
| `moderator` | *(not set)* | moderator |

**Change your password immediately after first deploy!**

### How to change/set a password
1. Open `setup.html` in your browser
2. Enter your username and new password
3. Click **generate hash**
4. Copy the SHA-256 hash shown
5. Paste it into `users.json` as `"passwordHash": "..."`
6. Commit and push

### How it works
- Passwords are hashed with **SHA-256** via the Web Crypto API (no server needed)
- Salt format: `username:password` (prevents rainbow table attacks)
- Sessions stored in `localStorage`, expire after **24 hours**
- Failed login attempts are counted — **5 failures = 5 minute lockout**
- The raw password is never stored anywhere

### Adding users
Add entries to `users.json`:
```json
{
  "id": 3,
  "username": "newmod",
  "passwordHash": "<generated via setup.html>",
  "role": "moderator",
  "createdAt": "2026-05-17"
}
```
Roles: `admin` (can assign trusted tags) · `moderator` (approve/reject only)
