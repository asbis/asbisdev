import * as THREE from "three";

// Every scene on the site is rendered in grayscale at low resolution, then presented as an
// ordered (Bayer 8x8) dither between a few tones. Luminance is the only thing a scene controls;
// the palette belongs to the page.

const BAYER8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62,
  30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31,
  55, 23, 61, 29, 53, 21,
];

const POST_VERT = /* glsl */ `
  void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const POST_FRAG = /* glsl */ `
  uniform sampler2D tScene;
  uniform sampler2D tBayer;
  uniform vec2 res;
  uniform vec3 tones[4];
  uniform float count;
  uniform float gamma;
  void main() {
    vec2 uv = gl_FragCoord.xy / res;
    vec3 c = texture2D(tScene, uv).rgb;
    float l = pow(clamp(dot(c, vec3(0.299, 0.587, 0.114)), 0.0, 1.0), gamma);
    float t = l * (count - 1.0);
    float base = floor(t);
    float th = texture2D(tBayer, gl_FragCoord.xy / 8.0).r;
    float idx = min(base + step(th, fract(t)), count - 1.0);
    vec3 col = tones[0];
    if (idx > 0.5) col = tones[1];
    if (idx > 1.5) col = tones[2];
    if (idx > 2.5) col = tones[3];
    gl_FragColor = vec4(col, 1.0);
  }
`;

export type StageOptions = {
  /** dark → light, 2 to 4 CSS hex colours */
  tones: string[];
  /** target width of the dithered image in scene pixels; the real one divides the canvas exactly */
  target?: number;
  gamma?: number;
};

export class Stage {
  readonly canvas: HTMLCanvasElement;
  readonly renderer: THREE.WebGLRenderer;
  w = 0;
  h = 0;
  private rt: THREE.WebGLRenderTarget;
  private post: THREE.Scene;
  private postCam: THREE.Camera;
  private mat: THREE.ShaderMaterial;
  private target: number;

  constructor(canvas: HTMLCanvasElement, opts: StageOptions) {
    this.canvas = canvas;
    this.target = opts.target ?? 640;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.rt = new THREE.WebGLRenderTarget(2, 2, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });

    const bayer = new THREE.DataTexture(
      new Uint8Array(BAYER8.map((v) => Math.round(((v + 0.5) / 64) * 255))),
      8,
      8,
      THREE.RedFormat,
    );
    bayer.wrapS = bayer.wrapT = THREE.RepeatWrapping;
    bayer.minFilter = bayer.magFilter = THREE.NearestFilter;
    bayer.needsUpdate = true;

    // Output is written raw (linear colour space, no conversion), so tones are plain sRGB bytes.
    const tones = opts.tones.map((hex) => {
      const n = parseInt(hex.slice(1), 16);
      return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
    });
    while (tones.length < 4) tones.push(tones[tones.length - 1].clone());

    this.mat = new THREE.ShaderMaterial({
      vertexShader: POST_VERT,
      fragmentShader: POST_FRAG,
      uniforms: {
        tScene: { value: this.rt.texture },
        tBayer: { value: bayer },
        res: { value: new THREE.Vector2(2, 2) },
        tones: { value: tones },
        count: { value: opts.tones.length },
        gamma: { value: opts.gamma ?? 1.0 },
      },
      depthTest: false,
      depthWrite: false,
    });

    const tri = new THREE.BufferGeometry();
    tri.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    this.post = new THREE.Scene();
    this.post.add(new THREE.Mesh(tri, this.mat));
    this.postCam = new THREE.Camera();
    this.layout();
  }

  /** Pick a scene width near the target that divides the device-pixel width exactly (no moiré). */
  layout() {
    const dpr = window.devicePixelRatio || 1;
    const cssW = this.canvas.clientWidth || this.target;
    const cssH = this.canvas.clientHeight || cssW * 0.5;
    const dev = cssW * dpr;
    const k = Math.max(1, Math.round(dev / this.target));
    const w = Math.max(160, Math.round(dev / k));
    const h = Math.max(90, Math.round((cssH * dpr) / k));
    if (w === this.w && h === this.h) return false;
    this.w = w;
    this.h = h;
    this.renderer.setSize(w, h, false);
    this.rt.setSize(w, h);
    this.mat.uniforms.res.value.set(w, h);
    return true;
  }

  /** debug: show the grayscale scene without the dither pass */
  raw = false;

  render(scene: THREE.Scene, camera: THREE.Camera) {
    if (this.raw) {
      this.renderer.setRenderTarget(null);
      this.renderer.render(scene, camera);
      return;
    }
    this.renderer.setRenderTarget(this.rt);
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.post, this.postCam);
  }

  dispose() {
    this.rt.dispose();
    this.mat.dispose();
    this.renderer.dispose();
  }
}
