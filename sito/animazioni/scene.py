"""Animazioni Manim per il sito della wiki di meccanica statistica.

Rendering (Manim Community, senza LaTeX):
  manim -qm sito/animazioni/scene.py GasMaxwell IsingRaffreddamento CondensazioneBE SpettroPlanck

Ogni scena simula davvero il sistema con numpy e poi lo anima: le curve
teoriche sono sovrapposte ai dati simulati, non al posto loro.
"""
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comune import CALDO, FONDO, FREDDO, INCHIOSTRO, MONO, ORO, SERIF, SPENTO, TENUE, Lezione, etichetta  # noqa: E402
from manim import *  # noqa: E402

# Palette e caratteri vengono da comune.py (tema scelto con TEMA_FILM).

config.background_color = FONDO


def titolo(testo, sotto=None):
    t = Text(testo, font=SERIF, font_size=34, color=INCHIOSTRO).to_corner(UL, buff=0.45)
    if sotto is None:
        return VGroup(t)
    s = Text(sotto, font=SERIF, font_size=20, color=TENUE, slant=ITALIC)
    s.next_to(t, DOWN, aligned_edge=LEFT, buff=0.12)
    return VGroup(t, s)




def termico(x):
    """x in [0,1] -> colore da FREDDO a INCHIOSTRO a CALDO."""
    x = float(np.clip(x, 0, 1))
    if x < 0.5:
        return interpolate_color(ManimColor(FREDDO), ManimColor(INCHIOSTRO), x * 2)
    return interpolate_color(ManimColor(INCHIOSTRO), ManimColor(CALDO), (x - 0.5) * 2)


# ---------------------------------------------------------------------------
# 1. Gas di dischi rigidi: da velocità tutte uguali a Maxwell-Boltzmann (2D)
# ---------------------------------------------------------------------------
def simula_gas(n=220, r=0.011, dt=0.0025, frame=360, sotto=4, seme=1):
    rng = np.random.default_rng(seme)
    # griglia iniziale senza sovrapposizioni
    lato = int(np.ceil(np.sqrt(n)))
    g = (np.arange(lato) + 0.5) / lato
    pos = np.array([(x, y) for x in g for y in g])[:n] + rng.normal(0, 0.004, (n, 2))
    ang = rng.uniform(0, 2 * np.pi, n)
    vel = np.c_[np.cos(ang), np.sin(ang)]  # |v| = 1 per tutti
    storia_p, storia_v = [], []
    for _ in range(frame):
        for _ in range(sotto):
            pos += vel * dt
            # pareti
            for k in range(2):
                fuori = (pos[:, k] < r) | (pos[:, k] > 1 - r)
                vel[fuori, k] *= -1
                pos[:, k] = np.clip(pos[:, k], r, 1 - r)
            # urti elastici tra dischi uguali
            d = pos[:, None, :] - pos[None, :, :]
            dist2 = (d ** 2).sum(-1)
            i, j = np.where(np.triu(dist2 < (2 * r) ** 2, 1))
            for a, b in zip(i, j):
                dr = pos[a] - pos[b]
                dv = vel[a] - vel[b]
                prod = dr @ dv
                if prod < 0:  # si avvicinano
                    imp = prod / (dr @ dr) * dr
                    vel[a] -= imp
                    vel[b] += imp
        storia_p.append(pos.copy())
        storia_v.append(np.linalg.norm(vel, axis=1))
    return np.array(storia_p), np.array(storia_v)


class GasMaxwell(Lezione):
    USCITA = "gas-maxwell"
    TITOLO = "Termalizzazione di un gas"

    def construct(self):
        P, V = simula_gas()
        F = len(P)
        intestazione = titolo("Termalizzazione di un gas",
                              "220 dischi rigidi, tutti con la stessa velocità iniziale")
        self.add(intestazione)

        lato = 5.6
        scatola = Square(lato, color=TENUE, stroke_width=2).move_to(LEFT * 3.2 + DOWN * 0.45)
        o = scatola.get_corner(DL)
        raggio = 0.011 * lato
        punti = VGroup(*[Dot(radius=raggio * 1.25, stroke_width=0) for _ in range(P.shape[1])])

        f = ValueTracker(0)

        def aggiorna_punti(g):
            k = int(f.get_value())
            for d, p, v in zip(g, P[k], V[k]):
                d.move_to(o + np.array([p[0] * lato, p[1] * lato, 0]))
                d.set_fill(termico(v / 2.2), opacity=1)

        punti.add_updater(aggiorna_punti)
        aggiorna_punti(punti)

        assi = Axes(x_range=[0, 3, 0.5], y_range=[0, 1.1, 0.25], x_length=5.4, y_length=4.2,
                    tips=False, axis_config={"color": TENUE, "stroke_width": 2})
        assi.move_to(RIGHT * 3.6 + DOWN * 0.6)
        lx = etichetta("|v| / v₀").next_to(assi.x_axis, DOWN, buff=0.25)
        ly = etichetta("frequenza").rotate(PI / 2).next_to(assi.y_axis, LEFT, buff=0.2)
        tacche = VGroup(*[etichetta(str(x), 14).next_to(assi.c2p(x, 0), DOWN, buff=0.1) for x in (0, 1, 2, 3)])

        bordi = np.linspace(0, 3, 25)
        larg = bordi[1] - bordi[0]
        barre = VGroup(*[Rectangle(width=assi.x_length * larg / 3 * 0.92, height=0.01,
                                   stroke_width=0, fill_opacity=0.85) for _ in bordi[:-1]])

        def aggiorna_barre(g):
            k = int(f.get_value())
            h, _ = np.histogram(V[k], bins=bordi, density=True)
            for b, x0, hi in zip(g, bordi[:-1], h):
                alto = max(assi.c2p(0, min(hi, 1.1))[1] - assi.c2p(0, 0)[1], 0.005)
                b.stretch_to_fit_height(alto)
                b.move_to(assi.c2p(x0 + larg / 2, 0), aligned_edge=DOWN)
                b.set_fill(termico((x0 + larg / 2) / 2.2), opacity=0.85)

        barre.add_updater(aggiorna_barre)
        aggiorna_barre(barre)

        # Maxwell-Boltzmann in 2D con <v²> = v₀² (l'energia si conserva)
        mb = assi.plot(lambda v: 2 * v * np.exp(-v ** 2), x_range=[0, 3], color=ORO, stroke_width=4)
        mb_nome = Text("Maxwell-Boltzmann 2D", font=SERIF, font_size=20, color=ORO, slant=ITALIC)
        mb_nome.next_to(assi.c2p(1.35, 0.85), RIGHT, buff=0.1)

        orologio = etichetta("", 16)

        def aggiorna_orologio(m):
            k = int(f.get_value())
            nuovo = etichetta(f"t = {k * 4 * 0.0025:4.2f}   urti per particella ≈ {k * 4 * 0.0025 * 220 * 0.022:4.1f}", 16)
            nuovo.next_to(scatola, DOWN, buff=0.2)
            m.become(nuovo)

        orologio.add_updater(aggiorna_orologio)
        aggiorna_orologio(orologio)

        self.add(scatola, punti, assi, lx, ly, tacche, barre, orologio)
        self.passo("220 dischi rigidi in una scatola, tutti con la stessa velocità e direzioni a caso: l'istogramma delle "
                   "velocità è un picco solo. Il colore va dal blu per i lenti all'arancio per i veloci.")
        self.wait(0.6)
        self.play(f.animate.set_value(F * 0.25), run_time=3.2, rate_func=linear)
        self.passo("Gli urti elastici conservano l'energia totale ma la redistribuiscono: alcuni dischi rallentano, altri "
                   "accelerano, e l'istogramma si allarga.")
        self.play(f.animate.set_value(F * 0.55), run_time=3.8, rate_func=linear)
        self.passo("Dopo una decina di urti per particella la distribuzione smette di cambiare: è quella di Maxwell-Boltzmann "
                   "in due dimensioni, f(v) = (2v/⟨v²⟩)e^{−v²/⟨v²⟩}, con ⟨v²⟩ fissato dall'energia iniziale.")
        self.play(Create(mb), FadeIn(mb_nome), f.animate.set_value(F - 1), run_time=5, rate_func=linear)
        for m in (punti, barre, orologio):
            m.clear_updaters()
        self.wait(1.2)


# ---------------------------------------------------------------------------
# 2. Ising 2D con Metropolis: raffreddamento attraverso T_c di Onsager
# ---------------------------------------------------------------------------
TC_ISING = 2 / np.log(1 + np.sqrt(2))


def simula_ising(L=96, frame=330, passi=6, t0=3.6, t1=1.5, seme=3):
    rng = np.random.default_rng(seme)
    s = rng.choice([-1, 1], (L, L))
    x, y = np.indices((L, L))
    scacchi = [(x + y) % 2 == 0, (x + y) % 2 == 1]
    # più lento vicino a T_c: parametrizzazione con un tanh
    u = np.linspace(-1, 1, frame)
    T = TC_ISING + np.where(u < 0, (t0 - TC_ISING) * (-u) ** 1.6, -(TC_ISING - t1) * u ** 1.6)
    reticoli, magn = [], []
    for t in T:
        for _ in range(passi):
            for m in scacchi:
                vicini = np.roll(s, 1, 0) + np.roll(s, -1, 0) + np.roll(s, 1, 1) + np.roll(s, -1, 1)
                dE = 2 * s * vicini
                gira = m & (rng.random((L, L)) < np.exp(-np.clip(dE, 0, None) / t))
                s = np.where(gira, -s, s)
        reticoli.append(s.copy())
        magn.append(abs(s.mean()))
    return np.array(reticoli), T, np.array(magn)


class IsingRaffreddamento(Lezione):
    USCITA = "ising"
    TITOLO = "Ising 2D attraverso la temperatura critica"

    def construct(self):
        S, T, M = simula_ising()
        F = len(S)
        self.add(titolo("Modello di Ising 2D", "Metropolis su 96 × 96 spin, raffreddato attraverso Tc"))

        su = np.array(ManimColor(CALDO).to_rgb()) * 255
        giu = np.array(ManimColor(SPENTO).to_rgb()) * 255

        def rgba(s):
            img = np.where(s[..., None] > 0, su, giu).astype(np.uint8)
            return np.dstack([img, np.full(s.shape, 255, np.uint8)])

        immagine = ImageMobject(rgba(S[0]))
        immagine.set_resampling_algorithm(RESAMPLING_ALGORITHMS["nearest"])
        immagine.height = 5.6
        immagine.move_to(LEFT * 3.2 + DOWN * 0.45)
        cornice = SurroundingRectangle(immagine, buff=0.04, color=TENUE, stroke_width=2)

        assi = Axes(x_range=[1.4, 3.7, 0.5], y_range=[0, 1.05, 0.25], x_length=5.4, y_length=4.2,
                    tips=False, axis_config={"color": TENUE, "stroke_width": 2})
        assi.move_to(RIGHT * 3.6 + DOWN * 0.6)
        lx = etichetta("T  (unità J/k_B)").next_to(assi.x_axis, DOWN, buff=0.25)
        ly = etichetta("|m|").next_to(assi.y_axis, UP, buff=0.15)
        tacche = VGroup(*[etichetta(f"{x:.1f}", 14).next_to(assi.c2p(x, 0), DOWN, buff=0.1) for x in (1.5, 2.0, 2.5, 3.0, 3.5)])
        tc = DashedLine(assi.c2p(TC_ISING, 0), assi.c2p(TC_ISING, 1.05), color=TENUE, stroke_width=2)
        tc_nome = etichetta("Tc = 2.269", 14).next_to(tc, UP, buff=0.08)

        Tg = np.linspace(1.4, TC_ISING - 1e-4, 200)
        onsager = assi.plot_line_graph(
            x_values=list(Tg) + [TC_ISING, 3.7],
            y_values=list((1 - np.sinh(2 / Tg) ** -4) ** 0.125) + [0, 0],
            line_color=ORO, add_vertex_dots=False, stroke_width=4)
        onsager_nome = Text("Onsager (esatto)", font=SERIF, font_size=20, color=ORO, slant=ITALIC)
        onsager_nome.next_to(assi.c2p(1.55, 1.0), RIGHT, buff=0.05)

        f = ValueTracker(0)

        def aggiorna_img(m):
            m.pixel_array = rgba(S[int(f.get_value())])

        immagine.add_updater(aggiorna_img)

        traccia = always_redraw(lambda: VMobject(stroke_color=INCHIOSTRO, stroke_width=3).set_points_as_corners(
            [assi.c2p(T[k], M[k]) for k in range(max(int(f.get_value()), 1) + 1)]))
        punto = always_redraw(lambda: Dot(assi.c2p(T[int(f.get_value())], M[int(f.get_value())]), radius=0.07, color=INCHIOSTRO))
        lettura = always_redraw(lambda: etichetta(
            f"T = {T[int(f.get_value())]:.2f}   |m| = {M[int(f.get_value())]:.2f}", 16).next_to(cornice, DOWN, buff=0.2))

        self.add(immagine, cornice, assi, lx, ly, tacche, tc, tc_nome, onsager, onsager_nome, traccia, punto, lettura)
        k1 = int(np.argmax(T < TC_ISING + 0.12))
        k2 = int(np.argmax(T < TC_ISING - 0.25))
        self.passo("Un reticolo di 96 × 96 spin, arancio su e blu giù, aggiornato con l'algoritmo di Metropolis. "
                   "Ad alta temperatura gli spin sono disordinati e la magnetizzazione |m| fluttua attorno a zero.")
        self.wait(0.6)
        self.play(f.animate.set_value(k1), run_time=13 * k1 / F, rate_func=linear)
        self.passo("Avvicinandosi a T_c = 2,269 compaiono isole di spin allineati di ogni dimensione: "
                   "le fluttuazioni sono correlate su distanze sempre più grandi.")
        self.play(f.animate.set_value(k2), run_time=13 * (k2 - k1) / F, rate_func=linear)
        self.passo("Sotto T_c i domini crescono e si ordinano. La curva gialla è la magnetizzazione esatta di Onsager, "
                   "|m| = (1 − sinh⁻⁴(2J/k_BT))^{1/8}, che ogni dominio raggiunge al suo interno.")
        self.play(f.animate.set_value(F - 1), run_time=13 * (F - 1 - k2) / F, rate_func=linear)
        immagine.clear_updaters()
        if M[-1] < 0.8:
            nota = Text("Raffreddando in fretta restano domini opposti:\n"
                        "ognuno è ordinato, ma |m| totale resta sotto Onsager.",
                        font=SERIF, font_size=17, color=INCHIOSTRO, slant=ITALIC, line_spacing=0.9)
            nota.to_corner(UR, buff=0.5)
            self.play(FadeIn(nota), run_time=0.8)
        self.wait(2.5)


# ---------------------------------------------------------------------------
# 3. Condensazione di Bose-Einstein in una scatola 3D, N finito
# ---------------------------------------------------------------------------
def frazione_condensata(N=1000, M=48, temperature=None):
    n = np.arange(1, M + 1)
    E = (n[:, None, None] ** 2 + n[None, :, None] ** 2 + n[None, None, :] ** 2).ravel() - 3.0
    E = np.sort(E)[1:]  # stati eccitati; lo stato fondamentale ha E = 0
    frazioni = []
    for T in temperature:
        lo, hi = -50 * T, -1e-12  # mu < 0
        for _ in range(100):
            mu = (lo + hi) / 2
            x = (E - mu) / T
            ecc = np.sum(1 / np.expm1(np.minimum(x, 700)))
            n0 = 1 / np.expm1(-mu / T)
            if ecc + n0 > N:
                hi = mu
            else:
                lo = mu
        frazioni.append(n0 / N)
    return np.array(frazioni)


class CondensazioneBE(Lezione):
    USCITA = "bose-einstein"
    TITOLO = "Condensazione di Bose-Einstein"

    def construct(self):
        N = 1000
        Tc = (N / (np.pi / 4 * 0.886227 * 2.612375)) ** (2 / 3)
        rapporti = np.linspace(1.8, 0.05, 260)
        f0 = frazione_condensata(N, temperature=rapporti * Tc)
        F = len(rapporti)
        self.add(titolo("Condensazione di Bose-Einstein",
                        "1000 bosoni in una scatola 3D: distribuzione degli impulsi"))

        rng = np.random.default_rng(7)
        nd = 520
        base = rng.normal(0, 1, (nd, 2))
        ordine = np.argsort(np.linalg.norm(base, axis=1))  # i primi a condensare sono i più lenti
        centro = LEFT * 3.2 + DOWN * 0.45
        nuvola = VGroup(*[Dot(radius=0.035, stroke_width=0) for _ in range(nd)])
        riquadro = Square(5.6, color=TENUE, stroke_width=2).move_to(centro)
        assi_p = VGroup(
            Line(centro + LEFT * 2.8, centro + RIGHT * 2.8, color=TENUE, stroke_width=1, stroke_opacity=0.4),
            Line(centro + DOWN * 2.8, centro + UP * 2.8, color=TENUE, stroke_width=1, stroke_opacity=0.4))
        px = etichetta("pₓ", 16).next_to(riquadro, DOWN, buff=0.1).shift(RIGHT * 2.5)
        py = etichetta("p_y", 16).next_to(riquadro, LEFT, buff=0.1).shift(UP * 2.5)

        f = ValueTracker(0)

        def aggiorna_nuvola(g):
            k = int(f.get_value())
            sigma = 0.95 * np.sqrt(rapporti[k])
            n_cond = int(round(f0[k] * nd))
            condensati = set(ordine[:n_cond])
            for i, d in enumerate(g):
                if i in condensati:
                    d.move_to(centro + np.array([*(base[i] * 0.06), 0]))
                    d.set_fill(ORO, opacity=0.9)
                else:
                    d.move_to(centro + np.array([*np.clip(base[i] * sigma, -2.75, 2.75), 0]))
                    d.set_fill(FREDDO, opacity=0.75)

        nuvola.add_updater(aggiorna_nuvola)
        aggiorna_nuvola(nuvola)

        assi = Axes(x_range=[0, 1.8, 0.5], y_range=[0, 1.05, 0.25], x_length=5.4, y_length=4.2,
                    tips=False, axis_config={"color": TENUE, "stroke_width": 2})
        assi.move_to(RIGHT * 3.6 + DOWN * 0.6)
        lx = etichetta("T / Tc").next_to(assi.x_axis, DOWN, buff=0.25)
        ly = etichetta("N₀ / N").next_to(assi.y_axis, UP, buff=0.15)
        tacche = VGroup(*[etichetta(f"{x:g}", 14).next_to(assi.c2p(x, 0), DOWN, buff=0.1) for x in (0, 0.5, 1, 1.5)])
        teoria = assi.plot(lambda t: 1 - t ** 1.5 if t < 1 else 0, x_range=[0, 1.8, 0.005],
                           color=ORO, stroke_width=3, discontinuities=[1])
        teoria = DashedVMobject(teoria, num_dashes=60)
        teoria_nome = Text("1 − (T/Tc)^3/2, limite termodinamico", font=SERIF, font_size=18, color=ORO, slant=ITALIC)
        teoria_nome.next_to(assi.c2p(0.55, 0.95), RIGHT, buff=0.05)
        esatta_nome = Text("N = 1000, calcolo esatto", font=SERIF, font_size=18, color=INCHIOSTRO, slant=ITALIC)
        esatta_nome.next_to(assi.c2p(0.95, 0.62), RIGHT, buff=0.05)

        traccia = always_redraw(lambda: VMobject(stroke_color=INCHIOSTRO, stroke_width=4).set_points_as_corners(
            [assi.c2p(rapporti[k], f0[k]) for k in range(max(int(f.get_value()), 1) + 1)]))
        punto = always_redraw(lambda: Dot(assi.c2p(rapporti[int(f.get_value())], f0[int(f.get_value())]),
                                          radius=0.07, color=INCHIOSTRO))
        lettura = always_redraw(lambda: etichetta(
            f"T/Tc = {rapporti[int(f.get_value())]:.2f}   N₀/N = {f0[int(f.get_value())]:.2f}", 16)
            .next_to(riquadro, DOWN, buff=0.2))

        self.add(riquadro, assi_p, px, py, nuvola, assi, lx, ly, tacche, teoria, teoria_nome, esatta_nome,
                 traccia, punto, lettura)
        kc = int(np.argmax(rapporti < 1.0))
        self.passo("1000 bosoni in una scatola 3D. A sinistra la distribuzione degli impulsi: ogni punto è una particella. "
                   "Sopra T_c è una nuvola termica che si stringe raffreddando.")
        self.wait(0.6)
        self.play(f.animate.set_value(kc), run_time=12 * kc / F, rate_func=linear)
        self.passo("Sotto T_c le particelle in eccesso si accumulano nello stato fondamentale, a impulso quasi nullo: il picco "
                   "dorato al centro. La curva bianca è il calcolo esatto a N = 1000, quella gialla il limite termodinamico.")
        self.play(f.animate.set_value(F - 1), run_time=12 * (F - 1 - kc) / F, rate_func=linear)
        nuvola.clear_updaters()
        self.wait(1.5)


# ---------------------------------------------------------------------------
# 4. Spettro di corpo nero: Planck contro Rayleigh-Jeans, spostamento di Wien
# ---------------------------------------------------------------------------
def colore_corpo_nero(kelvin):
    """Approssimazione del colore di un corpo nero (Tanner Helland), 1000-40000 K."""
    t = kelvin / 100
    r = 255 if t <= 66 else 329.7 * (t - 60) ** -0.1332
    g = 99.47 * np.log(t) - 161.1 if t <= 66 else 288.1 * (t - 60) ** -0.0755
    b = 255 if t >= 66 else (0 if t <= 19 else 138.5 * np.log(t - 10) - 305.0)
    return rgb_to_color(np.clip([r, g, b], 0, 255) / 255)


class SpettroPlanck(Lezione):
    USCITA = "planck"
    TITOLO = "Spettro di corpo nero"

    def construct(self):
        self.add(titolo("Spettro di corpo nero", "Planck risolve la catastrofe ultravioletta"))
        assi = Axes(x_range=[0, 12, 2], y_range=[0, 6, 1], x_length=7.6, y_length=4.6,
                    tips=False, axis_config={"color": TENUE, "stroke_width": 2})
        assi.move_to(RIGHT * 1.6 + DOWN * 0.6)
        lx = etichetta("hν / k·T₀").next_to(assi.x_axis, DOWN, buff=0.25)
        ly = etichetta("densità di energia u(ν)").rotate(PI / 2).next_to(assi.y_axis, LEFT, buff=0.2)
        tacche = VGroup(*[etichetta(str(x), 14).next_to(assi.c2p(x, 0), DOWN, buff=0.1) for x in (0, 2, 4, 6, 8, 10, 12)])

        t = ValueTracker(0.6)
        T0 = 4000  # kelvin a cui corrisponde t = 1

        def planck(x, tt):
            return x ** 3 / np.expm1(x / tt) if x > 0 else 0.0

        curva = always_redraw(lambda: assi.plot(lambda x: planck(x, t.get_value()), x_range=[0.01, 12, 0.04],
                                                color=colore_corpo_nero(T0 * t.get_value()), stroke_width=5))
        rj = always_redraw(lambda: DashedVMobject(assi.plot(
            lambda x: t.get_value() * x ** 2, x_range=[0.01, min(12, np.sqrt(6 / t.get_value())), 0.02],
            color=TENUE, stroke_width=3), num_dashes=40))
        rj_nome = Text("Rayleigh-Jeans: diverge", font=SERIF, font_size=18, color=TENUE, slant=ITALIC)
        rj_nome.next_to(assi.c2p(0.3, 6), UP, buff=0.15, aligned_edge=LEFT)
        picco = always_redraw(lambda: Dot(assi.c2p(2.8214 * t.get_value(), planck(2.8214 * t.get_value(), t.get_value())),
                                          radius=0.08, color=INCHIOSTRO))
        wien = assi.plot(lambda x: planck(x, x / 2.8214), x_range=[0.5 * 2.8214, 1.65 * 2.8214], color=INCHIOSTRO,
                         stroke_width=1.5, stroke_opacity=0.5)
        wien = DashedVMobject(wien, num_dashes=25)
        wien_nome = Text("Wien: ν_max ∝ T", font=SERIF, font_size=18, color=INCHIOSTRO, slant=ITALIC)
        wien_nome.next_to(assi.c2p(4.6, 5.0), RIGHT, buff=0.1)

        disco = always_redraw(lambda: Circle(radius=0.75, stroke_width=0)
                              .set_fill(colore_corpo_nero(T0 * t.get_value()), opacity=1)
                              .move_to(LEFT * 5.2 + DOWN * 0.3))
        alone = always_redraw(lambda: VGroup(*[
            Circle(radius=0.75 + 0.12 * i, stroke_width=0)
            .set_fill(colore_corpo_nero(T0 * t.get_value()), opacity=0.10 - 0.012 * i)
            .move_to(LEFT * 5.2 + DOWN * 0.3) for i in range(1, 8)]))
        kelvin = always_redraw(lambda: etichetta(f"T = {T0 * t.get_value():5.0f} K", 18, INCHIOSTRO)
                               .next_to(LEFT * 5.2 + DOWN * 0.3, DOWN, buff=1.25))
        formula = Text("u(ν,T) ∝ ν³ / (e^(hν/kT) − 1)", font=MONO, font_size=16, color=TENUE)
        formula.move_to(LEFT * 5.0 + DOWN * 3.0)

        self.add(assi, lx, ly, tacche, formula)
        self.passo("La densità di energia del corpo nero secondo Planck a 2400 K, e il colore che avrebbe un corpo a quella "
                   "temperatura. La curva tratteggiata è Rayleigh-Jeans, la previsione classica.")
        self.play(FadeIn(alone), FadeIn(disco), FadeIn(kelvin), Create(curva), run_time=1.2)
        self.add(rj)
        self.play(FadeIn(rj_nome), run_time=0.8)
        self.add(picco)
        self.passo("Scaldando, l'area sotto la curva cresce come T⁴ (Stefan-Boltzmann) e il colore passa dal rosso al bianco. "
                   "Rayleigh-Jeans cresce come ν² senza limite: la catastrofe ultravioletta.")
        self.play(t.animate.set_value(1.6), run_time=7, rate_func=smooth)
        self.passo("Il massimo si sposta in proporzione alla temperatura, hν_max ≈ 2,82 k_BT: è la legge di Wien. "
                   "La linea tratteggiata è il luogo dei massimi.")
        self.play(Create(wien), FadeIn(wien_nome), run_time=1.2)
        self.play(t.animate.set_value(0.8), run_time=4, rate_func=smooth)
        self.wait(1.2)
