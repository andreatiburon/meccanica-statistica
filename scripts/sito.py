#!/usr/bin/env python3
"""Costruisce il sito statico della wiki di meccanica statistica.

Uso:
  python3 scripts/sito.py            # versione pubblica in _site/
  python3 scripts/sito.py --privato  # versione privata in _site_privato/, con le dispense consultabili

Richiede pandoc e node, con KaTeX installato in scripts/ (`npm install --prefix scripts`).
Le formule sono rese già in fase di costruzione: una formula che KaTeX non capisce
ferma la build e viene stampata.

La versione privata aggiunge la pagina «Dispense» (PDF integrale, indice, ricerca nel testo)
e trasforma le citazioni «Dispense, p. N» in link alla pagina N. Non va mai pubblicata
in un posto accessibile ad altri: contiene il PDF delle dispense del corso.
Accanto a index.html scrive anche _artifact.html, la stessa home senza involucro <html>,
da usare come pagina principale di un Artifact di claude.ai.
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
KATEX = RADICE / "scripts" / "node_modules" / "katex" / "dist"
PDF = RADICE / "raw" / "libri" / "fisica" / "Meccanica Statistica - dispense complete.pdf"
TESTO = RADICE / ".testo" / "dispense-ms"

# Ordine del corso e fonti, come in wiki/meccanica-statistica/indice_wiki.md
PERCORSO = [
    "insieme-microcanonico", "insieme-canonico", "insieme-gran-canonico-e-npt",
    "gas-reali-viriale-e-van-der-waals", "modello-di-ising-e-campo-medio",
    "gas-quantistici-ideali", "corpo-nero-e-solidi",
]
FONTI = ["corso-e-lezioni", "appunti-anno-scorso", "dispense-ed-esami"]
PAGINE_DISPENSE = {
    "insieme-microcanonico": "pp. 43–71", "insieme-canonico": "pp. 72–117",
    "insieme-gran-canonico-e-npt": "pp. 118–131", "gas-reali-viriale-e-van-der-waals": "pp. 132–143",
    "modello-di-ising-e-campo-medio": "pp. 143–169", "gas-quantistici-ideali": "pp. 170–206",
    "corpo-nero-e-solidi": "pp. 207–219",
}
# Film (nome di uscita in sito/galleria/video/) in testa all'articolo e dentro le sezioni.
FILM_TESTA = {"modello-di-ising-e-campo-medio": "ising"}
FILM_SEZIONI = {
    "insieme-microcanonico": {"equilibrio-termico": ["micro-scambio-energia"], "gibbs": ["micro-gibbs"],
                              "due-livelli": ["micro-due-livelli"], "probabilita-microscopiche": ["gas-maxwell"]},
    "insieme-canonico": {"serbatoio": ["can-serbatoio"], "maxwell": ["gas-maxwell"],
                         "distribuzione-energia": ["can-picco-energia"]},
    "insieme-gran-canonico-e-npt": {"fluttuazioni": ["gc-fluttuazioni-n"], "npt": ["gc-npt"]},
    "gas-reali-viriale-e-van-der-waals": {"secondo-coefficiente": ["reali-mayer"], "isoterme": ["reali-isoterme"],
                                          "coesistenza": ["reali-maxwell"]},
    "modello-di-ising-e-campo-medio": {"ising-1d": ["ising-1d"], "bragg-williams": ["ising-bragg-williams"]},
    "gas-quantistici-ideali": {"numeri-occupazione": ["qg-occupazioni"], "fermioni-bosoni": ["qg-tre-statistiche"],
                               "fermi-zero": ["qg-mare-fermi"], "condensazione": ["qg-saturazione", "bose-einstein"]},
    "corpo-nero-e-solidi": {"rayleigh-jeans": ["cn-modi"], "predizioni": ["planck"], "debye": ["cn-solidi"]},
}
FILM_IN_HOME = ["gas-maxwell", "ising", "bose-einstein", "planck"]
# Articoli già riscritti come lezioni complete (riassunto chiuso in cima, elementi interattivi).
LEZIONI = {"insieme-microcanonico", "insieme-canonico", "insieme-gran-canonico-e-npt",
           "gas-reali-viriale-e-van-der-waals", "modello-di-ising-e-campo-medio",
           "gas-quantistici-ideali", "corpo-nero-e-solidi"}
LABORATORI = {
    "insieme-canonico": ("maxwell", "gas"),
    "modello-di-ising-e-campo-medio": ("interfacce", "ising"),
}
ETICHETTE_MAPPA = {
    "insieme-microcanonico": "Microcanonico", "insieme-canonico": "Canonico",
    "insieme-gran-canonico-e-npt": "Gran canonico e NPT", "gas-reali-viriale-e-van-der-waals": "Gas reali",
    "modello-di-ising-e-campo-medio": "Ising e campo medio", "gas-quantistici-ideali": "Gas quantistici",
    "corpo-nero-e-solidi": "Corpo nero e solidi", "corso-e-lezioni": "Corso e lezioni",
    "appunti-anno-scorso": "Appunti dell'anno scorso", "dispense-ed-esami": "Dispense ed esami",
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
    out = {}
    for r in (WIKI / "indice_wiki.md").read_text().splitlines():
        m = re.match(r"- \[\[(?:meccanica-statistica/)?([^\]|]+)\]\]: (.+)", r)
        if m:
            out[m.group(1)] = m.group(2)
    return out


def leggi_film():
    film = {}
    for j in sorted(VIDEO.glob("*.json")):
        if (VIDEO / f"{j.stem}.mp4").exists():
            film[j.stem] = json.loads(j.read_text())
    return film


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


def ritocca(frammento, privato):
    # citazioni a quaderno e dispense come etichette; nella versione privata le dispense aprono la pagina
    def una(parte):
        parte = parte.strip()
        n = re.search(r"\d+", parte)
        if privato and parte.startswith("Dispense") and n:
            return f'<a class="cit" href="dispense.html#p{n.group(0)}" title="Apri le dispense a questa pagina">{parte}</a>'
        return f'<span class="cit">{parte}</span>'

    def cit(m):
        return " ".join(una(p) for p in m.group(1).split(";"))
    frammento = re.sub(r"\(((?:Appunti MS|Dispense)[^()<]*)\)", cit, frammento)
    # paragrafi in cui le fonti divergono
    frammento = re.sub(r"<p>((?:(?!</p>).)*?(?:divergono|divergenza)(?:(?!</p>).)*)</p>",
                       r'<p class="divergenza">\1</p>', frammento, flags=re.S)
    frammento = re.sub(r"<table[^>]*>", '<div class="tabella"><table>', frammento).replace("</table>", "</table></div>")
    return frammento


def sostituisci_div(frammento, classe, fn):
    """Sostituisce ogni <div class="classe" …>…</div> (anche con div annidati) con fn(attributi, contenuto)."""
    apertura = re.compile(r'<div class="%s"([^>]*)>' % re.escape(classe))
    tag = re.compile(r"<div\b[^>]*>|</div>")
    while True:
        m = apertura.search(frammento)
        if not m:
            return frammento
        prof, i = 1, m.end()
        while prof:
            t = tag.search(frammento, i)
            prof += 1 if t.group(0).startswith("<div") else -1
            i = t.end()
        attr = dict(re.findall(r'data-([\w-]+)="([^"]*)"', m.group(1)))
        frammento = frammento[:m.start()] + fn(attr, frammento[m.end():t.start()]) + frammento[i:]


def elementi_lezione(frammento):
    """Blocchi della lezione scritti nel markdown come div di pandoc (::: classe) -> elementi interattivi."""
    def estrai(interno, classe):
        trovato = {}

        def prendi(_, x):
            trovato["x"] = x
            return ""
        resto = sostituisci_div(interno, classe, prendi)
        return resto.strip(), trovato.get("x", "")

    def passaggi(attr, interno):
        titolo = esc(attr.get("titolo", "Il conto, passo per passo"))
        return (f'<details class="passaggi"><summary><span class="etichetta-box">Passaggi</span><span class="sommario">{titolo}</span></summary>'
                f'<div class="passaggi-corpo">{interno}</div></details>')

    def domanda(attr, interno):
        testo, risposta = estrai(interno, "risposta")
        testo = re.sub(r"</?p>", " ", testo).strip()
        return (f'<details class="domanda"><summary><span class="etichetta-box">Domanda</span><span class="sommario">{testo}</span></summary>'
                f'<div class="risposta">{risposta}</div></details>')

    def esercizio(attr, interno):
        testo, soluzione = estrai(interno, "soluzione")
        return (f'<aside class="esercizio"><p class="etichetta-box">Esercizio svolto</p>{testo}'
                f'<details class="soluzione"><summary>Mostra la soluzione, passo per passo</summary>'
                f'<div class="soluzione-corpo">{soluzione}</div></details></aside>')

    def laboratorio(attr, interno):
        return LAB_PICCOLI.get(attr.get("tipo"), "")

    for classe, fn in (("passaggi", passaggi), ("domanda", domanda), ("esercizio", esercizio),
                       ("lab-segnaposto", laboratorio)):
        frammento = sostituisci_div(frammento, classe, fn)
    return frammento


LAB_PICCOLI = {"guscio": """<figure class="lab lab-guscio" data-lab="guscio">
<div class="lab-banco">
<canvas class="guscio-grafico" aria-label="Distribuzione del raggio di un punto a caso in una sfera a D dimensioni"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>dimensioni D</span><output data-v="D">3</output></label><input type="range" min="0" max="24" step="0.01" value="0.48" data-c="D" aria-label="Numero di dimensioni, in scala logaritmica"></div>
<div class="cursore"><label><span>spessore del guscio ε</span><output data-v="eps">1 %</output></label><input type="range" min="-12" max="-0.3" step="0.01" value="-2" data-c="eps" aria-label="Spessore relativo del guscio, in scala logaritmica"></div>
<dl class="misure"><dt>volume dentro il guscio</dt><dd data-v="frazione">–</dd><dt>raggio che dimezza il volume</dt><dd data-v="mezzo">–</dd></dl>
<div class="comandi"><button type="button" data-p="0.48">D = 3</button><button type="button" data-p="2">D = 100</button><button type="button" data-p="23.8">D ≈ 3N</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Il volume sta nella buccia.</i> La curva è la probabilità che un punto preso a caso dentro una sfera a D dimensioni stia a distanza r dal centro, proporzionale a r<sup>D−1</sup>; la fascia gialla è il guscio esterno di spessore ε. Sposta D verso il numero di Avogadro e guarda dove finisce tutto il volume.</figcaption>
</figure>""",
"langmuir": """<figure class="lab lab-largo lab-uno" data-lab="langmuir">
<div class="lab-banco">
<canvas aria-label="Frazione di siti occupati in funzione della densità del gas, in scala logaritmica"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>βε (legame / energia termica)</span><output data-v="be">4</output></label><input type="range" min="0" max="12" step="0.1" value="4" data-c="be" aria-label="Energia di legame in unità di k_BT"></div>
<div class="cursore"><label><span>densità del gas ρV<sub>b</sub></span><output data-v="x">–</output></label><input type="range" min="-6" max="2" step="0.01" value="-2" data-c="x" aria-label="Densità del gas, in scala logaritmica"></div>
<dl class="misure"><dt>siti occupati f</dt><dd data-v="f">–</dd><dt>metà copertura a ρV<sub>b</sub> =</dt><dd data-v="mezzo">–</dd><dt>varianza per sito f(1−f)</dt><dd data-v="var">–</dd></dl>
<div class="comandi"><button type="button" data-imposta='{"be": 8}'>legame forte</button><button type="button" data-imposta='{"be": 1}'>legame debole</button><button type="button" data-imposta='{"x": 1.5}'>gas denso</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Riempire una superficie.</i> La curva gialla è l'isoterma di Langmuir f = ρV<sub>b</sub>e<sup>βε</sup>/(1 + ρV<sub>b</sub>e<sup>βε</sup>); quella tratteggiata è il caso senza legame. La linea verticale segna la metà copertura, la fascia arancio la varianza f(1−f) dell'occupazione di un sito. Aumenta βε (legame più forte o temperatura più bassa) e guarda la curva scivolare verso densità sempre più piccole.</figcaption>
</figure>""",
"vdw": """<figure class="lab lab-largo lab-uno" data-lab="vdw">
<div class="lab-banco">
<canvas aria-label="Isoterma ridotta di Van der Waals con la costruzione di Maxwell"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>temperatura ridotta θ = T/T<sub>c</sub></span><output data-v="th">0,9</output></label><input type="range" min="0.6" max="1.2" step="0.002" value="0.9" data-c="th" aria-label="Temperatura ridotta"></div>
<dl class="misure"><dt>pressione di coesistenza π</dt><dd data-v="pc">–</dd><dt>volume del liquido φ</dt><dd data-v="fl">–</dd><dt>volume del vapore φ</dt><dd data-v="fg">–</dd><dt>densità liquido / vapore</dt><dd data-v="r">–</dd></dl>
<div class="comandi"><button type="button" data-imposta='{"th": 0.9}'>θ = 0,9</button><button type="button" data-imposta='{"th": 0.97}'>vicino al punto critico</button><button type="button" data-imposta='{"th": 0.65}'>liquido in tensione</button><button type="button" data-imposta='{"th": 1.1}'>sopra T<sub>c</sub></button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Aree uguali.</i> La curva gialla è l'isoterma ridotta π(φ) di Van der Waals; il segmento arancio è la pressione di coesistenza trovata con la costruzione di Maxwell, e i due lobi colorati hanno la stessa area. I punti grigi sono gli spinodali, la linea tratteggiata grigia è la cupola di coesistenza, quella azzurra l'isoterma critica. Abbassa θ fino a vedere l'isoterma scendere sotto zero: è il liquido in tensione.</figcaption>
</figure>""",
"campo-medio": """<figure class="lab lab-largo" data-lab="campo-medio">
<div class="lab-banco">
<canvas aria-label="Soluzione grafica dell'equazione di campo medio ed energia libera di Bragg-Williams"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>temperatura T/T<sub>c</sub></span><output data-v="t">0,8</output></label><input type="range" min="0.3" max="1.6" step="0.005" value="0.8" data-c="t" aria-label="Temperatura in unità della temperatura critica"></div>
<div class="cursore"><label><span>campo h = H/k<sub>B</sub>T<sub>c</sub></span><output data-v="h">0</output></label><input type="range" min="-0.3" max="0.3" step="0.002" value="0" data-c="h" aria-label="Campo esterno in unità di k_B T_c"></div>
<dl class="misure"><dt>magnetizzazione di equilibrio L̄</dt><dd data-v="L">–</dd><dt>soluzioni dell'equazione</dt><dd data-v="n">–</dd><dt>suscettività k<sub>B</sub>T<sub>c</sub>χ a h = 0</dt><dd data-v="chi">–</dd></dl>
<div class="comandi"><button type="button" data-imposta='{"t": 1.3, "h": 0}'>sopra T<sub>c</sub></button><button type="button" data-imposta='{"t": 0.8, "h": 0}'>sotto T<sub>c</sub></button><button type="button" data-imposta='{"t": 0.8, "h": -0.05}'>campo opposto</button><button type="button" data-imposta='{"t": 1.0, "h": 0}'>T = T<sub>c</sub></button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>La magnetizzazione che si sostiene da sola.</i> Il primo grafico mostra la retta y = L e la curva tanh((T<sub>c</sub>/T)(L + h)): le intersezioni sono le soluzioni dell'equazione di Bragg-Williams, bianche quelle stabili, grigie quelle instabili. Il secondo mostra l'energia libera per sito f(L), con il minimo di equilibrio. Scendi sotto T<sub>c</sub> e guarda la scodella diventare una W; poi accendi un piccolo campo e guarda uno dei due minimi vincere.</figcaption>
</figure>""",
"fermi": """<figure class="lab lab-largo lab-uno" data-lab="fermi">
<div class="lab-banco">
<canvas aria-label="Densità degli stati e stati occupati di un gas di Fermi a temperatura finita"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>temperatura k<sub>B</sub>T/ε<sub>F</sub></span><output data-v="t">0,1</output></label><input type="range" min="0" max="1.2" step="0.002" value="0.1" data-c="t" aria-label="Temperatura in unità dell'energia di Fermi"></div>
<dl class="misure"><dt>μ/ε<sub>F</sub> esatto</dt><dd data-v="mu">–</dd><dt>μ/ε<sub>F</sub> Sommerfeld</dt><dd data-v="muS">–</dd><dt>E/E(0) esatto</dt><dd data-v="E">–</dd><dt>E/E(0) Sommerfeld, 5π²/12</dt><dd data-v="ES">–</dd><dt>E/E(0) con 5π²/8 (dispense)</dt><dd data-v="ED">–</dd></dl>
<div class="comandi"><button type="button" data-imposta='{"t": 0}'>T = 0</button><button type="button" data-imposta='{"t": 0.05}'>metallo caldo</button><button type="button" data-imposta='{"t": 0.15}'>k<sub>B</sub>T = 0,15 ε<sub>F</sub></button><button type="button" data-imposta='{"t": 1}'>verso il classico</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Il mare di Fermi si sfuma.</i> La curva tratteggiata è la densità degli stati g(ε) ∝ √ε, quella gialla l'occupazione n(ε), l'area arancio gli stati effettivamente occupati. Il potenziale chimico μ è calcolato esattamente imponendo che il numero di particelle resti fisso, e l'energia per integrazione numerica. Confronta i numeri esatti con lo sviluppo di Sommerfeld: per k<sub>B</sub>T ≲ 0,15 ε<sub>F</sub> il coefficiente giusto è 5π²/12, non 5π²/8.</figcaption>
</figure>""",
"bose": """<figure class="lab lab-largo" data-lab="bose">
<div class="lab-banco">
<canvas aria-label="Soluzione grafica di g_3/2(z) = ρλ³, frazione condensata e calore specifico del gas di Bose"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>temperatura T/T<sub>c</sub></span><output data-v="t">1,5</output></label><input type="range" min="0.05" max="2.5" step="0.005" value="1.5" data-c="t" aria-label="Temperatura in unità della temperatura critica"></div>
<dl class="misure"><dt>ρλ³</dt><dd data-v="r">–</dd><dt>fugacità z</dt><dd data-v="z">–</dd><dt>βμ</dt><dd data-v="bm">–</dd><dt>frazione condensata N₀/N</dt><dd data-v="f0">–</dd><dt>C<sub>V</sub>/Nk<sub>B</sub></dt><dd data-v="cv">–</dd></dl>
<div class="comandi"><button type="button" data-imposta='{"t": 2}'>gas quasi classico</button><button type="button" data-imposta='{"t": 1}'>T = T<sub>c</sub></button><button type="button" data-imposta='{"t": 0.5}'>condensato</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Il parcheggio pieno.</i> Il primo grafico è la soluzione di g<sub>3/2</sub>(z) = ρλ³: la linea tratteggiata è ρλ³, che sale raffreddando come T<sup>−3/2</sup>. Finché incontra la curva, z &lt; 1 e non c'è condensato; quando supera 2,612 non c'è più soluzione, z si blocca a 1 e il tratto arancio è la parte che finisce nel condensato. Il secondo grafico mostra la frazione condensata (azzurra) e il calore specifico (giallo), con la sua cuspide in T<sub>c</sub>.</figcaption>
</figure>""",
"planck": """<figure class="lab lab-largo lab-uno" data-lab="planck">
<div class="lab-banco">
<canvas aria-label="Spettro di corpo nero di Planck confrontato con Rayleigh-Jeans"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>temperatura</span><output data-v="T">5800 K</output></label><input type="range" min="2.5" max="4.1" step="0.002" value="3.763" data-c="lt" aria-label="Temperatura, in scala logaritmica"></div>
<dl class="misure"><dt>λ<sub>max</sub> (Wien)</dt><dd data-v="lm">–</dd><dt>potenza emessa σT⁴</dt><dd data-v="sig">–</dd><dt>energia nel visibile</dt><dd data-v="vis">–</dd></dl>
<div class="comandi"><button type="button" data-imposta='{"lt": 2.477}'>corpo umano</button><button type="button" data-imposta='{"lt": 3.447}'>lampadina</button><button type="button" data-imposta='{"lt": 3.763}'>Sole</button><button type="button" data-imposta='{"lt": 4.0}'>stella blu</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Il biglietto d'ingresso.</i> La curva gialla è lo spettro di Planck in lunghezza d'onda, normalizzato al suo massimo; quella tratteggiata è la previsione classica di Rayleigh-Jeans, che esplode verso le lunghezze d'onda corte. La fascia colorata è il visibile. Scalda il corpo e guarda il massimo spostarsi secondo la legge di Wien, mentre la potenza emessa cresce come T⁴.</figcaption>
</figure>""",
"solidi": """<figure class="lab lab-largo" data-lab="solidi">
<div class="lab-banco">
<canvas aria-label="Calore specifico dei solidi secondo Dulong-Petit, Einstein e Debye, in scala lineare e logaritmica"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>temperatura T/θ</span><output data-v="t">0,1</output></label><input type="range" min="0.01" max="1.5" step="0.001" value="0.1" data-c="t" aria-label="Temperatura in unità della temperatura caratteristica"></div>
<dl class="misure"><dt>Einstein C<sub>V</sub>/3Nk<sub>B</sub></dt><dd data-v="e">–</dd><dt>Debye C<sub>V</sub>/3Nk<sub>B</sub></dt><dd data-v="d">–</dd><dt>Debye / Einstein</dt><dd data-v="r">–</dd></dl>
<div class="comandi"><button type="button" data-imposta='{"t": 1}'>T = θ</button><button type="button" data-imposta='{"t": 0.1}'>T = θ/10</button><button type="button" data-imposta='{"t": 0.03}'>molto freddo</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Perché i solidi freddi non assorbono calore.</i> Nel primo grafico il calore specifico di Einstein (azzurro) e di Debye (giallo), con la stessa temperatura caratteristica θ, contro il valore classico di Dulong-Petit. Nel secondo, in scala logaritmica, si vede la differenza vera: Einstein crolla esponenzialmente, Debye scende come T³ (la retta arancio tratteggiata). Le onde sonore lunghe restano attive a qualunque temperatura.</figcaption>
</figure>""",
"langevin": """<figure class="lab lab-largo" data-lab="langevin">
<div class="lab-banco">
<canvas aria-label="Funzione di Langevin con la retta di Curie, e distribuzione di cos θ"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>α = βμE (campo / temperatura)</span><output data-v="a">1</output></label><input type="range" min="0" max="15" step="0.01" value="1" data-c="a" aria-label="Rapporto tra energia del dipolo nel campo e energia termica"></div>
<dl class="misure"><dt>⟨cos θ⟩ = 𝓛(α)</dt><dd data-v="L">–</dd><dt>legge di Curie α/3</dt><dd data-v="curie">–</dd><dt>errore di Curie</dt><dd data-v="err">–</dd></dl>
<div class="comandi"><button type="button" data-imposta='{"a": 0.3}'>campo debole</button><button type="button" data-imposta='{"a": 3}'>α = 3</button><button type="button" data-imposta='{"a": 15}'>saturazione</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Il campo ordina, la temperatura disordina.</i> Un grafico mostra la probabilità dell'orientazione, proporzionale a e<sup>α cos θ</sup>: per α piccolo è quasi piatta, per α grande si schiaccia verso cos θ = 1. L'altro mostra la media ⟨cos θ⟩, la funzione di Langevin, con la retta tratteggiata della legge di Curie. Guarda fin dove la retta resta una buona approssimazione.</figcaption>
</figure>"""}

CASSETTO = """<aside class="cassetto" hidden aria-label="Pagina originale delle dispense">
<div class="cassetto-testa"><span class="cassetto-titolo">Dispense · p. <b data-c="pag">–</b></span>
<button type="button" data-c="prec" aria-label="Pagina precedente">‹</button><button type="button" data-c="succ" aria-label="Pagina successiva">›</button>
<a data-c="apri" href="dispense.html">Apri nelle dispense</a><button type="button" data-c="chiudi" aria-label="Chiudi">Chiudi</button></div>
<div class="cassetto-tela"><canvas></canvas><p class="cassetto-stato">Caricamento…</p></div>
</aside>"""


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


def didascalia(testo):
    """Didascalie dei film: apici e pedici scritti come e^{−βE} o k_BT diventano <sup> e <sub>."""
    t = esc(testo)
    t = re.sub(r"\^\{([^{}]*)\}", r"<sup>\1</sup>", t)
    t = re.sub(r"\^([A-Za-z0-9])", r"<sup>\1</sup>", t)
    t = re.sub(r"_(max|min)", r"<sub>\1</sub>", t)
    t = re.sub(r"_([A-Za-z0-9])", r"<sub>\1</sub>", t)
    return t


def inline_math(frammento):
    """$…$ in HTML scritto a mano -> span che il passo delle formule rende con KaTeX."""
    return re.sub(r"(?<![\\$])\$([^$\n]+?)\$", lambda m: f'<span class="math inline">{m.group(1)}</span>', frammento)


# ---------------------------------------------------------------- pezzi di pagina

FONT = ("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500"
        "&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap")
PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174"
ICONA = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' "
         "height='32' rx='6' fill='%23141C36'/%3E%3Cg fill='%23EC8C55'%3E%3Ccircle cx='8' cy='22' r='3'/%3E%3Ccircle "
         "cx='15' cy='12' r='2.4'/%3E%3C/g%3E%3Cg fill='%23CFDAF2'%3E%3Ccircle cx='23' cy='20' r='2'/%3E%3Ccircle "
         "cx='22' cy='9' r='1.6'/%3E%3Ccircle cx='12' cy='26' r='1.4'/%3E%3C/g%3E%3C/svg%3E")


class Sito:
    def __init__(self, privato):
        self.privato = privato
        self.out = RADICE / ("_site_privato" if privato else "_site")
        self.articoli = leggi_articoli()
        self.descrizioni = leggi_descrizioni()
        self.film = leggi_film()
        self.formule = Formule()
        self.sost = wikilink(self.articoli)
        self.pagine = {}
        self.dove_film = {}  # film -> (articolo, sezione)

    # ---- involucro comune
    def nav(self, attiva):
        voci = [("index.html", "Home"), ("index.html#percorso", "Percorso"), ("cineteca.html", "Cineteca"),
                ("laboratorio.html", "Laboratorio"), ("mappa.html", "Mappa")]
        if self.privato:
            voci.append(("dispense.html", "Dispense"))
        return "".join(f'<a href="{h}"{" aria-current=page" if t == attiva else ""}>{t}</a>' for h, t in voci)

    def pagina(self, titolo, corpo, attiva, descrizione, dati=None, extra_testa=""):
        dati_js = (f'<script type="application/json" id="dati-mappa">{json.dumps(dati, ensure_ascii=False)}</script>'
                   if dati else "")
        privato = '<meta name="robots" content="noindex, nofollow">' if self.privato else ""
        return f"""<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(titolo)}</title>
<meta name="description" content="{esc(descrizione)}">
{privato}
<link rel="icon" href="{ICONA}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONT}">
<link rel="stylesheet" href="katex/katex.min.css">
<link rel="stylesheet" href="style.css">
{extra_testa}
<script src="sito.js" defer></script>
</head>
<body>
<header class="barra"><div class="barra-in">
<a class="marchio" href="index.html">Meccanica <span>Statistica</span></a>
<nav class="nav" aria-label="Sezioni">{self.nav(attiva)}</nav>
</div></header>
{corpo}
<footer class="piede"><div class="piede-in">
<p>Wiki di studio costruita dagli appunti e dalle dispense del corso. Formule in KaTeX, film in Manim, simulazioni nel browser.</p>
<p><a href="index.html#come-si-legge">Come si legge</a> · <a href="cineteca.html">Cineteca</a> · <a href="mappa.html">Mappa</a> · <a href="laboratorio.html">Laboratorio</a></p>
</div></footer>
{dati_js}
</body>
</html>
"""

    # ---- film con lettore passo per passo
    def film_html(self, nome, etichetta="Film"):
        d = self.film.get(nome)
        if not d:
            print(f"attenzione: manca il film {nome}", file=sys.stderr)
            return ""
        durate = [(d["passi"][i + 1]["t"] if i + 1 < len(d["passi"]) else d["durata"]) - p["t"]
                  for i, p in enumerate(d["passi"])]
        barra = "".join(f'<li style="flex:{max(dur, 0.5):.2f}"><button type="button" data-i="{i}" '
                        f'aria-label="Vai al passo {i + 1}"><span class="riemp"></span></button></li>'
                        for i, dur in enumerate(durate))
        sorgenti = f'<source src="video/{nome}.mp4" type="video/mp4">'
        passi = [{"t": p["t"], "html": didascalia(p["testo"])} for p in d["passi"]]
        dati = esc(json.dumps({"durata": d["durata"], "passi": passi}, ensure_ascii=False))
        return f"""<figure class="film" data-film="{dati}" id="film-{nome}">
<div class="film-schermo">
<video poster="video/{nome}.jpg" preload="none" playsinline muted>{sorgenti}</video>
<button class="film-avvia" type="button"><span class="film-avvia-icona" aria-hidden="true"></span>Guarda passo per passo</button>
</div>
<figcaption class="film-banco">
<div class="film-testa"><span class="film-etichetta">{etichetta}</span><span class="film-titolo">{esc(d["titolo"])}</span><span class="film-conta" data-conta>1 / {len(d["passi"])}</span></div>
<ol class="film-barra">{barra}</ol>
<p class="film-testo" aria-live="polite">{passi[0]["html"]}</p>
<div class="film-comandi">
<button type="button" data-a="prec">Indietro</button>
<button type="button" data-a="rivedi">Rivedi il passo</button>
<button type="button" data-a="avanti" class="primario">Inizia</button>
<label class="film-modo"><input type="checkbox" data-a="tutto"> tutto di seguito</label>
<button type="button" data-a="schermo" class="film-schermo-intero" aria-label="Schermo intero">Schermo intero</button>
</div>
</figcaption>
</figure>"""

    # ---- laboratori
    @staticmethod
    def lab_gas():
        return """<figure class="lab" data-lab="gas">
<div class="lab-banco">
<canvas class="lab-gas" aria-label="Gas di dischi rigidi colorati per velocità"></canvas>
<div class="lab-letture">
<canvas class="lab-ist" aria-label="Istogramma delle velocità con la curva di Maxwell-Boltzmann"></canvas>
<dl class="misure"><dt>k<sub>B</sub>T = ⟨v²⟩/2</dt><dd data-v="T">–</dd><dt>urti al secondo</dt><dd data-v="urti">–</dd><dt>scarto dalla curva</dt><dd data-v="scarto">–</dd></dl>
<div class="comandi"><button type="button" data-c="uguali">Velocità tutte uguali</button><button type="button" data-c="caldo">Riscalda</button><button type="button" data-c="freddo">Raffredda</button><button type="button" data-c="pausa">Pausa</button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Un gas che si termalizza.</i> 300 dischi rigidi con urti elastici. Premi «Velocità tutte uguali» e guarda l'istogramma passare da un picco alla curva di Maxwell-Boltzmann; clicca nella scatola per scaldare un punto.</figcaption>
</figure>"""

    @staticmethod
    def lab_ising():
        return """<figure class="lab" data-lab="ising">
<div class="lab-banco">
<canvas class="lab-ising" width="128" height="128" aria-label="Reticolo di Ising: arancio spin su, blu spin giù"></canvas>
<div class="lab-letture">
<div class="cursore"><label><span>temperatura T (J/k<sub>B</sub>)</span><output data-v="Tval">2,27</output></label><input type="range" min="1" max="4" step="0.01" value="2.27" aria-label="Temperatura"></div>
<span class="fase" data-v="fase" data-fase="critica">vicino al punto critico</span>
<dl class="misure"><dt>|m| simulata</dt><dd data-v="m">–</dd><dt>|m| di Onsager</dt><dd data-v="onsager">–</dd><dt>energia per spin</dt><dd data-v="e">–</dd><dt>passi Monte Carlo</dt><dd data-v="passi">–</dd></dl>
<div class="comandi"><button type="button" data-c="caos">Spin casuali</button><button type="button" data-c="su">Tutti su</button><button type="button" data-c="tc">Vai a T<sub>c</sub></button></div>
</div></div>
<figcaption><b>Laboratorio</b><i>Ising con il termostato in mano.</i> 128 × 128 spin, algoritmo di Metropolis. Sotto T<sub>c</sub> crescono i domini; sopra, il reticolo torna rumore. Partendo da «Tutti su» la simulazione segue la curva esatta di Onsager.</figcaption>
</figure>"""

    def dati_mappa(self):
        nodi, archi, visti, esterni = [], [], set(), {}
        for a in self.articoli.values():
            nodi.append({"id": a["slug"], "nome": ETICHETTE_MAPPA.get(a["slug"], a["breve"]), "url": f'{a["slug"]}.html',
                         "gruppo": "fonte" if a["slug"] in FONTI else "percorso"})
        for a in self.articoli.values():
            for t in a["link"]:
                s = slug_interno(t)
                if s == a["slug"] or s == "indice_wiki":
                    continue
                if s not in self.articoli:
                    wiki = t.split("/")[0] if "/" in t else s
                    s = "x:" + wiki
                    esterni[s] = wiki.replace("-", " ")
                chiave = tuple(sorted((a["slug"], s)))
                if chiave not in visti:
                    visti.add(chiave)
                    archi.append(list(chiave))
        nodi += [{"id": k, "nome": v, "gruppo": "mancante"} for k, v in esterni.items()]
        return {"nodi": nodi, "archi": archi}

    # ---- articoli
    def articolo(self, slug, ordine):
        a = self.articoli[slug]
        md = lambda t: re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", self.sost, t)
        lede = ritocca(pandoc(md(a["lede_md"])), self.privato)
        corpo = elementi_lezione(ritocca(pandoc(md(a["corpo_md"])), self.privato))
        if slug in LEZIONI:
            corpo = re.sub(r'(<section id="punti-chiave" class="level2">\s*<h2>Punti chiave</h2>\s*)(<ul>.*?</ul>)',
                           r'\1<details class="ripasso"><summary>Ripasso in un minuto: apri i punti chiave</summary>\2</details>',
                           corpo, count=1, flags=re.S)
        sezioni = re.findall(r'<section id="([^"]+)" class="level2">\s*<h2>(.*?)</h2>', corpo, re.S)
        ids = {i for i, _ in sezioni}
        for sez, nomi in FILM_SEZIONI.get(slug, {}).items():
            if sez not in ids:
                print(f"attenzione: in {slug} manca la sezione {sez}", file=sys.stderr)
                continue
            for n in nomi:
                self.dove_film[n] = (slug, sez)
            i = corpo.index(f'<section id="{sez}"')
            j = corpo.index("</section>", i)
            corpo = corpo[:j] + "".join(self.film_html(n) for n in nomi) + corpo[j:]
        if slug in LABORATORI:
            sez, lab = LABORATORI[slug]
            i = corpo.index(f'<section id="{sez}"')
            j = corpo.index("</section>", i)
            corpo = corpo[:j] + (self.lab_gas() if lab == "gas" else self.lab_ising()) + corpo[j:]
        corpo = re.sub(r'(<section id="([^"]+)" class="level2">\s*)<h2>',
                       lambda m: f'{m.group(1)}{filetto(slug + m.group(2), n=70)}<h2>', corpo)
        n_film = sum(len(v) for v in FILM_SEZIONI.get(slug, {}).values()) + (1 if slug in FILM_TESTA else 0)
        voci = []
        for i, t in sezioni:
            if i in ("articoli-correlati", "fonti"):
                continue
            segno = '<span class="ha-film" title="Contiene un film">▸</span>' if i in FILM_SEZIONI.get(slug, {}) else ""
            voci.append(f'<li><a href="#{i}">{esc(testo_semplice(t))}{segno}</a></li>')
        k = ordine.index(slug)
        if slug in PERCORSO:
            occhiello = f'Percorso · {PERCORSO.index(slug) + 1} di {len(PERCORSO)} · Dispense {PAGINE_DISPENSE[slug]}'
        else:
            occhiello = "Fonti del corso"
        prec = self.articoli[ordine[k - 1]] if k > 0 else None
        succ = self.articoli[ordine[k + 1]] if k + 1 < len(ordine) else None
        sfoglia = '<nav class="sfoglia" aria-label="Articolo precedente e successivo">'
        sfoglia += (f'<a class="prec" href="{prec["slug"]}.html"><span>Precedente</span>{esc(prec["breve"])}</a>'
                    if prec else "<span></span>")
        sfoglia += (f'<a class="succ" href="{succ["slug"]}.html"><span>Successivo</span>{esc(succ["breve"])}</a>'
                    if succ else "<span></span>")
        sfoglia += "</nav>"
        citanti = sorted({s for s, x in self.articoli.items() if s != slug and any(slug_interno(t) == slug for t in x["link"])})
        citati = "".join(f'<li><a href="{c}.html">{esc(self.articoli[c]["breve"])}</a></li>' for c in citanti)
        etichette = "".join(f"<span>{esc(t)}</span>" for t in a["tags"][:5])
        testa = self.film_html(FILM_TESTA[slug], "Film d'apertura") if slug in FILM_TESTA else ""
        conteggio = f'<p class="conteggio">{n_film} film in questa pagina</p>' if n_film else ""
        corpo_pagina = f"""<div class="pagina">
<div class="impaginato">
<aside class="indice-art" aria-label="In questa pagina"><h2>In questa pagina</h2><ol>{"".join(voci)}</ol>{conteggio}</aside>
<article class="articolo">
<header class="testa">
<p class="occhiello">{esc(occhiello)}</p>
<h1>{esc(a["titolo"])}</h1>
{filetto(slug, n=160)}
<div class="lede">{lede}</div>
<p class="etichette">{etichette}</p>
</header>
{testa}
<div class="corpo">{corpo}</div>
{sfoglia}
</article>
<aside class="margine" aria-label="Collegamenti">
<div class="margine-in">
<h2>Citato da</h2>
<ul>{citati or "<li>nessun articolo</li>"}</ul>
<h2>Nella mappa</h2>
<p><a href="mappa.html#{slug}">I collegamenti di questo articolo</a></p>
</div>
</aside>
</div>
</div>"""
        testa_extra = ""
        if self.privato:
            corpo_pagina += CASSETTO
            testa_extra = f'<script src="{PDFJS}/pdf.min.js"></script><script src="{PDFJS}/pdf.worker.min.js"></script>'
        self.pagine[f"{slug}.html"] = self.pagina(f'{a["titolo"]} · Meccanica Statistica', self.formule.segna(corpo_pagina),
                                                  None, testo_semplice(lede)[:180], extra_testa=testa_extra)

    # ---- home
    def home(self):
        voci = []
        for i, slug in enumerate(PERCORSO, 1):
            a = self.articoli[slug]
            nf = sum(len(v) for v in FILM_SEZIONI.get(slug, {}).values()) + (1 if slug in FILM_TESTA else 0)
            extra = (["lezione completa"] if slug in LEZIONI else []) + ([f"{nf} film"] if nf else [])
            if slug in LABORATORI:
                extra.append("laboratorio")
            figure = f'<p class="figs">{" · ".join(extra)}</p>' if extra else ""
            voci.append(f"""<li><span class="nr">{i}</span><div>
<a class="ti" href="{slug}.html">{esc(a["breve"])}<span class="pp">Dispense {PAGINE_DISPENSE[slug]}</span></a>
<p>{inline_math(esc(self.descrizioni.get(slug, "")))}</p>{figure}</div></li>""")
        fonti = []
        for lettera, slug in zip("abc", FONTI):
            a = self.articoli[slug]
            fonti.append(f"""<li><span class="nr fonte">{lettera}</span><div>
<a class="ti" href="{slug}.html">{esc(a["breve"])}</a>
<p>{inline_math(esc(self.descrizioni.get(slug, "")))}</p></div></li>""")
        films = "".join(self.film_html(n) for n in FILM_IN_HOME)
        n_film = len(self.film)
        dispense = ("""<section aria-labelledby="t-disp"><h2 id="t-disp" class="home-h2">Dispense integrali</h2>
<p class="home-p">Questa è la versione privata del sito: le dispense del corso sono consultabili pagina per pagina, con indice e ricerca nel testo, e ogni citazione «Dispense, p. N» negli articoli apre la pagina giusta. <a href="dispense.html">Apri le dispense</a>.</p></section>"""
                    if self.privato else "")
        corpo = f"""<section class="copertina" data-lab="sciame" aria-labelledby="titolo-home">
<div class="copertina-in">
<p class="occhiello">Wiki di studio · {len(PERCORSO)} argomenti · {n_film} film · 2 laboratori</p>
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
<p class="home-p">Gli argomenti nell'ordine del corso. Accanto a ogni titolo, le pagine delle dispense da cui parte l'articolo; sotto, quanti film e laboratori contiene.</p>
<ol class="elenco">{"".join(voci)}</ol>
</section>

<section id="film" aria-labelledby="t-film">
<h2 id="t-film" class="home-h2">Film interattivi</h2>
{filetto("film", n=110)}
<p class="home-p">Ogni film si ferma alla fine di un passaggio e spiega che cosa è appena successo: vai avanti quando sei pronto, torna indietro o salta a un passo con la barra. Sono {n_film} in tutto, dentro gli articoli e nella <a href="cineteca.html">cineteca</a>.</p>
<div class="griglia-film">{films}</div>
</section>

<section id="fonti-corso" aria-labelledby="t-fonti">
<h2 id="t-fonti" class="home-h2">Fonti del corso</h2>
{filetto("fonti", n=110)}
<p class="home-p">Da dove viene il materiale: le lezioni di quest'anno, il quaderno dell'anno scorso e le dispense con gli esami.</p>
<ol class="elenco">{"".join(fonti)}</ol>
</section>
{dispense}
<section aria-labelledby="t-mappa">
<h2 id="t-mappa" class="home-h2">Mappa dei collegamenti</h2>
{filetto("mappa", n=110)}
<p class="home-p">Ogni nodo è un articolo, ogni arco un collegamento tra articoli. I nodi tratteggiati sono altre wiki di studio, non ancora pubblicate. Clicca un nodo per aprirlo.</p>
<figure class="lastra" data-lab="mappa"><canvas class="mappa" aria-label="Grafo dei collegamenti tra gli articoli"></canvas></figure>
</section>

<section id="come-si-legge" aria-labelledby="t-legenda">
<h2 id="t-legenda" class="home-h2">Come si legge</h2>
{filetto("legenda", n=110)}
<div class="legenda">
<div><h3>Le citazioni</h3><p>Ogni passaggio dice da dove viene: <span class="cit">Appunti MS, p. 41</span> è la pagina della trascrizione del quaderno, <span class="cit">Dispense, p. 146</span> quella delle dispense del corso.</p></div>
<div><h3>Quando le fonti divergono</h3><p class="divergenza">Se quaderno, dispense e manuali non sono d'accordo, il paragrafo è evidenziato e riporta entrambe le versioni con la pagina.</p></div>
<div><h3>Collegamenti</h3><p>Un <a class="wl" href="insieme-canonico.html">collegamento</a> apre un articolo. Uno <span class="wl stub" title="Non ancora nel sito">punteggiato</span> indica un articolo di un'altra wiki, non ancora pubblicato.</p></div>
<div><h3>I filetti</h3><p>Le righe di punti sotto i titoli sono campioni veri della distribuzione di Boltzmann: densità proporzionale a $e^{{-\\beta E}}$.</p></div>
</div>
</section>
</main>
</div>"""
        self.pagine["index.html"] = self.pagina(
            "Meccanica Statistica privata" if self.privato else "Meccanica Statistica",
            self.formule.segna(inline_math(corpo)), "Home",
            "Wiki di studio di meccanica statistica: ensemble, gas reali, Ising, gas quantistici e corpo nero, con film interattivi e simulazioni.",
            self.dati_mappa())

    # ---- cineteca
    def cineteca(self):
        blocchi = []
        for slug in PERCORSO:
            a = self.articoli[slug]
            nomi = ([FILM_TESTA[slug]] if slug in FILM_TESTA else []) + [n for v in FILM_SEZIONI.get(slug, {}).values() for n in v]
            schede = []
            for n in nomi:
                d = self.film.get(n)
                if not d:
                    continue
                sez = self.dove_film.get(n, (slug, None))[1]
                href = f"{slug}.html#film-{n}" if sez or n in FILM_TESTA.values() else f"{slug}.html"
                durata = f'{int(d["durata"] // 60)}:{int(d["durata"] % 60):02d}'
                schede.append(f"""<a class="scheda-film" href="{href}">
<img src="video/{n}.jpg" alt="" loading="lazy" width="640" height="360">
<span class="scheda-info"><b>{esc(d["titolo"])}</b><span>{len(d["passi"])} passi · {durata}</span></span></a>""")
            blocchi.append(f"""<section class="cineteca-gruppo"><h2><a href="{slug}.html">{esc(a["breve"])}</a></h2>
<div class="griglia-schede">{"".join(schede)}</div></section>""")
        corpo = f"""<div class="pagina"><main class="home">
<header class="testa-pagina"><p class="occhiello">Film interattivi</p>
<h1 class="titolo-pagina">Cineteca</h1>
{filetto("cineteca", n=160)}
<p class="home-p">Tutti i {len(self.film)} film, nell'ordine del corso. Ognuno si apre nel punto dell'articolo in cui serve, con il lettore passo per passo.</p></header>
{"".join(blocchi)}
</main></div>"""
        self.pagine["cineteca.html"] = self.pagina("Cineteca · Meccanica Statistica", corpo, "Cineteca",
                                                   "Tutti i film interattivi della wiki di meccanica statistica.")

    # ---- laboratorio e mappa
    def laboratorio(self):
        corpo = f"""<div class="pagina"><main class="home">
<header class="testa-pagina"><p class="occhiello">Simulazioni nel browser</p>
<h1 class="titolo-pagina">Laboratorio</h1>
{filetto("laboratorio", n=160)}
<p class="home-p">Due esperimenti da manovrare. Prima prevedi che cosa succederà, poi muovi i comandi e controlla. Gli stessi laboratori sono anche dentro gli articoli <a class="wl" href="insieme-canonico.html">Insieme canonico</a> e <a class="wl" href="modello-di-ising-e-campo-medio.html">Modello di Ising e campo medio</a>.</p></header>
{self.lab_gas()}
{self.lab_ising()}
</main></div>"""
        self.pagine["laboratorio.html"] = self.pagina("Laboratorio · Meccanica Statistica", corpo, "Laboratorio",
                                                      "Simulazioni dal vivo: gas di dischi rigidi e modello di Ising 2D.")

    def mappa(self):
        corpo = """<div class="pagina"><main class="home">
<header class="testa-pagina"><p class="occhiello">Navigazione</p>
<h1 class="titolo-pagina">Mappa dei collegamenti</h1>
<p class="home-p">Trascina i nodi, passa sopra un articolo per vederne i vicini, clicca per aprirlo. Il colore va dal blu all'arancio con il numero di collegamenti.</p></header>
<figure class="lastra grande" data-lab="mappa"><canvas class="mappa" aria-label="Grafo dei collegamenti tra gli articoli"></canvas></figure>
</main></div>"""
        self.pagine["mappa.html"] = self.pagina("Mappa · Meccanica Statistica", corpo, "Mappa",
                                                "Grafo dei collegamenti tra gli articoli della wiki.", self.dati_mappa())

    # ---- dispense (solo versione privata)
    def dispense(self):
        voci = []
        indice = (TESTO / "_indice.md").read_text().splitlines()
        for r in indice:
            m = re.match(r"^(\s*)- (.+) — p\. (\d+)$", r)
            if m:
                liv = len(m.group(1)) // 2
                voci.append(f'<li class="liv{liv}"><a href="#p{m.group(3)}"><span>{esc(m.group(2))}</span><b>{m.group(3)}</b></a></li>')
        corpo = f"""<div class="pagina"><main class="lettore" data-lab="dispense" data-pdf="dispense/dispense.pdf" data-testo="dispense/testo.json">
<aside class="lettore-indice">
<p class="occhiello">Versione privata</p>
<h1 class="titolo-pagina piccolo">Dispense</h1>
<form class="cerca" role="search"><label for="cerca-testo">Cerca nel testo</label><input id="cerca-testo" type="search" placeholder="es. Sommerfeld, Bragg, viriale" autocomplete="off"></form>
<ol class="risultati" aria-live="polite"></ol>
<h2>Indice</h2>
<ol class="toc-dispense">{"".join(voci)}</ol>
</aside>
<section class="lettore-pagina" aria-label="Pagina delle dispense">
<div class="lettore-comandi">
<button type="button" data-c="prec" aria-label="Pagina precedente">‹</button>
<label>pagina <input type="number" min="1" value="1" data-c="numero" aria-label="Numero di pagina"> di <span data-c="totale">–</span></label>
<button type="button" data-c="succ" aria-label="Pagina successiva">›</button>
<button type="button" data-c="zoom-meno" aria-label="Riduci">−</button>
<button type="button" data-c="zoom-piu" aria-label="Ingrandisci">+</button>
</div>
<div class="lettore-tela"><canvas aria-label="Pagina delle dispense"></canvas><p class="lettore-stato">Caricamento delle dispense…</p></div>
</section>
</main></div>"""
        testa = f'<script src="{PDFJS}/pdf.min.js"></script><script src="{PDFJS}/pdf.worker.min.js"></script>'
        self.pagine["dispense.html"] = self.pagina("Dispense · Meccanica Statistica", corpo, "Dispense",
                                                   "Le dispense del corso, consultabili pagina per pagina.", extra_testa=testa)

    # ---- scrittura
    def costruisci(self):
        ordine = PERCORSO + FONTI
        for slug in ordine:
            self.articolo(slug, ordine)
        self.home()
        self.cineteca()
        self.laboratorio()
        self.mappa()
        if self.privato:
            self.dispense()
        self.formule.rendi()
        if self.out.exists():
            shutil.rmtree(self.out)
        (self.out / "video").mkdir(parents=True)
        for nome, contenuto in self.pagine.items():
            (self.out / nome).write_text(self.formule.applica(contenuto))
        # home per l'Artifact: senza involucro <html>, che claude.ai aggiunge da sé
        home = (self.out / "index.html").read_text()
        art = re.sub(r"<!doctype html>\s*<html[^>]*>\s*<head>\s*<meta charset=\"utf-8\">\s*<meta name=\"viewport\"[^>]*>", "", home)
        art = re.sub(r"</head>\s*<body>|</body>\s*</html>\s*$", "", art)
        (self.out / "_artifact.html").write_text(art)
        shutil.copy(TEMA / "style.css", self.out / "style.css")
        shutil.copy(TEMA / "sito.js", self.out / "sito.js")
        (self.out / "katex" / "fonts").mkdir(parents=True)
        shutil.copy(KATEX / "katex.min.css", self.out / "katex" / "katex.min.css")
        for f in (KATEX / "fonts").glob("*.woff2"):
            shutil.copy(f, self.out / "katex" / "fonts" / f.name)
        for n in self.film:
            for est in (".mp4", ".jpg"):
                if (VIDEO / f"{n}{est}").exists():
                    shutil.copy(VIDEO / f"{n}{est}", self.out / "video" / f"{n}{est}")
        if self.privato:
            (self.out / "dispense").mkdir()
            shutil.copy(PDF, self.out / "dispense" / "dispense.pdf")
            pagine = sorted(TESTO.glob("p*.txt"), key=lambda p: int(p.stem[1:]))
            testo = [re.sub(r"[ \t]+", " ", p.read_text()).strip() for p in pagine]
            (self.out / "dispense" / "testo.json").write_text(json.dumps(testo, ensure_ascii=False))
        (self.out / ".nojekyll").write_text("")
        print(f"{self.out.name}/: {len(self.pagine)} pagine, {len(self.formule.lista)} formule, {len(self.film)} film")


if __name__ == "__main__":
    Sito(privato="--privato" in sys.argv).costruisci()
