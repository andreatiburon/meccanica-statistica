---
tags: [meccanica-statistica, fonte, dispense, esami]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-26
fonti:
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Dispense ed esami del corso in un unico PDF

Tutti i 42 PDF della pagina web del corso (note delle lezioni, formulario ed esami) sono riuniti in un solo file di 324 pagine, con indice cliccabile e segnalibri. Questo articolo dà le pagine di partenza di ogni parte. Negli articoli della wiki la forma «(Dispense, p. N)» indica sempre la pagina di questo PDF unito.

## Punti chiave
- **File:** `output/dispense-ms/Meccanica Statistica - dispense complete.pdf`. È stato importato in Goodnotes il 2026-10-12.
- **Origine:** la pagina web del corso, scaricata il 2026-10-12 (A.A. 2026-27). I singoli PDF stanno in `output/dispense-ms/scaricati/`.
- **Rigenerazione:** se il sito pubblica materiale nuovo, si scarica in `scaricati/`, si aggiunge alla lista in `unisci.py` e si rilancia `~/.venvs/kb/bin/python unisci.py` dalla cartella.
- **Esame:** lo scritto è comune a tutti i canali e si supera con almeno 18. All'esame si può portare un solo libro più il formulario ufficiale (p. 220), e nient'altro, nemmeno le dispense stampate.
- **Testi consigliati:** Huang, *Statistical Mechanics*; Piazza, *Statistical Physics*; S-K Ma; Colombo. La parte sui gas quantistici segue Huang (Dispense, p. 170).

## Note delle lezioni (parte I)
| Dispensa | Pagine | Articolo della wiki |
|---|---|---|
| Ripasso di probabilità | 3–20 | [[ripasso-di-probabilita]] |
| Ripasso di termodinamica | 21–33 | [[ripasso-di-termodinamica]] |
| Spazio delle fasi (Liouville) | 34–42 | [[spazio-delle-fasi-e-liouville]], [[meccanica-statistica/corso-e-lezioni]] |
| Insieme microcanonico | 43–71 | [[insieme-microcanonico]] |
| Insieme canonico | 72–101 | [[insieme-canonico]] |
| Esercizi: densità degli stati $g(\varepsilon)$ | 102–110 | [[insieme-canonico]] |
| Esercizi svolti in classe (canonico) | 111–117 | [[insieme-canonico]] |
| Insieme gran canonico | 118–127 | [[insieme-gran-canonico-e-npt]] |
| Insieme NPT | 128–131 | [[insieme-gran-canonico-e-npt]] |
| Viriale (in inglese, ripetuto in italiano alle pp. 134–136) | 132–133 | [[gas-reali-viriale-e-van-der-waals]] |
| Particelle interagenti: Van der Waals, Ising 1D, Bragg-Williams | 134–169 | [[gas-reali-viriale-e-van-der-waals]], [[modello-di-ising-e-campo-medio]] |
| Gas quantistici non interagenti | 170–206 | [[gas-quantistici-ideali]] |
| Corpo nero e calore specifico dei solidi | 207–219 | [[corpo-nero-e-solidi]] |

## Formulario ed esami (parti II–IV)
- **Formulario ammesso:** p. 220.
- **Esami 2018–2019, testo seguito dallo svolgimento:** 22/06/2018 (p. 221), 11/07/2018 (227), 06/11/2018 (232), 28/06/2019 (237), 15/07/2019 (246), 10/09/2019 (252), 08/11/2019 (259).
- **Scritti 2023–2026 con soluzioni:** 25/01/2023 (p. 266), 08/02/2023 (270), 23/06/2023 (273), 06/09/2023 (276), 24/01/2024 (280), 07/02/2024 (285), 22/04/2024 (288), 09/07/2024 (292), 06/11/2024 (296), 29/01/2025 (300), 12/02/2025 (304), 30/01/2026 (308), 26/06/2026 (313), 13/07/2026 (317).
- Quasi tutti gli scritti partono dalla funzione di partizione di singola particella o dalla densità degli stati $g(\varepsilon)$ in un potenziale esterno. Questa è un'osservazione dalle prime righe degli svolgimenti, non un'analisi completa delle ricorrenze.

## Sviste delle dispense segnalate nelle lezioni
Raccolta delle sviste trovate rileggendo le dispense per scrivere le lezioni. Ognuna è discussa, con il conto, in un riquadro «Attenzione» della lezione indicata; le correzioni sono calcoli miei. Restano esclusi i refusi di battitura senza conseguenze.

| Pagina | Le dispense scrivono | Va letto | Lezione |
|---|---|---|---|
| 15 | $\lim_{N\to\infty}P(\dots)<0$ | $=0$ | [[ripasso-di-probabilita]] |
| 18 | punto di sella con esponente $+\frac N2\lvert f''\rvert(x-x_0)^2$ | segno $-$ | [[ripasso-di-probabilita]] |
| 20 | Stirling: $1+\frac{1}{12N}+\frac{1}{144N^2}$ | $\frac{1}{288N^2}$ | [[ripasso-di-probabilita]] |
| 20 | $\delta(x)=\int e^{-izx}dz$ (segnato «FIX») | $\frac{1}{2\pi}\int e^{-izx}dz$ | [[ripasso-di-probabilita]] |
| 52 | volume nel guscio 0,993 per $D=10$ | 0,933 | [[insieme-microcanonico]] |
| 67 | picco di Schottky a $\beta\varepsilon\approx0{,}41$ | $k_BT/\varepsilon\approx0{,}42$, cioè $\beta\varepsilon\approx2{,}40$ | [[insieme-microcanonico]] |
| 78 | $v_{\rm term}=\sqrt{k_BT/m}$ con i valori 1370 e 476 m/s | i valori sono quelli di $\sqrt{3k_BT/m}$, cioè del modulo | [[insieme-canonico]] |
| 93 | $P(\varepsilon)\propto e^{-\beta(\varepsilon-\bar\varepsilon)^2/TC_V}$ | $e^{-\beta(\varepsilon-\bar\varepsilon)^2/2TC_V}$ | [[insieme-canonico]] |
| 94 | $\langle O\rangle\propto\int e^{-\beta\varepsilon}e^{-S/k_B}\langle O\rangle_\varepsilon$ | $e^{+S/k_B}$ | [[insieme-canonico]] |
| 97 | $\langle E_1\rangle=\frac52k_BT+mgH\frac{e^{-\beta mgH}}{1-e^{-\beta mgH}}$ | segno $-$ davanti a $mgH$ | [[insieme-canonico]] |
| 106 | $g(\varepsilon)$ del cilindro senza $2\pi$ | con $2\pi$, come a p. 224 | [[insieme-canonico]] |
| 115 | $E=2k_BT-AR^2\frac{e^{\beta AR^2}}{e^{\beta AR^2}-1}$ | moltiplicato per $N$ | [[insieme-canonico]] |
| 124 | sviluppo di $N\beta\mu+\beta A$, gaussiana con segno $+$, prefattore $\sqrt{2\pi\,\partial^2\beta A/\partial N^2}$ | $N\beta\mu-\beta A$, segno $-$, $\sqrt{2\pi/(\partial^2\beta A/\partial N^2)}$ | [[insieme-gran-canonico-e-npt]] |
| 131 | $\ln\mathcal P(V)=-\beta A-\ln(V_0\mathcal Q_{NPT})$ | manca $-\beta PV$ | [[insieme-gran-canonico-e-npt]] |
| 135–136 | $B_3$ con i termini a catena $f_{12}f_{13}$ | solo il triangolo: $B_3=-\frac13\int f_{12}f_{13}f_{23}$ | [[gas-reali-viriale-e-van-der-waals]] |
| 137 | $\frac{\beta F}{N}=+\ln\frac{(V-Nv_0)e}{N\lambda^3}-\beta a\frac NV$ | $-\ln$ | [[gas-reali-viriale-e-van-der-waals]] |
| 138 | $\dots-aN^2(N-Nv_0)$ | $-aN^2(V-Nv_0)$ | [[gas-reali-viriale-e-van-der-waals]] |
| 141 | ramo del gas della spinodale a $\phi=0$ | $\phi\to\infty$ | [[gas-reali-viriale-e-van-der-waals]] |
| 149 | $Q_N=2^N\sum_i\cosh\gamma_i$; $\xi=-\frac{1}{2e^{-2\beta\varepsilon}}$ | $2^N\prod_i\cosh\gamma_i$; $\xi=+\frac{e^{2\beta\varepsilon}}{2}$ | [[modello-di-ising-e-campo-medio]] |
| 166 | $\frac{V-V_c}{V_c}=4\sqrt{\frac{T_c-T}{T_c}}$ | coefficiente 2 | [[modello-di-ising-e-campo-medio]] |
| 169 | $P=-\frac{A_{\rm Ising}}{N}-\frac{\varepsilon\gamma}{8}-\frac\mu2$ | $+\frac{\varepsilon\gamma}{8}+\frac\mu2$ | [[modello-di-ising-e-campo-medio]] |
| 187 | $n-\frac12=+\frac12\tanh\frac{\beta(\varepsilon-\mu)}{2}$ | segno $-$ | [[gas-quantistici-ideali]] |
| 194–195 | $\frac{E}{E_0}=1+\frac{5\pi^2}{8}\big(\frac{k_BT}{\varepsilon_F}\big)^2$ | $\frac{5\pi^2}{12}$, e $C_V=\frac{\pi^2}{2}Nk_B\frac{k_BT}{\varepsilon_F}$ | [[gas-quantistici-ideali]] |
| 206 | $g_{1D}\propto1/\varepsilon$; «gas di elettroni» | $g_{1D}\propto1/\sqrt\varepsilon$; gas di bosoni | [[gas-quantistici-ideali]] |
| 211 | $\ddot q-\omega^2q=0$ | $\ddot q+\omega^2q=0$ | [[corpo-nero-e-solidi]] |

## Articoli correlati
- [[appunti-anno-scorso]]: il quaderno dell'anno scorso, che segue queste dispense.
- [[metodi-e-modelli/dispense-e-esami]]: lo stesso tipo di raccolta per Metodi e Modelli.

## Fonti
- `output/dispense-ms/Meccanica Statistica - dispense complete.pdf`, costruito da `output/dispense-ms/unisci.py` a partire dai PDF in `output/dispense-ms/scaricati/`.
- Pagina del corso, sezioni «Modalità esami» e «Utili libri di testo», letta il 2026-10-12.
