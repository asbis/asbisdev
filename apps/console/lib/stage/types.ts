import type * as THREE from "three";
import type { Labels } from "./kit";

export type Mode = "auto" | "play";
export type Key = "left" | "right" | "up" | "down" | "action" | "1" | "2" | "3";
export type Lang = "no" | "en";

export type Hud = {
  /** points in the current run */
  score(n: number): void;
  crash(): void;
  /** telemetry rows, keyed by the ids the component renders */
  tele(rows: Record<string, string>): void;
};

export interface Sim {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  update(dt: number, t: number): void;
  setMode(mode: Mode): void;
  input(key: Key): void;
  /** pointer press on the stage, in normalised device coords */
  press?(x: number, y: number): void;
  dispose?(): void;
}

export type SimContext = { labels: Labels; hud: Hud; lang: Lang };
export type SimFactory = (ctx: SimContext) => Sim;
