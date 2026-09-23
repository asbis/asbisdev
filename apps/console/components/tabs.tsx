"use client";

import { useEffect, useState } from "react";

type Tab = { href: string; label: string };

/** Sticky section tabs; the one whose section is on screen is marked current. */
export function Tabs({ tabs, cta }: { tabs: Tab[]; cta: { href: string; label: string } }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [tabs]);

  return (
    <nav className="nav" aria-label="Seksjoner">
      <div className="wrap flex items-stretch justify-between gap-4">
        <div className="tabs">
          {tabs.map((t) => (
            <a key={t.href} href={t.href} aria-current={active === t.href ? "true" : undefined}>
              {t.label}
            </a>
          ))}
        </div>
        <a href={cta.href} className="btn btn-amber my-2 hidden shrink-0 md:inline-flex">
          {cta.label}
        </a>
      </div>
    </nav>
  );
}
