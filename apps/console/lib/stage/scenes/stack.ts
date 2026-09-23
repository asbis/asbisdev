import * as THREE from "three";
import { box, damp, floor, lights, ridge, rng, sky, sunDisc } from "../kit";
import type { Mode, SimFactory } from "../types";

// Platform: every layer has to sit on the one below it. Whatever overhangs is cut off and the next
// layer is only as wide as what was left. Twelve layers and it ships; then it starts over.

const MODULES = {
  no: ["DATABASE", "API", "INNLOGGING", "BETALING", "INTEGRASJONER", "KØ OG JOBBER", "ADMIN", "NETTSIDE", "APP", "VARSLER", "OVERVÅKING", "AI-ASSISTENT"],
  en: ["DATABASE", "API", "SIGN-IN", "PAYMENTS", "INTEGRATIONS", "QUEUES & JOBS", "ADMIN", "WEBSITE", "APP", "NOTIFICATIONS", "MONITORING", "AI ASSISTANT"],
};
const STACK = {
  no: ["Postgres", "Go · Encore", "BankID · Vipps Login", "Vipps · Adyen", "Altinn · Shopify · ERP", "Pub/Sub · cron", "Next.js", "Next.js · Vercel", "Flutter", "push · e-post · SMS", "logger · alarmer", "Claude · verktøykall"],
  en: ["Postgres", "Go · Encore", "BankID · Vipps Login", "Vipps · Adyen", "Altinn · Shopify · ERP", "Pub/Sub · cron", "Next.js", "Next.js · Vercel", "Flutter", "push · email · SMS", "logs · alerts", "Claude · tool calling"],
};
const H = 0.9;
const SIZE = 6;
const PERFECT = 0.14;

type Layer = { g: THREE.Group; x: number; z: number; w: number; d: number; y: number };
type Chip = { g: THREE.Group; vy: number; vx: number; vz: number; t: number };

export const createStack: SimFactory = ({ labels, hud, lang }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);
  scene.fog = new THREE.Fog(0x000000, 40, 160);
  const camera = new THREE.PerspectiveCamera(32, 16 / 9, 0.5, 900);

  sky(scene, { top: 0.02, horizon: 0.28 });
  sunDisc(scene, new THREE.Vector3(1, 0.16, -0.25), { size: 36 });
  ridge(scene, { z: -240, height: 26, shade: 0.2, seed: 33, width: 1400 }).rotation.y = 0.6;
  const near = ridge(scene, { z: -150, height: 12, shade: 0.1, seed: 2, width: 900 });
  near.rotation.y = 0.6;
  floor(scene, { shade: 0.035, grid: 0.12, cells: 120, size: 480 });
  lights(scene, new THREE.Vector3(0.8, 1, 0.35), 0.25, 0.85);

  const base = box(SIZE + 1.2, 1.4, SIZE + 1.2, 0.3);
  base.position.y = 0.7;
  scene.add(base);

  const r = rng(3);
  const names = MODULES[lang];
  let layers: Layer[] = [];
  let chips: Chip[] = [];
  let moving: (Layer & { axis: "x" | "z"; t: number; speed: number }) | null = null;
  let movingLabel: ReturnType<typeof labels.add> | null = null;
  const placedLabels: ReturnType<typeof labels.add>[] = [];
  let mode: Mode = "auto";
  let aim = 0.2;
  let prevOffset: number | null = null;
  let camY = 6;
  let resetIn = 0;
  let deploys = 128;
  let failing = false;
  const tele: Record<string, string> = {};

  const top = (): Layer =>
    layers[layers.length - 1] ?? { g: base, x: 0, z: 0, w: SIZE, d: SIZE, y: 1.4 - H / 2 };

  const slab = (w: number, d: number, i: number) => box(w, H, d, i % 3 === 2 ? 0.62 : i % 2 ? 0.8 : 0.98);

  const next = () => {
    const i = layers.length;
    const t = top();
    const axis = i % 2 === 0 ? "x" : "z";
    const g = slab(t.w, t.d, i);
    scene.add(g);
    moving = { g, x: t.x, z: t.z, w: t.w, d: t.d, y: t.y + H, axis, t: 0, speed: 0.55 + i * 0.035 };
    movingLabel = labels.add(names[i % names.length], "is-amber");
    aim = r() < 0.3 ? 0.03 : 0.06 + r() * 0.42;
    prevOffset = null;
    tele.module = `${names[i % names.length]} · ${STACK[lang][i % names.length]}`;
    tele.layer = `${String(i + 1).padStart(2, "0")} / ${names.length}`;
    hud.tele(tele);
  };

  const chip = (w: number, d: number, x: number, y: number, z: number, i: number, dir: THREE.Vector3) => {
    const g = slab(w, d, i);
    g.position.set(x, y, z);
    scene.add(g);
    chips.push({ g, vy: 1.5, vx: dir.x * 2.5, vz: dir.z * 2.5, t: 0 });
  };

  const drop = () => {
    if (!moving) return;
    const m = moving;
    const t = top();
    const i = layers.length;
    const along = m.axis === "x" ? m.x - t.x : m.z - t.z;
    const size = m.axis === "x" ? t.w : t.d;
    let delta = along;
    if (Math.abs(delta) < PERFECT) delta = 0;
    const overlap = size - Math.abs(delta);
    if (movingLabel) labels.remove(movingLabel);
    movingLabel = null;
    moving = null;

    if (overlap <= 0) {
      scene.remove(m.g);
      chip(m.w, m.d, m.x, m.y, m.z, i, new THREE.Vector3(m.axis === "x" ? Math.sign(delta) : 0, 0, m.axis === "z" ? Math.sign(delta) : 0));
      hud.crash();
      hud.score(0);
      tele.offset = "—";
      tele.fit = "0 %";
      tele.deploy = lang === "no" ? "bygg feilet · starter på nytt" : "build failed · starting over";
      hud.tele(tele);
      failing = true;
      resetIn = 1.6;
      return;
    }

    scene.remove(m.g);
    const nx = m.axis === "x" ? t.x + delta / 2 : t.x;
    const nz = m.axis === "z" ? t.z + delta / 2 : t.z;
    const nw = m.axis === "x" ? overlap : t.w;
    const nd = m.axis === "z" ? overlap : t.d;
    const g = slab(nw, nd, i);
    g.position.set(nx, m.y, nz);
    scene.add(g);
    layers.push({ g, x: nx, z: nz, w: nw, d: nd, y: m.y });

    if (delta !== 0) {
      const cut = Math.abs(delta);
      const s = Math.sign(delta);
      if (m.axis === "x") chip(cut, nd, nx + s * (overlap / 2 + cut / 2), m.y, nz, i, new THREE.Vector3(s, 0, 0));
      else chip(nw, cut, nx, m.y, nz + s * (overlap / 2 + cut / 2), i, new THREE.Vector3(0, 0, s));
    }

    const l = labels.add(names[i % names.length], "is-small");
    l.pos.set(nx + nw / 2, m.y + H * 0.2, nz + nd / 2);
    placedLabels.push(l);

    tele.offset = delta === 0 ? (lang === "no" ? "0,00 m · perfekt" : "0.00 m · perfect") : `${Math.abs(delta).toFixed(2)} m`;
    tele.fit = `${Math.round((overlap / size) * 100)} %`;
    hud.score(layers.length);
    if (layers.length >= names.length) {
      deploys++;
      tele.deploy = lang === "no" ? `deploy #${deploys} · i drift` : `deploy #${deploys} · live`;
      hud.tele(tele);
      resetIn = 2.4;
      return;
    }
    tele.deploy = lang === "no" ? `bygger lag ${layers.length + 1}` : `building layer ${layers.length + 1}`;
    hud.tele(tele);
    next();
  };

  const reset = () => {
    layers.forEach((l) => scene.remove(l.g));
    chips.forEach((c) => scene.remove(c.g));
    placedLabels.splice(0).forEach((l) => labels.remove(l));
    if (movingLabel) labels.remove(movingLabel);
    if (moving) scene.remove(moving.g);
    layers = [];
    chips = [];
    moving = null;
    movingLabel = null;
    failing = false;
    hud.score(0);
    next();
  };

  next();

  const update = (dt: number) => {
    if (resetIn > 0) {
      resetIn -= dt;
      if (resetIn <= 0) reset();
    }

    if (moving) {
      const m = moving;
      const t = top();
      m.t += dt * m.speed;
      const phase = (m.t % 2) - 1; // -1..1 sawtooth
      const tri = 1 - 2 * Math.abs(phase); // -1..1 triangle
      const offset = tri * 7.5;
      if (m.axis === "x") {
        m.x = t.x + offset;
        m.z = t.z;
      } else {
        m.z = t.z + offset;
        m.x = t.x;
      }
      m.g.position.set(m.x, m.y, m.z);
      movingLabel?.pos.set(m.x, m.y + H * 0.9, m.z);
      const crossed = prevOffset !== null && Math.sign(prevOffset) !== Math.sign(offset) && Math.abs(offset) < 1;
      prevOffset = offset;
      if (mode === "auto" && (Math.abs(offset) <= aim || (aim < 0.05 && crossed))) drop();
    }

    for (const c of [...chips]) {
      c.t += dt;
      c.vy -= 22 * dt;
      c.g.position.x += c.vx * dt;
      c.g.position.z += c.vz * dt;
      c.g.position.y += c.vy * dt;
      c.g.rotation.x += c.vz * dt * 0.4;
      c.g.rotation.z -= c.vx * dt * 0.4;
      if (c.t > 2.2) {
        scene.remove(c.g);
        chips.splice(chips.indexOf(c), 1);
      }
    }

    const height = top().y + (failing ? 0 : H);
    camY = damp(camY, height, 2.5, dt);
    camera.position.set(25, camY + 8.5, 28);
    camera.lookAt(0, camY + 0.6, 0);
  };

  camera.position.set(25, 14.5, 28);
  camera.lookAt(0, 6.6, 0);

  return {
    scene,
    camera,
    update,
    setMode(m) {
      mode = m;
      resetIn = 0.01;
    },
    input(k) {
      if (mode === "play" && (k === "action" || k === "down")) drop();
    },
    press() {
      if (mode === "play") drop();
    },
  };
};
