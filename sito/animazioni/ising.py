"""Film per l'articolo sul modello di Ising e il campo medio."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comune import *

SU = "#E8834A"
GIU = "#1C2A4A"


class Ising1D(Lezione):
    USCITA = "ising-1d"
    TITOLO = "Ising in una dimensione"

    def construct(self):
        self.add(titolo("Ising in una dimensione", "domini, correlazioni e niente transizione"))
        righe, L, c = 4, 72, 0.168
        rng = np.random.default_rng(11)
        u = rng.uniform(0, 1, (righe, L))
        s0 = rng.choice([-1, 1], righe)
        T = ValueTracker(5.0)

        def catene(t):
            p = 1 / (1 + np.exp(-2 / t))
            s = np.empty((righe, L), dtype=int)
            s[:, 0] = s0
            for i in range(1, L):
                s[:, i] = np.where(u[:, i] < p, s[:, i - 1], -s[:, i - 1])
            return s
        celle = VGroup(*[Square(c * 0.9, stroke_width=0, fill_opacity=1)
                         .move_to(np.array([(i - L / 2 + 0.5) * c, 2.05 - r * c * 1.25, 0]))
                         for r in range(righe) for i in range(L)])

        def agg(g):
            s = catene(T.get_value()).ravel()
            for q, v in zip(g, s):
                q.set_fill(SU if v > 0 else GIU)
        celle.add_updater(agg)
        agg(celle)
        ham = formula(r"\mathcal H=-\varepsilon\sum_i s_is_{i+1},\qquad s_i=\pm1", 32).move_to(LEFT * 3.6 + DOWN * 0.15)
        lettura = always_redraw(lambda: VGroup(
            etichetta(f"k_B T/ε = {T.get_value():.2f}", 19, INCHIOSTRO),
            etichetta(f"P∥ = {1 / (1 + np.exp(-2 / T.get_value())):.3f}", 19, ORO),
            etichetta(f"ξ = {-1 / np.log(np.tanh(1 / T.get_value())):.1f} siti", 19, CALDO),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.14).move_to(LEFT * 3.6 + DOWN * 1.6))

        self.passo("Quattro catene di spin ±1 con interazione solo tra primi vicini e nessun campo esterno. "
                   "Ad alta temperatura ogni spin è quasi indipendente dal vicino.")
        self.play(FadeIn(celle), Write(ham), run_time=1.5)
        self.add(lettura)
        self.wait(1)

        self.passo("Abbassando T i domini si allungano. Nella catena infinita a campo nullo due vicini sono paralleli "
                   "con probabilità P∥ = e^{βε}/(e^{βε} + e^{−βε}), indipendentemente dagli altri.")
        self.play(T.animate.set_value(1.2), run_time=5, rate_func=smooth)
        self.wait(0.8)

        a = assi([0, 30, 5], [0, 1.05, 0.25], x_length=5.6, y_length=2.8).move_to(RIGHT * 3.4 + DOWN * 1.75)
        tx = tacche(a, [0, 10, 20, 30])
        lx = formula(r"j", 26, TENUE).next_to(a.x_axis, DOWN, buff=0.4)
        ly = formula(r"\langle s_is_{i+j}\rangle", 26, TENUE).next_to(a, UP, buff=0.08).align_to(a, LEFT)
        corr = always_redraw(lambda: a.plot(lambda j: np.tanh(1 / T.get_value()) ** j, x_range=[0, 30, 0.1],
                                            color=CALDO, stroke_width=4))
        fc = formula(r"\langle s_is_{i+j}\rangle=(\tanh\beta\varepsilon)^j=e^{-j/\xi}", 32, CALDO).next_to(a, UP, buff=0.55)
        self.passo("La correlazione tra spin a distanza j decade esponenzialmente, (tanh βε)^j = e^{−j/ξ}. "
                   "La lunghezza di correlazione ξ misura quanto sono lunghi i domini.")
        self.play(Create(a), FadeIn(tx, lx, ly), Create(corr), Write(fc), run_time=1.8)
        self.wait(0.8)

        self.passo("Per T → 0 ξ cresce esponenzialmente, come e^{2βε}/2, ma resta finita a ogni temperatura positiva: "
                   "in una dimensione non c'è ordine a lungo raggio.")
        self.play(T.animate.set_value(0.45), run_time=5, rate_func=smooth)
        self.wait(1)

        self.passo("La magnetizzazione esatta, dalla matrice di trasferimento, è M/N = sinh βH / √(sinh²βH + e^{−4βε}). "
                   "Più si raffredda più la curva è ripida, ma passa sempre per zero a H = 0: nessuna magnetizzazione spontanea.")
        celle.clear_updaters()
        self.play(FadeOut(VGroup(a, tx, lx, ly, corr, fc)), run_time=0.6)
        m = assi([-1, 1, 0.5], [-1.1, 1.1, 0.5], x_length=5.6, y_length=2.8).move_to(RIGHT * 3.4 + DOWN * 1.75)
        mtx = tacche(m, [-1, 0, 1], asse="x")
        mlx = formula(r"H/\varepsilon", 26, TENUE).next_to(m.x_axis, DOWN, buff=0.15).align_to(m, RIGHT)
        mly = formula(r"M/N", 26, TENUE).next_to(m, UP, buff=0.08).align_to(m, LEFT)
        mag = lambda H, t: np.sinh(H / t) / np.sqrt(np.sinh(H / t) ** 2 + np.exp(-4 / t))
        curve = VGroup(*[m.plot(lambda H, t=t: mag(H, t), x_range=[-1, 1, 0.005], color=termico(min(1, t / 2.2)),
                                stroke_width=3.5) for t in (2.0, 1.0, 0.5, 0.3)])
        etich = VGroup(*[etichetta(f"T={t}", 14, termico(min(1, t / 2.2))) for t in (2.0, 1.0, 0.5, 0.3)]) \
            .arrange(DOWN, aligned_edge=LEFT, buff=0.06).next_to(m, RIGHT, buff=0.1).align_to(m, DOWN)
        self.play(Create(m), FadeIn(mlx, mly), run_time=0.8)
        self.play(LaggedStart(*[Create(cv) for cv in curve], lag_ratio=0.4), FadeIn(etich), run_time=3)
        self.wait(2.5)


def s_mix(L):
    L = np.clip(L, -0.999999, 0.999999)
    return np.log(2) - 0.5 * ((1 + L) * np.log(1 + L) + (1 - L) * np.log(1 - L))


def libera(L, T, h=0.0):
    """Energia libera di Bragg-Williams per sito, in unità di εγ (T_c = 1)."""
    return -T * s_mix(L) - 0.5 * L ** 2 - h * L


def L_spontanea(T, h=0.0):
    if T >= 1 and h == 0:
        return 0.0
    L = 1.0
    for _ in range(4000):
        L = np.tanh((L + h) / T)
    return L


class BraggWilliams(Lezione):
    USCITA = "ising-bragg-williams"
    TITOLO = "Campo medio di Bragg-Williams"

    def construct(self):
        self.add(titolo("Campo medio di Bragg-Williams", "soluzione grafica ed energia libera di Landau"))
        a = assi([-1.3, 1.3, 0.5], [-1.2, 1.2, 0.5], x_length=5.4, y_length=4.4).move_to(LEFT * 3.5 + DOWN * 0.7)
        lxa = formula(r"L", 28, TENUE).next_to(a.x_axis, RIGHT, buff=0.1)
        T = ValueTracker(1.5)
        retta = a.plot(lambda L: L, x_range=[-1.2, 1.2], color=INCHIOSTRO, stroke_width=3)
        th = always_redraw(lambda: a.plot(lambda L: np.tanh(L / T.get_value()), x_range=[-1.3, 1.3, 0.01],
                                          color=ORO, stroke_width=4))
        sol = always_redraw(lambda: VGroup(*[Dot(a.c2p(x, x), radius=0.09, color=CALDO)
                                             for x in sorted({0.0, L_spontanea(T.get_value()), -L_spontanea(T.get_value())})]))
        feq = formula(r"L=\tanh\!\big[\beta(H_0+\varepsilon\gamma L)\big]", 32).next_to(a, UP, buff=0.25)
        lt = always_redraw(lambda: formula(rf"T/T_c={T.get_value():.2f}", 32, ORO).move_to(RIGHT * 4.6 + UP * 2.55))

        b = assi([-1, 1, 0.5], [-0.2, 0.6, 0.2], x_length=5.4, y_length=4.0).move_to(RIGHT * 3.5 + DOWN * 0.9)
        lxb = formula(r"L", 28, TENUE).next_to(b.x_axis, RIGHT, buff=0.1).shift(UP * 0.0)
        lyb = formula(r"[A(L)-A(0)]/N", 26, TENUE).next_to(b, UP, buff=0.1).align_to(b, LEFT)
        fl = always_redraw(lambda: b.plot(lambda L: libera(L, T.get_value()) - libera(0, T.get_value()),
                                          x_range=[-0.995, 0.995, 0.005], color=CALDO, stroke_width=4))

        self.passo("Bragg-Williams: ogni spin sente il campo esterno più il campo medio εγL dei suoi γ vicini. "
                   "La magnetizzazione per sito L deve risolvere L = tanh[β(H₀ + εγL)]: la retta contro la tangente iperbolica.")
        self.play(Create(a), FadeIn(lxa), Create(retta), Write(feq), FadeIn(lt), run_time=1.6)
        self.play(Create(th), FadeIn(sol), run_time=1.4)
        self.wait(0.8)

        self.passo("Sopra T_c = γε/k_B l'unica intersezione è L = 0, e l'energia libera in funzione di L ha un solo minimo.")
        self.play(Create(b), FadeIn(lxb, lyb), Create(fl), run_time=1.6)
        self.wait(1)

        self.passo("Scendendo sotto T_c la tangente iperbolica diventa più ripida della retta nell'origine: compaiono due "
                   "soluzioni ±L₀. L = 0 diventa un massimo e l'energia libera si piega in due minimi simmetrici.")
        self.play(T.animate.set_value(0.6), run_time=6, rate_func=smooth)
        self.wait(1)

        self.passo("Vicino a T_c la magnetizzazione spontanea cresce come L₀ ≈ √3 (1 − T/T_c)^{1/2}: "
                   "l'esponente critico del campo medio è β = 1/2. Il modello 2D esatto ha invece β = 1/8.")
        c = assi([0, 1.4, 0.2], [0, 1.1, 0.25], x_length=5.4, y_length=4.4).move_to(a)
        ctx = tacche(c, [0, 0.5, 1])
        clx = formula(r"T/T_c", 26, TENUE).next_to(c.x_axis, DOWN, buff=0.4)
        cly = formula(r"L_0", 28, TENUE).next_to(c, UP, buff=0.08).align_to(c, LEFT)
        ts = np.linspace(0.02, 1.4, 300)
        l0 = c.plot_line_graph(ts, [L_spontanea(t) for t in ts], line_color=ORO, add_vertex_dots=False, stroke_width=4)
        appr = c.plot(lambda t: np.sqrt(3 * (1 - t)), x_range=[0.55, 1, 0.005], color=INCHIOSTRO, stroke_width=2.5)
        appr = DashedVMobject(appr, num_dashes=30)
        fappr = formula(r"L_0\simeq\sqrt3\,(1-T/T_c)^{1/2}", 28).next_to(c.c2p(0.05, 0.25), RIGHT, buff=0.05)
        self.play(FadeOut(VGroup(a, lxa, retta, th, sol, feq)), run_time=0.6)
        self.play(Create(c), FadeIn(ctx, clx, cly), run_time=0.8)
        self.play(Create(l0), run_time=2)
        self.play(Create(appr), Write(fappr), run_time=1.5)
        self.wait(1)

        h = ValueTracker(0.0)
        fl.clear_updaters()
        flh = always_redraw(lambda: b.plot(lambda L: libera(L, 0.6, h.get_value()) - libera(0, 0.6, h.get_value()),
                                           x_range=[-0.995, 0.995, 0.005], color=CALDO, stroke_width=4))
        lh = always_redraw(lambda: formula(rf"H_0/\varepsilon\gamma={h.get_value():.2f}", 30, INCHIOSTRO)
                           .next_to(lt, DOWN, buff=0.25))
        self.passo("Un campo esterno H₀ inclina l'energia libera: uno dei due minimi diventa più profondo e la simmetria "
                   "su ↔ giù si rompe. Il sistema sceglie il segno della magnetizzazione dal campo.")
        self.remove(fl)
        self.add(flh)
        self.play(FadeIn(lh), run_time=0.5)
        self.play(h.animate.set_value(0.08), run_time=3, rate_func=smooth)
        self.play(h.animate.set_value(-0.08), run_time=3, rate_func=smooth)
        self.wait(2)
