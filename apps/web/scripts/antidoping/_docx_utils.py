"""Hjelpere for docx-celle-utfylling — gjenbrukt på tvers av antidoping-scripts."""
from docx.shared import Pt


def set_cell_text(cell, text: str, bold: bool = False, size: int = 10):
    """Tøm celle og sett ny tekst (multilinje støttet)."""
    for p in cell.paragraphs:
        for r in p.runs:
            r.text = ""
    lines = text.split("\n")
    p0 = cell.paragraphs[0]
    run = p0.add_run(lines[0])
    run.bold = bold
    run.font.size = Pt(size)
    for line in lines[1:]:
        p = cell.add_paragraph()
        r = p.add_run(line)
        r.font.size = Pt(size)


def fill_label_value(table, label_match: str, value: str):
    """Fyll inn verdi i andre kolonne der første kolonne starter med label_match."""
    for row in table.rows:
        if len(row.cells) < 2:
            continue
        first = row.cells[0].text.strip()
        if first.lower().startswith(label_match.lower()) and not row.cells[1].text.strip():
            set_cell_text(row.cells[1], value)
            return True
    return False
