import Phaser from "phaser";

export const createPortalAnims = (
  anims: Phaser.Animations.AnimationManager
) => {
  anims.create({
    key: "portal-animate",
    frames: anims.generateFrameNames("portal", {
      start: 0,
      end: 104,
      prefix: "convert",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 14,
  });
};
