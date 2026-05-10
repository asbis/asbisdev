"""Vedlegg 4 — Leverandørens gjennomføringsevne.

Tabell-strukturen i malen har 7 rader (label + verdi-celler annenhver). Vi fyller
inn verdiene rett under hver label.
"""
from docx import Document
import sys
sys.path.insert(0, str(__import__("pathlib").Path(__file__).parent))
from _paths import SRC_DIR, DST_DIR
from _docx_utils import set_cell_text

SRC = SRC_DIR / "1.4 Vedlegg 4 - Leverandørens gjennomføringsevne.docx"
DST = DST_DIR / "Vedlegg 4 — Gjennomføringsevne (utfylt).docx"

# Hver besvarelse mappes til labelen i mal-tabellen (delvis substring-match).
BESVARELSER = {
    "arbeidsstyrke": """Asbjørn Rørvik (ENK), org.nr 820 252 632. Enkeltpersonforetak med én senior fullstack-utvikler. Gjennomsnittlig årlig arbeidsstyrke siste 3 år: 1 årsverk. Ledelse: 1 person (innehaver). I oppdragsperioden dedikeres 1 årsverk til utviklingsfasen og ca. 0,2 årsverk i 12 mnd. garantiperiode. Ekstern UU-revisjon (Funka Nu / MediaLT) kjøpes som avgrenset tjeneste — ikke som underleverandør i kvalifikasjonsforstand.

Faglig kompetanse:
- 8+ års produksjonserfaring som fullstack/mobil-utvikler
- React Native, Flutter, TypeScript, Go, .NET, Next.js
- Native iOS/Android publisering (App Store, Google Play) — flere apper levert
- Personvern, sikkerhet (PCI DSS via EaseePay), WCAG 2.2 AA via Altibox og Kolumbus
""",
    "kjernekompetanse": """Mobilapp-utvikling (iOS + Android) i React Native og Flutter, med vekt på samfunnskritiske og regulerte domener:
- Equinor — offshore-kritiske apper
- Kolumbus — Flutter-app, 142 000+ MAU, vinner av Nordic Public Transport Design Award 2025
- NLR TryggDrift — HMS-app for landbruket, levert til App Store + Google Play
- Easee — EaseePay (PCI DSS, Adyen-integrasjon)
- Altibox — smarthus med WCAG 2.2 AA-krav

Direkte overføringsverdi til antidoping-app: native publisering, regulert innhold, integrasjoner mot tredjepart (Felleskatalogen, WADA, ItF).""",
    "underleverandor": """Ingen underleverandør i kvalifikasjonsforstand. Ekstern UU-revisjon (WCAG 2.2 AA-gjennomgang før publisering, brukertest med assistive teknologier og cross-device-test) kjøpes som avgrenset tjeneste fra Funka Nu / MediaLT eller tilsvarende — anslagsvis 5–8 % av kontraktssummen — og er priset inn i fastpris (Bilag 7). Leverandøren står ansvarlig overfor ADNO for hele leveransen.""",
    "organisering": """Asbjørn Rørvik er prosjektleder, hovedutvikler og teknisk arkitekt — ett kontaktpunkt for ADNO gjennom hele kontrakten. Direkte tilgang via Slack/Teams og e-post, ingen ticket-kø.

Arbeidsmetodikk: 2-ukers sprinter, ukentlig demo, månedlig styringsmøte. GitHub-repo eid av ADNO fra dag 1 — full innsyn i kode og fremdrift. Sentry og uptime-monitor varsler proaktivt.

Kontinuitet og risiko: kildekode-escrow-klausul / git-tilgang for ADNO sikrer at andre utviklere kan plukke opp ved langvarig fravær. Ekstern UU-revisjon gir uavhengig kvalitetssikring på spesialiserte deler.""",
}


def main():
    doc = Document(SRC)
    t = doc.tables[0]

    # Mal har label-rad fulgt av tom verdi-rad. Strategi: gå gjennom rader, og hvis
    # første celle inneholder kjent label-substring, fyll andre celle (eller neste rad).
    label_to_key = [
        ("arbeidsstyrke", "arbeidsstyrke"),
        ("kjernekompetanse", "kjernekompetanse"),
        ("sette bort", "underleverandor"),
        ("organisert for gjennomføring", "organisering"),
    ]

    rows = t.rows
    filled = []
    for i, row in enumerate(rows):
        first_text = row.cells[0].text.lower()
        for needle, key in label_to_key:
            if needle in first_text and key not in filled:
                # Hvis andre celle er tom, skriv der; ellers neste rads andre celle
                target = row.cells[1] if not row.cells[1].text.strip() else (
                    rows[i + 1].cells[1] if i + 1 < len(rows) else row.cells[1]
                )
                set_cell_text(target, BESVARELSER[key])
                filled.append(key)

    DST.parent.mkdir(parents=True, exist_ok=True)
    doc.save(DST)
    print(f"✓ Lagret: {DST} (felter fylt: {filled})")
    if len(filled) < len(BESVARELSER):
        print(f"  ⚠ Manglende: {set(BESVARELSER) - set(filled)} — sjekk tabell-struktur")


if __name__ == "__main__":
    main()
