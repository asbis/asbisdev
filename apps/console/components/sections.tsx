import Link from "next/link";
import {
  ABOUT,
  COMPARE,
  CONTACT,
  DELIVERED,
  DELIVERIES,
  FOOTER,
  HERO,
  NAV,
  SITE,
  TONES,
  WORK,
  mailto,
  type GameSection,
  type Lang,
} from "@/lib/content";
import { Game, type SceneId } from "./game";
import { DitherImage } from "./dither-image";

function Logo() {
  return (
    <span className="mono inline-flex items-center gap-2 whitespace-nowrap text-[12.5px] font-semibold tracking-tight">
      <svg width="18" height="18" viewBox="0 0 64 64" aria-hidden>
        <rect width="64" height="64" fill="currentColor" />
        <path d="M18 22 L30 32 L18 42" stroke="var(--amber)" strokeWidth="6" fill="none" strokeLinecap="square" />
        <rect x="34" y="38" width="14" height="6" fill="var(--amber)" />
      </svg>
      console consulting
    </span>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  const other = lang === "no" ? "en" : "no";
  return (
    <header className="amber">
      <div className="wrap flex items-center justify-between gap-4 py-4">
        <Link href={`/${lang}`} aria-label="Console Consulting">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label={lang === "no" ? "Hovedmeny" : "Main"}>
          {NAV.links.map((l) => (
            <a key={l.href} href={l.href} className="label hidden px-2 py-2 hover:underline sm:inline">
              {l.label[lang]}
            </a>
          ))}
          <Link href={`/${other}`} hrefLang={other === "no" ? "nb" : "en"} className="label px-2 py-2 hover:underline">
            {other.toUpperCase()}
          </Link>
          <a href={mailto(lang)} className="btn btn-solid ml-1">
            {NAV.cta[lang]}
          </a>
        </nav>
      </div>

      <div className="wrap pb-10 pt-12 md:pb-14 md:pt-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h1 className="display max-w-[12ch]">{HERO.headline[lang]}</h1>
            <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:gap-10 lg:grid-cols-8">
              <div className="md:col-span-7 lg:col-span-5">
                <p className="lead max-w-[46ch]">{HERO.lead[lang]}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={mailto(lang)} className="btn btn-solid">
                    {HERO.ctaPrimary[lang]}
                  </a>
                  <a href="#leveranser" className="btn btn-line">
                    {HERO.ctaWork[lang]}
                  </a>
                  <a href="#integrasjon" className="btn btn-line">
                    {HERO.ctaPlay[lang]}
                  </a>
                </div>
              </div>
              <p className="fine self-end md:col-span-5 md:col-start-8 lg:col-span-3 lg:col-start-6">{HERO.fine[lang]}</p>
            </div>
          </div>
          {/* The person you'd hire, on wide screens: dithered in ink straight onto the amber. */}
          <figure className="hidden self-end lg:col-span-4 lg:block">
            <DitherImage
              src={ABOUT.cutout}
              alt={ABOUT.photoAlt[lang]}
              width={624}
              height={1196}
              tones={["#171204", "#ffc414"]}
              resolution={230}
              contrast={1.3}
              brightness={0.17}
              transparent
              className="mx-auto max-w-[400px]"
            />
            <figcaption className="mono mt-3 border-t border-[var(--amber-line)] pt-3 text-[12px] leading-relaxed">
              <span className="block font-semibold">{ABOUT.name}</span>
              <span className="block">{ABOUT.role[lang]}</span>
            </figcaption>
          </figure>
        </div>

        <dl className="mt-12 grid grid-cols-2 border-t border-[var(--amber-line)] md:mt-16 md:grid-cols-4">
          {HERO.stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col border-b border-[var(--amber-line)] py-5 pr-4 md:border-b-0 md:py-6 ${i % 2 ? "border-l pl-4" : ""} ${i > 0 ? "md:border-l md:pl-5" : "md:pl-0"} ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="order-2 mt-2 max-w-[22ch] font-mono text-[12px] leading-snug">{s.label[lang]}</dt>
              <dd className="order-1 text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-none tracking-[-0.04em]">
                {lang === "no" ? s.value : s.valueEn}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

export function RigBand({ lang }: { lang: Lang }) {
  return (
    <section aria-label={HERO.rigLabel[lang]} className="relative">
      <Game
        scene="rig"
        ambient
        lang={lang}
        tones={TONES.dark}
        aspect="var(--rig-aspect)"
        label={HERO.rigLabel[lang]}
        className="rig"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="wrap flex flex-wrap items-end justify-between gap-2 pb-4">
          <p className="label bg-[var(--ink)] px-2 py-1 text-[var(--amber)]">{HERO.rigCaption[lang]}</p>
          <p className="label hidden bg-[var(--ink)] px-2 py-1 text-[var(--muted)] md:block">58.97° N · 5.73° E</p>
        </div>
      </div>
    </section>
  );
}

export function PlaySection({ s, scene, lang, flip = false }: { s: GameSection; scene: SceneId; lang: Lang; flip?: boolean }) {
  return (
    <section id={s.id} className="border-t border-[var(--line)] py-20 md:py-28">
      <div className="wrap">
        <div className={`grid gap-8 md:grid-cols-12 md:gap-10 ${flip ? "" : ""}`}>
          <div className="md:col-span-7">
            <p className="label mb-5 text-[var(--amber)]">{s.kicker[lang]}</p>
            <h2 className="h2">{s.title[lang]}</h2>
          </div>
          <p className="self-end text-[16.5px] leading-relaxed text-[color-mix(in_oklab,var(--paper)_80%,var(--ink))] md:col-span-5">
            {s.body[lang]}
          </p>
        </div>
        <div className="mt-12">
          <Game
            scene={scene}
            lang={lang}
            tones={TONES.dark}
            aspect="var(--game-aspect)"
            hint={s.hint[lang]}
            label={s.label[lang]}
            note={s.note[lang]}
            tele={s.tele.map((t) => ({ key: t.key, label: t.label[lang] }))}
          />
        </div>
        <div className="qa mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
          {s.qa.map((qa, i) => (
            <div key={i}>
              <h3>{qa.q[lang]}</h3>
              <p>{qa.a[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Delivered({ lang }: { lang: Lang }) {
  const rows = [...DELIVERIES].sort((a, b) => (b.year || "0").localeCompare(a.year || "0"));
  const c = DELIVERED.cols;
  return (
    <section id="leveranser" className="border-t border-[var(--line)] py-20 md:py-28">
      <div className="wrap">
        <p className="label mb-5 text-[var(--amber)]">{DELIVERED.kicker[lang]}</p>
        <h2 className="h2 max-w-[20ch]">{DELIVERED.title[lang]}</h2>
        <div className="mt-12 overflow-x-auto">
          <table className="table min-w-[760px]">
            <thead>
              <tr>
                <th className="w-[7%]">{c.year[lang]}</th>
                <th className="w-[18%]">{c.client[lang]}</th>
                <th>{c.what[lang]}</th>
                <th className="w-[19%]">{c.stack[lang]}</th>
                <th className="w-[22%]">{c.proof[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.client}>
                  <td className="text-[var(--muted)]">{d.year || "—"}</td>
                  <td>
                    <span className="font-semibold text-[var(--paper)]">{d.client}</span>
                    {d.own && <span className="ml-2 text-[10.5px] uppercase tracking-[0.08em] text-[var(--muted)]">{DELIVERED.own[lang]}</span>}
                  </td>
                  <td className="text-[color-mix(in_oklab,var(--paper)_85%,var(--ink))]">{d.what[lang]}</td>
                  <td className="text-[var(--muted)]">{d.stack}</td>
                  <td className="hl">{d.proof[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine mt-5 max-w-[80ch]">{DELIVERED.fine[lang]}</p>
      </div>
    </section>
  );
}

export function Compare({ lang }: { lang: Lang }) {
  return (
    <section id="sammenlign" className="border-t border-[var(--line)] py-20 md:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label mb-5 text-[var(--amber)]">{COMPARE.kicker[lang]}</p>
          <h2 className="h2">{COMPARE.title[lang]}</h2>
        </div>
        <div className="lg:col-span-8">
          <div className="overflow-x-auto">
            <table className="table min-w-[560px]">
              <thead>
                <tr>
                  <th className="w-[26%]" />
                  {COMPARE.heads.map((h, i) => (
                    <th key={i} className={i === 0 ? "!text-[var(--amber)]" : ""}>
                      {h[lang]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.rows.map((r, i) => (
                  <tr key={i}>
                    <td className="text-[var(--muted)]">{r.label[lang]}</td>
                    {r.cells.map((cell, j) => (
                      <td key={j} className={j === 0 ? "hl" : ""}>
                        {cell[lang]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="qa mt-12 grid gap-10 md:grid-cols-2">
            {COMPARE.qa.map((qa, i) => (
              <div key={i}>
                <h3>{qa.q[lang]}</h3>
                <p>{qa.a[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Work({ lang }: { lang: Lang }) {
  return (
    <section id="samarbeid" className="border-t border-[var(--line)] py-20 md:py-28">
      <div className="wrap">
        <p className="label mb-5 text-[var(--amber)]">{WORK.kicker[lang]}</p>
        <h2 className="h2">{WORK.title[lang]}</h2>

        <div className="mt-12 grid border-t border-[var(--line)] md:grid-cols-3">
          {WORK.forms.map((f, i) => (
            <div key={i} className={`border-b border-[var(--line)] py-7 md:border-b-0 md:py-8 ${i > 0 ? "md:border-l md:pl-8" : ""} md:pr-8`}>
              <h3 className="h3">{f.title[lang]}</h3>
              <p className="mt-3 text-[15.5px] text-[color-mix(in_oklab,var(--paper)_78%,var(--ink))]">{f.body[lang]}</p>
            </div>
          ))}
        </div>
        <p className="fine mt-6 border-t border-[var(--line)] pt-5 md:border-t-0 md:pt-0">{WORK.public[lang]}</p>

        <ol className="mt-16 grid gap-px bg-[var(--line)] md:grid-cols-3">
          {WORK.steps.map((s) => (
            <li key={s.n} className="bg-[var(--ink)] py-8 md:px-8 md:first:pl-0">
              <div className="mono flex items-baseline justify-between gap-4 text-[12px]">
                <span className="text-[var(--amber)]">{s.n}</span>
                <span className="uppercase tracking-[0.08em] text-[var(--muted)]">{s.meta[lang]}</span>
              </div>
              <h3 className="h3 mt-6">{s.title[lang]}</h3>
              <p className="mt-3 text-[15.5px] text-[color-mix(in_oklab,var(--paper)_78%,var(--ink))]">{s.body[lang]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About({ lang }: { lang: Lang }) {
  return (
    <section id="om" className="border-t border-[var(--line)] py-20 md:py-28">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5 lg:col-span-4">
          <DitherImage src={ABOUT.photo} alt={ABOUT.photoAlt[lang]} width={933} height={1400} tones={["#0b0b09", "#ffc414"]} resolution={260} />
        </div>
        <div className="md:col-span-7 lg:col-span-7 lg:col-start-6">
          <p className="label mb-5 text-[var(--amber)]">{ABOUT.kicker[lang]}</p>
          <h2 className="h2">{ABOUT.name}</h2>
          <p className="label mt-4 text-[var(--muted)]">{ABOUT.role[lang]}</p>
          <div className="prose-dim mt-8 max-w-[60ch] text-[17px] leading-relaxed text-[color-mix(in_oklab,var(--paper)_85%,var(--ink))]">
            {ABOUT.bio[lang].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="tags mt-8">
            {ABOUT.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="mt-8 flex gap-5">
            {ABOUT.links.map((l) => (
              <a key={l.href} href={l.href} className="u mono text-[13px]" target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact({ lang }: { lang: Lang }) {
  return (
    <section id="kontakt" className="amber">
      <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <h2 className="display max-w-[14ch] text-[clamp(2.6rem,6.6vw,6rem)] md:col-span-8">{CONTACT.title[lang]}</h2>
        <div className="self-end md:col-span-4">
          <p className="text-[17px] leading-relaxed">{CONTACT.body[lang]}</p>
          <a href={mailto(lang)} className="btn btn-solid mt-6">
            {CONTACT.cta[lang]} →
          </a>
          <p className="mono mt-4 text-[14px]">
            <a className="u" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const other = lang === "no" ? "en" : "no";
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="wrap flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between">
        <p className="fine">{FOOTER.line[lang]}</p>
        <p className="fine">{FOOTER.made[lang]}</p>
        <Link href={`/${other}`} className="fine u">
          {other === "no" ? "Norsk" : "English"}
        </Link>
      </div>
    </footer>
  );
}
