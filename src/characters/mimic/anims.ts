import Phaser from "phaser";

export const createMimicAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: "mimic_hidden",
    // frames: anims.generateFrameNames("mimic_hidden", {
    //   start: 0,
    //   end: 3,
    //   prefix: "Mimic_Idle_Hidden",
    //   suffix: ".png",
    // }),
    frames: [
      { key: "mimic_hidden", frame: "Mimic_Idle_Hidden0.png", duration: 1500 }, // Первый кадр - 200 мс
      { key: "mimic_hidden", frame: "Mimic_Idle_Hidden1.png", duration: 200 }, // Второй кадр - 200 мс
      { key: "mimic_hidden", frame: "Mimic_Idle_Hidden2.png", duration: 1500 }, // Третий кадр - 1000 мс (1 секунда)
      { key: "mimic_hidden", frame: "Mimic_Idle_Hidden3.png", duration: 200 }, // Четвёртый кадр - 200 мс
    ],
    repeat: -1,
    frameRate: 10,
    duration: 3000,
  });

  anims.create({
    key: "mimic_open",
    frames: anims.generateFrameNames("mimic_open", {
      start: 0,
      end: 3,
      prefix: "Chest",
      suffix: ".png",
    }),
    // repeat: -1,
    frameRate: 10,
    duration: 1000,
  });

  anims.create({
    key: "mimic_attack1",
    frames: anims.generateFrameNames("mimic_attack1", {
      start: 10,
      end: 13,
      prefix: "Mimic_Attack-",
      suffix: ".png",
    }),
    // repeat: -1,
    frameRate: 9,
    duration: 1000,
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

  //   anims.create({
  //     key: "wizard_attack2",
  //     frames: anims.generateFrameNames("wizard_attack2", {
  //       start: 20,
  //       end: 27,
  //       prefix: "Attack",
  //       suffix: ".png",
  //     }),
  //     // repeat: -1,
  //     frameRate: 15,
  //   });

  //   anims.create({
  //     key: "wizard_death",
  //     frames: anims.generateFrameNames("wizard_death", {
  //       start: 0,
  //       end: 6,
  //       prefix: "Death",
  //       suffix: ".png",
  //     }),
  //     // repeat: -1,
  //     frameRate: 11,
  //   });

  //   anims.create({
  //     key: "wizard_hit",
  //     frames: anims.generateFrameNames("wizard_hit", {
  //       start: 0,
  //       end: 3,
  //       prefix: "Hit",
  //       suffix: ".png",
  //     }),
  //     // repeat: -1,
  //     frameRate: 11,
  //   });
};
