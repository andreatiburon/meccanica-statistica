"""Film per l'articolo su viriale e Van der Waals."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comune import *

R = np.linspace(1e-3, 8, 16000)


def lj(r):
    return 4 * (r ** -12 - r ** -6)


def mayer(r, T):
    return np.exp(np.clip(-lj(r) / T, -700, 50)) - 1


def b2(T):
    """B2 ridotto, in unità di 2πσ³/3."""
    return -3 * np.trapezoid(R ** 2 * mayer(R, T), R)


def curva_punti(a, xs, ys, ymin, ymax, **kw):
    pts = [a.c2p(x, y) for x, y in zip(xs, ys) if ymin <= y <= ymax]
    return VMobject(**kw).set_points_as_corners(pts) if len(pts) > 1 else VMobject()


class MayerB2(Lezione):
    USCITA = "reali-mayer"
    TITOLO = "Funzione di Mayer e secondo coefficiente del viriale"

    def construct(self):
        self.add(titolo("Funzione di Mayer e B₂(T)", "potenziale di Lennard-Jones"))
        a = assi([0.8, 3, 0.5], [-1.5, 3, 1], x_length=6.0, y_length=4.4).move_to(LEFT * 3.4 + DOWN * 0.6)
        tx = tacche(a, [1, 1.5, 2, 2.5, 3], fmt="{:g}")
        ty = tacche(a, [-1, 0, 1, 2], asse="y")
        lx = formula(r"r/\sigma", 26, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        zero = DashedLine(a.c2p(0.8, 0), a.c2p(3, 0), color=TENUE, stroke_width=1.5, stroke_opacity=0.6)
        xs = np.linspace(0.85, 3, 500)
        pot = curva_punti(a, xs, lj(xs), -1.5, 3, stroke_color=FREDDO, stroke_width=4)
        lpot = formula(r"v(r)/\varepsilon", 28, FREDDO).next_to(a.c2p(2.0, -0.6), RIGHT, buff=0.1)
        fpot = formula(r"v(r)=4\varepsilon\Big[\Big(\tfrac{\sigma}{r}\Big)^{12}-\Big(\tfrac{\sigma}{r}\Big)^{6}\Big]", 32)
        fpot.move_to(RIGHT * 3.6 + UP * 2.2)

        self.passo("Il potenziale di Lennard-Jones tra due molecole: repulsione dura a distanze minori di σ, "
                   "una buca attrattiva di profondità ε poco più in là, e nulla a grande distanza.")
        self.play(Create(a), FadeIn(tx, ty, lx), Create(zero), run_time=1)
        self.play(Create(pot), FadeIn(lpot), Write(fpot), run_time=2)
        self.wait(1)

        T = ValueTracker(5.0)
        fm = always_redraw(lambda: curva_punti(a, xs, mayer(xs, T.get_value()), -1.5, 3,
                                               stroke_color=ORO, stroke_width=4.5))
        lfm = formula(r"f(r)=e^{-\beta v(r)}-1", 32, ORO).next_to(fpot, DOWN, buff=0.35)
        lettura = always_redraw(lambda: etichetta(f"k_B T/ε = {T.get_value():.2f}", 20, INCHIOSTRO)
                                .next_to(a, UP, buff=0.1).align_to(a, RIGHT))
        self.passo("La funzione di Mayer f = e^{−βv} − 1 vale −1 dentro il nocciolo, dove la coppia non può stare, "
                   "e zero lontano, dove non interagisce. Ad alta temperatura la buca conta poco.")
        self.play(Create(fm), Write(lfm), FadeIn(lettura), run_time=1.8)
        self.wait(0.8)

        self.passo("Abbassando la temperatura la buca pesa sempre di più: f diventa positiva e grande dove v < 0, "
                   "perché le coppie passano più tempo vicine.")
        self.play(T.animate.set_value(0.8), run_time=4, rate_func=smooth)
        self.wait(0.8)

        Ts = np.logspace(np.log10(0.7), np.log10(25), 120)
        Bs = np.array([b2(t) for t in Ts])
        tb = Ts[np.argmin(np.abs(Bs))]
        Z = 5  # B2 è disegnato spostato di +5, così l'asse delle T sta in basso
        b = assi([np.log10(0.7), np.log10(25), 0.5], [0, 6.5, 1], x_length=5.4, y_length=3.0).move_to(RIGHT * 3.6 + DOWN * 1.6)
        btx = VGroup(*[etichetta(str(v), 15).next_to(b.c2p(np.log10(v), 0), DOWN, buff=0.12) for v in (1, 3, 10)])
        bty = VGroup(*[etichetta(str(v), 15).next_to(b.c2p(np.log10(0.7), v + Z), LEFT, buff=0.12) for v in (-4, -2, 0)])
        blx = formula(r"k_BT/\varepsilon", 24, TENUE).next_to(b.x_axis, DOWN, buff=0.45).shift(DOWN * 0.15)
        bly = formula(r"B_2\ [2\pi\sigma^3/3]", 24, TENUE).next_to(b, UP, buff=0.08).align_to(b, LEFT)
        bzero = DashedLine(b.c2p(np.log10(0.7), Z), b.c2p(np.log10(25), Z), color=TENUE, stroke_width=1.5)
        bcurva = curva_punti(b, np.log10(Ts), Bs + Z, 0, 6.5, stroke_color=CALDO, stroke_width=4)
        punto = always_redraw(lambda: Dot(b.c2p(np.log10(T.get_value()), b2(T.get_value()) + Z), radius=0.08, color=ORO))
        fb2 = formula(r"B_2(T)=-2\pi\!\int_0^\infty\! r^2 f(r)\,dr", 32, CALDO)
        self.passo("Il secondo coefficiente del viriale è B₂ = −2π∫r²f dr. A bassa T prevale la buca e B₂ < 0: "
                   "il gas è più comprimibile di quello ideale. Ad alta T prevale il volume escluso e B₂ > 0.")
        self.play(FadeOut(fpot), lfm.animate.move_to(RIGHT * 3.6 + UP * 2.6), run_time=0.6)
        fb2.next_to(lfm, DOWN, buff=0.3)
        self.play(Write(fb2), Create(b), FadeIn(btx, bty, blx, bly), Create(bzero), run_time=1.4)
        self.play(Create(bcurva), FadeIn(punto), run_time=1.6)
        self.play(T.animate.set_value(20), run_time=4, rate_func=smooth)

        boyle = Dot(b.c2p(np.log10(tb), Z), radius=0.09, color=INCHIOSTRO)
        lboyle = etichetta(f"Boyle: k_B T ≈ {tb:.1f} ε", 16, INCHIOSTRO).next_to(boyle, DOWN + RIGHT, buff=0.12)
        self.passo(f"B₂ si annulla alla temperatura di Boyle, circa {tb:.1f} ε/k_B per Lennard-Jones: lì attrazione e "
                   "volume escluso si compensano e, al primo ordine in ρ, il gas reale si comporta come quello ideale.")
        self.play(T.animate.set_value(tb), run_time=2.5, rate_func=smooth)
        self.play(FadeIn(boyle, scale=2), FadeIn(lboyle), run_time=0.8)
        self.wait(2.5)


def p_vdw(v, T):
    return 8 * T / (3 * v - 1) - 3 / v ** 2


def spinodali(T):
    """Volumi dove dP/dv = 0: 4T v³ = (3v − 1)²."""
    r = np.roots([4 * T, -9, 6, -1])
    r = np.sort(r[np.isreal(r)].real)
    return [x for x in r if x > 1 / 3 + 1e-6]


def coesistenza(T):
    """Pressione e volumi di coesistenza con la regola delle aree uguali."""
    s = spinodali(T)
    pmin, pmax = max(p_vdw(s[0], T), 1e-4), p_vdw(s[1], T)

    def radici(P):
        r = np.roots([3 * P, -(P + 8 * T), 9, -3])
        return np.sort(r[np.isreal(r)].real)

    def area(P):
        v1, _, v3 = radici(P)
        prim = lambda v: 8 * T / 3 * np.log(3 * v - 1) + 3 / v
        return prim(v3) - prim(v1) - P * (v3 - v1)

    lo, hi = pmin + 1e-6, pmax - 1e-6
    for _ in range(80):
        m = (lo + hi) / 2
        if area(m) > 0:
            lo = m
        else:
            hi = m
    P = (lo + hi) / 2
    v1, v2, v3 = radici(P)
    return P, v1, v2, v3


class IsotermeVdW(Lezione):
    USCITA = "reali-isoterme"
    TITOLO = "Isoterme di Van der Waals"

    def construct(self):
        self.add(titolo("Isoterme di Van der Waals", "variabili ridotte: P/P_c, v/v_c, T/T_c"))
        a = assi([0.4, 4, 0.5], [0, 2.2, 0.5], x_length=7.4, y_length=4.6).move_to(LEFT * 1.9 + DOWN * 0.55)
        tx = tacche(a, [1, 2, 3, 4])
        ty = tacche(a, [0.5, 1, 1.5, 2], asse="y")
        lx = formula(r"\tilde v", 30, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        ly = formula(r"\tilde P", 30, TENUE).next_to(a, UP, buff=0.1).align_to(a, LEFT)
        feq = formula(r"\tilde P=\frac{8\tilde T}{3\tilde v-1}-\frac{3}{\tilde v^2}", 38).move_to(RIGHT * 4.7 + UP * 1.9)
        xs = np.linspace(0.36, 4, 900)
        T = ValueTracker(1.5)
        iso = always_redraw(lambda: curva_punti(a, xs, p_vdw(xs, T.get_value()), 0, 2.2, stroke_color=INCHIOSTRO,
                                                stroke_width=4))
        lettura = always_redraw(lambda: formula(rf"\tilde T={T.get_value():.2f}", 34, ORO).next_to(feq, DOWN, buff=0.45))

        self.passo("L'equazione di Van der Waals in variabili ridotte, divise per i valori critici: "
                   "un'isoterma per ogni temperatura. Ad alta T somiglia all'iperbole del gas perfetto.")
        self.play(Create(a), FadeIn(tx, ty, lx, ly), Write(feq), run_time=1.4)
        self.play(Create(iso), FadeIn(lettura), run_time=1.6)
        self.wait(1)

        crit = Dot(a.c2p(1, 1), radius=0.09, color=ORO)
        tang = Line(a.c2p(0.55, 1), a.c2p(1.6, 1), color=ORO, stroke_width=3)
        lcrit = formula(r"\frac{\partial P}{\partial v}=\frac{\partial^2P}{\partial v^2}=0", 32, ORO).next_to(lettura, DOWN, buff=0.4)
        self.passo("Scendendo verso T̃ = 1 l'isoterma si appiattisce. Al punto critico (ṽ, P̃) = (1, 1) "
                   "si annullano insieme la derivata prima e la derivata seconda: un flesso a tangente orizzontale.")
        self.play(T.animate.set_value(1.0), run_time=4, rate_func=smooth)
        self.play(FadeIn(crit, scale=2), Create(tang), Write(lcrit), run_time=1.2)
        self.wait(1)

        def instabile():
            t = T.get_value()
            s = spinodali(t)
            if len(s) < 2 or t >= 1:
                return VMobject()
            vv = np.linspace(s[0], s[1], 200)
            return curva_punti(a, vv, p_vdw(vv, t), 0, 2.2, stroke_color=CALDO, stroke_width=7)
        rosso = always_redraw(instabile)
        lins = formula(r"\frac{\partial P}{\partial v}>0", 32, CALDO).next_to(lcrit, DOWN, buff=0.4)
        self.passo("Sotto T_c l'isoterma ha un tratto, in arancio, in cui la pressione cresce col volume: "
                   "compressibilità negativa, fisicamente impossibile. Lì il fluido si separa in liquido e gas.")
        self.play(FadeOut(tang), run_time=0.4)
        self.add(rosso)
        self.play(T.animate.set_value(0.85), run_time=3.5, rate_func=smooth)
        self.play(Write(lins), run_time=1)
        self.wait(1)

        famiglia = VGroup(*[curva_punti(a, xs, p_vdw(xs, t), 0, 2.2, stroke_color=termico((t - 0.85) / 0.6),
                                        stroke_width=2, stroke_opacity=0.55) for t in (0.85, 0.9, 0.95, 1.0, 1.1, 1.25, 1.45)])
        fk = VGroup(formula(r"\frac{\partial\tilde P}{\partial\tilde v}\Big|_{\tilde v=1}=-6(1-\tilde T)", 30),
                    formula(r"\Rightarrow\ K_T\propto(T-T_c)^{-1}", 30)).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        fk.move_to(RIGHT * 4.7 + DOWN * 2.3)
        self.passo("Vicino al punto critico ∂P̃/∂ṽ = −6(1 − T̃): la compressibilità isoterma diverge come (T − T_c)^{−1}, "
                   "e con lei le fluttuazioni di densità.")
        self.play(FadeIn(famiglia), Write(fk), run_time=2)
        self.wait(2.5)


class CostruzioneMaxwell(Lezione):
    USCITA = "reali-maxwell"
    TITOLO = "Costruzione di Maxwell e curva di coesistenza"

    def construct(self):
        self.add(titolo("Costruzione di Maxwell", "regola delle aree uguali"))
        T0 = 0.9
        Pc, v1, v2, v3 = coesistenza(T0)
        s1, s2 = spinodali(T0)
        a = assi([0.4, 3.6, 0.5], [0.2, 1.2, 0.2], x_length=7.4, y_length=4.6).move_to(LEFT * 1.9 + DOWN * 0.55)
        tx = tacche(a, [1, 2, 3])
        ty = tacche(a, [0.4, 0.6, 0.8, 1.0], asse="y", fmt="{:.1f}")
        lx = formula(r"\tilde v", 30, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        ly = formula(r"\tilde P", 30, TENUE).next_to(a, UP, buff=0.1).align_to(a, LEFT)
        xs = np.linspace(0.45, 3.6, 900)
        iso = curva_punti(a, xs, p_vdw(xs, T0), 0.2, 1.2, stroke_color=INCHIOSTRO, stroke_width=4)
        lT = formula(rf"\tilde T={T0}", 32, ORO).move_to(RIGHT * 4.8 + UP * 2.3)

        self.passo("Un'isoterma sotto T_c, qui T̃ = 0,9. Per un intervallo di pressioni ci sono tre volumi con la stessa P. "
                   "A quale pressione liquido e gas coesistono davvero?")
        self.play(Create(a), FadeIn(tx, ty, lx, ly), Create(iso), FadeIn(lT), run_time=2)
        self.wait(1)

        P = ValueTracker(0.70)

        def radici(p):
            r = np.roots([3 * p, -(p + 8 * T0), 9, -3])
            return np.sort(r[np.isreal(r)].real)

        def regione(lo, hi, p, colore):
            vv = np.linspace(lo, hi, 120)
            pts = [a.c2p(v, p_vdw(v, T0)) for v in vv] + [a.c2p(hi, p), a.c2p(lo, p)]
            return Polygon(*pts, stroke_width=0, fill_color=colore, fill_opacity=0.45)

        def aree():
            p = P.get_value()
            r1, r2, r3 = radici(p)
            return VGroup(regione(r1, r2, p, FREDDO), regione(r2, r3, p, CALDO),
                          Line(a.c2p(r1, p), a.c2p(r3, p), color=ORO, stroke_width=3))
        zone = always_redraw(aree)

        def valori():
            p = P.get_value()
            r1, r2, r3 = radici(p)
            prim = lambda v: 8 * T0 / 3 * np.log(3 * v - 1) + 3 / v
            A1 = p * (r2 - r1) - (prim(r2) - prim(r1))
            A2 = (prim(r3) - prim(r2)) - p * (r3 - r2)
            return VGroup(etichetta(f"area sotto  = {A1:.3f}", 18, FREDDO),
                          etichetta(f"area sopra  = {A2:.3f}", 18, CALDO),
                          etichetta(f"P̃ = {p:.3f}", 18, ORO)).arrange(DOWN, aligned_edge=LEFT, buff=0.15) \
                .move_to(RIGHT * 4.8 + UP * 0.9)
        letture = always_redraw(valori)
        self.passo("All'equilibrio le due fasi hanno uguali T, P e potenziale chimico μ. Questo equivale a scegliere la "
                   "retta orizzontale che taglia due aree uguali tra sé e l'isoterma. Facciamo scorrere la retta.")
        self.add(zone, letture)
        self.play(P.animate.set_value(0.47), run_time=3, rate_func=smooth)
        self.play(P.animate.set_value(Pc), run_time=2.5, rate_func=smooth)
        self.wait(1)

        self.passo("Con aree uguali la retta è la pressione di coesistenza. Lungo di essa liquido (a sinistra) e gas "
                   "(a destra) convivono in proporzioni variabili, e il tratto a S viene sostituito dalla retta.")
        zone.clear_updaters()
        letture.clear_updaters()
        liq = etichetta("liquido", 18, INCHIOSTRO).next_to(a.c2p(v1, Pc), UP + RIGHT, buff=0.12)
        gas = etichetta("gas", 18, INCHIOSTRO).next_to(a.c2p(v3, Pc), UP + RIGHT, buff=0.1)
        self.play(FadeIn(liq, gas), Indicate(zone[2], color=ORO), run_time=1.5)
        self.wait(1.2)

        meta1 = curva_punti(a, np.linspace(v1, s1, 80), p_vdw(np.linspace(v1, s1, 80), T0), 0.2, 1.2,
                            stroke_color=FREDDO, stroke_width=7)
        meta2 = curva_punti(a, np.linspace(s2, v3, 80), p_vdw(np.linspace(s2, v3, 80), T0), 0.2, 1.2,
                            stroke_color=FREDDO, stroke_width=7)
        inst = curva_punti(a, np.linspace(s1, s2, 80), p_vdw(np.linspace(s1, s2, 80), T0), 0.2, 1.2,
                           stroke_color=CALDO, stroke_width=7)
        leg = VGroup(etichetta("metastabile", 17, FREDDO), etichetta("instabile (spinodale)", 17, CALDO)) \
            .arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(RIGHT * 4.8 + DOWN * 0.6)
        self.passo("Tra i punti di coesistenza e i flessi ci sono stati metastabili, liquido surriscaldato e vapore "
                   "sovrassaturo; tra i due flessi la zona spinodale, instabile.")
        self.play(FadeOut(VGroup(zone[0], zone[1], letture)), run_time=0.5)
        self.play(Create(meta1), Create(meta2), Create(inst), FadeIn(leg), run_time=2)
        self.wait(1.2)

        Ts = np.linspace(0.84, 0.999, 40)
        cs = [coesistenza(t) for t in Ts]
        sp = [spinodali(t) for t in Ts]
        bino = [a.c2p(c[1], c[0]) for c in cs] + [a.c2p(1, 1)] + [a.c2p(c[3], c[0]) for c in cs[::-1]]
        spin = [a.c2p(s[0], p_vdw(s[0], t)) for s, t in zip(sp, Ts) if p_vdw(s[0], t) > 0.2] + [a.c2p(1, 1)] + \
               [a.c2p(s[1], p_vdw(s[1], t)) for s, t in zip(sp[::-1], Ts[::-1])]
        cb = VMobject(stroke_color=ORO, stroke_width=4).set_points_smoothly(bino)
        cspin = DashedVMobject(VMobject(stroke_color=CALDO, stroke_width=3).set_points_smoothly(spin), num_dashes=50)
        lcb = VGroup(etichetta("coesistenza", 17, ORO), etichetta("spinodale", 17, CALDO)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        lcb.next_to(leg, DOWN, buff=0.4, aligned_edge=LEFT)
        crit = Dot(a.c2p(1, 1), radius=0.09, color=INCHIOSTRO)
        self.passo("Ripetendo la costruzione a ogni temperatura si ottiene la curva di coesistenza, in oro, e la spinodale, "
                   "tratteggiata: si chiudono entrambe nel punto critico, dove liquido e gas diventano indistinguibili.")
        self.play(Create(cb), run_time=2.5)
        self.play(Create(cspin), FadeIn(lcb), FadeIn(crit, scale=2), run_time=2)
        self.wait(2.5)
