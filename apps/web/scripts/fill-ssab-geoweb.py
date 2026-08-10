"""Fyll ut MET sin SSA-B appendices-mal for GeoWeb-tilbudet (2026-111353).

Leser vart-utkast/bilag2-response.md inn i Appendix 2, krysser av valg i
Appendix 3, fyller representant + nøkkelpersonell i Appendix 4 og pris i
Appendix 5. Kjør på nytt etter endringer i markdown-kilden — output overskrives.
"""
from pathlib import Path
import copy
import re

from docx import Document
from docx.oxml.ns import qn

TENDER_DIR = Path("/Users/asbis/code/asbisdev/oppdrag/aktive/2026-111353-met-geoweb-frontend")
SRC = TENDER_DIR / "files" / "SSA-B_appendices_2026-eng.docx"
DST_DIR = TENDER_DIR / "til-innsending" / "autogenerert"
DST = DST_DIR / "SSA-B_appendices_2026-eng (utfylt).docx"
BILAG2_MD = TENDER_DIR / "vart-utkast" / "bilag2-response.md"

# Timepris NOK eks mva. Maks ~1084 for å holde 1 MNOK / ~922 t over 6 mnd
# (123 arbeidsdager okt 2026–mars 2027). None gir [FILL]-plassholdere.
HOURLY_RATE = 1075

REPRESENTATIVE = (
    "On behalf of the Consultant: Asbjørn Rørvik, owner, "
    "Asbjørn Rørvik (org.nr 820 252 632) — hei@asbjornrorvik.dev, "
    "+47 47 65 86 51"
)
KEY_PERSONNEL = [
    ("Asbjørn Rørvik", "Senior frontend developer",
     "Frontend architecture, React/TypeScript/Redux, geospatial UI, "
     "charting, automated testing (Jest/Cypress/Storybook)"),
]


def insert_paragraph_after(anchor, text="", style=None, bold=False):
    """Insert a new paragraph directly after `anchor` and return it."""
    new_p = copy.deepcopy(anchor._p)
    # strip children (runs etc.), keep pPr if present
    for child in list(new_p):
        if child.tag != qn("w:pPr"):
            new_p.remove(child)
    anchor._p.addnext(new_p)
    from docx.text.paragraph import Paragraph
    para = Paragraph(new_p, anchor._parent)
    if style:
        para.style = style
    run = para.add_run(text)
    run.bold = bold
    return para


def find_paragraph(doc, needle):
    for p in doc.paragraphs:
        if needle in p.text:
            return p
    raise SystemExit(f"Anchor not found: {needle!r}")


def md_to_paragraphs(md_text):
    """Very small markdown → (text, kind) converter. kind: h2/h3/bullet/text."""
    out = []
    for raw in md_text.splitlines():
        line = raw.rstrip()
        if not line.strip():
            continue
        if line.startswith(">"):
            continue  # instruction blocks stay out of the docx
        if line.startswith("# "):
            continue  # top title — Appendix heading already exists in the docx
        if line.startswith("### "):
            out.append((line[4:], "h3"))
        elif line.startswith("## "):
            out.append((line[3:], "h2"))
        elif line.startswith(("- ", "* ")):
            out.append(("• " + line[2:], "text"))
        elif line.startswith("|"):
            cells = [c.strip() for c in line.strip("|").split("|")]
            if set("".join(cells)) <= {"-", " ", ":"}:
                continue  # separator row
            out.append((" — ".join(c for c in cells if c), "text"))
        else:
            out.append((line, "text"))
    # strip markdown emphasis
    return [(re.sub(r"\*\*(.+?)\*\*", r"\1", t), k) for t, k in out]


def main():
    doc = Document(SRC)

    # ---- Appendix 2: our response -------------------------------------
    anchor = find_paragraph(
        doc, "The Consultant must ensure that all requirements")
    cursor = anchor
    for text, kind in md_to_paragraphs(BILAG2_MD.read_text()):
        if kind == "h2":
            cursor = insert_paragraph_after(cursor, text, bold=True)
        elif kind == "h3":
            cursor = insert_paragraph_after(cursor, text, bold=True)
        else:
            cursor = insert_paragraph_after(cursor, text)

    # ---- Appendix 3: select start-up and timeframe options ------------
    choices = {
        "Assistance shall commence on DD/MM/YYYY": False,
        "Assistance shall commence as soon as possible and no later than 01/10/2026": True,
        "Assistance shall run until DD/MM/YYYY": False,
        "Assistance shall be provided for XX weeks": False,
        "ongoing basis until the Customer’s project is completed": False,
        "ongoing basis until the upper financial limit": True,
    }
    for p in doc.paragraphs:
        for needle, selected in choices.items():
            if needle in p.text and not p.text.startswith(("☒", "☐")):
                mark = "☒ " if selected else "☐ "
                first_run = p.runs[0] if p.runs else p.add_run("")
                first_run.text = mark + first_run.text
                if selected:
                    for r in p.runs:
                        r.bold = True

    # ---- Appendix 4: representative + key personnel --------------------
    rep = find_paragraph(doc, "On behalf of the Consultant:")
    for r in rep.runs:
        r.text = ""
    rep.runs[0].text = REPRESENTATIVE

    personnel_table = doc.tables[0]  # Name / Category / Area of expertise
    for i, (name, cat, area) in enumerate(KEY_PERSONNEL, start=1):
        row = personnel_table.rows[i]
        row.cells[0].text = name
        row.cells[1].text = cat
        row.cells[2].text = area

    # ---- Appendix 5: hourly rate ---------------------------------------
    if HOURLY_RATE:
        excl = f"{HOURLY_RATE:,.0f}".replace(",", " ")
        vat = f"{HOURLY_RATE * 0.25:,.2f}".replace(",", " ")
        incl = f"{HOURLY_RATE * 1.25:,.2f}".replace(",", " ")
    else:
        excl = vat = incl = "[FILL]"
    rate_table = doc.tables[1]
    # rows: 1 = price/hour excl. VAT, 2 = VAT 25%, 3 = price/hour incl. VAT
    rate_table.rows[1].cells[2].text = excl
    rate_table.rows[2].cells[2].text = vat
    rate_table.rows[3].cells[2].text = incl

    DST_DIR.mkdir(parents=True, exist_ok=True)
    doc.save(DST)
    print(f"→ {DST}")


if __name__ == "__main__":
    main()
