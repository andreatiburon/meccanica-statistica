"""Film per l'articolo sull'insieme gran canonico e NPT."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from comune import *


def simula_finestra(n=500, frame=330, lato=0.3, seme=5):
    """Gas ideale balistico in una scatola unitaria; conta le particelle in una finestra centrale."""
    rng = np.random.default_rng(seme)
    pos = rng.uniform(0, 1, (n, 2))
    vel = rng.normal(0, 0.008, (n, 2))
    a, b = 0.5 - lato / 2, 0.5 + lato / 2
    storia, conteggi = [], []
    for _ in range(frame):
        pos += vel
        for k in range(2):
            basso, alto = pos[:, k] < 0, pos[:, k] > 1
            pos[basso, k] *= -1
            pos[alto, k] = 2 - pos[alto, k]
            vel[basso | alto, k] *= -1
        dentro = (pos[:, 0] > a) & (pos[:, 0] < b) & (pos[:, 1] > a) & (pos[:, 1] < b)
        storia.append((pos.copy(), dentro.copy()))
        conteggi.append(int(dentro.sum()))
    return storia, np.array(conteggi), n * lato * lato


class FluttuazioniN(Lezione):
    USCITA = "gc-fluttuazioni-n"
    TITOLO = "Fluttuazioni del numero di particelle"

    def construct(self):
        self.add(titolo("Fluttuazioni del numero di particelle", "una regione aperta di un gas ideale"))
        storia, conta, media = simula_finestra()
        F = len(storia)
        L = 5.2
        scatola = Square(L, color=TENUE, stroke_width=2).move_to(LEFT * 3.7 + DOWN * 0.45)
        o = scatola.get_corner(DL)
        fin = DashedVMobject(Square(L * 0.3, color=ORO, stroke_width=3).move_to(scatola), num_dashes=40)
        punti = VGroup(*[Dot(radius=0.035) for _ in range(len(storia[0][0]))])
        f = ValueTracker(0)

        def agg(g):
            pos, dentro = storia[int(f.get_value())]
            for d, p, dd in zip(g, pos, dentro):
                d.move_to(o + np.array([p[0] * L, p[1] * L, 0]))
                d.set_color(ORO if dd else FREDDO).set_opacity(1 if dd else 0.55)
        punti.add_updater(agg)
        agg(punti)

        t = assi([0, F, 50], [20, 70, 10], x_length=5.8, y_length=2.0).move_to(RIGHT * 3.6 + UP * 1.35)
        tly = formula(r"N(t)", 26, TENUE).next_to(t, UP, buff=0.1).align_to(t, LEFT)
        tty = tacche(t, [30, 45, 60], asse="y")
        mline = DashedLine(t.c2p(0, media), t.c2p(F, media), color=TENUE, stroke_width=2)
        traccia = always_redraw(lambda: VMobject(stroke_color=ORO, stroke_width=2.5).set_points_as_corners(
            [t.c2p(k, conta[k]) for k in range(max(int(f.get_value()), 1) + 1)]))

        h = assi([20, 70, 10], [0, 0.07, 0.02], x_length=5.8, y_length=2.4).move_to(RIGHT * 3.6 + DOWN * 2.0)
        htx = tacche(h, [30, 45, 60])
        hlx = formula(r"N", 26, TENUE).next_to(h.x_axis, DOWN, buff=0.4)
        bordi = np.arange(20.5, 70.5, 2)

        def istogramma():
            k = max(int(f.get_value()), 1)
            cont, _ = np.histogram(conta[:k + 1], bins=bordi, density=True)
            g = VGroup()
            for x0, c in zip(bordi[:-1], cont):
                alt = h.c2p(0, min(c, 0.07))[1] - h.c2p(0, 0)[1]
                if alt > 0.003:
                    g.add(Rectangle(width=h.x_length / 50 * 2 * 0.85, height=alt, stroke_width=0, fill_color=FREDDO,
                                    fill_opacity=0.85).move_to(h.c2p(x0 + 1, 0), aligned_edge=DOWN))
            return g
        barre = always_redraw(istogramma)

        self.passo("Un gas ideale in una scatola. Osserviamo solo la regione tratteggiata: scambia particelle ed energia "
                   "con il resto del gas, che le fa da serbatoio. È un sistema gran canonico.")
        self.play(Create(scatola), FadeIn(punti), run_time=1)
        self.play(Create(fin), run_time=0.8)
        self.play(f.animate.set_value(40), run_time=1.6, rate_func=linear)

        self.passo("Il numero di particelle nella regione, in oro, cambia di continuo e oscilla attorno alla media ⟨N⟩ = 45.")
        self.play(Create(t), FadeIn(tly, tty), Create(mline), run_time=1)
        self.add(traccia)
        self.play(f.animate.set_value(150), run_time=4.5, rate_func=linear)

        var = media * (1 - 0.09)
        teo = h.plot(lambda x: np.exp(-(x - media) ** 2 / (2 * var)) / np.sqrt(2 * np.pi * var),
                     x_range=[20, 70, 0.2], color=ORO, stroke_width=4)
        fv = formula(r"\langle\Delta N^2\rangle=\langle N\rangle\,k_BT\,\rho\,K_T", 32).move_to(RIGHT * 3.6 + DOWN * 0.15)
        self.passo("L'istogramma dei valori di N è una gaussiana con varianza ⟨ΔN²⟩ = ⟨N⟩k_BTρK_T. Per il gas ideale "
                   "K_T = 1/P e la varianza vale ⟨N⟩; qui un po' meno, ⟨N⟩(1 − 0,09), perché il serbatoio ha solo 500 particelle.")
        self.play(Create(h), FadeIn(htx, hlx), run_time=0.8)
        self.add(barre)
        self.play(f.animate.set_value(F - 1), run_time=7, rate_func=linear)
        self.play(Create(teo), Write(fv), run_time=1.5)
        punti.clear_updaters()
        self.wait(1)

        rel = formula(r"\frac{\sqrt{\langle\Delta N^2\rangle}}{\langle N\rangle}\sim\frac{1}{\sqrt{\langle N\rangle}}", 36, ORO)
        rel.move_to(scatola)
        self.passo("Le fluttuazioni relative vanno come 1/√⟨N⟩: trascurabili per un sistema macroscopico. "
                   "Divergono solo dove diverge K_T, cioè al punto critico.")
        self.play(FadeOut(punti, fin), scatola.animate.set_stroke(opacity=0.25), run_time=0.6)
        self.play(Write(rel), run_time=1.5)
        self.wait(2.5)


def simula_pistone(n=120, M=30.0, F=150.0, passi=14000, ogni=50, dt=0.0018, seme=8):
    """Gas ideale 2D sotto un pistone di massa M spinto verso il basso da una forza costante F."""
    rng = np.random.default_rng(seme)
    x = rng.uniform(0, 1, n)
    y = rng.uniform(0, 0.95, n)
    vx, vy = rng.normal(0, 1, n), rng.normal(0, 1, n)
    h, V = 1.0, 0.0
    hs, fotogrammi = [], []
    for s in range(passi):
        x += vx * dt
        y += vy * dt
        V -= F / M * dt
        h += V * dt
        for arr, varr in ((x, vx),):
            basso, alto = arr < 0, arr > 1
            arr[basso] *= -1
            arr[alto] = 2 - arr[alto]
            varr[basso | alto] *= -1
        basso = y < 0
        y[basso] *= -1
        vy[basso] *= -1
        urti = np.where((y > h) & (vy > V))[0]
        for i in urti:
            v1 = ((1 - M) * vy[i] + 2 * M * V) / (1 + M)
            V = ((M - 1) * V + 2 * vy[i]) / (1 + M)
            vy[i] = v1
            y[i] = 2 * h - y[i]
        y = np.minimum(y, h - 1e-4)
        if s % ogni == 0:
            hs.append(h)
            fotogrammi.append((x.copy(), y.copy(), h, np.hypot(vx, vy).copy()))
    kT = np.mean(vx ** 2 + vy ** 2) / 2
    return fotogrammi, np.array(hs), kT, F


class PistoneNPT(Lezione):
    USCITA = "gc-npt"
    TITOLO = "Insieme NPT: un gas sotto un pistone"

    def construct(self):
        self.add(titolo("Insieme NPT", "pressione fissata, volume che fluttua"))
        fot, hs, kT, Fz = simula_pistone()
        F = len(fot)
        W, H = 3.6, 5.6
        base = LEFT * 3.8 + DOWN * 3.2
        pareti = VMobject(color=TENUE, stroke_width=3).set_points_as_corners(
            [base + UP * H + LEFT * W / 2, base + LEFT * W / 2, base + RIGHT * W / 2, base + UP * H + RIGHT * W / 2])
        scala_y = H / 1.3
        f = ValueTracker(0)
        punti = VGroup(*[Dot(radius=0.04) for _ in range(len(fot[0][0]))])
        pistone = Rectangle(width=W - 0.06, height=0.22, stroke_width=0, fill_color=INCHIOSTRO, fill_opacity=0.9)
        peso = VGroup(*[Arrow(UP * 0.7, ORIGIN, buff=0, color=CALDO, stroke_width=4, max_tip_length_to_length_ratio=0.3)
                        .shift(RIGHT * dx) for dx in (-1.0, 0, 1.0)])
        lP = formula(r"P", 30, CALDO)

        def agg(g):
            x, y, h, v = fot[int(f.get_value())]
            for d, xi, yi, vi in zip(g, x, y, v):
                d.move_to(base + LEFT * W / 2 + np.array([xi * W, yi * scala_y, 0]))
                d.set_color(termico(vi / 3.2))
            yp = base + UP * (h * scala_y + 0.11)
            pistone.move_to(yp)
            peso.move_to(yp + UP * 0.5)
            lP.next_to(peso, RIGHT, buff=0.15)
        punti.add_updater(agg)
        agg(punti)

        self.passo("Un gas ideale chiuso da un pistone mobile, premuto da una pressione esterna P costante. "
                   "Il volume non è più fissato: è una variabile che fluttua.")
        self.play(Create(pareti), FadeIn(punti, pistone, peso, lP), run_time=1.2)

        t = assi([0, F, 50], [0.6, 1.05, 0.1], x_length=5.8, y_length=2.2).move_to(RIGHT * 3.4 + UP * 1.2)
        tly = formula(r"V(t)", 26, TENUE).next_to(t, UP, buff=0.1).align_to(t, LEFT)
        traccia = always_redraw(lambda: VMobject(stroke_color=INCHIOSTRO, stroke_width=2.5).set_points_as_corners(
            [t.c2p(k, hs[k]) for k in range(max(int(f.get_value()), 1) + 1)]))
        self.passo("Partito troppo in alto, il pistone scende, rimbalza e si assesta: il volume oscilla attorno al valore "
                   "in cui la pressione del gas bilancia P.")
        self.play(Create(t), FadeIn(tly), run_time=0.8)
        self.add(traccia)
        self.play(f.animate.set_value(int(F * 0.45)), run_time=6, rate_func=linear)

        k0 = int(F * 0.3)
        Vm = hs[k0:].mean()
        h = assi([0.6, 1.05, 0.1], [0, 1, 0.5], x_length=5.8, y_length=2.0).move_to(RIGHT * 3.4 + DOWN * 1.9)
        hlx = formula(r"V", 26, TENUE).next_to(h.x_axis, DOWN, buff=0.35)
        bordi = np.linspace(0.6, 1.05, 31)

        def istogramma():
            k = max(int(f.get_value()), k0 + 2)
            c, _ = np.histogram(hs[k0:k + 1], bins=bordi)
            c = c / max(c.max(), 1)
            g = VGroup()
            for x0, ci in zip(bordi[:-1], c):
                alt = h.c2p(0, ci)[1] - h.c2p(0, 0)[1]
                if alt > 0.003:
                    g.add(Rectangle(width=h.x_length / 30 * 0.85, height=alt, stroke_width=0, fill_color=CALDO,
                                    fill_opacity=0.85).move_to(h.c2p(x0 + (bordi[1] - bordi[0]) / 2, 0), aligned_edge=DOWN))
            return g
        media = DashedLine(h.c2p(Vm, 0), h.c2p(Vm, 1.05), color=ORO, stroke_width=3)
        lm = formula(r"\bar V", 28, ORO).next_to(media, UP, buff=0.08)
        self.passo("L'istogramma dei volumi, preso dopo l'assestamento, è piccato attorno a V̄. "
                   "Il peso di ogni volume è e^{−βPV} Q_N(V,T).")
        self.play(Create(h), FadeIn(hlx), run_time=0.8)
        self.add(always_redraw(istogramma))
        self.play(f.animate.set_value(F - 1), run_time=7, rate_func=linear)
        self.play(Create(media), FadeIn(lm), run_time=0.8)
        punti.clear_updaters()

        g1 = formula(r"e^{-\beta G(N,P,T)}=\int\!dV\,e^{-\beta PV}\,Q_N(V,T)", 32).move_to(LEFT * 3.4 + UP * 2.6)
        g2 = formula(r"P+\frac{\partial A}{\partial V}\Big|_{\bar V}=0\ \Rightarrow\ G=P\bar V+A(\bar V)", 32, ORO)
        self.passo("L'insieme NPT somma i canonici di tutti i volumi con peso e^{−βPV}. Il punto di sella in V̄ "
                   "impone che la pressione del gas eguagli P, e dà l'energia libera di Gibbs G = PV̄ + A(V̄).")
        self.play(FadeOut(pareti, punti, pistone, peso, lP), run_time=0.6)
        g1.move_to(LEFT * 3.6 + UP * 0.6)
        g2.next_to(g1, DOWN, buff=0.5)
        self.play(Write(g1), run_time=1.5)
        self.play(Write(g2), run_time=1.5)
        self.wait(2.5)
