---
tags: [meccanica-statistica, ensemble, microcanonico, entropia]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-12
fonti:
  - raw/foto appunti mec stat anno scorso/IMG_6329_COMPILED.HEIC … IMG_6333_COMPILED.HEIC
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Insieme microcanonico

L'insieme microcanonico descrive un sistema isolato con $N$, $V$ ed $E$ fissati. Tutti i microstati compatibili hanno la stessa probabilità, e l'entropia è il logaritmo del loro numero. Da qui si ricavano la temperatura, la termodinamica, l'equipartizione e il gas perfetto, e su quest'ultimo emerge il problema dell'indistinguibilità (paradosso di Gibbs).

## Punti chiave
- **Postulato di uguale probabilità a priori:** $\rho(q,p)=\delta(H-E)/\Gamma(E)$. Con un'incertezza $\Delta$ sull'energia, $\rho=1/\Gamma_\Delta(E)$ nella shell $E<H<E+\Delta$ e zero fuori.
- **Contatori di stati:** $\Sigma(E)=\frac1{h^{3N}}\int_{H<E}\mathrm{d} q\,\mathrm{d} p$ è il volume, $\Gamma(E)=\partial\Sigma/\partial E$ la superficie, $\Gamma_\Delta=\Delta\,\Gamma$ lo spessore. Il fattore $h^{3N}$ rende il conteggio adimensionale.
- **Entropia:** $S=k_B\log\Gamma_\Delta(E)$. Le tre scelte $\Gamma$, $\Gamma_\Delta$ e $\Sigma$ danno la stessa $S$ a meno di $o(\log N)$.
- **Equilibrio termico:** massimizzare $\Gamma_1(E_1)\Gamma_2(E-E_1)$ dà $\partial S_1/\partial E_1=\partial S_2/\partial E_2$, cioè $T_1=T_2$, con $1/T=\partial S/\partial E$.
- **Equipartizione:** $\langle x_i\,\partial H/\partial x_j\rangle=\delta_{ij}k_B T$, dove $x$ è una qualunque coordinata canonica. Ne segue il viriale, $2\langle E_{\rm kin}\rangle=-\sum_i\langle q_i\dot p_i\rangle$.
- **Paradosso di Gibbs:** senza il fattore $1/N!$ l'entropia del gas perfetto non è estensiva e compare un'entropia di mescolamento anche tra particelle identiche.

## Entropia e additività
Il postulato dice che in un sistema isolato all'equilibrio non c'è motivo di preferire un microstato a un altro: tutti quelli con l'energia giusta sono equiprobabili. Il numero di microstati è $\Gamma_\Delta(E)=\Sigma(E+\Delta)-\Sigma(E)\simeq\Delta\,\partial\Sigma/\partial E$ (Appunti MS, pp. 5–6).

Per vedere che $S=k_B\log\Gamma_\Delta$ è additiva si prendono due sistemi a contatto termico. Si divide l'energia totale in $E/\Delta$ intervalli e si scrive $\Gamma(E)=\sum_i\Gamma_1(E_i)\Gamma_2(E-E_i)$. Se $\bar E$ è il termine massimo della somma, valgono le disuguaglianze
$$\Gamma_1(\bar E)\Gamma_2(E-\bar E)\le\Gamma(E)\le\frac E\Delta\,\Gamma_1(\bar E)\Gamma_2(E-\bar E).$$
Il fattore $E/\Delta$ contribuisce all'entropia con $k_B\log(E/\Delta)\sim\log N$, trascurabile rispetto a $S\sim N$. Quindi $S=S_1(\bar E_1)+S_2(\bar E_2)+o(\log N)$ (Appunti MS, pp. 6–7). La condizione di massimo dà l'uguaglianza delle temperature. Lo stesso risultato si ottiene inserendo due delta e risolvendo con il punto di sella l'integrale $\Gamma(E)=\int\mathrm{d} E_1\,\Gamma(E_1)\Gamma(E-E_1)$ (Appunti MS, pp. 8–9).

## Termodinamica
Il differenziale $\mathrm{d} S=\frac1T\mathrm{d} E+\frac PT\mathrm{d} V$ è il primo principio. Dalle trasformate di Legendre seguono $A=E-TS$ e $G=A+PV$. La regola ciclica dà $P=-(\partial E/\partial V)_S$ (Appunti MS, p. 10).

## Equipartizione e viriale
La dimostrazione passa dall'integrale sulla shell a quello sul volume $H<E$. Poi si integra per parti $\partial_{x_j}[x_i(H-E)]$: il termine di bordo si annulla perché sulla superficie vale $H=E$. Resta $\langle x_i\partial_jH\rangle=\delta_{ij}\,\Sigma/(\partial\Sigma/\partial E)=\delta_{ij}k_B T$ (Appunti MS, pp. 11–12). Con $H=p^2/2m+V(q)$ si ottiene $\langle E_{\rm kin}\rangle=\frac32Nk_B T$ e, usando $\dot p_i=-\partial H/\partial q_i$, il teorema del viriale (Appunti MS, p. 12; Dispense, pp. 54–56).

## Gas perfetto e paradosso di Gibbs
Lo spazio degli impulsi accessibile è un'ipersfera $3N$-dimensionale di raggio $R=\sqrt{2mE}$. Il suo volume ha costante $C_n=\pi^{n/2}/\Gamma(n/2+1)$, che si ricava da un integrale gaussiano in coordinate sferiche. Con Stirling si ottiene
$$S=Nk_B\log\Big[V\Big(\frac{4\pi m}{3h^2}\frac EN\Big)^{3/2}\Big]+\frac32Nk_B,$$
che **non è estensiva** perché contiene $V$ e non $V/N$ (Appunti MS, p. 13).

Si mescolano due gas alla stessa $T$ e $P$, quindi con $E_1/N_1=E_2/N_2$ e $N_1/V_1=N_2/V_2$. L'entropia totale acquista un termine $S_{\rm mix}/k_B=N\log N-N_1\log N_1-N_2\log N_2$. Questo termine è corretto per gas diversi, ma è assurdo per particelle identiche, perché togliere un setto tra due porzioni dello stesso gas non deve cambiare niente. Gibbs lo elimina dividendo per $N!$ le permutazioni, e si ottiene l'entropia estensiva
$$S=Nk_B\log\Big[\frac VN\Big(\frac{4\pi m}{3h^2}\frac EN\Big)^{3/2}\Big]+\frac52Nk_B$$
(Appunti MS, pp. 14–15; Dispense, p. 59).

## Sistema a due livelli
Si considerano $N$ particelle con livelli $0$ ed $\varepsilon$, di cui $n=E/\varepsilon$ eccitate. Allora $\Gamma=\binom Nn$ e $\partial S/\partial E=\frac{k_B}\varepsilon\log\frac{N-n}n=\frac1T$, da cui $n=N\,e^{-\beta\varepsilon}/(1+e^{-\beta\varepsilon})$. Il calore specifico è $C_V=Nk_B(\beta\varepsilon)^2e^{-\beta\varepsilon}/(1+e^{-\beta\varepsilon})^2$, con il picco di Schottky (Appunti MS, pp. 16–17; Dispense, pp. 65–68). Per $n>N/2$ la pendenza $\partial S/\partial E$ diventa negativa, cioè la temperatura è negativa (popolazione invertita). Nel quaderno questo punto è annotato come «non l'ho ben capito».

## Fluttuazioni di osservabili estensive
Per un'osservabile $A$ si ha $P(a)=e^{[S(E,a)-S(E)]/k_B}$. Sviluppando $S$ attorno al massimo $\bar a$ si ottiene una gaussiana: le osservabili estensive hanno fluttuazioni relative che vanno come $1/\sqrt N$ (Appunti MS, p. 17).

## Articoli correlati
- [[insieme-canonico]]: si ottiene accoppiando il sistema a un serbatoio.
- [[meccanica-statistica/corso-e-lezioni]]: le lezioni di quest'anno su Liouville, ergodicità e $\Gamma(E)$.
- [[appunti-anno-scorso]]: la mappa della fonte.
- [[modello-di-ising-e-campo-medio]]: un altro sistema a due stati per sito.

## Fonti
- `raw/foto appunti mec stat anno scorso/IMG_6329_COMPILED.HEIC`–`IMG_6333_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 5–18.
- Dispense, PDF unito, insieme microcanonico, pp. 43–71: equipartizione p. 54, paradosso di Gibbs p. 59, due livelli pp. 65–68.
