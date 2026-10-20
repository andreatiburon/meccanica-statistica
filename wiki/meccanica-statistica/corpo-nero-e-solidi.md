---
tags: [meccanica-statistica, corpo-nero, planck, solidi, debye, einstein]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-12
fonti:
  - raw/foto appunti mec stat anno scorso/IMG_6355_COMPILED.HEIC … IMG_6357_COMPILED.HEIC
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Corpo nero e calore specifico dei solidi

Due fallimenti della meccanica statistica classica: la catastrofe ultravioletta del corpo nero e il calore specifico dei solidi a bassa temperatura. Si risolvono entrambi quantizzando l'energia degli oscillatori. Per il campo elettromagnetico questo dà la legge di Planck. Per il reticolo cristallino dà prima il modello di Einstein e poi quello di Debye.

## Punti chiave
- **Dati sperimentali sul corpo nero:** Kirchhoff (comportamento universale), Stefan ($u\propto T^4$), Wien ($\lambda_{\max}T=$ cost.).
- **Conteggio dei modi:** in una cavità cubica i modi sono $\underline k=\frac\pi L(n_x,n_y,n_z)$, con due polarizzazioni ciascuno. Il loro numero è $\mathrm{d} N=\frac{L^3}{\pi^2c^3}\omega^2\mathrm{d}\omega=\frac{8\pi L^3}{c^3}\nu^2\mathrm{d}\nu$.
- **Rayleigh-Jeans:** dando a ogni modo l'energia classica $k_B T$ si ottiene $\rho(\nu)=\frac{8\pi\nu^2}{c^3}k_B T$, che diverge integrando su $\nu$ (catastrofe ultravioletta).
- **Planck:** con $u_k=n\hbar\omega_k$ si ottiene $\langle u\rangle=\hbar\omega/(e^{\beta\hbar\omega}-1)$ e $\rho(\nu)=\frac{8\pi h\nu^3}{c^3}\frac1{e^{\beta h\nu}-1}$. Ne seguono Stefan-Boltzmann, Wien ($T\lambda_{\max}\simeq hc/5k_B$) e, a basse $\nu$, il limite classico.
- **Fotoni nel gran canonico:** il loro numero non è conservato, ma è scelto minimizzando $G$, quindi $\mu=0$, $z=1$ e $G\equiv0$.
- **Solidi:** classicamente vale Dulong-Petit, $C_V=3Nk_B$. Einstein (una sola $\omega$) dà $C_V\sim T^{-2}e^{-\beta\hbar\omega}\to0$; Debye ($\rho(\omega)=A\omega^2$ fino a $\omega_{\max}$) dà $C_V\propto T^3$, in accordo con i dati.

## Corpo nero
Le condizioni al contorno impongono $n\lambda/2=L$. Nello spazio dei $\underline k$ i modi formano un reticolo cubico di passo $\pi/L$. Il numero di modi con $|\underline k|<k$ è $2\cdot\frac18\frac43\pi k^3/(\pi/L)^3$ (Appunti MS, pp. 70–72; Dispense, pp. 207–209). Ogni modo è un oscillatore armonico, perché l'energia del campo si scrive come $\hbar\omega(q^2+p^2)/2$ (Appunti MS, p. 72; Dispense, pp. 210–211). Classicamente ogni modo ha energia media $k_B T$, qualunque sia la sua frequenza, e da qui nasce la divergenza.

Con i livelli $n\hbar\omega$ si ha $Q=1/(1-e^{-\beta\hbar\omega})$, e l'energia media si calcola come $\hbar\omega\,x\,\frac{\mathrm{d}}{\mathrm{d} x}\log\frac1{1-x}$ con $x=e^{-\beta\hbar\omega}$. Nel gran canonico, con $\mu=0$, si ritrova lo stesso risultato: $n_\omega=1/(e^{\beta\hbar\omega}-1)$ è la distribuzione di Bose-Einstein a $z=1$. Il quaderno, a proposito del perché $\mu=0$, annota «perché? Boh»; la dispensa lo spiega con $\mathrm{d} G/\mathrm{d} n=0$ (Appunti MS, p. 73; Dispense, pp. 212–213).

Integrando $\rho(\nu)$ si ottiene $u_{\rm tot}=\frac{8\pi h}{c^3h^4}(k_B T)^4\int_0^\infty\frac{x^3}{e^x-1}\mathrm{d} x\propto T^4$, cioè Stefan-Boltzmann. La distribuzione ha un massimo perché cresce come $\nu^3$ e poi decade esponenzialmente; $\beta h\nu_{\max}=$ cost. è la legge di Wien (Appunti MS, pp. 73–74; Dispense, p. 214).

## Solidi armonici
Attorno al minimo del potenziale, un solido è un insieme di $3N-6$ modi normali indipendenti. In meccanica classica si ha allora $U\simeq3Nk_B T$ e $C_V=3Nk_B$ per ogni materiale e ogni $T$ (Appunti MS, p. 75; Dispense, p. 215). Sperimentalmente, però, $C_V\to0$ a bassa $T$.

- **Einstein:** ogni modo è un oscillatore quantistico con la stessa $\omega$, quindi $U=3N\hbar\omega/(e^{\beta\hbar\omega}-1)$. Ad alta $T$ si ritrova il caso classico, a bassa $T$ si ha $C_V\sim T^{-2}e^{-\beta\hbar\omega}$: tende a zero, ma troppo in fretta (Appunti MS, pp. 75–76).
- **Debye:** le frequenze sono distribuite come $\rho(\omega)=A\omega^2$ fino a $\omega_{\max}=(9N/A)^{1/3}$. Il taglio esiste perché la distanza reticolare limita la lunghezza d'onda minima. A bassa $T$ l'estremo dell'integrale va all'infinito, e si ottiene $\langle E\rangle\propto T^4$ e $C_V\propto T^3$. Il parametro $A$ si fissa sui dati (Appunti MS, pp. 76–77; Dispense, pp. 216–219).

## Articoli correlati
- [[gas-quantistici-ideali]]: i fotoni sono bosoni con $\mu=0$, e la distribuzione di Planck è Bose-Einstein a $z=1$.
- [[insieme-microcanonico]]: equipartizione, che qui fallisce.
- [[astrofisica/corpo-nero-e-spettri-stellari]]: lo stesso corpo nero, usato per gli spettri stellari.

## Fonti
- `raw/foto appunti mec stat anno scorso/IMG_6355_COMPILED.HEIC`–`IMG_6357_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 70–77.
- Dispense, PDF unito, corpo nero e calore specifico dei solidi, pp. 207–219.
