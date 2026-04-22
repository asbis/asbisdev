import Link from "next/link";
import { LangToggle } from "./lang-toggle";
import { ThemeToggle } from "./theme-toggle";
import type { Lang } from "@/lib/content";

export function Nav({ lang }: { lang: Lang }) {
  const items =
    lang === "en"
      ? [
          { href: "#projects", label: "Work" },
          { href: "#experience", label: "Experience" },
          { href: "#how", label: "Process" },
          { href: "#about", label: "About" },
          { href: "#contact", label: "Contact" },
        ]
      : [
          { href: "#projects", label: "Arbeid" },
          { href: "#experience", label: "Erfaring" },
          { href: "#how", label: "Prosess" },
          { href: "#about", label: "Om" },
          { href: "#contact", label: "Kontakt" },
        ];

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b border-[color:var(--hairline)] px-5 py-5 sm:px-14 backdrop-blur"
      style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)" }}
    >
      <Link href={`/${lang}`} className="font-display text-[22px] italic tracking-tight">
        Asbjørn
      </Link>
      <div className="flex items-center gap-9">
        <div className="hidden gap-7 text-[13px] tracking-wide md:flex">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent)]"
            >
              {i.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
        <LangToggle lang={lang} />
      </div>
    </nav>
  );
}
