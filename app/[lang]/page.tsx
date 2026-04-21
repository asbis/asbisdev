import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Clients } from "@/components/clients";
import { Projects } from "@/components/projects";
import { HowIWork } from "@/components/how-i-work";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import type { Lang } from "@/lib/content";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "no" }];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "no") notFound();
  const l = lang as Lang;

  return (
    <>
      <Nav lang={l} />
      <Hero lang={l} />
      <Clients lang={l} />
      <Projects lang={l} />
      <Experience lang={l} />
      <HowIWork lang={l} />
      <About lang={l} />
      <Contact lang={l} />
      <Footer lang={l} />
    </>
  );
}
