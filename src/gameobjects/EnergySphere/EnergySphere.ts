import Phaser from "phaser";
import { COLLISION_CATEGORIES } from "../../constants";

export class EnergySphere extends Phaser.Physics.Matter.Sprite {
  direction;
  speed = 0;
  scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    direction: number
  ) {
    super(scene.matter.world, x, y, texture);

    this.scene = scene;
    this.direction = direction; // 1 для вправо, -1 для влево
    this.setCircle(this.width / 4);
    this.setIgnoreGravity(true);
    this.setFixedRotation();
    this.setTint(0x00f0ff);

    this.setCollisionCategory(COLLISION_CATEGORIES.EnergySphere);
    this.setCollidesWith([
      COLLISION_CATEGORIES.Enemy,
      COLLISION_CATEGORIES.Ground,
    ]);

    // Добавляем спрайт на сцену
    scene.add.existing(this);
    // Запускаем метод обновления скорости
    this.launch();

    this.scene.matter.world.on("collisionstart", this.handleCollision, this);
  }

  launch() {
    // Начальная скорость
    const initialSpeed = 0;
    const light = this.scene.lights.addLight(this.x, this.y, 256, undefined, 5);
    light.color.set(0, 0.5, 1);
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

    // Проверяем каждую пару столкновений
    pairs.forEach((pair) => {
      // Получаем тела, участвующие в столкновении
      const { bodyA, bodyB } = pair;

      // Если снаряд столкнулся со стеной (Ground)
      if (
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.EnergySphere &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Ground) ||
        (bodyB.collisionFilter.category === COLLISION_CATEGORIES.EnergySphere &&
          bodyA.collisionFilter.category === COLLISION_CATEGORIES.Ground) ||
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.EnergySphere &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.Enemy) ||
        (bodyA.collisionFilter.category === COLLISION_CATEGORIES.Enemy &&
          bodyB.collisionFilter.category === COLLISION_CATEGORIES.EnergySphere)
      ) {
        this.destroy(true);
      }
    });
  }

  update() {}
}
