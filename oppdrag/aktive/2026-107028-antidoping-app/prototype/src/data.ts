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

export const MEDICINES = [
  { id: 'paracet', name: 'Paracet', strength: '500 mg tabletter', active: 'Paracetamol', status: 'allowed' as Status, brand: 'Weifa', note: 'Ingen kjente forbudte stoffer. Tillatt i og utenfor konkurranse.' },
  { id: 'ibux', name: 'Ibux', strength: '400 mg tabletter', active: 'Ibuprofen', status: 'allowed' as Status, brand: 'Weifa', note: 'Betennelsesdempende. Tillatt i og utenfor konkurranse.' },
  { id: 'ventoline', name: 'Ventoline', strength: '0,1 mg/dose inhalasjon', active: 'Salbutamol', status: 'incomp' as Status, brand: 'GSK', note: 'Tillatt inntil 1600 µg per 24 timer ved inhalasjon. Over grensen: krever fritak.' },
  { id: 'pulmicort', name: 'Pulmicort Turbuhaler', strength: '400 µg/dose', active: 'Budesonid', status: 'allowed' as Status, brand: 'AstraZeneca', note: 'Inhalert glukokortikoid. Tillatt uten fritak.' },
  { id: 'prednisolon', name: 'Prednisolon', strength: '5 mg tabletter', active: 'Prednisolon', status: 'incomp' as Status, brand: 'Takeda', note: 'Forbudt i konkurranse ved oral bruk. Krever fritak.' },
  { id: 'ritalin', name: 'Ritalin', strength: '10 mg tabletter', active: 'Metylfenidat', status: 'tue' as Status, brand: 'Novartis', note: 'Stimulerende. Krever medisinsk fritak for konkurranse.' },
  { id: 'paralgin', name: 'Paralgin Forte', strength: 'tabletter', active: 'Paracetamol + kodein', status: 'tue' as Status, brand: 'Karo Pharma', note: 'Kodein omdannes til morfin. Krever fritak i konkurranse.' },
  { id: 'testogel', name: 'Testogel', strength: '16,2 mg/g gel', active: 'Testosteron', status: 'banned' as Status, brand: 'Besins', note: 'Anabol androgen steroid. Forbudt til enhver tid.' },
];

export const WADA_LIST = [
  { id: 'testosteron', name: 'Testosteron', cat: 'S1 — Anabole stoffer', status: 'banned' as Status, note: 'Forbudt til enhver tid. Gjelder alle former: injeksjon, gel, tabletter.' },
  { id: 'stanozolol', name: 'Stanozolol (Winstrol)', cat: 'S1 — Anabole stoffer', status: 'banned' as Status, note: 'Syntetisk anabol steroid. Forbudt til enhver tid.' },
  { id: 'epo', name: 'Erytropoietin (EPO)', cat: 'S2 — Peptidhormoner', status: 'banned' as Status, note: 'Øker røde blodceller. Forbudt til enhver tid.' },
  { id: 'hgh', name: 'Veksthormon (hGH)', cat: 'S2 — Peptidhormoner', status: 'banned' as Status, note: 'Forbudt til enhver tid.' },
  { id: 'salbutamol', name: 'Salbutamol', cat: 'S3 — Beta-2-agonister', status: 'incomp' as Status, note: 'Tillatt inhalert inntil 1600 µg/24t. Ellers forbudt.' },
  { id: 'ephedrin', name: 'Efedrin', cat: 'S6 — Stimulerende midler', status: 'incomp' as Status, note: 'Forbudt i konkurranse over 10 µg/ml i urin.' },
  { id: 'cannabis', name: 'Cannabis (THC)', cat: 'S8 — Cannabinoider', status: 'incomp' as Status, note: 'Forbudt i konkurranse. Tillatt utenfor.' },
  { id: 'kokain', name: 'Kokain', cat: 'S6 — Stimulerende midler', status: 'incomp' as Status, note: 'Forbudt i konkurranse.' },
  { id: 'modafinil', name: 'Modafinil', cat: 'S6 — Stimulerende midler', status: 'incomp' as Status, note: 'Forbudt i konkurranse.' },
  { id: 'metylfenidat', name: 'Metylfenidat', cat: 'S6 — Stimulerende midler', status: 'incomp' as Status, note: 'Forbudt i konkurranse. Krever fritak ved ADHD.' },
];

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
