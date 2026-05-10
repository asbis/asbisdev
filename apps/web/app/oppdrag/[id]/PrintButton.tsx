"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded border border-[color:var(--hairline)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] hover:bg-[color:color-mix(in_srgb,var(--foreground)_5%,transparent)]"
    >
      Eksporter PDF
    </button>
  );
}
