import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { CONTENT, L, type Lang } from "@/lib/content";
import { PrintBar } from "./print-bar";
import "./cv.css";

const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", "photo.jpg"));

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "no" }];
}

export const metadata = {
  title: "Asbjørn Rørvik — CV",
};

export default async function CvPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "no") notFound();
  const l = lang as Lang;

  return (
    <div className="cv-page relative z-[2] mx-auto max-w-[820px] px-6 py-10 sm:px-10 sm:py-14">
      <PrintBar lang={l} />

      <header className="cv-header mb-8 flex items-center gap-6 border-b border-[color:var(--hairline)] pb-6">
        {hasPhoto && (
          <div className="cv-photo relative aspect-[4/5] w-[92px] shrink-0 overflow-hidden border border-[color:var(--hairline)]">
            <Image
              src="/photo.jpg"
              alt="Asbjørn Rørvik"
              fill
              sizes="92px"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1
            className="font-display m-0 leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(34px, 4.8vw, 44px)" }}
          >
            <span className="italic">Asbjørn</span>{" "}
            <span className="italic text-[color:var(--accent)]">Rørvik.</span>
          </h1>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {L(CONTENT.role, l)} · {lang === "en" ? "Stavanger, Norway" : "Stavanger, Norge"}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-[color:var(--ink)]">
            <a href={`mailto:${CONTENT.contact.email}`}>{CONTENT.contact.email}</a>
            <span className="opacity-40">·</span>
            <a href={`https://${CONTENT.contact.linkedin}`} target="_blank" rel="noreferrer">
              {CONTENT.contact.linkedin}
            </a>
            <span className="opacity-40">·</span>
            <a href={`https://${CONTENT.contact.github}`} target="_blank" rel="noreferrer">
              {CONTENT.contact.github}
            </a>
          </div>
        </div>
      </header>

      <Section title={lang === "en" ? "Profile" : "Profil"}>
        <div className="flex flex-col gap-2">
          {CONTENT.about[l].map((p, i) => (
            <p
              key={i}
              className="m-0 text-[12px] leading-[1.5]"
              style={{ textWrap: "pretty" }}
            >
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section title={lang === "en" ? "Selected projects" : "Utvalgte prosjekter"}>
        <div>
          {CONTENT.clientProjects.map((p, i) => (
            <article
              key={`${p.client}-${p.period}`}
              className={`grid gap-3 border-t border-[color:var(--hairline)] py-2.5 sm:gap-5 ${
                i === CONTENT.clientProjects.length - 1 ? "border-b" : ""
              }`}
              style={{ gridTemplateColumns: "100px 1fr" }}
            >
              <div className="text-[11px] tabular-nums leading-tight text-[color:var(--muted)]">
                <div>{p.period}</div>
                <div className="mt-0.5 italic">{L(p.role, l)}</div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px]"
                    style={{
                      background: "var(--accent)",
                      color: "var(--bg)",
                      fontFamily: "var(--font-display), serif",
                      fontStyle: "italic",
                      fontSize: 13,
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.company.replace(/[·].*$/, "").trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="font-display text-[16px] leading-tight tracking-[-0.01em]">
                    {p.company}
                    <span className="italic text-[color:var(--muted)]"> — {L(p.title, l)}</span>
                    <span className="text-[11px] not-italic tracking-[0.15em] text-[color:var(--muted)] sm:ml-2">
                      · {p.client.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p
                  className="mt-1 text-[12px] leading-[1.5] text-[color:var(--ink)] opacity-85"
                  style={{ textWrap: "pretty" }}
                >
                  {L(p.note, l)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title={lang === "en" ? "Side projects" : "Sideprosjekter"}>
        <div>
          {CONTENT.projects.map((p, i, arr) => (
              <article
                key={p.id}
                className={`grid gap-3 border-t border-[color:var(--hairline)] py-2.5 sm:gap-5 ${
                  i === arr.length - 1 ? "border-b" : ""
                }`}
                style={{ gridTemplateColumns: "100px 1fr" }}
              >
                <div className="text-[11px] italic leading-tight text-[color:var(--muted)]">
                  {p.url}
                </div>
                <div>
                  <div className="font-display text-[16px] leading-tight tracking-[-0.01em]">
                    {p.name}
                    <span className="text-[11px] not-italic tracking-[0.15em] text-[color:var(--muted)] sm:ml-2">
                      · {L(p.category, l).toUpperCase()}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[12px] leading-[1.5] text-[color:var(--ink)] opacity-85"
                    style={{ textWrap: "pretty" }}
                  >
                    {L(p.long, l)}
                  </p>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-[color:var(--muted)]">
                    {p.stack.join("  ·  ")}
                  </div>
                </div>
              </article>
            ))}
        </div>
      </Section>

      <Section title={lang === "en" ? "Experience" : "Arbeidserfaring"}>
        <div>
          {CONTENT.experience.map((e) => (
            <div
              key={`${e.company}-${e.period}`}
              className="grid gap-3 border-t border-[color:var(--hairline)] py-2 sm:gap-5"
              style={{ gridTemplateColumns: "100px 1fr" }}
            >
              <div className="text-[11px] tabular-nums leading-tight text-[color:var(--muted)]">
                {e.period}
              </div>
              <div>
                <div className="font-display text-[14px] leading-tight tracking-[-0.005em]">
                  {L(e.role, l)}{" "}
                  <span className="italic text-[color:var(--muted)]">· {e.company}</span>
                </div>
                <p
                  className="mt-0.5 text-[11.5px] leading-[1.5] text-[color:var(--ink)] opacity-80"
                  style={{ textWrap: "pretty" }}
                >
                  {L(e.note, l)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="cv-grid grid gap-x-10 gap-y-6 sm:grid-cols-2">
        <Section title={lang === "en" ? "Languages & stack" : "Språk og stack"}>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-4 p-0">
            {CONTENT.skills.languages.map((s) => (
              <li
                key={s}
                className="border-b border-[color:var(--hairline)] py-1 text-[12px]"
              >
                {s}
              </li>
            ))}
          </ul>
        </Section>
        <Section title={lang === "en" ? "Areas" : "Områder"}>
          <ul className="m-0 list-none p-0">
            {CONTENT.skills.areas[l].map((s) => (
              <li
                key={s}
                className="border-b border-[color:var(--hairline)] py-1 text-[12px]"
              >
                {s}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="cv-grid grid gap-x-10 gap-y-6 sm:grid-cols-2">
        <Section title={lang === "en" ? "Education" : "Utdannelse"}>
          {CONTENT.education.map((ed) => (
            <div key={ed.school} className="border-t border-[color:var(--hairline)] py-2">
              <div className="font-display text-[14px] leading-tight">{L(ed.degree, l)}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-[color:var(--muted)]">
                {ed.school} · {ed.period}
              </div>
            </div>
          ))}
        </Section>
        <Section title={lang === "en" ? "Spoken languages" : "Språk"}>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-[color:var(--hairline)] py-2 text-[12px]">
            {(lang === "en"
              ? ["Norwegian — Fluent", "English — Fluent", "German — Basic"]
              : ["Norsk — Flytende", "Engelsk — Flytende", "Tysk — Grunnleggende"]
            ).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </Section>
      </div>

      <footer className="cv-footer mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--hairline)] pt-4 text-[10px] uppercase tracking-wide text-[color:var(--muted)]">
        <span>© {new Date().getFullYear()} Asbjørn Rørvik</span>
        <span>
          {lang === "en" ? "Invoicing" : "Fakturering"} · {CONTENT.invoicing.entity} · org.nr{" "}
          {CONTENT.invoicing.orgNr}
        </span>
        <span>asbjornrorvik.com</span>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-section">
      <h2 className="text-[10.5px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
