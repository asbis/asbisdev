import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Curated news/alerts for the demo. In production this would come from a CMS
// or by polling antidoping.no/wada-ama.org. We expose the same shape so the
// client doesn't change when the source does.

type Alert = {
  id: string;
  cat: 'Hastevarsel' | 'Regelendring' | 'Påminnelse' | 'Nyhet';
  title: string;
  preview: string;
  body: string;
  date: string; // YYYY-MM-DD
  source: string;
  url?: string;
};

const ALERTS: Alert[] = [
  {
    id: 'wada-2027-list',
    cat: 'Regelendring',
    date: '2026-04-22',
    title: 'WADA publiserer Prohibited List 2027',
    preview: 'Ny utgave av dopinglisten gjelder fra 1. januar 2027. Endringer i beta-2-agonister og glukokortikoider.',
    body:
      'WADA har publisert den oppdaterte utgaven av Prohibited List, med virkning fra 1. januar 2027.\n\n' +
      'Hovedendringer:\n' +
      '• Glukokortikoider: terskel for triamcinolon ved intra-artikulær injeksjon strammes\n' +
      '• Beta-2-agonister: salmeterol-grensen senkes fra 200 til 100 µg/24t\n' +
      '• To nye SARMs (RAD-150, S-23) lagt til i S1.3\n' +
      '• Cannabinoider: CBD-grenseverdi presisert til 5 µg/ml urin\n\n' +
      'Les hele oversikten i appen under "Dopinglista" eller på wada-ama.org.',
    source: 'WADA',
    url: 'https://www.wada-ama.org/en/prohibited-list',
  },
  {
    id: 'pure-mass-xl',
    cat: 'Hastevarsel',
    date: '2026-04-18',
    title: 'Forurenset kosttilskudd: «Pure Mass XL»',
    preview: 'Pure Mass XL fra musclezone.com testet positivt for stanozolol. Slutt å bruke umiddelbart.',
    body:
      'Antidoping Norge advarer mot kosttilskuddet "Pure Mass XL" som selges via nettbutikken musclezone.com.\n\n' +
      'Produktet er testet positivt for stanozolol — en anabol androgen steroid som er forbudt til enhver tid.\n\n' +
      'Utøvere som har brukt produktet bør:\n' +
      '1. Slutte å bruke det umiddelbart\n' +
      '2. Beholde gjenværende produkt for analyse\n' +
      '3. Kontakte ADNO på post@antidoping.no\n\n' +
      'Anmeld kjøpet hos selger og vurder politianmeldelse.',
    source: 'ADNO',
  },
  {
    id: 'whereabouts-q2-2026',
    cat: 'Påminnelse',
    date: '2026-04-10',
    title: 'Whereabouts for Q2 2026 — frist 25. april',
    preview: 'Du må oppdatere whereabouts for kvartal 2 i ADAMS innen 25. april kl. 23:59.',
    body:
      'Som utøver i prioriteringsgruppe må du levere whereabouts for kommende kvartal senest 25. april kl. 23:59 norsk tid.\n\n' +
      'Logg inn på ADAMS (adams-help.wada-ama.org) og oppdater:\n' +
      '• Bostedsadresse for hver dag\n' +
      '• Treningssted og -tider\n' +
      '• Konkurranseprogram\n' +
      '• 60-minutters-vinduet\n\n' +
      'Manglende eller for sen oppdatering regnes som "Filing Failure" — tre slike i 12 mnd kan gi sanksjon.',
    source: 'ADNO',
    url: 'https://www.antidoping.no/whereabouts',
  },
  {
    id: 'renutover-modul',
    cat: 'Nyhet',
    date: '2026-04-01',
    title: 'Ny e-læringsmodul: Risikovurdering av kosttilskudd',
    preview: 'Ren Utøver har lagt til en 20-minutters modul om kosttilskudd. Obligatorisk for prioriteringsgruppe A.',
    body:
      'Modulen gjennomgår:\n' +
      '• Hvordan lese ingredienslister kritisk\n' +
      '• Sertifiseringsordninger (Informed Sport, NSF Certified for Sport)\n' +
      '• Risikoindikatorer ved kjøp på nett\n' +
      '• Hva du gjør hvis du har tatt et forurenset produkt\n\n' +
      'Modulen er obligatorisk for utøvere i prioriteringsgruppe A og tar ca. 20 minutter å fullføre.',
    source: 'Ren Utøver',
    url: 'https://www.renutover.no/kosttilskudd',
  },
  {
    id: 'global-dro-update',
    cat: 'Nyhet',
    date: '2026-03-15',
    title: 'Global DRO oppdatert med nye norske legemidler',
    preview: '47 nye norske legemidler lagt inn i Global DRO-databasen denne måneden.',
    body:
      'Global DRO (globaldro.com) er den anbefalte ressursen for å sjekke om legemidler er forbudt i konkurranse, både i Norge og internasjonalt.\n\n' +
      'Denne måneden ble 47 nye norske legemidler lagt til, med oppdatert WADA-status. Inkluderer flere generika av salbutamol og budesonid.\n\n' +
      'I appen vår kobler vi direkte til Global DRO fra hver legemiddeldetalj.',
    source: 'ADNO',
    url: 'https://www.globaldro.com',
  },
];

export async function GET() {
  return NextResponse.json({ alerts: ALERTS, generatedAt: new Date().toISOString() });
}
