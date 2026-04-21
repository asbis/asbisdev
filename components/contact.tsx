import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { CONTENT, L, type Lang } from "@/lib/content";

const hasCv = fs.existsSync(path.join(process.cwd(), "public", "cv.pdf"));

export function Contact({ lang }: { lang: Lang }) {
  const email = CONTENT.contact.email;
  const roleSubject = encodeURIComponent(
    lang === "en" ? "Role inquiry" : "Henvendelse om stilling",
  );
  const projectSubject = encodeURIComponent(
    lang === "en" ? "Project inquiry" : "Henvendelse om prosjekt",
  );

  return (
    <section
      id="contact"
      className="relative z-[2] border-t border-[color:var(--hairline)] px-5 sm:px-14"
      style={{
        padding: "clamp(120px,14vw,160px) clamp(20px,4vw,56px)",
        background: "color-mix(in srgb, var(--accent) 6%, transparent)",
      }}
    >
      <div className="mx-auto max-w-[1100px] text-center">
        <div className="mb-6 text-[12px] uppercase tracking-[0.25em] text-[color:var(--muted)]">
          {L(CONTENT.labels.contact, lang)}
        </div>
        <h2
          className="font-display m-0 font-normal leading-[0.95] tracking-[-0.03em]"
          style={{ fontSize: "clamp(56px,9vw,132px)", textWrap: "balance" }}
        >
          {lang === "en" ? (
            <>
              Let&apos;s <em className="text-[color:var(--accent)]">build</em> something.
            </>
          ) : (
            <>
              La oss <em className="text-[color:var(--accent)]">bygge</em> noe.
            </>
          )}
        </h2>
        <p
          className="mx-auto mt-8 max-w-[560px] text-lg leading-[1.55] text-[color:var(--muted)]"
          style={{ textWrap: "pretty" }}
        >
          {lang === "en"
            ? "Hiring for a role, or starting a project? I do both. Pick whichever fits."
            : "Ansetter du til en stilling, eller starter du et prosjekt? Jeg gjør begge deler. Velg det som passer."}
        </p>

        <div className="mt-14 flex flex-col items-stretch gap-3.5 sm:flex-row sm:flex-wrap sm:justify-center">
          <CtaCard
            href={`mailto:${email}?subject=${roleSubject}`}
            kicker={lang === "en" ? "For hiring managers" : "For ansettelsesansvarlige"}
            title={lang === "en" ? "Talk about a role" : "Snakk om en stilling"}
            value={email}
            primary
          />
          <CtaCard
            href={`mailto:${email}?subject=${projectSubject}`}
            kicker={lang === "en" ? "For founders & teams" : "For gründere og team"}
            title={lang === "en" ? "Start a project" : "Start et prosjekt"}
            value={email}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-[13px] text-[color:var(--muted)]">
          <Link
            href={`/${lang}/cv`}
            className="inline-flex items-center gap-1.5 border-b border-[color:var(--hairline)] pb-0.5 hover:text-[color:var(--accent)]"
          >
            {lang === "en" ? "View CV" : "Se CV"} →
          </Link>
          {hasCv && (
            <a
              href={CONTENT.contact.cvPath}
              className="inline-flex items-center gap-1.5 border-b border-[color:var(--hairline)] pb-0.5 hover:text-[color:var(--accent)]"
            >
              {L(CONTENT.labels.downloadCv, lang)} ↓
            </a>
          )}
          <a
            href={`https://${CONTENT.contact.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[color:var(--accent)]"
          >
            LinkedIn ↗
          </a>
          <a
            href={`https://${CONTENT.contact.github}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[color:var(--accent)]"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function CtaCard({
  href,
  kicker,
  title,
  value,
  primary,
}: {
  href: string;
  kicker: string;
  title: string;
  value: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex min-w-[260px] flex-col items-start gap-2 px-8 py-6 text-left leading-tight transition-transform hover:-translate-y-0.5 ${
        primary
          ? "border border-[color:var(--ink)] bg-[color:var(--ink)] text-[color:var(--bg)]"
          : "border border-[color:var(--hairline)] text-[color:var(--ink)]"
      }`}
    >
      <span className="text-[11px] uppercase tracking-[0.18em] opacity-60">{kicker}</span>
      <span className="font-display text-[22px] tracking-tight">{title}</span>
      <span className="inline-flex items-center gap-2 text-sm opacity-80">
        {value}
        <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          ↗
        </span>
      </span>
    </a>
  );
}
