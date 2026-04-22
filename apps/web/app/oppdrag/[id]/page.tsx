import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { listDocs, readDoc } from "@/lib/oppdrag";
import "../oppdrag.css";

export const dynamic = "force-dynamic";

const KIND_LABELS: Record<string, string> = {
  analysis: "Analyse & strategi",
  tender: "Kunngjøring",
  notes: "Notater",
  draft: "Tilbud (utkast)",
};

export default async function TenderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { id } = await params;
  const { view } = await searchParams;
  const available = listDocs(id);
  if (available.length === 0) notFound();

  const kind = (available.includes(view as any) ? view : available[0]) as
    | "analysis"
    | "tender"
    | "notes"
    | "draft";
  const doc = readDoc(id, kind);
  if (!doc) notFound();

  const fm = doc.frontmatter;

  return (
    <div className="mx-auto max-w-[820px] px-6 py-12 sm:px-10 sm:py-16">
      <nav className="mb-6 text-xs uppercase tracking-[0.15em] text-[color:color-mix(in_srgb,var(--foreground)_55%,transparent)]">
        <Link href="/oppdrag" className="hover:underline underline-offset-4">
          ← Alle oppdrag
        </Link>
      </nav>

      <header className="mb-4">
        <p className="text-xs uppercase tracking-[0.15em] text-[color:color-mix(in_srgb,var(--foreground)_55%,transparent)]">
          {id}
        </p>
        {fm.title && (
          <h1 className="mt-1 font-serif text-[2.25rem] font-normal leading-[1.1] tracking-tight">
            {fm.title}
          </h1>
        )}
      </header>

      {(fm.status || fm.deadline || fm.budget || fm.contract || fm.questionsDeadline) && (
        <dl className="oppdrag-meta">
          {fm.status && (
            <>
              <dt>Status</dt>
              <dd>{fm.status}</dd>
            </>
          )}
          {fm.deadline && (
            <>
              <dt>Frist</dt>
              <dd>{fm.deadline}</dd>
            </>
          )}
          {fm.questionsDeadline && (
            <>
              <dt>Spørsmål</dt>
              <dd>{fm.questionsDeadline}</dd>
            </>
          )}
          {fm.budget && (
            <>
              <dt>Budsjett</dt>
              <dd>{fm.budget}</dd>
            </>
          )}
          {fm.contract && (
            <>
              <dt>Kontrakt</dt>
              <dd>{fm.contract}</dd>
            </>
          )}
        </dl>
      )}

      {available.length > 1 && (
        <nav className="mb-6 flex gap-1 text-sm border-b border-[color:var(--hairline)]">
          {available.map((k) => {
            const active = k === kind;
            return (
              <Link
                key={k}
                href={`/oppdrag/${id}?view=${k}`}
                className={`px-3 py-2 border-b-2 -mb-px ${
                  active
                    ? "border-[color:var(--foreground)] font-medium"
                    : "border-transparent text-[color:color-mix(in_srgb,var(--foreground)_60%,transparent)] hover:text-[color:var(--foreground)]"
                }`}
              >
                {KIND_LABELS[k] ?? k}
              </Link>
            );
          })}
        </nav>
      )}

      <article className="oppdrag-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
      </article>
    </div>
  );
}
