import { CONTENT, L, type Lang } from "@/lib/content";

export function Clients({ lang }: { lang: Lang }) {
  return (
    <section className="relative z-[2] border-y border-[color:var(--hairline)] px-5 pb-20 pt-10 sm:px-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 text-[12px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
          {L(CONTENT.labels.clients, lang)}
        </div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {CONTENT.clients.map((c) => (
            <div key={c.name} className="border-l border-[color:var(--hairline)] pl-5">
              <div className="font-display text-[32px] tracking-tight">{c.name}</div>
              <div className="mt-1.5 text-xs tracking-wide text-[color:var(--muted)]">
                {L(c.note, lang)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
