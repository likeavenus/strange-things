import Phaser from "phaser";

export const createWizardAnims = (
  anims: Phaser.Animations.AnimationManager
) => {
  anims.create({
    key: "wizard_idle",
    frames: anims.generateFrameNames("wizard_idle", {
      start: 0,
      end: 5,
      prefix: "Idle",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "wizard_run",
    frames: anims.generateFrameNames("wizard_run", {
      start: 0,
      end: 7,
      prefix: "Run",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 14,
  });

  anims.create({
    key: "wizard_jump",
    frames: anims.generateFrameNames("wizard_jump", {
      start: 0,
      end: 1,
      prefix: "Jump",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "wizard_fall",
    frames: anims.generateFrameNames("wizard_fall", {
      start: 0,
      end: 1,
      prefix: "Fall",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  anims.create({
    key: "wizard_attack1",
    frames: anims.generateFrameNames("wizard_attack1", {
      start: 10,
      end: 17,
      prefix: "Attack",
      suffix: ".png",
    }),
    // repeat: -1,
    frameRate: 15,
  });

  anims.create({
    key: "wizard_attack2",
    frames: anims.generateFrameNames("wizard_attack2", {
      start: 20,
      end: 27,
      prefix: "Attack",
      suffix: ".png",
    }),
    // repeat: -1,
    frameRate: 15,
  });

  anims.create({
    key: "wizard_death",
    frames: anims.generateFrameNames("wizard_death", {
      start: 0,
      end: 6,
      prefix: "Death",
      suffix: ".png",
    }),
    // repeat: -1,
    frameRate: 11,
  });

  anims.create({
    key: "wizard_hit",
    frames: anims.generateFrameNames("wizard_hit", {
      start: 0,
      end: 3,
      prefix: "Hit",
      suffix: ".png",
    }),
    // repeat: -1,
    frameRate: 11,
  });
};
