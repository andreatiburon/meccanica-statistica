---
tags: [meccanica-statistica, fonte, appunti, trascrizione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-12
fonti:
  - raw/foto appunti mec stat anno scorso/IMG_6329_COMPILED.HEIC … IMG_6357_COMPILED.HEIC
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Appunti di Meccanica Statistica dell'anno scorso

Il quaderno dell'anno scorso, fotografato in 29 immagini, copre tutto il corso dal microcanonico ai solidi di Debye. È stato trascritto fedelmente in LaTeX, in un PDF di 77 pagine nel formato delle pagine Goodnotes. Questo articolo è la mappa della fonte: dice dove sta ogni argomento e quali errori del quaderno sono stati segnalati.

## Punti chiave
- **Trascrizione:** `output/appunti-ms-anno-scorso/Meccanica Statistica - appunti anno scorso (trascrizione).pdf`, 77 pp., 650,88 × 406,8 pt. È stata importata in Goodnotes il 2026-10-12. I sorgenti stanno in `output/appunti-ms-anno-scorso/pagine/IMG_63xx.tex`, un file per foto, e si ricompilano con `tectonic appunti-ms.tex`.
- **Fedeltà:** testo e formule sono quelli del quaderno, commenti personali compresi. Gli errori sono segnalati in note grigie *[N.d.T.]* e non corretti nel testo.
- **Il quaderno segue le dispense del corso:** l'ordine degli argomenti e diversi passaggi coincidono con [[dispense-ed-esami]], e in un punto (calore specifico di Fermi) il quaderno ne copia anche l'errore.
- **Gli articoli di contenuto** derivati da questa fonte sono [[insieme-microcanonico]], [[insieme-canonico]], [[insieme-gran-canonico-e-npt]], [[gas-reali-viriale-e-van-der-waals]], [[modello-di-ising-e-campo-medio]], [[gas-quantistici-ideali]] e [[corpo-nero-e-solidi]].

## Mappa: argomento → pagina della trascrizione → foto
| Argomento | Pagine | Foto |
|---|---|---|
| Microcanonico: postulato, $\Gamma_\Delta$, $\Sigma$, entropia, additività | 5–10 | 6329–6330 |
| Relazione con la termodinamica, equipartizione, viriale | 10–13 | 6331 |
| Gas perfetto microcanonico, paradosso di Gibbs | 13–16 | 6332 |
| Sistema a due livelli, fluttuazioni di osservabili estensive | 16–18 | 6333 |
| Canonico: derivazione, $Q_N$, $A=-k_B T\log Q_N$, pressione | 18–21 | 6334–6335 |
| Gas perfetto canonico, lunghezza termica, Maxwell-Boltzmann | 21–23 | 6335 |
| Distribuzione dell'energia, $\langle\Delta H^2\rangle=k_B T^2C_V$, equivalenza degli ensemble | 23–26 | 6336 |
| Potenziale chimico, densità degli stati $g(\varepsilon)$ | 26–27 | 6337 |
| Gran canonico, fugacità, $\langle N\rangle$, compressibilità, distribuzione di $N$ | 27–32 | 6338–6339 |
| NPT | 32–33 | 6340 |
| Viriale e funzione di Mayer, alta $T$, Van der Waals | 33–37 | 6341–6342 |
| Costruzione di Maxwell, Van der Waals ridotta, $K_T$ critico | 37–39 | 6342 |
| Ising: non interagente, 1D con matrice di trasferimento | 39–42 | 6343 |
| Ising 1D: $H=0$, magnetizzazione, correlazioni | 42–44 | 6344 |
| Ising: alta $T$, 2D, Bragg-Williams | 44–51 | 6345–6346 |
| Suscettività, isoterma critica, lattice gas | 52–54 | 6347 |
| Campo medio variazionale (Gibbs-Bogoliubov) | 54–56 | 6348 |
| Statistiche quantistiche, gran canonico per particelle indipendenti | 56–60 | 6349–6350 |
| Gas quantistico nel continuo, correzioni di statistica | 60–63 | 6350–6351 |
| Fermioni a bassa $T$: $\varepsilon_F$, Sommerfeld, $C_V$ | 63–66 | 6351–6352 |
| Bosoni: condensazione di Bose-Einstein, $C_V$ | 66–70 | 6353–6354 |
| Corpo nero, Planck | 70–75 | 6355–6356 |
| Solidi armonici, Einstein, Debye | 75–77 | 6356–6357 |

## Errori del quaderno segnalati nella trascrizione
Questo elenco riporta solo gli errori che cambiano un risultato. Refusi minori e fattori sottintesi sono segnalati direttamente nel PDF.

| Dove | Il quaderno scrive | Va letto | Riscontro |
|---|---|---|---|
| Ising 1D, $\lambda_\pm$ e $M/N$ (pp. 41–42) | $\sqrt{\sinh^2(\beta H)-e^{-4\beta\varepsilon}}$ | $\sqrt{\sinh^2(\beta H)+e^{-4\beta\varepsilon}}$ | dispense, p. 146: segno $+$ |
| Correlazione Ising 1D (p. 44) | $\xi=1/\log(2P_\parallel-1)$ | $\xi=-1/\log\tanh(\beta\varepsilon)$ | il logaritmo è negativo |
| Lattice gas, pressione (p. 53) | $P=-\frac{A_I}K-\frac{\varepsilon\gamma}8-\frac\mu2$ | $+\frac{\varepsilon\gamma}8+\frac\mu2$ | segue dal prefattore di $\mathcal Q_{GC}$ |
| Bragg-Williams variazionale (p. 55) | $\frac{m^2}{k_B T}(k_B T-\varepsilon\gamma)$ | fattore $\frac12$ | confronto con p. 50 |
| Gibbs-Bogoliubov (p. 54) | $A-A_0\ge\langle\omega\rangle_0$ | $A-A_0\le\langle\omega\rangle_0$ | la conclusione $A\le A_0+\langle\omega\rangle_0$ è giusta |
| Fermi, $\langle E(T)\rangle$ (p. 66) | $1+\frac{5\pi^2}8(k_B T/\varepsilon_F)^2$ | $1+\frac{5\pi^2}{12}(\ldots)^2$ secondo Huang e Pathria | **anche le dispense (pp. 194–195) scrivono $\frac{5\pi^2}8$**: le fonti divergono |
| Gas quantistico, $\rho\lambda^3$ (p. 61) | $\pm\frac2{\sqrt\pi}\int\ldots$ | senza $\pm$ davanti | dispense, p. 181 |
| Gas reale, NPT (p. 33) | $e^{-\beta(H_1+\beta PV_1)}$ | $e^{-\beta(H_1+PV_1)}$ | refuso |

La divergenza su Fermi, spiegata: quaderno e dispense sostituiscono $\mu\to\varepsilon_F$ nell'energia senza usare la correzione $\mu(T)=\varepsilon_F[1-\frac{\pi^2}{12}(k_B T/\varepsilon_F)^2]$ ricavata subito prima. Includendola si ottiene $\frac{5\pi^2}{12}$, quindi $C_V=\frac{\pi^2}2Nk_B\,\frac{k_B T}{\varepsilon_F}$. Questo calcolo è mio. Il risultato è quello standard dei manuali, ma qui non è stato verificato su una pagina di libro del vault.

## Articoli correlati
- [[meccanica-statistica/corso-e-lezioni]]: lo stato del corso di quest'anno, costruito sugli appunti nuovi.
- [[dispense-ed-esami]]: le dispense del corso unite in un solo PDF.
- [[metodo-e-strumenti/quaderni-goodnotes]]: come arriva il materiale su Goodnotes.

## Fonti
- `raw/foto appunti mec stat anno scorso/IMG_6329_COMPILED.HEIC` … `IMG_6357_COMPILED.HEIC`: 29 foto del quaderno.
- Dispense del corso, nel PDF unito descritto in [[dispense-ed-esami]]: p. 146 (Ising), p. 181 (gas quantistico), pp. 194–195 (Fermi).
