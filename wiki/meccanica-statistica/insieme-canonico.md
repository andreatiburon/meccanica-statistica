---
tags: [meccanica-statistica, ensemble, canonico, funzione-di-partizione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-12
fonti:
  - raw/foto appunti mec stat anno scorso/IMG_6334_COMPILED.HEIC … IMG_6337_COMPILED.HEIC
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Insieme canonico

L'insieme canonico descrive un sistema chiuso a temperatura fissata, cioè in contatto con un serbatoio di calore molto più grande. La densità di probabilità diventa il peso di Boltzmann $e^{-\beta H}$, e tutta la termodinamica sta nella funzione di partizione $Q_N(V,T)$.

## Punti chiave
- **Derivazione:** si parte da un microcanonico sistema + serbatoio con $E_2\gg E_1$. Sviluppando $S_2(E-E_1)\simeq S_2(E)-E_1/T$ si ottiene $\rho(q,p)\propto e^{-\beta H(q,p)}$, con $\beta=1/k_B T$.
- **Funzione di partizione:** $Q_N=\frac1{N!h^{3N}}\int e^{-\beta H}\,\mathrm{d} q^{3N}\mathrm{d} p^{3N}$ e $A=-k_B T\log Q_N$. Ne seguono $P=-(\partial A/\partial V)_T$, $S=-(\partial A/\partial T)_V$ e $U=\langle H\rangle$.
- **Fattorizzazione:** se $H$ è separabile, $Q_N=Q_1^N/N!$. Per il gas perfetto $Q_N=\frac1{N!}(V/\Lambda^3)^N$, con la lunghezza termica di de Broglie $\Lambda=h/\sqrt{2\pi mk_B T}$.
- **Distribuzione dell'energia:** $P(\varepsilon)\propto e^{-\beta[\varepsilon-TS(\varepsilon)]}$ è una gaussiana con varianza $\langle\Delta H^2\rangle=k_B T^2C_V$, quindi $\sigma_E/\langle E\rangle\sim N^{-1/2}$.
- **Equivalenza con il microcanonico:** nel limite termodinamico tutti gli stati campionati hanno energia $\bar\varepsilon$, e i valori medi canonici coincidono con quelli microcanonici a $\bar\varepsilon$.
- **Densità degli stati di singola particella:** $g(\varepsilon)=\int\frac{\mathrm{d}^3q\,\mathrm{d}^3p}{h^3}\,\delta(H_1-\varepsilon)$, da cui $P(\varepsilon)=g(\varepsilon)e^{-\beta\varepsilon}/Q_1$.

## Dal serbatoio al peso di Boltzmann
Si marginalizza la densità microcanonica di sistema + serbatoio sulle variabili del serbatoio: $\rho(q_1,p_1)=\Gamma_2(E-E_1)/\Gamma_{1+2}(E)$. Poiché $E_1\ll E$, si sviluppa $k_B\log\Gamma_2(E-E_1)=S_2(E)-E_1/T$. Il risultato non dipende dai dettagli del serbatoio e dà $\rho\propto e^{-\beta H_1}$ (Appunti MS, pp. 18–19; Dispense, p. 72). Derivando $A=-k_B T\log Q_N$ rispetto a $T$ si ritrova $A=U-TS$, che chiude il cerchio con la termodinamica (Appunti MS, p. 19).

A differenza del microcanonico, il sistema esplora **tutto** lo spazio delle fasi, con pesi diversi. A $T\to0$ occupa il minimo di energia, mentre a $T\to\infty$ gli stati tornano equiprobabili (Appunti MS, p. 20).

## Pressione
Riscalando le coordinate con $q=Lt$, la dipendenza da $V$ diventa esplicita:
$$P=\frac{Nk_B T}V-\Big\langle\frac{\partial H}{\partial V}\Big\rangle.$$
Il primo termine è il gas perfetto. Il secondo esiste solo se c'è interazione, cioè se l'energia dipende dalle distanze relative (Appunti MS, pp. 20–21). Questa è la base dell'espansione del viriale, vedi [[gas-reali-viriale-e-van-der-waals]].

## Gas perfetto e Maxwell-Boltzmann
Con $Q_N=\frac1{N!}(V/\Lambda^3)^N$ e Stirling si ottiene
$$A=-Nk_B T\Big[1+\log\frac V{N\Lambda^3}\Big],\qquad S=Nk_B\Big[\frac52+\log\frac V{N\Lambda^3}\Big],$$
che coincide con il microcanonico (Appunti MS, pp. 21–22). La probabilità di una componente dell'impulso è la gaussiana $e^{-\beta p_\alpha^2/2m}/\sqrt{2\pi mk_B T}$. Quella del modulo è la distribuzione di Maxwell, $4\pi p^2e^{-\beta p^2/2m}/(2\pi mk_B T)^{3/2}$ (Appunti MS, p. 22; Dispense, p. 97). La trascrizione segnala che $\langle p^2\rangle=mk_B T$ vale per una sola componente.

## Distribuzione dell'energia ed equivalenza degli ensemble
La probabilità dell'energia è $P(\varepsilon)=\Gamma(\varepsilon)e^{-\beta\varepsilon}/Q_N=e^{-\beta[\varepsilon-TS(\varepsilon)]}/Q_N$. Si pone $f(\varepsilon)=\varepsilon-TS(\varepsilon)$. Il minimo di $f$ sta dove $T(\bar\varepsilon)=T$, e $f''=1/(TC_V)>0$. Il punto di sella dà allora una gaussiana con varianza $k_B T^2C_V$ (Appunti MS, pp. 23–24; Dispense, pp. 93–94).

Un metodo alternativo: si deriva rispetto a $\beta$ l'identità $\langle H-U\rangle=0$ e si ottiene $\langle\Delta H^2\rangle=-\partial U/\partial\beta$ (Appunti MS, pp. 24–25). Per un'osservabile estensiva $\langle O\rangle_\varepsilon$ la media canonica è dominata da $\bar\varepsilon$, quindi $\langle O\rangle_{\rm can}=\langle O\rangle_{\bar\varepsilon}$. Questa è l'equivalenza degli ensemble (Appunti MS, p. 26).

## Potenziale chimico per particelle indipendenti
Da $A=-Nk_B T\log Q_1+k_B T(N\log N-N)$ e $G=A+PV=\mu N$ si ottiene $\beta\mu=-\log(Q_1/N)$. Per il gas perfetto questo diventa $\beta\mu=\log(\rho\lambda^3)$ (Appunti MS, p. 26).

## Articoli correlati
- [[insieme-microcanonico]]: il punto di partenza.
- [[insieme-gran-canonico-e-npt]]: lo stesso procedimento quando si scambiano anche particelle o volume.
- [[gas-quantistici-ideali]]: dove $g(\varepsilon)$ diventa lo strumento centrale.
- [[dispense-ed-esami]]: gli esercizi su $g(\varepsilon)$ (pp. 102–110) e quelli svolti in classe (pp. 111–117).

## Fonti
- `raw/foto appunti mec stat anno scorso/IMG_6334_COMPILED.HEIC`–`IMG_6337_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 18–27.
- Dispense, PDF unito, insieme canonico, pp. 72–101: fluttuazioni pp. 93–94, Maxwell p. 97.
