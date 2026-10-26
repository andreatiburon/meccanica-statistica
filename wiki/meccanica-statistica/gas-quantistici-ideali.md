---
tags: [meccanica-statistica, gas-quantistici, fermi-dirac, bose-einstein, condensazione, lezione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-26
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
  - raw/foto appunti mec stat anno scorso/IMG_6349_COMPILED.HEIC … IMG_6354_COMPILED.HEIC
---

# Gas quantistici ideali: fermioni e bosoni

Per particelle identiche non interagenti, il postulato di simmetrizzazione cambia il modo di contare i microstati. Si conta allora quante particelle occupano ciascun livello, e nel gran canonico la funzione di partizione si fattorizza livello per livello. Ne escono le distribuzioni di Fermi-Dirac e di Bose-Einstein, il mare di Fermi a bassa temperatura e la condensazione di Bose-Einstein.

## Punti chiave
- **Indistinguibilità:** la funzione d'onda di particelle identiche è simmetrica (bosoni, spin intero) o antisimmetrica (fermioni, spin semintero) per scambio. Due fermioni non possono stare nello stesso stato; i bosoni sì, in numero qualunque.
- **Occupazione media:** nel gran canonico $\mathcal Q=\prod_k\mathcal Q_k$, e $\langle n_k\rangle=\frac{1}{e^{\beta(\varepsilon_k-\mu)}\pm1}$, con $+$ per i fermioni e $-$ per i bosoni. Per i bosoni serve $\mu<\varepsilon_{\min}$. L'equazione di stato è $\beta PV=\mp\sum_k\ln(1\mp\langle n_k\rangle)$, e per qualunque gas ideale non relativistico $PV=\frac23E$.
- **Limite classico:** se $\langle n_k\rangle\ll1$ si ritrova Maxwell-Boltzmann, cioè $z=e^{\beta\mu}\ll1$. La prima correzione è $\beta P\lambda^3=\rho\lambda^3\big[1\pm2^{-5/2}\rho\lambda^3\big]$: i fermioni si comportano come se si respingessero, i bosoni come se si attraessero.
- **Fermioni a $T=0$:** tutti i livelli sotto l'energia di Fermi $\varepsilon_F=\frac{\hbar^2}{2m}\big(\frac{6\pi^2\rho}{g_s}\big)^{2/3}$ sono pieni. $E=\frac35N\varepsilon_F$ e $PV=\frac25N\varepsilon_F$: la pressione non si annulla a temperatura zero.
- **Sommerfeld:** a $T\ll T_F$, $\mu\simeq\varepsilon_F\big[1-\frac{\pi^2}{12}(k_BT/\varepsilon_F)^2\big]$, $E\simeq\frac35N\varepsilon_F\big[1+\frac{5\pi^2}{12}(k_BT/\varepsilon_F)^2\big]$ e $C_V\simeq\frac{\pi^2}{2}Nk_B\frac{k_BT}{\varepsilon_F}$: lineare in $T$, perché solo la fascia larga $k_BT$ attorno a $\varepsilon_F$ si eccita.
- **Condensazione di Bose-Einstein (3D):** $\rho\lambda^3=g_{3/2}(z)+\frac{\lambda^3}{V}\frac{z}{1-z}$, e $g_{3/2}\le\zeta(3/2)\simeq2{,}612$. Sotto $k_BT_c=\frac{2\pi\hbar^2}{m}\big(\frac{\rho}{2{,}612}\big)^{2/3}$ una frazione $1-(T/T_c)^{3/2}$ delle particelle sta nello stato fondamentale. $C_V$ ha una cuspide in $T_c$.
- **Quando c'è condensazione:** con $g(\varepsilon)\propto(\varepsilon-\varepsilon_{\min})^\alpha$ serve $\alpha>0$. Il gas libero in 1D e in 2D non condensa.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Due gettoni da distribuire in due scatole. Se i gettoni hanno un nome, A e B, le configurazioni sono quattro: AB|–, –|AB, A|B, B|A. Se sono **indistinguibili**, «A a sinistra e B a destra» e il viceversa sono lo stesso stato: le configurazioni diventano tre, e due di esse hanno i gettoni insieme. Stare insieme è diventato **più probabile** (due casi su tre invece di due su quattro): sono i bosoni. Se poi vige la regola «al massimo un gettone per scatola», resta una configurazione sola, quella separata: sono i fermioni, che si evitano.

La meccanica quantistica dice che le particelle identiche sono proprio così: non si possono etichettare. Il risultato è che i bosoni hanno una tendenza statistica ad ammucchiarsi nello stesso stato, fino a riempire tutti lo stato fondamentale (condensazione di Bose-Einstein), e i fermioni una tendenza a evitarsi, fino a riempire i livelli uno per uno come l'acqua in un recipiente (il mare di Fermi). Nessuna forza: solo il modo di contare.
:::

La lezione segue questo filo.

1. [L'indistinguibilità quantistica](#indistinguibilita) e [perché si contano i numeri di occupazione](#numeri-occupazione).
2. [Le formule di Fermi-Dirac e di Bose-Einstein](#fermioni-bosoni), [l'equazione di stato e il limite classico](#equazione-di-stato), [entropia e densità degli stati](#entropia).
3. [Il gas in una scatola: dalla somma all'integrale](#gas-in-scatola) e [il gas ad alta temperatura](#alta-temperatura).
4. [I fermioni a $T=0$](#fermi-zero) e [a bassa temperatura (Sommerfeld)](#sommerfeld).
5. [I bosoni a bassa temperatura: la condensazione](#condensazione), [energia e calore specifico](#bose-energia), [quando c'è condensazione](#generalizzazione).
6. [Un compito d'esame svolto](#esercizi).

## L'indistinguibilità quantistica {#indistinguibilita}

Nel caso classico un microstato è un punto $(q,p)$ dello spazio delle fasi. Nel caso quantistico $q$ e $p$ spariscono: il microstato è una direzione nello spazio di Hilbert, individuata dai numeri quantici del sistema. Le autofunzioni di un insieme completo di osservabili sono i nuovi microstati, e ciascuna ha un autovalore dell'hamiltoniana: tutte le definizioni degli insiemi statistici si estendono (Dispense, p. 170).

Per $N$ particelle con la stessa hamiltoniana e senza interazione, $\mathcal H=\sum_i\big[\frac{P_i^2}{2m}+V(R_i)\big]$, gli autovalori sono somme e le autofunzioni prodotti: $E=\sum_i\varepsilon_i$ e $\psi(\{R_i\})=\prod_i\psi_i(R_i)$ (Dispense, pp. 170–171).

**Lo scambio.** Se le particelle sono identiche non c'è modo di seguirle nel tempo. Si misura la probabilità di trovare *una* particella in un punto, non *quale* particella. Per due particelle, trascurando lo spin, la densità di probabilità deve essere invariante per scambio: $|\Psi(r_1,r_2)|^2=|\Psi(r_2,r_1)|^2$, quindi $\Psi(r_1,r_2)=e^{i\phi}\Psi(r_2,r_1)$. L'operatore di scambio $P_{12}$ applicato due volte riporta alla funzione di partenza, $P_{12}^2=1$, quindi i suoi autovalori sono $\pm1$:
$$\Psi(r_1,r_2)=\pm\Psi(r_2,r_1).$$
La teoria quantistica relativistica lega il segno allo spin: le particelle di spin **semintero**, i fermioni, hanno funzioni d'onda antisimmetriche; quelle di spin **intero**, i bosoni, simmetriche (Dispense, p. 171).

**Le conseguenze.** Con due particelle in stati diversi $\alpha$ e $\beta$:
$$\psi_{\rm fermioni}(1,2)=\frac{1}{\sqrt2}\big[\psi_\alpha(1)\psi_\beta(2)-\psi_\alpha(2)\psi_\beta(1)\big],$$
$$\psi_{\rm bosoni}(1,2)=\frac{1}{\sqrt2}\big[\psi_\alpha(1)\psi_\beta(2)+\psi_\alpha(2)\psi_\beta(1)\big].$$
Ponendo $\beta=\alpha$, per i bosoni resta $\psi_\alpha(1)\psi_\alpha(2)$, mentre per i fermioni la funzione è **nulla ovunque**: lo stato non esiste. È il principio di esclusione di Pauli. Per i fermioni, anche con $\alpha\neq\beta$, la funzione si annulla quando le due particelle sono nello stesso punto (Dispense, p. 172).

## Perché si contano i numeri di occupazione {#numeri-occupazione}

**La difficoltà del canonico.** Con particelle indipendenti il microstato è l'insieme dei numeri quantici $\{m_i\}$ di tutte le particelle, e l'energia è una somma. Ma ogni microstato va pesato con un fattore $S_{m_1,\dots,m_N}$ che tiene conto dell'indistinguibilità: per i fermioni vale zero se due indici coincidono; per i bosoni conta le ripetizioni, per esempio $N!/[(N-n_0)!n_0!]$ se $n_0$ particelle hanno lo stesso stato. Così
$$Q_N=\sum_{m_1}\cdots\sum_{m_N}S_{m_1,\dots,m_N}\,e^{-\beta(E_{m_1}+\dots+E_{m_N})},$$
e $S$ lega tra loro tutti gli indici: la somma non si fattorizza, anche se le particelle sono indipendenti (Dispense, pp. 172–173). Il quaderno lo chiama «un enorme casino» (Appunti MS, p. 57).

**Cambiare punto di vista.** Invece di dire in che stato è ogni particella, si dice **quante particelle ci sono in ogni stato**: i numeri di occupazione $n_k$ dei livelli di singola particella $\varepsilon_k$. Ogni insieme $\{n_k\}$ è un microstato diverso, e il problema delle etichette sparisce. Essere fermioni o bosoni diventa solo un limite sui valori di $n_k$:
$$Q_N=\sum_{n_0}\sum_{n_1}\cdots\;e^{-\beta\sum_kn_k\varepsilon_k}\;\delta\Big(N-\sum_kn_k\Big).$$
La delta lega ancora livelli diversi (Dispense, p. 173).

**La semplicità disarmante del gran canonico.** Moltiplicando per $z^N$ e sommando su $N$, la delta viene assorbita: $\sum_Nz^N\delta(N-\sum_kn_k)=z^{\sum_kn_k}$. Allora
$$\mathcal Q^{GC}=\sum_{\{n_k\}}e^{-\beta\sum_kn_k(\varepsilon_k-\mu)}=\prod_k\mathcal Q_k,\qquad\mathcal Q_k=\sum_{n_k}\big(z\,e^{-\beta\varepsilon_k}\big)^{n_k}$$
(Dispense, pp. 173–174; Appunti MS, pp. 57–58). Ogni livello è un piccolo sistema gran canonico indipendente, e $\mathcal Q_k$ è al più una serie geometrica. Inoltre $E=\sum_i\langle n_i\rangle\varepsilon_i$ e $N=\sum_i\langle n_i\rangle$.

## Fermi-Dirac e Bose-Einstein {#fermioni-bosoni}

**Fermioni**, $n_i=0,1$:
$$\mathcal Q_i=1+z\,e^{-\beta\varepsilon_i},\qquad\langle n_i^{FD}\rangle=z\frac{\partial\ln\mathcal Q_i}{\partial z}=\frac{z\,e^{-\beta\varepsilon_i}}{1+z\,e^{-\beta\varepsilon_i}}=\frac{1}{e^{\beta(\varepsilon_i-\mu)}+1}.$$
Lo stesso risultato si ottiene come media diretta: $\frac{0\cdot1+1\cdot ze^{-\beta\varepsilon_i}}{\mathcal Q_i}$. Il potenziale gran canonico è $\Omega=-PV=-k_BT\sum_i\ln\big[1+ze^{-\beta\varepsilon_i}\big]$ (Dispense, p. 174).

**Bosoni**, $n_i=0,1,2,\dots$:
$$\mathcal Q_i=\sum_{n=0}^\infty\big(ze^{-\beta\varepsilon_i}\big)^n=\frac{1}{1-z\,e^{-\beta\varepsilon_i}},\qquad\langle n_i^{BE}\rangle=\frac{z\,e^{-\beta\varepsilon_i}}{1-z\,e^{-\beta\varepsilon_i}}=\frac{1}{e^{\beta(\varepsilon_i-\mu)}-1}$$
(Dispense, p. 175). La serie geometrica converge solo se $ze^{-\beta\varepsilon_i}<1$ per ogni $i$, cioè per il livello più basso: $\mu<\varepsilon_0$. Per un gas di particelle libere $\varepsilon_0=0$, quindi $\mu<0$ e $0<z<1$.

Le relazioni si invertono: $z\,e^{-\beta\varepsilon_i}=\frac{\langle n_i\rangle}{1\mp\langle n_i\rangle}$, con il segno superiore per i fermioni (Dispense, pp. 174–175).

::: idea
**Un solo segno di differenza.** Fermi-Dirac ha $+1$ al denominatore, Bose-Einstein $-1$, Maxwell-Boltzmann niente. Per i fermioni $\langle n\rangle$ non supera mai 1: è Pauli. Per i bosoni $\langle n\rangle$ diverge quando $\varepsilon\to\mu$: è il seme della condensazione. Quando $e^{\beta(\varepsilon-\mu)}\gg1$ il $\pm1$ è trascurabile e le tre statistiche coincidono. Il film qui sotto le mette a confronto.
:::

## Equazione di stato e limite classico {#equazione-di-stato}

Da $\beta PV=\ln\mathcal Q^{GC}$, con il segno superiore per i fermioni e quello inferiore per i bosoni:
$$\beta PV=\pm\sum_k\ln\big(1\pm e^{-\beta(\varepsilon_k-\mu)}\big)=\mp\sum_k\ln\big(1\mp\langle n_k\rangle\big),$$
usando $e^{-\beta(\varepsilon_k-\mu)}=\langle n_k\rangle/(1\mp\langle n_k\rangle)$ (Dispense, pp. 175–176).

**Il limite classico.** Se $\langle n_k\rangle\ll1$ per ogni $k$, $\ln(1\mp\langle n_k\rangle)\simeq\mp\langle n_k\rangle$ e $\beta PV=\sum_k\langle n_k\rangle=N$: il gas ideale classico. Il caso classico è quello in cui i livelli accessibili sono tanti rispetto alle particelle: l'occupazione media è bassa, e il problema dell'indistinguibilità non si pone (Dispense, p. 176).

:::: {.passaggi titolo="Il confronto con il numero classico di particelle per cella"}
Nel caso classico uno stato $k$ corrisponde a una cella $d^3q\,d^3p/h^3$. Il numero medio di particelle nella cella è $n(p,q)=h^3P(p,q)\langle N\rangle$, con $P(p,q)$ la densità di probabilità della particella 1. Nel gran canonico, integrando sulle altre $N-1$ particelle e usando $e^{\beta PV}=\sum_Nz^NQ_1^N/N!$, si trova $P(p,q)=e^{-\beta\mathcal H(p,q)}/(h^3Q_1)$. Con $\langle N\rangle=zV/\lambda^3$ e $Q_1=V/\lambda^3$:
$$n(p,q)=\frac{e^{-\beta\mathcal H(p,q)}}{Q_1}\,\frac{zV}{\lambda^3}=e^{-\beta[\varepsilon(p,q)-\mu]}$$
(Dispense, pp. 176–177). Coincide con $\langle n_k\rangle=1/(e^{\beta(\varepsilon_k-\mu)}\pm1)$ quando il denominatore è grande, cioè quando $\langle n_k\rangle\ll1$. È la statistica di Maxwell-Boltzmann già vista nell'[[insieme-canonico]].
::::

**Ancora il limite classico, dalla funzione di partizione.** Se $ze^{-\beta\varepsilon_i}\ll1$, entrambe le distribuzioni danno $\langle n_i\rangle\simeq ze^{-\beta\varepsilon_i}$. Integrando $\langle n_i\rangle=z\,\partial_z\ln\mathcal Q_i$:
$$\ln\mathcal Q_i=\int_0^z\frac{dz'}{z'}\langle n_i\rangle=ze^{-\beta\varepsilon_i},\qquad\ln\mathcal Q=z\sum_ie^{-\beta\varepsilon_i}=z\,Q(1,V,T),$$
dove $Q(1,V,T)$ è la funzione di partizione canonica di una particella. Quindi
$$\mathcal Q=e^{zQ(1,V,T)}=\sum_N\frac{1}{N!}\big[zQ(1,V,T)\big]^N=\sum_Nz^NQ_N :$$
è la funzione di partizione gran canonica di un gas classico, **con il fattore $1/N!$ già incluso** (Dispense, p. 177). Il fattore di Gibbs, introdotto a mano nell'[[insieme-microcanonico]] per salvare l'estensività, è il limite classico del conteggio quantistico.

## Entropia e densità degli stati {#entropia}

**L'entropia dai numeri di occupazione.** Da $-PV=\Omega=E-TS-\mu N$ segue $S/k_B=\beta E-\beta\mu N+\beta PV$. Sostituendo le espressioni in $\langle n_k\rangle$ e usando $\beta(\varepsilon_k-\mu)=-\big[\ln\langle n_k\rangle-\ln(1\mp\langle n_k\rangle)\big]$:
$$\frac{S}{k_B}=-\sum_k\Big[\langle n_k\rangle\ln\langle n_k\rangle\pm\big(1\mp\langle n_k\rangle\big)\ln\big(1\mp\langle n_k\rangle\big)\Big]$$
(Dispense, p. 178). Anche l'entropia si esprime solo con le occupazioni. Per i fermioni è l'entropia di tanti sistemi a due stati, uno per livello: è nulla se ogni livello è pieno o vuoto, massima se è pieno a metà.

**$N$ come integrale sulla densità degli stati.** Inserendo $\int d\varepsilon\,\delta(\varepsilon-\varepsilon_k)=1$:
$$\langle N\rangle=\int d\varepsilon\;\frac{G(\varepsilon)}{e^{\beta(\varepsilon-\mu)}\pm1},\qquad G(\varepsilon)=\sum_k\delta(\varepsilon-\varepsilon_k)$$
(Dispense, pp. 178–179). Il fattore $1/(e^{\beta(\varepsilon-\mu)}\pm1)$ è il numero di occupazione del livello di energia $\varepsilon$, e $G(\varepsilon)$ è la stessa densità degli stati di singola particella dell'[[insieme-canonico]].

## Il gas in una scatola: dalla somma all'integrale {#gas-in-scatola}

$N$ particelle quantistiche libere in una scatola cubica di lato $L$. Per una buca infinita i momenti permessi sono $p_n=\hbar\pi n/L$, perché la lunghezza d'onda deve essere $\lambda_n=2L/n$, e in tre dimensioni
$$\varepsilon_{n_x,n_y,n_z}=\frac{\hbar^2\pi^2}{2mL^2}\big(n_x^2+n_y^2+n_z^2\big)$$
(Dispense, p. 179). Per $V\to\infty$ i livelli diventano praticamente continui.

**Dalla somma all'integrale.** Ogni stato occupa nello spazio dei momenti un volume $V_{\rm stato}=(\hbar\pi/L)^3$. Gli $n_i$ sono positivi, quindi si prende solo un ottante della sfera:
$$\sum_{\vec n}\to\frac18\frac{1}{V_{\rm stato}}\int_0^\infty4\pi p^2dp=\frac{V}{h^3}\int_0^\infty4\pi p^2dp ,$$
perché $\frac18(L/\hbar\pi)^3=V/(2\pi\hbar)^3$ (Dispense, pp. 179–180; Appunti MS, p. 60).

::: attenzione
**Lo stato $\varepsilon=0$.** In energia $p^2dp\propto\sqrt\varepsilon\,d\varepsilon$, che si annulla in $\varepsilon=0$: lo stato fondamentale ha peso nullo nell'integrale. Per i fermioni non è un problema, perché ospita al più una particella. Per i bosoni sì: a $T=0$ ci sono tutti lì, e il numero può essere macroscopico. Lo stato fondamentale va quindi **separato** e trattato a parte (Dispense, p. 180; Appunti MS, p. 61).
:::

Con $y=\beta p^2/2m$ e $\lambda=h/\sqrt{2\pi mk_BT}$:
$$\beta P\lambda^3=\pm\frac{2}{\sqrt\pi}\int_0^\infty y^{1/2}\ln\big(1\pm ze^{-y}\big)\,dy,\qquad\rho\lambda^3=\frac{2}{\sqrt\pi}\int_0^\infty y^{1/2}\,\frac{ze^{-y}}{1\pm ze^{-y}}\,dy$$
(Dispense, pp. 180–181; Appunti MS, pp. 60–61). Per i bosoni si isola il termine $p=0$:
$$\beta PV=-\ln(1-z)-\frac{4\pi V}{h^3}\int_0^\infty p^2\ln\big(1-ze^{-\beta p^2/2m}\big)dp,$$
$$\rho=\frac1V\frac{z}{1-z}+\frac{4\pi}{h^3}\int_0^\infty\frac{p^2\,ze^{-\beta p^2/2m}}{1-ze^{-\beta p^2/2m}}dp .$$

**Le funzioni $f$ e $g$.** Si scrive di solito
$$\text{fermioni: }\beta P\lambda^3=f_{5/2}(z),\qquad\rho\lambda^3=f_{3/2}(z);$$
$$\text{bosoni: }\beta P\lambda^3=g_{5/2}(z)-\frac{\lambda^3}{V}\ln(1-z),\qquad\rho\lambda^3=g_{3/2}(z)+\frac{\lambda^3}{V}\frac{z}{1-z}.$$
Poiché $z\,\frac{d}{dz}\beta PV=\langle N\rangle$, $g_{3/2}=z\,dg_{5/2}/dz$ e $f_{3/2}=z\,df_{5/2}/dz$ (Dispense, p. 181). Sviluppando in serie, $g_\nu(z)=\sum_{l\ge1}z^l/l^\nu$ e $f_\nu(z)=\sum_{l\ge1}(-1)^{l+1}z^l/l^\nu$ (conoscenza generale).

**Lo stesso con la densità degli stati.** $G(\varepsilon)=\frac{V}{h^3}\int4\pi p^2dp\,\delta(\varepsilon-\frac{p^2}{2m})=\frac{4\pi V}{h^3}\sqrt2\,m^{3/2}\sqrt\varepsilon\,\theta(\varepsilon)$, e $\int d\varepsilon\,G(\varepsilon)/(e^{\beta(\varepsilon-\mu)}\pm1)$ ridà la stessa $\rho\lambda^3$: i coefficienti si combinano esattamente in $V/\lambda^3\cdot2/\sqrt\pi$ (Dispense, p. 182).

**Energia e pressione.** $\langle E\rangle=-\partial_\beta\ln\mathcal Q^{GC}|_z$. A $z$ fissato l'unica dipendenza da $\beta$ è in $\lambda^3=A\beta^{3/2}$, e $\ln\mathcal Q=\frac{V}{\lambda^3}f_{5/2}(z)$:
$$-\langle E\rangle=\frac{V}{A}f_{5/2}(z)\frac{\partial\beta^{-3/2}}{\partial\beta}=-\frac32\frac{V}{\lambda^3\beta}f_{5/2}(z)\quad\Longrightarrow\quad\langle E\rangle=\frac32PV$$
(Dispense, pp. 182–183). La relazione $PV=\frac23E$ vale per fermioni, bosoni e gas classico: dipende solo da $\varepsilon\propto p^2$ in tre dimensioni.

## Il gas quantistico ad alta temperatura {#alta-temperatura}

**Che cosa vuol dire alta temperatura.** Nel gran canonico si fissano $z$ e $T$; per capire che cosa succede a densità fissata bisogna vedere come deve variare $z$ con $T$. In $\rho=\frac{1}{\lambda^3}\frac{2}{\sqrt\pi}\int\frac{y^{1/2}dy}{e^y/z\pm1}$ il fattore $1/\lambda^3$ cresce come $T^{3/2}$, e l'integrale è crescente in $z$. Per tenere $\rho$ costante, quando $T$ sale $z$ deve scendere: il potenziale chimico diventa sempre più negativo, e $T\to\infty$ a $\rho$ costante corrisponde a $z\to0$. Il limite di bassa densità è analogo. Anche il caso classico lo diceva: $z=\rho\lambda^3$ (Dispense, pp. 183–184).

**Quando l'indistinguibilità attira o respinge.** Si sviluppa per $z$ piccolo: $\frac{1}{e^y/z\pm1}=\frac{ze^{-y}}{1\pm ze^{-y}}\simeq ze^{-y}\big(1\mp ze^{-y}\big)$.

:::: {.passaggi titolo="La prima correzione quantistica all'equazione di stato"}
**La densità.** Con $t=y$ nel primo integrale e $t=2y$ nel secondo:
$$\rho\lambda^3=\frac{2}{\sqrt\pi}\Big[z\int t^{1/2}e^{-t}dt\mp\frac{z^2}{2^{3/2}}\int t^{1/2}e^{-t}dt\Big]=z\mp\frac{z^2}{2\sqrt2},$$
usando $\int_0^\infty t^{1/2}e^{-t}dt=\Gamma(\frac32)=\frac{\sqrt\pi}{2}$.

**Invertire.** Con $\rho^*=\rho\lambda^3$ si ha l'equazione di secondo grado $\mp\frac{1}{2\sqrt2}z^2+z-\rho^*=0$. Prendendo la soluzione positiva e sviluppando per $\rho^*$ piccolo con $\sqrt{1+x}\simeq1+\frac x2-\frac{x^2}{8}$:
$$z\simeq\rho^*\pm\frac{\rho^{*2}}{2\sqrt2}.$$
**La pressione.** Con $\ln(1+x)\simeq x-\frac{x^2}{2}$:
$$\beta P\lambda^3=\pm\frac{2}{\sqrt\pi}\int y^{1/2}\Big(\pm ze^{-y}-\frac12z^2e^{-2y}\Big)dy=z\mp\frac{z^2}{2^{5/2}}.$$
**Sostituendo** $z$ al secondo ordine, e usando $\frac{1}{2\sqrt2}-\frac{1}{2^{5/2}}=\frac{1}{2^{5/2}}$:
$$\beta P\lambda^3=\rho^*\pm\frac{\rho^{*2}}{2\sqrt2}\mp\frac{\rho^{*2}}{2^{5/2}}=\rho^*\Big(1\pm\frac{\rho^*}{2^{5/2}}\Big)$$
(Dispense, pp. 184–185; Appunti MS, pp. 62–63).
::::

$$\frac{\beta P}{\rho}=1\pm\frac{\rho\lambda^3}{2^{5/2}}+\dots$$
È un'espansione del viriale con $B_2=\pm\lambda^3/2^{5/2}$, come nei [[gas-reali-viriale-e-van-der-waals|gas reali]]. Per i **fermioni** $B_2>0$: la pressione è più alta che nel gas classico, come se le particelle si respingessero. Per i **bosoni** $B_2<0$: come se si attraessero. Non c'è nessuna forza: è l'effetto statistico dell'analogia dei gettoni. La correzione conta quando $\rho\lambda^3$, cioè il rapporto tra il «volume» della funzione d'onda e il volume per particella, non è trascurabile: quando le funzioni d'onda si «sentono» (Dispense, p. 186). La figura di p. 186 mostra $\beta P\lambda^3$ in funzione di $\rho\lambda^3$ per Bose, Fermi e il gas classico.

**Il potenziale chimico.** $\beta\mu=\ln z=\ln(\rho\lambda^3)+\ln\big(1\pm\frac{\rho\lambda^3}{2^{3/2}}\big)$: negativo, e divergente verso $-\infty$ per $T\to\infty$ o $\rho\to0$ (Dispense, p. 186).

## I fermioni a temperatura zero {#fermi-zero}

A bassa temperatura lo sviluppo in $z$ non serve più: $\beta\mu$ è grande e **positivo**. Si riparte da $\langle N\rangle=\int d\varepsilon\,G(\varepsilon)\,n(\varepsilon)$, dove $G$ è fissata dall'hamiltoniana e $n(\varepsilon)=\frac{1}{e^{\beta(\varepsilon-\mu)}+1}$ dipende da $T$ (Dispense, pp. 186–187).

**La forma di $n(\varepsilon)$.** Vale $\frac12$ in $\varepsilon=\mu$, tende a 1 sotto e a 0 sopra: è un **gradino smussato**. Infatti
$$n(\varepsilon)-\frac12=\frac{1-e^x}{2(1+e^x)}=-\frac12\tanh\frac{\beta(\varepsilon-\mu)}{2},\qquad x=\beta(\varepsilon-\mu).$$
La tangente iperbolica cambia da $-1$ a $+1$ quando il suo argomento è di ordine 1, cioè in una fascia $|\varepsilon-\mu|\approx k_BT$. Per $T\to0$ diventa un gradino vero (Dispense, p. 187). Le dispense scrivono $n-\frac12=+\frac12\tanh$; il segno corretto è $-$, come mostra il loro stesso passaggio (calcolo mio).

**A $T=0$.** Tutti gli stati con $\varepsilon<\mu$ sono pieni e tutti quelli sopra sono vuoti. $\mu$ è l'energia del livello occupato più alto: l'**energia di Fermi** $\varepsilon_F$. Si trova da
$$\langle N\rangle=\int_{\varepsilon_{\min}}^{\varepsilon_F}G(\varepsilon)\,d\varepsilon,\qquad\langle E\rangle=\int_{\varepsilon_{\min}}^{\varepsilon_F}\varepsilon\,G(\varepsilon)\,d\varepsilon$$
(Dispense, p. 188).

:::: {.passaggi titolo="Energia di Fermi, energia e pressione del gas di Fermi"}
Con la degenerazione di spin $g_s$, $G(\varepsilon)=A_F\varepsilon^{1/2}\theta(\varepsilon)$ con $A_F=\frac{4\pi g_sV}{h^3}\sqrt2\,m^{3/2}$:
$$\langle N\rangle=A_F\frac{\varepsilon_F^{3/2}}{3/2}\quad\Longrightarrow\quad\varepsilon_F=\Big(\frac32\frac{\langle N\rangle}{A_F}\Big)^{2/3}=\frac{\hbar^2}{2m}\Big(\frac{6\pi^2}{g_s}\frac{\langle N\rangle}{V}\Big)^{2/3}.$$
Il **momento di Fermi** è $p_F=\sqrt{2m\varepsilon_F}$. L'energia:
$$\langle E\rangle=A_F\frac{\varepsilon_F^{5/2}}{5/2}=\frac35\langle N\rangle\varepsilon_F,\qquad PV=\frac23\langle E\rangle=\frac25\langle N\rangle\varepsilon_F .$$
**Verifica:** a $T=0$, $G=E+PV=\big(\frac35+\frac25\big)N\varepsilon_F=N\varepsilon_F$, quindi $\mu=G/N=\varepsilon_F$ (Dispense, pp. 188–189).
::::

::: idea
**Il mare di Fermi.** Riempire una scatola di fermioni è come riempire un recipiente d'acqua: ogni nuova particella deve andare sopra le altre, perché i posti sotto sono occupati. Anche a $T=0$ le particelle si muovono, con un'energia media $\frac35\varepsilon_F$, e il gas **preme sulle pareti**: la pressione di degenerazione, $P=\frac25\rho\varepsilon_F$. Negli elettroni di un metallo $\varepsilon_F\simeq7$ eV, cioè $T_F=\varepsilon_F/k_B\simeq80\,000$ K: a temperatura ambiente il gas di elettroni è profondamente quantistico. È la stessa pressione che sostiene le nane bianche contro la gravità. Gli esempi numerici sono miei.
:::

::: {.lab-segnaposto tipo="fermi"}
:::

## I fermioni a bassa temperatura: lo sviluppo di Sommerfeld {#sommerfeld}

Per $T\to0$, $\mu\to\varepsilon_F$ e $z\to\infty$: gli sviluppi in serie di $z$ non funzionano. Il trucco di Sommerfeld è sviluppare la **derivata** di $n(\varepsilon)$, che è piccata attorno a $\mu$, attorno al suo massimo (Dispense, p. 189; Appunti MS, pp. 63–66).

:::: {.passaggi titolo="Il potenziale chimico a T piccola"}
**1. Scrivere $N$ in variabili adimensionali.** Con $y=\beta\varepsilon$:
$$\langle N\rangle=A\beta^{-3/2}\int_0^\infty\frac{y^{1/2}\,dy}{e^{y}e^{-\beta\mu}+1}.$$
**2. Integrare per parti**, per far comparire la derivata di $n$:
$$\int_0^\infty\frac{y^{1/2}dy}{z^{-1}e^y+1}=\frac23\Big[\frac{y^{3/2}}{z^{-1}e^y+1}\Big]_0^\infty+\frac23\int_0^\infty y^{3/2}\,\frac{z^{-1}e^y}{(z^{-1}e^y+1)^2}\,dy .$$
Il termine di bordo è nullo.

**3. Centrare in $\mu$.** Con $t=y-\beta\mu$ l'integrale va da $-\beta\mu$ a $\infty$. Il pezzo da $-\infty$ a $-\beta\mu$ è esponenzialmente piccolo, perché $\beta\mu$ è grande, e si aggiunge senza errore apprezzabile:
$$\langle N\rangle\simeq A\beta^{-3/2}\,\frac23\int_{-\infty}^{\infty}(t+\beta\mu)^{3/2}\,\frac{e^t}{(e^t+1)^2}\,dt .$$
**4. Sviluppare.** $\frac{e^t}{(e^t+1)^2}$ è **pari**, ha un massimo in 0 e decade come $e^{-|t|}$. Si sviluppa $(t+\beta\mu)^{3/2}\simeq(\beta\mu)^{3/2}+\frac32(\beta\mu)^{1/2}t+\frac38(\beta\mu)^{-1/2}t^2$. Il termine lineare in $t$ si annulla per simmetria.

**5. Gli integrali.** $\frac{e^t}{(e^t+1)^2}=-\frac{d}{dt}\frac{1}{e^t+1}$, quindi $I_0=\int\frac{e^t}{(e^t+1)^2}dt=1$. In generale
$$I_n\equiv\int_{-\infty}^\infty t^n\frac{e^t}{(e^t+1)^2}dt=2n(n-1)!\,(1-2^{1-n})\,\zeta(n),\qquad I_2=2\zeta(2)=\frac{\pi^2}{3},$$
con $\zeta(2)=\frac{\pi^2}{6}$, $\zeta(4)=\frac{\pi^4}{90}$, $\zeta(6)=\frac{\pi^6}{945}$ (Dispense, pp. 191–192).

**6. Il risultato.**
$$\langle N\rangle=A\beta^{-3/2}\,\frac23\Big[(\beta\mu)^{3/2}+\frac{\pi^2}{8}(\beta\mu)^{-1/2}\Big].$$
Con $\langle N\rangle=\frac23A\varepsilon_F^{3/2}$: $\varepsilon_F^{3/2}=\mu^{3/2}+\frac{\pi^2}{8}\frac{(k_BT)^2}{\mu^{1/2}}$. Sviluppando al prim'ordine in $(k_BT)^2$ e sostituendo $\mu\simeq\varepsilon_F$ nella correzione:
$$\mu\simeq\varepsilon_F\Big[1-\frac{\pi^2}{12}\Big(\frac{k_BT}{\varepsilon_F}\Big)^2\Big]$$
(Dispense, pp. 190–192).
::::

Il potenziale chimico scende leggermente al salire di $T$. Lo stesso procedimento si applica all'energia, con $(t+\beta\mu)^{5/2}\simeq(\beta\mu)^{5/2}+\frac52(\beta\mu)^{3/2}t+\frac{15}{8}(\beta\mu)^{1/2}t^2$:
$$\langle E\rangle=A\beta^{-5/2}\Big[\frac25(\beta\mu)^{5/2}+\frac34\cdot\frac{\pi^2}{3}(\beta\mu)^{1/2}\Big],$$
$$\frac{\langle E\rangle}{\langle E(0)\rangle}=\Big(\frac{\mu}{\varepsilon_F}\Big)^{5/2}+\frac{5\pi^2}{8}\Big(\frac{k_BT}{\varepsilon_F}\Big)^2\Big(\frac{\mu}{\varepsilon_F}\Big)^{1/2}$$
(Dispense, pp. 193–194).

::: attenzione
**La correzione di μ(T) dimenticata.** A questo punto le dispense (p. 194) sostituiscono $\mu$ con $\varepsilon_F$ in entrambi i termini e ottengono $\frac{\langle E\rangle}{\langle E(0)\rangle}=1+\frac{5\pi^2}{8}\big(\frac{k_BT}{\varepsilon_F}\big)^2$; il quaderno ha lo stesso risultato. Ma nel primo termine la correzione di $\mu$ è dello stesso ordine: $\big(\frac{\mu}{\varepsilon_F}\big)^{5/2}\simeq1-\frac52\cdot\frac{\pi^2}{12}\big(\frac{k_BT}{\varepsilon_F}\big)^2=1-\frac{5\pi^2}{24}\big(\frac{k_BT}{\varepsilon_F}\big)^2$. Sommando:
$$\frac{\langle E\rangle}{\langle E(0)\rangle}=1+\Big(\frac{5\pi^2}{8}-\frac{5\pi^2}{24}\Big)\Big(\frac{k_BT}{\varepsilon_F}\Big)^2=1+\frac{5\pi^2}{12}\Big(\frac{k_BT}{\varepsilon_F}\Big)^2 .$$
Di conseguenza il calore specifico è $C_V=\langle E(0)\rangle\frac{5\pi^2}{6}\frac{k_B^2T}{\varepsilon_F^2}=\frac{\pi^2}{2}Nk_B\frac{k_BT}{\varepsilon_F}$, non $\langle E(0)\rangle\frac{5\pi^2}{4}\frac{k_B^2T}{\varepsilon_F^2}$ (Dispense, p. 195). È il risultato standard dello sviluppo di Sommerfeld; il conto è mio, e il laboratorio qui sopra lo conferma numericamente. La dipendenza lineare da $T$ non cambia.
:::

**Il calore specifico e il terzo principio.** $C_V\propto T$ va a zero per $T\to0$. È stato verificato che il contributo degli elettroni di conduzione di un metallo, trattati in prima approssimazione come un gas di Fermi libero, è lineare in $T$ (Dispense, p. 195). Il quaderno lo spiega così: cambiano occupazione solo le particelle nella fascia di larghezza $k_BT$ attorno a $\varepsilon_F$, che sono una frazione $\sim k_BT/\varepsilon_F$ del totale, e ciascuna guadagna un'energia $\sim k_BT$ (Appunti MS, p. 66).

:::: {.passaggi titolo="Perché il terzo principio vuole C_V → 0"}
Da $dE=T\,dS-P\,dV$, a volume costante $C_V=T\,\frac{dS}{dT}$, cioè $dS=\frac{C_V}{T}dT$. Il teorema di Nernst dice $S(T=0)=0$, quindi
$$S(T)=\int_0^T\frac{C_V}{T'}dT'.$$
Se $C_V$ restasse finito a $T=0$ l'integrale divergerebbe. Con $C_V\propto T^\alpha$ si ha $S=T^\alpha/\alpha$, finito solo se $\alpha>0$ (Dispense, p. 195). Il gas di Fermi, con $\alpha=1$, lo rispetta; il gas classico, con $C_V=\frac32Nk_B$, no.
::::

## I bosoni a bassa temperatura: la condensazione {#condensazione}

**Il potenziale chimico sale raffreddando.** Per i bosoni $n(\varepsilon)=\frac{1}{z^{-1}e^{\beta\varepsilon}-1}$ diverge per $\varepsilon=\mu$, e $\mu$ deve restare sotto il livello più basso. Ad alta $T$, a densità costante, $\mu$ è grande e negativo e si campiona solo la coda esponenziale: è il caso classico. Abbassando $T$, $\lambda^{-3}\propto T^{3/2}$ cala e, per tenere $\rho$ costante, $z$ deve crescere. Da $z=e^{\beta\mu}$, $dz=\mu e^{\beta\mu}d\beta+\beta e^{\beta\mu}d\mu$, cioè
$$d\mu=\frac1\beta e^{-\beta\mu}dz+\mu\frac{dT}{T}>0,$$
perché $dz>0$, $\mu<0$ e $dT<0$: **raffreddando, $\mu$ cresce** (Dispense, p. 196). Ma non può superare $\varepsilon_{\min}=0$. Due possibilità: o $\mu$ raggiunge $\varepsilon_{\min}$ solo a $T=0$, come ci si aspetta dal fatto che a $T=0$ tutte le particelle stanno nel fondamentale, oppure lo raggiunge a una temperatura **finita**. In questo secondo caso lo stato fondamentale si popola con un numero macroscopico di particelle: è la **condensazione di Bose-Einstein**. La figura di p. 197 mostra $n(\varepsilon)$ per tre valori di $\mu$ sempre più vicini a 0.

**Separare il fondamentale.** Il passaggio dalla somma all'integrale è lecito se in $4\pi p^2dp$ ci sono molti stati, oppure se dove ce ne sono pochi l'integrando è trascurabile. Per i bosoni con $\mu\to0$ la seconda condizione salta: $n(\varepsilon_{\min})$ diverge. Si integra quindi su tutti gli stati tranne il fondamentale, e quello si conta a parte, con $\langle n_0\rangle=\frac{1}{z^{-1}-1}=\frac{z}{1-z}$:
$$\rho=\frac{1}{\lambda^3}g_{3/2}(z)+\frac1V\frac{z}{1-z}\equiv\tilde\rho+\rho_0$$
(Dispense, pp. 196–198; Appunti MS, p. 61). $\tilde\rho$ è la densità delle particelle negli stati eccitati, $\rho_0$ quella del **condensato**. Nel limite termodinamico $\rho_0$ è trascurabile, tranne che per $z\to1$.

**La soluzione grafica.** Per $z<1$, $\rho_0=0$ e si cerca $z$ da $g_{3/2}(z)=\rho\lambda^3$. Ma $g_{3/2}$ è **limitata**: è crescente su $[0,1]$, la sua derivata diverge in $z=1$, e il suo valore massimo è
$$g_{3/2}(1)=\zeta\big(\tfrac32\big)\simeq2{,}612 .$$
A densità costante $\rho\lambda^3\propto T^{-3/2}$ cresce raffreddando (Dispense, p. 198). Riscrivendo l'equazione come
$$\frac{\langle n_0\rangle}{V}\lambda^3=\rho\lambda^3-g_{3/2}(z):$$
- se $\rho\lambda^3<g_{3/2}(1)$ esiste $z<1$ con $g_{3/2}(z)=\rho\lambda^3$, e $\langle n_0\rangle$ non è macroscopico;
- se $\rho\lambda^3>g_{3/2}(1)$ nessun $z$ basta: l'unica possibilità è $\langle n_0\rangle/V>0$. **Gli stati eccitati sono saturi, e le particelle in eccesso vanno nel fondamentale** (Dispense, p. 199).

::: idea
**Il parcheggio pieno.** Gli stati eccitati sono un parcheggio con una capienza massima, $V\,g_{3/2}(1)/\lambda^3$, che cala raffreddando come $T^{3/2}$. Finché le auto ci stanno, il garage sotterraneo, cioè lo stato fondamentale, resta praticamente vuoto. Quando la capienza scende sotto il numero di auto, tutte quelle in più finiscono nel garage. Il condensato non nasce perché le particelle si attraggono, ma perché gli stati eccitati **non possono contenerle**.
:::

**La temperatura critica.** La condensazione comincia quando $\rho\lambda^3(T_c)=g_{3/2}(1)$:
$$k_BT_c=\frac{2\pi\hbar^2}{m}\Big(\frac{\rho}{g_{3/2}(1)}\Big)^{2/3}$$
(Dispense, p. 199). Per l'elio-4 liquido, con la sua densità, la formula dà $T_c\simeq3{,}1$ K, vicino alla transizione superfluida a 2,17 K (calcolo e confronto miei).

**La frazione condensata.** Per $T<T_c$, $z=1$ e gli stati eccitati contengono $\tilde\rho=g_{3/2}(1)/\lambda^3$. Usando $\rho\lambda^3(T_c)=g_{3/2}(1)$:
$$\rho_0=\rho-\frac{g_{3/2}(1)}{\lambda^3}=\rho-\rho\frac{\lambda^3(T_c)}{\lambda^3(T)}=\rho\Big[1-\Big(\frac{T}{T_c}\Big)^{3/2}\Big].$$
Allo stesso modo, a $T$ fissata, esiste una densità critica $\rho_c=g_{3/2}(1)/\lambda^3$, e $\rho_0=\rho-\rho_c$. In sintesi (Dispense, pp. 199–200; Appunti MS, pp. 66–69):
$$\frac{N_0}{N}=\begin{cases}0 & \rho\lambda^3\le g_{3/2}(1)\\[1mm]1-\Big(\dfrac{T}{T_c}\Big)^{3/2}=1-\dfrac{\rho_c}{\rho} & \rho\lambda^3\ge g_{3/2}(1)\end{cases}$$

::: {.lab-segnaposto tipo="bose"}
:::

## Energia, calore specifico e taglia finita {#bose-energia}

Per il gas ideale $\varepsilon_{\min}=0$, quindi il condensato non contribuisce all'energia, e basta la parte non condensata:
$$\langle E\rangle=\frac32PV=\frac32k_BT\,\frac{V}{\lambda^3}\,g_{5/2}(z)$$
(Dispense, p. 200).

- **Sopra $T_c$** la dipendenza da $T$ passa sia per $T^{5/2}$ sia per $z(T)$: $C_V\sim\frac52T^{3/2}g_{5/2}(z)+T^{5/2}\frac{dg_{5/2}}{dz}\frac{dz}{dT}$. Ad alta $T$ si ritrova il valore classico $\frac32Nk_B$.
- **Sotto $T_c$** $z=1$ e non dipende più da $T$: $\langle E\rangle\propto T^{5/2}$ e $C_V\propto T^{3/2}$.

Il calore specifico ha quindi una **cuspide** in $T_c$: è continuo, ma la sua derivata salta. È il segno di una vera transizione di fase (Dispense, pp. 200–201; Appunti MS, pp. 69–70). La transizione $\lambda$ dell'elio-4, che è un bosone, si interpreta come un effetto della condensazione di Bose-Einstein; nell'elio-3, che è un fermione, non c'è (Dispense, p. 201).

::: idea
**Una transizione senza interazioni.** Sotto $T_c$, a temperatura fissata, la pressione $P=\frac{k_BT}{\lambda^3}g_{5/2}(1)$ **non dipende dalla densità**: aggiungendo particelle si ingrossa solo il condensato, che non contribuisce. L'isoterma ha un tratto piatto, come nella coesistenza liquido-vapore di [[gas-reali-viriale-e-van-der-waals|Van der Waals]]: c'è una forte analogia con una transizione del primo ordine (Dispense, p. 205). Ed è una transizione di fase in un gas **senza interazioni**: unica nel corso.
:::

**La taglia finita.** A volume finito il termine $\frac{\lambda^3}{V}\frac{z}{1-z}$ è sempre presente, e la somma con $g_{3/2}(z)$ copre tutti i valori: per ogni densità esiste un $z<1$. A volume finito, quindi, non c'è una transizione vera. Le differenze dal caso infinito compaiono solo per $1-z\approx1/V$: per un sistema macroscopico sono invisibili, e $z(T)$ si arrotonda appena vicino a $T_c$ (Dispense, pp. 201–202). Il condensato esiste, in senso stretto, solo nel limite $V\to\infty$.

## Quando c'è condensazione: la densità degli stati {#generalizzazione}

Il gas ideale 3D ha $G(\varepsilon)\propto\varepsilon^{1/2}$ e $g_{3/2}$ limitata. Ma la densità degli stati cambia con la dimensione dello spazio o con un potenziale esterno. Due cose possono cambiare: lo stato di minima energia può avere $\varepsilon_{\min}\neq0$, e l'integrale equivalente a $g_{3/2}$ può **divergere** per $\mu=\varepsilon_{\min}$. In quel caso esiste sempre uno $z$ che soddisfa l'equazione, e $\mu=\varepsilon_{\min}$ si raggiunge solo a $T=0$: niente condensazione (Dispense, pp. 203–204).

**Il criterio.** Con $\mu=\varepsilon_{\min}$, il massimo numero di particelle non condensate è
$$\langle N_{\rm nc}(T,\mu=\varepsilon_{\min})\rangle=\int_{\varepsilon_{\min}}^\infty\frac{G(\varepsilon)\,d\varepsilon}{e^{\beta(\varepsilon-\varepsilon_{\min})}-1}.$$
Con $G(\varepsilon)=A(\varepsilon-\varepsilon_{\min})^\alpha$ e $y=\beta(\varepsilon-\varepsilon_{\min})$:
$$\langle N_{\rm nc}\rangle=\frac{A}{\beta^{\alpha+1}}\int_0^\infty\frac{y^\alpha\,dy}{e^y-1}=\frac{A}{\beta^{\alpha+1}}\,\Gamma(\alpha+1)\,\zeta(\alpha+1).$$
L'integrale converge solo se $\alpha>0$; allora, uguagliando a $N$,
$$k_BT_c=\Big(\frac{N}{A\,\Gamma(\alpha+1)\,\zeta(\alpha+1)}\Big)^{\frac{1}{1+\alpha}}$$
(Dispense, p. 204). Sotto $T_c$ le particelle non condensate diminuiscono come $T^{\alpha+1}$ e si azzerano a $T=0$. Sopra $T_c$, $z$ è il valore per cui $\langle N_{\rm nc}(T,z)\rangle=N$ (Dispense, pp. 204–205). Per il gas 3D $\alpha=\frac12$, $\Gamma(\frac32)\zeta(\frac32)$, e si ritrova la formula di prima.

**Una e due dimensioni.** Per un gas libero $G_{1D}\propto\varepsilon^{-1/2}$ ($\alpha=-\frac12$) e $G_{2D}=$ costante ($\alpha=0$). Con $z\to1$ l'integrando vicino a $\varepsilon=0$ va come $\varepsilon^{-1/2}\cdot\frac{1}{\beta\varepsilon}$ in 1D e come $\frac{1}{\beta\varepsilon}$ in 2D: in entrambi i casi l'integrale diverge (in 2D logaritmicamente). **In 1 e 2 dimensioni il gas ideale di bosoni non condensa** (Dispense, pp. 205–206).

::: attenzione
**Due sviste a p. 206.** (1) In una dimensione $\int dp\,\delta(\varepsilon-\frac{p^2}{2m})$ dà, con $x=p^2/2m$, un fattore $dx/\sqrt x$, non $dx/x$: la densità degli stati è $G_{1D}=A\,\varepsilon^{-1/2}\theta(\varepsilon)$, non $A\,\varepsilon^{-1}\theta(\varepsilon)$. La conclusione, l'integrale divergente, non cambia. (2) La frase finale parla di «gas di elettroni», ma gli elettroni sono fermioni e non condensano mai: va letto «gas di bosoni». Calcolo mio.
:::

::: idea
**Condensare in una trappola.** Un potenziale esterno cambia $G(\varepsilon)$. In una trappola armonica tridimensionale i livelli sono $\hbar\omega(n_x+n_y+n_z)$ e $G\propto\varepsilon^2$: $\alpha=2>0$, e la condensazione c'è. È proprio così che nel 1995 si sono ottenuti i primi condensati di atomi freddi, in trappole magnetiche. L'esempio è conoscenza generale, non viene dalle dispense.
:::

## Un compito d'esame svolto {#esercizi}

:::: esercizio
**Compito del 22/06/2018.** $N$ particelle identiche non interagenti in un cilindro di raggio $R$ e altezza $L$, con
$$\mathcal H=\frac{p^2}{2m}-U_0\frac zL,\qquad U_0>0,$$
dove $z$ è la posizione lungo l'asse, misurata da una delle basi. Il sistema è a temperatura $T$ (Dispense, pp. 221–226).
1. **Statistica classica.** (a) $C_V(T)$ e i suoi limiti per $T\to0$ e $T\to\infty$. (b) $\langle z\rangle(T)$. (c) La densità di probabilità $P(\varepsilon)$ dell'energia di singola particella. (d) La probabilità $P_N(n,\Omega)$ di trovare $n$ particelle nel dominio $\Omega=\{p_x>0,\ y<0,\ z<L/2\}$.
2. **Bosoni di spin 0.** (a) Esiste la condensazione di Bose-Einstein? (b) $\mu$ a bassa e ad alta temperatura.
3. **Fermioni di spin 1/2.** (a) La densità $\rho$ in funzione dell'energia di Fermi $\varepsilon_F$. (b) $\langle z\rangle$ a $T=0$ per $\varepsilon_F=0$.

::: soluzione
**La funzione di partizione di singola particella.** Gli impulsi danno la solita gaussiana, $z$ un esponenziale crescente perché il potenziale scende con $z$:
$$Z_1=\frac{1}{h^3}\Big(\frac{2\pi m}{\beta}\Big)^{3/2}\pi R^2\int_0^Ldz\,e^{\beta U_0z/L}=\frac{\pi R^2}{h^3}\Big(\frac{2\pi m}{\beta}\Big)^{3/2}\frac{L}{\beta U_0}\big(e^{\beta U_0}-1\big).$$

**1.a** $\ln Z_1=-\frac32\ln\beta-\ln\beta+\ln(e^{\beta U_0}-1)+\text{cost}$, quindi
$$\langle E_1\rangle=\frac52k_BT-U_0\frac{e^{\beta U_0}}{e^{\beta U_0}-1},\qquad\frac{C_V}{N}=\frac52k_B-k_B\frac{(\beta U_0)^2e^{-\beta U_0}}{\big(1-e^{-\beta U_0}\big)^2}.$$
Per $T\to\infty$, $\frac{x^2e^{-x}}{(1-e^{-x})^2}\to1$ e $C_V\to\frac32Nk_B$: le particelle sono distribuite uniformemente in $z$, e l'energia potenziale media non cambia più. Per $T\to0$ il secondo termine sparisce e $C_V\to\frac52Nk_B$: le particelle si schiacciano contro la base $z=L$, dove il potenziale è minimo, e la distanza dalla base è distribuita esponenzialmente, con energia potenziale media $k_BT$ in più (Dispense, pp. 222–223).

**1.b** Con $y=\beta U_0z/L$ e un'integrazione per parti:
$$\langle z\rangle=\frac{\int_0^Lz\,e^{\beta U_0z/L}dz}{\int_0^Le^{\beta U_0z/L}dz}=L\Big[\frac{1}{1-e^{-\beta U_0}}-\frac{1}{\beta U_0}\Big],$$
che va da $L/2$ ad alta $T$ a $L$ per $T\to0$ (Dispense, pp. 223–224).

**1.c** La densità degli stati, con $y=p^2/2m$, $t=U_0z/L$ e $4\pi p^2dp=2\pi(2m)^{3/2}y^{1/2}dy$:
$$G(\varepsilon)=\frac{2\pi(2m)^{3/2}\pi R^2L}{h^3U_0}\,\frac23\Big[(\varepsilon+U_0)^{3/2}\theta(\varepsilon+U_0)-\varepsilon^{3/2}\theta(\varepsilon)\Big],$$
e $P(\varepsilon)=G(\varepsilon)e^{-\beta\varepsilon}/Z_1$. Nel rapporto $G/Z_1$ si semplificano $\pi R^2L$, $U_0$ e $h^3$, e $(2m)^{3/2}/(2\pi m)^{3/2}=\pi^{-3/2}$:
$$P(\varepsilon)=\frac{4\beta^{5/2}}{3\sqrt\pi}\,\frac{(\varepsilon+U_0)^{3/2}\theta(\varepsilon+U_0)-\varepsilon^{3/2}\theta(\varepsilon)}{e^{\beta U_0}-1}\,e^{-\beta\varepsilon}.$$
L'energia minima è $-U_0$, la particella ferma in $z=L$ (Dispense, pp. 222 e 224).

**1.d** $\Omega$ prende metà delle $p_x$ (probabilità $\frac12$), metà delle $y$ ($\frac12$) e le $z<L/2$:
$$p_\Omega=\frac14\,\frac{\int_0^{L/2}e^{\beta U_0z/L}dz}{\int_0^Le^{\beta U_0z/L}dz}=\frac14\,\frac{e^{\beta U_0/2}-1}{e^{\beta U_0}-1}.$$
Le particelle sono indipendenti, quindi $P_N(n,\Omega)=\binom Nn\,p_\Omega^n(1-p_\Omega)^{N-n}$ (Dispense, pp. 222 e 224).

**2.a** Vicino all'energia minima $-U_0$, $G(\varepsilon)\propto(\varepsilon+U_0)^{3/2}$: $\alpha=\frac32>0$, l'integrale $\int G(\varepsilon)\,d\varepsilon/(e^{\beta(\varepsilon+U_0)}-1)$ converge, e **la condensazione esiste** (Dispense, pp. 224–225).

**2.b** Per $T\to0$, $\mu\to\varepsilon_{\min}=-U_0$. Ad alta $T$ vale la statistica classica: $\beta\mu=-\ln(Z_1/N)$, cioè
$$\mu=-k_BT\ln\Big[\Big(\frac{2\pi m}{h^2}\Big)^{3/2}\frac{\pi R^2L}{NU_0}(k_BT)^{5/2}\big(e^{U_0/k_BT}-1\big)\Big]$$
(Dispense, pp. 222 e 225).

**3.a** A $T=0$ si riempiono gli stati fino a $\varepsilon_F$; lo spin $\frac12$ dà un fattore $g_s=2$:
$$\rho=\frac{N}{\pi R^2L}=\frac{16\pi(2m)^{3/2}}{15\,h^3U_0}\Big[(\varepsilon_F+U_0)^{5/2}\theta(\varepsilon_F+U_0)-\varepsilon_F^{5/2}\theta(\varepsilon_F)\Big]$$
(Dispense, p. 222). Nello svolgimento di p. 225 il fattore 2 dello spin non compare; c'è invece nel risultato riassuntivo di p. 222.

**3.b** Con $\varepsilon_F=0$ sono occupati tutti e soli gli stati con energia negativa: $p^2/2m<U_0z/L$. Per ogni $z$ il volume di impulsi permesso è una sfera di raggio $\sqrt{2mU_0z/L}$, proporzionale a $z^{3/2}$:
$$\langle z\rangle=\frac{\int_0^Lz\cdot z^{3/2}dz}{\int_0^Lz^{3/2}dz}=\frac{2L^{7/2}/7}{2L^{5/2}/5}=\frac57L$$
(Dispense, pp. 225–226).
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Perché il canonico è difficile per un gas di particelle identiche indipendenti, e perché il gran canonico lo rende facile?

::: risposta
Nel canonico il numero totale $N$ è fissato, e il vincolo $\sum_kn_k=N$ lega tra loro tutti i livelli: la somma non si fattorizza. Nel gran canonico si somma su tutti gli $N$ con peso $z^N$, il vincolo sparisce, e ogni livello diventa un sistema indipendente con $\mathcal Q_k=\sum_n(ze^{-\beta\varepsilon_k})^n$: una serie geometrica, o due termini per i fermioni.
:::
::::

:::: domanda
Da dove viene il $\pm1$ nelle distribuzioni di Fermi e di Bose, e quando si può trascurare?

::: risposta
Dalla somma su $n$: per i fermioni $n=0,1$ e $\mathcal Q_k=1+x$; per i bosoni $n=0,1,2,\dots$ e $\mathcal Q_k=1/(1-x)$, con $x=ze^{-\beta\varepsilon_k}$. Derivando si ottiene $1/(x^{-1}\pm1)$. Si trascura quando $x\ll1$, cioè $\langle n_k\rangle\ll1$: pochi candidati per ogni stato, nessun conflitto, statistica classica. Questo succede quando $\rho\lambda^3\ll1$.
:::
::::

:::: domanda
Nella prima correzione quantistica, perché i fermioni si comportano come se si respingessero e i bosoni come se si attraessero?

::: risposta
$\beta P/\rho=1\pm\rho\lambda^3/2^{5/2}$. Per i fermioni l'antisimmetria vieta di stare nello stesso stato e rende improbabile stare vicini: è come un volume escluso, e la pressione sale. Per i bosoni la simmetria favorisce gli stati con più particelle insieme, come nei gettoni indistinguibili: la pressione scende. Non c'è nessuna forza, solo un diverso conteggio degli stati.
:::
::::

:::: domanda
Perché un gas di Fermi ha pressione anche a $T=0$? Quanto vale?

::: risposta
Per Pauli ogni livello ospita al più $g_s$ particelle, quindi a $T=0$ si riempiono tutti i livelli fino a $\varepsilon_F$: le particelle si muovono anche senza agitazione termica. L'energia è $E=\frac35N\varepsilon_F$ e, per $PV=\frac23E$, $P=\frac25\rho\varepsilon_F$. È la pressione di degenerazione, quella che sostiene le nane bianche.
:::
::::

:::: domanda
Perché il calore specifico degli elettroni in un metallo è lineare in $T$ e molto piccolo?

::: risposta
Solo gli elettroni in una fascia larga $k_BT$ attorno a $\varepsilon_F$ possono cambiare stato: quelli più in basso troverebbero occupati tutti i livelli raggiungibili. Sono una frazione $\sim k_BT/\varepsilon_F$ del totale e ciascuno assorbe $\sim k_BT$, quindi $E-E_0\propto N(k_BT)^2/\varepsilon_F$ e $C_V=\frac{\pi^2}{2}Nk_B\frac{k_BT}{\varepsilon_F}$. Con $\varepsilon_F\simeq7$ eV, a temperatura ambiente è circa il 2 % del valore classico.
:::
::::

:::: domanda
Spiega la condensazione di Bose-Einstein con la funzione $g_{3/2}(z)$.

::: risposta
La densità degli stati eccitati è $g_{3/2}(z)/\lambda^3$. Siccome $z\le1$ per i bosoni liberi, è limitata da $\zeta(3/2)/\lambda^3\simeq2{,}612/\lambda^3$, che cala raffreddando come $T^{3/2}$. Quando $\rho\lambda^3$ supera 2,612 gli stati eccitati non possono ospitare tutte le particelle: $z$ si blocca a 1 e l'eccesso va nello stato fondamentale. La frazione condensata è $1-(T/T_c)^{3/2}$.
:::
::::

:::: domanda
Perché un gas ideale di bosoni in due dimensioni non condensa?

::: risposta
In 2D la densità degli stati è costante, $\alpha=0$. Con $\mu\to0$ l'integrale degli stati eccitati va come $\int d\varepsilon/(\beta\varepsilon)$, che diverge logaritmicamente in $\varepsilon=0$. Gli stati eccitati possono quindi ospitare un numero arbitrario di particelle con $z<1$, e non si satura mai niente: $\mu$ arriva a 0 solo a $T=0$. Il criterio generale è $\alpha>0$.
:::
::::

:::: domanda
Che cosa c'entra il fattore $1/N!$ di Gibbs con la statistica quantistica?

::: risposta
Nel limite $\langle n_k\rangle\ll1$ la funzione di partizione gran canonica quantistica diventa $e^{zQ_1}=\sum_N(zQ_1)^N/N!$: il conteggio quantistico produce da solo il $1/N!$ del gas classico. Il fattore che nel microcanonico si aggiunge a mano per risolvere il paradosso di Gibbs è il residuo classico dell'indistinguibilità quantistica.
:::
::::

## Articoli correlati
- [[insieme-gran-canonico-e-npt]]: l'insieme che rende il problema fattorizzabile.
- [[insieme-canonico]]: la densità degli stati $g(\varepsilon)$ e la statistica di Maxwell-Boltzmann.
- [[insieme-microcanonico]]: il fattore $1/N!$ e il paradosso di Gibbs.
- [[gas-reali-viriale-e-van-der-waals]]: l'espansione del viriale, di cui la correzione quantistica è un caso.
- [[corpo-nero-e-solidi]]: i fotoni e i fononi, bosoni con $\mu=0$.
- [[meccanica-quantistica/corso-e-lezioni]]: il postulato di simmetrizzazione e le particelle identiche.
- [[appunti-anno-scorso]]: la mappa del quaderno.

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 170–206 e 221–226: indistinguibilità pp. 170–172; numeri di occupazione pp. 172–174; Fermi-Dirac e Bose-Einstein pp. 174–175; equazione di stato e limite classico pp. 175–177; entropia e densità degli stati pp. 178–179; gas in una scatola pp. 179–183; alta temperatura pp. 183–186; fermioni a $T=0$ pp. 186–189; Sommerfeld pp. 189–195; condensazione pp. 195–200; energia, calore specifico e taglia finita pp. 200–202; generalizzazione pp. 203–206; compito del 22/06/2018 pp. 221–226.
- `raw/foto appunti mec stat anno scorso/IMG_6349_COMPILED.HEIC`–`IMG_6354_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 56–70.
