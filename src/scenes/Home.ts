import Phaser from "phaser";
import { Wizard } from "../characters/wizard/Wizard";
import { COLLISION_CATEGORIES, papersCoords } from "../constants";
import { Portal } from "../gameobjects/Portal/Portal";
import { PaperNineSlice } from "../gameobjects/Scroll/Scroll";

export class Home extends Phaser.Scene {
  wizard: Wizard;
  portal: Portal;
  camera: Phaser.Cameras.Scene2D.Camera;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  /** Картинка свитка с мастшабированием nineslice */
  paper: PaperNineSlice;
  /** Текущий текст свитка считываемый у */
  currentText: string = "";
  /** Объект текста в свитке */
  paperTextObject: Phaser.GameObjects.Text;
  /** Группа свитков разбросанных оп уровню */
  private papersGroup: Phaser.GameObjects.Group;

  startNoiseActive = true;

  constructor() {
    super("Home");
  }

  init() {
    this.cameras.main.fadeOut(0);
  }

  preload() {
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  addBgMusic() {
    this.sound.play("dark-ambient-bg", { volume: 1 });
  }

  addBackground() {
    const bgSky = this.add.image(1240, 1000, "home-bg-1");
    bgSky.setScale(5, 4).setDepth(0);
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
    torch1.setScale(1).setDepth(150);

    torch1.setPipeline("Light2D");
    torch1.anims.play("torch1");
    this.lights.addLight(torch1.x, torch1.y - 50, 512, undefined, 2);
    torch1.setCollisionCategory(COLLISION_CATEGORIES.Torch);
  }
  /** создание картинки свитка */
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

    for (let i = 0; i < papersCoords.length; i++) {
      const obj = this.matter.add.image(
        papersCoords[i].x,
        papersCoords[i].y,
        "info-paper",
        undefined,
        {
          isStatic: true,
          isSensor: true,
          label: "info-paper",
        }
      );
      obj.setData("paper-text", papersCoords[i].text);
      obj.setName("info-paper").setScale(0.03).setDepth(150);
      this.papersGroup.add(obj);

      this.matter.world.on(
        "collisionstart",
        (event) => {
          event.pairs.forEach((pair) => {
            var bodyA = pair.bodyA;
            var bodyB = pair.bodyB;
            var gameObjectA = bodyA.gameObject;
            var gameObjectB = bodyB.gameObject;

            if (
              (gameObjectA === this.wizard &&
                this.papersGroup.contains(gameObjectB)) ||
              (gameObjectB === this.wizard &&
                this.papersGroup.contains(gameObjectA))
            ) {
              var collidedImage = this.papersGroup.contains(gameObjectA)
                ? gameObjectA
                : gameObjectB;

              if (collidedImage && collidedImage.active) {
                // collidedImage.destroy();
                // this.papersGroup.remove(collidedImage);
              }
            }
          });
        },
        this
      );
    }
  }

  addStartNoise() {
    if (this.startNoiseActive) {
      this.sound.play("monster-growl");
      this.startNoiseActive = false;
    }
  }

  setupCamera() {
    this.camera = this.cameras.main;
    this.camera.fadeIn(1000);
  }

  create() {
    this.setupCamera();
    this.wizard = new Wizard(this, 90, 1400, "wizard_idle");
    this.addStartNoise();

    this.input.keyboard?.on("keydown", this.toggleTextInPaper, this);
    this.createPaperScroll();
    this.createMap();
    // this.addBackground();
    this.addBgMusic();
    this.createInfoPapers();

    this.projectiles = this.add.group();
    this.portal = new Portal(this, 2400, 700, "portal");
    // this.portal = new Portal(this, 600, 1400, "portal");

    this.camera.setDeadzone(250, 250);
    this.camera.startFollow(this.wizard, true, 1, 1, -50, 0);

    this.lights.enable();

    this.createTorch(120, 1300);
    this.createTorch(650, 1300);
    this.createTorch(1300, 1300);
    this.createTorch(2000, 1300);
  }

  toggleTextInPaper(e) {
    if (e.code === "Escape" || e.code === "KeyE") {
      this.paperTextObject.setText(this.currentText);
      this.paperTextObject.setVisible(
        this.paperTextObject.visible ? false : true
      );
    }
  }

  createMap() {
    const map = this.make.tilemap({
      key: "home",
      tileHeight: 64,
      tileWidth: 64,
    });

    const tileset = map.addTilesetImage(
      "home", // имя в json файле
      "home-tileset",
      64,
      64
    ) as Phaser.Tilemaps.Tileset;
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const objectsLayer = map.createLayer("objects", tileset, 0, 0);

    [groundLayer, objectsLayer].forEach((item) => {
      const layerName = item?.layer.name;
      item?.setName(layerName);
      item?.setDepth(100);

      item?.setCollisionByProperty({ collides: true });

      //   if (layerName === "Слой тайлов 1") {
      //     item?.setCollisionCategory(COLLISION_CATEGORIES.Ground);
      //   }
      //   if (layerName === "platforms") {
      //     item?.setCollisionCategory(COLLISION_CATEGORIES.Platforms);
      //   }
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

  update(time: number, delta: number): void {
    this.wizard.update(this.cursors, time);

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
