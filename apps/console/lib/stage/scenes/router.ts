import * as THREE from "three";
import { box, damp, floor, glow, lights, ridge, sky, sunDisc, rng } from "../kit";
import type { Key, Mode, SimFactory } from "../types";

// Integration: events from Norwegian platforms arrive on one belt and must reach the right system.
// A system goes down now and then; its events queue at the door and are retried when it is back.

const DEST = [
  { no: "REGNSKAP", en: "ACCOUNTING", h: 5.6 },
  { no: "CRM", en: "CRM", h: 4.4 },
  { no: "LAGER", en: "WAREHOUSE", h: 6.4 },
];
const LANE_Z = [-7, 0, 7];

const KINDS = [
  { src: "VIPPS", event: "payment.captured", dest: 0 },
  { src: "ALTINN", event: "mva.receipt", dest: 0 },
  { src: "BANKID", event: "id.verified", dest: 1 },
  { src: "FORM", event: "lead.created", dest: 1 },
  { src: "SHOPIFY", event: "order.created", dest: 2 },
  { src: "POSTEN", event: "parcel.delivered", dest: 2 },
];

const SPAWN_X = -15.5;
const JUNCTION_X = 0;
const END_X = 11.8;
const SPEED = 4.4;
const GAP = 1.55;

type Crate = {
  g: THREE.Group;
  s: number;
  branch: number;
  kind: (typeof KINDS)[number];
  id: number;
  state: "move" | "enter" | "reject";
  t: number;
  born: number;
  label: ReturnType<import("../kit").Labels["add"]>;
};

function pathFor(branch: number) {
  const z = LANE_Z[branch];
  return [new THREE.Vector2(SPAWN_X, 0), new THREE.Vector2(JUNCTION_X, 0), new THREE.Vector2(4.2, z), new THREE.Vector2(END_X, z)];
}
const PATHS = [0, 1, 2].map(pathFor);
const LENS = PATHS.map((p) => {
  const acc = [0];
  for (let i = 1; i < p.length; i++) acc.push(acc[i - 1] + p[i].distanceTo(p[i - 1]));
  return acc;
});
const L0 = JUNCTION_X - SPAWN_X;

function at(branch: number, s: number, out: THREE.Vector2) {
  const p = PATHS[branch < 0 ? 1 : branch];
  const acc = LENS[branch < 0 ? 1 : branch];
  const cs = Math.min(s, acc[acc.length - 1]);
  let i = 1;
  while (i < acc.length - 1 && acc[i] < cs) i++;
  const t = (cs - acc[i - 1]) / (acc[i] - acc[i - 1]);
  out.lerpVectors(p[i - 1], p[i], t);
  return Math.atan2(-(p[i].y - p[i - 1].y), p[i].x - p[i - 1].x);
}

export const createRouter: SimFactory = ({ labels, hud, lang }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);
  scene.fog = new THREE.Fog(0x000000, 34, 130);
  const camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.5, 900);
  camera.position.set(0, 11, 31);
  camera.lookAt(0, 1.4, -8);

  // The layout is authored along +x (intake → systems); the world group turns it to run away
  // from the camera, so the three systems stand side by side under the sun.
  const world = new THREE.Group();
  world.rotation.y = Math.PI / 2;
  scene.add(world);
  const UP = new THREE.Vector3(0, 1, 0);
  const place = (v: THREE.Vector3) => v.applyAxisAngle(UP, Math.PI / 2);

  sky(scene, { top: 0.02, horizon: 0.26 });
  sunDisc(scene, new THREE.Vector3(0.08, 0.1, -1), { size: 34 });
  ridge(scene, { z: -260, height: 26, shade: 0.24, seed: 4, width: 1400 });
  ridge(scene, { z: -170, height: 14, shade: 0.12, seed: 9, width: 1000 });
  floor(scene, { shade: 0.035, grid: 0.13, cells: 100 });
  lights(scene, new THREE.Vector3(-0.45, 0.85, 0.6), 0.22, 0.85);

  // Belts
  const beltSeg = (a: THREE.Vector2, b: THREE.Vector2) => {
    const len = a.distanceTo(b);
    const seg = box(len + 1.6, 0.3, 1.7, 0.16);
    seg.position.set((a.x + b.x) / 2, 0.15, (a.y + b.y) / 2);
    seg.rotation.y = Math.atan2(-(b.y - a.y), b.x - a.x);
    world.add(seg);
    // rollers
    for (let d = 0.6; d < len; d += 1.2) {
      const r = box(0.1, 0.05, 1.6, 0.4, false);
      const p = new THREE.Vector2().lerpVectors(a, b, d / len);
      r.position.set(p.x, 0.32, p.y);
      r.rotation.y = seg.rotation.y;
      world.add(r);
    }
  };
  beltSeg(PATHS[1][0], PATHS[1][1]);
  PATHS.forEach((p) => {
    beltSeg(p[1], p[2]);
    beltSeg(p[2], p[3]);
  });

  // Intake: the gateway everything enters through
  const intake = box(2.2, 2.2, 3, 0.4);
  intake.position.set(SPAWN_X - 0.6, 1.1, 0);
  world.add(intake);
  const mouth = box(0.1, 1.2, 1.9, 0.02, false);
  mouth.position.set(SPAWN_X + 0.62, 0.9, 0);
  world.add(mouth);
  const intakeLabel = labels.add(lang === "no" ? "API-GATEWAY" : "API GATEWAY", "is-dim");
  place(intakeLabel.pos.set(SPAWN_X - 0.6, 2.6, -2.4));

  // Diverter
  const pivot = new THREE.Group();
  pivot.position.set(JUNCTION_X, 0.55, 0);
  const paddle = box(2.6, 0.5, 0.22, 0.9);
  paddle.position.x = 1.3;
  pivot.add(paddle);
  const hub = box(0.6, 0.9, 0.6, 0.7);
  pivot.add(hub);
  world.add(pivot);
  const laneAngle = (b: number) => Math.atan2(-LANE_Z[b], 4.2);
  let target = 1;
  let angle = laneAngle(1);

  // Destinations
  const up = [true, true, true];
  const dests = DEST.map((d, i) => {
    const g = new THREE.Group();
    g.position.set(END_X + 2.6, 0, LANE_Z[i]);
    const body = box(4.2, d.h, 4.8, 0.7);
    body.position.y = d.h / 2;
    const door = box(0.12, 1.5, 1.9, 0.02, false);
    door.position.set(-2.12, 1.1, 0);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.7), glow(1));
    lamp.position.set(0, d.h + 0.2, 0);
    g.add(body, door, lamp);
    world.add(g);
    const label = labels.add(d[lang]);
    place(label.pos.set(END_X + 2.6, d.h + 1.4, LANE_Z[i]));
    return { g, lamp, label, h: d.h };
  });

  const setUp = (i: number, v: boolean) => {
    up[i] = v;
    dests[i].lamp.material = glow(v ? 1 : 0.04);
    dests[i].label.el.textContent = v ? DEST[i][lang] : `${DEST[i][lang]} · 503`;
    dests[i].label.el.classList.toggle("is-alert", !v);
  };

  const crates: Crate[] = [];
  const r = rng(7);
  let mode: Mode = "auto";
  let spawnIn = 0.4;
  let outageIn = 7;
  let outage = { dest: -1, left: 0 };
  let nextId = 10480;
  let score = 0;
  const tmp = new THREE.Vector2();
  const tele: Record<string, string> = {};
  let lastBranchCrate: Crate | null = null;

  const queued = (b: number) => (up[b] ? 0 : crates.filter((c) => c.branch === b && c.state === "move").length);

  const payload = (c: Crate) => {
    const n = 100 + Math.floor(r() * 4900);
    switch (c.kind.src) {
      case "VIPPS":
        return lang === "no" ? `ordre #${c.id} · ${n} kr` : `order #${c.id} · NOK ${n}`;
      case "ALTINN":
        return lang === "no" ? `mva-melding · termin ${1 + (c.id % 6)}` : `VAT return · term ${1 + (c.id % 6)}`;
      case "BANKID":
        return lang === "no" ? `kunde ${c.id} · nivå høyt` : `customer ${c.id} · level high`;
      case "FORM":
        return lang === "no" ? `henvendelse fra nettsiden` : `enquiry from website`;
      case "SHOPIFY":
        return lang === "no" ? `ordre #${c.id} · ${1 + (n % 4)} varer` : `order #${c.id} · ${1 + (n % 4)} items`;
      default:
        return lang === "no" ? `sending ${c.id} levert` : `parcel ${c.id} delivered`;
    }
  };

  const show = (c: Crate, status: string) => {
    tele.source = `${c.kind.src} · ${c.kind.event}`;
    tele.payload = payload(c);
    tele.route = `→ ${DEST[c.branch < 0 ? c.kind.dest : c.branch][lang]}`;
    tele.status = status;
    tele.queue = String(queued(0) + queued(1) + queued(2));
    tele.timing = `${38 + Math.floor(r() * 70)} ms`;
    hud.tele({ ...tele });
  };

  const spawn = () => {
    const kind = KINDS[Math.floor(r() * KINDS.length)];
    const g = box(1.35, 1.0, 1.35, 1);
    world.add(g);
    const label = labels.add(kind.src, "is-small");
    const c: Crate = { g, s: 0, branch: -1, kind, id: nextId++, state: "move", t: 0, born: 0, label };
    crates.push(c);
  };

  const remove = (c: Crate) => {
    world.remove(c.g);
    labels.remove(c.label);
    crates.splice(crates.indexOf(c), 1);
  };

  const update = (dt: number) => {
    // Outages
    if (outage.left > 0) {
      outage.left -= dt;
      if (outage.left <= 0) {
        setUp(outage.dest, true);
        tele.status = lang === "no" ? `${DEST[outage.dest][lang]} oppe igjen · sender kø på nytt` : `${DEST[outage.dest][lang]} back up · retrying queue`;
        hud.tele({ ...tele });
        outage = { dest: -1, left: 0 };
        outageIn = 9 + r() * 8;
      }
    } else {
      outageIn -= dt;
      if (outageIn <= 0) {
        outage = { dest: Math.floor(r() * 3), left: 4 + r() * 2.5 };
        setUp(outage.dest, false);
      }
    }

    // Spawning
    spawnIn -= dt;
    const tail = crates.reduce((m, c) => (c.branch < 0 && c.state === "move" ? Math.min(m, c.s) : m), Infinity);
    if (spawnIn <= 0 && tail > GAP * 1.2) {
      spawn();
      spawnIn = 0.95 + r() * 0.8;
    }

    // Autopilot: set the diverter for the next crate before it reaches the junction
    const onMain = crates.filter((c) => c.branch < 0 && c.state === "move").sort((a, b) => b.s - a.s);
    if (mode === "auto" && onMain.length && onMain[0].s > L0 - 7) target = onMain[0].kind.dest;
    angle = damp(angle, laneAngle(target), 12, dt);
    pivot.rotation.y = angle;
    const lane = [0, 1, 2].reduce((best, b) => (Math.abs(laneAngle(b) - angle) < Math.abs(laneAngle(best) - angle) ? b : best), 0);

    // Movement, front to back
    const moving = crates.filter((c) => c.state === "move").sort((a, b) => b.s - a.s);
    for (const c of moving) {
      let limit = Infinity;
      if (c.branch < 0) {
        const ahead = moving.find((o) => o !== c && o.branch < 0 && o.s > c.s);
        if (ahead) limit = ahead.s - GAP;
        const inLane = moving.filter((o) => o.branch === lane).sort((a, b) => a.s - b.s)[0];
        if (inLane && inLane.s < L0 + GAP) limit = Math.min(limit, inLane.s - GAP);
      } else {
        const ahead = moving
          .filter((o) => o !== c && o.branch === c.branch && o.s > c.s)
          .sort((a, b) => a.s - b.s)[0];
        const end = LENS[c.branch][3];
        limit = ahead ? ahead.s - GAP : end;
      }
      c.s = Math.max(c.s, Math.min(c.s + SPEED * dt, limit));
      if (c.branch < 0 && c.s >= L0) {
        c.branch = lane;
        lastBranchCrate = c;
        show(c, mode === "play" && lane !== c.kind.dest ? (lang === "no" ? "feil mottaker" : "wrong recipient") : "routing");
      }
      if (c.branch >= 0 && c.s >= LENS[c.branch][3] - 0.01) {
        if (!up[c.branch]) {
          if (c.t === 0) {
            c.t = 1;
            show(c, lang === "no" ? `503 · lagt i kø (${queued(c.branch)})` : `503 · queued (${queued(c.branch)})`);
          }
          continue;
        }
        const retried = c.t === 1;
        c.t = 0;
        if (c.kind.dest !== c.branch) {
          c.state = "reject";
          hud.crash();
          score = 0;
          hud.score(score);
          show(c, lang === "no" ? "400 · avvist av mottaker" : "400 · rejected by recipient");
        } else {
          c.state = "enter";
          score++;
          hud.score(score);
          if (c === lastBranchCrate || retried)
            show(c, retried ? (lang === "no" ? "200 OK · levert etter retry" : "200 OK · delivered after retry") : "200 OK");
        }
      }
    }

    // Draw
    for (const c of [...crates]) {
      const rot = at(c.branch, c.s, tmp);
      if (c.state === "move") {
        c.g.position.set(tmp.x, 0.82, tmp.y);
        c.g.rotation.set(0, rot, 0);
      } else if (c.state === "enter") {
        c.t += dt;
        const k = Math.min(1, c.t / 0.35);
        c.g.position.set(tmp.x + k * 1.6, 0.75, tmp.y);
        c.g.scale.setScalar(1 - k * 0.7);
        if (k >= 1) {
          remove(c);
          continue;
        }
      } else {
        c.t += dt;
        c.g.position.set(tmp.x + c.t * 1.5, 0.75 + c.t * 3 - c.t * c.t * 9, tmp.y + c.t * 3);
        c.g.rotation.set(c.t * 4, rot, c.t * 3);
        if (c.t > 1.4) {
          remove(c);
          continue;
        }
      }
      place(c.label.pos.set(c.g.position.x, c.g.position.y + 1.1, c.g.position.z));
      // only the crate about to be routed and the ones already routed carry a name, or the belt is a wall of labels
      c.label.on = c.state === "move" && (c.branch >= 0 || c === onMain[0]);
    }
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
      if (k === "1" || k === "2" || k === "3") target = Number(k) - 1;
      if (k === "left") target = Math.max(0, target - 1);
      if (k === "right") target = Math.min(2, target + 1);
    },
    press(x) {
      if (mode !== "play") return;
      target = x < -0.3 ? 0 : x > 0.3 ? 2 : 1;
    },
  };
};
