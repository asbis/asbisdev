import * as THREE from "three";
import { box, glow, lights, ridge, sky, sunDisc } from "../kit";
import type { SimFactory } from "../types";

// Hero: an offshore platform in the North Sea at dusk. Nothing to play, it just runs.

const SEA_VERT = /* glsl */ `
  uniform float time;
  varying vec3 vWorld;
  varying vec3 vNormal;
  float h(vec2 p) {
    return 0.34 * sin(p.x * 0.11 + time * 0.9) +
           0.22 * sin(p.y * 0.17 - time * 1.3 + p.x * 0.05) +
           0.12 * sin((p.x + p.y) * 0.31 + time * 1.9) +
           0.06 * sin((p.x - p.y) * 0.63 - time * 2.6);
  }
  void main() {
    vec3 p = (modelMatrix * vec4(position, 1.0)).xyz;
    float e = 0.3;
    float y = h(p.xz);
    vec3 dx = vec3(e, h(p.xz + vec2(e, 0.0)) - y, 0.0);
    vec3 dz = vec3(0.0, h(p.xz + vec2(0.0, e)) - y, e);
    vNormal = normalize(cross(dz, dx));
    p.y += y;
    vWorld = p;
    gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
  }
`;

const SEA_FRAG = /* glsl */ `
  uniform vec3 sunDir;
  uniform float horizon;
  varying vec3 vWorld;
  varying vec3 vNormal;
  void main() {
    vec3 v = normalize(cameraPosition - vWorld);
    vec3 n = normalize(vNormal);
    vec3 r = reflect(-v, n);
    float glint = pow(max(dot(r, sunDir), 0.0), 60.0) * 1.4;
    float sheen = pow(max(dot(r, sunDir), 0.0), 6.0) * 0.18;
    float fres = pow(1.0 - max(dot(n, v), 0.0), 4.0) * horizon;
    float dist = length(vWorld.xz - cameraPosition.xz);
    float haze = smoothstep(60.0, 420.0, dist);
    float c = 0.04 + sheen + glint + fres;
    c = mix(c, horizon * 0.85, haze);
    gl_FragColor = vec4(vec3(c), 1.0);
  }
`;

export const createRig: SimFactory = ({ hud }) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);
  const camera = new THREE.PerspectiveCamera(30, 21 / 9, 0.5, 1200);
  const sunDir = new THREE.Vector3(-0.28, 0.07, -1).normalize();

  sky(scene, { top: 0.03, horizon: 0.36, radius: 600 });
  sunDisc(scene, sunDir, { size: 44, dist: 560, halo: 2.6 });
  ridge(scene, { z: -520, height: 10, shade: 0.24, seed: 51, width: 2000, roughness: 0.2 });
  lights(scene, new THREE.Vector3(-0.28, 0.2, -1), 0.16, 0.6);

  // Sea
  const seaGeo = new THREE.PlaneGeometry(1400, 900, 220, 140);
  seaGeo.rotateX(-Math.PI / 2);
  const seaMat = new THREE.ShaderMaterial({
    vertexShader: SEA_VERT,
    fragmentShader: SEA_FRAG,
    uniforms: { time: { value: 0 }, sunDir: { value: sunDir }, horizon: { value: 0.42 } },
  });
  const sea = new THREE.Mesh(seaGeo, seaMat);
  sea.position.z = -380;
  scene.add(sea);

  // Platform
  const rig = new THREE.Group();
  const legShade = 0.35;
  for (const x of [-7, 7])
    for (const z of [-5, 5]) {
      const leg = box(1.4, 26, 1.4, legShade);
      leg.position.set(x, 5, z);
      rig.add(leg);
    }
  for (const y of [2, 8, 14]) {
    for (const z of [-5, 5]) {
      const b = box(14, 0.4, 0.4, legShade, false);
      b.position.set(0, y, z);
      rig.add(b);
      const diag = box(15.5, 0.3, 0.3, legShade, false);
      diag.position.set(0, y + 3, z);
      diag.rotation.z = (y / 6) % 2 ? 0.38 : -0.38;
      rig.add(diag);
    }
  }
  const deck = box(22, 1.2, 15, 0.55);
  deck.position.set(0, 18.6, 0);
  rig.add(deck);
  const modules: [number, number, number, number, number, number][] = [
    [-6, 21.5, -2, 8, 5, 9],
    [3, 20.8, -3, 6, 3.4, 7],
    [3.5, 21.8, 4, 7, 5.4, 5],
    [-6.5, 25.6, -1, 5, 3.2, 6],
  ];
  modules.forEach(([x, y, z, w, h, d], i) => {
    const m = box(w, h, d, i % 2 ? 0.5 : 0.62);
    m.position.set(x, y, z);
    rig.add(m);
  });
  // living quarters windows
  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 2; j++) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 0.05), glow(0.9));
      win.position.set(-9.2 + i * 1.3, 20.6 + j * 1.4, 2.56);
      rig.add(win);
    }
  // derrick
  const derrickGeo = new THREE.CylinderGeometry(0.9, 2.8, 17, 4, 5, true);
  const derrick = new THREE.LineSegments(new THREE.WireframeGeometry(derrickGeo), new THREE.LineBasicMaterial({ color: new THREE.Color(0, 0, 0) }));
  derrick.position.set(4, 32, -2);
  derrick.rotation.y = Math.PI / 4;
  rig.add(derrick);
  const beacon = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), glow(1));
  beacon.position.set(4, 41, -2);
  rig.add(beacon);
  // helideck
  const heli = new THREE.Group();
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 0.5, 8), new THREE.MeshLambertMaterial({ color: new THREE.Color(0.5, 0.5, 0.5) }));
  heli.add(pad, new THREE.LineSegments(new THREE.EdgesGeometry(pad.geometry), new THREE.LineBasicMaterial({ color: 0 })));
  heli.position.set(-13, 24.6, 3);
  const heliLeg = box(0.5, 6, 0.5, 0.3, false);
  heliLeg.position.set(-10, 21.6, 3);
  rig.add(heli, heliLeg);
  // crane
  const crane = box(0.8, 0.8, 18, 0.6);
  crane.position.set(10, 27, 4);
  crane.rotation.set(0.5, 0.9, 0);
  rig.add(crane);
  // flare boom and flame
  const boom = box(22, 0.7, 0.7, 0.4);
  boom.position.set(19, 26, -3);
  boom.rotation.z = 0.42;
  rig.add(boom);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(1.1, 3.6, 8), glow(1));
  flame.position.set(29, 32.4, -3);
  rig.add(flame);
  rig.position.set(20, -2, -118);
  rig.rotation.y = -0.45;
  scene.add(rig);

  // Supply vessel
  const ship = new THREE.Group();
  const hull = box(18, 2.4, 4.4, 0.3);
  hull.position.y = 0.6;
  const bridge = box(4.6, 3.8, 4, 0.5);
  bridge.position.set(-5.5, 3.6, 0);
  const deckhouse = box(2.4, 1.6, 3, 0.45);
  deckhouse.position.set(-5.5, 6.2, 0);
  const mast = box(0.3, 4, 0.3, 0.4, false);
  mast.position.set(-5.5, 8.8, 0);
  const shipLight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), glow(1));
  shipLight.position.set(-5.5, 10.9, 0);
  ship.add(hull, bridge, deckhouse, mast, shipLight);
  ship.position.set(-60, 0, -95);
  scene.add(ship);

  const update = (dt: number, t: number) => {
    seaMat.uniforms.time.value = t;
    flame.scale.set(1 + Math.sin(t * 13) * 0.12, 1 + Math.sin(t * 9.3) * 0.2 + Math.sin(t * 21) * 0.08, 1);
    flame.rotation.z = -0.25 + Math.sin(t * 3.1) * 0.08;
    beacon.visible = Math.sin(t * 3.4) > 0.2;
    shipLight.visible = Math.sin(t * 2.2 + 1) > 0.5;
    ship.position.x = -70 + ((t * 2.4) % 150);
    ship.position.y = Math.sin(t * 0.9) * 0.35 - 0.2;
    ship.rotation.z = Math.sin(t * 0.7) * 0.03;
    const drift = Math.sin(t * 0.05) * 3;
    camera.position.set(drift, 9 + Math.sin(t * 0.3) * 0.25, 40);
    camera.lookAt(drift * 0.5, 13, -120);
  };
  update(0, 0);
  hud.tele({});

  return {
    scene,
    camera,
    update,
    setMode() {},
    input() {},
  };
};
