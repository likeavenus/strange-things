import Phaser from "phaser";

const CRT_FRAGMENT_SHADER = `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uMainSampler;
uniform float time;
uniform vec2 resolution;

void main(void) {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Цветовые каналы с небольшими искажениями
    float r = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0) * 0.002).r;
    float g = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0 + 2.0) * 0.002).g;
    float b = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0 + 4.0) * 0.002).b;

    // Добавляем сканирующие линии
    float scanline = sin(uv.y * resolution.y * 3.1415) * 0.02;
    vec3 color = vec3(r, g, b) - scanline;

    gl_FragColor = vec4(color, 1.0);
}
`;

export class CRTShader extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game: Phaser.Game) {
    super({
      game: game,
      name: "CRTShader",
      fragShader: CRT_FRAGMENT_SHADER,
      //   renderTarget: true,
      //   uniforms: ["uMainSampler", "time", "resolution"],
    });
  }

  onPreRender() {
    this.set1f("time", this.game.loop.time / 2000);
    this.set2f("resolution", this.renderer.width, this.renderer.height);
  }
}
