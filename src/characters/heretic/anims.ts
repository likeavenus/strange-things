import Phaser from "phaser";

export const createHereticAnims = (
  anims: Phaser.Animations.AnimationManager
) => {
  //   anims.create({
  //     key: "wizard_idle",
  //     frames: anims.generateFrameNames("wizard_idle", {
  //       start: 0,
  //       end: 5,
  //       prefix: "Idle",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  anims.create({
    key: "heretic_run",
    frames: anims.generateFrameNames("heretic_run", {
      start: 0,
      end: 7,
      prefix: "Run",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 10,
  });

  //   anims.create({
  //     key: "wizard_jump",
  //     frames: anims.generateFrameNames("wizard_jump", {
  //       start: 0,
  //       end: 1,
  //       prefix: "Jump",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   anims.create({
  //     key: "wizard_fall",
  //     frames: anims.generateFrameNames("wizard_fall", {
  //       start: 0,
  //       end: 1,
  //       prefix: "Fall",
  //       suffix: ".png",
  //     }),
  //     repeat: -1,
  //     frameRate: 10,
  //   });

  //   anims.create({
  //     key: "wizard_attack1",
  //     frames: anims.generateFrameNames("wizard_attack1", {
  //       start: 10,
  //       end: 17,
  //       prefix: "Attack",
  //       suffix: ".png",
  //     }),
  //     // repeat: -1,
  //     frameRate: 15,
  //   });

  anims.create({
    key: "heretic_attack2",
    frames: anims.generateFrameNames("heretic_attack2", {
      start: 20,
      end: 27,
      prefix: "Attack",
      suffix: ".png",
    }),
    // repeat: -1,
    frameRate: 15,
  });
};
