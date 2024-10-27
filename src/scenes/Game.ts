import { Scene } from "phaser";
import { Wizard } from "../characters/wizard/Wizard";
import { COLLISION_CATEGORIES } from "../constants";
import { Heretic } from "../characters/heretic/Heretic";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  wizard: Wizard;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  projectiles!: Phaser.GameObjects.Group;
  light!: Phaser.GameObjects.Light;
  heretic!: Heretic;

  constructor() {
    super("Game");
  }

  preload() {
    this.cursors = this.input.keyboard!.createCursorKeys();
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

    [groundLayer, platformsLayer, handle1Layer].map((item) => {
      const layerName = item?.layer.name;
      item?.setName(layerName);

      //   item?.setName("ground");
      item?.setCollisionByProperty({ collides: true });

      if (layerName === "ground") {
        item?.setCollisionCategory(COLLISION_CATEGORIES.Ground);

        // item?.tileset?.[0].texCoordinates.forEach((tile) => {
        //   const torch1 = this.matter.add.image(
        //     tile.x,
        //     tile.y + 3000,
        //     "torch1",
        //     undefined,
        //     {
        //       isStatic: true,
        //     }
        //   );

        //   console.log(tile);

        //   torch1.setPipeline("Light2D");
        //   torch1.setCollisionCategory(COLLISION_CATEGORIES.Torch);
        // });
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

    // this.tweens.add({
    //   targets: handle1Layer,
    //   y: handle1Layer?.y - 600,
    //   yoyo: true,
    //   duration: 5000,
    //   repeat: -1,
    //   ease: "ease",
    // });
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
    this.camera = this.cameras.main;
    this.lights.enable();
    this.projectiles = this.add.group();

    this.createPlatform(1290, 2800, true);

    this.createTorch(150, 2975);
    this.createTorch(1050, 2975);
    this.createTorch(2350, 2975);

    this.wizard = new Wizard(this, 90, 2900, "wizard_idle");

    this.createMap();

    this.camera.setDeadzone(160, 250);
    this.camera.startFollow(this.wizard, true, 1, 1, -200, 0);

    this.light = this.lights.addLight(
      this.wizard.x,
      this.wizard.y,
      512,
      undefined,
      1
    );

    this.heretic = new Heretic(this, 1000, 2900, "heretic_run");

    // this.heretic2 = new Heretic(this, 3800, 2900, "heretic_run");
  }

  update(time: number, delta: number): void {
    this.wizard.update(this.cursors);
    this.heretic.update(this.cursors);

    // if (this.light) {
    //   this.light.setPosition(this.wizard.x - 20, this.wizard.y - 20);
    // }
    this.projectiles.children.each(function (sphere) {
      sphere.update();
    }, this);
  }
}
