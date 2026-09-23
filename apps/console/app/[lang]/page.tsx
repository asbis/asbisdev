import { notFound } from "next/navigation";
import { APP, INTEGRATION, NAV, PLATFORM, TABS, hasLang, mailto } from "@/lib/content";
import { About, Compare, Contact, Delivered, Footer, Hero, PlaySection, RigBand, Work } from "@/components/sections";
import { Tabs } from "@/components/tabs";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLang(lang)) notFound();

  return (
    <>
      <Hero lang={lang} />
      <RigBand lang={lang} />
      <Tabs tabs={TABS.map((t) => ({ href: t.href, label: t.label[lang] }))} cta={{ href: mailto(lang), label: NAV.cta[lang] }} />
      <main id="innhold">
        <PlaySection s={INTEGRATION} scene="router" lang={lang} />
        <PlaySection s={APP} scene="transit" lang={lang} />
        <PlaySection s={PLATFORM} scene="stack" lang={lang} />
        <Delivered lang={lang} />
        <Compare lang={lang} />
        <Work lang={lang} />
        <About lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
