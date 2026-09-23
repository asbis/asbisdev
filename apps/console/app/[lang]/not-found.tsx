import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[70vh] flex-col items-start justify-center gap-4 py-24">
      <p className="label text-[var(--amber)]">404</p>
      <h1 className="h2">Ingen konsoll her. / Nothing on this console.</h1>
      <Link href="/no" className="u mono text-[14px]">
        consoleconsulting.no →
      </Link>
    </main>
  );
}
