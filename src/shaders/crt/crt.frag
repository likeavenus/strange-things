// crt.frag
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

void main(void) {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Цветовые каналы с небольшими искажениями
    float r = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0) * 0.005).r;
    float g = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0 + 2.0) * 0.005).g;
    float b = texture2D(uMainSampler, uv + sin(uv.y * 10.0 + time * 5.0 + 4.0) * 0.005).b;

    // Добавляем сканирующие линии
    float scanline = sin(uv.y * resolution.y * 3.1415) * 0.02;
    vec3 color = vec3(r, g, b) - scanline;

    gl_FragColor = vec4(color, 1.0);
}
