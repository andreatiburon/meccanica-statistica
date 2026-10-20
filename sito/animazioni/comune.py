"""Stile e strumenti comuni ai film Manim del sito.

Ogni film è una sottoclasse di `Lezione`. Durante la scena, `self.passo("…")` segna
l'inizio di un passaggio con la sua didascalia: alla fine del rendering i passi
vengono scritti in `sito/galleria/video/<USCITA>.json`, e il lettore del sito
ferma il video alla fine di ogni passo.
"""
import json
from pathlib import Path

import numpy as np
from manim import *

VIDEO = Path(__file__).resolve().parent.parent / "galleria" / "video"

# Palette: inchiostro blu notte, freddo -> caldo come una scala di temperatura.
FONDO = "#0B1020"
INCHIOSTRO = "#E6E2D6"
TENUE = "#7D8597"
FREDDO = "#4C7BD9"
CALDO = "#E8834A"
ORO = "#F2C14E"
VERDE = "#5FBF8F"
SERIF = "Spectral"
MONO = "JetBrains Mono"

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
    return Text(testo, font=MONO, font_size=size, color=color)


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


class Lezione(Scene):
    USCITA = None   # nome del file nel sito
    TITOLO = ""     # titolo mostrato nel lettore

    def setup(self):
        self._passi = []

    def passo(self, testo):
        self._passi.append({"t": round(float(self.renderer.time), 3), "testo": testo})

    def tear_down(self):
        if not self._passi:
            return
        VIDEO.mkdir(parents=True, exist_ok=True)
        dati = {"titolo": self.TITOLO, "durata": round(float(self.renderer.time), 3), "passi": self._passi}
        (VIDEO / f"{self.USCITA}.json").write_text(json.dumps(dati, ensure_ascii=False, indent=1))
