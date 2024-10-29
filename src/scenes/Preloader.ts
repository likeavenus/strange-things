import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    // this.add.image(512, 384, "background");
    //  A simple progress bar. This is the outline of the bar.
    // this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    // const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    // this.load.on("progress", (progress: number) => {
    //   //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
    //   bar.width = 4 + 460 * progress;
    // });
  }

  loadHeretic() {
    this.load.atlas(
      "heretic_run",
      "heretic/run/Run.png",
      "heretic/run/Run.json"
    );

    this.load.atlas(
      "heretic_attack2",
      "heretic/attack2/Attack2.png",
      "heretic/attack2/Attack2.json"
    );
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");

    /** Wizard */
    this.load.image("logo", "logo.png");

    this.load.atlas(
      "wizard_idle",
      "wizard/idle/idle.png",
      "wizard/idle/idle.json"
    );

    this.load.atlas("wizard_run", "wizard/run/Run.png", "wizard/run/Run.json");
    this.load.atlas(
      "wizard_jump",
      "wizard/jump/Jump.png",
      "wizard/jump/Jump.json"
    );
    this.load.atlas(
      "wizard_fall",
      "wizard/fall/Fall.png",
      "wizard/fall/Fall.json"
    );
    this.load.atlas(
      "wizard_attack1",
      "wizard/attack1/Attack1.png",
      "wizard/attack1/Attack1.json"
    );
    this.load.atlas(
      "wizard_attack2",
      "wizard/attack2/Attack2.png",
      "wizard/attack2/Attack2.json"
    );

    this.load.atlas(
      "wizard_death",
      "wizard/death/Death.png",
      "wizard/death/Death.json"
    );

    this.load.atlas("wizard_hit", "wizard/hit/Hit.png", "wizard/hit/Hit.json");

    /** Map */
    this.load.image("tileset", "map/brick.png");
    this.load.tilemapTiledJSON("map", "map/map.json");

    this.load.image("platform", "map/platform.png");

    /** Magic */
    this.load.image("red", "wizard/magic/red.png");

    /** Torch */
    this.load.atlas("torch1", "torch/torch.png", "torch/torch.json");
    /** Heretic */
    this.loadHeretic();

    /** sound */
    this.load.audio("footstep", "wizard/footstep.mp3");
    this.load.audio(
      "creepy-demon-heavy-breathing",
      "environment/sounds/creepy-demon-heavy-breathing.wav"
    );
    this.load.audio(
      "mysterious-dungeons-ambiance",
      "environment/sounds/mysterious-dungeons-ambiance.mp3"
    );

    this.load.audio("dungeon", "environment/sounds/dungeon_.mp3");
    this.load.audio("skull-crash", "wizard/skull-crash.mp3");
    this.load.audio("mimic-attack1", "mimic/mimic-attack1.mp3");
    this.load.audio("energy-attack", "wizard/energy-attack.mp3");

    /** mimic */
    this.load.atlas(
      "mimic_hidden",
      "mimic/Mimic_Idle_Hidden.png",
      "mimic/Mimic_Idle_Hidden.json"
    );

    this.load.atlas(
      "mimic_open",
      "mimic/Mimic_Open.png",
      "mimic/Mimic_Open.json"
    );

    this.load.atlas(
      "mimic_attack1",
      "mimic/Mimic_Attack-1.png",
      "mimic/Mimic_Attack-1.json"
    );
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    // this.scene.start('MainMenu');
    this.scene.start("Boot");
  }
}
