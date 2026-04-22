import { CONTENT, L, type Lang } from "@/lib/content";

export function HowIWork({ lang }: { lang: Lang }) {
  return (
    <section
      id="how"
      className="relative z-[2] border-t border-[color:var(--hairline)] px-5 sm:px-14"
      style={{ padding: "clamp(100px,12vw,140px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-3.5 text-[12px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
          {lang === "en" ? "How I work with teams" : "Slik jobber jeg med team"}
        </div>
        <h2
          className="font-display m-0 mb-[72px] max-w-[820px] font-normal tracking-[-0.025em]"
          style={{ fontSize: "clamp(40px,5.5vw,64px)", textWrap: "balance" }}
        >
          {lang === "en" ? (
            <>
              Tight feedback loops.{" "}
              <em className="text-[color:var(--accent)]">Working code</em>, early.
            </>
          ) : (
            <>
              Tette feedback-loops.{" "}
              <em className="text-[color:var(--accent)]">Fungerende kode</em>, tidlig.
            </>
          )}
        </h2>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          {CONTENT.how.map((s) => (
            <div
              key={s.n}
              className="border-t border-[color:var(--hairline)] pt-6"
            >
              <div className="mb-3 text-[13px] tracking-widest tabular-nums text-[color:var(--accent)]">
                {s.n}
              </div>
              <div className="font-display mb-2.5 text-[28px] tracking-tight">
                {L(s.t, lang)}
              </div>
              <div
                className="text-[15px] leading-[1.55] text-[color:var(--muted)]"
                style={{ textWrap: "pretty" }}
              >
                {L(s.d, lang)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
