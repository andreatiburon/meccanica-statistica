#!/usr/bin/env python3
"""Prepara i dati del nuovo sito (l'app React in sito/app/) a partire dalla wiki.

Uso:
  python3 scripts/contenuti.py

Scrive in sito/app/public/:
  dati/indice.json   percorso, fonti, film e laboratori
  dati/<slug>.json   un articolo diviso in sezioni e blocchi (testo, idea, passaggi, domande, ...)
  video/, katex/     i film e il CSS di KaTeX, copiati

Riusa lettura, conversione e formule di scripts/sito.py, così il contenuto resta lo stesso del sito attuale:
cambia solo la forma, che qui è strutturata in blocchi perché l'app li renda interattivi.
"""
import html
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import sito  # noqa: E402
from sito import (FILM_SEZIONI, FILM_TESTA, FONTI, KATEX, LABORATORI, LEZIONI, PAGINE_DISPENSE, PERCORSO,  # noqa: E402
                  RADICE, VIDEO, Formule, didascalia, esc, ritocca)

USCITA = RADICE / "sito" / "app" / "public"
# I film del nuovo sito sono quelli nel tema «lavagna» (sito/galleria/lavagna, resi con TEMA_FILM=lavagna);
# FILM_DA sceglie un'altra cartella. Se la cartella non c'è si usano quelli del sito attuale.
_film = Path(os.environ.get("FILM_DA", RADICE / "sito" / "galleria" / "lavagna"))
if _film.is_dir() and any(_film.glob("*.mp4")):
    sito.VIDEO = VIDEO = _film

# Laboratori dell'app: nome -> (titolo, sottotitolo). Quelli non ancora portati in React restano segnaposti.
LAB = {
    "gas": ("Un gas che si termalizza", "300 dischi rigidi con urti elastici"),
    "langevin": ("Il campo ordina, la temperatura disordina", "Dipoli in un campo: funzione di Langevin e legge di Curie"),
    "ising": ("Ising con il termostato in mano", "Metropolis su un reticolo 128 × 128"),
    "guscio": ("Il guscio di energia", "Volume della sfera in molte dimensioni"),
    "langmuir": ("Adsorbimento", "Isoterma di Langmuir"),
    "vdw": ("Isoterme di van der Waals", "Costruzione di Maxwell"),
    "campo-medio": ("Campo medio", "Soluzione grafica dell'autoconsistenza"),
    "fermi": ("Gas di Fermi", "Occupazioni e mare di Fermi"),
    "bose": ("Gas di Bose", "Condensazione"),
    "planck": ("Corpo nero", "Spettro di Planck"),
    "solidi": ("Calore specifico dei solidi", "Einstein e Debye"),
    "limite-centrale": ("Limite centrale", "Somme di variabili aleatorie"),
    "legendre": ("Trasformata di Legendre", "Dalla curva alle tangenti"),
    "liouville": ("Teorema di Liouville", "Il volume nello spazio delle fasi si conserva"),
}
SPECIALI = ("idea", "attenzione", "passaggi", "domanda", "risposta", "esercizio", "soluzione", "lab-segnaposto")
APERTURA = re.compile(r'<div class="(%s)"([^>]*)>' % "|".join(re.escape(c) for c in SPECIALI))
TAG_DIV = re.compile(r"<div\b[^>]*>|</div>")


def pandoc(md):
    return subprocess.run(["pandoc", "-f", "markdown", "-t", "html", "--katex", "--wrap=none"],
                          input=md, capture_output=True, text=True, check=True).stdout


def wikilink(articoli):
    def sost(m):
        target, alias = m.group(1), m.group(2)
        slug = sito.slug_interno(target)
        if slug in articoli:
            return f'<a class="wl" href="#{slug}">{esc(alias or articoli[slug]["breve"])}</a>'
        if slug == "indice_wiki":
            return f'<a class="wl" href="#home">{esc(alias or "Indice")}</a>'
        nome = alias or target.split("/")[-1].replace("-", " ")
        return f'<span class="wl stub" title="Non ancora nel sito: {esc(target)}">{esc(nome)}</span>'
    return lambda t: re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", sost, t)


def blocchi(frammento):
    """HTML -> lista di blocchi; i div speciali di pandoc diventano blocchi con figli, anche annidati."""
    out, i = [], 0
    while True:
        m = APERTURA.search(frammento, i)
        if not m:
            break
        prof, j = 1, m.end()
        while prof:
            t = TAG_DIV.search(frammento, j)
            prof += 1 if t.group(0).startswith("<div") else -1
            j = t.end()
        prima = frammento[i:m.start()].strip()
        if prima:
            out.append({"t": "html", "html": prima})
        out.append(speciale(m.group(1), dict(re.findall(r'data-([\w-]+)="([^"]*)"', m.group(2))),
                            frammento[m.end():t.start()]))
        i = j
    resto = frammento[i:].strip()
    if resto:
        out.append({"t": "html", "html": resto})
    return out


def separa(figli, tipo):
    """Toglie dai blocchi figli quello di tipo dato (la risposta di una domanda, la soluzione di un esercizio)."""
    trovato = next((b for b in figli if b["t"] == tipo), None)
    return [b for b in figli if b is not trovato], (trovato["blocchi"] if trovato else [])


def speciale(classe, attr, interno):
    if classe == "lab-segnaposto":
        return {"t": "lab", "nome": attr.get("tipo", "")}
    figli = blocchi(interno)
    if classe == "passaggi":
        return {"t": "passaggi", "titolo": html.unescape(attr.get("titolo", "Il conto, passo per passo")), "blocchi": figli}
    if classe == "domanda":
        testo, risposta = separa(figli, "risposta")
        return {"t": "domanda", "blocchi": testo, "risposta": risposta}
    if classe == "esercizio":
        testo, soluzione = separa(figli, "soluzione")
        return {"t": "esercizio", "blocchi": testo, "soluzione": soluzione}
    return {"t": classe, "blocchi": figli}


def sezioni(corpo):
    """Divide il corpo convertito alle intestazioni <h2 id=…>."""
    pezzi = re.split(r'(<h2 id="[^"]*">.*?</h2>)', corpo, flags=re.S)
    out = []
    for k in range(1, len(pezzi), 2):
        m = re.match(r'<h2 id="([^"]*)">(.*?)</h2>', pezzi[k], re.S)
        out.append({"id": m.group(1), "titolo": m.group(2).strip(), "html": pezzi[k + 1].strip()})
    return out


class Contenuti:
    def __init__(self):
        self.articoli = sito.leggi_articoli()
        self.descrizioni = sito.leggi_descrizioni()
        self.film = sito.leggi_film()
        self.formule = Formule()
        self.md = wikilink(self.articoli)
        self.dove_film, self.dove_lab = {}, {}

    def converti(self, md):
        return self.formule.segna(ritocca(pandoc(self.md(md)), privato=False))

    def articolo(self, slug):
        a = self.articoli[slug]
        lede = self.converti(a["lede_md"])
        film_sez = FILM_SEZIONI.get(slug, {})
        out = {"slug": slug, "titolo": a["titolo"], "breve": a["breve"], "tags": a["tags"], "lede": lede,
               "lezione": slug in LEZIONI, "film_testa": FILM_TESTA.get(slug), "sezioni": [],
               "punti": "", "correlati": "", "fonti": ""}
        if slug in PERCORSO:
            out["numero"] = PERCORSO.index(slug) + 1
            out["pagine"] = PAGINE_DISPENSE.get(slug, "")
        for s in sezioni(self.converti(a["corpo_md"])):
            if s["id"] == "punti-chiave":
                out["punti"] = s["html"]
                continue
            if s["id"] in ("articoli-correlati", "fonti"):
                out["correlati" if s["id"] != "fonti" else "fonti"] = s["html"]
                continue
            bl = blocchi(s["html"])
            for n in film_sez.get(s["id"], []):
                bl.append({"t": "film", "nome": n})
                self.dove_film[n] = (slug, s["id"])
            if LABORATORI.get(slug, (None,))[0] == s["id"]:
                bl.append({"t": "lab", "nome": LABORATORI[slug][1]})
            for b in bl:
                if b["t"] == "lab":
                    self.dove_lab[b["nome"]] = (slug, s["id"])
            out["sezioni"].append({"id": s["id"], "titolo": s["titolo"], "blocchi": bl})
        if slug in FILM_TESTA:
            self.dove_film[FILM_TESTA[slug]] = (slug, None)
        return out

    def costruisci(self):
        dati = USCITA / "dati"
        dati.mkdir(parents=True, exist_ok=True)
        pagine = {slug: self.articolo(slug) for slug in PERCORSO + FONTI if slug in self.articoli}
        descr = {slug: re.sub(r"^<p>|</p>\s*$", "", self.converti(self.descrizioni.get(slug, "")).strip())
                 for slug in pagine}
        self.formule.rendi()

        def applica(x):
            if isinstance(x, str):
                return self.formule.applica(x)
            if isinstance(x, list):
                return [applica(v) for v in x]
            if isinstance(x, dict):
                return {k: applica(v) for k, v in x.items()}
            return x

        def voce(slug):
            p = pagine[slug]
            film = ([p["film_testa"]] if p["film_testa"] else []) + [n for v in FILM_SEZIONI.get(slug, {}).values() for n in v]
            lab = [b["nome"] for s in p["sezioni"] for b in s["blocchi"] if b["t"] == "lab"]
            return {"slug": slug, "titolo": p["titolo"], "breve": p["breve"], "numero": p.get("numero"),
                    "pagine": p.get("pagine", ""), "descrizione": descr[slug], "film": film, "lab": lab,
                    "sezioni": [{"id": s["id"], "titolo": s["titolo"]} for s in p["sezioni"]]}

        indice = {
            "percorso": [voce(s) for s in PERCORSO if s in pagine],
            "fonti": [voce(s) for s in FONTI if s in pagine],
            "film": {n: {"titolo": d["titolo"], "durata": d["durata"],
                         "passi": [{"t": p["t"], "html": didascalia(p["testo"])} for p in d["passi"]],
                         "slug": self.dove_film.get(n, (None, None))[0], "sezione": self.dove_film.get(n, (None, None))[1]}
                     for n, d in self.film.items()},
            "lab": {n: {"titolo": t, "sottotitolo": st, "slug": self.dove_lab.get(n, (None, None))[0],
                        "sezione": self.dove_lab.get(n, (None, None))[1]} for n, (t, st) in LAB.items()},
        }
        (dati / "indice.json").write_text(json.dumps(applica(indice), ensure_ascii=False))
        for slug, p in pagine.items():
            (dati / f"{slug}.json").write_text(json.dumps(applica(p), ensure_ascii=False))

        video = USCITA / "video"
        video.mkdir(exist_ok=True)
        for f in VIDEO.glob("*"):
            dest = video / f.name
            if f.suffix in (".mp4", ".jpg") and (not dest.exists() or dest.stat().st_size != f.stat().st_size or dest.stat().st_mtime < f.stat().st_mtime):
                shutil.copy2(f, dest)
        katex = USCITA / "katex"
        (katex / "fonts").mkdir(parents=True, exist_ok=True)
        shutil.copy2(KATEX / "katex.min.css", katex / "katex.min.css")
        for f in (KATEX / "fonts").glob("*.woff2"):
            shutil.copy2(f, katex / "fonts" / f.name)
        print(f"{USCITA.relative_to(RADICE)}/: {len(pagine)} articoli, {len(self.formule.lista)} formule, {len(self.film)} film")


if __name__ == "__main__":
    Contenuti().costruisci()
