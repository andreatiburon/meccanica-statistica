"""Film per l'articolo sui gas quantistici ideali."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comune import *


def livelli(centro, larg=1.3, alt=0.8):
    l0 = Line(centro + LEFT * larg / 2 + DOWN * alt / 2, centro + RIGHT * larg / 2 + DOWN * alt / 2, color=TENUE, stroke_width=2.5)
    l1 = Line(centro + LEFT * larg / 2 + UP * alt / 2, centro + RIGHT * larg / 2 + UP * alt / 2, color=TENUE, stroke_width=2.5)
    return VGroup(l0, l1)


def particella(lettera=None, colore=INCHIOSTRO):
    d = Dot(radius=0.13, color=colore)
    if lettera:
        t = Text(lettera, font=SERIF, font_size=18, color=FONDO, weight=BOLD).move_to(d)
        return VGroup(d, t)
    return VGroup(d)


def config(centro, sotto, sopra, alt=0.55):
    """sotto/sopra: liste di particelle sul livello 0 e 1, in un riquadro."""
    g = VGroup(RoundedRectangle(width=1.75, height=1.0, corner_radius=0.08, stroke_color=TENUE, stroke_width=1.2,
                                stroke_opacity=0.5).move_to(centro + UP * 0.08), livelli(centro, alt=alt))
    for lista, dy in ((sotto, -alt / 2), (sopra, alt / 2)):
        for k, p in enumerate(lista):
            dx = (k - (len(lista) - 1) / 2) * 0.32
            p.move_to(centro + RIGHT * dx + UP * (dy + 0.16))
            g.add(p)
    return g


class Occupazioni(Lezione):
    USCITA = "qg-occupazioni"
    TITOLO = "Contare gli stati di particelle identiche"

    def construct(self):
        self.add(titolo("Contare gli stati", "particelle distinguibili, bosoni, fermioni"))
        xs = [-4.6, 0.0, 4.6]
        teste = VGroup(*[etichetta(t, 20, c).move_to(RIGHT * x + UP * 2.15) for t, c, x in
                         (("distinguibili", INCHIOSTRO, xs[0]), ("bosoni", FREDDO, xs[1]), ("fermioni", CALDO, xs[2]))])
        A = lambda: particella("a", FREDDO)
        B = lambda: particella("b", CALDO)
        ys = [1.25, 0.05, -1.15, -2.35]
        dist = VGroup(
            config(RIGHT * xs[0] + UP * ys[0], [A(), B()], []),
            config(RIGHT * xs[0] + UP * ys[1], [A()], [B()]),
            config(RIGHT * xs[0] + UP * ys[2], [B()], [A()]),
            config(RIGHT * xs[0] + UP * ys[3], [], [A(), B()]),
        )
        self.passo("Due particelle e due livelli. Se le particelle si possono distinguere, a e b, "
                   "gli stati sono quattro: scambiarle produce uno stato diverso.")
        self.play(FadeIn(teste[0]), LaggedStart(*[FadeIn(c) for c in dist], lag_ratio=0.3), run_time=2.2)
        self.wait(1)

        bos = VGroup(
            config(RIGHT * xs[1] + UP * ys[0], [particella(colore=FREDDO), particella(colore=FREDDO)], []),
            config(RIGHT * xs[1] + UP * ys[1], [particella(colore=FREDDO)], [particella(colore=FREDDO)]),
            config(RIGHT * xs[1] + UP * ys[3], [], [particella(colore=FREDDO), particella(colore=FREDDO)]),
        )
        occ = VGroup(*[formula(t, 26, TENUE).next_to(c, RIGHT, buff=0.25) for t, c in
                       zip((r"(2,0)", r"(1,1)", r"(0,2)"), bos)])
        self.passo("Per particelle identiche lo scambio non crea uno stato nuovo: conta solo quante particelle stanno "
                   "su ogni livello, i numeri di occupazione (n₀, n₁). Per i bosoni restano tre stati.")
        self.play(FadeIn(teste[1]), LaggedStart(*[FadeIn(c) for c in bos], lag_ratio=0.3), FadeIn(occ), run_time=2)
        self.wait(1)

        ferm = VGroup(config(RIGHT * xs[2] + UP * ys[1], [particella(colore=CALDO)], [particella(colore=CALDO)]))
        vieta = VGroup(*[Cross(config(RIGHT * xs[2] + UP * y, l0, l1), stroke_color=CALDO, stroke_width=3)
                         for y, l0, l1 in ((ys[0], [particella(colore=CALDO), particella(colore=CALDO)], []),
                                           (ys[3], [], [particella(colore=CALDO), particella(colore=CALDO)]))])
        fant = VGroup(config(RIGHT * xs[2] + UP * ys[0], [particella(colore=CALDO), particella(colore=CALDO)], []),
                      config(RIGHT * xs[2] + UP * ys[3], [], [particella(colore=CALDO), particella(colore=CALDO)])).set_opacity(0.3)
        pauli = formula(r"n_k\in\{0,1\}", 28, CALDO).next_to(ferm, RIGHT, buff=0.2)
        self.passo("Per i fermioni il principio di Pauli vieta due particelle nello stesso stato, n_k ≤ 1: resta un solo stato.")
        self.play(FadeIn(teste[2]), FadeIn(ferm), FadeIn(fant), run_time=1.2)
        self.play(Create(vieta), FadeIn(pauli), run_time=1.2)
        self.wait(1.2)

        self.passo("Un microstato è dunque l'insieme {n_k}. Nel gran canonico la somma su N toglie il vincolo Σn_k = N e la "
                   "funzione di partizione si fattorizza livello per livello. Da qui le due distribuzioni.")
        self.play(FadeOut(VGroup(teste, dist, bos, occ, ferm, vieta, fant, pauli)), run_time=0.7)
        f1 = formula(r"\mathcal Q_{GC}=\sum_{\{n_k\}}\prod_k\big(ze^{-\beta\varepsilon_k}\big)^{n_k}=\prod_k Q_k", 38).move_to(UP * 1.6)
        f2 = formula(r"Q_k^{F}=1+ze^{-\beta\varepsilon_k}\qquad Q_k^{B}=\frac{1}{1-ze^{-\beta\varepsilon_k}}", 36).next_to(f1, DOWN, buff=0.5)
        f3 = formula(r"\langle n_k\rangle=\frac{1}{e^{\beta(\varepsilon_k-\mu)}\pm1}", 40, ORO).next_to(f2, DOWN, buff=0.55)
        self.play(Write(f1), run_time=1.6)
        self.play(Write(f2), run_time=1.6)
        self.play(Write(f3), run_time=1.4)
        self.wait(1.5)

        self.passo("A temperatura zero i bosoni stanno tutti nel livello più basso; i fermioni riempiono i livelli uno per uno, "
                   "dal basso, fino all'energia di Fermi ε_F.")
        self.play(FadeOut(VGroup(f1, f2, f3)), run_time=0.6)
        nliv = 7
        scala = VGroup()
        for cx, col, tit in ((-3.2, FREDDO, "bosoni, T = 0"), (3.2, CALDO, "fermioni, T = 0")):
            g = VGroup(*[Line(RIGHT * (cx - 1.4) + UP * (-2.9 + 0.66 * k), RIGHT * (cx + 1.4) + UP * (-2.9 + 0.66 * k),
                              color=TENUE, stroke_width=2) for k in range(nliv)])
            g.add(etichetta(tit, 19, col).move_to(RIGHT * cx + UP * 1.75))
            scala.add(g)
        bos_p = VGroup(*[Dot(RIGHT * (-3.2 + (k - 2.5) * 0.36) + UP * (-2.9 + 0.16), radius=0.13, color=FREDDO) for k in range(6)])
        fer_p = VGroup(*[Dot(RIGHT * 3.2 + UP * (-2.9 + 0.66 * k + 0.16), radius=0.13, color=CALDO) for k in range(6)])
        ef = DashedLine(RIGHT * 1.6 + UP * (-2.9 + 0.66 * 5 + 0.33), RIGHT * 4.8 + UP * (-2.9 + 0.66 * 5 + 0.33), color=ORO)
        lef = formula(r"\varepsilon_F", 30, ORO).next_to(ef, RIGHT, buff=0.1)
        self.play(FadeIn(scala), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in bos_p], lag_ratio=0.15),
                  LaggedStart(*[FadeIn(p, shift=DOWN * 0.3) for p in fer_p], lag_ratio=0.15), run_time=2.4)
        self.play(Create(ef), FadeIn(lef), run_time=0.8)
        self.wait(2)


class TreStatistiche(Lezione):
    USCITA = "qg-tre-statistiche"
    TITOLO = "Fermi-Dirac, Bose-Einstein e il limite classico"

    def construct(self):
        self.add(titolo("Tre statistiche a confronto", "occupazione media di un livello"))
        X0 = 3  # ascissa spostata di +3 perché l'asse verticale stia a sinistra
        a = assi([0, 8, 1], [0, 2.2, 0.5], x_length=8.0, y_length=4.6).move_to(LEFT * 1.6 + DOWN * 0.55)
        tx = VGroup(*[etichetta(str(v), 15).next_to(a.c2p(v + X0, 0), DOWN, buff=0.12) for v in (-2, 0, 2, 4)])
        ty = tacche(a, [0.5, 1, 1.5, 2], asse="y")
        lx = formula(r"\beta(\varepsilon-\mu)", 28, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        ly = formula(r"\langle n\rangle", 28, TENUE).next_to(a, UP, buff=0.1).align_to(a, LEFT)
        uno = DashedLine(a.c2p(0, 1), a.c2p(8, 1), color=TENUE, stroke_width=1.5, stroke_opacity=0.6)
        zero_mu = DashedLine(a.c2p(X0, 0), a.c2p(X0, 2.2), color=TENUE, stroke_width=1.5, stroke_opacity=0.6)
        fd = a.plot(lambda u: 1 / (np.exp(u - X0) + 1), x_range=[0, 8, 0.01], color=CALDO, stroke_width=4.5)
        be = a.plot(lambda u: 1 / (np.exp(u - X0) - 1), x_range=[X0 + 0.376, 8, 0.01], color=FREDDO, stroke_width=4.5)
        mb = DashedVMobject(a.plot(lambda u: np.exp(-(u - X0)), x_range=[X0 - 0.78, 8, 0.01], color=INCHIOSTRO, stroke_width=3), num_dashes=60)
        ffd = formula(r"\frac{1}{e^{x}+1}\ \ \text{Fermi-Dirac}", 30, CALDO).move_to(RIGHT * 4.9 + UP * 1.9)
        fbe = formula(r"\frac{1}{e^{x}-1}\ \ \text{Bose-Einstein}", 30, FREDDO).next_to(ffd, DOWN, buff=0.35, aligned_edge=LEFT)
        fmb = formula(r"e^{-x}\ \ \text{Maxwell-Boltzmann}", 30, INCHIOSTRO).next_to(fbe, DOWN, buff=0.35, aligned_edge=LEFT)

        self.passo("L'occupazione media di un livello in funzione di β(ε − μ). Per i fermioni non supera mai 1: "
                   "vale 1/2 esattamente in ε = μ.")
        self.play(Create(a), FadeIn(tx, ty, lx, ly), Create(uno), Create(zero_mu), run_time=1.2)
        self.play(Create(fd), Write(ffd), run_time=1.8)
        self.wait(1)

        self.passo("Per i bosoni l'occupazione diverge quando ε si avvicina a μ: per questo il potenziale chimico "
                   "deve restare sotto il livello più basso, μ ≤ ε_min.")
        self.play(Create(be), Write(fbe), run_time=1.8)
        self.wait(1)

        zona = Rectangle(width=a.c2p(8, 0)[0] - a.c2p(X0 + 2, 0)[0], height=a.y_length, stroke_width=0,
                         fill_color=ORO, fill_opacity=0.05).move_to(a.c2p(X0 + 3.5, 1.1))
        bordo = DashedLine(a.c2p(X0 + 2, 0), a.c2p(X0 + 2, 2.2), color=ORO, stroke_width=2, stroke_opacity=0.7)
        lzona = etichetta("⟨n⟩ ≪ 1: limite classico", 17, ORO).next_to(a.c2p(X0 + 3.5, 0.62), UP, buff=0.0)
        self.passo("Quando β(ε − μ) ≫ 1 le due curve si confondono con e^{−β(ε−μ)}: con livelli quasi vuoti "
                   "non importa più se due particelle possono stare nello stesso stato. È il limite classico.")
        self.play(Create(mb), Write(fmb), run_time=1.8)
        self.play(FadeIn(zona), Create(bordo), FadeIn(lzona), run_time=1)
        self.wait(1.2)

        corr = MathTex(r"\beta P\lambda^3=\rho\lambda^3\Big[1", r"\pm", r"\tfrac{1}{2^{5/2}}\rho\lambda^3\Big]",
                       font_size=31, color=INCHIOSTRO).move_to(RIGHT * 4.75 + DOWN * 1.2)
        corr[1].set_color(ORO)
        spieg = VGroup(etichetta("+ fermioni: come una repulsione", 16, CALDO),
                       etichetta("− bosoni: come un'attrazione", 16, FREDDO)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        spieg.next_to(corr, DOWN, buff=0.3)
        self.passo("La prima correzione all'equazione di stato ha segno opposto nei due casi: i fermioni spingono la "
                   "pressione sopra quella classica, come se si respingessero; i bosoni sotto, come se si attraessero.")
        self.play(Write(corr), run_time=1.6)
        self.play(FadeIn(spieg), run_time=0.8)
        self.wait(2.5)


E = np.linspace(0, 3, 3001)


def mu_fermi(T):
    """Potenziale chimico per g(ε) = (3/2)√ε, ε_F = 1, risolto numericamente."""
    if T < 1e-3:
        return 1.0
    g = 1.5 * np.sqrt(E)
    lo, hi = -2.0, 1.5
    for _ in range(60):
        m = (lo + hi) / 2
        n = np.trapezoid(g / (np.exp(np.clip((E - m) / T, -700, 700)) + 1), E)
        lo, hi = (m, hi) if n < 1 else (lo, m)
    return (lo + hi) / 2


def occ(e, T, m):
    if T < 1e-3:
        return np.where(e <= 1, 1.0, 0.0)
    return 1 / (np.exp(np.clip((e - m) / T, -700, 700)) + 1)


class MareDiFermi(Lezione):
    USCITA = "qg-mare-fermi"
    TITOLO = "Il mare di Fermi a bassa temperatura"

    def construct(self):
        self.add(titolo("Il mare di Fermi", "fermioni liberi a bassa temperatura"))
        a = assi([0, 2, 0.25], [0, 2.2, 0.5], x_length=7.6, y_length=4.4).move_to(LEFT * 1.8 + DOWN * 0.6)
        tx = tacche(a, [0, 0.5, 1, 1.5, 2])
        lx = formula(r"\varepsilon/\varepsilon_F", 28, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        ly = formula(r"g(\varepsilon)\,n(\varepsilon)", 28, TENUE).next_to(a, UP, buff=0.1).align_to(a, LEFT)
        dos = DashedVMobject(a.plot(lambda e: 1.5 * np.sqrt(e), x_range=[0, 2, 0.01], color=TENUE, stroke_width=2.5), num_dashes=50)
        ldos = formula(r"g(\varepsilon)\propto\sqrt\varepsilon", 28, TENUE).next_to(a.c2p(1.7, 1.5 * np.sqrt(1.7)), UP + LEFT, buff=0.1)
        T = ValueTracker(0.0)

        def mare():
            t = T.get_value()
            m = mu_fermi(t)
            ee = np.linspace(0, 2, 400)
            yy = 1.5 * np.sqrt(ee) * occ(ee, t, m)
            pts = [a.c2p(0, 0)] + [a.c2p(e, y) for e, y in zip(ee, yy)] + [a.c2p(2, 0)]
            return Polygon(*pts, stroke_color=ORO, stroke_width=3, fill_color=ORO, fill_opacity=0.35)
        riemp = always_redraw(mare)

        def fascia():
            t = T.get_value()
            if t < 0.005:
                return VMobject()
            m = mu_fermi(t)
            return Rectangle(width=a.c2p(m + t, 0)[0] - a.c2p(m - t, 0)[0], height=a.y_length, stroke_width=0,
                             fill_color=CALDO, fill_opacity=0.12).move_to(a.c2p(m, 1.1))
        banda = always_redraw(fascia)
        mu_seg = always_redraw(lambda: DashedLine(a.c2p(mu_fermi(T.get_value()), 0), a.c2p(mu_fermi(T.get_value()), 2.1),
                                                  color=INCHIOSTRO, stroke_width=2))
        lettura = always_redraw(lambda: VGroup(
            etichetta(f"k_B T/ε_F = {T.get_value():.3f}", 19, INCHIOSTRO),
            etichetta(f"μ/ε_F = {mu_fermi(T.get_value()):.4f}", 19, ORO),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(RIGHT * 4.9 + UP * 2.2))

        self.passo("A temperatura zero i fermioni occupano tutti gli stati fino all'energia di Fermi ε_F: la densità di stati "
                   "√ε è riempita fino a lì e vuota sopra. È il mare di Fermi.")
        self.play(Create(a), FadeIn(tx, lx, ly), Create(dos), FadeIn(ldos), run_time=1.3)
        self.play(FadeIn(riemp), Create(mu_seg), FadeIn(lettura), run_time=1.5)
        self.wait(1)

        self.passo("Scaldando, la distribuzione si smussa solo in una fascia larga qualche k_BT attorno a μ. "
                   "Le particelle in profondità non possono eccitarsi: gli stati vicini sono già occupati.")
        self.add(banda)
        self.play(T.animate.set_value(0.08), run_time=4, rate_func=smooth)
        self.wait(1)

        fc = formula(r"C_V=\frac{\pi^2}{2}\,Nk_B\,\frac{k_BT}{\varepsilon_F}", 34).move_to(RIGHT * 4.9 + DOWN * 0.1)
        self.passo("Si eccitano circa k_BT g(ε_F) particelle, ognuna di circa k_BT: l'energia cresce come T² e il calore "
                   "specifico è lineare in T, molto più piccolo del valore classico 3Nk_B/2.")
        self.play(Write(fc), run_time=1.6)
        self.play(T.animate.set_value(0.16), run_time=3, rate_func=smooth)
        self.wait(1)

        fm = formula(r"\mu=\varepsilon_F\Big[1-\frac{\pi^2}{12}\Big(\frac{k_BT}{\varepsilon_F}\Big)^2\Big]", 32, ORO)
        fm.next_to(fc, DOWN, buff=0.5)
        self.passo("Anche il potenziale chimico scende, di poco, secondo lo sviluppo di Sommerfeld. La linea tratteggiata "
                   "segue μ calcolato esattamente; finché k_BT ≪ ε_F coincide con la formula.")
        self.play(Write(fm), run_time=1.6)
        self.play(T.animate.set_value(0.3), run_time=3.5, rate_func=smooth)
        self.wait(2)


def g32(z):
    if z >= 1:
        return 2.612375
    k = np.arange(1, 40001)
    return float(np.sum(z ** k / k ** 1.5))


def z_da(y):
    if y >= 2.612375:
        return 1.0
    lo, hi = 0.0, 1.0
    for _ in range(50):
        m = (lo + hi) / 2
        lo, hi = (m, hi) if g32(m) < y else (lo, m)
    return (lo + hi) / 2


class SaturazioneBE(Lezione):
    USCITA = "qg-saturazione"
    TITOLO = "Perché i bosoni condensano"

    def construct(self):
        self.add(titolo("Perché i bosoni condensano", "la funzione g₃/₂(z) è limitata"))
        a = assi([0, 1.1, 0.25], [0, 4, 1], x_length=5.4, y_length=4.4).move_to(LEFT * 3.6 + DOWN * 0.6)
        tx = tacche(a, [0, 0.5, 1])
        ty = tacche(a, [1, 2, 3], asse="y")
        lx = formula(r"z", 28, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        zs = np.linspace(0, 1, 300)
        curva = a.plot_line_graph(zs, [g32(z) for z in zs], line_color=ORO, add_vertex_dots=False, stroke_width=4)
        lcurva = formula(r"g_{3/2}(z)=\sum_k\frac{z^k}{k^{3/2}}", 30, ORO).next_to(a, UP, buff=0.2)
        tetto = DashedLine(a.c2p(0, 2.612), a.c2p(1.1, 2.612), color=ORO, stroke_width=2, stroke_opacity=0.7)
        ltetto = formula(r"\zeta(3/2)\approx2.612", 26, ORO).next_to(a.c2p(0.02, 2.612), UP, buff=0.08, aligned_edge=LEFT)
        tau = ValueTracker(2.5)
        y = lambda: 2.612375 * tau.get_value() ** -1.5
        livello = always_redraw(lambda: DashedLine(a.c2p(0, min(y(), 3.95)), a.c2p(1.1, min(y(), 3.95)), color=INCHIOSTRO,
                                                   stroke_width=3, stroke_opacity=1 if y() < 3.95 else 0))
        punto = always_redraw(lambda: Dot(a.c2p(z_da(y()), min(y(), 2.612375)), radius=0.09, color=CALDO))
        lettura = always_redraw(lambda: VGroup(
            etichetta(f"T/T_c = {tau.get_value():.2f}", 19, INCHIOSTRO),
            etichetta(f"ρλ³ = {y():.2f}", 19, INCHIOSTRO),
            etichetta(f"z = {z_da(y()):.3f}", 19, CALDO),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.14).move_to(RIGHT * 1.7 + UP * 2.2))

        self.passo("Per un gas di bosoni nel continuo la densità fissa la fugacità tramite ρλ³ = g₃/₂(z), "
                   "con z tra 0 e 1. La linea bianca è ρλ³, il punto la soluzione z.")
        self.play(Create(a), FadeIn(tx, ty, lx), Create(curva), Write(lcurva), run_time=1.8)
        self.play(Create(livello), FadeIn(punto, lettura), run_time=1)
        self.wait(0.8)

        self.passo("Raffreddando a densità fissata, λ ∝ T^{−1/2} cresce e ρλ³ sale come T^{−3/2}: "
                   "la soluzione z si sposta verso 1.")
        self.play(tau.animate.set_value(1.1), run_time=4, rate_func=smooth)
        self.wait(0.6)

        self.passo("Ma g₃/₂(z) è limitata: al massimo vale ζ(3/2) ≈ 2,612, in z = 1. A T = T_c la linea tocca il tetto; "
                   "sotto, non c'è più soluzione e z resta bloccata a 1.")
        self.play(Create(tetto), FadeIn(ltetto), run_time=1)
        self.play(tau.animate.set_value(0.75), run_time=3.5, rate_func=smooth)
        self.wait(0.6)

        b = assi([0, 2, 0.5], [0, 1.05, 0.25], x_length=5.0, y_length=3.6).move_to(RIGHT * 3.9 + DOWN * 1.0)
        btx = tacche(b, [0, 1, 2])
        blx = formula(r"T/T_c", 26, TENUE).next_to(b.x_axis, DOWN, buff=0.45)
        bly = formula(r"N_0/N", 26, TENUE).next_to(b, UP, buff=0.08).align_to(b, LEFT)
        frac = lambda t: 1 - t ** 1.5 if t < 1 else 0.0
        traccia = always_redraw(lambda: b.plot(frac, x_range=[tau.get_value(), 2, 0.005], color=FREDDO, stroke_width=4))
        pb = always_redraw(lambda: Dot(b.c2p(tau.get_value(), frac(tau.get_value())), radius=0.08, color=CALDO))
        ff = formula(r"\frac{N_0}{N}=1-\Big(\frac{T}{T_c}\Big)^{3/2}", 32, FREDDO).next_to(b, UP, buff=0.55).align_to(b, RIGHT)
        self.passo("Le particelle che la parte eccitata non può più contenere finiscono nello stato fondamentale: "
                   "una frazione finita N₀/N = 1 − (T/T_c)^{3/2}. È la condensazione di Bose-Einstein.")
        self.play(lettura.animate.shift(LEFT * 0.0), Create(b), FadeIn(btx, blx, bly), run_time=1)
        self.add(traccia, pb)
        self.play(Write(ff), run_time=1.2)
        self.play(tau.animate.set_value(0.05), run_time=4, rate_func=smooth)
        self.wait(2)
