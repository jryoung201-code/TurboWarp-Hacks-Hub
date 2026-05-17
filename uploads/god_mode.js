// God Mode Hack v1.3 — TurboWarp Hack
// Author: h4x0rKid
// WARNING: Use with caution. May freeze editor on heavy scripts.
(function () {
  class GodMode {
    getInfo() {
      return {
        id: 'godmodehack',
        name: 'God Mode',
        blocks: [
          {
            opcode: 'enableGodMode',
            blockType: Scratch.BlockType.COMMAND,
            text: 'enable god mode'
          },
          {
            opcode: 'disableGodMode',
            blockType: Scratch.BlockType.COMMAND,
            text: 'disable god mode'
          },
          {
            opcode: 'isGodMode',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'god mode enabled?'
          }
        ]
      };
    }
    enableGodMode() {
      Scratch.vm.runtime.runtimeOptions.fencing = false;
      Scratch.vm.runtime.runtimeOptions.miscLimits = false;
    }
    disableGodMode() {
      Scratch.vm.runtime.runtimeOptions.fencing = true;
      Scratch.vm.runtime.runtimeOptions.miscLimits = true;
    }
    isGodMode() {
      return !Scratch.vm.runtime.runtimeOptions.miscLimits;
    }
  }
  Scratch.extensions.register(new GodMode());
})();
