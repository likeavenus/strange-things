import { Scene } from "phaser";
import { Wizard } from "../characters/wizard/Wizard";
import { COLLISION_CATEGORIES } from "../constants";
import { Heretic } from "../characters/heretic/Heretic";
import { Mimic } from "../characters/mimic/Mimic";
import { CRTShader } from "../shaders/crt/crt";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  wizard: Wizard;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  projectiles!: Phaser.GameObjects.Group;
  light!: Phaser.GameObjects.Light;
  heretic!: Heretic;
  hereticGroup!: Phaser.GameObjects.Group;
  isCutscene = false;
  mimic!: Mimic;
  currentMusic!: Phaser.Sound.BaseSound;
  randomSound!: Phaser.Sound.BaseSound;

  private topBlackBars!: Phaser.GameObjects.Rectangle;
  private bottomBlackBars!: Phaser.GameObjects.Rectangle;

  constructor() {
    super("Game");
  }

  preload() {
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  initMusic() {
    this.currentMusic = this.sound.add("mysterious-dungeons-ambiance", {
      volume: 0.5,
    });
    //this.currentMusic = this.sound.add("dungeon", {});

    // this.randomSound = this.sound.add("creepy-demon-heavy-breathing", {});
    this.randomSound = this.sound.add("creepy-demon-heavy-breathing", {
      volume: 0.7,
    });

    this.time.addEvent({
      loop: true,
      delay: 20000,
      callback: () => {
        this.randomSound.play();
      },
    });

    this.currentMusic.play();
  }

  createPlatform(x: number, y: number, vertically: boolean) {
    const platform = this.matter.add.image(x, y, "platform", undefined, {
      isStatic: true,
      label: "platform",
    });

    platform.setPipeline("Light2D");

    if (vertically) {
      this.tweens.add({
        targets: platform,
        y: platform.y - 1000,
        yoyo: true,
        duration: 4000,
        repeat: -1,
        ease: "ease",
      });
    } else {
      this.tweens.add({
        targets: platform,
        y: platform.x - 1000,
        yoyo: true,
        duration: 4000,
        repeat: -1,
        ease: "ease",
      });
    }
  }

  createMap() {
    const map = this.make.tilemap({
      key: "map",
      tileHeight: 64,
      tileWidth: 64,
    });

    const tileset = map.addTilesetImage(
      "brick", // имя в json файле
      "tileset",
      64,
      64
    ) as Phaser.Tilemaps.Tileset;
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const platformsLayer = map.createLayer("platforms", tileset, 0, 0);
    const handle1Layer = map.createLayer("handle1", tileset, 0, 0);

    [groundLayer, platformsLayer, handle1Layer].forEach((item) => {
      const layerName = item?.layer.name;
      item?.setName(layerName);

      item?.setCollisionByProperty({ collides: true });

      if (layerName === "ground") {
        item?.setCollisionCategory(COLLISION_CATEGORIES.Ground);
      }
      if (layerName === "platforms") {
        item?.setCollisionCategory(COLLISION_CATEGORIES.Platforms);
      }
      item?.setCollidesWith([
        COLLISION_CATEGORIES.Player,
        COLLISION_CATEGORIES.Projectile,
        COLLISION_CATEGORIES.Enemy,
      ]);
      item?.setPipeline("Light2D");
      this.matter.world.convertTilemapLayer(
        item as Phaser.Tilemaps.TilemapLayer
      );
    });
  }

  createTorch(x: number, y: number) {
    this.anims.create({
      key: "torch1",
      frames: this.anims.generateFrameNames("torch1", {
        start: 10,
        end: 12,
        prefix: "bigtorchlit",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 9,
    });

    const torch1 = this.matter.add.sprite(x, y, "torch1", undefined, {
      isStatic: true,
    });
    torch1.setScale(1.5);

    torch1.setPipeline("Light2D");
    torch1.anims.play("torch1");
    this.lights.addLight(torch1.x, torch1.y - 100, 512, undefined, 2);
    torch1.setCollisionCategory(COLLISION_CATEGORIES.Torch);
  }

  create() {
    this.initMusic();
    this.camera = this.cameras.main;
    this.camera.setZoom(0.9);
    this.camera.fadeIn(1000);
    this.camera.setPostPipeline(new CRTShader(this.game));
    this.lights.enable();
    this.projectiles = this.add.group();

    this.createPlatform(1290, 2800, true);

    this.createTorch(150, 2975);
    this.createTorch(1050, 2975);
    this.createTorch(2350, 3100);
    this.createTorch(1000, 1060);
    this.createTorch(3700, 2850);

    this.wizard = new Wizard(this, 90, 2975, "wizard_idle");

    this.createMap();

    // this.camera.setDeadzone(160, 250);
    this.camera.setDeadzone(250, 250);
    this.camera.startFollow(this.wizard, true, 1, 1, -100, -30);

    this.light = this.lights.addLight(
      this.wizard.x,
      this.wizard.y,
      512,
      undefined,
      1
    );

    // this.heretic = new Heretic(this, 2500, 2900, "heretic_run");

    this.hereticGroup = this.add.group({
      classType: Heretic,
      key: "heretic",
      runChildUpdate: true,
      // setScale: { x: 3, y: 3 },
      // createMultipleCallback: () => {},
      // createCallback: (item) => {},
    });

    this.hereticGroup.get(1200, 2900);
    // this.hereticGroup.get(1900, 2900);
    // this.hereticGroup.get(2500, 2900);
    // this.hereticGroup.get(500, 500);

    this.mimic = new Mimic(this, 3600, 2900, "mimic_hidden");
    this.mimic = new Mimic(this, 600, 2900, "mimic_hidden");

    // this.heretic2 = new Heretic(this, 500, 2900, "heretic_run");
  }

  // Функция для создания кинорамок
  private createBlackBars() {
    const width = this.cameras.main.width;
    const height = 100; // Высота каждой полоски

    // Создаем верхнюю барруку вне экрана
    this.topBlackBars = this.add
      .rectangle(width / 2, -height / 2, width, height, 0x000000)
      .setOrigin(0.5, 0)
      .setDepth(1000);

    // Создаем нижнюю барруку вне экрана
    this.bottomBlackBars = this.add
      .rectangle(
        width / 2,
        this.cameras.main.height + height / 2,
        width,
        height,
        0x000000
      )
      .setOrigin(0.5, 1)
      .setDepth(1000);

    // Анимируем появление кинорамок
    this.tweens.add({
      targets: this.topBlackBars,
      y: 0,
      duration: 1000,
      ease: "Power2",
    });

    this.tweens.add({
      targets: this.bottomBlackBars,
      y: this.cameras.main.height,
      duration: 1000,
      ease: "Power2",
    });
  }

  update(time: number, delta: number): void {
    this.wizard.update(this.cursors, time);
    this.mimic.update(this.cursors);
    // this.hereticGroup.children.clear
    // this.heretic.update(this.cursors);

    // if (this.light) {
    //   this.light.setPosition(this.wizard.x - 20, this.wizard.y - 20);
    // }
    this.projectiles.children.each(function (sphere) {
      sphere.update();
    }, this);
  }
}
