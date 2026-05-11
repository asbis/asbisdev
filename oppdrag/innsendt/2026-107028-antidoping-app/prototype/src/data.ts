import { MEDICINES_FK } from './data.generated';
import { WADA_LIST_FK } from './wada.generated';

export type Status = 'allowed' | 'incomp' | 'tue' | 'banned';

export const RISK_QUESTIONS = [
  { q: 'Er produktet kjøpt i Norge eller EU?', yesLow: true, help: 'Produkter fra utlandet eller nettshop har ofte svakere kvalitetskontroll.' },
  { q: 'Er produktet sertifisert av Informed Sport eller NSF Certified for Sport?', yesLow: true, help: 'Batch-testing minimerer risiko for forurensning.' },
  { q: 'Er ingredienslisten fullstendig på norsk eller engelsk?', yesLow: true, help: 'Komplette lister lar deg sjekke hver enkelt ingrediens.' },
  { q: 'Inneholder produktet urteekstrakter eller "proprietary blends"?', yesLow: false, help: 'Urteblandinger kan inneholde uoppgitte substanser fra dopinglisten.' },
  { q: 'Er produktet markedsført for prestasjonsfremming, muskelvekst eller fettforbrenning?', yesLow: false, help: 'Aggressive markedsføringspåstander korrelerer med forurensede produkter.' },
  { q: 'Har du sjekket hver ingrediens i dopinglisten?', yesLow: true, help: 'Alle virkestoffer må være utenfor WADAs forbudte liste.' },
  { q: 'Er produsenten et etablert selskap med sporbar produksjon?', yesLow: true, help: 'Kjente produsenter har mer å tape på forurensning.' },
  { q: 'Er prisen mistenkelig lav sammenlignet med sertifiserte alternativer?', yesLow: false, help: 'Rabatterte produkter er oftere forurenset.' },
];

// Real medicines scraped from Felleskatalogen. See scripts/scrape-felleskatalogen.mjs.
// Status auto-derived from ATC code via WADA 2026 Prohibited List rules.
export const MEDICINES = MEDICINES_FK.map((m) => ({
  id: m.url.split('/').pop() || m.name,
  name: m.name,
  strength: m.atc,
  active: m.substance,
  status: m.status,
  brand: m.manufacturer.replace(/\s*\([^)]*\)\s*$/, ''),
  note: m.note,
  cat: m.cat,
  url: m.url,
}));

// Full WADA 2026 Prohibited List (~70 substanser med aliaser).
// Kilde: wada-ama.org. Se src/wada.generated.ts for full struktur.
export const WADA_LIST = WADA_LIST_FK as readonly { id: string; name: string; cat: string; status: Status; note: string; aliases?: string[] }[];

export const MESSAGES = [
  { id: 1, unread: true, cat: 'Regelendring', date: '22.04.2026',
    title: 'Ny versjon av dopinglista',
    preview: 'WADA har publisert oppdatert prohibited list med virkning fra 1. januar 2027.',
    body: 'Antidoping Norge informerer om at WADA har publisert den oppdaterte utgaven av Prohibited List, med virkning fra 1. januar 2027. De viktigste endringene gjelder beta-2-agonister og nye metabolitter av anabole androgener.\n\nLes hele listen i appen under "Dopinglista".' },
  { id: 2, unread: true, cat: 'Hastevarsel', date: '18.04.2026',
    title: 'Forurenset kosttilskudd oppdaget',
    preview: '"Pure Mass XL" er funnet å inneholde uoppgitte mengder stanozolol.',
    body: 'Et produkt som selges på nettbutikken musclezone.com er testet positivt for stanozolol. Vi oppfordrer alle utøvere som har brukt produktet til å kontakte ADNO omgående.' },
  { id: 3, unread: false, cat: 'Påminnelse', date: '10.04.2026',
    title: 'Husk whereabouts for mai',
    preview: 'Du må oppdatere whereabouts innen 25. april.',
    body: 'Som utøver med meldeplikt må du levere whereabouts for kommende kvartal senest 25. april. Logg inn på ADAMS for å oppdatere.' },
  { id: 4, unread: false, cat: 'Nyhet', date: '01.04.2026',
    title: 'Nytt e-læringsmodul publisert',
    preview: 'Ren Utøver har lagt til modul om risikovurdering av kosttilskudd.',
    body: 'Modulen er obligatorisk for utøvere i prioriteringsgruppe A og tar ca. 20 minutter å fullføre.' },
];

export const ASTHMA_MEDS = [
  { id: 'salbutamol', name: 'Salbutamol (Ventoline)', unit: 'µg', limit24h: 1600, limit12h: 800, perDose: 100 },
  { id: 'formoterol', name: 'Formoterol', unit: 'µg', limit24h: 54, limit12h: 54, perDose: 12 },
  { id: 'salmeterol', name: 'Salmeterol', unit: 'µg', limit24h: 200, limit12h: 200, perDose: 50 },
  { id: 'vilanterol', name: 'Vilanterol', unit: 'µg', limit24h: 25, limit12h: 25, perDose: 25 },
];

export const statusMeta = (s: Status) => ({
  allowed: { label: 'Tillatt' },
  incomp: { label: 'Forbudt i konkurranse' },
  tue: { label: 'Krever fritak' },
  banned: { label: 'Forbudt' },
}[s]);
