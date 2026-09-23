"use client";

import { useEffect, useRef, useState } from "react";
import type { Key, Mode, Sim, SimFactory } from "@/lib/stage/types";
import type { Lang } from "@/lib/content";

export type SceneId = "router" | "transit" | "stack" | "rig";

const LOADERS: Record<SceneId, () => Promise<SimFactory>> = {
  router: () => import("@/lib/stage/scenes/router").then((m) => m.createRouter),
  transit: () => import("@/lib/stage/scenes/transit").then((m) => m.createTransit),
  stack: () => import("@/lib/stage/scenes/stack").then((m) => m.createStack),
  rig: () => import("@/lib/stage/scenes/rig").then((m) => m.createRig),
};

const KEYMAP: Record<string, Key> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  " ": "action",
  Enter: "action",
  "1": "1",
  "2": "2",
  "3": "3",
};

const TEXT = {
  auto: { no: "Autopilot", en: "Autopilot" },
  play: { no: "Du spiller", en: "You play" },
  pause: { no: "Pause", en: "Pause" },
  resume: { no: "Fortsett", en: "Resume" },
  score: { no: "Poeng", en: "Score" },
  best: { no: "Rekord", en: "Best" },
  crashes: { no: "Krasj", en: "Crashes" },
  loading: { no: "Starter scenen", en: "Starting the scene" },
  nogl: {
    no: "Nettleseren din viser ikke WebGL. Resten av siden fungerer som vanlig.",
    en: "Your browser can't show WebGL. The rest of the page works as usual.",
  },
};

export type TeleRow = { key: string; label: string };

type Props = {
  scene: SceneId;
  lang: Lang;
  tones: string[];
  /** CSS aspect-ratio of the canvas */
  aspect?: string;
  hint?: string;
  note?: React.ReactNode;
  tele?: TeleRow[];
  /** hero variant: no HUD, no controls */
  ambient?: boolean;
  label: string;
  className?: string;
};

const pad = (n: number) => String(n).padStart(4, "0");

export function Game({ scene, lang, tones, aspect = "16 / 9", hint, note, tele, ambient, label, className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const simRef = useRef<Sim | null>(null);
  const modeRef = useRef<Mode>("auto");
  const pausedRef = useRef(false);
  const teleRefs = useRef<Record<string, HTMLElement | null>>({});
  const [mode, setMode] = useState<Mode>("auto");
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [crashes, setCrashes] = useState(0);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const tonesKey = tones.join(",");

  useEffect(() => {
    const cv = canvas.current;
    const ov = overlay.current;
    const root = wrap.current;
    if (!cv || !ov || !root) return;
    let disposed = false;
    let raf = 0;
    let inView = false;
    let last = 0;
    let t = 0;
    let cleanup = () => {};
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      try {
        const [{ Stage }, { Labels }, factory] = await Promise.all([
          import("@/lib/stage/stage"),
          import("@/lib/stage/kit"),
          LOADERS[scene](),
        ]);
        if (disposed) return;
        const stage = new Stage(cv, { tones: tonesKey.split(","), target: ambient ? 560 : 640 });
        const labels = new Labels(ov);
        const sim = factory({
          labels,
          lang,
          hud: {
            score: (n) => {
              setScore(n);
              setBest((b) => Math.max(b, n));
            },
            crash: () => setCrashes((c) => c + 1),
            tele: (rows) => {
              for (const [k, v] of Object.entries(rows)) {
                const el = teleRefs.current[k];
                if (el && el.textContent !== v) el.textContent = v;
              }
            },
          },
        });
        simRef.current = sim;
        if (process.env.NODE_ENV !== "production") (window as unknown as Record<string, unknown>)[`__sim_${scene}`] = { sim, stage, labels };

        const fit = () => {
          stage.layout();
          sim.camera.aspect = stage.w / stage.h;
          sim.camera.updateProjectionMatrix();
        };
        fit();

        const frame = (now: number) => {
          raf = 0;
          const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
          last = now;
          if (!pausedRef.current) {
            t += dt;
            sim.update(dt, t);
          }
          stage.render(sim.scene, sim.camera);
          labels.update(sim.camera);
          if (inView && !pausedRef.current && !document.hidden) raf = requestAnimationFrame(frame);
        };
        const kick = () => {
          if (!raf && inView && !pausedRef.current && !document.hidden) {
            last = 0;
            raf = requestAnimationFrame(frame);
          }
        };

        // Reduced motion: advance the simulation a few seconds, draw one still, wait for the visitor.
        if (reduced) {
          for (let i = 0; i < 180; i++) sim.update(1 / 60, (t += 1 / 60));
          pausedRef.current = true;
          setPaused(true);
        }
        stage.render(sim.scene, sim.camera);
        labels.update(sim.camera);

        const io = new IntersectionObserver(
          ([e]) => {
            inView = e.isIntersecting;
            kick();
          },
          { rootMargin: "100px" },
        );
        io.observe(root);
        const ro = new ResizeObserver(() => {
          fit();
          stage.render(sim.scene, sim.camera);
          labels.update(sim.camera);
        });
        ro.observe(cv);
        const onVis = () => kick();
        document.addEventListener("visibilitychange", onVis);
        (root as HTMLDivElement & { __kick?: () => void }).__kick = kick;

        setState("ready");
        cleanup = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          ro.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          labels.clear();
          sim.dispose?.();
          stage.dispose();
        };
      } catch (err) {
        console.error(err);
        if (!disposed) setState("error");
      }
    })();

    return () => {
      disposed = true;
      cleanup();
      simRef.current = null;
    };
  }, [scene, lang, tonesKey, ambient]);

  // Keyboard only drives the scene while the visitor is playing and the scene is on screen.
  useEffect(() => {
    if (mode !== "play") return;
    const onKey = (e: KeyboardEvent) => {
      const k = KEYMAP[e.key];
      if (!k || !simRef.current) return;
      const r = wrap.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      simRef.current.input(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  const kick = () => (wrap.current as (HTMLDivElement & { __kick?: () => void }) | null)?.__kick?.();

  const choose = (m: Mode) => {
    modeRef.current = m;
    setMode(m);
    simRef.current?.setMode(m);
    setScore(0);
    if (pausedRef.current) togglePause();
    if (m === "play") canvas.current?.focus();
  };

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    kick();
  };

  const onPointer = (e: React.PointerEvent) => {
    if (modeRef.current !== "play" || !simRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    simRef.current.press?.(x, y);
  };

  return (
    <div className={`game ${ambient ? "game--ambient" : ""} ${className}`}>
      <div className="game-main">
        <div ref={wrap} className="game-screen" style={{ aspectRatio: aspect }}>
          <canvas
            ref={canvas}
            className="game-canvas"
            role="img"
            aria-label={label}
            tabIndex={ambient ? -1 : 0}
            onPointerDown={onPointer}
          />
          <div ref={overlay} className="game-labels" aria-hidden />
          {!ambient && (
            <div className="game-hud" aria-hidden>
              <span>
                {TEXT.score[lang]} <b>{pad(score)}</b>
                <span className="ml-3">
                  {TEXT.best[lang]} <b>{pad(best)}</b>
                </span>
              </span>
              <span>
                {TEXT.crashes[lang]} <b>{String(crashes).padStart(3, "0")}</b>
              </span>
            </div>
          )}
          {state === "loading" && <div className="game-state">{TEXT.loading[lang]}…</div>}
          {state === "error" && <div className="game-state">{TEXT.nogl[lang]}</div>}
          {note && !ambient && <div className="game-note">{note}</div>}
        </div>
        {!ambient && (
          <div className="game-controls">
            <div className="seg" role="group" aria-label="Mode">
              <button type="button" aria-pressed={mode === "auto"} onClick={() => choose("auto")}>
                {TEXT.auto[lang]}
              </button>
              <button type="button" aria-pressed={mode === "play"} onClick={() => choose("play")}>
                {TEXT.play[lang]}
              </button>
            </div>
            <button type="button" className="btn-ghost" onClick={togglePause}>
              {paused ? TEXT.resume[lang] : TEXT.pause[lang]}
            </button>
            {hint && <span className="game-hint">{hint}</span>}
          </div>
        )}
      </div>
      {tele && (
        <dl className="tele">
          {tele.map((row) => (
            <div key={row.key} className="tele-row">
              <dt>{row.label}</dt>
              <dd ref={(el) => void (teleRefs.current[row.key] = el)}>—</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
