// WADA 2026 Prohibited List — strukturert fra offisiell publikasjon (wada-ama.org).
// Forkortet til de mest relevante substansene for norske utøvere.
// Full liste: ~330 oppførte stoffer + åpne kategorier ("og andre stoffer med lignende kjemisk struktur eller biologisk effekt").
// Status: 'banned' = forbudt til enhver tid, 'incomp' = forbudt i konkurranse, 'tue' = krever fritak.

export type WadaStatus = 'banned' | 'incomp' | 'tue';

export interface WadaEntry {
  id: string;
  name: string;
  aliases?: string[];
  cat: string;
  status: WadaStatus;
  note: string;
  inCompOnly?: boolean;
}

const e = (
  id: string,
  name: string,
  cat: string,
  status: WadaStatus,
  note: string,
  aliases?: string[],
): WadaEntry => ({ id, name, cat, status, note, aliases });

export const WADA_LIST_FK: WadaEntry[] = [
  // S0 — Ikke-godkjente substanser
  e('s0-research', 'Forsknings­substanser uten medisinsk godkjenning', 'S0 — Ikke-godkjente substanser', 'banned',
    'Alle stoffer som ikke er godkjent for menneskelig medisinsk bruk (legemiddelutvikling, dyremedisin) er forbudt til enhver tid.'),

  // S1 — Anabole stoffer
  e('testosteron', 'Testosteron', 'S1.1 — Eksogene anabole steroider', 'banned',
    'Forbudt til enhver tid. Alle administrasjonsformer: injeksjon, gel, plaster, tabletter.',
    ['testogel', 'nebido', 'androtardyl', 'testoviron']),
  e('nandrolon', 'Nandrolon', 'S1.1 — Eksogene anabole steroider', 'banned',
    'Forbudt til enhver tid. Detekteres via metabolitter i urin.', ['deca-durabolin', '19-nortestosteron']),
  e('stanozolol', 'Stanozolol', 'S1.1 — Eksogene anabole steroider', 'banned',
    'Forbudt til enhver tid. Vanlig forurensende stoff i ulovlige kosttilskudd.', ['winstrol']),
  e('trenbolon', 'Trenbolon', 'S1.1 — Eksogene anabole steroider', 'banned', 'Forbudt til enhver tid.'),
  e('boldenon', 'Boldenon', 'S1.1 — Eksogene anabole steroider', 'banned', 'Forbudt til enhver tid.'),
  e('drostanolon', 'Drostanolon', 'S1.1 — Eksogene anabole steroider', 'banned', 'Forbudt til enhver tid.', ['masteron']),
  e('metenolon', 'Metenolon', 'S1.1 — Eksogene anabole steroider', 'banned', 'Forbudt til enhver tid.', ['primobolan']),
  e('metandienon', 'Metandienon', 'S1.1 — Eksogene anabole steroider', 'banned', 'Forbudt til enhver tid.', ['dianabol']),
  e('oxandrolon', 'Oxandrolon', 'S1.1 — Eksogene anabole steroider', 'banned', 'Forbudt til enhver tid.', ['anavar']),
  e('clostebol', 'Clostebol', 'S1.1 — Eksogene anabole steroider', 'banned',
    'Forbudt til enhver tid. Funnet som forurensning i enkelte topiske produkter.'),
  e('dhea', 'DHEA (Dehydroepiandrosteron)', 'S1.2 — Endogene anabole steroider', 'banned',
    'Prohormon. Forbudt til enhver tid. Vanlig i prestasjons-kosttilskudd.', ['dehydroepiandrosteron']),
  e('androstenedion', 'Androstenedion', 'S1.2 — Endogene anabole steroider', 'banned', 'Forbudt til enhver tid.'),
  e('clenbuterol', 'Clenbuterol', 'S1.3 — Andre anabole midler', 'banned',
    'Forbudt til enhver tid. Brukes i veterinærmedisin — risiko for kjøttforurensning i visse land.'),
  e('sarms', 'SARMs (selektive androgenreseptor­modulatorer)', 'S1.3 — Andre anabole midler', 'banned',
    'Forbudt til enhver tid. Inkluderer ostarine, ligandrol, andarine. Vanlig forurensning.',
    ['ostarine', 'ligandrol', 'lgd-4033', 'mk-2866', 'andarine', 's-4', 'rad-140']),

  // S2 — Peptidhormoner, vekstfaktorer
  e('epo', 'Erytropoietin (EPO)', 'S2.1 — Erytropoiesestimulerende', 'banned',
    'Forbudt til enhver tid. Detekteres via blodbiologisk passport og direkte test.',
    ['epoetin', 'darbepoetin', 'eprex', 'aranesp']),
  e('hgh', 'Veksthormon (hGH)', 'S2.2 — Peptidhormoner', 'banned',
    'Forbudt til enhver tid. Inkluderer rekombinant somatropin.',
    ['somatropin', 'genotropin', 'norditropin', 'humatrope']),
  e('igf1', 'Insulinlignende vekstfaktor (IGF-1)', 'S2.2 — Peptidhormoner', 'banned', 'Forbudt til enhver tid.'),
  e('hcg', 'Choriongonadotropin (hCG)', 'S2.2 — Peptidhormoner', 'banned',
    'Forbudt for menn til enhver tid. Brukes for å stimulere testosteronproduksjon.'),
  e('ghrh', 'GHRH og GH-secretagoger', 'S2.2 — Peptidhormoner', 'banned',
    'Forbudt til enhver tid. Inkluderer ipamorelin, GHRP-6, hexarelin.',
    ['ipamorelin', 'ghrp-6', 'hexarelin']),
  e('insulin', 'Insulin (uten medisinsk indikasjon)', 'S2.3', 'tue',
    'Krever medisinsk fritak ved diabetes. Forbudt uten indikasjon.'),

  // S3 — Beta-2-agonister
  e('salbutamol', 'Salbutamol', 'S3 — Beta-2-agonister', 'incomp',
    'Tillatt inhalert inntil 1600 µg per 24 t (max 600 µg per 8 t). Over: krever fritak.',
    ['ventoline', 'airomir']),
  e('formoterol', 'Formoterol', 'S3 — Beta-2-agonister', 'incomp',
    'Tillatt inhalert inntil 54 µg per 24 t. Over: krever fritak.', ['oxis', 'symbicort']),
  e('salmeterol', 'Salmeterol', 'S3 — Beta-2-agonister', 'incomp',
    'Tillatt inhalert inntil 200 µg per 24 t.', ['serevent', 'seretide']),
  e('vilanterol', 'Vilanterol', 'S3 — Beta-2-agonister', 'incomp',
    'Tillatt inhalert inntil 25 µg per 24 t.', ['relvar', 'anoro']),
  e('terbutalin', 'Terbutalin', 'S3 — Beta-2-agonister', 'tue',
    'Krever fritak (også inhalert).', ['bricanyl']),
  e('fenoterol', 'Fenoterol', 'S3 — Beta-2-agonister', 'incomp', 'Forbudt utenom doseringsvinduet.'),
  e('reproterol', 'Reproterol', 'S3 — Beta-2-agonister', 'incomp', 'Forbudt utenom doseringsvinduet.'),

  // S4 — Hormon- og metabolske modulatorer
  e('aromatasehemmere', 'Aromatasehemmere', 'S4.1', 'banned',
    'Anastrozol, exemestan, letrozol, formestan. Forbudt til enhver tid.',
    ['anastrozol', 'exemestan', 'letrozol', 'formestan']),
  e('serm', 'SERMs', 'S4.2', 'banned',
    'Selektive østrogenreseptormodulatorer. Tamoxifen, raloxifen, klomifen. Forbudt til enhver tid.',
    ['tamoxifen', 'raloxifen', 'klomifen']),
  e('myostatinhemmere', 'Myostatinhemmere', 'S4.4', 'banned', 'Forbudt til enhver tid.'),
  e('meldonium', 'Meldonium', 'S4.5', 'banned',
    'Metabolsk modulator. Forbudt til enhver tid (føyd til 2016).'),
  e('insulin-mimetic', 'Insulin-mimetika', 'S4.5', 'banned', 'Forbudt til enhver tid.'),

  // S5 — Diuretika og maskerende stoffer
  e('furosemid', 'Furosemid', 'S5 — Diuretika og maskerende', 'banned',
    'Forbudt til enhver tid (kan maskere andre stoffer).', ['furix', 'lasix']),
  e('hydroklortiazid', 'Hydroklortiazid', 'S5 — Diuretika og maskerende', 'banned',
    'Forbudt til enhver tid.', ['centyl']),
  e('spironolakton', 'Spironolakton', 'S5 — Diuretika og maskerende', 'banned', 'Forbudt til enhver tid.'),
  e('acetazolamid', 'Acetazolamid', 'S5 — Diuretika og maskerende', 'banned',
    'Forbudt til enhver tid. Vanlig brukt mot høyfjellssyke — krever fritak.', ['diamox']),
  e('probenecid', 'Probenecid', 'S5 — Diuretika og maskerende', 'banned',
    'Maskerende stoff. Forbudt til enhver tid.'),

  // S6 — Stimulerende midler (in-competition only)
  e('amfetamin', 'Amfetamin', 'S6.A — Ikke-spesifiserte stimulanter', 'incomp',
    'Forbudt i konkurranse. ADHD-utøvere må ha fritak.', ['adderall']),
  e('metylfenidat', 'Metylfenidat', 'S6.A', 'tue',
    'Forbudt i konkurranse. ADHD-utøvere må ha fritak.', ['ritalin', 'concerta', 'medikinet']),
  e('lisdeksamfetamin', 'Lisdeksamfetamin', 'S6.A', 'tue',
    'Forbudt i konkurranse. Krever fritak.', ['elvanse', 'aduvanz']),
  e('modafinil', 'Modafinil', 'S6.A', 'tue', 'Forbudt i konkurranse. Krever fritak.', ['provigil']),
  e('kokain', 'Kokain', 'S6.A', 'incomp', 'Forbudt i konkurranse.'),
  e('mdma', 'MDMA / Ecstasy', 'S6.A', 'incomp', 'Forbudt i konkurranse.'),
  e('efedrin', 'Efedrin', 'S6.B — Spesifiserte stimulanter', 'incomp',
    'Forbudt i konkurranse over 10 µg/ml i urin.', ['ephedrin']),
  e('pseudoefedrin', 'Pseudoefedrin', 'S6.B', 'incomp',
    'Forbudt i konkurranse over 150 µg/ml i urin. Reseptfrie forkjølelsesmidler kan inneholde dette.'),
  e('koffein', 'Koffein', 'S6 — Overvåkningsliste', 'incomp',
    'Ikke forbudt, men overvåkes 2026. Hold deg under typiske inntak.'),
  e('strychnin', 'Strychnin', 'S6.B', 'incomp', 'Forbudt i konkurranse.'),
  e('cathine', 'Cathine (norpseudoefedrin)', 'S6.B', 'incomp',
    'Forbudt i konkurranse over 5 µg/ml i urin.'),

  // S7 — Narkotika (in-competition only)
  e('morfin', 'Morfin', 'S7 — Narkotika', 'tue',
    'Forbudt i konkurranse. Krever fritak ved kronisk smertebehandling.'),
  e('oxykodon', 'Oxykodon', 'S7 — Narkotika', 'tue', 'Forbudt i konkurranse. Krever fritak.', ['oxycontin']),
  e('fentanyl', 'Fentanyl', 'S7 — Narkotika', 'tue', 'Forbudt i konkurranse.'),
  e('metadon', 'Metadon', 'S7 — Narkotika', 'tue', 'Forbudt i konkurranse.'),
  e('heroin', 'Heroin (diamorfin)', 'S7 — Narkotika', 'incomp', 'Forbudt i konkurranse.'),
  e('petidin', 'Petidin', 'S7 — Narkotika', 'tue', 'Forbudt i konkurranse.'),
  e('buprenorfin', 'Buprenorfin', 'S7 — Narkotika', 'tue', 'Forbudt i konkurranse.', ['subutex', 'temgesic']),

  // S8 — Cannabinoider (in-competition only)
  e('thc', 'THC (Cannabis)', 'S8 — Cannabinoider', 'incomp',
    'Forbudt i konkurranse. Tillatt utenfor. Inkluderer hasj, marihuana.', ['cannabis', 'marihuana', 'hasj']),
  e('thc-syntetisk', 'Syntetisk THC', 'S8 — Cannabinoider', 'incomp',
    'JWH-018, JWH-073 etc. Forbudt i konkurranse.', ['spice', 'k2']),
  e('cbd', 'CBD (Cannabidiol)', 'S8 — Cannabinoider', 'incomp',
    'CBD i seg selv er IKKE forbudt, men CBD-produkter kan inneholde THC over grenseverdi.'),

  // S9 — Glukokortikoider (in-competition only, systemisk)
  e('prednisolon', 'Prednisolon', 'S9 — Glukokortikoider', 'tue',
    'Forbudt i konkurranse ved oral, intravenøs, intramuskulær eller rektal bruk. Krever fritak.'),
  e('prednison', 'Prednison', 'S9 — Glukokortikoider', 'tue', 'Forbudt i konkurranse ved systemisk bruk.'),
  e('metylprednisolon', 'Metylprednisolon', 'S9 — Glukokortikoider', 'tue',
    'Forbudt i konkurranse ved systemisk bruk.', ['medrol', 'solu-medrol']),
  e('triamcinolon', 'Triamcinolon', 'S9 — Glukokortikoider', 'tue',
    'Forbudt i konkurranse ved IM eller intra-artikulær bruk.', ['kenacort']),
  e('dexametason', 'Dexametason', 'S9 — Glukokortikoider', 'tue', 'Forbudt i konkurranse ved systemisk bruk.'),
  e('budesonid', 'Budesonid (inhalert)', 'S9 — Glukokortikoider', 'incomp',
    'Inhalert/topisk er TILLATT uten fritak. Oral/IV/IM krever fritak.', ['pulmicort']),

  // P1 — Beta-blokkere (forbudt i utvalgte idretter)
  e('propranolol', 'Propranolol', 'P1 — Beta-blokkere', 'incomp',
    'Forbudt i konkurranse i: bueskyting, biljard, dart, golf, skyting, stuping, undervannsidrett.'),
  e('metoprolol', 'Metoprolol', 'P1 — Beta-blokkere', 'incomp',
    'Forbudt i utvalgte idretter (skyting, bueskyting m.fl.).', ['selo-zok']),
  e('atenolol', 'Atenolol', 'P1 — Beta-blokkere', 'incomp',
    'Forbudt i utvalgte idretter.', ['tenormin']),
  e('bisoprolol', 'Bisoprolol', 'P1 — Beta-blokkere', 'incomp', 'Forbudt i utvalgte idretter.'),
  e('timolol', 'Timolol', 'P1 — Beta-blokkere', 'incomp',
    'Også som øyedråper i utvalgte idretter (skyting).'),

  // M1 — Manipulasjon av blod/blodprodukter
  e('blodtransfusjon', 'Blodtransfusjon (auto/homolog)', 'M1.1 — Blodmanipulasjon', 'banned',
    'Forbudt til enhver tid.'),
  e('hboc', 'Hemoglobinbaserte oksygenbærere', 'M1.2', 'banned', 'Forbudt til enhver tid.'),
  e('intravenose-infusjoner', 'IV-infusjoner > 100 ml/12 t', 'M2.2', 'banned',
    'Forbudt med mindre legitimt mottatt under sykehusbehandling, kirurgi eller diagnostikk.'),

  // M3 — Genetisk doping
  e('gen-doping', 'Gen- og celledoping', 'M3 — Genetisk doping', 'banned',
    'Bruk av nukleinsyrer, geneditering eller modifiserte celler. Forbudt til enhver tid.'),
];
