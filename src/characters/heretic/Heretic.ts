import Phaser from "phaser";

import { createHereticAnims } from "./anims";
import { COLLISION_CATEGORIES } from "../../constants";
import { EnemySphere } from "../../gameobjects/EnergySphere/EnemySphere";
import { Wizard } from "../wizard/Wizard";

export class Heretic extends Phaser.Physics.Matter.Sprite {
  hp = 100;
  isTouchingGround = false;
  isAttacking = false;
  isStunned = false;
  isFalling = false;
  jumpMaxCounter = 2;
  currentJumpCounter = 0;
  direction = 1;
  isDead = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene.matter.world, x, y, texture, frame, {
      label: "heretic",
      frictionAir: 0.05,
    });

    this.flipX = false;

    createHereticAnims(scene.anims);
    this.anims.play("heretic_run");

    this.setScale(3.0);
    this.setRectangle(this.width * 2, this.height * 3, {});
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
        if (this.isDead) return;
        if (this.isStunned) return;
        if (this.isAttacking) return;

        const wizard = this.scene.children.getByName("wizard") as Wizard;

        if (wizard.hp <= 0) {
          return;
        }

        this.direction = -this.direction;
      },
    });

    this.scene.time.addEvent({
      loop: true,
      delay: 2000,
      callback: () => {
        if (this.isDead) return;
        if (this.isStunned) return;
        if (this.isAttacking) return;

        const wizard = this.scene.children.getByName("wizard") as Wizard;

        if (wizard.hp <= 0) {
          return;
        }

        if (
          Phaser.Math.Distance.Between(wizard.x, wizard.y, this.x, this.y) < 600
        ) {
          if (wizard.x > this.x) {
            this.direction = -1;
          } else {
            this.direction = 1;
          }
          this.rangeAttack();
        }
      },
    });

    // this.on("animationcomplete", (e) => {
    //   if (e.key === "heretic_death") {
    //     console.log("death");
    //   }
    // });
  }

  // baseAttack() {
  //   if (this.isAttacking || !this.isTouchingGround) {
  //     return;
  //   }

  //   if (this.isStunned) {
  //     return;
  //   }

  //   this.setVelocity(0);

  //   this.isAttacking = true;
  //   this.setOrigin(0.5, 0.35);
  //   this.anims.play("wizard_attack1");

  //   this.once("animationcomplete", (e) => {
  //     if (e.key === "wizard_attack1") {
  //       this.isAttacking = false;

  //       // Возвращаемся к анимации ожидания или другой нужной вам анимации
  //       this.setOrigin(0.5, 0.5);
  //       this.anims.play("wizard_idle", true);
  //     }
  //   });
  // }

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

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (this.isStunned) return;
    if (this.isAttacking) return;
    if (this.isDead) return;
    if (this.hp <= 0) return;

    const wizard = this.scene.children.getByName("wizard") as Wizard;

    if (wizard.hp <= 0) {
      this.anims.play("heretic_idle", true);
      this.setOrigin(0.5, 0.68);

      return;
    }

    const speed = 10;

    if (this) {
      if (this.direction > 0) {
        this.flipX = false;
        this.setVelocityX(speed);
      } else {
        this.flipX = true;
        this.setVelocityX(-speed);
      }
    }
  }

  getDamage() {
    this.isAttacking = false;

    this.hp -= 10;
    this.scene.sound.play("skull-crash");

    this.isStunned = true;

    this.on("animationcomplete", (e) => {
      if (e.key === "heretic_hit" && !this.isDead) {
        this.isStunned = false;
        this.anims.play("heretic_run");
        this.setOrigin(0.5, 0.8);
      }
    });

    if (this.hp <= 0) {
      this.isDead = true;
      this.anims.play("heretic_death", true);
      this.setCollisionCategory(COLLISION_CATEGORIES.DeathCollider);
      this.setOrigin(0.5, 0.725);
    } else {
      this.anims.play("heretic_hit");
      this.setOrigin(0.5, 0.6);
    }

    if (!this.isDead) {
      this.scene.time.delayedCall(500, () => {
        this.anims.play("heretic_run");
        this.setOrigin(0.5, 0.5);
        this.isStunned = false;
      });
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
        this.getDamage();
      }
    });
  }
}
