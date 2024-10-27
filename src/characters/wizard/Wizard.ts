import Phaser from "phaser";
import { createWizardAnims } from "./anims";
import { EnergySphere } from "../../gameobjects/EnergySphere/EnergySphere";
import { COLLISION_CATEGORIES } from "../../constants";

export class Wizard extends Phaser.Physics.Matter.Sprite {
  isTouchingGround = false;
  isAttacking = false;
  isFalling = false;
  jumpMaxCounter = 2;
  currentJumpCounter = 0;
  mana = 1; // Текущее значение маны (от 0 до 6)
  maxMana = 6;
  graphics!: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene.matter.world, x, y, texture, frame, {
      label: "wizard",
      //   frictionAir: 0.01,
      frictionAir: 0.05,
      //   friction: 1,
    });

    this.setName("wizard");

    this.flipX = false;

    createWizardAnims(scene.anims);
    this.anims.play("wizard_idle");

    this.setScale(2);
    this.setFixedRotation();

    this.setOnCollide((data) => {
      this.isTouchingGround = true;

      //   const { bodyA, bodyB } = data;
    });

    scene!.input!.keyboard!.on("keydown-E", this.baseAttack, this);

    scene!.input!.keyboard!.on("keydown-F", this.rangeAttack, this);

    this.setCollisionCategory(COLLISION_CATEGORIES.Player);
    this.setCollidesWith([
      COLLISION_CATEGORIES.Ground,
      COLLISION_CATEGORIES.Enemy,
      COLLISION_CATEGORIES.EnemySphere,
    ]);

    scene.add.existing(this);
    this.setPipeline("Light2D");

    // this.on("animationcomplete", (e) => {
    //   console.log(e.key);
    // });

    // this.setMass(0.5);
    // this.setDensity(0.005);

    this.scene.matter.world.on("collisionstart", this.handleCollision, this);

    this.graphics = scene.add.graphics();

    scene.time.addEvent({
      loop: true,
      delay: 1000,
      callback: () => {
        if (this.mana < 6) {
          this.mana += 0.5;
        }
      },
    });
  }

  baseAttack() {
    if (this.isAttacking || !this.isTouchingGround) {
      return;
    }

    this.setVelocity(0);

    this.isAttacking = true;
    this.setOrigin(0.5, 0.7);
    this.anims.play("wizard_attack1");

    this.once("animationcomplete", (e) => {
      if (e.key === "wizard_attack1") {
        this.isAttacking = false;

        // Возвращаемся к анимации ожидания или другой нужной вам анимации
        this.setOrigin(0.5, 0.5);
        this.anims.play("wizard_idle", true);
      }
    });
  }

  increaseFallSpeed() {
    // Увеличиваем скорость падения
    const extraGravity = 0.5; // Настройте это значение по своему усмотрению
    this.setVelocityY(this.body.velocity.y + extraGravity);
  }

  rangeAttack() {
    if (this.isAttacking || !this.isTouchingGround) {
      return;
    }

    if (this.mana === 0) {
      return;
    }

    this.isAttacking = true;
    this.mana -= 1;
    this.setOrigin(0.4, 0.6);
    // Останавливаем движение
    this.setVelocity(0);

    // Запускаем анимацию атаки
    this.anims.play("wizard_attack2", true);

    // По завершении анимации
    this.once("animationcomplete", (e) => {
      if (e.key === "wizard_attack2") {
        this.isAttacking = false;
        this.setOrigin(0.5, 0.5);
        // Возвращаемся к анимации ожидания
        this.anims.play("wizard_idle", true);
      }
    });

    // Создаем энергетический шар
    this.createEnergySphere();
  }

  createEnergySphere() {
    // Определяем направление взгляда персонажа
    const direction = this.flipX ? -1 : 1;

    // Создаем энергетический шар
    const sphere = new EnergySphere(
      this.scene,
      direction > 0 ? this.x + 60 : this.x - 60,
      this.y - this.height / 2 + 15,
      "red",
      direction
    );

    // Добавляем его в группу снарядов (создадим позже)
    this.scene.projectiles.add(sphere);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    this.drawMana();

    const { left, right, up, down, space } = cursors;

    const jumpSpeed = 30;
    const moveSpeed = 15;

    // Проверяем, падает ли персонаж
    if (this.body.velocity.y > 0.1) {
      this.isFalling = true;
    } else {
      this.isFalling = false;
    }

    if (this.isFalling) {
      this.increaseFallSpeed();
    }

    if (this.isAttacking) {
      return;
    }

    if (!this.isTouchingGround && this.body!.velocity.y < 0) {
      this.anims.play(`wizard_jump`, true);
      if (right.isDown) {
        this.setVelocityX(moveSpeed);
        this.flipX = false;
      } else if (left.isDown) {
        this.setVelocityX(-moveSpeed);
        this.flipX = true;
      }
    } else if (!this.isTouchingGround && this.body!.velocity.y > 0) {
      this.anims.play(`wizard_fall`, true);
      if (right.isDown) {
        this.setVelocityX(moveSpeed);
        this.flipX = false;
      } else if (left.isDown) {
        this.setVelocityX(-moveSpeed);
        this.flipX = true;
      }
    } else if (left.isDown) {
      this.setVelocityX(-moveSpeed);
      this.flipX = true;
      this.anims.play(`wizard_run`, true);
    } else if (right.isDown) {
      this.setVelocityX(moveSpeed);
      this.flipX = false;
      this.anims.play(`wizard_run`, true);
    } else {
      this.setVelocityX(0);
      this.anims.play(`wizard_idle`, true);
      // console.log("this.isTouchingGround", this.isTouchingGround);

      // if (!this.isTouchingGround && this.body!.velocity.y > 0) {
      //   // this.anims.play("ksenia_down", true);
      //   console.log("idle");
      // }
    }
    if (
      Phaser.Input.Keyboard.JustDown(space) &&
      (this.isTouchingGround ||
        (!this.isTouchingGround &&
          this.currentJumpCounter < this.jumpMaxCounter))
    ) {
      this.setVelocityY(-jumpSpeed);
      this.isTouchingGround = false;
      this.currentJumpCounter++;
    }

    if (
      this.currentJumpCounter === this.jumpMaxCounter &&
      this.isTouchingGround
    ) {
      this.currentJumpCounter = 0;
    }
  }

  slowDownTime() {
    this.scene.time.scale = 0.5; // Устанавливаем временной масштаб в 0.5 (замедление в 2 раза)
    console.log("slow");

    // Устанавливаем таймер, чтобы вернуть время в нормальное состояние через 1 секунду
    this.scene.time.delayedCall(1000, () => {
      this.scene.time.scale = 1; // Возвращаем временной масштаб обратно к 1
    });
  }

  handleCollision(event) {
    const pairs = event.pairs;

    // Проверяем каждую пару столкновений
    pairs.forEach((pair) => {
      // Получаем тела, участвующие в столкновении
      const { bodyA, bodyB } = pair;

      // Если снаряд столкнулся со стеной (Ground)
      if (
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.EnemySphere &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Player) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.EnemySphere &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Player)
      ) {
        this.scene.cameras.main.shake(500, 0.03);

        this.slowDownTime();
      }
    });
  }

  drawMana() {
    this.graphics.clear(); // Очищаем графику перед отрисовкой
    this.graphics.setScrollFactor(0);
    this.graphics.setPosition(50, 50);

    const xStart = 10; // Начальная позиция по X
    const yStart = 10; // Начальная позиция по Y
    const potionWidth = 20; // Ширина колбочки
    const potionHeight = 20; // Высота колбочки
    const potionSpacing = 5; // Промежуток между колбочками

    // Рисуем колбочки
    for (let i = 0; i < this.maxMana; i++) {
      // Определяем координаты для каждой колбочки
      const x = xStart + (potionWidth + potionSpacing) * i;
      const y = yStart;

      // Цвет колбочки
      this.graphics.fillStyle(0xffffff); // Черный цвет (контур)
      //   this.graphics.fillRect(x, y, potionWidth, potionHeight); // Рисуем контур колбочки
      this.graphics.fillCircle(x, y, 11);

      // Закрашиваем колбочку, если мана больше, чем индекс
      if (i < this.mana) {
        this.graphics.fillStyle(0x1111ff); // Цвет заполненной колбочки (темно-фиолетовый)
        // this.graphics.fillRect(x + 1, y + 1, potionWidth - 2, potionHeight - 2); // Рисуем заполненную часть с отступами
        this.graphics.fillCircle(x, y, 10);
      }
    }
  }
}
