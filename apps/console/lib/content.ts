export type Lang = "no" | "en";
export type T = { no: string; en: string };

export const LANGS: Lang[] = ["no", "en"];
export const hasLang = (l: string): l is Lang => l === "no" || l === "en";

export const SITE = {
  name: "Console Consulting",
  url: "https://consoleconsulting.no",
  email: "hei@consoleconsulting.no",
  city: "Stavanger",
};

export const mailto = (lang: Lang) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(lang === "no" ? "Prosjekt: " : "Project: ")}`;

export const META = {
  title: {
    no: "Console Consulting · senior utvikler for integrasjoner, plattformer og apper",
    en: "Console Consulting · senior developer for integrations, platforms and apps",
  } satisfies T,
  description: {
    no: "Asbjørn Rørvik, senior fullstack-utvikler i Stavanger. Leies inn for å bygge integrasjoner, plattformer, nettsider og apper, fra første skisse til drift. Equinor, Kolumbus, Easee, Altibox.",
    en: "Asbjørn Rørvik, senior full-stack developer in Stavanger, Norway. Hire me to build integrations, platforms, websites and apps, from first sketch to production. Equinor, Kolumbus, Easee, Altibox.",
  } satisfies T,
};

export const NAV = {
  links: [
    { href: "#leveranser", label: { no: "Leveranser", en: "Delivered" } },
    { href: "#samarbeid", label: { no: "Samarbeid", en: "Working together" } },
    { href: "#om", label: { no: "Om", en: "About" } },
  ],
  cta: { no: "Book en prat", en: "Book a call" },
};

export const TABS = [
  { href: "#integrasjon", label: { no: "Integrasjon", en: "Integration" } },
  { href: "#app", label: { no: "App", en: "App" } },
  { href: "#plattform", label: { no: "Plattform", en: "Platform" } },
  { href: "#leveranser", label: { no: "Leveranser", en: "Delivered" } },
  { href: "#sammenlign", label: { no: "Sammenlign", en: "Compare" } },
  { href: "#samarbeid", label: { no: "Samarbeid", en: "Working together" } },
  { href: "#om", label: { no: "Om", en: "About" } },
  { href: "#kontakt", label: { no: "Kontakt", en: "Contact" } },
];

export const HERO = {
  headline: { no: "Bygget for drift. Ikke for demo.", en: "Built to run. Not to demo." },
  lead: {
    no: "Console Consulting er Asbjørn Rørvik, senior fullstack-utvikler i Stavanger. Lei meg inn når dere skal bygge en integrasjon, en plattform, en nettside eller en app, og vil ha én som tar ansvar fra første skisse til den står i drift.",
    en: "Console Consulting is Asbjørn Rørvik, a senior full-stack developer in Stavanger, Norway. Hire me when you need an integration, a platform, a website or an app built, by someone who owns it from the first sketch until it runs in production.",
  },
  ctaPrimary: { no: "Book en prat", en: "Book a call" },
  ctaWork: { no: "Se hva jeg har levert", en: "See what I've shipped" },
  stats: [
    { value: "8 år", valueEn: "8 yrs", label: { no: "med systemer i produksjon", en: "shipping production systems" } },
    { value: "142 000", valueEn: "142,000", label: { no: "brukere i måneden på Kolumbus-appen", en: "monthly users on the Kolumbus app" } },
    { value: "100+", valueEn: "100+", label: { no: "nettbutikker kjører Supportify", en: "online stores run Supportify" } },
    { value: "1", valueEn: "1", label: { no: "kontaktperson fra skisse til drift", en: "point of contact, sketch to production" } },
  ],
  rigCaption: {
    no: "Equinor · Notifications og Workorders · apper offshore-driften er avhengig av",
    en: "Equinor · Notifications and Workorders · apps offshore operations depend on",
  },
  rigLabel: {
    no: "Dithret 3D-scene: en oljeplattform i Nordsjøen i solnedgang, med et forsyningsskip som passerer.",
    en: "Dithered 3D scene: an oil platform in the North Sea at sunset, with a supply vessel passing.",
  },
};

export type QA = { q: T; a: T };
export type GameSection = {
  id: string;
  kicker: T;
  title: T;
  body: T;
  note: T;
  hint: T;
  label: T;
  tele: { key: string; label: T }[];
  qa: QA[];
};

export const INTEGRATION: GameSection = {
  id: "integrasjon",
  kicker: { no: "Integrasjoner", en: "Integrations" },
  title: {
    no: "Hver melding til riktig system. Også når ett av dem er nede.",
    en: "Every message to the right system. Even when one of them is down.",
  },
  body: {
    no: "Det er i integrasjonene de fleste prosjekter blir sårbare. Her kommer hendelser fra Vipps, BankID, Altinn, Shopify og Posten inn ett sted og rutes videre. Når et system går ned, havner meldingene i kø og sendes på nytt når det er oppe igjen. Ingenting forsvinner, ingenting kommer dobbelt.",
    en: "Integrations are where most projects get fragile. Here, events from Vipps, BankID, Altinn, Shopify and Posten arrive in one place and are routed on. When a system goes down, its messages queue and are retried once it's back. Nothing is lost, nothing arrives twice.",
  },
  note: {
    no: "Simulert trafikk, samme mønster som i produksjon: kø, retry og idempotensnøkler.",
    en: "Simulated traffic, the same pattern as in production: queues, retries and idempotency keys.",
  },
  hint: { no: "← → eller 1 · 2 · 3 velger mottaker", en: "← → or 1 · 2 · 3 picks the recipient" },
  label: {
    no: "Dithret 3D-scene: pakker merket Vipps, BankID, Altinn, Shopify og Posten går på et samlebånd og sorteres til regnskap, CRM og lager.",
    en: "Dithered 3D scene: parcels labelled Vipps, BankID, Altinn, Shopify and Posten ride a conveyor and are sorted to accounting, CRM and warehouse.",
  },
  tele: [
    { key: "source", label: { no: "Kilde", en: "Source" } },
    { key: "payload", label: { no: "Innhold", en: "Payload" } },
    { key: "route", label: { no: "Rute", en: "Route" } },
    { key: "status", label: { no: "Status", en: "Status" } },
    { key: "queue", label: { no: "I kø", en: "Queued" } },
    { key: "timing", label: { no: "Svartid", en: "Latency" } },
  ],
  qa: [
    {
      q: { no: "Hvilke integrasjoner har du levert?", en: "Which integrations have you shipped?" },
      a: {
        no: "BankID, Vipps og Altinn (MVA og A-melding) i Mynto. Adyen med PCI DSS i EaseePay for Easee. Shopify i Supportify. Entur og Kolumbus sine sanntidsdata i Kolumbus-appen.",
        en: "BankID, Vipps and Altinn (VAT and payroll filings) in Mynto. Adyen with PCI DSS in EaseePay for Easee. Shopify in Supportify. Entur and Kolumbus real-time data in the Kolumbus app.",
      },
    },
    {
      q: { no: "Hva skjer når et eksternt API er nede?", en: "What happens when an external API is down?" },
      a: {
        no: "Det skjer, så det planlegges for fra dag én: kø, retry med backoff, idempotensnøkler og varsling til den som har vakt. Det er forskjellen på en demo og noe som står i drift.",
        en: "It happens, so it's planned for from day one: queues, retries with backoff, idempotency keys and an alert to whoever is on call. That's the difference between a demo and something that runs.",
      },
    },
  ],
};

export const APP: GameSection = {
  id: "app",
  kicker: { no: "Apper", en: "Apps" },
  title: {
    no: "142 000 reisende i måneden stoler på at bussen er der appen sier.",
    en: "142,000 riders a month trust the bus is where the app says it is.",
  },
  body: {
    no: "Kolumbus-appen vant Nordic Public Transport Design Award 2025. Jeg var en av utviklerne, via Netpower, på Flutter-appen og integrasjonene bak: sanntid, reiseoppfølging og betaling. Scenen er ikke appen, men det appen lever av: posisjon, forsinkelse og varsler som må stemme.",
    en: "The Kolumbus app won the Nordic Public Transport Design Award 2025. I was one of the developers, via Netpower, on the Flutter app and the integrations behind it: real time, journey follow-up and payments. The scene isn't the app, it's what the app lives on: position, delay and notifications that have to be right.",
  },
  note: {
    no: "Simulert rute. Holdeplassene finnes, bussen gjør ikke.",
    en: "Simulated route. The stops are real, the bus isn't.",
  },
  hint: { no: "← → styrer", en: "← → to steer" },
  label: {
    no: "Dithret 3D-scene: en buss kjører mot solnedgangen, bytter fil forbi veiarbeid og biler, og stopper ved holdeplasser.",
    en: "Dithered 3D scene: a bus drives toward the sunset, changing lanes around roadworks and cars, and stopping at bus stops.",
  },
  tele: [
    { key: "line", label: { no: "Strekning", en: "Route" } },
    { key: "next", label: { no: "Neste stopp", en: "Next stop" } },
    { key: "delay", label: { no: "Forsinkelse", en: "Delay" } },
    { key: "speed", label: { no: "Fart", en: "Speed" } },
    { key: "pos", label: { no: "Posisjon", en: "Position" } },
    { key: "board", label: { no: "Påstigninger", en: "Boarded" } },
    { key: "push", label: { no: "Varsel til reisende", en: "Rider notification" } },
    { key: "status", label: { no: "Status", en: "Status" } },
  ],
  qa: [
    {
      q: { no: "Hvilke apper har du levert?", en: "Which apps have you shipped?" },
      a: {
        no: "Kolumbus (Flutter). Notifications og Workorders for Equinor (React Native, offshore). Altibox Hjem (Flutter, hundretusener av kunder). EaseePay (Flutter, PCI DSS). TryggDrift for NLR, fra første commit til App Store og Google Play. Kineletics, med watchOS og computer vision.",
        en: "Kolumbus (Flutter). Notifications and Workorders for Equinor (React Native, offshore). Altibox Hjem (Flutter, hundreds of thousands of customers). EaseePay (Flutter, PCI DSS). TryggDrift for NLR, from first commit to the App Store and Google Play. Kineletics, with watchOS and computer vision.",
      },
    },
    {
      q: { no: "Flutter eller React Native?", en: "Flutter or React Native?" },
      a: {
        no: "Begge er i drift hos kundene mine. Valget avhenger av hvem som skal eie appen etterpå, ikke av hva jeg liker best.",
        en: "Both are in production with my clients. The choice depends on who will own the app afterwards, not on what I like best.",
      },
    },
  ],
};

export const PLATFORM: GameSection = {
  id: "plattform",
  kicker: { no: "Plattformer og nettsider", en: "Platforms and websites" },
  title: {
    no: "En plattform er tolv lag som skal stå oppå hverandre.",
    en: "A platform is twelve layers that have to stand on each other.",
  },
  body: {
    no: "Database, API, innlogging, betaling, integrasjoner, admin, nettside og app. Hvert lag bygges på det forrige, og en skjevhet i bunnen blir dyrere jo høyere dere kommer. Mynto og Supportify er egne produkter i drift, bygget av meg fra database til app.",
    en: "Database, API, sign-in, payments, integrations, admin, website and app. Each layer is built on the one below, and a misalignment at the bottom gets more expensive the higher you go. Mynto and Supportify are my own products in production, built by me from database to app.",
  },
  note: {
    no: "Det som stikker ut, kappes. Neste lag blir aldri bredere enn det under.",
    en: "Whatever overhangs is cut. The next layer is never wider than the one below.",
  },
  hint: { no: "Space / klikk slipper laget", en: "Space / click drops the layer" },
  label: {
    no: "Dithret 3D-scene: et tårn bygges lag for lag, hvert lag merket med en del av plattformen, fra database til AI-assistent.",
    en: "Dithered 3D scene: a tower is built layer by layer, each layer labelled with a part of the platform, from database to AI assistant.",
  },
  tele: [
    { key: "module", label: { no: "Modul", en: "Module" } },
    { key: "layer", label: { no: "Lag", en: "Layer" } },
    { key: "offset", label: { no: "Avvik", en: "Offset" } },
    { key: "fit", label: { no: "Passform", en: "Fit" } },
    { key: "deploy", label: { no: "Bygg", en: "Build" } },
  ],
  qa: [
    {
      q: { no: "Kan du ta hele prosjektet alene?", en: "Can you take the whole project on your own?" },
      a: {
        no: "Ja, fra skisse og arkitektur til drift. I større løp jobber jeg like gjerne inne i teamet deres, og sørger for at de kan eie det som er bygget når jeg går.",
        en: "Yes, from sketch and architecture to production. On bigger efforts I'm just as happy working inside your team, making sure they can own what was built when I leave.",
      },
    },
    {
      q: { no: "Hvilken stack bruker du?", en: "Which stack do you use?" },
      a: {
        no: "Next.js og TypeScript på web, Go (Encore) eller .NET i backend, Postgres, Flutter eller React Native på mobil, drift på Vercel, Fly.io eller Kubernetes. Har dere en stack fra før, jobber jeg i den.",
        en: "Next.js and TypeScript on the web, Go (Encore) or .NET in the backend, Postgres, Flutter or React Native on mobile, running on Vercel, Fly.io or Kubernetes. If you already have a stack, I work in yours.",
      },
    },
  ],
};

export type Delivery = {
  year: string;
  client: string;
  what: T;
  stack: string;
  proof: T;
  own?: boolean;
};

export const DELIVERIES: Delivery[] = [
  {
    year: "2026",
    client: "Mynto",
    own: true,
    what: { no: "Virtuell regnskapsfører. Claude med verktøykall, BankID, Altinn.", en: "Virtual accountant. Claude with tool calling, BankID, Altinn." },
    stack: "Next.js · Go · Claude",
    proof: { no: "i daglig bruk", en: "in daily use" },
  },
  {
    year: "2026",
    client: "Kineletics",
    own: true,
    what: { no: "AI-trener med formfeedback via kamera og Apple Watch.", en: "AI trainer with camera form feedback and Apple Watch." },
    stack: "Flutter · watchOS",
    proof: { no: "iOS · Android", en: "iOS · Android" },
  },
  {
    year: "2025",
    client: "Kolumbus",
    what: { no: "Sanntids reiseapp med reiseoppfølging og betaling. Via Netpower.", en: "Real-time transit app with journey follow-up and payments. Via Netpower." },
    stack: "Flutter · Go · Entur",
    proof: { no: "142 000 mnd. brukere · designpris 2025", en: "142,000 monthly users · design award 2025" },
  },
  {
    year: "2025",
    client: "Supportify",
    own: true,
    what: { no: "AI-kundeservice for Shopify. Medgründer og CTO.", en: "AI customer support for Shopify. Co-founder and CTO." },
    stack: "Next.js · Shopify · LLM",
    proof: { no: "100+ butikker · opptil 85 % automatisk", en: "100+ stores · up to 85% automated" },
  },
  {
    year: "2025",
    client: "NLR · TryggDrift",
    what: { no: "HMS-app for landbruket, fra første commit til App Store.", en: "HSE app for agriculture, from first commit to the App Store." },
    stack: "React Native · .NET",
    proof: { no: "erstatter KSL Trygg", en: "replaces KSL Trygg" },
  },
  {
    year: "2024",
    client: "Altibox",
    what: { no: "Altibox Hjem: wifi, gjestenett og foreldrekontroll.", en: "Altibox Hjem: wifi, guest networks and parental controls." },
    stack: "Flutter",
    proof: { no: "hundretusener av kunder", en: "hundreds of thousands of customers" },
  },
  {
    year: "2023",
    client: "Equinor",
    what: { no: "Notifications og Workorders. Avvik og arbeidsordre offshore.", en: "Notifications and Workorders. Deviations and work orders offshore." },
    stack: "React Native · TypeScript",
    proof: { no: "driftskritisk · strengt regulert", en: "operations-critical · strictly regulated" },
  },
  {
    year: "2022",
    client: "Easee",
    what: { no: "EaseePay: fordeling av ladekostnader i borettslag.", en: "EaseePay: EV-charging cost sharing in housing co-ops." },
    stack: "Flutter · Adyen",
    proof: { no: "PCI DSS", en: "PCI DSS" },
  },
  {
    year: "",
    client: "DrDropin Bedrift",
    what: { no: "Sykefraværshjelpen: egenmelding, sykmelding fra NAV, oppfølgingsplaner og dialogmøter.", en: "Sykefraværshjelpen: self-certification, NAV sick notes, follow-up plans and dialogue meetings." },
    stack: "Next.js · Kubernetes",
    proof: { no: "NAV · Altinn · Maskinporten", en: "NAV · Altinn · Maskinporten" },
  },
];

export const DELIVERED = {
  kicker: { no: "Leveranser", en: "Delivered" },
  title: { no: "Det som er levert, målt i det som står i drift.", en: "What's been shipped, measured in what still runs." },
  cols: {
    year: { no: "År", en: "Year" },
    client: { no: "Kunde", en: "Client" },
    what: { no: "Leveranse", en: "Delivery" },
    stack: { no: "Stack", en: "Stack" },
    proof: { no: "I drift", en: "In production" },
  },
  own: { no: "eget produkt", en: "own product" },
  fine: {
    no: "Årstall er når jeg jobbet på prosjektet. Tall er oppgitt av kundene eller hentet fra egne dashboards. Referansepersoner gis på forespørsel.",
    en: "Years are when I worked on the project. Numbers come from the clients or from my own dashboards. Reference contacts available on request.",
  },
};

export const COMPARE = {
  kicker: { no: "Sammenlign", en: "Compare" },
  title: { no: "Konsulent, byrå eller ansette?", en: "Consultant, agency or hire?" },
  heads: [
    { no: "Console", en: "Console" },
    { no: "Byrå", en: "Agency" },
    { no: "Ansette", en: "Hire" },
  ],
  rows: [
    {
      label: { no: "Hvem gjør jobben", en: "Who does the work" },
      cells: [
        { no: "Den du snakket med", en: "The person you talked to" },
        { no: "Et team satt sammen for prosjektet", en: "A team put together for the project" },
        { no: "Den du ansetter", en: "The person you hire" },
      ],
    },
    {
      label: { no: "Tid før oppstart", en: "Time to start" },
      cells: [
        { no: "Uker", en: "Weeks" },
        { no: "Uker", en: "Weeks" },
        { no: "Måneder", en: "Months" },
      ],
    },
    {
      label: { no: "Bredde", en: "Range" },
      cells: [
        { no: "Én senior, hele stakken", en: "One senior, the whole stack" },
        { no: "Flere roller og spesialister", en: "Several roles and specialists" },
        { no: "Avhenger av hvem du finner", en: "Depends on who you find" },
      ],
    },
    {
      label: { no: "Kapasitet", en: "Capacity" },
      cells: [
        { no: "Én person", en: "One person" },
        { no: "Kan skaleres opp", en: "Can scale up" },
        { no: "Én person", en: "One person" },
      ],
    },
    {
      label: { no: "Kode og data", en: "Code and data" },
      cells: [
        { no: "Deres", en: "Yours" },
        { no: "Deres, sjekk avtalen", en: "Yours, check the contract" },
        { no: "Deres", en: "Yours" },
      ],
    },
    {
      label: { no: "Når det er levert", en: "Once it ships" },
      cells: [
        { no: "Overlevering, eller videre drift", en: "Handover, or ongoing operations" },
        { no: "Ny avtale", en: "New contract" },
        { no: "Blir værende", en: "Stays" },
      ],
    },
  ],
  qa: [
    {
      q: { no: "Når bør vi velge byrå?", en: "When should we pick an agency?" },
      a: {
        no: "Når dere trenger fem folk fra dag én, eller design, merkevare og utvikling i samme kontrakt. Da er et byrå riktig, og jeg sier det hvis det er der vi havner.",
        en: "When you need five people from day one, or design, brand and development in one contract. Then an agency is right, and I'll say so if that's where we end up.",
      },
    },
    {
      q: { no: "Og når bør vi ansette?", en: "And when should we hire?" },
      a: {
        no: "Når produktet er kjernen i virksomheten i mange år. Da kan jeg bygge første versjon og hjelpe dere å ansette den som tar over.",
        en: "When the product is the core of the business for years to come. Then I can build the first version and help you hire whoever takes over.",
      },
    },
  ],
};

export const WORK = {
  kicker: { no: "Samarbeid", en: "Working together" },
  title: { no: "Slik leier dere meg inn.", en: "How to bring me in." },
  forms: [
    {
      title: { no: "Timebasert", en: "Hourly" },
      body: {
        no: "Inn i teamet deres, hel- eller deltid, så lenge det trengs. Passer når omfanget endrer seg underveis.",
        en: "Into your team, full or part time, for as long as it takes. Suits work where the scope moves as you go.",
      },
    },
    {
      title: { no: "Fastpris", en: "Fixed price" },
      body: {
        no: "For avgrensede leveranser: en integrasjon, en nettside, en første versjon av en app. Dere vet prisen før vi starter.",
        en: "For well-defined deliveries: an integration, a website, a first version of an app. You know the price before we start.",
      },
    },
    {
      title: { no: "Drift og videreutvikling", en: "Operations and development" },
      body: {
        no: "Etter lansering: overvåking, oppdateringer og nye funksjoner i det tempoet dere vil.",
        en: "After launch: monitoring, updates and new features at the pace you want.",
      },
    },
  ],
  public: {
    no: "Offentlig sektor: jeg leverer tilbud på anbud via Doffin og kan gå inn som underleverandør i rammeavtaler.",
    en: "Public sector: I bid on tenders through Doffin and can join framework agreements as a subcontractor.",
  },
  steps: [
    {
      n: "01",
      title: { no: "Samtale", en: "A call" },
      meta: { no: "30 min · uforpliktende", en: "30 min · no strings" },
      body: {
        no: "Dere forteller hva som skal bygges og hvorfor. Jeg sier ærlig om jeg er rett person.",
        en: "You tell me what needs building and why. I tell you honestly whether I'm the right person.",
      },
    },
    {
      n: "02",
      title: { no: "Forslag", en: "Proposal" },
      meta: { no: "skriftlig", en: "in writing" },
      body: {
        no: "Omfang, arkitektur, plan og pris på et par sider. Ingen salgspresentasjon.",
        en: "Scope, architecture, plan and price on a couple of pages. No sales deck.",
      },
    },
    {
      n: "03",
      title: { no: "Oppstart", en: "Start" },
      meta: { no: "i ekte miljø fra første uke", en: "in a real environment from week one" },
      body: {
        no: "Det første som leveres, kjører der det skal kjøre. Dere ser fremdrift i produktet, ikke i statusmøter.",
        en: "The first thing delivered runs where it's meant to run. You see progress in the product, not in status meetings.",
      },
    },
  ],
};

export const ABOUT = {
  kicker: { no: "Om", en: "About" },
  name: "Asbjørn Rørvik",
  role: { no: "Senior fullstack-utvikler · Stavanger", en: "Senior full-stack developer · Stavanger" },
  photo: "/media/asbjorn.jpg",
  /** same photo with the background removed (macOS Vision subject lift), for the hero */
  cutout: "/media/asbjorn-cutout.webp",
  photoAlt: { no: "Portrett av Asbjørn Rørvik, dithret i to farger.", en: "Portrait of Asbjørn Rørvik, dithered in two colours." },
  bio: {
    no: [
      "Jeg har jobbet åtte år med systemer som skal virke hver dag: driftskritiske apper for Equinor, reiseappen til Kolumbus, betalingsløsningen EaseePay for Easee og smarthus-appen til Altibox.",
      "Ved siden av kundeoppdrag bygger jeg egne produkter. Mynto er en virtuell regnskapsfører drevet av Claude, Supportify gir over hundre nettbutikker AI-kundeservice. Det betyr at jeg vet hva det koster å drifte det jeg bygger, ikke bare å levere det.",
      "Fullstack betyr her design, app, backend, integrasjoner og drift, fra samme person.",
    ],
    en: [
      "I've spent eight years on systems that have to work every day: operations-critical apps for Equinor, the Kolumbus transit app, the EaseePay payment solution for Easee and Altibox's smart-home app.",
      "Alongside client work I build my own products. Mynto is a virtual accountant powered by Claude, Supportify gives over a hundred online stores AI customer support. So I know what it costs to run what I build, not just to ship it.",
      "Full stack here means design, app, backend, integrations and operations, from the same person.",
    ],
  },
  stack: ["Flutter", "React Native", "Go", ".NET", "TypeScript", "Next.js", "Postgres", "Claude"],
  links: [
    { label: "GitHub", href: "https://github.com/asbis" },
    { label: "LinkedIn", href: "https://linkedin.com/in/asbjornrorvik" },
  ],
};

export const CONTACT = {
  title: { no: "Har dere noe som skal bygges?", en: "Got something that needs building?" },
  body: {
    no: "Skriv noen linjer om hva det er, når det bør stå, og hva som finnes fra før. Jeg svarer selv.",
    en: "Write a few lines about what it is, when it needs to run, and what exists already. I answer myself.",
  },
  cta: { no: "Send en e-post", en: "Send an email" },
};

export const FOOTER = {
  line: { no: "Console Consulting · Stavanger · jobber i hele Norge", en: "Console Consulting · Stavanger, Norway · working nationwide" },
  made: {
    no: "Scenene er rendret i 3D i nettleseren og dithret til to farger. Ingen video.",
    en: "The scenes are rendered in 3D in your browser and dithered to two colours. No video.",
  },
};

export const TONES = { dark: ["#0b0b09", "#ffc414"], amber: ["#171204", "#ffc414"] };
