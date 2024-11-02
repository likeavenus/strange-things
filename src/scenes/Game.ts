import { Scene } from "phaser";
import { Wizard } from "../characters/wizard/Wizard";
import { COLLISION_CATEGORIES, papersDungeon } from "../constants";
import { Heretic } from "../characters/heretic/Heretic";
import { Mimic } from "../characters/mimic/Mimic";
import { CRTShader } from "../shaders/crt/crt";
import { PaperNineSlice } from "../gameobjects/Scroll/Scroll";
import { VortexPostFX } from "../shaders/teleportEffect/TeleportEffect";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  wizard: Wizard;
  /** Картинка свитка с мастшабированием nineslice */
  paper: PaperNineSlice;
  /** Текущий текст свитка считываемый у */
  currentText: string = "";
  /** Объект текста в свитке */
  paperTextObject: Phaser.GameObjects.Text;
  /** Группа свитков разбросанных оп уровню */
  private papersGroup: Phaser.GameObjects.Group;
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

  toggleTextInPaper(e) {
    if (e.code === "Escape" || e.code === "KeyE") {
      this.paperTextObject.setText(this.currentText);
      this.paperTextObject.setVisible(
        this.paperTextObject.visible ? false : true
      );
    }
  }

  /** TODO: не работате обратная анимация телепорта */
  initPortalEffect() {
    const vortexPipeline = new VortexPostFX(this.game, 4);
    this.cameras.main.setPostPipeline(vortexPipeline);
    // const pipeline = this.cameras.main.getPostPipeline(
    //   "VortexPostFX"
    // ) as VortexPostFX;
    console.log("vortexPipeline: ", vortexPipeline);
    // vortexPipeline.setTime(maxTime);
    vortexPipeline.setTimeDirection(-1);
  }

  create() {
    this.initMusic();
    this.createPaperScroll();
    this.createInfoPapers();
    // this.initPortalEffect();

    this.input.keyboard?.on("keydown", this.toggleTextInPaper, this);
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

    this.hereticGroup = this.add.group({
      classType: Heretic,
      key: "heretic",
      runChildUpdate: true,
      createCallback(item: Heretic) {
        item.setPosition(1000, 2900);
      },
    });

    this.mimic = new Mimic(this, 3600, 2900, "mimic_hidden");
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

  createPaperScroll() {
    this.paper = new PaperNineSlice(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      "paper",
      undefined,
      600,
      700,
      32,
      32,
      32,
      32
    );

    this.paperTextObject = this.add.text(
      //   this.paper.width / 2,
      //   this.paper.height / 3,
      this.scene.scene.game.canvas.width / 2 - 180,
      this.scene.scene.game.canvas.height / 3.2,

      this.currentText,
      {
        fontFamily: "Georgia", // Ваш шрифт
        fontSize: "20px", // Размер шрифта
        color: "#000000", // Цвет текста
        wordWrap: { width: this.paper.width - 205, useAdvancedWrap: true }, // Перенос слов
        align: "left", // Выравнивание текста
      }
    );
    this.paperTextObject.setScrollFactor(0).setVisible(false);

    this.paperTextObject.setDepth(300);
  }

  /** создание + разброс свитков по карте */
  createInfoPapers() {
    this.papersGroup = this.add.group();

    for (let i = 0; i < papersDungeon.length; i++) {
      const obj = this.matter.add.image(
        papersDungeon[i].x,
        papersDungeon[i].y,
        "info-paper",
        undefined,
        {
          isStatic: true,
          isSensor: true,
          label: "info-paper",
        }
      );
      obj.setData("paper-text", papersDungeon[i].text);
      obj.setName("info-paper").setScale(0.03).setDepth(150);
      this.papersGroup.add(obj);

      // this.matter.world.on(
      //   "collisionstart",
      //   (event) => {
      //     event.pairs.forEach((pair) => {
      //       var bodyA = pair.bodyA;
      //       var bodyB = pair.bodyB;
      //       var gameObjectA = bodyA.gameObject;
      //       var gameObjectB = bodyB.gameObject;

      //       if (
      //         (gameObjectA === this.wizard &&
      //           this.papersGroup.contains(gameObjectB)) ||
      //         (gameObjectB === this.wizard &&
      //           this.papersGroup.contains(gameObjectA))
      //       ) {
      //         var collidedImage = this.papersGroup.contains(gameObjectA)
      //           ? gameObjectA
      //           : gameObjectB;

      //         if (collidedImage && collidedImage.active) {
      //           // collidedImage.destroy();
      //           // this.papersGroup.remove(collidedImage);
      //         }
      //       }
      //     });
      //   },
      //   this
      // );
    }
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

    let isNearAnyItem = false;

    this.papersGroup.getChildren().forEach((item) => {
      const typedItem = item as Phaser.Physics.Matter.Image;

      if (
        Phaser.Math.Distance.Between(
          this.wizard.x,
          this.wizard.y,
          typedItem.x,
          typedItem.y
        ) < 100
      ) {
        this.wizard.eKeyText
          .setPosition(typedItem.x, typedItem.y - 120)
          .setVisible(true);
        this.currentText = item.getData("paper-text");

        // Устанавливаем флаг, что мы рядом с хотя бы одним свитком
        isNearAnyItem = true;
      }
    });

    // Если после проверки всех свитков мы не рядом ни с одним
    if (!isNearAnyItem) {
      this.wizard.eKeyText.setVisible(false);
      this.currentText = "";
    }
  }
}
