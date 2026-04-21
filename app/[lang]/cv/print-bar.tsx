"use client";

import Link from "next/link";
import type { Lang } from "@/lib/content";

export function PrintBar({ lang }: { lang: Lang }) {
  return (
    <div className="cv-print-bar mb-10 flex items-center justify-between text-[12px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-2 hover:text-[color:var(--accent)]"
      >
        ← {lang === "en" ? "Back to portfolio" : "Tilbake"}
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 border border-[color:var(--hairline)] px-3 py-1.5 hover:text-[color:var(--accent)]"
      >
        {lang === "en" ? "Print / Save PDF" : "Skriv ut / lagre PDF"} ↓
      </button>
    </div>
  );
}
