import * as THREE from "three";

// Building blocks shared by the scenes. Everything is grayscale: `shade` is 0 (ink) to 1 (signal).

const lambert = new Map<number, THREE.MeshLambertMaterial>();
export function mat(shade: number) {
  let m = lambert.get(shade);
  if (!m) {
    m = new THREE.MeshLambertMaterial({ color: new THREE.Color(shade, shade, shade) });
    lambert.set(shade, m);
  }
  return m;
}

const basic = new Map<number, THREE.MeshBasicMaterial>();
export function glow(shade: number) {
  let m = basic.get(shade);
  if (!m) {
    m = new THREE.MeshBasicMaterial({ color: new THREE.Color(shade, shade, shade), fog: false });
    basic.set(shade, m);
  }
  return m;
}

export const INK_LINE = new THREE.LineBasicMaterial({ color: 0x000000 });

/** A lit mesh with ink outlines, the look that holds shapes together once dithered. */
export function solid(geo: THREE.BufferGeometry, shade: number, outline = true) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, mat(shade)));
  if (outline) g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), INK_LINE));
  return g;
}

export function box(w: number, h: number, d: number, shade: number, outline = true) {
  return solid(new THREE.BoxGeometry(w, h, d), shade, outline);
}

/** Intensities are in "fraction of full white"; three's physical lights divide by π, so scale back. */
export function lights(scene: THREE.Scene, from = new THREE.Vector3(-0.4, 0.6, -1), ambient = 0.28, sun = 1.05) {
  scene.add(new THREE.AmbientLight(0xffffff, ambient * Math.PI));
  const d = new THREE.DirectionalLight(0xffffff, sun * Math.PI);
  d.position.copy(from.normalize().multiplyScalar(50));
  scene.add(d);
  return d;
}

/** Vertical gradient dome: dark overhead, bright at the horizon. */
export function sky(scene: THREE.Scene, { top = 0.02, horizon = 0.34, radius = 400 } = {}) {
  const geo = new THREE.SphereGeometry(radius, 32, 16);
  const m = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: { top: { value: top }, horizon: { value: horizon } },
    vertexShader: `varying float vy; void main(){ vy = normalize(position).y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform float top; uniform float horizon; varying float vy;
      void main(){ float k = smoothstep(0.0, 0.55, max(vy, 0.0)); float v = mix(horizon, top, pow(k, 0.7)); gl_FragColor = vec4(vec3(v),1.0); }`,
  });
  const mesh = new THREE.Mesh(geo, m);
  mesh.renderOrder = -10;
  scene.add(mesh);
  return mesh;
}

/** A sun disc with a soft halo, placed on a direction far away. */
export function sunDisc(scene: THREE.Scene, dir: THREE.Vector3, { size = 40, dist = 360, halo = 2.4 } = {}) {
  const g = new THREE.Group();
  const halo1 = new THREE.Mesh(
    new THREE.CircleGeometry(size * halo, 48),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fog: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `varying vec2 vUv; void main(){ float d = distance(vUv, vec2(0.5))*2.0; float a = pow(1.0-clamp(d,0.0,1.0), 2.2)*0.55; gl_FragColor = vec4(vec3(1.0), a); }`,
    }),
  );
  const disc = new THREE.Mesh(new THREE.CircleGeometry(size, 64), glow(1));
  disc.position.z = 0.1;
  g.add(halo1, disc);
  g.position.copy(dir.clone().normalize().multiplyScalar(dist));
  g.lookAt(0, g.position.y, 0);
  g.renderOrder = -9;
  scene.add(g);
  return g;
}

/** Deterministic noise so ridgelines are the same every visit. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A flat mountain silhouette standing at distance `z`, facing +z. */
export function ridge(
  scene: THREE.Scene,
  { z = -200, width = 900, height = 30, shade = 0.18, seed = 1, base = 0, roughness = 0.5 } = {},
) {
  const r = rng(seed);
  const shape = new THREE.Shape();
  const n = 60;
  shape.moveTo(-width / 2, base - 5);
  const a = [r(), r(), r(), r()];
  for (let i = 0; i <= n; i++) {
    const x = -width / 2 + (width * i) / n;
    const u = i / n;
    const y =
      base +
      height *
        (0.55 +
          0.25 * Math.sin(u * 7.1 + a[0] * 6) +
          0.15 * Math.sin(u * 17.3 + a[1] * 6) +
          roughness * 0.18 * (r() - 0.5) +
          0.1 * Math.sin(u * 31 + a[2] * 6));
    shape.lineTo(x, Math.max(base, y));
  }
  shape.lineTo(width / 2, base - 5);
  const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), glow(shade));
  mesh.position.z = z;
  scene.add(mesh);
  return mesh;
}

/** Dark floor with a perspective grid. */
export function floor(scene: THREE.Scene, { size = 400, shade = 0.07, grid = 0.2, cells = 80, y = 0 } = {}) {
  const f = new THREE.Mesh(new THREE.PlaneGeometry(size, size), glow(shade));
  f.rotation.x = -Math.PI / 2;
  f.position.y = y;
  scene.add(f);
  if (grid > 0) {
    const g = new THREE.GridHelper(size, cells, new THREE.Color(grid, grid, grid), new THREE.Color(grid, grid, grid));
    g.position.y = y + 0.01;
    scene.add(g);
    return { floor: f, grid: g };
  }
  return { floor: f, grid: null };
}

/** HTML labels pinned to points in the scene. */
export class Labels {
  private items: { el: HTMLElement; pos: THREE.Vector3; on: boolean }[] = [];
  private v = new THREE.Vector3();
  constructor(private root: HTMLElement) {}

  add(text: string, cls = "") {
    const el = document.createElement("span");
    el.className = `stage-label ${cls}`;
    el.textContent = text;
    el.style.opacity = "0";
    this.root.appendChild(el);
    const item = { el, pos: new THREE.Vector3(), on: true };
    this.items.push(item);
    return item;
  }

  remove(item: { el: HTMLElement }) {
    item.el.remove();
    this.items = this.items.filter((i) => i !== item);
  }

  update(camera: THREE.Camera) {
    const w = this.root.clientWidth;
    const h = this.root.clientHeight;
    for (const it of this.items) {
      this.v.copy(it.pos).project(camera);
      const visible = it.on && this.v.z < 1 && Math.abs(this.v.x) < 1.1 && Math.abs(this.v.y) < 1.1;
      it.el.style.opacity = visible ? "1" : "0";
      if (visible) {
        const x = (this.v.x * 0.5 + 0.5) * w;
        const y = (-this.v.y * 0.5 + 0.5) * h;
        it.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`;
      }
    }
  }

  clear() {
    this.items.forEach((i) => i.el.remove());
    this.items = [];
  }
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const damp = (a: number, b: number, lambda: number, dt: number) => lerp(a, b, 1 - Math.exp(-lambda * dt));
