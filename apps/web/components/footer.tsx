import { CONTENT } from "@/lib/content";
import type { Lang } from "@/lib/content";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="relative z-[2] flex flex-col items-start gap-2 border-t border-[color:var(--hairline)] px-5 py-7 text-[12px] uppercase tracking-wide text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-14">
      <span>© {new Date().getFullYear()} Asbjørn Rørvik</span>
      <span>
        {lang === "en" ? "Invoicing" : "Fakturering"} · {CONTENT.invoicing.entity} · org.nr{" "}
        {CONTENT.invoicing.orgNr}
      </span>
      <span>{lang === "en" ? "Based in Norway" : "Basert i Norge"}</span>
    </footer>
  );
}
