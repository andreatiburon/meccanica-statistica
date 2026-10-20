---
tags: [meccanica-statistica, ising, campo-medio, transizioni-di-fase, magnetismo]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-12
fonti:
  - raw/foto appunti mec stat anno scorso/IMG_6343_COMPILED.HEIC … IMG_6348_COMPILED.HEIC
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Modello di Ising e campo medio

Il modello di Ising è un reticolo di spin $s_i=\pm1$ che interagiscono solo con i primi vicini. È il modello minimo per il ferromagnetismo, cioè per l'allineamento spontaneo degli spin sotto la temperatura di Curie. In una dimensione si risolve esattamente con la matrice di trasferimento e non c'è transizione. In due dimensioni lo si tratta in campo medio (Bragg-Williams), che prevede una magnetizzazione spontanea sotto $T_c=\gamma\varepsilon/k_B$.

## Punti chiave
- **Hamiltoniana:** $\mathcal H=-\varepsilon\sum_{\langle ij\rangle}s_is_j-H\sum_is_i$. La magnetizzazione è $M=\langle\sum_is_i\rangle=-\partial A/\partial H$.
- **Spin non interagenti ($\varepsilon=0$):** $Q=[2\cosh\beta H]^N$ e $M/N=\tanh(\beta H)$.
- **Ising 1D, condizioni periodiche:** $Q=\mathrm{Tr}\,\hat P^N\simeq\lambda_+^N$, con $\lambda_\pm=e^{\beta\varepsilon}[\cosh\beta H\pm\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}]$ e $M/N=\sinh\beta H/\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}$. A $H=0$ la magnetizzazione è nulla a ogni $T>0$.
- **Correlazioni in 1D:** $\langle s_is_{i+j}\rangle=(\tanh\beta\varepsilon)^j=e^{-j/\xi}$, cioè decadono in modo esponenziale e non c'è ordine a lungo raggio.
- **Bragg-Williams:** si pone $N_{++}=\frac{N\gamma}2(N_+/N)^2$, dove $\gamma$ è il numero di primi vicini. Ne segue $L=\tanh(\beta H_0+\beta\varepsilon\gamma L)$, con $L$ la magnetizzazione per sito. Esistono soluzioni $L=\pm L_0\ne0$ se $\beta\varepsilon\gamma>1$, e vicino a $T_c$ vale $L\simeq\pm\sqrt3\sqrt{1-T/T_c}$.
- **Energia libera di Landau:** $A/N\simeq-k_B T\log2+\frac{k_B}2(T-T_c)L^2+\frac{k_B T}{12}L^4-H_0L$. Sotto $T_c$ il punto $L=0$ diventa un massimo e compaiono due minimi.
- **Il campo medio è un metodo variazionale:** la disuguaglianza $A\le A_0+\langle\omega\rangle_0$, con un campo di prova $\lambda$, ridà esattamente Bragg-Williams.

## Ising 1D esatto
Grazie alle condizioni periodiche si può scrivere $\sum s_i=\frac12\sum(s_i+s_{i+1})$. Così ogni fattore della somma dipende solo da due spin vicini, ed è un elemento della matrice di trasferimento
$$\hat P=\begin{pmatrix}e^{\beta(\varepsilon+H)}&e^{-\beta\varepsilon}\\e^{-\beta\varepsilon}&e^{\beta(\varepsilon-H)}\end{pmatrix}.$$
Inserendo l'identità tra i fattori, le somme collassano in una traccia: $Q=\lambda_+^N+\lambda_-^N$ (Appunti MS, pp. 40–41; Dispense, pp. 143–146). Il quaderno ha il segno sbagliato sotto radice ($-e^{-4\beta\varepsilon}$). La dispensa, a p. 146, ha $+$; vedi [[appunti-anno-scorso]].

A $H=0$ gli autovalori sono $\lambda_\pm=2\cosh\beta\varepsilon$ e $2\sinh\beta\varepsilon$. La magnetizzazione è nulla per ogni $T$ finita: gli spin si allineano a blocchi, ma in media si compensano (Appunti MS, p. 42).

La correlazione tra due spin vicini è $\langle s_is_{i+1}\rangle=2P_\parallel-1$, con $P_\parallel=e^{\beta\varepsilon}/(e^{\beta\varepsilon}+e^{-\beta\varepsilon})$ la probabilità che siano paralleli. A distanza $j$ i segni si combinano come in una binomiale, e si ottiene $(2P_\parallel-1)^j$ (Appunti MS, pp. 43–44). L'espansione ad alta temperatura dà $Q\simeq2^N[1+N\beta^2\varepsilon^2/2]$ (Appunti MS, p. 44).

## Ising 2D e Bragg-Williams
Si contano le coppie di vicini $N_{++}$, $N_{--}$, $N_{+-}$ e si usano le relazioni $\gamma N_\pm=2N_{\pm\pm}+N_{+-}$. Così $\mathcal H$ dipende solo da $N_+$ e $N_{++}$, ma il numero di configurazioni $g(N_+,N_{++})$ «senza una relazione tra $N_+$ ed $N_{++}$ è un incubo». Il campo medio fornisce questa relazione: ogni sito è up con probabilità uniforme $N_+/N$ (Appunti MS, pp. 45–47; Dispense, pp. 151–156).

Massimizzando il termine della somma rispetto a $N_+$ e scrivendo $L=2N_+/N-1$, si trova l'equazione autoconsistente $L=\tanh[\beta(H_0+\varepsilon\gamma L)]$. Lo spin vede il campo esterno più un campo «autogenerato» $\varepsilon\gamma L$. Si risolve graficamente intersecando la retta $f(L)=L$ con la tangente iperbolica (Appunti MS, pp. 47–49).

## Suscettività, isoterma critica, lattice gas
- **Suscettività:** $\chi_m=\partial L/\partial H_0|_{H_0=0}=\frac1{k_B}(T-T_c)^{-1}$, che diverge in $T_c$ (Appunti MS, p. 52).
- **Isoterma critica:** a $T=T_c$ vale $L=\sqrt[3]{3\beta_cH_0}-\beta_cH_0$, cioè $L\sim H_0^{1/3}$ (Appunti MS, p. 52).
- **Lattice gas:** è un reticolo con siti occupati ($n_i=1$) o vuoti ($n_i=0$) e $\mathcal H=-\varepsilon\sum n_in_j$. Il vincolo su $N$ si toglie passando al gran canonico. Con $n_i=(s_i+1)/2$ il modello diventa Ising con $\varepsilon_I=\varepsilon/4$ e $H_I=\varepsilon_I\gamma+\mu/2$, quindi esclusione di volume e attrazione locale riportano a Van der Waals (Appunti MS, pp. 52–53). Il quaderno ha un errore di segno nella pressione; vedi [[appunti-anno-scorso]].

## Campo medio come metodo variazionale
Si scrive $\mathcal H=\mathcal H_0+\omega$, con $\mathcal H_0$ risolubile. Allora $e^{-\beta(A-A_0)}=\langle e^{-\beta\omega}\rangle_0\ge e^{-\beta\langle\omega\rangle_0}$, per la disuguaglianza di Jensen, che il quaderno nota di non aver mai visto prima. Ne segue $A\le A_0+\langle\omega\rangle_0$ (disuguaglianza di Gibbs-Bogoliubov). Per Ising si prende $\mathcal H_0=-\lambda\sum s_i$, per cui $m=\tanh\beta\lambda$. Minimizzando su $\lambda$ si ritrova $A_{BW}$ (Appunti MS, pp. 54–56; Dispense, pp. 157–159).

## Articoli correlati
- [[gas-reali-viriale-e-van-der-waals]]: stessa approssimazione di campo medio, stessa struttura critica.
- [[insieme-microcanonico]]: il sistema a due livelli è Ising senza interazione.
- [[insieme-gran-canonico-e-npt]]: serve per il lattice gas.
- [[appunti-anno-scorso]]: gli errori di segno del quaderno su questo argomento.

## Fonti
- `raw/foto appunti mec stat anno scorso/IMG_6343_COMPILED.HEIC`–`IMG_6348_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 39–56.
- Dispense, PDF unito: Ising pp. 143–150, Bragg-Williams pp. 151–156, variazionale pp. 157–159.
