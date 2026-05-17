// Custom Blocks+ v3.0 — TurboWarp Mod
// Author: blocksmaster
(function () {
  class CustomBlocksPlus {
    getInfo() {
      return {
        id: 'customblocksplus',
        name: 'Custom Blocks+',
        color1: '#9C27B0',
        color2: '#7B1FA2',
        blocks: [
          {
            opcode: 'colorBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: 'color [COLOR]',
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: '#ff0000' }
            }
          },
          {
            opcode: 'clamp',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clamp [VAL] between [MIN] and [MAX]',
            arguments: {
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: 'lerp',
            blockType: Scratch.BlockType.REPORTER,
            text: 'lerp from [A] to [B] by [T]',
            arguments: {
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              T: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 }
            }
          }
        ]
      };
    }
    colorBlock({ COLOR }) { return COLOR; }
    clamp({ VAL, MIN, MAX }) { return Math.min(Math.max(VAL, MIN), MAX); }
    lerp({ A, B, T }) { return A + (B - A) * T; }
  }
  Scratch.extensions.register(new CustomBlocksPlus());
})();
