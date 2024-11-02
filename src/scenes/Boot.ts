import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image("background", "assets/bg.png");
  }

  create() {
    // this.scene.start("Game");
    this.add.text(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "Start"
    );
    this.input.once("pointerdown", () => {
      this.cameras.main.fadeOut(800);
      this.time.delayedCall(800, () => {
        this.scene.start("Home");
      });
    });
  }
}
