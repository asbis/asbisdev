import Image from "next/image";
import { CONTENT, type Lang } from "@/lib/content";

export function ClientLogos({ lang }: { lang: Lang }) {
  return (
    <section
      aria-label={lang === "en" ? "Clients" : "Kunder"}
      className="relative z-[2] border-y border-[color:var(--hairline)] px-5 py-10 sm:px-14 sm:py-14"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 text-center text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
          {lang === "en"
            ? "Production systems shipped for"
            : "Produksjonssystemer levert for"}
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 md:gap-x-20">
          {CONTENT.clientProjects.map((p) => (
            <li
              key={p.company}
              className="group flex h-[40px] items-center"
              title={p.company}
            >
              <Image
                src={p.logo}
                alt={p.company}
                width={160}
                height={40}
                unoptimized
                className="client-logo h-full w-auto max-w-[140px] object-contain sm:max-w-[160px]"
                style={{ maxHeight: 40 }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
