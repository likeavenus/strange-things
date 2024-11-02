import Phaser from "phaser";
import { createPortalAnims } from "./anims";
import { COLLISION_CATEGORIES } from "../../constants";
import { Wizard } from "../../characters/wizard/Wizard";

export class Portal extends Phaser.Physics.Matter.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene.matter.world, x, y, texture, frame, {
      label: "portal",
      isSensor: true,
      isStatic: true,
    });

    this.setName("portal");

    createPortalAnims(scene.anims);
    this.anims.play("portal-animate");

    this.setDepth(150);
    this.setFixedRotation();

    // scene!.input!.keyboard!.on("keydown-E", this.baseAttack, this);

    this.setCollisionCategory(COLLISION_CATEGORIES.Portal);
    this.setCollidesWith([COLLISION_CATEGORIES.Player]);

    scene.add.existing(this);
    this.setPipeline("Light2D");
    this.scene.lights.addLight(this.x, this.y - 20, 256, 0x0000ff, 2);

    scene.matter.world.on("collisionstart", this.handleCollision, this);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {}

  handleCollision(event) {
    const pairs = event.pairs;
    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      if (
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.Portal &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Player) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.Portal &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Player)
      ) {
        const wizard = this.scene.children.getByName("wizard") as Wizard;
        const camera = this.scene.cameras.main;
        camera.setPostPipeline("VortexPostFX");
        wizard.isTeleported = true;
        wizard.anims.play("wizard_idle");

        const pipeline = camera.getPostPipeline("VortexPostFX");
        console.log("pipeline: ", pipeline);
        // pipeline.setTime(0); // Start from time = 0
        pipeline.setTimeDirection(1);
        this.scene.sound.play("teleport");

        this.scene.time.delayedCall(4000, () => {
          // camera.clearPostPipeline("VortexPostFX");
          // Proceed with fade out and scene transition
          camera.fadeOut(800, 0, 0, 0);
          this.scene.time.delayedCall(1050, () => {
            this.scene.sound.stopAll();
            this.scene.scene.start("Game");
          });
        });
        // this.scene.cameras.main.fadeOut(800, 0, 0, 0);

        // this.scene.time.delayedCall(1050, () => {
        //   this.scene.sound.stopAll();
        //   this.scene.scene.start("Game");
        // });
      }
    });
  }
}
