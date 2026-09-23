import * as THREE from "three";
import { box, damp, floor, glow, lights, ridge, rng, sky, sunDisc } from "../kit";
import type { Key, Mode, SimFactory } from "../types";

// App: a real-time transit app is only as good as the bus data behind it. The bus drives itself
// toward the next stop, dodges roadworks, picks up at stops in the right lane, and the telemetry
// shows what the app would tell the passenger.

const LANES = [-3.4, 0, 3.4];
const STOPS = ["Byterminalen", "Kannik", "Madlakrossen", "Hinna park", "Forus øst", "Sola sentrum", "Flyplassen"];
const SPAWN_Z = -170;
const ROW_EVERY = [30, 42];
const STOP_EVERY = 110;

type Row = { g: THREE.Group; z: number; lanes: number[]; hit: boolean };
type Stop = { g: THREE.Group; z: number; name: string; done: boolean; label: ReturnType<import("../kit").Labels["add"]> };

export const createTransit: SimFactory = ({ labels, hud, lang }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);
  scene.fog = new THREE.Fog(0x000000, 60, 175);
  const camera = new THREE.PerspectiveCamera(46, 16 / 9, 0.3, 900);
  const camBase = new THREE.Vector3(0, 6.2, 14.5);
  camera.position.copy(camBase);
  camera.lookAt(0, 1.8, -20);

  sky(scene, { top: 0.02, horizon: 0.3 });
  sunDisc(scene, new THREE.Vector3(0.02, 0.075, -1), { size: 58, halo: 2.1 });
  ridge(scene, { z: -300, height: 30, shade: 0.2, seed: 21, width: 1400 });
  ridge(scene, { z: -220, height: 14, shade: 0.1, seed: 5, width: 1100 });
  floor(scene, { shade: 0.03, grid: 0, cells: 0 });
  lights(scene, new THREE.Vector3(0.3, 0.7, 0.9), 0.25, 0.8);

  // Road
  const road = new THREE.Mesh(new THREE.PlaneGeometry(10.8, 400), glow(0.085));
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.01, -180);
  scene.add(road);
  for (const x of [-5.3, 5.3]) {
    const edge = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 400), glow(0.55));
    edge.rotation.x = -Math.PI / 2;
    edge.position.set(x, 0.02, -180);
    scene.add(edge);
  }
  const dashes: THREE.Mesh[] = [];
  for (let i = 0; i < 32; i++) {
    for (const x of [-1.7, 1.7]) {
      const d = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 2.6), glow(0.9));
      d.rotation.x = -Math.PI / 2;
      d.position.set(x, 0.03, -i * 7);
      scene.add(d);
      dashes.push(d);
    }
  }
  const poles: THREE.Group[] = [];
  for (let i = 0; i < 12; i++) {
    for (const side of [-1, 1]) {
      const p = new THREE.Group();
      const post = box(0.25, 5.2, 0.25, 0.5, false);
      post.position.y = 2.6;
      const arm = box(1.4, 0.18, 0.25, 0.5, false);
      arm.position.set(-side * 0.6, 5.1, 0);
      p.add(post, arm);
      p.position.set(side * 7.4, 0, -i * 16);
      scene.add(p);
      poles.push(p);
    }
  }

  // Bus
  const bus = new THREE.Group();
  const body = box(2.6, 2.7, 7.2, 0.9);
  body.position.y = 1.75;
  const roof = box(1.8, 0.35, 3, 0.7);
  roof.position.set(0, 3.25, 0.6);
  const rear = box(2.1, 1.0, 0.06, 0.04, false);
  rear.position.set(0, 2.35, 3.62);
  const lampL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.06), glow(1));
  lampL.position.set(-0.95, 0.9, 3.63);
  const lampR = lampL.clone();
  lampR.position.x = 0.95;
  const sideWinL = box(0.05, 0.9, 5.8, 0.05, false);
  sideWinL.position.set(-1.31, 2.35, -0.2);
  const sideWinR = sideWinL.clone();
  sideWinR.position.x = 1.31;
  bus.add(body, roof, rear, lampL, lampR, sideWinL, sideWinR);
  for (const x of [-1.2, 1.2])
    for (const z of [-2.4, 2.2]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 14), glow(0.02));
      w.rotation.z = Math.PI / 2;
      w.position.set(x, 0.5, z);
      bus.add(w);
    }
  scene.add(bus);
  const busLabel = labels.add(lang === "no" ? "BUSS 1043" : "BUS 1043", "is-amber");

  // Obstacles & stops
  const r = rng(11);
  const rows: Row[] = [];
  const stops: Stop[] = [];
  let rowIn = 20;
  let stopIn = 60;
  let stopIdx = 1;

  const car = () => {
    const g = new THREE.Group();
    const b = box(2.2, 1.1, 4.2, 0.65);
    b.position.y = 0.75;
    const c = box(1.9, 0.8, 2.2, 0.5);
    c.position.set(0, 1.7, 0.3);
    const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.05), glow(1));
    l1.position.set(-0.75, 0.9, 2.12);
    const l2 = l1.clone();
    l2.position.x = 0.75;
    g.add(b, c, l1, l2);
    return g;
  };
  const works = () => {
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const s = box(0.72, 1.1, 0.35, i % 2 ? 0.08 : 1, i === 0);
      s.position.set(-1.1 + i * 0.73, 0.95, 0);
      g.add(s);
    }
    for (const x of [-1.2, 1.2]) {
      const leg = box(0.12, 0.5, 0.5, 0.4, false);
      leg.position.set(x, 0.25, 0);
      g.add(leg);
    }
    return g;
  };

  // Rows are always passable from the row before: some free lane is at most one lane away.
  let lastFree = [0, 1, 2];
  const spawnRow = () => {
    let lanes: number[] = [];
    for (let tries = 0; tries < 12; tries++) {
      const blocked = r() < 0.35 ? 2 : 1;
      lanes = [0, 1, 2].sort(() => r() - 0.5).slice(0, blocked);
      const free = [0, 1, 2].filter((l) => !lanes.includes(l));
      if (free.some((f) => lastFree.some((g) => Math.abs(f - g) <= 1))) break;
    }
    lastFree = [0, 1, 2].filter((l) => !lanes.includes(l));
    const g = new THREE.Group();
    for (const l of lanes) {
      const o = r() < 0.5 ? car() : works();
      o.position.x = LANES[l];
      g.add(o);
    }
    g.position.z = SPAWN_Z;
    scene.add(g);
    rows.push({ g, z: SPAWN_Z, lanes, hit: false });
  };

  const spawnStop = () => {
    const g = new THREE.Group();
    const roofS = box(3.4, 0.2, 1.8, 0.85);
    roofS.position.y = 2.7;
    const back = box(3.4, 2.4, 0.12, 0.35);
    back.position.set(0, 1.4, -0.8);
    back.rotation.y = Math.PI / 2;
    back.position.set(0.8, 1.4, 0);
    const sign = box(0.14, 0.9, 0.9, 1);
    sign.position.set(-1.6, 3.4, 1.2);
    const pole = box(0.12, 3.2, 0.12, 0.5, false);
    pole.position.set(-1.6, 1.6, 1.2);
    g.add(roofS, back, sign, pole);
    const people = 1 + Math.floor(r() * 3);
    for (let i = 0; i < people; i++) {
      const p = box(0.5, 1.6, 0.45, 0.95, false);
      p.position.set(-0.6 - (i % 2) * 0.1, 0.8, -0.8 + i * 0.8);
      g.add(p);
    }
    roofS.rotation.y = Math.PI / 2;
    g.position.set(7.3, 0, SPAWN_Z);
    scene.add(g);
    const name = STOPS[stopIdx % STOPS.length];
    stopIdx++;
    const label = labels.add(name.toUpperCase());
    stops.push({ g, z: SPAWN_Z, name, done: false, label });
  };

  let mode: Mode = "auto";
  let lane = 1;
  let busX = 0;
  let speed = 20;
  let score = 0;
  let passengers = 0;
  let delay = 0;
  let shake = 0;
  let travelled = 0;
  let notified = "";
  const tele: Record<string, string> = {};
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const nextStop = () => stops.filter((s) => !s.done).sort((a, b) => b.z - a.z)[0];

  const autopilot = () => {
    // rows still alongside the bus count until they are fully past it
    const ahead = rows.filter((w) => !w.hit && w.z < 4.5 && w.z > -70).sort((a, b) => b.z - a.z);
    const stop = nextStop();
    const wantRight = stop && stop.z > -80;
    let best = lane;
    let bestCost = Infinity;
    for (let l = 0; l < 3; l++) {
      let cost = Math.abs(l - lane) * 1.2;
      ahead.forEach((w, i) => {
        if (w.lanes.includes(l)) cost += i === 0 ? 1000 : 60 / (i + 1);
      });
      // passing two lanes at once needs the middle lane to be clear too
      if (Math.abs(l - lane) === 2 && ahead.some((w) => w.z > -20 && w.lanes.includes(1))) cost += 500;
      if (wantRight && l !== 2) cost += 8;
      if (cost < bestCost) {
        bestCost = cost;
        best = l;
      }
    }
    lane = best;
  };

  const update = (dt: number) => {
    const dz = speed * dt;
    travelled += dz;
    speed = Math.min(30, speed + dt * 0.3);
    delay = Math.max(0, delay - dt * 0.4);

    for (const d of dashes) {
      d.position.z += dz;
      if (d.position.z > 14) d.position.z -= 32 * 7;
    }
    for (const p of poles) {
      p.position.z += dz;
      if (p.position.z > 14) p.position.z -= 12 * 16;
    }

    rowIn -= dz;
    if (rowIn <= 0) {
      spawnRow();
      rowIn = ROW_EVERY[0] + r() * (ROW_EVERY[1] - ROW_EVERY[0]);
    }
    stopIn -= dz;
    if (stopIn <= 0) {
      spawnStop();
      stopIn = STOP_EVERY + r() * 40;
    }

    if (mode === "auto") autopilot();
    busX = damp(busX, LANES[lane], 6.5, dt);
    bus.position.x = busX;
    bus.rotation.y = (LANES[lane] - busX) * -0.05;

    for (const w of [...rows]) {
      w.z += dz;
      w.g.position.z = w.z;
      if (!w.hit && w.z > -4.5 && w.z < 4.2) {
        const hitLane = w.lanes.find((l) => Math.abs(LANES[l] - busX) < 2.3);
        if (hitLane !== undefined) {
          w.hit = true;
          shake = 0.5;
          speed = Math.max(14, speed * 0.45);
          delay += 12;
          hud.crash();
          score = 0;
          hud.score(0);
          tele.status = lang === "no" ? "kollisjon · rute beregnes på nytt" : "collision · re-routing";
        }
      }
      if (w.z > 20) {
        scene.remove(w.g);
        rows.splice(rows.indexOf(w), 1);
      }
    }

    for (const s of [...stops]) {
      s.z += dz;
      s.g.position.z = s.z;
      s.label.pos.set(7.3, 4.6, s.z);
      if (!s.done && s.z > 0) {
        s.done = true;
        if (lane === 2 && Math.abs(busX - LANES[2]) < 1) {
          const on = 1 + Math.floor(r() * 4);
          passengers += on;
          score++;
          hud.score(score);
          tele.status = lang === "no" ? `stoppet · ${on} på` : `stopped · ${on} boarded`;
        } else {
          tele.status = lang === "no" ? `kjørte forbi ${s.name}` : `passed ${s.name}`;
        }
      }
      if (s.z > 24) {
        scene.remove(s.g);
        labels.remove(s.label);
        stops.splice(stops.indexOf(s), 1);
      }
    }

    shake = Math.max(0, shake - dt);
    camera.position.set(
      camBase.x + busX * 0.35 + (shake ? (Math.random() - 0.5) * shake : 0),
      camBase.y + (shake ? (Math.random() - 0.5) * shake : 0),
      camBase.z,
    );
    busLabel.pos.set(busX, 4.3, 0);

    const stop = nextStop();
    const eta = stop ? Math.max(0, -stop.z / speed) : 0;
    const lat = 58.9695 - travelled * 0.000012;
    const lon = 5.7331 - travelled * 0.000009;
    tele.line = lang === "no" ? "Sentrum → Flyplassen" : "City centre → Airport";
    tele.next = stop ? `${stop.name} · ${lang === "no" ? "om" : "in"} ${fmt(eta)}` : "—";
    tele.delay = delay < 1 ? (lang === "no" ? "i rute" : "on time") : `+${fmt(delay)}`;
    tele.speed = `${Math.round(speed * 1.9)} km/t`;
    tele.pos = `${lat.toFixed(4)}° N · ${lon.toFixed(4)}° E`;
    tele.board = String(passengers);
    if (stop && eta < 6 && notified !== stop.name) {
      notified = stop.name;
      tele.push = lang === "no" ? `«Bussen er ved ${stop.name} om ${Math.ceil(eta)} s»` : `"Bus reaches ${stop.name} in ${Math.ceil(eta)} s"`;
    }
    tele.status ??= lang === "no" ? "i rute" : "on schedule";
    hud.tele(tele);
  };

  return {
    scene,
    camera,
    update,
    setMode(m) {
      mode = m;
      score = 0;
      hud.score(0);
    },
    input(k: Key) {
      if (mode !== "play") return;
      if (k === "left") lane = Math.max(0, lane - 1);
      if (k === "right") lane = Math.min(2, lane + 1);
    },
    press(x) {
      if (mode !== "play") return;
      lane = x < 0 ? Math.max(0, lane - 1) : Math.min(2, lane + 1);
    },
  };
};
