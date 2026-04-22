"use client";

import { useState } from "react";
import { CONTENT, L, type Lang, type Project } from "@/lib/content";

export function SideProjects({ lang }: { lang: Lang }) {
  return (
    <section
      id="also-building"
      className="relative z-[2] border-t border-[color:var(--hairline)] px-5 sm:px-14"
      style={{ padding: "clamp(80px,10vw,120px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-[72px] flex flex-wrap items-baseline justify-between gap-5">
          <div>
            <div className="mb-3.5 text-[12px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
              {lang === "en" ? "Also building" : "Bygger også"}
            </div>
            <h2
              className="font-display m-0 font-normal tracking-[-0.025em]"
              style={{ fontSize: "clamp(36px,5vw,56px)", textWrap: "balance" }}
            >
              {lang === "en" ? (
                <>
                  My own <em className="text-[color:var(--accent)]">projects</em>.
                </>
              ) : (
                <>
                  Mine egne <em className="text-[color:var(--accent)]">prosjekter</em>.
                </>
              )}
            </h2>
          </div>
          <div className="max-w-[360px] text-[14px] leading-[1.55] text-[color:var(--muted)]">
            {lang === "en"
              ? "Side projects I work on in my own time — what I build when nobody tells me to."
              : "Sideprosjekter jeg jobber med på fritiden — det jeg bygger når ingen ber meg om det."}
          </div>
        </div>

        <div>
          {CONTENT.projects.map((p, i) => (
            <SideRow
              key={p.id}
              p={p}
              i={i}
              lang={lang}
              last={i === CONTENT.projects.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SideRow({
  p,
  i,
  lang,
  last,
}: {
  p: Project;
  i: number;
  lang: Lang;
  last: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative border-t border-[color:var(--hairline)] ${last ? "border-b" : ""}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid w-full cursor-pointer items-center gap-4 py-9 text-left sm:gap-10"
        style={{
          gridTemplateColumns: "56px 1fr auto",
          paddingLeft: hover ? 16 : 0,
          transition: "padding .35s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <span className="text-[13px] tracking-widest tabular-nums text-[color:var(--muted)]">
          0{i + 1}
        </span>
        <span>
          <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            {L(p.category, lang)}
          </div>
          <div className="flex flex-wrap items-baseline gap-3.5">
            <span
              className="font-display font-normal leading-none tracking-[-0.02em]"
              style={{
                fontSize: "clamp(36px,4.5vw,56px)",
                color: hover ? "var(--accent)" : "var(--ink)",
                transition: "color .2s",
              }}
            >
              {p.name}
            </span>
            <span className="font-display text-xl italic text-[color:var(--muted)]">
              — {p.url}
            </span>
          </div>
          <div
            className="mt-2.5 max-w-[760px] text-[15px] text-[color:var(--ink)] opacity-75"
            style={{ textWrap: "pretty" }}
          >
            {L(p.pitch, lang)}
          </div>
        </span>
        <span className="inline-flex items-center gap-2.5 whitespace-nowrap text-[13px] text-[color:var(--muted)]">
          <span>
            {open ? (lang === "en" ? "Close" : "Lukk") : lang === "en" ? "Details" : "Detaljer"}
          </span>
          <span
            className="inline-block text-lg"
            style={{
              transform: open ? "rotate(45deg)" : "rotate(0)",
              transition: "transform .35s cubic-bezier(.2,.7,.2,1)",
              color: hover ? "var(--accent)" : "var(--muted)",
            }}
          >
            +
          </span>
        </span>
      </button>

      <div
        className="grid"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows .5s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <div className="overflow-hidden">
          <div
            className="grid gap-4 pb-11 sm:gap-10"
            style={{ gridTemplateColumns: "56px 1fr" }}
          >
            <div />
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p
                  className="m-0 max-w-[580px] text-base leading-[1.65] text-[color:var(--ink)] opacity-80"
                  style={{ textWrap: "pretty" }}
                >
                  {L(p.long, lang)}
                </p>
                <a
                  href={`https://${p.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm text-[color:var(--accent)]"
                >
                  {L(CONTENT.labels.viewSite, lang)} ↗
                </a>
              </div>
              <div>
                <div className="mb-3.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {L(CONTENT.labels.stack, lang)}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[color:var(--hairline)] px-3 py-1.5 text-[11px] uppercase tracking-wide text-[color:var(--muted)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
