"""Film per l'articolo sull'insieme canonico."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from math import lgamma

from comune import *


def simula_solido(lato=20, frame=170, scambi=260, seme=2):
    """Solido di Einstein: lato² oscillatori, un quanto ciascuno; scambi casuali di un quanto alla volta."""
    rng = np.random.default_rng(seme)
    M = lato * lato
    n = np.ones(M, dtype=int)
    storia = [n.copy()]
    for _ in range(frame):
        for _ in range(scambi):
            da = rng.integers(M)
            if n[da] == 0:
                continue
            a = rng.integers(M)
            n[da] -= 1
            n[a] += 1
        storia.append(n.copy())
    return np.array(storia)


class SerbatoioBoltzmann(Lezione):
    USCITA = "can-serbatoio"
    TITOLO = "Dal serbatoio al peso di Boltzmann"

    def construct(self):
        self.add(titolo("Dal serbatoio al peso di Boltzmann", "400 oscillatori che si scambiano quanti di energia"))
        lato = 20
        S = simula_solido(lato)
        F = len(S) - 1
        cella = 0.24
        o = LEFT * 4.0 + DOWN * 0.45
        quad = VGroup(*[Square(cella * 0.92, stroke_width=0, fill_opacity=1)
                        .move_to(o + np.array([(i % lato - lato / 2 + 0.5) * cella, (lato / 2 - 0.5 - i // lato) * cella, 0]))
                        for i in range(lato * lato)])
        colori = [ManimColor(SPENTO)] + [termico(min(1.0, 0.15 + 0.17 * k)) for k in range(1, 7)]
        f = ValueTracker(0)

        def agg(g):
            stato = S[int(f.get_value())]
            for q, k in zip(g, stato):
                q.set_fill(colori[min(k, 6)])
        quad.add_updater(agg)
        agg(quad)
        scelto = quad[lato * 9 + 9]
        cornice = Square(cella * 1.15, color=ORO, stroke_width=3).move_to(scelto)
        legenda = VGroup(*[VGroup(Square(0.2, stroke_width=0, fill_opacity=1, fill_color=colori[k]),
                                  etichetta(str(k) if k < 6 else "6+", 14)).arrange(RIGHT, buff=0.08) for k in range(7)])
        legenda.arrange(RIGHT, buff=0.22).next_to(quad, DOWN, buff=0.3)
        quanti = etichetta("quanti per oscillatore", 14).next_to(legenda, DOWN, buff=0.12)

        a = assi([-0.6, 7.6, 1], [0, 0.6, 0.1], x_length=5.8, y_length=4.0).move_to(RIGHT * 3.5 + DOWN * 0.5)
        tx = tacche(a, range(0, 8))
        ty = tacche(a, [0.25, 0.5], asse="y")
        lx = formula(r"n", 28, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        ly = etichetta("frazione di oscillatori", 15).next_to(a, UP, buff=0.12).align_to(a, LEFT)
        col_barre = [ManimColor(FREDDO)] + colori[1:]
        barre = VGroup(*[Rectangle(width=0.55, height=0.01, stroke_width=0, fill_opacity=0.9, fill_color=col_barre[min(k, 6)])
                         for k in range(8)])

        def agg_barre(g):
            stato = S[int(f.get_value())]
            fr = np.bincount(np.minimum(stato, 7), minlength=8) / len(stato)
            for k, b in enumerate(g):
                h = max(a.c2p(0, min(fr[k], 0.6))[1] - a.c2p(0, 0)[1], 0.004)
                b.stretch_to_fit_height(h).move_to(a.c2p(k, 0), aligned_edge=DOWN)
        barre.add_updater(agg_barre)
        agg_barre(barre)

        self.passo("Un solido di Einstein con 400 oscillatori e 400 quanti di energia: all'inizio esattamente un quanto ciascuno. "
                   "Il solido intero è isolato, quindi microcanonico.")
        self.play(FadeIn(quad), FadeIn(legenda, quanti), run_time=1.2)
        self.play(Create(a), FadeIn(tx, ty, lx, ly), FadeIn(barre), run_time=1.2)
        self.wait(0.8)

        self.passo("Gli oscillatori si scambiano quanti a caso. Tutte le configurazioni con la stessa energia totale "
                   "sono ugualmente probabili, e la distribuzione dei quanti cambia forma.")
        self.play(f.animate.set_value(F * 0.6), run_time=6, rate_func=linear)

        self.passo("Fissiamo lo sguardo su un oscillatore: tutti gli altri gli fanno da serbatoio. La probabilità che abbia "
                   "n quanti decresce in modo geometrico, cioè come e^{−βεn}: il peso di Boltzmann.")
        self.play(Create(cornice), run_time=0.6)
        teoria = a.plot(lambda x: 0.5 ** (x + 1), x_range=[0, 7.5], color=ORO, stroke_width=4)
        punti_t = VGroup(*[Dot(a.c2p(k, 0.5 ** (k + 1)), radius=0.06, color=ORO) for k in range(8)])
        fb = formula(r"P(n)=\frac{e^{-\beta\varepsilon n}}{\sum_m e^{-\beta\varepsilon m}}", 36, ORO).move_to(RIGHT * 4.4 + UP * 2.6)
        self.play(f.animate.set_value(F), Create(teoria), FadeIn(punti_t), Write(fb), run_time=4, rate_func=linear)
        quad.clear_updaters()
        barre.clear_updaters()
        self.wait(1)

        self.passo("In scala logaritmica la distribuzione è una retta. La pendenza è −βε: è il serbatoio a fissare β, "
                   "e quindi la temperatura del piccolo sistema.")
        stato = S[-1]
        fr = np.bincount(np.minimum(stato, 9), minlength=10) / len(stato)
        b = assi([-0.6, 7.6, 1], [-6, 0, 1], x_length=5.8, y_length=4.0).move_to(a)
        btx = tacche(b, range(0, 7))
        bty = tacche(b, [-6, -4, -2, 0], asse="y")
        bly = formula(r"\log P(n)", 26, TENUE).next_to(b, UP, buff=0.12).align_to(b, LEFT)
        dati = VGroup(*[Dot(b.c2p(k, np.log(fr[k])), radius=0.08, color=INCHIOSTRO) for k in range(7) if fr[k] > 0])
        retta = b.plot(lambda x: -np.log(2) * (x + 1), x_range=[0, 6.8], color=ORO, stroke_width=4)
        pend = formula(r"\text{pendenza}=-\beta\varepsilon", 32, ORO).next_to(b.c2p(4.2, -2.3), UP + RIGHT, buff=0.1)
        self.play(FadeOut(VGroup(barre, teoria, punti_t, a, tx, ty, ly)), run_time=0.6)
        self.play(Create(b), FadeIn(btx, bty, bly), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(d, scale=2) for d in dati], lag_ratio=0.15), run_time=1.4)
        self.play(Create(retta), Write(pend), run_time=1.5)
        self.wait(2.5)


class PiccoEnergia(Lezione):
    USCITA = "can-picco-energia"
    TITOLO = "Distribuzione dell'energia ed equivalenza degli ensemble"

    def construct(self):
        self.add(titolo("Distribuzione dell'energia", "numero di stati contro peso di Boltzmann"))
        a = assi([0, 3, 0.5], [0, 1.15, 0.25], x_length=7.6, y_length=4.4).move_to(LEFT * 1.6 + DOWN * 0.6)
        tx = tacche(a, [0, 1, 2, 3])
        lx = formula(r"E/\langle E\rangle", 28, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        k = ValueTracker(3)

        def norm_max(fun):
            xs = np.linspace(0.005, 3, 600)
            m = max(fun(x) for x in xs)
            return lambda x: fun(x) / m

        def dens(kk):
            # E/<E> ha distribuzione gamma di forma kk = f/2 e media 1
            return lambda x: np.exp(kk * np.log(kk) + (kk - 1) * np.log(x) - kk * x - lgamma(kk)) if x > 0 else 0.0

        stati = always_redraw(lambda: a.plot(norm_max(lambda x: x ** (k.get_value() - 1) * 1.0), x_range=[0.005, 3, 0.01],
                                             color=FREDDO, stroke_width=3.5))
        boltz = always_redraw(lambda: a.plot(lambda x: np.exp(-k.get_value() * x) / np.exp(-k.get_value() * 0.005),
                                             x_range=[0.005, 3, 0.01], color=CALDO, stroke_width=3.5))
        prod = always_redraw(lambda: a.plot(norm_max(dens(k.get_value())), x_range=[0.005, 3, 0.005],
                                            color=ORO, stroke_width=5))
        fg = formula(r"\Gamma(E)\propto E^{f/2-1}", 32, FREDDO).move_to(RIGHT * 4.6 + UP * 1.7)
        fb = formula(r"e^{-\beta E}", 34, CALDO).next_to(fg, DOWN, buff=0.35)
        fp = formula(r"P(E)\propto\Gamma(E)\,e^{-\beta E}", 34, ORO).next_to(fb, DOWN, buff=0.35)
        lettura = always_redraw(lambda: VGroup(
            etichetta(f"gradi di libertà f = {2 * k.get_value():.0f}", 18, INCHIOSTRO),
            etichetta(f"σ_E/⟨E⟩ = {1 / np.sqrt(k.get_value()):.3f}", 18, ORO),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(RIGHT * 4.6 + DOWN * 1.6))

        self.passo("Per un gas perfetto con f gradi di libertà il numero di stati cresce come una potenza di E, "
                   "mentre il peso di Boltzmann decresce esponenzialmente. Qui con f = 6.")
        self.play(Create(a), FadeIn(tx, lx), run_time=1)
        self.play(Create(stati), Write(fg), run_time=1.4)
        self.play(Create(boltz), Write(fb), run_time=1.4)
        self.wait(1)

        self.passo("Il prodotto Γ(E)e^{−βE} ha un massimo: è il minimo di E − TS(E), cioè l'energia libera. "
                   "La probabilità dell'energia è concentrata attorno a quel valore.")
        self.play(Create(prod), Write(fp), FadeIn(lettura), run_time=1.8)
        self.wait(1.2)

        self.passo("Aumentando i gradi di libertà il picco si stringe: la larghezza relativa va come 1/√f, cioè come N^{−1/2}. "
                   "Con f = 6000 la curva è già quasi una riga.")
        self.play(k.animate.set_value(30), run_time=3, rate_func=smooth)
        self.play(k.animate.set_value(3000), run_time=4, rate_func=rate_functions.ease_in_quad)
        self.wait(1)

        eq = formula(r"\langle\Delta H^2\rangle=k_BT^2C_V\ \Rightarrow\ \frac{\sigma_E}{\langle E\rangle}\sim\frac{1}{\sqrt N}", 34)
        eq.move_to(LEFT * 1.6 + UP * 2.2)
        self.passo("Nel limite termodinamico il sistema canonico ha in pratica un'energia sola, e le medie canoniche coincidono "
                   "con quelle microcanoniche a quell'energia: è l'equivalenza degli ensemble.")
        self.play(Write(eq), run_time=1.6)
        self.play(Circumscribe(eq, color=ORO), run_time=1.4)
        self.wait(2)
