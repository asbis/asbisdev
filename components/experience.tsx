import { CONTENT, L, type Lang } from "@/lib/content";

export function Experience({ lang }: { lang: Lang }) {
  return (
    <section
      id="experience"
      className="relative z-[2] border-t border-[color:var(--hairline)] px-5 sm:px-14"
      style={{ padding: "clamp(100px,12vw,140px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-3.5 text-[12px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
          {L(CONTENT.labels.experience, lang)}
        </div>
        <h2
          className="font-display m-0 mb-[72px] max-w-[820px] font-normal tracking-[-0.025em]"
          style={{ fontSize: "clamp(40px,5.5vw,64px)", textWrap: "balance" }}
        >
          {lang === "en" ? (
            <>
              Where I&apos;ve <em className="text-[color:var(--accent)]">worked</em>.
            </>
          ) : (
            <>
              Hvor jeg har <em className="text-[color:var(--accent)]">jobbet</em>.
            </>
          )}
        </h2>

        <div>
          {CONTENT.experience.map((e, i) => (
            <div
              key={`${e.company}-${e.period}`}
              className="grid gap-4 border-t border-[color:var(--hairline)] py-9 sm:gap-10"
              style={{ gridTemplateColumns: "minmax(140px, 180px) 1fr" }}
            >
              <div className="text-[13px] tracking-wide tabular-nums text-[color:var(--muted)]">
                {e.period}
              </div>
              <div>
                <div className="font-display text-[clamp(24px,3vw,36px)] leading-tight tracking-[-0.02em]">
                  {L(e.role, lang)}{" "}
                  <span className="italic text-[color:var(--muted)]">· {e.company}</span>
                </div>
                <div
                  className="mt-2.5 max-w-[720px] text-[15px] text-[color:var(--ink)] opacity-75"
                  style={{ textWrap: "pretty" }}
                >
                  {L(e.note, lang)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="grid gap-4 border-t border-b border-[color:var(--hairline)] py-9 sm:gap-10"
          style={{ gridTemplateColumns: "minmax(140px, 180px) 1fr" }}
        >
          <div className="text-[13px] tracking-wide tabular-nums text-[color:var(--muted)]">
            {CONTENT.education[0].period}
          </div>
          <div>
            <div className="font-display text-[clamp(24px,3vw,36px)] leading-tight tracking-[-0.02em]">
              {L(CONTENT.education[0].degree, lang)}{" "}
              <span className="italic text-[color:var(--muted)]">
                · {CONTENT.education[0].school}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
