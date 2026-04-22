import Link from "next/link";
import { listTenders } from "@/lib/oppdrag";
import "./oppdrag.css";

export const dynamic = "force-dynamic";

export default function OppdragIndex() {
  const tenders = listTenders();

  return (
    <div className="mx-auto max-w-[820px] px-6 py-12 sm:px-10 sm:py-16">
      <header className="mb-10 border-b border-[color:var(--hairline)] pb-6">
        <p className="text-xs uppercase tracking-[0.15em] text-[color:color-mix(in_srgb,var(--foreground)_55%,transparent)]">
          Privat
        </p>
        <h1 className="mt-2 font-serif text-4xl font-normal leading-tight tracking-tight">
          Oppdrag
        </h1>
        <p className="mt-2 text-sm text-[color:color-mix(in_srgb,var(--foreground)_70%,transparent)]">
          Aktive anbud og konkurransegrunnlag under vurdering.
        </p>
      </header>

      {tenders.length === 0 ? (
        <p className="text-sm text-[color:color-mix(in_srgb,var(--foreground)_60%,transparent)]">
          Ingen aktive oppdrag registrert.
        </p>
      ) : (
        <ul className="space-y-6">
          {tenders.map((t) => {
            const title = t.frontmatter.title ?? t.id;
            const status = t.frontmatter.status;
            const deadline = t.frontmatter.deadline;
            const budget = t.frontmatter.budget;
            return (
              <li
                key={t.id}
                className="border-b border-[color:var(--hairline)] pb-5 last:border-0"
              >
                <Link
                  href={`/oppdrag/${t.id}`}
                  className="group block hover:bg-[color:color-mix(in_srgb,var(--foreground)_3%,transparent)] -mx-3 px-3 py-2 rounded"
                >
                  <h2 className="font-serif text-xl font-normal leading-tight group-hover:underline underline-offset-4">
                    {title}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.1em] text-[color:color-mix(in_srgb,var(--foreground)_60%,transparent)]">
                    {status && <span>{status}</span>}
                    {deadline && <span>Frist {deadline}</span>}
                    {budget && <span>{budget}</span>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
