"use client";

import { motion } from "framer-motion";
import { CONTENT, L, type Lang } from "@/lib/content";

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="relative z-[2] px-5 pb-[clamp(100px,14vw,160px)] pt-[clamp(80px,12vw,140px)] sm:px-14">
      <div className="relative mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-11 flex items-center gap-2.5 text-[12px] uppercase tracking-[0.22em] text-[color:var(--muted)]"
        >
          <span>{L(CONTENT.role, lang)}</span>
          <span className="opacity-50">·</span>
          <span>{lang === "en" ? "Stavanger, Norway" : "Stavanger, Norge"}</span>
        </motion.div>

        <h1
          className="font-display m-0 font-normal leading-[0.9] tracking-[-0.035em] text-[color:var(--ink)]"
          style={{ fontSize: "clamp(60px,11.5vw,200px)", textWrap: "balance" }}
        >
          <Reveal delay={0.18}>
            <span className="italic">Asbjørn</span>
          </Reveal>
          <br />
          <Reveal delay={0.42}>
            <span className="italic text-[color:var(--accent)]">Rørvik.</span>
          </Reveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-13 max-w-[700px] leading-[1.45] text-[color:var(--ink)]"
          style={{ marginTop: 52, fontSize: "clamp(18px,1.55vw,24px)", textWrap: "pretty" }}
        >
          {L(CONTENT.tagline, lang)}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-5 text-[13px] uppercase tracking-[0.2em] text-[color:var(--muted)]"
        >
          {L(CONTENT.seniority, lang)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="mt-14 flex flex-wrap items-center gap-5"
        >
          <a
            href="#projects"
            className="inline-flex items-center rounded-full bg-[color:var(--ink)] px-7 py-4 text-sm text-[color:var(--bg)] transition-colors hover:bg-[color:var(--accent)]"
          >
            {lang === "en" ? "See the work" : "Se arbeidet"}
            <span className="ml-2">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center border-b border-[color:var(--hairline)] px-2 py-4 text-sm text-[color:var(--ink)]"
          >
            {lang === "en" ? "Get in touch" : "Ta kontakt"}
          </a>
        </motion.div>

        <div
          aria-hidden
          className="font-display pointer-events-none absolute select-none"
          style={{
            top: -60,
            right: "-3%",
            fontSize: "clamp(240px,30vw,480px)",
            color: "color-mix(in srgb, var(--accent) 10%, transparent)",
            lineHeight: 1,
            animation: "float 14s ease-in-out infinite",
            zIndex: -1,
          }}
        >
          ✦
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      style={{ paddingBottom: "0.05em" }}
    >
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
