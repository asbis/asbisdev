export type Lang = "en" | "no";
export type Bilingual = { en: string; no: string };
export type BilingualList = { en: string[]; no: string[] };

export type Project = {
  id: string;
  name: string;
  url: string;
  category: Bilingual;
  pitch: Bilingual;
  long: Bilingual;
  stack: string[];
};

export type Client = { name: string; note: Bilingual };

export const CONTENT = {
  name: "Asbjørn Rørvik",
  role: {
    en: "Fullstack developer",
    no: "Fullstack-utvikler",
  } as Bilingual,
  tagline: {
    en: "I build products end-to-end — frontend, backend, mobile, infra. Fast, with AI as a force multiplier.",
    no: "Jeg bygger produkter fra ende til ende — frontend, backend, mobil, infrastruktur. Raskt, med AI som kraftmultiplikator.",
  } as Bilingual,
  about: {
    en: [
      "Asbjørn is a versatile fullstack developer with a strong technical background and experience from cross-disciplinary development projects in mobility, energy, payments, smart home and agriculture. He holds a bachelor's degree in automation and electronic design from the University of Stavanger, and combines solid frontend skills in Flutter and React Native with backend development in Go, .NET and Node.js.",
      "He has delivered solutions for leading companies including Equinor, Kolumbus, Altibox and Easee — from safety-critical offshore applications and real-time travel guides to smart-home services and payment solutions. He has also worked on HSE digitalisation for Norsk Landbruksrådgiving, and built two platforms from scratch: Supportify (AI-powered customer support for Shopify) and Dropby (a social app built in Go and Flutter).",
      "Asbjørn is equally comfortable building user interfaces as he is designing scalable APIs, setting up CI/CD pipelines, or implementing AI solutions. He is recognised for fast learning, a solution-oriented approach, and strong collaboration skills.",
    ],
    no: [
      "Asbjørn er en allsidig fullstack-utvikler med sterk teknisk bakgrunn og erfaring fra tverrfaglige utviklingsprosjekter innen mobilitet, energi, betaling, smarthus og landbruk. Han har en bachelorgrad i automatisering og elektronikkdesign fra Universitetet i Stavanger, og kombinerer solid frontend-kompetanse i Flutter og React Native med backend-utvikling i Go og .NET, samt Node.js.",
      "Han har levert løsninger for sterke aktører som Equinor, Kolumbus, Altibox og Easee – fra kritiske offshore-applikasjoner og sanntidsbaserte reiseguider til smarthustjenester og betalingsløsninger. I tillegg har han jobbet med HMS-digitalisering for Norsk Landbruksrådgiving og bygget to egne plattformer fra bunn: Supportify (AI-drevet kundesupport for Shopify) og Dropby (sosialt medium bygget i Go og Flutter).",
      "Asbjørn mestrer Go og .NET godt gjennom bruk både i jobbsammenheng og egne prosjekter, og er like komfortabel med å bygge brukergrensesnitt som med å designe skalerbare API-er, sette opp CI/CD-pipelines eller implementere AI-løsninger. Han er anerkjent for sin hurtige læreevne, løsningsorienterte tilnærming og gode samarbeidsevner.",
    ],
  } as BilingualList,
  clients: [
    { name: "Equinor", note: { en: "Energy", no: "Energi" } },
    { name: "Easee", note: { en: "EV charging", no: "EV-lading" } },
    { name: "Altibox", note: { en: "Telecom", no: "Telekom" } },
    { name: "Kolumbus", note: { en: "Transit", no: "Kollektiv" } },
    { name: "KSL", note: { en: "Agri standards", no: "Landbruksstandard" } },
  ] as Client[],
  projects: [
    {
      id: "dropby",
      name: "Dropby",
      url: "dropby",
      category: { en: "Social · Mobile", no: "Sosialt · Mobil" },
      pitch: {
        en: "A social network built on local events and activities — not reels.",
        no: "Et sosialt nettverk bygget på lokale arrangementer — ikke reels.",
      },
      long: {
        en: "Discover what's happening around you instead of scrolling endlessly. Dropby surfaces real gatherings, meetups and activities nearby, and makes it effortless to show up.",
        no: "Oppdag hva som skjer rundt deg i stedet for å scrolle i det uendelige. Dropby viser ekte samlinger og aktiviteter i nærheten, og gjør det enkelt å møte opp.",
      },
      stack: ["Flutter", "Dart", "Go", "Postgres"],
    },
    {
      id: "supportify",
      name: "Supportify",
      url: "supportify.no",
      category: { en: "SaaS · AI · Shopify · CTO", no: "SaaS · AI · Shopify · CTO" },
      pitch: {
        en: "AI customer support for Shopify — resolves up to 85% of tickets automatically.",
        no: "AI-kundesupport for Shopify — løser opptil 85 % av henvendelsene automatisk.",
      },
      long: {
        en: "One inbox for chat, email (Gmail/Outlook), Instagram and Messenger, backed by an AI agent that handles order tracking, returns, refunds and product questions. Built the full stack as CTO — backend, LLM integrations, semantic search, prompt engineering, dashboard and chat widget. Live across 100+ Shopify stores.",
        no: "Én innboks for chat, e-post (Gmail/Outlook), Instagram og Messenger, drevet av en AI-agent som håndterer ordresporing, retur, refusjon og produktspørsmål. Bygget hele stacken som CTO — backend, LLM-integrasjoner, semantisk søk, prompt engineering, dashboard og chat-widget. Live hos 100+ Shopify-butikker.",
      },
      stack: ["Next.js", "TypeScript", "Shopify API", "LLMs", "Postgres"],
    },
    {
      id: "flagchase",
      name: "Flagchase",
      url: "flagchase.com",
      category: { en: "Sports · App · NFC", no: "Sport · App · NFC" },
      pitch: {
        en: "Digital orienteering — find routes, run them, scan NFC checkpoints.",
        no: "Digital orientering — finn løyper, løp dem, skann NFC-poster.",
      },
      long: {
        en: "Maps nearby routes you can run. Print the map or follow it on your phone. Tap NFC posts at each checkpoint to log your run. Compete on leaderboards, earn badges, discover new places on foot.",
        no: "Viser løyper i nærheten. Skriv ut kartet eller følg det på mobilen. Tapp NFC-poster ved hver kontroll for å logge løpet. Konkurrer på tavler, tjen merker, oppdag nye steder til fots.",
      },
      stack: ["Flutter", "Go", "Mapbox", "NFC"],
    },
    {
      id: "shapeitup",
      name: "ShapeItUp",
      url: "shapeitup.dev",
      category: { en: "Dev tools · Open source", no: "Utviklerverktøy · Åpen kildekode" },
      pitch: {
        en: "Open-source CAD scripting in VS Code — built for AI agents.",
        no: "Open source CAD-scripting i VS Code — bygget for AI-agenter.",
      },
      long: {
        en: "Write CAD in TypeScript with clear errors, hot-reload, and a live 3D viewer. Designed so agents like Claude Code can iterate on geometry with tight feedback loops. Free and open.",
        no: "Skriv CAD i TypeScript med tydelige feilmeldinger, hot-reload og 3D-live-visning. Designet for at agenter som Claude Code kan iterere på geometri med tett feedback. Gratis og åpent.",
      },
      stack: ["TypeScript", "Three.js", "VS Code API", "OpenCascade"],
    },
  ] as Project[],
  skills: {
    languages: ["Go", ".NET / C#", "TypeScript", "Dart", "Kotlin / Swift", "Python"],
    areas: {
      en: [
        "Mobile (Flutter, React Native)",
        "Backend & APIs (Go, .NET, Node.js)",
        "Frontend (React, Next.js)",
        "AI / LLM integrations",
        "Payments & security (Adyen, PCI DSS)",
        "DevOps (Docker, Azure, CI/CD)",
      ],
      no: [
        "Mobil (Flutter, React Native)",
        "Backend & API-er (Go, .NET, Node.js)",
        "Frontend (React, Next.js)",
        "AI / LLM-integrasjoner",
        "Betaling og sikkerhet (Adyen, PCI DSS)",
        "DevOps (Docker, Azure, CI/CD)",
      ],
    } as BilingualList,
  },
  contact: {
    email: "hello@asbis.dev",
    github: "github.com/asbis",
    linkedin: "linkedin.com/in/asbjornrorvik",
    cvPath: "/cv.pdf",
  },
  invoicing: {
    entity: "Eksire AS",
    orgNr: "821 482 372",
  },
  seniority: {
    en: "8+ years shipping production systems across Norway — Equinor, Kolumbus, Altibox, Easee.",
    no: "8+ år med produksjonssystemer i Norge — Equinor, Kolumbus, Altibox, Easee.",
  } as Bilingual,
  experience: [
    {
      period: "2024 — now",
      role: { en: "Developer", no: "Utvikler" },
      company: "Netpower",
      note: {
        en: "Fullstack work for Aero Norway, NLR (TryggDrift) and Kolumbus. Backend in Go and .NET, mobile in Flutter and React Native. Also CTO for my own AI project Supportify.",
        no: "Fullstack-utvikling i prosjekter for Aero Norway, NLR (TryggDrift) og Kolumbus. Backend i Go og .NET, frontend i Flutter og React Native. CTO for eget AI-prosjekt Supportify.",
      },
    },
    {
      period: "2021 — 2024",
      role: { en: "Consultant", no: "Konsulent" },
      company: "Bouvet",
      note: {
        en: "Frontend-heavy mobile work in Flutter and React Native for Altibox (smart home), Equinor (offshore-critical apps) and Easee (EV charging + EaseePay).",
        no: "Frontend-utvikling i Flutter og React Native for kunder som Altibox, Equinor og Easee.",
      },
    },
    {
      period: "2020 — 2021",
      role: { en: "Developer", no: "Utvikler" },
      company: "WOIT AS",
      note: {
        en: "Mobile and web applications for SMB clients.",
        no: "Mobilutvikling og webapplikasjoner for små og mellomstore bedrifter.",
      },
    },
    {
      period: "2018 — 2020",
      role: { en: "Developer", no: "Utvikler" },
      company: "Norsahel · Needle AS",
      note: {
        en: "Early-stage product work, prototypes, and app/web development with a focus on UX and frontend.",
        no: "Utvikling av digitale løsninger og prototyper i tidlig fase. App- og webutvikling med fokus på brukeropplevelse og frontend.",
      },
    },
    {
      period: "2014 — 2021",
      role: { en: "Technician", no: "Tekniker" },
      company: "Vitenfabrikken (Jærmuseet)",
      note: {
        en: "Technical operations and maintenance of interactive exhibits and AV equipment at a science centre.",
        no: "Teknisk drift og vedlikehold av interaktive utstillinger og AV-utstyr ved vitensenter.",
      },
    },
  ],
  clientProjects: [
    {
      title: { en: "Aero Norway — Software for an aero-engine MRO", no: "Aero Norway — programvare for flymotorverksted" },
      client: "Aero Norway / ITP Aero",
      period: "2025 — now",
      role: { en: "Developer", no: "Utvikler" },
      note: {
        en: "Custom digital tools for Aero Norway, an aero-engine maintenance facility at Sola. Frontend and backend work with focus on integrations and data quality in a safety-critical domain.",
        no: "Skreddersydde digitale løsninger for Aero Norway, flymotorverksted på Sola. Frontend- og backend-utvikling med fokus på integrasjoner og datakvalitet i et komplekst og samfunnskritisk domene.",
      },
    },
    {
      title: { en: "TryggDrift (KSL) — HSE app for Norwegian agriculture", no: "TryggDrift (KSL) — HMS-app for norsk landbruk" },
      client: "Norsk Landbruksrådgiving (NLR)",
      period: "2025",
      role: { en: "Fullstack developer", no: "Fullstack-utvikler" },
      note: {
        en: "Digital HSE solution for farms — risk assessment, emergency planning and day-to-day HSE tasks. Built core screens in React Native and backend in .NET, from first commit to launch on App Store and Google Play. Replaces KSL Trygg.",
        no: "Digital HMS-løsning for landbruket. Dokumentasjon av risikovurdering, beredskapsplanlegging og HMS-oppgaver. Utviklet sentrale deler i React Native og backend i .NET, fra første kode til lansering på App Store og Google Play. Erstatter KSL Trygg.",
      },
    },
    {
      title: { en: "Kolumbus — Real-time travel guide", no: "Kolumbus — sanntidsbasert reiseguide" },
      client: "Kolumbus AS / Rogaland fylkeskommune",
      period: "2024 — 2025",
      role: { en: "Developer", no: "Utvikler" },
      note: {
        en: "Transit app serving 142 000+ monthly users — winner of Nordic Public Transport Design Award 2025. Built Flutter features for an explainable routing engine, real-time travel follow-up, contextual notifications and pay-as-you-go payments. Backend integrations against Kolumbus and Entur.",
        no: "Reiseguide med 142 000+ aktive brukere månedlig — vinner av Nordic Public Transport Design Award 2025. Utviklet Flutter-funksjonalitet for explainable routing, reiseoppfølging i sanntid, kontekstuelle varslinger og pay-as-you-go-betaling. Integrasjoner mot Kolumbus og Entur.",
      },
    },
    {
      title: { en: "Altibox Hjem — Smart home app", no: "Altibox Hjem — smarthustjenester" },
      client: "Lyse Energi AS",
      period: "2023 — 2024",
      role: { en: "Frontend developer", no: "Utvikler (frontend)" },
      note: {
        en: "Mobile app giving hundreds of thousands of Altibox customers control over wifi, guest networks, parental controls and home network troubleshooting. Flutter UI work in a cross-functional Scrum team.",
        no: "Mobilapp som gir hundretusener av Altibox-kunder kontroll over wifi, gjestenett, foreldrekontroll og feilsøking. Flutter-utvikling i tverrfaglig Scrum-team.",
      },
    },
    {
      title: { en: "Equinor — Offshore-critical operations apps", no: "Equinor — kritiske driftsapplikasjoner offshore" },
      client: "Equinor ASA",
      period: "2023",
      role: { en: "Frontend developer", no: "Utvikler (frontend)" },
      note: {
        en: "React Native development on Notifications and Workorders — two of Equinor's most business-critical apps for offshore platform operations. Strict uptime, reliability and safety requirements.",
        no: "React Native-utvikling på Notifications og Workorders — to av Equinors mest forretningskritiske apper for offshore-drift. Strenge krav til oppetid, pålitelighet og sikkerhet.",
      },
    },
    {
      title: { en: "Easee — EV charging app + EaseePay", no: "Easee — elbillade-app og EaseePay" },
      client: "Easee AS",
      period: "2021 — 2022",
      role: { en: "Frontend developer", no: "Utvikler (frontend)" },
      note: {
        en: "Flutter development on the Easee app. Built EaseePay from scratch — a Flutter library integrating with Adyen for fair cost splitting in housing co-ops. Worked directly on encryption, security and PCI DSS compliance. Rolled out to thousands of users.",
        no: "Flutter-utvikling på Easee-appen. Bygget EaseePay fra bunn — et Flutter-bibliotek med Adyen-integrasjon for rettferdig fordeling av ladekostnader i borettslag. Direkte arbeid med kryptering, sikkerhet og PCI DSS. Rullet ut til tusenvis av brukere.",
      },
    },
  ],
  education: [
    {
      period: "2013 — 2016",
      degree: {
        en: "BSc in Electromechanical Engineering",
        no: "Bachelor i Electromechanical Engineering",
      },
      school: "University of Stavanger",
    },
  ],
  labels: {
    selectedWork: { en: "Selected work", no: "Utvalgt arbeid" },
    clients: { en: "Trusted by", no: "Kunder" },
    about: { en: "About", no: "Om meg" },
    stack: { en: "Stack", no: "Stack" },
    contact: { en: "Get in touch", no: "Ta kontakt" },
    availability: { en: "Open to new work", no: "Åpen for nye oppdrag" },
    languages: { en: "Languages", no: "Språk" },
    areas: { en: "Areas", no: "Områder" },
    viewSite: { en: "Visit site", no: "Besøk" },
    experience: { en: "Experience", no: "Erfaring" },
    downloadCv: { en: "Download CV", no: "Last ned CV" },
  } as Record<string, Bilingual>,
  how: [
    {
      n: "01",
      t: { en: "Understand", no: "Forstå" },
      d: {
        en: "Quick call, sharp questions. What are we actually building, for whom, and why now?",
        no: "Rask prat, tydelige spørsmål. Hva bygger vi egentlig, for hvem, og hvorfor nå?",
      },
    },
    {
      n: "02",
      t: { en: "Ship v1 fast", no: "Lever v1 raskt" },
      d: {
        en: "A working thing in days, not months. AI-assisted where it saves time, hand-crafted where it matters.",
        no: "Noe som funker på dager, ikke måneder. AI-assistert der det sparer tid, håndlaget der det teller.",
      },
    },
    {
      n: "03",
      t: { en: "Iterate in the open", no: "Iterer åpent" },
      d: {
        en: "Short feedback loops. You see progress, I see blockers. No surprises at the end.",
        no: "Korte feedback-loops. Du ser fremdrift, jeg ser blokkeringer. Ingen overraskelser.",
      },
    },
    {
      n: "04",
      t: { en: "Document and share", no: "Dokumenter og del" },
      d: {
        en: "Documented, deployed, maintainable. Knowledge stays with the team — whether I stay or move on.",
        no: "Dokumentert, deployet, vedlikeholdbart. Kunnskapen blir igjen i teamet — enten jeg blir eller går videre.",
      },
    },
  ],
};

export function L<T>(o: T | Bilingual, lang: Lang): T extends Bilingual ? string : T {
  if (o && typeof o === "object" && "en" in (o as object) && "no" in (o as object)) {
    return (o as Bilingual)[lang] as never;
  }
  return o as never;
}
