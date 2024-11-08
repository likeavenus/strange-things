import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { Preloader } from "./scenes/Preloader";
import { Game, Types } from "phaser";
import { CRTShader } from "./shaders/crt/crt";
import { Home } from "./scenes/Home";
import { VortexPostFX } from "./shaders/teleportEffect/TeleportEffect";
// import { TeleportShader } from "./shaders/teleportEffect/TeleportEffect";
// import { CRTShader } from "./shaders/crt/crt";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: innerWidth,
  // height: 768,
  parent: "game-container",
  scale: {
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "matter",
    matter: {
      // debug: true,
      // gravity: new Math.Vector2(1, 2),
      gravity: {
        y: 2,
      },
    },
  },
  pipeline: {
    CRTShader,
    VortexPostFX,
  },

  // scene: [Preloader, Boot, MainGame],
  scene: [Preloader, Boot, Home, MainGame],
};

const game = new Game(config);

export default game;
