"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/content";

export function LangToggle({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const swap = (l: Lang) => {
    const parts = pathname.split("/");
    parts[1] = l;
    return parts.join("/") || `/${l}`;
  };

  return (
    <div className="inline-flex rounded-full border border-[color:var(--hairline)] p-0.5">
      {(["en", "no"] as Lang[]).map((l) => (
        <Link
          key={l}
          href={swap(l)}
          className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors ${
            lang === l
              ? "bg-[color:var(--ink)] text-[color:var(--bg)]"
              : "text-[color:var(--ink)]"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
