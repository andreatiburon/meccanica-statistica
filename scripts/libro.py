#!/usr/bin/env python3
"""Prepara un PDF per la lettura a pagine e ci cerca dentro.

Uso:
  python3 scripts/libro.py prepara "<pdf>" [slug]
  python3 scripts/libro.py cerca <slug> "<regex>"

`prepara` scrive in .testo/<slug>/:
  - pNNN.txt, il testo di ogni pagina fisica (1-based), estratto con pdftotext;
  - _indice.md, con il TOC del PDF (pagine fisiche) e l'elenco delle pagine
    senza testo, che sono probabilmente scansionate e vanno lette in vision.
"""
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

from pypdf import PdfReader

RADICE = Path(__file__).resolve().parent.parent
TESTO = RADICE / ".testo"
MIN_CARATTERI = 20  # sotto questa soglia la pagina è considerata senza testo


def slugify(nome):
    nome = unicodedata.normalize("NFKD", nome).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", nome.lower()).strip("-")


def toc(reader):
    righe = []

    def visita(voci, livello):
        for voce in voci:
            if isinstance(voce, list):
                visita(voce, livello + 1)
                continue
            try:
                pagina = reader.get_destination_page_number(voce) + 1
            except Exception:
                continue
            righe.append(f"{'  ' * livello}- {voce.title} — p. {pagina}")

    visita(reader.outline, 0)
    return righe


def prepara(pdf, slug=None):
    pdf = Path(pdf).resolve()
    slug = slug or slugify(pdf.stem)
    cartella = TESTO / slug
    cartella.mkdir(parents=True, exist_ok=True)

    reader = PdfReader(str(pdf))
    n = len(reader.pages)
    vuote = []
    for i in range(1, n + 1):
        testo = subprocess.run(
            ["pdftotext", "-layout", "-f", str(i), "-l", str(i), str(pdf), "-"],
            capture_output=True, text=True,
        ).stdout
        (cartella / f"p{i:03d}.txt").write_text(testo)
        if len(testo.strip()) < MIN_CARATTERI:
            vuote.append(i)

    try:
        sorgente = pdf.relative_to(RADICE)
    except ValueError:
        sorgente = pdf
    indice = [f"# {pdf.stem}", "", f"- Sorgente: `{sorgente}`", f"- Pagine fisiche: {n}", ""]
    indice += ["## Indice (pagine fisiche)", ""] + (toc(reader) or ["(il PDF non ha un indice)"])
    indice += ["", "## Pagine senza testo (scansioni o sole figure)", ""]
    indice.append(", ".join(map(str, vuote)) if vuote else "nessuna")
    (cartella / "_indice.md").write_text("\n".join(indice) + "\n")
    print(f".testo/{slug}/: {n} pagine, {len(vuote)} senza testo")


def cerca(slug, regex):
    cartella = TESTO / slug
    if not cartella.is_dir():
        sys.exit(f"manca .testo/{slug}/: lancia prima `prepara`")
    pattern = re.compile(regex, re.IGNORECASE)
    for file in sorted(cartella.glob("p*.txt")):
        for riga in file.read_text().splitlines():
            if pattern.search(riga):
                print(f"p. {int(file.stem[1:])}: {riga.strip()}")


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "prepara":
        prepara(*sys.argv[2:4])
    elif len(sys.argv) == 4 and sys.argv[1] == "cerca":
        cerca(sys.argv[2], sys.argv[3])
    else:
        sys.exit(__doc__)
