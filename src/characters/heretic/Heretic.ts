import Phaser from "phaser";

import { createHereticAnims } from "./anims";
import { COLLISION_CATEGORIES } from "../../constants";
import { EnemySphere } from "../../gameobjects/EnergySphere/EnemySphere";

export class Heretic extends Phaser.Physics.Matter.Sprite {
  isTouchingGround = false;
  isAttacking = false;
  isFalling = false;
  jumpMaxCounter = 2;
  currentJumpCounter = 0;
  direction = 1;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene.matter.world, x, y, texture, frame, {
      label: "heretic",
      //   frictionAir: 0.01,
      frictionAir: 0.05,
      //   friction: 1,
    });

    this.flipX = false;

    createHereticAnims(scene.anims);
    this.anims.play("heretic_run");

    this.setScale(3.0);
    this.setFixedRotation();

    this.setOnCollide((data) => {
      this.isTouchingGround = true;

      //   const { bodyA, bodyB } = data;
    });

    // scene!.input!.keyboard!.on("keydown-E", this.baseAttack, this);

    // scene!.input!.keyboard!.on("keydown-F", this.rangeAttack, this);

    this.setCollisionCategory(COLLISION_CATEGORIES.Enemy);
    this.setCollidesWith([
      COLLISION_CATEGORIES.Ground,
      COLLISION_CATEGORIES.Player,
      COLLISION_CATEGORIES.EnergySphere,
    ]);

    scene.add.existing(this);
    this.scene.matter.world.on("collisionstart", this.handleCollision, this);

    this.scene.time.addEvent({
      loop: true,
      delay: 1600,
      callback: () => {
        this.direction = -this.direction;
      },
    });

    this.scene.time.addEvent({
      loop: true,
      delay: 2000,
      callback: () => {
        this.rangeAttack();
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

    this.isAttacking = true;
    this.setOrigin(0.4, 0.68);
    // Останавливаем движение
    this.setVelocity(0);

    // Запускаем анимацию атаки
    this.anims.play("heretic_attack2", true);

    // По завершении анимации
    this.once("animationcomplete", (e) => {
      if (e.key === "heretic_attack2") {
        this.isAttacking = false;
        this.setOrigin(0.5, 0.5);
        // Возвращаемся к анимации ожидания
        this.anims.play("heretic_run", true);
      }
    });

    // Создаем энергетический шар
    this.createEnergySphere();
  }

  createEnergySphere() {
    // Определяем направление взгляда персонажа
    const direction = this.flipX ? -1 : 1;

    // Создаем энергетический шар
    // const sphere = new EnergySphere(
    //   this.scene,
    //   direction > 0 ? this.x + 30 : this.x - 30,
    //   this.y - this.height / 2 + 15,
    //   "red",
    //   direction
    // );

    const sphere = new EnemySphere(
      this.scene,
      direction > 0 ? this.x + 30 : this.x - 30,
      this.y - this.height / 2 + 15,
      "red",
      direction
    );

    // Добавляем его в группу снарядов (создадим позже)
    this.scene.projectiles.add(sphere);
  }

  //   update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
  //     const { left, right, up, down, space } = cursors;

  //     const jumpSpeed = 30;
  //     const moveSpeed = 15;

  //     // Проверяем, падает ли персонаж
  //     if (this.body.velocity.y > 0.1) {
  //       this.isFalling = true;
  //     } else {
  //       this.isFalling = false;
  //     }

  //     if (this.isFalling) {
  //       this.increaseFallSpeed();
  //     }

  //     if (this.isAttacking) {
  //       return;
  //     }

  //     if (!this.isTouchingGround && this.body!.velocity.y < 0) {
  //       this.anims.play(`wizard_jump`, true);
  //       if (right.isDown) {
  //         this.setVelocityX(moveSpeed);
  //         this.flipX = false;
  //       } else if (left.isDown) {
  //         this.setVelocityX(-moveSpeed);
  //         this.flipX = true;
  //       }
  //     } else if (!this.isTouchingGround && this.body!.velocity.y > 0) {
  //       this.anims.play(`wizard_fall`, true);
  //       if (right.isDown) {
  //         this.setVelocityX(moveSpeed);
  //         this.flipX = false;
  //       } else if (left.isDown) {
  //         this.setVelocityX(-moveSpeed);
  //         this.flipX = true;
  //       }
  //     } else if (left.isDown) {
  //       this.setVelocityX(-moveSpeed);
  //       this.flipX = true;
  //       this.anims.play(`wizard_run`, true);
  //     } else if (right.isDown) {
  //       this.setVelocityX(moveSpeed);
  //       this.flipX = false;
  //       this.anims.play(`wizard_run`, true);
  //     } else {
  //       this.setVelocityX(0);
  //       this.anims.play(`wizard_idle`, true);
  //       // console.log("this.isTouchingGround", this.isTouchingGround);

  //       // if (!this.isTouchingGround && this.body!.velocity.y > 0) {
  //       //   // this.anims.play("ksenia_down", true);
  //       //   console.log("idle");
  //       // }
  //     }
  //     if (
  //       Phaser.Input.Keyboard.JustDown(space) &&
  //       (this.isTouchingGround ||
  //         (!this.isTouchingGround &&
  //           this.currentJumpCounter < this.jumpMaxCounter))
  //     ) {
  //       this.setVelocityY(-jumpSpeed);
  //       this.isTouchingGround = false;
  //       this.currentJumpCounter++;
  //     }

  //     if (
  //       this.currentJumpCounter === this.jumpMaxCounter &&
  //       this.isTouchingGround
  //     ) {
  //       this.currentJumpCounter = 0;
  //     }
  //   }
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    // if (this.body)
    if (this.isAttacking) return;
    const speed = 10;
    if (this.direction > 0) {
      this.flipX = false;
      this.setVelocityX(speed);
    } else {
      this.flipX = true;
      this.setVelocityX(-speed);
    }
  }

  handleCollision(event) {
    const pairs = event.pairs;

    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      if (
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.EnergySphere &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Enemy) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.EnergySphere &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Enemy)
      ) {
        // this.applyForce(new Phaser.Math.Vector2(1000, 1000));
        // this.setPosition(this.x - 50, this.y - 200);
        const wizard = this.scene.children.getByName("wizard");

        // this.applyForceFrom(
        //   new Phaser.Math.Vector2(wizard.x, wizard.y),
        //   new Phaser.Math.Vector2(10000, 10000)
        // );
      }
    });
  }
}