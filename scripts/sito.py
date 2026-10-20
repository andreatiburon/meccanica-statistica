#!/usr/bin/env python3
"""Costruisce il sito statico della wiki di meccanica statistica in _site/.

Uso:
  python3 scripts/sito.py

Richiede pandoc e node, con KaTeX installato in scripts/
(`npm install --prefix scripts`). Le formule sono rese già in fase di
costruzione: una formula che KaTeX non capisce ferma la build e viene stampata.
"""
import hashlib
import html
import json
import random
import re
import shutil
import subprocess
import sys
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
WIKI = RADICE / "wiki" / "meccanica-statistica"
TEMA = RADICE / "sito" / "tema"
VIDEO = RADICE / "sito" / "galleria" / "video"
OUT = RADICE / "_site"

# Ordine del corso e fonti, come in wiki/meccanica-statistica/indice_wiki.md
PERCORSO = [
    "insieme-microcanonico", "insieme-canonico", "insieme-gran-canonico-e-npt",
    "gas-reali-viriale-e-van-der-waals", "modello-di-ising-e-campo-medio",
    "gas-quantistici-ideali", "corpo-nero-e-solidi",
]
FONTI = ["corso-e-lezioni", "appunti-anno-scorso", "dispense-ed-esami"]
PAGINE_DISPENSE = {
    "insieme-microcanonico": "pp. 43–71", "insieme-canonico": "pp. 72–117",
    "insieme-gran-canonico-e-npt": "pp. 118–131", "gas-reali-viriale-e-van-der-waals": "pp. 132–140",
    "modello-di-ising-e-campo-medio": "pp. 143–169", "gas-quantistici-ideali": "pp. 170–206",
    "corpo-nero-e-solidi": "pp. 207–219",
}
FILM = {
    "insieme-canonico": ("gas-maxwell.mp4", "Termalizzazione di un gas",
                         "220 dischi rigidi partono tutti con la stessa velocità. Gli urti elastici redistribuiscono "
                         "l'energia e l'istogramma delle velocità si adagia sulla distribuzione di Maxwell-Boltzmann "
                         "in due dimensioni."),
    "modello-di-ising-e-campo-medio": ("ising.mp4", "Ising 2D attraverso la temperatura critica",
                                       "Metropolis su 96 × 96 spin mentre la temperatura scende attraverso "
                                       "$T_c=2/\\log(1+\\sqrt2)\\simeq2{,}269$. La curva gialla è la magnetizzazione "
                                       "esatta di Onsager."),
    "gas-quantistici-ideali": ("bose-einstein.mp4", "Condensazione di Bose-Einstein",
                               "1000 bosoni in una scatola 3D, con la popolazione dei livelli calcolata esattamente a "
                               "$N$ finito. Sotto $T_c$ le particelle si accumulano nello stato fondamentale: il picco "
                               "al centro della distribuzione degli impulsi."),
    "corpo-nero-e-solidi": ("planck.mp4", "Spettro di corpo nero",
                            "La legge di Planck contro quella di Rayleigh-Jeans al variare della temperatura. Il "
                            "massimo si sposta secondo la legge di Wien, e il disco ha il colore reale di un corpo "
                            "nero a quella temperatura."),
}
ETICHETTE_MAPPA = {
    "insieme-microcanonico": "Microcanonico", "insieme-canonico": "Canonico",
    "insieme-gran-canonico-e-npt": "Gran canonico e NPT", "gas-reali-viriale-e-van-der-waals": "Gas reali",
    "modello-di-ising-e-campo-medio": "Ising e campo medio", "gas-quantistici-ideali": "Gas quantistici",
    "corpo-nero-e-solidi": "Corpo nero e solidi", "corso-e-lezioni": "Corso e lezioni",
    "appunti-anno-scorso": "Appunti dell'anno scorso", "dispense-ed-esami": "Dispense ed esami",
}
LABORATORI = {
    "insieme-canonico": ("gas-perfetto-e-maxwell-boltzmann", "gas"),
    "modello-di-ising-e-campo-medio": ("ising-2d-e-bragg-williams", "ising"),
}


def esc(s):
    return html.escape(s, quote=True)


def testo_semplice(frammento):
    return html.unescape(re.sub(r"<[^>]+>", "", frammento)).strip()


# ---------------------------------------------------------------- lettura

def leggi_articoli():
    articoli = {}
    for f in sorted(WIKI.glob("*.md")):
        if f.stem == "indice_wiki":
            continue
        testo = f.read_text()
        fm = re.match(r"^---\n(.*?)\n---\n", testo, re.S)
        corpo = testo[fm.end():] if fm else testo
        tags = re.search(r"tags:\s*\[(.*?)\]", fm.group(1)).group(1).split(",") if fm else []
        titolo = re.search(r"^# (.+)$", corpo, re.M).group(1).strip()
        dopo = corpo.split(f"# {titolo}", 1)[1]
        lede, _, resto = dopo.strip().partition("\n## ")
        articoli[f.stem] = {
            "slug": f.stem, "titolo": titolo, "breve": titolo.split(":")[0].strip(),
            "tags": [t.strip() for t in tags if t.strip() and t.strip() != "meccanica-statistica"],
            "lede_md": lede.strip(), "corpo_md": "## " + resto,
            "link": sorted(set(re.findall(r"\[\[([^\]|]+)", corpo))),
        }
    return articoli


def leggi_descrizioni():
    righe = (WIKI / "indice_wiki.md").read_text().splitlines()
    out = {}
    for r in righe:
        m = re.match(r"- \[\[(?:meccanica-statistica/)?([^\]|]+)\]\]: (.+)", r)
        if m:
            out[m.group(1)] = m.group(2)
    return out


def slug_interno(target):
    return target.split("/", 1)[1] if target.startswith("meccanica-statistica/") else target


# ---------------------------------------------------------------- conversione

def wikilink(articoli):
    def sostituisci(m):
        target, alias = m.group(1), m.group(2)
        slug = slug_interno(target)
        if slug in articoli:
            return f'<a class="wl" href="{slug}.html">{esc(alias or articoli[slug]["breve"])}</a>'
        if slug == "indice_wiki":
            return f'<a class="wl" href="index.html#percorso">{esc(alias or "Indice")}</a>'
        nome = alias or target.split("/")[-1].replace("-", " ")
        return f'<span class="wl stub" title="Non ancora nel sito: {esc(target)}">{esc(nome)}</span>'
    return sostituisci


def pandoc(md):
    return subprocess.run(
        ["pandoc", "-f", "markdown", "-t", "html", "--katex", "--section-divs", "--wrap=none"],
        input=md, capture_output=True, text=True, check=True,
    ).stdout


class Formule:
    """Raccoglie le formule di tutte le pagine e le rende con KaTeX in un colpo solo."""
    SPAN = re.compile(r'<span class="math (inline|display)">(.*?)</span>', re.S)

    def __init__(self):
        self.lista = []

    def segna(self, frammento):
        def sostituisci(m):
            self.lista.append({"tex": html.unescape(m.group(2)), "display": m.group(1) == "display"})
            return f"\x00F{len(self.lista) - 1}\x00"
        return self.SPAN.sub(sostituisci, frammento)

    def rendi(self):
        r = subprocess.run(["node", str(RADICE / "scripts" / "katex-render.cjs")],
                           input=json.dumps(self.lista), capture_output=True, text=True, check=True)
        self.html = json.loads(r.stdout)
        errori = [(f["tex"], h["errore"]) for f, h in zip(self.lista, self.html) if "errore" in h]
        for tex, e in errori:
            print(f"ERRORE KaTeX: {e}\n  {tex}", file=sys.stderr)
        if errori:
            sys.exit(1)

    def applica(self, pagina):
        return re.sub(r"\x00F(\d+)\x00", lambda m: self.html[int(m.group(1))]["html"], pagina)


def ritocca(frammento):
    # citazioni a quaderno e dispense come etichette
    frammento = re.sub(r"\(((?:Appunti MS|Dispense)[^()<]*)\)", r'<span class="cit">\1</span>', frammento)
    # paragrafi in cui le fonti divergono
    frammento = re.sub(r"<p>((?:(?!</p>).)*?(?:divergono|divergenza)(?:(?!</p>).)*)</p>",
                       r'<p class="divergenza">\1</p>', frammento, flags=re.S)
    # tabelle scorrevoli su schermi stretti
    frammento = frammento.replace("<table>", '<div class="tabella"><table>').replace("</table>", "</table></div>")
    return frammento


def filetto(seme, n=150, larghezza=1200, altezza=14):
    """Filetto di punti con densità e^{-x}: un campione della distribuzione di Boltzmann."""
    rng = random.Random(int(hashlib.md5(seme.encode()).hexdigest()[:8], 16))
    punti = []
    for _ in range(n):
        x = min(rng.expovariate(1 / (larghezza * 0.22)), larghezza - 2)
        y = altezza / 2 + rng.uniform(-altezza * 0.32, altezza * 0.32)
        r = rng.uniform(0.9, 1.9)
        punti.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.2f}"/>')
    return (f'<svg class="filetto" viewBox="0 0 {larghezza} {altezza}" preserveAspectRatio="xMinYMid slice" '
            f'aria-hidden="true">{"".join(punti)}</svg>')


# ---------------------------------------------------------------- pezzi di pagina

FONT = ("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500"
        "&family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap")
KATEX_CSS = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css"
ICONA = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' "
         "height='32' rx='6' fill='%23141C36'/%3E%3Cg fill='%23EC8C55'%3E%3Ccircle cx='8' cy='22' r='3'/%3E%3Ccircle "
         "cx='15' cy='12' r='2.4'/%3E%3C/g%3E%3Cg fill='%23CFDAF2'%3E%3Ccircle cx='23' cy='20' r='2'/%3E%3Ccircle "
         "cx='22' cy='9' r='1.6'/%3E%3Ccircle cx='12' cy='26' r='1.4'/%3E%3C/g%3E%3C/svg%3E")
NAV = [("index.html", "Home"), ("index.html#percorso", "Percorso"), ("index.html#film", "Film"),
       ("laboratorio.html", "Laboratorio"), ("mappa.html", "Mappa")]


def pagina(titolo, corpo, attiva, descrizione, dati=None):
    nav = "".join(
        f'<a href="{h}"{" aria-current=page" if t == attiva else ""}>{t}</a>' for h, t in NAV)
    dati_js = (f'<script type="application/json" id="dati-mappa">{json.dumps(dati, ensure_ascii=False)}</script>'
               if dati else "")
    return f"""<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(titolo)}</title>
<meta name="description" content="{esc(descrizione)}">
<link rel="icon" href="{ICONA}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONT}">
<link rel="stylesheet" href="{KATEX_CSS}">
<link rel="stylesheet" href="style.css">
<script src="sito.js" defer></script>
</head>
<body>
<header class="barra"><div class="barra-in">
<a class="marchio" href="index.html">Meccanica <span>Statistica</span></a>
<nav class="nav" aria-label="Sezioni">{nav}</nav>
</div></header>
{corpo}
<footer class="piede"><div class="piede-in">
<p>Wiki di studio costruita dagli appunti e dalle dispense del corso. Formule in KaTeX, film in Manim, simulazioni nel browser.</p>
<p><a href="index.html#come-si-legge">Come si legge</a> · <a href="mappa.html">Mappa</a> · <a href="laboratorio.html">Laboratorio</a></p>
</div></footer>
{dati_js}
</body>
</html>
"""


def video(file):
    base = file.rsplit(".", 1)[0]
    return (f'<video poster="video/{base}.jpg" muted loop playsinline controls preload="none">'
            f'<source src="video/{base}.webm" type="video/webm"><source src="video/{base}.mp4" type="video/mp4"></video>')


def figura_film(slug, numero="Film"):
    file, titolo, testo = FILM[slug]
    return f"""<figure class="lavagna-fig film">
{video(file)}
<figcaption><b>{numero}</b><i>{esc(titolo)}.</i> {pandoc_inline_math(esc(testo))}</figcaption>
</figure>"""


def lab_gas():
    return """<figure class="lavagna-fig lab" data-lab="gas">
<div class="lab-banco">
<canvas class="lab-gas" aria-label="Gas di dischi rigidi colorati per velocità"></canvas>
<div class="lab-letture">
<canvas class="lab-ist" aria-label="Istogramma delle velocità con la curva di Maxwell-Boltzmann"></canvas>
<dl class="misure"><dt>k<sub>B</sub>T = ⟨v²⟩/2</dt><dd data-v="T">–</dd><dt>urti al secondo</dt><dd data-v="urti">–</dd><dt>scarto dalla curva</dt><dd data-v="scarto">–</dd></dl>
<div class="comandi"><button type="button" data-c="uguali">Velocità tutte uguali</button><button type="button" data-c="caldo">Riscalda</button><button type="button" data-c="freddo">Raffredda</button><button type="button" data-c="pausa">Pausa</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Un gas che si termalizza.</i> 300 dischi rigidi con urti elastici. Premi «Velocità tutte uguali» e guarda l'istogramma passare da un picco alla curva di Maxwell-Boltzmann; clicca nella scatola per scaldare un punto. Lo scarto è la distanza media tra istogramma e curva teorica.</figcaption>
</figure>"""


def lab_ising():
    return """<figure class="lavagna-fig lab" data-lab="ising">
<div class="lab-banco">
<canvas class="lab-ising" width="128" height="128" aria-label="Reticolo di Ising: arancio spin su, blu spin giù"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>temperatura T (J/k<sub>B</sub>)</span><output data-v="Tval">2,27</output></label><input type="range" min="1" max="4" step="0.01" value="2.27" aria-label="Temperatura"></div>
<span class="fase" data-v="fase" data-fase="critica">vicino al punto critico</span>
<dl class="misure"><dt>|m| simulata</dt><dd data-v="m">–</dd><dt>|m| di Onsager</dt><dd data-v="onsager">–</dd><dt>energia per spin</dt><dd data-v="e">–</dd><dt>passi Monte Carlo</dt><dd data-v="passi">–</dd></dl>
<div class="comandi"><button type="button" data-c="caos">Spin casuali</button><button type="button" data-c="su">Tutti su</button><button type="button" data-c="tc">Vai a T<sub>c</sub></button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Ising con il termostato in mano.</i> 128 × 128 spin, algoritmo di Metropolis. Sotto T<sub>c</sub> crescono i domini; sopra, il reticolo torna rumore. Raffreddando in fretta da spin casuali |m| resta spesso sotto Onsager, perché i domini opposti impiegano molto a sparire; partendo da «Tutti su» la simulazione segue la curva esatta.</figcaption>
</figure>"""


LAB = {"gas": lab_gas, "ising": lab_ising}


def dati_mappa(articoli):
    nodi, archi, visti = [], [], set()
    for a in articoli.values():
        nodi.append({"id": a["slug"], "nome": ETICHETTE_MAPPA.get(a["slug"], a["breve"]), "url": f'{a["slug"]}.html',
                     "gruppo": "fonte" if a["slug"] in FONTI else "percorso"})
    esterni = {}
    for a in articoli.values():
        for t in a["link"]:
            s = slug_interno(t)
            if s == a["slug"] or s == "indice_wiki":
                continue
            if s not in articoli:
                wiki = t.split("/")[0] if "/" in t else s
                s = "x:" + wiki
                esterni[s] = wiki.replace("-", " ")
            chiave = tuple(sorted((a["slug"], s)))
            if chiave not in visti:
                visti.add(chiave)
                archi.append(list(chiave))
    nodi += [{"id": k, "nome": v, "gruppo": "mancante"} for k, v in esterni.items()]
    return {"nodi": nodi, "archi": archi}


# ---------------------------------------------------------------- pagine

def costruisci():
    articoli = leggi_articoli()
    descrizioni = leggi_descrizioni()
    formule = Formule()
    sost = wikilink(articoli)

    # citato da
    citato = {s: [] for s in articoli}
    for a in articoli.values():
        for t in a["link"]:
            s = slug_interno(t)
            if s in citato and s != a["slug"]:
                citato[s].append(a["slug"])

    ordine = PERCORSO + FONTI
    pagine = {}
    for slug in ordine:
        a = articoli[slug]
        lede = ritocca(pandoc(re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", sost, a["lede_md"])))
        corpo = ritocca(pandoc(re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", sost, a["corpo_md"])))
        sezioni = re.findall(r'<section id="([^"]+)" class="level2">\s*<h2>(.*?)</h2>', corpo, re.S)
        corpo = re.sub(r'(<section id="([^"]+)" class="level2">\s*)<h2>',
                       lambda m: f'{m.group(1)}{filetto(slug + m.group(2), n=70)}<h2>', corpo)
        if slug in LABORATORI:
            sez, lab = LABORATORI[slug]
            i = corpo.index(f'<section id="{sez}"')
            j = corpo.index("</section>", i)
            corpo = corpo[:j] + LAB[lab]() + corpo[j:]

        indice = "".join(f'<li><a href="#{i}">{esc(testo_semplice(t))}</a></li>'
                         for i, t in sezioni if i not in ("articoli-correlati", "fonti"))
        k = ordine.index(slug)
        if slug in PERCORSO:
            occhiello = f'Percorso · {PERCORSO.index(slug) + 1} di {len(PERCORSO)} · Dispense {PAGINE_DISPENSE[slug]}'
        else:
            occhiello = "Fonti del corso"
        prec = articoli[ordine[k - 1]] if k > 0 else None
        succ = articoli[ordine[k + 1]] if k + 1 < len(ordine) else None
        navigazione = '<nav class="sfoglia" aria-label="Articolo precedente e successivo">'
        navigazione += (f'<a class="prec" href="{prec["slug"]}.html"><span>Precedente</span>{esc(prec["breve"])}</a>'
                        if prec else "<span></span>")
        navigazione += (f'<a class="succ" href="{succ["slug"]}.html"><span>Successivo</span>{esc(succ["breve"])}</a>'
                        if succ else "<span></span>")
        navigazione += "</nav>"
        citanti = "".join(f'<li><a href="{c}.html">{esc(articoli[c]["breve"])}</a></li>' for c in sorted(set(citato[slug])))
        etichette = "".join(f"<span>{esc(t)}</span>" for t in a["tags"][:5])
        film = figura_film(slug, "Film") if slug in FILM else ""

        corpo_pagina = f"""<div class="pagina">
<div class="impaginato">
<aside class="indice-art" aria-label="In questa pagina"><h2>In questa pagina</h2><ol>{indice}</ol></aside>
<article class="articolo">
<header class="testa">
<p class="occhiello">{esc(occhiello)}</p>
<h1>{esc(a["titolo"])}</h1>
{filetto(slug, n=160)}
<div class="lede">{lede}</div>
<p class="etichette">{etichette}</p>
</header>
{film}
<div class="corpo">{corpo}</div>
{navigazione}
</article>
<aside class="margine" aria-label="Collegamenti">
<div class="margine-in">
<h2>Citato da</h2>
<ul>{citanti or "<li>nessun articolo</li>"}</ul>
<h2>Nella mappa</h2>
<p><a href="mappa.html#{slug}">Vedi i collegamenti di questo articolo</a></p>
</div>
</aside>
</div>
</div>"""
        pagine[f"{slug}.html"] = pagina(f'{a["titolo"]} · Meccanica Statistica', formule.segna(corpo_pagina),
                                         None, testo_semplice(lede)[:180])

    # home
    voci = []
    for i, slug in enumerate(PERCORSO, 1):
        a = articoli[slug]
        extra = []
        if slug in FILM:
            extra.append("film")
        if slug in LABORATORI:
            extra.append("laboratorio")
        figure = f'<p class="figs">Con {" e ".join(extra)}</p>' if extra else ""
        voci.append(f"""<li><span class="nr">{i}</span><div>
<a class="ti" href="{slug}.html">{esc(a["breve"])}<span class="pp">Dispense {PAGINE_DISPENSE[slug]}</span></a>
<p>{sost_semplice(descrizioni.get(slug, ""))}</p>{figure}</div></li>""")
    fonti = []
    for lettera, slug in zip("abc", FONTI):
        a = articoli[slug]
        fonti.append(f"""<li><span class="nr fonte">{lettera}</span><div>
<a class="ti" href="{slug}.html">{esc(a["breve"])}</a>
<p>{sost_semplice(descrizioni.get(slug, ""))}</p></div></li>""")
    films = "".join(
        f"""<figure class="film-cella">{video(f)}
<figcaption><b>Film {n}</b><i>{esc(t)}.</i> <a href="{s}.html">{esc(articoli[s]["breve"])}</a></figcaption></figure>"""
        for n, (s, (f, t, _)) in enumerate(FILM.items(), 1))
    mappa = dati_mappa(articoli)
    home = f"""<section class="copertina" data-lab="sciame" aria-labelledby="titolo-home">
<div class="copertina-in">
<p class="occhiello chiaro">Wiki di studio · {len(PERCORSO)} argomenti · {len(FILM)} film · 2 laboratori</p>
<h1 id="titolo-home" class="titolo-home">Meccanica <em>Statistica</em></h1>
<canvas class="sciame" aria-hidden="true"></canvas>
<div class="copertina-piede">
<p class="lede-home">Ogni punto del titolo è una particella. A bassa temperatura le particelle restano nelle lettere; scaldale e diventano un gas. Queste pagine spiegano come da miliardi di particelle escano poche grandezze termodinamiche: dal postulato di uguale probabilità all'insieme canonico, fino ai gas quantistici e al corpo nero.</p>
<div class="termostato">
<label for="temperatura-copertina">Temperatura <output data-v="T">0,08</output></label>
<input id="temperatura-copertina" type="range" min="0" max="2.5" step="0.01" value="0.08">
<span class="stato" data-v="fase">condensate nelle lettere</span>
<span class="suggerimento">Passa il cursore sul titolo per scaldarlo</span>
</div>
</div>
</div>
</section>

<div class="pagina">
<main class="home">
<section id="percorso" aria-labelledby="t-percorso">
<h2 id="t-percorso" class="home-h2">Percorso</h2>
{filetto("percorso", n=110)}
<p class="home-p">Gli argomenti nell'ordine del corso. Accanto a ogni titolo, le pagine delle dispense da cui parte l'articolo.</p>
<ol class="elenco">{"".join(voci)}</ol>
</section>

<section id="fonti-corso" aria-labelledby="t-fonti">
<h2 id="t-fonti" class="home-h2">Fonti del corso</h2>
{filetto("fonti", n=110)}
<p class="home-p">Da dove viene il materiale: le lezioni di quest'anno, il quaderno dell'anno scorso e le dispense con gli esami.</p>
<ol class="elenco">{"".join(fonti)}</ol>
</section>
</main>
</div>

<section id="film" class="banda" aria-labelledby="t-film">
<div class="banda-in">
<h2 id="t-film" class="home-h2">Film</h2>
<p class="home-p">Quattro animazioni in Manim. Ognuna parte da una simulazione numerica e poi sovrappone il risultato esatto, senza sostituirlo ai dati.</p>
<div class="griglia-film">{films}</div>
</div>
</section>

<div class="pagina">
<main class="home">
<section aria-labelledby="t-mappa">
<h2 id="t-mappa" class="home-h2">Mappa dei collegamenti</h2>
{filetto("mappa", n=110)}
<p class="home-p">Ogni nodo è un articolo, ogni arco un collegamento tra articoli. I nodi tratteggiati sono le altre wiki di studio, non ancora pubblicate. Clicca un nodo per aprirlo, oppure apri la <a href="mappa.html">mappa a tutta pagina</a>.</p>
<figure class="lavagna-fig" data-lab="mappa"><canvas class="mappa" aria-label="Grafo dei collegamenti tra gli articoli"></canvas></figure>
</section>

<section id="come-si-legge" aria-labelledby="t-legenda">
<h2 id="t-legenda" class="home-h2">Come si legge</h2>
{filetto("legenda", n=110)}
<div class="legenda">
<div><h3>Le citazioni</h3><p>Ogni passaggio dice da dove viene: <span class="cit">Appunti MS, p. 41</span> è la pagina della trascrizione del quaderno, <span class="cit">Dispense, p. 146</span> quella delle dispense del corso.</p></div>
<div><h3>Quando le fonti divergono</h3><p class="divergenza">Se quaderno, dispense e manuali non sono d'accordo, il paragrafo è evidenziato e riporta entrambe le versioni con la pagina.</p></div>
<div><h3>Collegamenti</h3><p>Un <a class="wl" href="insieme-canonico.html">collegamento blu</a> apre un articolo. Uno <span class="wl stub" title="Non ancora nel sito">punteggiato</span> indica un articolo di un'altra wiki, non ancora pubblicato.</p></div>
<div><h3>I filetti</h3><p>Le righe di punti sotto i titoli non sono decorazione: ogni punto è estratto dalla distribuzione di Boltzmann, densità proporzionale a $e^{{-\\beta E}}$.</p></div>
</div>
</section>
</main>
</div>"""
    pagine["index.html"] = pagina("Meccanica Statistica", formule.segna(pandoc_inline_math(home)), "Home",
                                  "Wiki di studio di meccanica statistica: ensemble, gas reali, Ising, gas quantistici e corpo nero, con film e simulazioni.",
                                  mappa)

    # laboratorio
    lab = f"""<div class="pagina"><main class="home">
<p class="occhiello">Simulazioni nel browser</p>
<h1 class="titolo-pagina">Laboratorio</h1>
{filetto("laboratorio", n=160)}
<p class="home-p">Due esperimenti da manovrare. Prima prevedi che cosa succederà, poi muovi i comandi e controlla. Gli stessi laboratori sono anche dentro gli articoli <a class="wl" href="insieme-canonico.html">Insieme canonico</a> e <a class="wl" href="modello-di-ising-e-campo-medio.html">Modello di Ising e campo medio</a>.</p>
{lab_gas()}
{lab_ising()}
</main></div>"""
    pagine["laboratorio.html"] = pagina("Laboratorio · Meccanica Statistica", formule.segna(lab), "Laboratorio",
                                        "Simulazioni dal vivo: gas di dischi rigidi e modello di Ising 2D.")

    # mappa
    mp = """<div class="pagina"><main class="home">
<p class="occhiello">Navigazione</p>
<h1 class="titolo-pagina">Mappa dei collegamenti</h1>
<p class="home-p">Trascina i nodi, passa sopra un articolo per vederne i vicini, clicca per aprirlo. Il colore va dal blu all'arancio con il numero di collegamenti.</p>
<figure class="lavagna-fig grande" data-lab="mappa"><canvas class="mappa" aria-label="Grafo dei collegamenti tra gli articoli"></canvas></figure>
</main></div>"""
    pagine["mappa.html"] = pagina("Mappa · Meccanica Statistica", mp, "Mappa",
                                  "Grafo dei collegamenti tra gli articoli della wiki.", mappa)

    formule.rendi()
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "video").mkdir(parents=True)
    for nome, contenuto in pagine.items():
        (OUT / nome).write_text(formule.applica(contenuto))
    shutil.copy(TEMA / "style.css", OUT / "style.css")
    shutil.copy(TEMA / "sito.js", OUT / "sito.js")
    for v in VIDEO.iterdir():
        if v.suffix in (".mp4", ".webm", ".jpg"):
            shutil.copy(v, OUT / "video" / v.name)
    (OUT / ".nojekyll").write_text("")
    print(f"_site/: {len(pagine)} pagine, {len(formule.lista)} formule, {len(list(VIDEO.glob('*.mp4')))} video")


def sost_semplice(testo):
    """Descrizioni dell'indice: niente wikilink, solo formule inline."""
    return pandoc_inline_math(esc(testo))


def pandoc_inline_math(frammento):
    """Trasforma $…$ in span KaTeX dentro HTML scritto a mano (senza passare da pandoc)."""
    return re.sub(r"(?<![\\$])\$([^$\n]+?)\$",
                  lambda m: f'<span class="math inline">{m.group(1)}</span>', frammento)


if __name__ == "__main__":
    costruisci()
