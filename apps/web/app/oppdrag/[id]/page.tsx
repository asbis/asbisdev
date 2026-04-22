import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { listDocs, readDoc } from "@/lib/oppdrag";
import "../oppdrag.css";

export const dynamic = "force-dynamic";

const SECTION_LABELS: Record<string, string> = {
  analyse: "Analyse",
  "vart-utkast": "Utkast",
  metadata: "Metadata",
};

export default async function TenderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ doc?: string }>;
}) {
  const { id } = await params;
  const { doc: docParam } = await searchParams;
  const docs = listDocs(id);
  if (docs.length === 0) notFound();

  const selectedSlug = docParam && docs.some((d) => d.slug === docParam) ? docParam : docs[0].slug;
  const loaded = readDoc(id, selectedSlug);
  if (!loaded) notFound();

  const fm = loaded.frontmatter;

  // Group docs by section
  const grouped = docs.reduce<Record<string, typeof docs>>((acc, d) => {
    const key = d.section ?? "_root";
    (acc[key] ??= []).push(d);
    return acc;
  }, {});
  const sectionOrder = ["_root", "analyse", "vart-utkast", "metadata"];
  const otherSections = Object.keys(grouped).filter((k) => !sectionOrder.includes(k));
  const orderedSections = [...sectionOrder.filter((s) => grouped[s]), ...otherSections];

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10 sm:px-10 sm:py-14">
      <nav className="mb-6 text-xs uppercase tracking-[0.15em] text-[color:color-mix(in_srgb,var(--foreground)_55%,transparent)]">
        <Link href="/oppdrag" className="hover:underline underline-offset-4">
          ← Alle oppdrag
        </Link>
      </nav>

      <header className="mb-6 border-b border-[color:var(--hairline)] pb-5">
        <p className="text-xs uppercase tracking-[0.15em] text-[color:color-mix(in_srgb,var(--foreground)_55%,transparent)]">
          {id}
        </p>
        {fm.title && (
          <h1 className="mt-1 font-serif text-[2rem] font-normal leading-[1.1] tracking-tight">
            {fm.title}
          </h1>
        )}
        {(fm.status || fm.deadline || fm.budget || fm.contract) && (
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.08em] text-[color:color-mix(in_srgb,var(--foreground)_65%,transparent)]">
            {fm.status && <span>{fm.status}</span>}
            {fm.deadline && <span>Frist {fm.deadline}</span>}
            {fm.contract && <span>{fm.contract}</span>}
            {fm.budget && <span>{fm.budget}</span>}
          </div>
        )}
      </header>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="text-sm">
          {orderedSections.map((s) => {
            const label = s === "_root" ? null : SECTION_LABELS[s] ?? s;
            return (
              <div key={s} className="mb-5">
                {label && (
                  <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:color-mix(in_srgb,var(--foreground)_55%,transparent)]">
                    {label}
                  </h3>
                )}
                <ul className="space-y-1">
                  {grouped[s].map((d) => {
                    const active = d.slug === selectedSlug;
                    return (
                      <li key={d.slug}>
                        <Link
                          href={`/oppdrag/${id}?doc=${d.slug}`}
                          className={`block rounded px-2 py-1 leading-tight capitalize ${
                            active
                              ? "bg-[color:color-mix(in_srgb,var(--foreground)_6%,transparent)] font-medium"
                              : "text-[color:color-mix(in_srgb,var(--foreground)_72%,transparent)] hover:text-[color:var(--foreground)]"
                          }`}
                        >
                          {d.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </aside>

        <article className="oppdrag-prose min-w-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{loaded.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
