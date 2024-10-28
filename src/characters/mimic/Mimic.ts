import Phaser from "phaser";
import { createMimicAnims } from "./anims";
import { COLLISION_CATEGORIES } from "../../constants";
import { Wizard } from "../wizard/Wizard";

export class Mimic extends Phaser.Physics.Matter.Sprite {
  isTouchingGround = false;
  isOpen = false;
  isAttacking = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene.matter.world, x, y, texture, frame, {
      label: "mimic",
      frictionAir: 0.05,
    });

    this.setName("mimic");

    this.flipX = true;

    createMimicAnims(scene.anims);
    this.anims.play("mimic_hidden");
    this.anims.pause();

    this.setScale(4);
    this.setDepth(99);
    this.setFixedRotation();

    // scene!.input!.keyboard!.on("keydown-E", this.baseAttack, this);

    this.setCollisionCategory(COLLISION_CATEGORIES.Mimic);
    this.setCollidesWith([
      COLLISION_CATEGORIES.Ground,
      COLLISION_CATEGORIES.Enemy,
      COLLISION_CATEGORIES.EnemySphere,
      COLLISION_CATEGORIES.EnergySphere,
    ]);

    scene.add.existing(this);
    this.setPipeline("Light2D");

    scene.matter.world.on("collisionstart", this.handleCollision, this);
  }

  baseAttack() {
    if (this.isAttacking || this.isOpen) {
      return;
    }

    this.isAttacking = true;
    this.setOrigin(0.5, 0.59);
    this.anims.play("mimic_attack1");

    let hitbox: Phaser.Physics.Matter.Factory["rectangle"];

    this.scene.time.delayedCall(250, () => {
      hitbox = this.scene.matter.add.rectangle(this.x - 50, this.y, 100, 100, {
        isSensor: true,
        isStatic: true,
        collisionFilter: {
          category: COLLISION_CATEGORIES.MimicAttack,
          mask: COLLISION_CATEGORIES.Player,
        },
      });
    });

    this.once("animationcomplete", (e) => {
      if (e.key === "mimic_attack1") {
        if (hitbox) {
          this.scene.matter.world.remove(hitbox);
        }
        this.isAttacking = false;
        this.setOrigin(0.5, 0.5);

        // Возвращаемся к анимации ожидания или другой нужной вам анимации
        this.anims.play("mimic_hidden", true);
      }
    });
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (this.isAttacking || this.isOpen) {
      return;
    }
    const wizard = this.scene.children.getByName("wizard");
    if (
      Phaser.Math.Distance.Between(wizard.x, wizard.y, this.x, this.y) < 500
    ) {
      this.anims.play("mimic_hidden", true);
    } else {
      this.anims.play("mimic_hidden", true);
      this.anims.pause();
    }

    if (
      Phaser.Math.Distance.Between(wizard.x, wizard.y, this.x, this.y) < 200 &&
      wizard.hp > 0
    ) {
      this.baseAttack();
    }
  }

  handleCollision(event) {
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      if (
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.EnergySphere &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Mimic) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.EnergySphere &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Mimic)
      ) {
        if (!this.isOpen) {
          this.anims.play("mimic_open", true);
          this.isOpen = true;
        }
      }
    });
  }
}
