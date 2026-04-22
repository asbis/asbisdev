import { CONTENT, L, type Lang } from "@/lib/content";

export function Education({ lang }: { lang: Lang }) {
  return (
    <section
      id="education"
      className="relative z-[2] border-t border-[color:var(--hairline)] px-5 sm:px-14"
      style={{ padding: "clamp(80px,10vw,120px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-3.5 text-[12px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
          {L(CONTENT.labels.education, lang)}
        </div>
        <h2
          className="font-display m-0 mb-14 max-w-[820px] font-normal tracking-[-0.025em]"
          style={{ fontSize: "clamp(36px,5vw,56px)", textWrap: "balance" }}
        >
          {lang === "en" ? (
            <>
              Trained as an{" "}
              <em className="text-[color:var(--accent)]">engineer</em>.
            </>
          ) : (
            <>
              Utdannet{" "}
              <em className="text-[color:var(--accent)]">ingeniør</em>.
            </>
          )}
        </h2>

        <div>
          {CONTENT.education.map((ed, i) => (
            <div
              key={ed.school}
              className={`grid gap-4 border-t border-[color:var(--hairline)] py-6 sm:gap-10 ${
                i === CONTENT.education.length - 1 ? "border-b" : ""
              }`}
              style={{ gridTemplateColumns: "minmax(140px, 180px) 1fr" }}
            >
              <div className="text-[13px] tracking-wide tabular-nums text-[color:var(--muted)]">
                {ed.period}
              </div>
              <div>
                <div className="font-display text-[clamp(22px,2.8vw,32px)] leading-tight tracking-[-0.015em]">
                  {L(ed.degree, lang)}
                </div>
                <div className="mt-1 text-[13px] italic text-[color:var(--muted)]">
                  {ed.school}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
