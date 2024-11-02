import { COLLISION_CATEGORIES } from "../../constants";
import { EnergySphere } from "./EnergySphere";

export class EnemySphere extends EnergySphere {
  direction: number = -1;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    direction: number
  ) {
    super(scene, x, y, texture, direction);
    this.direction = direction;

    this.setTint(0x4b0082).setDepth(150);

    this.setCollisionCategory(COLLISION_CATEGORIES.EnemySphere);
    this.setCollidesWith([
      COLLISION_CATEGORIES.Player,
      COLLISION_CATEGORIES.Ground,
    ]);
  }

  launch() {
    // Начальная скорость
    const initialSpeed = 0;
    const light = this.scene.lights.addLight(this.x, this.y, 256, undefined, 5);
    light.color.set(0.5, 0.1, 0);
    const lights = this.scene.lights;
    // this.scene.time.addEvent({
    //   delay: 1500,
    //   callback: function () {
    //     if (lights) {
    //       lights.removeLight(light);
    //     }
    //   },
    // });

    // Максимальная скорость
    const maxSpeed = 40;

    // Ускорение
    const acceleration = 70;

    // Устанавливаем интервал для плавного увеличения скорости
    this.scene.tweens.add({
      targets: this,
      speed: maxSpeed,
      duration: ((maxSpeed - initialSpeed) / acceleration) * 1000, // Рассчитываем время разгона
      onUpdate: (tween, target) => {
        if (target && target.active) {
          const velocityX = target.speed * target.direction;
          target.setVelocityX(velocityX);
          light.setPosition(target.x, target.y);
        }
      },
      onComplete: () => {
        lights.removeLight(light);
      },
      //   onComplete: (tween, target) => {
      //     if (target && target.active) {
      //       // После достижения максимальной скорости, поддерживаем ее
      //       const velocityX = maxSpeed * this.direction;
      //       this.setVelocityX(velocityX);
      //     }
      //   },
    });
  }

  handleCollision(event) {
    const pairs = event.pairs;

    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;

      if (
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.EnemySphere &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Player) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.EnemySphere &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Player) ||
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.EnemySphere &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Ground) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.EnemySphere &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Ground)
      ) {
        this.destroy(true);
      }
    });
  }
}
