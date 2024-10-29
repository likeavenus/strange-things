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
  hp = 5;
  maxHP = 10;
  mana = 2; // Текущее значение маны (от 0 до 6)
  maxMana = 5;
  graphics!: Phaser.GameObjects.Graphics;
  isStunned = false;
  isCutscene = false;
  amuletOfLight!: Phaser.GameObjects.Light;
  lightSphere!: Phaser.Physics.Matter.Image;

  knockbackVelocity = 15; // Настройте по необходимости
  knockbackDuration = 300; // Время действия отскока в миллисекундах
  knockbackTimer = 0;

  private footstepTimer?: Phaser.Time.TimerEvent;
  private footstepInterval: number = 300; // Интервал между шагами в миллисекундах

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

    // this.setOnCollide((data) => {
    //   this.isTouchingGround = true;

    //   //   const { bodyA, bodyB } = data;
    // });

    scene!.input!.keyboard!.on("keydown-E", this.baseAttack, this);
    scene!.input!.keyboard!.on("keydown-F", this.rangeAttack, this);

    this.setCollisionCategory(COLLISION_CATEGORIES.Player);
    this.setCollidesWith([
      COLLISION_CATEGORIES.Ground,
      COLLISION_CATEGORIES.Enemy,
      COLLISION_CATEGORIES.EnemySphere,
      COLLISION_CATEGORIES.MimicAttack,
    ]);

    scene.add.existing(this);
    this.setPipeline("Light2D");

    // this.on("animationcomplete", (e) => {
    //   console.log(e.key);
    // });

    scene.matter.world.on("collisionstart", this.handleCollision, this);
    scene.matter.world.on("collisionstart", this.handleCollisionStart, this);
    scene.matter.world.on("collisionend", this.handleCollisionEnd, this);

    this.graphics = scene.add.graphics();
    this.graphics.setDepth(100);

    scene.time.addEvent({
      loop: true,
      delay: 1000,
      callback: () => {
        if (this.mana < 6) {
          this.mana += 0.5;
        }
      },
    });

    this.createMagicLight();
  }

  baseAttack() {
    if (this.isAttacking || !this.isTouchingGround || this.hp <= 0) {
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

    if (this.hp <= 0 || this.mana === 0) {
      return;
    }

    this.isAttacking = true;
    this.scene.sound.play("energy-attack");
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

  private playFootstep() {
    if (this.body?.velocity === 0) return;

    // Проигрываем случайный звук из массива
    // const sound = Phaser.Utils.Array.GetRandom(this.footstepSounds);
    // sound.play();
    // this.scene.sound.play("footstep");

    // Устанавливаем таймер для следующего шага
    this.footstepTimer = this.scene.time.addEvent({
      delay: this.footstepInterval,
      callback: this.playFootstep,
      callbackScope: this,
      loop: false,
    });
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    // if (this.amuletOfLight) {
    //   this.updateMagicLight(delta);
    // }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, delta: number): void {
    this.drawMana();
    this.drawHP();
    if (this.amuletOfLight) {
      this.updateMagicLight(delta);
    }

    if (this.hp <= 0) {
      return;
    }

    if (this.isStunned) {
      return;
    }

    const { left, right, up, down, space } = cursors;

    const jumpSpeed = 30;
    const moveSpeed = 12;

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
      if (right.isDown) {
        this.setVelocityX(moveSpeed);
        this.flipX = false;
      } else if (left.isDown) {
        this.setVelocityX(-moveSpeed);
        this.flipX = true;
      }
      if (this.isFalling) {
        this.anims.play(`wizard_fall`, true);
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

  createMagicLight() {
    this.amuletOfLight = this.scene.lights.addLight(
      this.x,
      this.y,
      256,
      0xffffff,
      2
    );

    this.lightSphere = this.scene.matter.add.image(
      this.x,
      this.y,
      "red",
      undefined,
      {
        isStatic: true,
        isSensor: true,
        collisionFilter: {
          category: COLLISION_CATEGORIES.Disabled,
        },
      }
    );
    // this.scene.tweens.add({
    //   targets: this.lightSphere,
    //   x: this.x + Math.sin(this.x) + 20,
    //   y: this.y + Math.sin(this.y) + 20,
    //   loop: -1,
    //   yoyo: true,
    //   ease: "ease-out",
    //   // onUpdate: (tween) => {

    //   // },
    // });
  }

  updateMagicLight(delta: number) {
    if (this.amuletOfLight) {
      this.amuletOfLight.setPosition(this.lightSphere.x, this.lightSphere.y);

      this.lightSphere.setPosition(
        this.x + (this.flipX ? -70 : 70),
        this.y - 70
      );
      // const offsetX = Math.cos(delta) * 30 * delta;
      // const offsetY = Math.sin(delta) * 30 * delta;

      // const magicLightX = this.x + offsetX;
      // const magicLightY = this.y - offsetY;

      // this.lightSphere.setPosition(magicLightX, magicLightY);
    }
  }

  slowDownTime() {
    // this.scene.time.scale = 0.5; // Устанавливаем временной масштаб в 0.5 (замедление в 2 раза)
    // console.log("slow", this.scene.matter.world);
    // // Устанавливаем таймер, чтобы вернуть время в нормальное состояние через 1 секунду

    this.scene.matter.world.engine.timing.timeScale = 0.1;

    this.scene.time.delayedCall(300, () => {
      this.scene.matter.world.engine.timing.timeScale = 1;
    });
  }

  flashEffect() {
    const flashDuration = 500; // Общая длительность эффекта в миллисекундах
    const flashInterval = 50; // Интервал мерцания в миллисекундах
    const flashes = Math.floor(flashDuration / flashInterval);

    const flashTimeline = this.scene.add.timeline({});

    for (let i = 0; i < flashes; i++) {
      // flashTimeline.add({
      //   targets: this,
      //   tint: i % 2 === 0 ? 0x000000 : 0xffffff,
      //   duration: flashInterval,
      // });
      this.setTint(i % 2 === 0 ? 0x000000 : 0xffffff);
    }
    // animationcomplete
    // flashTimeline.on("complete", () => {
    //   this.clearTint();
    // });

    // flashTimeline.play();
  }

  getDamage() {
    this.isAttacking = false;

    this.hp -= 1;
    this.scene.sound.play("skull-crash");

    this.applyKnockback(this.flipX ? "left" : "right");
    this.isStunned = true;

    // this.flashEffect();

    this.on("animationcomplete", (e) => {
      if (e.key === "wizard_hit") {
        this.isStunned = false;
      }
    });

    if (this.hp <= 0) {
      this.anims.play("wizard_death", true);
      this.setCollisionCategory(COLLISION_CATEGORIES.DeathCollider);
    } else {
      // this.anims.timeScale = 0.5;
      this.anims.play("wizard_hit");

      this.scene.children.each((item) => {
        if (item?.anims) {
          item.anims.timeScale = 0.4;
        }
      });

      this.scene.time.delayedCall(300, () => {
        // this.anims.timeScale = 1;

        this.scene.children.each((item) => {
          if (item?.anims) {
            item.anims.timeScale = 1;
          }
        });
      });
    }
  }

  private applyKnockback(direction: "left" | "right") {
    if (this.isStunned) return; // Предотвращение повторного применения отскока

    // Установка горизонтальной скорости в зависимости от направления атаки
    const velocityX =
      direction === "left" ? this.knockbackVelocity : -this.knockbackVelocity;

    // Применение вертикальной скорости (прыжок от удара)
    const velocityY = -this.knockbackVelocity / 2; // Настройте по необходимости

    // Установка новой скорости персонажа
    this.setVelocityX(velocityX);
    // this.setVelocityY(velocityY);

    // Запуск таймера для окончания эффекта отскока
    this.knockbackTimer = this.knockbackDuration;
  }

  private handleCollisionStart(
    event: Phaser.Types.Physics.Matter.MatterCollisionEvent
  ) {
    // event.pairs.forEach((pair) => {
    //   if (
    //     (pair.bodyA.label === "wizard" && pair.bodyB.label === "ground") ||
    //     (pair.bodyB.label === "wizard" && pair.bodyA.label === "ground")
    //   ) {
    //     console.log("handleCollisionStart");

    //     this.isTouchingGround = true;
    //     this.currentJumpCounter = 0; // Сброс счётчика прыжков при касании земли
    //   }
    // });
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      if (
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.Ground &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Player) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.Ground &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Player)
      ) {
        if (!this.isTouchingGround) {
          this.isTouchingGround = true;
          this.currentJumpCounter = 0; // Сброс счётчика прыжков при касании земли
        }

        // this.isTouchingGround = true;
        // this.currentJumpCounter = 0; // Сброс счётчика прыжков при касании земли
      }
    });
  }

  private handleCollisionEnd(
    event: Phaser.Types.Physics.Matter.MatterCollisionEvent
  ) {
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      if (
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.Ground &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Player) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.Ground &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Player)
      ) {
        this.isTouchingGround = false;
      }
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
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Player) ||
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.MimicAttack &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Player) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.MimicAttack &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Player)
      ) {
        this.scene.cameras.main.shake(500, 0.009);

        this.slowDownTime();
        this.getDamage();
      }
    });
  }

  drawMana() {
    this.graphics.clear(); // Очищаем графику перед отрисовкой
    this.graphics.setScrollFactor(0);
    this.graphics.setPosition(50, 50);

    const xStart = 10; // Начальная позиция по X
    const yStart = 45; // Начальная позиция по Y
    const potionWidth = 20; // Ширина колбочки
    const potionHeight = 20; // Высота колбочки
    const potionSpacing = 5; // Промежуток между колбочками

    // Рисуем колбочки
    // for (let i = 0; i < this.maxMana; i++) {
    //   // Определяем координаты для каждой колбочки
    //   const x = xStart + (potionWidth + potionSpacing) * i * 1.3;
    //   const y = yStart;

    //   // Цвет колбочки
    //   this.graphics.fillStyle(0xffffff); // Черный цвет (контур)
    //   //   this.graphics.fillRect(x, y, potionWidth, potionHeight); // Рисуем контур колбочки
    //   this.graphics.fillCircle(x, y, 15);

    //   // Закрашиваем колбочку, если мана больше, чем индекс
    //   if (i < this.mana) {
    //     this.graphics.fillStyle(0x1111ff); // Цвет заполненной колбочки (темно-фиолетовый)
    //     // this.graphics.fillRect(x + 1, y + 1, potionWidth - 2, potionHeight - 2); // Рисуем заполненную часть с отступами
    //     this.graphics.fillCircle(x, y, 14);
    //   }
    // }

    const size = 10; // Половина ширины ромба
    for (let i = 0; i < this.mana; i++) {
      const x = 10 + i * 30; // Примерная позиция по X
      const y = 50; // Примерная позиция по Y

      // Начинаем рисовать путь
      this.graphics.beginPath();

      // Определяем вершины ромба
      this.graphics.moveTo(x, y - size); // Верхняя вершина
      this.graphics.lineTo(x + size, y); // Правая вершина
      this.graphics.lineTo(x, y + size); // Нижняя вершина
      this.graphics.lineTo(x - size, y); // Левая вершина
      this.graphics.closePath(); // Завершаем путь

      // Закрашиваем ромб
      this.graphics.fillPath();

      if (i < this.mana) {
        this.graphics.fillStyle(0x1111ff); // Цвет заполненной колбочки (темно-фиолетовый)
        // // this.graphics.fillRect(x + 1, y + 1, potionWidth - 2, potionHeight - 2); // Рисуем заполненную часть с отступами
        // this.graphics.fillCircle(x, y, 14);

        this.graphics.beginPath();

        // Определяем вершины ромба
        this.graphics.moveTo(x, y - size); // Верхняя вершина
        this.graphics.lineTo(x + size, y); // Правая вершина
        this.graphics.lineTo(x, y + size); // Нижняя вершина
        this.graphics.lineTo(x - size, y); // Левая вершина
        this.graphics.closePath(); // Завершаем путь

        // Закрашиваем ромб
        this.graphics.fillPath();
      }
    }
  }

  drawHP() {
    this.graphics.setScrollFactor(0);
    this.graphics.setPosition(10, 30);

    const xStart = 10; // Начальная позиция по X
    const yStart = 10; // Начальная позиция по Y
    const potionWidth = 20; // Ширина колбочки
    const potionHeight = 20; // Высота колбочки
    const potionSpacing = 5; // Промежуток между колбочками

    // Рисуем колбочки
    for (let i = 0; i < this.maxHP; i++) {
      // Определяем координаты для каждой колбочки
      const x = xStart + (potionWidth + potionSpacing) * i * 1.3;
      const y = yStart;

      // Цвет колбочки
      this.graphics.fillStyle(0xffffff); // Черный цвет (контур)
      //   this.graphics.fillRect(x, y, potionWidth, potionHeight); // Рисуем контур колбочки
      this.graphics.fillCircle(x, y, 13);

      // Закрашиваем колбочку, если мана больше, чем индекс
      if (i < this.hp) {
        this.graphics.fillStyle(0xff0000); // Цвет заполненной колбочки (темно-фиолетовый)
        // this.graphics.fillRect(x + 1, y + 1, potionWidth - 2, potionHeight - 2); // Рисуем заполненную часть с отступами
        this.graphics.fillCircle(x, y, 12);
      }
    }
  }
}
