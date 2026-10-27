"""Stile e strumenti comuni ai film Manim del sito.

Ogni film è una sottoclasse di `Lezione`. Durante la scena, `self.passo("…")` segna
l'inizio di un passaggio con la sua didascalia: alla fine del rendering i passi
vengono scritti in `sito/galleria/video/<USCITA>.json`. Prima di ogni nuovo passo
(e alla fine) il film resta fermo quanto basta per leggere la didascalia precedente.
"""
import json
import os
import re
from pathlib import Path

import numpy as np
from manim import *

# FILM_USCITA sceglie un'altra cartella di uscita, per esempio per rendere i film in un altro tema senza toccare questi.
VIDEO = Path(os.environ.get("FILM_USCITA", Path(__file__).resolve().parent.parent / "galleria" / "video"))

# Palette: inchiostro blu notte, freddo -> caldo come una scala di temperatura.
# TEMA_FILM=lavagna rende i film con la palette della bozza «Lavagna» del nuovo sito: fondo d'ardesia identico
# a quello della pagina e gessetti con la stessa luminosità, così il film si fonde con il testo intorno.
TAVOLOZZE = {
    "nebbia": dict(FONDO="#0B1020", INCHIOSTRO="#E6E2D6", TENUE="#7D8597", FREDDO="#4C7BD9", CALDO="#E8834A",
                   ORO="#F2C14E", VERDE="#5FBF8F", SPENTO="#1D2747", SERIF="Spectral", MONO="JetBrains Mono"),
    "lavagna": dict(FONDO="#0D1210", INCHIOSTRO="#F2F0EA", TENUE="#8C9590", FREDDO="#83BEF0", CALDO="#ED8F6A",
                    ORO="#F0CD74", VERDE="#8CD59F", SPENTO="#232B28", SERIF="STIX Two Text", MONO="STIX Two Text"),
}
TEMA = os.environ.get("TEMA_FILM", "nebbia")
_t = TAVOLOZZE[TEMA]
FONDO, INCHIOSTRO, TENUE, FREDDO, CALDO = _t["FONDO"], _t["INCHIOSTRO"], _t["TENUE"], _t["FREDDO"], _t["CALDO"]
ORO, VERDE, SPENTO, SERIF, MONO = _t["ORO"], _t["VERDE"], _t["SPENTO"], _t["SERIF"], _t["MONO"]

config.background_color = FONDO
modello = TexTemplate()
modello.add_to_preamble(r"\usepackage{amsmath,amssymb}")
config.tex_template = modello


def titolo(testo, sotto=None):
    t = Text(testo, font=SERIF, font_size=36, color=INCHIOSTRO, weight=MEDIUM).to_corner(UL, buff=0.45)
    if sotto is None:
        return VGroup(t)
    s = Text(sotto, font=SERIF, font_size=21, color=TENUE, slant=ITALIC)
    s.next_to(t, DOWN, aligned_edge=LEFT, buff=0.12)
    return VGroup(t, s)


def etichetta(testo, size=18, color=TENUE):
    """Etichetta di testo; «k_B», «ε_F», «T_c» diventano pedici veri, come nelle didascalie del sito."""
    t = testo.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return MarkupText(re.sub(r"_([A-Za-z0-9])", r"<sub>\1</sub>", t), font=MONO, font_size=size, color=color)


def nota(testo, size=22, color=INCHIOSTRO):
    return Text(testo, font=SERIF, font_size=size, color=color, slant=ITALIC)


def formula(tex, size=36, color=INCHIOSTRO):
    return MathTex(tex, font_size=size, color=color)


def assi(x_range, y_range, x_length=6.0, y_length=4.2, **kw):
    return Axes(x_range=x_range, y_range=y_range, x_length=x_length, y_length=y_length, tips=False,
                axis_config={"color": TENUE, "stroke_width": 2, "include_ticks": True}, **kw)


def tacche(a, valori, asse="x", fmt="{:g}", size=15):
    g = VGroup()
    for v in valori:
        if asse == "x":
            g.add(etichetta(fmt.format(v), size).next_to(a.c2p(v, a.y_range[0]), DOWN, buff=0.12))
        else:
            g.add(etichetta(fmt.format(v), size).next_to(a.c2p(a.x_range[0], v), LEFT, buff=0.12))
    return g


def termico(x):
    """x in [0,1] -> colore da FREDDO a INCHIOSTRO a CALDO."""
    x = float(np.clip(x, 0, 1))
    if x < 0.5:
        return interpolate_color(ManimColor(FREDDO), ManimColor(INCHIOSTRO), x * 2)
    return interpolate_color(ManimColor(INCHIOSTRO), ManimColor(CALDO), (x - 0.5) * 2)


# Ritmo di lettura delle didascalie: 4 parole al secondo, più un secondo abbondante per guardare l'immagine.
LETTURA = 4.0
RESPIRO = 1.2


class Lezione(Scene):
    USCITA = None   # nome del file nel sito
    TITOLO = ""     # titolo mostrato nel lettore

    def setup(self):
        self._passi = []

    def passo(self, testo):
        self._tempo_di_lettura()
        self._passi.append({"t": round(float(self.renderer.time), 3), "testo": testo})

    def _tempo_di_lettura(self):
        """Alla 3Blue1Brown: il film non si ferma mai, ma dopo ogni passo l'immagine resta sullo schermo
        finché la didascalia non si è potuta leggere con calma (LETTURA parole al secondo più un RESPIRO)."""
        if not self._passi:
            return
        p = self._passi[-1]
        serve = len(p["testo"].split()) / LETTURA + RESPIRO
        trascorso = float(self.renderer.time) - p["t"]
        if trascorso < serve:
            self.wait(serve - trascorso)

    def tear_down(self):
        if not self._passi:
            return
        self._tempo_di_lettura()
        VIDEO.mkdir(parents=True, exist_ok=True)
        dati = {"titolo": self.TITOLO, "durata": round(float(self.renderer.time), 3), "passi": self._passi}
        (VIDEO / f"{self.USCITA}.json").write_text(json.dumps(dati, ensure_ascii=False, indent=1))
