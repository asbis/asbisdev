import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ClientProjects } from "@/components/client-projects";
import { SideProjects } from "@/components/side-projects";
import { HowIWork } from "@/components/how-i-work";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
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
      <ClientProjects lang={l} />
      <SideProjects lang={l} />
      <Experience lang={l} />
      <Education lang={l} />
      <HowIWork lang={l} />
      <About lang={l} />
      <Contact lang={l} />
      <Footer lang={l} />
    </>
  );
}
