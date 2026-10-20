"""Film per l'articolo su corpo nero e calore specifico dei solidi."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comune import *


class ModiCavita(Lezione):
    USCITA = "cn-modi"
    TITOLO = "Contare i modi di una cavità"

    def construct(self):
        self.add(titolo("Contare i modi di una cavità", "da Rayleigh-Jeans a Planck"))
        o = LEFT * 6.1 + DOWN * 3.1
        passo = 0.33
        nmax = 13
        punti = VGroup(*[Dot(o + RIGHT * nx * passo + UP * ny * passo, radius=0.035, color=TENUE)
                         for nx in range(1, nmax + 1) for ny in range(1, nmax + 1)])
        kx = Arrow(o, o + RIGHT * (nmax + 1) * passo, buff=0, color=TENUE, stroke_width=2, max_tip_length_to_length_ratio=0.04)
        ky = Arrow(o, o + UP * (nmax + 1) * passo, buff=0, color=TENUE, stroke_width=2, max_tip_length_to_length_ratio=0.04)
        lkx = formula(r"k_x", 26, TENUE).next_to(kx, RIGHT, buff=0.1)
        lky = formula(r"k_y", 26, TENUE).next_to(ky, UP, buff=0.1)
        fk = formula(r"\mathbf k=\frac{\pi}{L}(n_x,n_y,n_z)", 32).move_to(LEFT * 1.4 + UP * 2.3)
        self.passo("In una cavità di lato L le onde stazionarie hanno vettore d'onda k = (π/L)(n_x, n_y, n_z) con n interi positivi: "
                   "i modi sono i punti di un reticolo di passo π/L. Qui una sezione a n_z fissato.")
        self.play(Create(kx), Create(ky), FadeIn(lkx, lky), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(p) for p in punti], lag_ratio=0.004), Write(fk), run_time=2)
        self.wait(0.8)

        r = ValueTracker(1.2)
        dr = 0.36

        def guscio():
            return AnnularSector(inner_radius=r.get_value(), outer_radius=r.get_value() + dr, angle=PI / 2,
                                 start_angle=0, fill_color=ORO, fill_opacity=0.22, stroke_width=0).move_arc_center_to(o)
        anello = always_redraw(guscio)

        def accendi(g):
            for p in g:
                d = np.linalg.norm(p.get_center() - o)
                p.set_color(ORO if r.get_value() <= d < r.get_value() + dr else TENUE)
        punti.add_updater(accendi)
        conta = always_redraw(lambda: etichetta(
            f"modi nel guscio: {sum(1 for p in punti if r.get_value() <= np.linalg.norm(p.get_center() - o) < r.get_value() + dr)}",
            19, ORO).move_to(LEFT * 1.4 + UP * 1.5))
        fdn = formula(r"dN=2\cdot\frac{1}{8}\cdot\frac{4\pi k^2\,dk}{(\pi/L)^3}=\frac{L^3}{\pi^2c^3}\,\omega^2d\omega", 30)
        fdn.move_to(RIGHT * 3.6 + DOWN * 2.6)
        self.passo("I modi con |k| tra k e k + dk stanno in un guscio sottile. In questa sezione il loro numero cresce come k; "
                   "in tre dimensioni, contando l'ottante positivo e due polarizzazioni, cresce come k² dk, cioè ω² dω.")
        self.add(anello, conta)
        self.play(r.animate.set_value(3.6), run_time=5, rate_func=linear)
        self.play(Write(fdn), run_time=1.6)
        punti.clear_updaters()
        self.wait(0.8)

        a = assi([0, 8, 1], [0, 1.25, 0.25], x_length=6.0, y_length=3.2).move_to(RIGHT * 3.6 + UP * 0.6)
        tx = tacche(a, [0, 2, 4, 6, 8])
        lx = formula(r"\hbar\omega/k_BT", 26, TENUE).next_to(a.x_axis, DOWN, buff=0.4)
        ly = formula(r"\langle\epsilon\rangle/k_BT", 26, TENUE).next_to(a, UP, buff=0.08).align_to(a, LEFT)
        cl = a.plot(lambda x: 1.0, x_range=[0, 8], color=TENUE, stroke_width=4)
        lcl = etichetta("classico: k_B T per ogni modo", 16, TENUE).next_to(a.c2p(8, 1), UP, buff=0.1).align_to(a, RIGHT)
        self.passo("Classicamente ogni modo è un oscillatore armonico e per l'equipartizione ha energia media k_BT, "
                   "qualunque sia la sua frequenza.")
        self.play(FadeOut(fdn), Create(a), FadeIn(tx, lx, ly), run_time=1)
        self.play(Create(cl), FadeIn(lcl), run_time=1.2)
        self.wait(0.8)

        qu = a.plot(lambda x: x / np.expm1(x) if x > 1e-6 else 1.0, x_range=[0.001, 8, 0.02], color=CALDO, stroke_width=4)
        fqu = formula(r"\langle\epsilon\rangle=\frac{\hbar\omega}{e^{\beta\hbar\omega}-1}", 32, CALDO).next_to(a.c2p(3.2, 0.55), RIGHT, buff=0.1)
        self.passo("Con i livelli quantizzati nħω l'energia media diventa ħω/(e^{βħω} − 1): i modi con ħω ≫ k_BT "
                   "restano praticamente spenti, perché non c'è abbastanza energia per eccitare nemmeno un quanto.")
        self.play(Create(qu), Write(fqu), run_time=1.8)
        self.wait(1)

        b = assi([0, 12, 2], [0, 6, 1], x_length=6.0, y_length=3.6).move_to(RIGHT * 3.6 + DOWN * 0.3)
        btx = tacche(b, [0, 4, 8, 12])
        blx = formula(r"\hbar\omega/k_BT", 26, TENUE).next_to(b.x_axis, DOWN, buff=0.4)
        bly = formula(r"u(\omega)", 26, TENUE).next_to(b, UP, buff=0.08).align_to(b, LEFT)
        rj = b.plot(lambda x: x ** 2, x_range=[0, np.sqrt(6)], color=TENUE, stroke_width=4)
        pl = b.plot(lambda x: x ** 3 / np.expm1(x) if x > 1e-6 else 0.0, x_range=[0.001, 12, 0.02], color=ORO, stroke_width=5)
        lrj = etichetta("Rayleigh-Jeans: diverge", 16, TENUE).next_to(b.c2p(np.sqrt(6), 6), RIGHT, buff=0.15)
        lpl = etichetta("Planck", 18, ORO).next_to(b.c2p(4.5, 4.4), UP, buff=0.1)
        fpl = formula(r"u(\omega)\,d\omega=\frac{\hbar}{\pi^2c^3}\frac{\omega^3\,d\omega}{e^{\beta\hbar\omega}-1}", 32, ORO)
        fpl.move_to(LEFT * 3.4 + UP * 0.2)
        self.passo("Numero di modi per energia media: con k_BT costante si ottiene ω², che integrato su tutte le frequenze "
                   "diverge, la catastrofe ultravioletta. Con l'energia quantistica si ottiene la legge di Planck, con un massimo "
                   "e un'energia totale finita, proporzionale a T⁴.")
        self.play(FadeOut(VGroup(a, tx, lx, ly, cl, lcl, qu, fqu, punti, kx, ky, lkx, lky, anello, conta, fk)), run_time=0.8)
        self.play(Create(b), FadeIn(btx, blx, bly), Write(fpl), run_time=1.4)
        self.play(Create(rj), FadeIn(lrj), run_time=1.2)
        self.play(Create(pl), FadeIn(lpl), run_time=1.8)
        self.wait(2.5)


def c_einstein(t):
    x = 1 / t
    return x ** 2 * np.exp(x) / np.expm1(x) ** 2 if x < 600 else 0.0


def c_debye(t):
    X = 1 / t
    x = np.linspace(1e-6, min(X, 700), 4000)
    return 3 * t ** 3 * np.trapezoid(x ** 4 * np.exp(x) / np.expm1(x) ** 2, x)


class CalorSpecificoSolidi(Lezione):
    USCITA = "cn-solidi"
    TITOLO = "Calore specifico dei solidi: Einstein e Debye"

    def construct(self):
        self.add(titolo("Calore specifico dei solidi", "Dulong-Petit, Einstein, Debye"))
        a = assi([0, 1.5, 0.25], [0, 1.15, 0.25], x_length=7.0, y_length=4.4).move_to(LEFT * 2.2 + DOWN * 0.6)
        tx = tacche(a, [0, 0.5, 1, 1.5])
        ty = tacche(a, [0.5, 1], asse="y")
        lx = formula(r"T/\Theta", 28, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        ly = formula(r"C_V/3Nk_B", 28, TENUE).next_to(a, UP, buff=0.1).align_to(a, LEFT)
        dp = a.plot(lambda t: 1.0, x_range=[0, 1.5], color=TENUE, stroke_width=4)
        ldp = etichetta("Dulong-Petit", 17, TENUE).next_to(a.c2p(1.5, 1), UP, buff=0.1).align_to(a, RIGHT)
        self.passo("Classicamente un solido è un insieme di 3N oscillatori indipendenti, i modi normali, ciascuno con energia "
                   "media k_BT: C_V = 3Nk_B, la legge di Dulong-Petit, uguale per tutti i solidi e a ogni temperatura.")
        self.play(Create(a), FadeIn(tx, ty, lx, ly), run_time=1.2)
        self.play(Create(dp), FadeIn(ldp), run_time=1.2)
        self.wait(1)

        ts = np.linspace(0.02, 1.5, 300)
        ein = a.plot_line_graph(ts, [c_einstein(t) for t in ts], line_color=FREDDO, add_vertex_dots=False, stroke_width=4)
        lein = etichetta("Einstein", 18, FREDDO).next_to(a.c2p(0.42, c_einstein(0.42)), RIGHT, buff=0.15)
        r = assi([0, 1.3, 0.5], [0, 1.3, 0.5], x_length=3.2, y_length=1.9).move_to(RIGHT * 4.6 + UP * 1.7)
        rl = formula(r"\rho(\omega)", 24, TENUE).next_to(r, UP, buff=0.05).align_to(r, LEFT)
        rx = formula(r"\omega", 24, TENUE).next_to(r.x_axis, RIGHT, buff=0.08)
        delta = Arrow(r.c2p(0.8, 0), r.c2p(0.8, 1.25), buff=0, color=FREDDO, stroke_width=4, max_tip_length_to_length_ratio=0.12)
        self.passo("Ma a bassa temperatura C_V va a zero. Einstein: tutti i 3N modi oscillano alla stessa frequenza ω_E, "
                   "e ognuno è un oscillatore quantistico. Θ = ħω_E/k_B.")
        self.play(Create(r), FadeIn(rl, rx), GrowArrow(delta), run_time=1.2)
        self.play(Create(ein), FadeIn(lein), run_time=2)
        self.wait(1)

        deb = a.plot_line_graph(ts, [c_debye(t) for t in ts], line_color=CALDO, add_vertex_dots=False, stroke_width=4)
        ldeb = etichetta("Debye", 18, CALDO).next_to(a.c2p(0.2, c_debye(0.2)), LEFT, buff=0.2)
        parab = r.plot(lambda w: (w / 1.0) ** 2, x_range=[0, 1.0], color=CALDO, stroke_width=4)
        taglio = Line(r.c2p(1.0, 0), r.c2p(1.0, 1.0), color=CALDO, stroke_width=4)
        lmax = formula(r"\omega_{\max}", 22, CALDO).next_to(r.c2p(1.0, 0), DOWN, buff=0.1)
        self.passo("Debye: le frequenze sono quelle di onde sonore, distribuite come ω² fino a una frequenza massima fissata "
                   "dalla distanza tra gli atomi. Θ = ħω_max/k_B. Le due curve sembrano simili...")
        self.play(Create(parab), Create(taglio), FadeIn(lmax), run_time=1.4)
        self.play(Create(deb), FadeIn(ldeb), run_time=2)
        self.wait(1)

        X0, Y0 = 1.7, 6  # assi spostati: x' = log10(T/Θ) + 1,7 e y' = log10(C) + 6, così gli assi stanno in basso a sinistra
        b = assi([0, 1.9, 0.5], [0, 6.4, 1], x_length=7.0, y_length=4.4).move_to(a)
        btx = VGroup(*[etichetta(t, 15).next_to(b.c2p(v + X0, 0), DOWN, buff=0.12)
                       for v, t in ((-1.5, "0,03"), (-1, "0,1"), (-0.5, "0,3"), (0, "1"))])
        bty = VGroup(*[etichetta(t, 15).next_to(b.c2p(0, v + Y0), LEFT, buff=0.12)
                       for v, t in ((-6, "10⁻⁶"), (-4, "10⁻⁴"), (-2, "10⁻²"), (0, "1"))])
        lts = np.linspace(-1.7, 0.2, 300)
        ein_l = [(x, np.log10(c_einstein(10 ** x))) for x in lts if c_einstein(10 ** x) > 1e-6]
        bein = b.plot_line_graph([p[0] + X0 for p in ein_l], [p[1] + Y0 for p in ein_l], line_color=FREDDO,
                                 add_vertex_dots=False, stroke_width=4)
        bdeb = b.plot_line_graph(lts + X0, [np.log10(c_debye(10 ** x)) + Y0 for x in lts], line_color=CALDO,
                                 add_vertex_dots=False, stroke_width=4)
        t3 = DashedVMobject(b.plot(lambda x: np.log10(4 * np.pi ** 4 / 5) + 3 * (x - X0) + Y0, x_range=[0, 0.95],
                                   color=INCHIOSTRO, stroke_width=2.5), num_dashes=24)
        lt3 = formula(r"\frac{4\pi^4}{5}\Big(\frac{T}{\Theta}\Big)^3", 30, INCHIOSTRO).next_to(b.c2p(-1.25 + X0, -2.4 + Y0), DOWN + RIGHT, buff=0.1)
        lexp = formula(r"\Big(\frac{\Theta}{T}\Big)^2e^{-\Theta/T}", 30, FREDDO).next_to(b.c2p(-0.95 + X0, -4.6 + Y0), RIGHT, buff=0.15)
        self.passo("...ma in scala logaritmica la differenza è netta. Einstein crolla esponenzialmente, come e^{−Θ/T}; "
                   "Debye va come T³, perché a bassa T restano eccitabili i modi di bassa frequenza, che Einstein non ha. "
                   "I dati sperimentali seguono T³.")
        self.play(FadeOut(VGroup(a, tx, ty, lx, ein, deb, dp, ldp, lein, ldeb)), run_time=0.7)
        self.play(Create(b), FadeIn(btx, bty), run_time=1)
        self.play(Create(bein), Create(bdeb), run_time=2.2)
        self.play(Create(t3), Write(lt3), Write(lexp), run_time=1.6)
        self.wait(2.5)
