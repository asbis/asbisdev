import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { CONTENT, L, type Lang } from "@/lib/content";

const PHOTO_PATH = "/photo.jpg";
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "photo.jpg"));

export function About({ lang }: { lang: Lang }) {
  return (
    <section
      id="about"
      className="relative z-[2] border-t border-[color:var(--hairline)] px-5 sm:px-14"
      style={{ padding: "clamp(100px,12vw,140px) clamp(20px,4vw,56px)" }}
    >
      <div
        className="mx-auto grid max-w-[1280px] items-start gap-10 md:grid-cols-[minmax(240px,1fr)_1.6fr] md:gap-20"
      >
        <div>
          <div className="mb-5 text-[12px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
            {L(CONTENT.labels.about, lang)}
          </div>
          <div
            className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden border border-[color:var(--hairline)] font-mono text-xs tracking-wide text-[color:var(--muted)]"
            style={{
              background: hasPhoto
                ? undefined
                : "linear-gradient(135deg, color-mix(in srgb, var(--ink) 8%, transparent), color-mix(in srgb, var(--ink) 16%, transparent))",
            }}
          >
            {hasPhoto ? (
              <Image
                src={PHOTO_PATH}
                alt="Asbjørn Rørvik"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <>
                <span>PHOTO · 4:5</span>
                <span className="absolute bottom-4 left-4 text-[10px] opacity-60">
                  drop yours at public/photo.jpg
                </span>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="mb-12 flex flex-col gap-5">
            {CONTENT.about[lang].map((p, i) => (
              <p
                key={i}
                className="font-display m-0 font-normal leading-[1.35] tracking-[-0.01em]"
                style={{
                  fontSize: i === 0 ? "clamp(22px,2.2vw,30px)" : "clamp(18px,1.6vw,22px)",
                  textWrap: "pretty",
                }}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="mb-3.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {L(CONTENT.labels.languages, lang)}
              </div>
              <ul className="m-0 list-none p-0">
                {CONTENT.skills.languages.map((s) => (
                  <li
                    key={s}
                    className="border-b border-[color:var(--hairline)] py-2.5 text-base"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-3.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {L(CONTENT.labels.areas, lang)}
              </div>
              <ul className="m-0 list-none p-0">
                {CONTENT.skills.areas[lang].map((s) => (
                  <li
                    key={s}
                    className="border-b border-[color:var(--hairline)] py-2.5 text-base"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
