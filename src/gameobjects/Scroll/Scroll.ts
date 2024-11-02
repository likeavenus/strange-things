export class PaperNineSlice extends Phaser.GameObjects.NineSlice {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string,
    width?: number,
    height?: number,
    leftWidth?: number,
    rightWidth?: number,
    topHeight?: number,
    bottomHeight?: number
  ) {
    super(
      scene,
      x,
      y,
      texture,
      frame,
      width,
      height,
      leftWidth,
      rightWidth,
      topHeight,
      bottomHeight
    );
    // ...
    this.setScrollFactor(0, 0);
    this.setDepth(200);
    this.visible = false;
    this.setName("scroll");
    scene.add.existing(this);
  }

  showScroll() {
    this.setVisible(true);
    this.scene.sound.play("scroll-sound", { volume: 1 });
  }

  hideScroll() {
    this.setVisible(false);
  }
  // ...

  // preUpdate(time, delta) {}
}
