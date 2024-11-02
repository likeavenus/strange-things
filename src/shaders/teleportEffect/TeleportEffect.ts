import Phaser from "phaser";

export class VortexPostFX extends Phaser.Renderer.WebGL.Pipelines
  .PostFXPipeline {
  private _time: number = 0;
  private _timeDirection: number = 1; // 1 for forward, -1 for reverse

  constructor(game: Phaser.Game, time: number = 0) {
    super({
      game: game,
      name: "VortexPostFX",
      fragShader: `
        precision mediump float;
        uniform float time;
        uniform sampler2D uMainSampler;
        varying vec2 outTexCoord;

        void main(void) {
          vec2 uv = outTexCoord;
          vec2 tc = uv - 0.5;
          float dist = length(tc);
          float angle = atan(tc.y, tc.x);
          float speed = -1.0;
          angle += dist * speed * time;
          tc = dist * vec2(cos(angle), sin(angle));
          uv = tc + 0.5;
          vec4 color = texture2D(uMainSampler, uv);
          gl_FragColor = color;
        }
      `,
    });

    this._time = time;
  }

  // Method to set time externally
  //   public setTime(value: number) {
  //     this._time = value;
  //     console.log(this.set1f);

  //     // this.set1f("time", this._time);

  //   }

  // Method to set the direction of time progression
  public setTimeDirection(direction: number) {
    this._timeDirection = direction; // 1 for forward, -1 for reverse
  }

  onPreRender() {
    const deltaTime = this.game.loop.delta * 0.01; // Convert delta to seconds
    if (this._timeDirection > 0) {
      this._time += this._timeDirection * deltaTime;
    } else {
      this._time -= this._timeDirection * deltaTime;
    }
    this.set1f("time", this._time);
  }
}
