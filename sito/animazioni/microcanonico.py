"""Film per l'articolo sull'insieme microcanonico."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from math import lgamma

from comune import *


def log_omega(N, q):
    """log del numero di microstati di un solido di Einstein: binom(q+N-1, q)."""
    return lgamma(q + N) - lgamma(q + 1) - lgamma(N)


def divisione(N, q):
    """Probabilità di ogni divisione q1 dei q quanti tra due solidi uguali di N oscillatori."""
    q1 = np.arange(q + 1)
    lp = np.array([log_omega(N, a) + log_omega(N, q - a) for a in q1])
    p = np.exp(lp - lp.max())
    return q1 / q, p / p.sum(), lp


class ScambioEnergia(Lezione):
    USCITA = "micro-scambio-energia"
    TITOLO = "Due sistemi che si scambiano energia"

    def construct(self):
        self.add(titolo("Due sistemi che si scambiano energia", "solidi di Einstein a contatto termico"))
        # i due sistemi
        s1 = RoundedRectangle(width=2.6, height=1.5, corner_radius=0.08, color=FREDDO).move_to(LEFT * 4.6 + UP * 1.2)
        s2 = RoundedRectangle(width=2.6, height=1.5, corner_radius=0.08, color=CALDO).move_to(LEFT * 1.6 + UP * 1.2)
        n1 = formula(r"N,\ q_1", 30).move_to(s1)
        n2 = formula(r"N,\ q-q_1", 30).move_to(s2)
        om = formula(r"\Omega(N,q)=\binom{q+N-1}{q}", 34).next_to(VGroup(s1, s2), DOWN, buff=0.45)
        prod = formula(r"P(q_1)\propto\Omega(N,q_1)\,\Omega(N,q-q_1)", 34).next_to(om, DOWN, buff=0.3)
        self.passo("Due solidi di Einstein, ciascuno con N oscillatori, si dividono q quanti di energia. "
                   "Un solido con q quanti ha Ω(N,q) microstati: il numero di modi di distribuirli.")
        self.play(Create(s1), Create(s2), Write(n1), Write(n2), run_time=1.2)
        self.play(Write(om), run_time=1.2)
        self.play(Write(prod), run_time=1.2)
        self.wait(1)

        a = assi([0, 1, 0.25], [0, 1.1, 0.5], x_length=6.2, y_length=4.2).move_to(RIGHT * 3.3 + DOWN * 0.6)
        lx = formula(r"q_1/q", 26, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        tx = tacche(a, [0, 0.5, 1])
        ly = etichetta("probabilità (picco = 1)", 15).next_to(a, UP, buff=0.15).align_to(a, LEFT)
        self.play(Create(a), FadeIn(lx, tx, ly), run_time=1)

        def barre(N, q, colore):
            x, p, _ = divisione(N, q)
            p = p / p.max()
            w = a.x_length / (q + 1) * 0.86
            g = VGroup(*[Rectangle(width=w, height=max(a.c2p(0, pi)[1] - a.c2p(0, 0)[1], 0.002),
                                   stroke_width=0, fill_color=colore, fill_opacity=0.9)
                         .move_to(a.c2p(xi, 0), aligned_edge=DOWN) for xi, pi in zip(x, p)])
            return g

        def curva(N, q, colore):
            x, p, _ = divisione(N, q)
            p = p / p.max()
            return a.plot_line_graph(x, p, line_color=colore, add_vertex_dots=False, stroke_width=4)

        etich = etichetta("N = 3,  q = 6", 18, INCHIOSTRO).next_to(a, UP, buff=0.15).align_to(a, RIGHT)
        b3 = barre(3, 6, FREDDO)
        self.passo("Con soli 3 oscillatori per parte e 6 quanti, le divisioni hanno probabilità confrontabili: "
                   "l'energia del sistema 1 fluttua moltissimo.")
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in b3], lag_ratio=0.08), FadeIn(etich), run_time=1.6)
        self.wait(1.5)

        b30 = barre(30, 60, INCHIOSTRO)
        e30 = etichetta("N = 30,  q = 60", 18, INCHIOSTRO).move_to(etich)
        self.passo("Con 30 oscillatori per parte il prodotto Ω₁Ω₂ ha già un picco netto: "
                   "la divisione a metà è di gran lunga la più probabile.")
        self.play(ReplacementTransform(b3, b30), Transform(etich, e30), run_time=1.5)
        self.wait(1.5)

        c300 = curva(300, 600, CALDO)
        c3000 = curva(3000, 6000, ORO)
        e3 = etichetta("N = 300 e N = 3000", 18, INCHIOSTRO).move_to(etich)
        larg = formula(r"\frac{\sigma_{q_1}}{\langle q_1\rangle}\sim\frac{1}{\sqrt N}", 34, ORO).move_to(LEFT * 3.2 + DOWN * 2.2)
        self.passo("Con 300 e 3000 oscillatori il picco si stringe ancora: la larghezza relativa scala come 1/√N. "
                   "Per N ≈ 10²³ la divisione più probabile è, in pratica, certa.")
        self.play(b30.animate.set_opacity(0.25), Create(c300), Transform(etich, e3), run_time=1.5)
        self.play(Create(c3000), Write(larg), run_time=1.5)
        self.wait(1.5)

        # entropie
        self.passo("Al massimo del prodotto vale d(log Ω₁Ω₂)/dq₁ = 0, cioè ∂S₁/∂E₁ = ∂S₂/∂E₂: "
                   "all'equilibrio le temperature sono uguali. È così che si definisce 1/T = ∂S/∂E.")
        self.play(FadeOut(VGroup(b30, c300, c3000, etich, ly, a, lx, tx, larg)), run_time=0.8)
        N, q = 30, 60
        b = assi([0, 60, 15], [0, 80, 20], x_length=6.2, y_length=4.2).move_to(RIGHT * 3.3 + DOWN * 0.6)
        bx = tacche(b, [0, 30, 60])
        blx = formula(r"q_1", 26, TENUE).next_to(b.x_axis, DOWN, buff=0.45)
        S1 = b.plot(lambda x: log_omega(N, x), x_range=[0, 60], color=FREDDO, stroke_width=4)
        S2 = b.plot(lambda x: log_omega(N, q - x), x_range=[0, 60], color=CALDO, stroke_width=4)
        St = b.plot(lambda x: log_omega(N, x) + log_omega(N, q - x), x_range=[0, 60], color=ORO, stroke_width=4)
        l1 = formula(r"S_1/k_B", 26, FREDDO).next_to(b.c2p(50, log_omega(N, 50)), DOWN + RIGHT, buff=0.1)
        l2 = formula(r"S_2/k_B", 26, CALDO).next_to(b.c2p(10, log_omega(N, 50)), DOWN + LEFT, buff=0.1)
        lt = formula(r"(S_1+S_2)/k_B", 26, ORO).next_to(b.c2p(30, 2 * log_omega(N, 30)), UP, buff=0.12)
        self.play(Create(b), FadeIn(bx, blx), Create(S1), Create(S2), FadeIn(l1, l2), run_time=1.5)
        self.play(Create(St), FadeIn(lt), run_time=1.2)
        d = 1e-3
        k1 = (log_omega(N, 30 + d) - log_omega(N, 30 - d)) / (2 * d)
        t1 = b.plot(lambda x: log_omega(N, 30) + k1 * (x - 30), x_range=[18, 42], color=INCHIOSTRO, stroke_width=2.5)
        t2 = b.plot(lambda x: log_omega(N, 30) - k1 * (x - 30), x_range=[18, 42], color=INCHIOSTRO, stroke_width=2.5)
        ugua = formula(r"\frac{\partial S_1}{\partial E_1}=\frac{\partial S_2}{\partial E_2}\ \Longrightarrow\ T_1=T_2", 36)
        ugua.move_to(LEFT * 3.4 + DOWN * 2.3)
        self.play(Create(t1), Create(t2), Write(ugua), run_time=1.5)
        self.wait(2.5)


class ParadossoGibbs(Lezione):
    USCITA = "micro-gibbs"
    TITOLO = "Il paradosso di Gibbs"

    def construct(self):
        self.add(titolo("Il paradosso di Gibbs", "mescolare due gas, o lo stesso gas due volte"))
        L = 5.0
        scatola = Rectangle(width=L, height=L * 0.62, color=TENUE, stroke_width=2).move_to(LEFT * 3.6 + DOWN * 0.3)
        setto = Line(scatola.get_top(), scatola.get_bottom(), color=INCHIOSTRO, stroke_width=4)
        o = scatola.get_corner(DL)
        W, H = L, L * 0.62
        rng = np.random.default_rng(4)
        n = 60
        F1, F2 = 70, 170

        def cammino(confinati_prima, frame_totali):
            pos = np.c_[rng.uniform(0, 0.5, n // 2).tolist() + rng.uniform(0.5, 1, n // 2).tolist(), rng.uniform(0, 1, n)]
            vel = rng.normal(0, 0.012, (n, 2))
            storia = []
            for f in range(frame_totali):
                vel += rng.normal(0, 0.005, (n, 2))
                vel *= 0.96
                pos += vel
                for k in range(2):
                    basso, alto = pos[:, k] < 0.02, pos[:, k] > 0.98
                    pos[basso, k] = 0.04 - pos[basso, k]
                    pos[alto, k] = 1.96 - pos[alto, k]
                    vel[basso, k] = np.abs(vel[basso, k])
                    vel[alto, k] = -np.abs(vel[alto, k])
                if f < confinati_prima:
                    sx = np.arange(n) < n // 2
                    pos[sx, 0] = np.minimum(pos[sx, 0], 0.49)
                    pos[~sx, 0] = np.maximum(pos[~sx, 0], 0.51)
                storia.append(pos.copy())
            return np.array(storia)

        def particelle(colori):
            return VGroup(*[Dot(radius=0.07, color=c) for c in colori])

        def anima(punti, storia, inizio, fine, durata):
            f = ValueTracker(inizio)

            def agg(g):
                k = int(f.get_value())
                for d, p in zip(g, storia[k]):
                    d.move_to(o + np.array([p[0] * W, p[1] * H, 0]))
            punti.add_updater(agg)
            agg(punti)
            self.play(f.animate.set_value(fine), run_time=durata, rate_func=linear)
            punti.clear_updaters()

        storia = cammino(F1, F1 + F2)
        punti = particelle([FREDDO] * (n // 2) + [CALDO] * (n // 2))
        self.passo("Due gas diversi alla stessa temperatura e pressione, separati da un setto: "
                   "N/2 particelle blu a sinistra, N/2 arancio a destra.")
        self.play(Create(scatola), Create(setto), run_time=1)
        self.add(punti)
        anima(punti, storia, 0, F1 - 1, 2.5)

        smix = MathTex(r"\Delta S_{\rm mix}=k_B\left[N\log N-N_1\log N_1-N_2\log N_2\right]", r"=N k_B\log 2",
                       font_size=32, color=INCHIOSTRO)
        smix[1].next_to(smix[0], DOWN, buff=0.15).align_to(smix[0], RIGHT)
        smix.move_to(RIGHT * 3.3 + UP * 1.7)
        self.passo("Togliendo il setto i due gas si mescolano e il processo è irreversibile: "
                   "l'entropia cresce dell'entropia di mescolamento, N k_B log 2 per due metà uguali.")
        self.play(FadeOut(setto), run_time=0.6)
        anima(punti, storia, F1 - 1, F1 + F2 - 1, 5)
        self.play(Write(smix), run_time=1.5)
        self.wait(1.5)

        storia2 = cammino(F1, F1 + F2)
        punti2 = particelle([FREDDO] * n)
        setto2 = setto.copy()
        self.passo("Ora lo stesso gas da tutte e due le parti. Togliere il setto non cambia nulla di misurabile: "
                   "rimettendolo si torna allo stato di partenza.")
        self.play(FadeOut(punti), FadeIn(setto2), smix.animate.set_opacity(0.35), run_time=0.8)
        self.add(punti2)
        anima(punti2, storia2, 0, F1 - 1, 1.5)
        self.play(FadeOut(setto2), run_time=0.6)
        anima(punti2, storia2, F1 - 1, F1 + F2 - 1, 4)

        sbag = MathTex(r"S=Nk_B\log\Big[\,", r"V", r"\Big(\frac{4\pi m E}{3h^2N}\Big)^{3/2}\Big]+\frac32Nk_B",
                       font_size=34, color=INCHIOSTRO)
        sbag.move_to(RIGHT * 3.3 + DOWN * 0.1)
        sbag[1].set_color(CALDO)
        self.passo("Eppure, contando le particelle come distinguibili, la formula dell'entropia dà ancora ΔS > 0: "
                   "dipende da V e non da V/N, quindi non è estensiva. È il paradosso di Gibbs.")
        self.play(Write(sbag), run_time=1.6)
        self.play(Indicate(sbag[1], color=CALDO, scale_factor=1.6), run_time=1.2)
        self.wait(1.5)

        giusta = formula(r"S=Nk_B\log\Big[\,\frac{V}{N}\Big(\frac{4\pi m E}{3h^2N}\Big)^{3/2}\Big]+\frac52Nk_B", 34)
        giusta.move_to(RIGHT * 3.3 + DOWN * 2.3)
        cura = nota("dividendo per N! le permutazioni di particelle identiche", 22, ORO).next_to(giusta, UP, buff=0.18)
        self.passo("Gibbs divide il numero di stati per N!, le permutazioni di particelle identiche. "
                   "V diventa V/N, l'entropia diventa estensiva e il mescolamento dello stesso gas non produce entropia.")
        self.play(FadeIn(cura), Write(giusta), run_time=1.8)
        self.play(Circumscribe(giusta, color=ORO), run_time=1.5)
        self.wait(2)


class DueLivelli(Lezione):
    USCITA = "micro-due-livelli"
    TITOLO = "Sistema a due livelli e temperature negative"

    def construct(self):
        self.add(titolo("Sistema a due livelli", "entropia, temperature negative, picco di Schottky"))
        N = 24
        base = LEFT * 4.3 + DOWN * 1.6
        l0 = Line(base + LEFT * 2.2, base + RIGHT * 2.2, color=TENUE, stroke_width=3)
        l1 = Line(base + UP * 2.6 + LEFT * 2.2, base + UP * 2.6 + RIGHT * 2.2, color=TENUE, stroke_width=3)
        e0 = formula(r"0", 28, TENUE).next_to(l0, LEFT, buff=0.2)
        e1 = formula(r"\varepsilon", 30, TENUE).next_to(l1, LEFT, buff=0.2)
        xs = np.linspace(-2.0, 2.0, N)
        punti = VGroup(*[Dot(base + RIGHT * x + UP * 0.14, radius=0.08, color=FREDDO) for x in xs])
        n_tr = ValueTracker(0)

        def agg(g):
            n = int(round(n_tr.get_value()))
            for i, d in enumerate(g):
                su = i % 2 == 0 and i // 2 < n or i % 2 == 1 and (N // 2 + i // 2) < n
                d.move_to(base + RIGHT * xs[i] + UP * (2.6 + 0.14 if su else 0.14))
                d.set_color(CALDO if su else FREDDO)
        punti.add_updater(agg)
        conta = formula(r"\Gamma=\binom{N}{n}", 34).move_to(LEFT * 4.3 + UP * 1.75)

        a = assi([0, 1, 0.25], [0, 0.8, 0.2], x_length=6.0, y_length=4.0).move_to(RIGHT * 3.4 + DOWN * 0.5)
        tx = tacche(a, [0, 0.5, 1])
        lx = formula(r"E/N\varepsilon=n/N", 26, TENUE).next_to(a.x_axis, DOWN, buff=0.45)
        ly = formula(r"S/Nk_B", 26, TENUE).next_to(a, UP, buff=0.12).align_to(a, LEFT)
        s = lambda x: -(x * np.log(x) + (1 - x) * np.log(1 - x)) if 0 < x < 1 else 0.0
        curva = a.plot(s, x_range=[0.001, 0.999, 0.002], color=ORO, stroke_width=4)

        self.passo("N particelle, ciascuna sul livello 0 o sul livello ε. Con n particelle eccitate l'energia è E = nε "
                   "e i microstati sono i modi di scegliere quali: Γ = N!/(n!(N−n)!).")
        self.play(Create(l0), Create(l1), FadeIn(e0, e1), FadeIn(punti), Write(conta), run_time=1.5)
        self.play(n_tr.animate.set_value(6), run_time=1.5)
        self.wait(0.8)

        self.passo("L'entropia S = k_B log Γ, per N grande, è la funzione −x log x − (1−x) log(1−x) di x = n/N: "
                   "nulla con tutti giù o tutti su, massima a metà.")
        self.play(Create(a), FadeIn(tx, lx, ly), Create(curva), run_time=1.8)
        self.wait(0.8)

        xv = ValueTracker(6 / N)
        tang = always_redraw(lambda: a.plot(
            lambda x: s(xv.get_value()) + np.log((1 - xv.get_value()) / xv.get_value()) * (x - xv.get_value()),
            x_range=[max(0.0, xv.get_value() - 0.18), min(1.0, xv.get_value() + 0.18)], color=INCHIOSTRO, stroke_width=3))
        punto = always_redraw(lambda: Dot(a.c2p(xv.get_value(), s(xv.get_value())), radius=0.08, color=INCHIOSTRO))
        lettura = always_redraw(lambda: VGroup(
            formula(r"\frac{1}{k_BT}=\frac{1}{\varepsilon}\frac{\partial S/k_B}{\partial n}", 30),
            etichetta(f"k_B T/ε = {self.temp(xv.get_value())}", 20, CALDO if xv.get_value() > 0.5 else INCHIOSTRO),
        ).arrange(DOWN, buff=0.2).move_to(RIGHT * 3.4 + UP * 2.2))
        n_tr.add_updater(lambda m: m.set_value(xv.get_value() * N))
        self.passo("La pendenza di S(E) è 1/T. Finché meno di metà delle particelle è eccitata la pendenza è positiva, "
                   "e scende man mano che aggiungiamo energia: T cresce.")
        self.add(tang, punto, lettura)
        self.play(xv.animate.set_value(0.47), run_time=4, rate_func=linear)
        self.wait(0.6)

        self.passo("A metà la pendenza è zero, T = ∞. Oltre metà diventa negativa: temperatura negativa, popolazione invertita. "
                   "Un sistema a T < 0 non è più freddo dello zero assoluto: cede energia a qualunque sistema a T > 0.")
        self.play(xv.animate.set_value(0.8), run_time=4, rate_func=linear)
        self.wait(1.2)
        n_tr.clear_updaters()

        self.passo("A temperatura positiva, il calore specifico ha un picco quando k_BT è dell'ordine di ε: "
                   "a bassa T non si eccita niente, ad alta T i due livelli sono già quasi equipopolati. È l'anomalia di Schottky.")
        self.play(FadeOut(VGroup(tang, punto, lettura, curva, a, tx, lx, ly)), run_time=0.8)
        c = assi([0, 3, 0.5], [0, 0.5, 0.1], x_length=6.0, y_length=4.0).move_to(RIGHT * 3.4 + DOWN * 0.5)
        ctx = tacche(c, [0, 1, 2, 3])
        cty = tacche(c, [0.2, 0.4], asse="y")
        clx = formula(r"k_BT/\varepsilon", 26, TENUE).next_to(c.x_axis, DOWN, buff=0.45)
        cly = formula(r"C_V/Nk_B", 26, TENUE).next_to(c, UP, buff=0.12).align_to(c, LEFT)
        cv = lambda t: (1 / t) ** 2 * np.exp(1 / t) / (1 + np.exp(1 / t)) ** 2
        cc = c.plot(cv, x_range=[0.05, 3, 0.01], color=CALDO, stroke_width=4)
        fcv = formula(r"C_V=Nk_B\,\frac{(\beta\varepsilon)^2e^{\beta\varepsilon}}{(1+e^{\beta\varepsilon})^2}", 34)
        fcv.move_to(RIGHT * 3.4 + UP * 2.2)
        picco = Dot(c.c2p(0.4168, cv(0.4168)), color=ORO, radius=0.08)
        self.play(Create(c), FadeIn(ctx, cty, clx, cly), Write(fcv), run_time=1.2)
        self.play(Create(cc), run_time=2)
        self.play(FadeIn(picco, scale=2), run_time=0.6)
        self.wait(2)

    @staticmethod
    def temp(x):
        if abs(x - 0.5) < 0.012:
            return "  ∞"
        return f"{1 / np.log((1 - x) / x):+6.2f}"
