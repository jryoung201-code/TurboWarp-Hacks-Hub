// TurboClone X v2.1 — TurboWarp Extension
// Author: ScratchDev99
(function () {
  class TurboCloneX {
    getInfo() {
      return {
        id: 'turboclonex',
        name: 'TurboClone X',
        blocks: [
          {
            opcode: 'setCloneLimit',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set clone limit to [LIMIT]',
            arguments: {
              LIMIT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 500 }
            }
          },
          {
            opcode: 'getCloneCount',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clone count'
          }
        ]
      };
    }
    setCloneLimit({ LIMIT }) {
      Scratch.vm.runtime.runtimeOptions.maxClones = Math.max(1, Math.min(2048, LIMIT));
    }
    getCloneCount() {
      return Scratch.vm.runtime._cloneCounter;
    }
  }
  Scratch.extensions.register(new TurboCloneX());
})();
