---
tags: [meccanica-statistica, probabilita, limite-centrale, stirling, punto-di-sella, lezione]
data_creazione: 2026-10-27
data_aggiornamento: 2026-10-27
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
---

# Ripasso di probabilità

Gli strumenti di probabilità che la meccanica statistica usa a ogni pagina: densità di probabilità e cambi di variabile, marginalizzazione, le distribuzioni binomiale, di Poisson e gaussiana, la legge dei grandi numeri e il teorema del limite centrale. Più tre trucchi di calcolo: il punto di sella, la formula di Stirling e la rappresentazione integrale della delta di Dirac.

## Punti chiave
- **Probabilità soggettive:** in meccanica statistica le probabilità si assegnano per mancanza di informazione (tutti i casi indistinguibili sono equiprobabili) e poi si verificano con le misure.
- **Somme di variabili:** la media di una somma è la somma delle medie; per variabili indipendenti anche la varianza è la somma delle varianze. In generale si aggiungono le correlazioni connesse $\langle X_iX_j\rangle-\langle X_i\rangle\langle X_j\rangle$.
- **Cambiare variabile e marginalizzare:** $P_X(x)=\int dq\,dp\,\rho(q,p)\,\delta(X(q,p)-x)$; per $Y=f(X)$ vale $|P_Y(y)\,dy|=|P_X(x)\,dx|$. Per variabili indipendenti la probabilità congiunta si fattorizza.
- **Tre distribuzioni:** binomiale ($\langle k\rangle=Np$, $\sigma^2=Npq$), Poisson, che è il suo limite per $p\to0$ con $\lambda=Np$ ($\langle k\rangle=\sigma^2=\lambda$), gaussiana.
- **Grandi numeri:** per Chebyshev $P(|x-\mu|>\gamma)\le\sigma^2/\gamma^2$. Le variabili intensive, medie di $N$ termini, hanno fluttuazioni che vanno a zero come $1/\sqrt N$.
- **Limite centrale:** la somma di $N$ variabili indipendenti con varianza finita tende a una gaussiana di varianza $N\sigma^2$. Con varianza infinita, per esempio Cauchy, il teorema non vale.
- **Trucchi:** $\int e^{Nf(x)}dx\simeq e^{Nf(x_0)}\sqrt{2\pi/N|f''(x_0)|}$; $N!\simeq N^Ne^{-N}\sqrt{2\pi N}$; $\delta(x)=\frac{1}{2\pi}\int e^{-izx}dz$.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Lancia una moneta: non sai che cosa uscirà. Lanciane mille: sai quasi con certezza che usciranno tra 470 e 530 teste. Lanciane $10^{23}$: la frazione di teste sarà $\frac12$ fino alla dodicesima cifra decimale. Nessuna moneta ha imparato a comportarsi bene: è la **somma** di tante cose casuali a diventare prevedibile. Le fluttuazioni crescono come $\sqrt N$, il totale come $N$, e il rapporto va a zero.

La meccanica statistica è esattamente questo: probabilità applicata a $10^{23}$ particelle. Non sappiamo dove sia ciascuna, ma le grandezze macroscopiche, che sono somme su tutte, hanno valori nettissimi e distribuzioni gaussiane. Questa lezione raccoglie gli strumenti per dirlo in formule: come si calcolano medie e varianze di somme, perché la gaussiana è ovunque (il limite centrale), e come si fanno gli integrali con esponenti enormi (il punto di sella e Stirling).
:::

La lezione segue questo filo.

1. [Due modi di assegnare le probabilità](#probabilita) e [le variabili continue](#variabili-continue).
2. [Medie e varianze di somme](#somme), [come cambia una probabilità quando si cambia variabile](#cambio-variabile).
3. Le distribuzioni: [binomiale](#binomiale), [Poisson](#poisson), [gaussiana](#gaussiana).
4. [Chebyshev e i grandi numeri](#grandi-numeri), [il limite centrale](#limite-centrale).
5. I trucchi: [punto di sella](#punto-sella), [Stirling](#stirling), [la delta come integrale](#delta).
6. [Esercizi svolti](#esercizi).

## Due modi di assegnare le probabilità {#probabilita}

La teoria della probabilità insegna a predire la probabilità di un evento scelto in una classe di risultati possibili: in una lunga sequenza di eventi, quale frazione è del tipo che ci interessa. In pratica bisogna sapere come **assegnare** le probabilità (Dispense, p. 3).

- **Probabilità oggettive.** Si misurano come frequenze relative: se in $N$ prove l'evento $A$ esce $N_A$ volte, $P(A)=N_A/N$. Per esempio 100, 200, 300 lanci di un dado danno 19, 30, 48 volte la faccia 1, cioè 0,19, 0,15, 0,16: una stima sempre più affidabile.
- **Probabilità soggettive.** Sono una stima teorica basata su che cosa **non** sappiamo. $P(1)=\frac16$ per un dado nasce dal fatto che ci sono sei esiti e nessuna ragione per preferirne uno. **Tutte le assegnazioni di probabilità della meccanica statistica sono soggettive**; le loro conseguenze vanno verificate con le misure, ed eventualmente corrette quando arrivano nuove informazioni.

Il postulato di uguale probabilità a priori del [[insieme-microcanonico]] è una probabilità soggettiva di questo tipo.

## Variabili continue {#variabili-continue}

Se l'evento elementare è un numero reale, conviene la **funzione di distribuzione** $P(x)$, la probabilità che il valore sia minore di $x$, e la **densità di probabilità**
$$p_X(x)=\frac{dP(x)}{dx},$$
con $p_X(x)\,dx$ la probabilità che il valore cada tra $x$ e $x+dx$. A rigore la densità esiste solo se $P(x)$ è derivabile, ma accettando funzioni generalizzate, come la delta di Dirac, il problema non si pone (Dispense, p. 4).

$$\langle x\rangle=\int dx\,x\,p(x),\qquad\langle x^k\rangle=\int dx\,x^k\,p(x),$$
$$\langle f(x)\rangle=\int dx\,f(x)\,p(x),\qquad\sigma_x^2=\langle x^2\rangle-\langle x\rangle^2 .$$

## Medie e varianze di somme {#somme}

Sia $Y=\sum_ia_iX_i$. La media è lineare: $\langle Y\rangle=\sum_ia_i\langle X_i\rangle$. Per la varianza servono i prodotti, $\langle Y^2\rangle=\sum_{ij}a_ia_j\langle X_iX_j\rangle$ (Dispense, pp. 4–5):
$$\sigma_Y^2=\sum_ia_i^2\sigma_{X_i}^2+2\sum_i\sum_{j<i}a_ia_j\big\langle(X_i-\langle X_i\rangle)(X_j-\langle X_j\rangle)\big\rangle .$$
L'ultimo termine è la **correlazione connessa**: sviluppando il prodotto, $\langle(X_1-\langle X_1\rangle)(X_2-\langle X_2\rangle)\rangle=\langle X_1X_2\rangle-\langle X_1\rangle\langle X_2\rangle$.

Se le variabili sono **indipendenti**, $\langle X_iX_j\rangle=\int dx_i\,dx_j\,x_ix_j\,P(x_i,x_j)=\langle X_i\rangle\langle X_j\rangle$ per $i\neq j$, le correlazioni connesse si annullano e
$$\sigma_Y^2=\sum_ia_i^2\sigma_{X_i}^2 .$$
**Per variabili indipendenti la media della somma è la somma delle medie, e la varianza della somma è la somma delle varianze** (Dispense, p. 5).

::: idea
**Perché le varianze si sommano e le deviazioni no.** Due errori indipendenti di $\pm1$ cm non danno un errore di 2 cm: a volte si sommano, a volte si compensano. In media il quadrato dell'errore totale è $1+1=2$ cm², quindi l'errore tipico è $\sqrt2$ cm. Con $N$ errori indipendenti l'errore tipico cresce come $\sqrt N$, mentre la somma dei valori cresce come $N$. È tutto qui il motivo per cui la termodinamica funziona.
:::

## Cambiare variabile e marginalizzare {#cambio-variabile}

**Una funzione degli eventi.** Spesso interessa una grandezza che è funzione dei microstati, come l'energia $X(q,p)$. La probabilità che valga $x$ si ottiene sommando su tutti gli eventi che danno quel valore:
$$P_X(x)=\int d^{3N}q\,d^{3N}p\;\rho(q,p)\,\delta\big(X(q,p)-x\big),$$
e per due grandezze si mettono due delta (Dispense, p. 5).

**Marginalizzare.** Se si conosce $P_{XY}(x,y)$ ma interessa solo $P_X(x)$, si integra su $y$; poiché $\int dy\,\delta(Y-y)=1$,
$$P_X(x)=\int dy\,P_{XY}(x,y).$$
**Esempio: il gas ideale.** Senza interazioni ci si aspetta che posizione e impulso di un atomo non dipendano dagli altri: $\rho(q,p)=\prod_i\rho_i(q_i,p_i)$. Marginalizzando su tutte le particelle tranne la prima, ogni integrale $\int dq_k\,dp_k\,\rho_k=1$ per la normalizzazione, e resta $\rho_1(q_1,p_1)$. In generale, **per variabili indipendenti $P_{XY}(x,y)=P_X(x)P_Y(y)$** (Dispense, p. 6).

**Cambio di variabile.** Sia $Y=f(X)$ con $f$ monotona. Da $P_Y(y)=\int dx\,P_X(x)\,\delta(y-f(x))$, con $z=f(x)$ e $dz=\frac{df}{dx}dx$:
$$P_Y(y)=\frac{P_X\big(f^{-1}(y)\big)}{|df/dx|}\quad\Longleftrightarrow\quad|P_Y(y)\,dy|=|P_X(x)\,dx| .$$
Il valore assoluto viene dal fatto che, se $df/dx<0$, cambiando variabile si scambiano gli estremi di integrazione. La probabilità contenuta in un intervallo si conserva: se l'intervallo si allunga, la densità si abbassa (Dispense, pp. 6–7). Con più variabili compare lo **jacobiano**: $P(y_1,\dots,y_N)=P(x_1,\dots,x_N)/|\det J|$ (Dispense, p. 8).

## La distribuzione binomiale {#binomiale}

$S_N=\sum_{i=1}^Nt_i$ è la somma di $N$ variabili che valgono 1 con probabilità $p$ e 0 con probabilità $q=1-p$. Ogni $t_i$ ha $\langle t_i\rangle=p$ e $\langle t_i^2\rangle=p$, quindi $\sigma_{t_i}^2=p-p^2=pq$, e per l'additività
$$\langle S_N\rangle=Np,\qquad\sigma^2=Npq$$
(Dispense, pp. 8–9). La probabilità di $k$ successi conta i modi di sceglierli:
$$P_{S_N}(k)=\binom Nk p^kq^{N-k},\qquad\sum_{k=0}^N\binom Nkp^kq^{N-k}=(p+q)^N=1 .$$

:::: {.passaggi titolo="Media e varianza con il trucco della derivata"}
Si tratta $p$ e $q$ come indipendenti e si pone $p+q=1$ solo alla fine. Il fattore $k$ si ottiene con $p\frac{d}{dp}$:
$$\langle k\rangle=\sum_kk\binom Nkp^kq^{N-k}=p\frac{d}{dp}(p+q)^N=pN(p+q)^{N-1}=Np .$$
Per $\langle k^2\rangle$ si usa $k^2=k(k-1)+k$ e $p^2\frac{d^2}{dp^2}$, che fa scendere $k(k-1)$:
$$\langle k^2\rangle=p^2\frac{d^2}{dp^2}(p+q)^N+\langle k\rangle=p^2N(N-1)+Np,$$
$$\sigma^2=p^2N(N-1)+Np-N^2p^2=Np(1-p)=Npq$$
(Dispense, p. 9).
::::

**Applicazione.** Un contenitore di volume $V$ diviso in celle di volume $\Delta V$, con $N$ atomi messi a caso. Ogni atomo sta in una cella data con probabilità $p=\Delta V/V$, quindi il numero di atomi nella cella è binomiale (Dispense, p. 9).

## La distribuzione di Poisson {#poisson}

Se $\Delta V/V\ll1$, $p$ è piccola e ogni cella contiene pochi atomi: $P(k)$ conta solo per $k\ll N$. Allora $\frac{N!}{(N-k)!}\simeq N^k$ e $q^{N-k}\simeq q^N=e^{N\ln(1-p)}\simeq e^{-Np}$. Con $\lambda=Np$:
$$P(k)=\frac{\lambda^k}{k!}\,e^{-\lambda}$$
(Dispense, pp. 9–10). Nel gas $\lambda=N\Delta V/V=\rho\Delta V$: il numero medio di particelle nella cella.

:::: {.passaggi titolo="Media e varianza della Poisson"}
Derivando $\sum_kP_k=1$ rispetto a $\lambda$, con $\frac{dP_k}{d\lambda}=\frac{k}{\lambda}P_k-P_k$:
$$0=\frac1\lambda\langle k\rangle-1\quad\Longrightarrow\quad\langle k\rangle=\lambda .$$
Derivando ancora, $\frac{d^2P_k}{d\lambda^2}=\Big[\frac{k(k-1)}{\lambda^2}-\frac{2k}{\lambda}+1\Big]P_k$, e moltiplicando per $\lambda^2$ e sommando:
$$0=\langle k(k-1)\rangle-2\lambda\langle k\rangle+\lambda^2=\langle k^2\rangle-\lambda-\lambda^2\quad\Longrightarrow\quad\langle k^2\rangle-\langle k\rangle^2=\lambda$$
(Dispense, p. 10).
::::

**Media uguale alla varianza** è la firma della Poisson. Lo si vede anche dal limite della binomiale: $Npq\simeq Np$ per $p$ piccola (Dispense, p. 11). Nel [[insieme-gran-canonico-e-npt|gran canonico]] questa è la statistica del numero di particelle in un volume di gas ideale.

:::: {.passaggi titolo="Un'altra strada: eventi a caso nel tempo"}
Eventi casuali nel tempo, come clienti che entrano in un negozio o decadimenti radioattivi, con la sola ipotesi che non ce ne siano due simultanei. Se $a$ è il numero medio per unità di tempo, in $\Delta t$ c'è un evento con probabilità $a\Delta t$.

**Nessun evento.** Spezzando $t$ in $t-\Delta t$ e $\Delta t$: $P(0,t)=P(0,t-\Delta t)(1-a\Delta t)$. Sviluppando e trascurando $\Delta t^2$: $\frac{dP(0,t)}{dt}=-aP(0,t)$, quindi $P(0,t)=e^{-at}$, con $P(0,0)=1$.

**Un evento.** $P(1,t)=P(1,t-\Delta t)(1-a\Delta t)+P(0,t-\Delta t)\,a\Delta t$, da cui $\frac{dP(1,t)}{dt}=-aP(1,t)+ae^{-at}$ e $P(1,t)=at\,e^{-at}$.

**$k$ eventi.** $\frac{dP(k,t)}{dt}=-aP(k,t)+aP(k-1,t)$. Moltiplicando per $e^{at}$: $\frac{d}{dt}\big[e^{at}P(k,t)\big]=a\,e^{at}P(k-1,t)$, cioè $e^{at}P(k,t)=a\int_0^te^{at'}P(k-1,t')dt'$. Per esempio $e^{at}P(2,t)=a\int_0^tat'\,dt'=\frac{(at)^2}{2}$. Per induzione
$$P(k,t)=\frac{(at)^k}{k!}e^{-at}$$
(Dispense, pp. 11–12).
::::

**La stella più vicina.** Supponiamo, anche se è falso, che le stelle siano scorrelate con densità media $\rho$. La probabilità che la prima stella sia tra $R$ e $R+dR$ è la probabilità di **nessuna** stella nella sfera di volume $\frac43\pi R^3$ per quella di **una** stella nel guscio $4\pi R^2dR$:
$$P(R)\,dR=e^{-\rho\frac43\pi R^3}\cdot4\pi R^2\rho\,dR$$
(Dispense, pp. 12–13). Il secondo esercizio ne ricava la distanza tipica.

## La distribuzione gaussiana {#gaussiana}

Per una variabile con media $m$ e varianza $\sigma^2$:
$$P_X(x)=\frac{1}{\sqrt{2\pi\sigma^2}}\,e^{-\frac{(x-m)^2}{2\sigma^2}},\qquad\int_{-\infty}^\infty e^{-\frac a2x^2+bx}dx=\sqrt{\frac{2\pi}{a}}\,e^{\frac{b^2}{2a}}$$
(Dispense, p. 13). Il secondo è l'**integrale gaussiano**, da sapere a memoria.

**La varianza con il trucco della derivata.** Derivare rispetto ad $a$ fa scendere $-x^2/2$:
$$\int x^2e^{-\frac a2x^2}dx=-2\frac{d}{da}\sqrt{\frac{2\pi}{a}}=\sqrt{2\pi}\,a^{-3/2}.$$
Con $m=0$ e $a=1/\sigma^2$: $\frac{1}{\sqrt{2\pi\sigma^2}}\sqrt{2\pi}\,\sigma^3=\sigma^2$. Con $m\neq0$ basta il cambio di variabile $x\to x-m$ (Dispense, p. 13).

## Chebyshev e la legge dei grandi numeri {#grandi-numeri}

**La disuguaglianza di Chebyshev.** Per una variabile con media $\mu$ e varianza $\sigma^2$ finite, le code sono piccole:
$$P(|x-\mu|>\gamma)\le\frac{\sigma^2}{\gamma^2}.$$

:::: {.passaggi titolo="La dimostrazione in tre righe"}
$P(|x-\mu|>\gamma)=\int_{\mu+\gamma}^\infty P(x)dx+\int_{-\infty}^{\mu-\gamma}P(x)dx$. In queste regioni $\frac{(x-\mu)^2}{\gamma^2}>1$, quindi inserendo questo fattore gli integrali possono solo crescere. Aggiungendo la parte mancante, tra $\mu-\gamma$ e $\mu+\gamma$, crescono ancora:
$$P(|x-\mu|>\gamma)<\int_{-\infty}^\infty P(x)\frac{(x-\mu)^2}{\gamma^2}dx=\frac{\sigma^2}{\gamma^2}$$
(Dispense, p. 14). Con i momenti di ordine $k$ vale l'analogo $P(|x-\mu|>\gamma)\le\langle|x-\mu|^k\rangle/\gamma^k$ (Markov).
::::

**Le variabili intensive non fluttuano.** Sia $Z_N=\frac1N\sum_iX_i$ con $X_i$ indipendenti di media $\mu_i$ e varianza $\sigma_i^2$. Allora $\langle Z_N\rangle=\frac1N\sum_i\mu_i$ e $\sigma_Z^2=\frac{1}{N^2}\sum_i\sigma_i^2$, che va come $\frac1N$. Per Chebyshev
$$P\Big(\Big|Z_N-\frac1N\sum_i\mu_i\Big|>\gamma\Big)<\frac{\sum_i\sigma_i^2}{N^2\gamma^2}\;\xrightarrow{N\to\infty}\;0$$
(Dispense, p. 15). Nel limite termodinamico le variabili intensive, come l'energia potenziale per particella, hanno **fluttuazioni nulle**. È anche il motivo per cui i loro valori medi non dipendono dall'insieme statistico con cui si calcolano.

::: attenzione
**Un segno di disuguaglianza.** Le dispense (p. 15) scrivono $\lim_{N\to\infty}P(\dots>\gamma)<0$: una probabilità non può essere negativa. Il limite è **uguale** a zero. Calcolo mio.
:::

## Il teorema del limite centrale {#limite-centrale}

**Somma di due variabili: una convoluzione.** Con $Y=X_1+X_2$:
$$P_Y(y)=\int dx_1\,dx_2\,P(x_1)P(x_2)\,\delta(y-x_1-x_2)=\int P_{X_1}(y-x_2)\,P_{X_2}(x_2)\,dx_2 .$$
La trasformata di Fourier di una convoluzione è il prodotto delle trasformate. Scrivendo $e^{izy}=e^{iz(y-x_2)}e^{izx_2}$ e cambiando variabile:
$$\tilde P_Y(z)=\tilde P_{X_1}(z)\,\tilde P_{X_2}(z),\qquad\tilde P(z)=\int dy\,P(y)\,e^{izy}=\langle e^{izy}\rangle .$$
$\tilde P$ è la **funzione caratteristica**, che genera i momenti (Dispense, pp. 15–16).

:::: {.passaggi titolo="La dimostrazione del limite centrale"}
**Le variabili.** $X_i$ identiche e indipendenti, con media $\langle X\rangle$ e varianza $\sigma^2$. Si centra, $X_i'=X_i-\langle X\rangle$, e si definiscono
$$Y=\sum_{i=1}^NX_i',\qquad T=\frac{Y}{\sigma\sqrt N}.$$
**Prodotto di funzioni caratteristiche.** $\tilde P_Y(z)=\tilde P_{X'}(z)^N$. Per un riscalamento $Q=aX$, $P_Q(q)=P_X(x)/a$ e $\tilde P_Q(z)=\tilde P_X(az)$. Quindi, con $a=1/\sigma\sqrt N$:
$$\tilde P_T(z)=\Big[\tilde P_{X'}\Big(\frac{z}{\sigma\sqrt N}\Big)\Big]^N .$$
**Sviluppo.** Le $X'$ hanno media nulla: $\tilde P_{X'}(z)=1+iz\langle X'\rangle-\frac12z^2\langle X'^2\rangle+\dots=1-\frac12z^2\sigma^2+O(z^3)$. Quindi
$$\tilde P_T(z)=\Big[1-\frac{z^2}{2N}+O\Big(\frac{z^3}{N^{3/2}}\Big)\Big]^N\xrightarrow{N\to\infty}e^{-z^2/2}.$$
**Antitrasformando**, $P_T(t)=\frac{1}{\sqrt{2\pi}}e^{-t^2/2}$, e tornando a $Y$ e poi a $Y'=\sum_iX_i=Y+N\langle X\rangle$:
$$P(y')=\frac{1}{\sqrt{2\pi\sigma^2N}}\exp\Big[-\frac{(y'-N\langle X\rangle)^2}{2\sigma^2N}\Big]$$
(Dispense, pp. 16–17).
::::

**La somma di un gran numero di variabili indipendenti con varianza finita è gaussiana**, qualunque sia la distribuzione delle singole variabili. Il teorema non richiede varianze tutte uguali, ma richiede che siano finite. La gaussiana descrive benissimo la zona vicino alla media, ma non gli eventi estremi, perché si sono trascurati i termini $O(z^3/N^{3/2})$ (Dispense, pp. 17–18).

**Quando non vale.** Con varianza infinita il teorema cade. La distribuzione di Cauchy, $P_X(x)=\frac{1}{\pi(1+x^2)}$, ha funzione caratteristica $\tilde P_X(z)=e^{-|z|}$, quindi $\tilde P_Y(z)=e^{-N|z|}$: la media $Y/N$ ha **esattamente** la stessa distribuzione di una singola $X$. Fare la media non serve a nulla (Dispense, p. 18).

::: {.lab-segnaposto tipo="limite-centrale"}
:::

## Il metodo del punto di sella {#punto-sella}

Un integrale del tipo $I=\int_a^be^{Nf(x)}dx$, con $N$ grande e $f$ con un massimo quadratico in $x_0\in[a,b]$. Sviluppando $f(x)\simeq f(x_0)-\frac12|f''(x_0)|(x-x_0)^2$:
$$I=e^{Nf(x_0)}\int_a^be^{-\frac N2|f''(x_0)|(x-x_0)^2}dx\simeq e^{Nf(x_0)}\sqrt{\frac{2\pi}{N|f''(x_0)|}}.$$
Poiché $N$ è grande, l'integrando conta solo vicino a $x_0$, e si possono estendere gli estremi a $\pm\infty$ (Dispense, pp. 18–19). È il **metodo di Laplace**, o del punto di sella: un integrale di un esponenziale enorme è dominato dal suo massimo. Si usa per $Q_N$ nel [[insieme-canonico]], per $P(N)$ nel gran canonico, per Bragg-Williams.

::: attenzione
**Un segno.** Nella seconda riga le dispense (p. 18) scrivono l'esponente come $+N\frac12|f''|(x-x_0)^2$: senza il segno meno l'integrale divergerebbe. Il segno corretto è $-$, come nel risultato finale. Calcolo mio.
:::

## La formula di Stirling {#stirling}

**Una rappresentazione integrale di $N!$.** Si parte da $\int_0^\infty e^{-at}dt=\frac1a$ e si deriva $N$ volte rispetto ad $a$: $\int_0^\infty t^Ne^{-at}dt=N!\,a^{-(N+1)}$, che per $a=1$ dà
$$N!=\int_0^\infty t^Ne^{-t}dt .$$
Per $N$ reale questa è la **funzione Gamma**: $\Gamma(x+1)=\int_0^\infty t^xe^{-t}dt$ (Dispense, p. 19).

:::: {.passaggi titolo="Stirling con il punto di sella"}
$N!=\int_0^\infty e^{N\ln t-t}dt$. Con $z=t/N$:
$$N!=N^{N+1}\int_0^\infty e^{N(\ln z-z)}dz .$$
L'esponente $\ln z-z$ ha il massimo in $z=1$, dove vale $-1$, con derivata seconda $-1/z^2=-1$: $\ln z-z\simeq-1-\frac{(z-1)^2}{2}$. Estendendo l'estremo inferiore a $-\infty$:
$$N!\simeq N^{N+1}e^{-N}\int_{-\infty}^\infty e^{-N(z-1)^2/2}dz=N^{N+1}e^{-N}\sqrt{\frac{2\pi}{N}}=N^Ne^{-N}\sqrt{2\pi N}$$
(Dispense, pp. 19–20).
::::

$$\ln N!=N\ln N-N+\ln\sqrt{2\pi N},$$
e per $N$ grande l'ultimo termine è trascurabile. Una formula più accurata è $N!=N^Ne^{-N}\sqrt{2\pi N}\big(1+\frac{1}{12N}+\frac{1}{288N^2}+\dots\big)$ (Dispense, p. 20). Già per $N=10$ la formula base sbaglia meno dell'1 % (calcolo mio: 3 598 696 contro 3 628 800).

::: attenzione
**Il secondo termine della serie.** Le dispense (p. 20) scrivono $\frac{1}{144N^2}$; il coefficiente corretto della serie di Stirling è $\frac{1}{288N^2}$. Con $N=10$: $\sqrt{2\pi N}N^Ne^{-N}(1+\frac{1}{120}+\frac{1}{28800})=3\,628\,810$, contro il valore esatto 3 628 800. Calcolo mio.
:::

## La delta come integrale {#delta}

Con la trasformata di Fourier $\tilde\delta(z)=\frac{1}{2\pi}\int e^{izx}\delta(x)dx=\frac{1}{2\pi}$ e l'antitrasformata $\delta(x)=\int e^{-izx}\tilde\delta(z)dz$:
$$\delta(x)=\frac{1}{2\pi}\int_{-\infty}^{\infty}e^{-izx}dz,\qquad\delta(x-x_0)=\frac{1}{2\pi}\int e^{-iz(x-x_0)}dz$$
(Dispense, p. 20). Serve per trasformare un vincolo, come $\delta(N-\sum_kn_k)$ o $\delta(\mathcal H-E)$, in un esponenziale, che si tratta poi con il punto di sella.

::: attenzione
**Il fattore $2\pi$.** Le dispense (p. 20) scrivono $\tilde\delta(z)=1$ e $\delta(x)=\int e^{-izx}dz$, con una nota nel testo stesso, «FIX I 2 PI»: manca il fattore $\frac{1}{2\pi}$. Con la convenzione $\tilde\delta(z)=\frac{1}{2\pi}\int e^{izx}\delta(x)dx$ si ha $\tilde\delta=\frac{1}{2\pi}$ e la forma corretta è quella scritta sopra. Calcolo mio.
:::

## Esercizi svolti {#esercizi}

:::: esercizio
**Numeri casuali esponenziali.** Serve una sequenza di numeri $y$ distribuiti come $P(y)=\frac1\lambda e^{-y/\lambda}$, ma il calcolatore ha solo `rand()`, che dà numeri uniformi in $(0,1)$. Come si fa? (Dispense, p. 8.)

::: soluzione
Con $x$ uniforme, $P(x)=1$. Il cambio di variabile conserva la probabilità: $P(y)\,dy=P(x)\,dx$, cioè
$$\frac1\lambda e^{-y/\lambda}dy=dx\quad\Longrightarrow\quad-d\big(e^{-y/\lambda}\big)=dx\quad\Longrightarrow\quad e^{-y/\lambda}=1-x .$$
Poiché $1-x$ è uniforme come $x$, si può scrivere $e^{-y/\lambda}=x$, cioè
$$y=-\lambda\ln x .$$
Basta estrarre $x$ con `rand()`, farne il logaritmo e moltiplicare per $-\lambda$. È il metodo dell'inversione della funzione di distribuzione, il punto di partenza di ogni simulazione Monte Carlo.
:::
::::

:::: esercizio
**La distanza della stella più vicina.** Con $P(R)=4\pi R^2\rho\,e^{-\frac43\pi\rho R^3}$, trovare la distanza più probabile e quella media. Il calcolo è mio, sulla distribuzione di p. 13.

::: soluzione
**Più probabile.** $\frac{d}{dR}\big[R^2e^{-aR^3}\big]=0$ con $a=\frac43\pi\rho$ dà $2R=3aR^4$, cioè
$$R^*=\Big(\frac{1}{2\pi\rho}\Big)^{1/3}.$$
**Media.** Con $u=\frac43\pi\rho R^3$ la distribuzione diventa $e^{-u}du$: il volume della sfera vuota è distribuito esponenzialmente. Quindi
$$\langle R\rangle=\Big(\frac{3}{4\pi\rho}\Big)^{1/3}\int_0^\infty u^{1/3}e^{-u}du=\Gamma\big(\tfrac43\big)\Big(\frac{3}{4\pi\rho}\Big)^{1/3}\simeq0{,}893\,\Big(\frac{3}{4\pi\rho}\Big)^{1/3}.$$
**Lettura.** La distanza tipica è dell'ordine del raggio della sfera che contiene in media una stella, $(3/4\pi\rho)^{1/3}$, cioè $\rho^{-1/3}$. La stessa distribuzione descrive la distanza del primo vicino in un gas ideale.
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Che differenza c'è tra probabilità oggettive e soggettive, e quali usa la meccanica statistica?

::: risposta
Le oggettive si misurano come frequenze relative su molte prove. Le soggettive si assegnano in base a quello che non si sa: se nessun esito è privilegiato, tutti sono equiprobabili. La meccanica statistica assegna probabilità soggettive, per esempio l'uguale probabilità dei microstati, e ne verifica le conseguenze con gli esperimenti.
:::
::::

:::: domanda
Perché la varianza di una somma di variabili indipendenti è la somma delle varianze? Che cosa cambia se sono correlate?

::: risposta
$\sigma_Y^2=\sum_{ij}a_ia_j\big(\langle X_iX_j\rangle-\langle X_i\rangle\langle X_j\rangle\big)$. Per variabili indipendenti i termini con $i\neq j$ si annullano, perché $\langle X_iX_j\rangle=\langle X_i\rangle\langle X_j\rangle$, e restano le varianze. Con correlazioni compaiono le correlazioni connesse, che possono aumentare o diminuire la varianza totale.
:::
::::

:::: domanda
Come si ottiene la distribuzione di Poisson dalla binomiale, e che cosa la caratterizza?

::: risposta
Per $p\to0$ e $N\to\infty$ con $\lambda=Np$ fisso: $\binom Nk\simeq N^k/k!$ e $q^{N-k}\simeq e^{-\lambda}$, quindi $P(k)=\lambda^ke^{-\lambda}/k!$. È la statistica degli eventi rari e indipendenti, e la caratterizza l'uguaglianza tra media e varianza, entrambe pari a $\lambda$.
:::
::::

:::: domanda
Perché in meccanica statistica le grandezze intensive non fluttuano?

::: risposta
Un'intensiva è una media di $N$ contributi, $Z=\frac1N\sum X_i$. Per contributi indipendenti, o debolmente correlati, la varianza è $\frac{1}{N^2}\sum\sigma_i^2\sim\frac1N$. Per Chebyshev la probabilità di discostarsi dalla media di una quantità fissata va a zero per $N\to\infty$: le fluttuazioni relative vanno come $N^{-1/2}$, circa $10^{-12}$ per un sistema macroscopico.
:::
::::

:::: domanda
Che cosa dice il limite centrale, e quali sono le sue ipotesi?

::: risposta
La somma di $N$ variabili indipendenti con varianza finita, centrata e divisa per $\sigma\sqrt N$, tende a una gaussiana standard, qualunque sia la distribuzione di partenza. Servono indipendenza e varianza finita. La dimostrazione passa per le funzioni caratteristiche: la trasformata della somma è il prodotto delle trasformate, e lo sviluppo al second'ordine elevato alla $N$ dà $e^{-z^2/2}$.
:::
::::

:::: domanda
Perché la media di variabili di Cauchy non si stabilizza?

::: risposta
La Cauchy ha varianza infinita, perché le code vanno come $1/x^2$. La sua funzione caratteristica è $e^{-|z|}$, non quadratica in $z$; quella della somma è $e^{-N|z|}$, e la media $Y/N$ ha di nuovo trasformata $e^{-|z|}$: la stessa distribuzione di una variabile sola. Un solo valore enorme domina la somma, e la media non converge.
:::
::::

:::: domanda
Spiega il metodo del punto di sella e come dà la formula di Stirling.

::: risposta
In $\int e^{Nf(x)}dx$ con $N$ grande, l'integrando è dominato dal massimo di $f$. Sviluppando al second'ordine si ottiene una gaussiana: $e^{Nf(x_0)}\sqrt{2\pi/N|f''(x_0)|}$. Per Stirling si scrive $N!=\int t^Ne^{-t}dt=N^{N+1}\int e^{N(\ln z-z)}dz$: il massimo è in $z=1$ con $f=-1$ e $f''=-1$, e viene $N^Ne^{-N}\sqrt{2\pi N}$.
:::
::::

## Articoli correlati
- [[insieme-microcanonico]]: il postulato di uguale probabilità, una probabilità soggettiva; il volume nel guscio.
- [[insieme-canonico]]: punto di sella e fluttuazioni gaussiane dell'energia.
- [[insieme-gran-canonico-e-npt]]: la Poisson del numero di particelle in un volume di gas ideale.
- [[ripasso-di-termodinamica]]: l'altra metà dei prerequisiti.
- [[spazio-delle-fasi-e-liouville]]: dove la probabilità diventa una densità nello spazio delle fasi.
- [[meccanica-statistica/corso-e-lezioni]]: gli appunti di quest'anno su questi argomenti (pp. 10–15).

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 3–20: probabilità oggettive e soggettive p. 3; variabili continue, somme e correlazioni pp. 4–5; cambio di variabile e marginalizzazione pp. 5–8; binomiale pp. 8–9; Poisson pp. 9–13; gaussiana p. 13; Chebyshev e grandi numeri pp. 14–15; limite centrale e Cauchy pp. 15–18; punto di sella pp. 18–19; Stirling pp. 19–20; delta p. 20.
- Appunti delle lezioni di quest'anno, pp. 10–15 (vedi [[meccanica-statistica/corso-e-lezioni]]); il file non è in questo repository.
