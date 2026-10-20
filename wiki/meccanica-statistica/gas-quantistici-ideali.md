---
tags: [meccanica-statistica, gas-quantistici, fermioni, bosoni, bose-einstein, fermi-dirac]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-12
fonti:
  - raw/foto appunti mec stat anno scorso/IMG_6349_COMPILED.HEIC … IMG_6354_COMPILED.HEIC
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Gas quantistici ideali: fermioni e bosoni

Per particelle identiche non interagenti, il postulato di simmetrizzazione cambia il conteggio dei microstati. Si conta allora il numero di occupazione $n_k$ di ogni livello, e nel gran canonico la funzione di partizione si fattorizza livello per livello. Ne escono le distribuzioni di Fermi-Dirac e di Bose-Einstein, il mare di Fermi a bassa $T$ e la condensazione di Bose-Einstein.

## Punti chiave
- **Occupazione media:** $\langle n_k\rangle=\dfrac1{e^{\beta(\varepsilon_k-\mu)}\pm1}$, con $+$ per i fermioni ($n_k=0,1$) e $-$ per i bosoni ($n_k\in\mathbb N$).
- **Gran canonico fattorizzato:** $\mathcal Q_{GC}=\prod_kQ_k$, con $Q_k^F=1+ze^{-\beta\varepsilon_k}$ e $Q_k^B=(1-ze^{-\beta\varepsilon_k})^{-1}$. Per i bosoni la convergenza richiede $\mu\le\varepsilon_{\min}$. L'equazione di stato è $\beta PV=\pm\sum_k\log(1\pm ze^{-\beta\varepsilon_k})$.
- **Limite classico:** se $\langle n_k\rangle\ll1$ si ritrova $\beta PV=\langle N\rangle$. La prima correzione è $\beta P\lambda^3=\rho\lambda^3[1\pm2^{-5/2}\rho\lambda^3]$: i fermioni si comportano come repulsivi, i bosoni come attrattivi.
- **Fermioni a $T\to0$:** $n(\varepsilon)$ è un gradino che si ferma all'energia di Fermi $\varepsilon_F$. A $T$ piccola lo sviluppo di Sommerfeld dà $\mu=\varepsilon_F[1-\frac{\pi^2}{12}(k_B T/\varepsilon_F)^2]$ e $C_V\propto T$, coerente con il terzo principio.
- **Condensazione di Bose-Einstein (3D):** $g_{3/2}(z)$ è limitata, con $g_{3/2}(1)=\zeta(3/2)\simeq2.612$. Quando $\rho\lambda^3>g_{3/2}(1)$ l'eccesso di particelle va nello stato fondamentale. La temperatura critica è $k_B T_c=\frac{2\pi\hbar^2}m(\rho/g_{3/2}(1))^{2/3}$ e la frazione condensata è $1-(T/T_c)^{3/2}$.
- **$C_V$ dei bosoni** vale $\propto T^{3/2}$ sotto $T_c$, ha una cuspide in $T_c$ e tende a $\frac32Nk_B$ ad alta $T$. La discontinuità della derivata segnala una vera transizione di fase.

## Dal conteggio dei microstati ai numeri di occupazione
Con un'hamiltoniana separabile, un microstato è l'insieme dei numeri quantici $\{m_i\}$. Per i fermioni (principio di Pauli) gli stati con due numeri quantici uguali hanno peso nullo. Per i bosoni gli stati vanno contati con le loro molteplicità. Scritto così, il conteggio è «un enorme casino», perché la funzione di conteggio lega tra loro tutti gli indici (Appunti MS, p. 57). Sommando invece sui livelli si ha $Q_N=\sum_{\{n_k\}}e^{-\beta\sum n_k\varepsilon_k}\delta(N-\sum n_k)$. La delta lega ancora i livelli, ma nel gran canonico la somma su $N$ la elimina e tutto si fattorizza (Appunti MS, pp. 57–58; Dispense, pp. 170–175).

## Passaggio al continuo
In una scatola di lato $L$ i livelli sono $\varepsilon=\frac{\hbar^2\pi^2}{2mL^2}(n_x^2+n_y^2+n_z^2)$. Per $V\to\infty$ si addensano, e $\sum_n\to\frac18\frac1{V_{\rm stato}}\int4\pi p^2\,\mathrm{d} p$, dove $\frac18$ tiene conto del primo ottante. Con $y=\beta\varepsilon$ si ottiene
$$\beta P\lambda^3=\pm\frac2{\sqrt\pi}\int_0^\infty y^{1/2}\log(1\pm ze^{-y})\,\mathrm{d} y,\qquad \rho\lambda^3=\frac2{\sqrt\pi}\int_0^\infty y^{1/2}\frac{ze^{-y}}{1\pm ze^{-y}}\,\mathrm{d} y$$
(Appunti MS, pp. 60–61; Dispense, pp. 180–181). Per i bosoni lo stato $\varepsilon=0$ ha misura nulla nell'integrale, quindi va isolato a parte: $\rho=g_-(z)/\lambda^3+\frac1V\frac z{1-z}$ (Appunti MS, p. 61).

Si sviluppa in serie per $z$ piccolo (alta $T$) e si inverte la relazione: $z=\rho\lambda^3\pm\frac1{2\sqrt2}(\rho\lambda^3)^2$. Sostituendo nell'equazione di stato si trova la correzione di statistica dei punti chiave (Appunti MS, pp. 62–63; Dispense, pp. 185–186).

## Fermioni a bassa temperatura
La distribuzione $n(\varepsilon)$ vale $1/2$ in $\varepsilon=\mu$ e passa da $1$ a $0$ in una fascia larga circa $k_B T$. Si scrive $\langle N\rangle=A\beta^{-3/2}\int y^{1/2}/(e^{y-\beta\mu}+1)$ e si integra per parti. Poi si sviluppa $(t+\beta\mu)^{3/2}$ al secondo ordine, usando che $e^t/(1+e^t)^2$ è pari, e si usano gli integrali $I_N=\int t^Ne^t/(1+e^t)^2\,\mathrm{d} t$ legati alla zeta di Riemann. Si ottiene $\varepsilon_F^{3/2}=\mu^{3/2}+\frac{\pi^2}8\frac{(k_B T)^2}{\sqrt\mu}$, quindi lo spostamento di $\mu$ dei punti chiave (Appunti MS, pp. 63–66; Dispense, pp. 187–194).

Per l'energia il quaderno scrive $\langle E(T)\rangle=\langle E(0)\rangle[1+\frac{5\pi^2}8(k_B T/\varepsilon_F)^2]$ e $C_V=\langle E(0)\rangle\frac{5\pi^2}{4\varepsilon_F^2}k_B^2T$, **come le dispense** (Dispense, pp. 194–195). Il risultato standard, che include la correzione $\mu(T)$, ha invece $\frac{5\pi^2}{12}$ e $C_V=\frac{\pi^2}2Nk_B\frac{k_B T}{\varepsilon_F}$. Le fonti del vault divergono. Il valore standard l'ho rifatto io con lo stesso sviluppo, ma non è ancora stato verificato su un libro del vault. In entrambi i casi $C_V\propto T$, e il quaderno lo spiega così: cambiano occupazione solo le particelle nella fascia $k_B T$ attorno a $\varepsilon_F$, che sono $\propto k_B T$.

## Bosoni a bassa temperatura: condensazione
Siccome $\mu\le\varepsilon_{\min}=0$, si ha $z\in[0,1]$. La funzione $g_{3/2}(z)=\frac2{\sqrt\pi}\int y^{1/2}\frac{ze^{-y}}{1-ze^{-y}}\mathrm{d} y$ è monotona e vale al massimo $g_{3/2}(1)=\frac2{\sqrt\pi}\Gamma(3/2)\zeta(3/2)\simeq2.612$. Quindi la parte eccitata non può contenere più di $g_{3/2}(1)/\lambda^3$ particelle per unità di volume. Il resto si accumula nello stato fondamentale:
$$\rho_{\rm cond}=(\rho-\rho_{\rm crit})\,\theta(\rho-\rho_{\rm crit}).$$
Il condensato esiste solo nel limite $V\to\infty$: a volume finito $z(T)$ si arrotonda (Appunti MS, pp. 66–69; Dispense, pp. 196–202). L'energia viene solo dai livelli eccitati, $\langle E\rangle=\frac32k_B T\frac V{\lambda^3}g_{5/2}(z)\propto T^{5/2}$. Sopra $T_c$ il calore specifico ha un termine in più, $\propto\mathrm{d} z/\mathrm{d} T$, che sotto $T_c$ si annulla perché $z=1$ (Appunti MS, pp. 69–70). La dispensa generalizza la condizione di condensazione ad altre dimensioni e ad altre $g(\varepsilon)$ (Dispense, pp. 203–206). Questa parte non è nel quaderno.

## Articoli correlati
- [[insieme-gran-canonico-e-npt]]: l'insieme che rende il problema fattorizzabile.
- [[insieme-canonico]]: la densità degli stati $g(\varepsilon)$.
- [[corpo-nero-e-solidi]]: i fotoni come bosoni con $\mu=0$.
- [[meccanica-quantistica/corso-e-lezioni]]: il postulato di simmetrizzazione e le particelle identiche.
- [[appunti-anno-scorso]]: la divergenza tra le fonti sul $C_V$ di Fermi.

## Fonti
- `raw/foto appunti mec stat anno scorso/IMG_6349_COMPILED.HEIC`–`IMG_6354_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 56–70.
- Dispense, PDF unito, gas quantistici, pp. 170–206 (la dispensa segue Huang).
