import { CONTENT, L, type Lang } from "@/lib/content";

export function SideProjects({ lang }: { lang: Lang }) {
  return (
    <section
      id="also-building"
      className="relative z-[2] border-t border-[color:var(--hairline)] px-5 sm:px-14"
      style={{ padding: "clamp(80px,10vw,120px) clamp(20px,4vw,56px)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-wrap items-baseline justify-between gap-5">
          <div>
            <div className="mb-3.5 text-[12px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
              {lang === "en" ? "Also building" : "Bygger også"}
            </div>
            <h2
              className="font-display m-0 font-normal tracking-[-0.025em]"
              style={{ fontSize: "clamp(32px,4.5vw,52px)", textWrap: "balance" }}
            >
              {lang === "en" ? (
                <>
                  My own <em className="text-[color:var(--accent)]">products</em>.
                </>
              ) : (
                <>
                  Mine egne <em className="text-[color:var(--accent)]">produkter</em>.
                </>
              )}
            </h2>
          </div>
          <div className="max-w-[360px] text-[14px] leading-[1.55] text-[color:var(--muted)]">
            {lang === "en"
              ? "Two platforms I've built from scratch — one live, one launching soon."
              : "To plattformer jeg har bygget fra bunn — en i drift, en lanseres snart."}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {CONTENT.projects.map((p) => (
            <article
              key={p.id}
              className="flex flex-col border-t border-[color:var(--hairline)] pt-6"
            >
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <div className="font-display text-[clamp(28px,3vw,40px)] leading-none tracking-[-0.02em]">
                  {p.name}
                </div>
                <span className="font-display text-[15px] italic text-[color:var(--muted)]">
                  {p.url}
                </span>
              </div>
              <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {L(p.category, lang)}
              </div>
              <p
                className="m-0 text-[15px] leading-[1.55] text-[color:var(--ink)] opacity-85"
                style={{ textWrap: "pretty" }}
              >
                {L(p.long, lang)}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[color:var(--hairline)] px-3 py-1 text-[10px] uppercase tracking-wide text-[color:var(--muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
