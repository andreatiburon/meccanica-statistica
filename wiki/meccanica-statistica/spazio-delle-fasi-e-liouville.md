---
tags: [meccanica-statistica, spazio-delle-fasi, liouville, ergodicita, ensemble, lezione]
data_creazione: 2026-10-27
data_aggiornamento: 2026-10-27
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
---

# Spazio delle fasi e teorema di Liouville

Il ponte tra la meccanica e la statistica. Lo stato di $N$ particelle è un punto in uno spazio a $6N$ dimensioni, che si muove secondo le equazioni di Hamilton. Gibbs rinuncia a seguire la traiettoria e assegna una probabilità a ogni punto: nasce l'insieme statistico. Il teorema di Liouville dice che questa probabilità scorre come un fluido incomprimibile; l'ergodicità e i teoremi di Khinchin dicono quando le medie sull'insieme coincidono con quelle misurate nel tempo.

## Punti chiave
- **Spazio $\Gamma$:** $6N$ dimensioni ($q_1,\dots,q_{3N},p_1,\dots,p_{3N}$). Un punto è un microstato e si muove secondo $\dot q_i=\partial\mathcal H/\partial p_i$, $\dot p_i=-\partial\mathcal H/\partial q_i$. Traiettorie distinte non si intersecano mai.
- **Insieme di Gibbs:** a uno stato macroscopico corrispondono moltissimi microstati. Si descrive il sistema con una densità $\rho(q,p,t)$ e si calcolano le medie $\langle O\rangle=\int O\rho/\int\rho$.
- **Ergodicità:** la media nel tempo lungo una traiettoria deve coincidere con la media sull'insieme. Questo richiede $\rho(q,p)=\lim_{T\to\infty}\frac1T\int_0^T\delta(q-q(t))\delta(p-p(t))\,dt$: la traiettoria passa vicino a ogni punto per un tempo proporzionale alla sua probabilità.
- **Liouville:** l'equazione di continuità più le equazioni di Hamilton danno $\frac{d\rho}{dt}=\frac{\partial\rho}{\partial t}+\{\rho,\mathcal H\}=0$: la densità si propaga come un fluido incomprimibile, e il volume nello spazio delle fasi si conserva.
- **Equilibrio:** $\partial\rho/\partial t=0$ richiede $\{\rho,\mathcal H\}=0$: $\rho$ è funzione di $\mathcal H$ o di altre costanti del moto.
- **Quali osservabili:** per un'osservabile «prodotto» di $N$ termini il tempo di esplorazione cresce esponenzialmente con $N$; per le osservabili «somma», come l'energia, i teoremi di Khinchin danno deviazioni relative $\sim N^{-1/4}$ tra media temporale e media statistica.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Versa una goccia d'inchiostro in un bicchiere d'acqua e mescola piano. La goccia si allunga, si piega, diventa un filamento sottilissimo che attraversa tutto il bicchiere. Ma il suo **volume** non cambia: l'acqua è incomprimibile. Dopo un po', guardando a occhio nudo, il bicchiere sembra uniformemente colorato, anche se l'inchiostro occupa sempre lo stesso volume.

Lo spazio delle fasi si comporta così. Un insieme di condizioni iniziali vicine è la goccia. La dinamica hamiltoniana la deforma e la stira, ma, per il teorema di Liouville, ne conserva il volume. Se la dinamica è abbastanza mescolante, la goccia si distribuisce su tutta la superficie di energia costante: a grana grossa sembra uniforme. È la giustificazione del postulato su cui si costruisce il [[insieme-microcanonico]]: all'equilibrio tutti i microstati con la stessa energia sono equiprobabili.
:::

La lezione segue questo filo.

1. [Lo spazio delle fasi](#spazio-gamma) e [le sue traiettorie](#traiettorie).
2. [Dai microstati agli insiemi di Gibbs](#insiemi).
3. [L'ergodicità](#ergodicita).
4. [Il teorema di Liouville](#liouville) e [la struttura delle traiettorie](#struttura).
5. [Ancora sull'ergodicità: Birkhoff, osservabili micro e macro, Khinchin](#birkhoff-khinchin).
6. [Esercizi svolti](#esercizi).

## Lo spazio delle fasi {#spazio-gamma}

Lo stato di un sistema di $N$ atomi è dato dalle $3N$ coordinate canoniche $q_1,\dots,q_{3N}$ e dai $3N$ impulsi coniugati $p_1,\dots,p_{3N}$. Lo spazio a $6N$ dimensioni che li contiene è lo **spazio delle fasi**, o spazio $\Gamma$; un suo punto rappresenta lo stato dell'intero sistema. Per molecole senza particolari simmetrie servono anche le variabili di orientazione, e lo spazio ha $12N$ dimensioni (Dispense, p. 34). Più avanti il concetto si estenderà a variabili di spin o ad altri oggetti.

Date le condizioni iniziali, cioè un punto di $\Gamma$, l'evoluzione è fissata dalle **equazioni di Hamilton**:
$$\dot q_i=\frac{\partial\mathcal H}{\partial p_i},\qquad\dot p_i=-\frac{\partial\mathcal H}{\partial q_i}.$$
Descrivono come il **punto rappresentativo** si muove in $\Gamma$ (Dispense, p. 34).

Un'**osservabile** classica è una funzione delle $6N$ variabili, valutata nel punto rappresentativo: per esempio l'energia è $\mathcal H(q,p)$. Dipende dal tempo attraverso il moto del punto (Dispense, p. 34).

## Le traiettorie non si incrociano {#traiettorie}

Se l'hamiltoniana non dipende dalle derivate temporali di $q$ e $p$, cioè senza forze dissipative, la dinamica è **invariante per inversione temporale** ($t\to-t$, $p\to-p$) e determina univocamente il moto per tutti i tempi, passati e futuri, a partire dalla posizione a un istante qualunque. Ne segue che la traiettoria di un punto è una curva chiusa oppure una curva che non si interseca mai (Dispense, p. 34).

::: idea
**Concetto importante.** Traiettorie distinte all'istante 0 non si intersecano mai. Se si incontrassero in un punto, da lì in poi evolverebbero allo stesso modo, e per la reversibilità sarebbero state identiche anche nel passato (Dispense, p. 34).
:::

## Dai microstati agli insiemi di Gibbs {#insiemi}

Le misure, specialmente all'equilibrio, sono riproducibili: le osservabili misurate devono essere «simili» per moltissimi punti di $\Gamma$. Con misure macroscopiche non si distinguono due sistemi in microstati diversi che soddisfano le stesse condizioni macroscopiche. Quando si parla di condizioni macroscopiche date, ci si riferisce sempre a un'ampia **regione** di $\Gamma$, non a un punto (Dispense, p. 35).

::: idea
**Concetto importante.** A uno stato macroscopico corrispondono moltissimi stati microscopici: un numero che cresce esponenzialmente con $N$ (Dispense, p. 35).
:::

**L'idea di Gibbs.** Gibbs aggiunge un elemento: la **probabilità** di un microstato. Per un sistema isolato, per esempio, si sa già che i punti rilevanti hanno tutti la stessa energia: a quelli con energia diversa si può dare probabilità nulla. Gibbs propone di descrivere un sistema macroscopico con una distribuzione di probabilità su tutto $\Gamma$. Un **insieme statistico** (ensemble) è una distribuzione di punti in $\Gamma$, descritta da una densità $\rho(q,p,t)$ tale che
$$\rho(q,p,t)\,dq_1\cdots dq_{3N}\,dp_1\cdots dp_{3N}$$
misura quanti punti rappresentativi stanno, all'istante $t$, nel volumetto attorno a $(q,p)$ (Dispense, p. 35).

Gibbs fa una grossa operazione concettuale: **elimina il tempo**, limitandosi all'equilibrio, ed **elimina la necessità di calcolare la traiettoria**. Un insieme è completamente specificato da $\rho$; all'equilibrio $\rho$ non dipende dal tempo. I punti dell'insieme sono **copie mentali** del sistema, che non interagiscono tra loro (Dispense, p. 35).

**La media termodinamica.** La media di un'osservabile sull'insieme è
$$\langle O\rangle=\frac{\int d^{3N}p\,d^{3N}q\;O(p,q)\,\rho(p,q,t)}{\int d^{3N}p\,d^{3N}q\;\rho(p,q,t)},$$
dove il denominatore normalizza la probabilità. L'eventuale dipendenza dal tempo è tutta in $\rho$ (Dispense, pp. 35–36).

## L'ergodicità {#ergodicita}

Sperimentalmente però non si misura una media sull'insieme, ma una media **nel tempo** lungo l'unica traiettoria del sistema:
$$\bar O(q_0,p_0)=\frac1T\int_0^TO\big(q(t),p(t)\big|_{q_0,p_0}\big)\,dt ,$$
con $(q_0,p_0)$ lo stato iniziale. Perché la teoria abbia senso fisico, le due medie devono coincidere, e la dipendenza dallo stato iniziale deve sparire (Dispense, p. 36).

:::: {.passaggi titolo="Che cosa richiede l'uguaglianza delle due medie"}
Si inserisce nella media temporale l'identità $\int d^{3N}p\,d^{3N}q\;\delta(q-q(t))\,\delta(p-p(t))=1$ e si scambia l'ordine degli integrali:
$$\begin{aligned}\bar O&=\frac1T\int_0^Tdt\int d^{3N}p\,d^{3N}q\;\delta(q-q(t))\delta(p-p(t))\,O(q,p)\\&=\int d^{3N}p\,d^{3N}q\;O(q,p)\Big[\frac1T\int_0^T\delta(q-q(t))\delta(p-p(t))\,dt\Big].\end{aligned}$$
Confrontando con la media sull'insieme, le due coincidono per ogni $O$ se
$$\rho(q,p)=\lim_{T\to\infty}\frac1T\int_0^T\delta\big(q-q(t)\big)\,\delta\big(p-p(t)\big)\,dt$$
(Dispense, p. 36), dove $T$ è un tempo macroscopico, molto maggiore dei tempi microscopici, come il tempo tra due urti in un gas.
::::

::: idea
**Concetto importante.** La traiettoria passa vicino a ogni punto per un tempo proporzionale alla probabilità di quel punto (Dispense, p. 36).
:::

Altre definizioni equivalenti: un sistema è **ergodico** se, partendo da un punto, arriva nel tempo arbitrariamente vicino a qualunque altro punto accessibile, per esempio con la stessa energia se il sistema è isolato. In altre parole, il suo spazio delle fasi non è spezzato in parti separate (Dispense, p. 37).

## Il teorema di Liouville {#liouville}

Le traiettorie non si intersecano, e non ci sono punti di $\Gamma$ dove nascono o muoiono traiettorie. Quindi i punti rappresentativi si conservano, e la loro densità obbedisce a un'**equazione di continuità** (Dispense, p. 37):
$$\frac{\partial\rho}{\partial t}=-\nabla\cdot(\rho\vec v),$$
dove $\vec v=(\dot q_1,\dots,\dot q_{3N},\dot p_1,\dots,\dot p_{3N})$ è la «velocità» nello spazio delle fasi.

:::: {.passaggi titolo="L'equazione di continuità, se non la ricordate"}
Si prende un volume $\Omega$ di $\Gamma$ chiuso dalla superficie $S$. Senza sorgenti né pozzi, in un tempo $dt$ attraverso l'elemento $dS$, di normale $\vec n$, passano i punti contenuti nel volumetto $\rho\,\vec v\cdot\vec n\,dt\,dS$. La variazione del numero di punti in $\Omega$ è il flusso attraverso il bordo:
$$\frac{d}{dt}\int_\Omega\rho\,d^{3N}p\,d^{3N}q=\int_\Omega\frac{\partial\rho}{\partial t}d^{3N}p\,d^{3N}q=-\oint_S\rho\,\vec v\cdot\vec n\,dS .$$
Con il teorema della divergenza, $\oint_S\vec X\cdot\vec n\,dS=\int_\Omega\nabla\cdot\vec X\,d\Omega$, e per l'arbitrarietà di $\Omega$ si ottiene l'equazione locale (Dispense, pp. 37–38).
::::

:::: {.passaggi titolo="Dall'equazione di continuità a Liouville"}
Esplicitando la divergenza:
$$\begin{aligned}-\frac{\partial\rho}{\partial t}&=\sum_i\Big[\frac{\partial(\rho\dot q_i)}{\partial q_i}+\frac{\partial(\rho\dot p_i)}{\partial p_i}\Big]\\&=\sum_i\Big[\dot q_i\frac{\partial\rho}{\partial q_i}+\dot p_i\frac{\partial\rho}{\partial p_i}\Big]+\rho\sum_i\Big[\frac{\partial\dot q_i}{\partial q_i}+\frac{\partial\dot p_i}{\partial p_i}\Big].\end{aligned}$$
Con le equazioni di Hamilton l'ultima parentesi è
$$\frac{\partial\dot q_i}{\partial q_i}+\frac{\partial\dot p_i}{\partial p_i}=\frac{\partial^2\mathcal H}{\partial q_i\partial p_i}-\frac{\partial^2\mathcal H}{\partial p_i\partial q_i}=0 :$$
**il flusso hamiltoniano ha divergenza nulla**. Resta
$$\frac{\partial\rho}{\partial t}+\sum_i\Big[\dot q_i\frac{\partial\rho}{\partial q_i}+\dot p_i\frac{\partial\rho}{\partial p_i}\Big]=\frac{d\rho}{dt}=0$$
(Dispense, p. 38).
::::

È il **teorema di Liouville**: la densità vista da un punto che si muove con il flusso non cambia. **La probabilità nello spazio delle fasi si propaga come un fluido incomprimibile.** Con le parentesi di Poisson $\{\rho,\mathcal H\}=\sum_i\big(\frac{\partial\rho}{\partial q_i}\frac{\partial\mathcal H}{\partial p_i}-\frac{\partial\rho}{\partial p_i}\frac{\partial\mathcal H}{\partial q_i}\big)$:
$$\frac{d\rho}{dt}=\frac{\partial\rho}{\partial t}+\{\rho,\mathcal H\}=0 .$$

**All'equilibrio** $\partial\rho/\partial t=0$, quindi $\{\rho,\mathcal H\}=0$: $\rho$ deve «commutare» con $\mathcal H$. Può essere funzione di $\mathcal H$ o, in linea di principio, di altre costanti del moto, come l'impulso totale o il momento angolare totale (Dispense, p. 38). Le scelte $\rho\propto\delta(\mathcal H-E)$ e $\rho\propto e^{-\beta\mathcal H}$ sono i [[insieme-microcanonico|microcanonico]] e il [[insieme-canonico|canonico]].

::: {.lab-segnaposto tipo="liouville"}
:::

## La struttura delle traiettorie {#struttura}

Alcune proprietà delle traiettorie nello spazio delle fasi (Dispense, pp. 38–39):

- **Non si incontrano.** Punti distinti all'istante 0 non si incontreranno mai, né nel futuro né nel passato. Quindi una traiettoria non può esplorare **tutti** i punti dello spazio delle fasi, ma solo quelli generati dalla dinamica a partire da $(q_0,p_0)$. Eppure ogni traiettoria deve permettere di calcolare la stessa media temporale.
- **Per tempi infiniti** una traiettoria ergodica copre uniformemente lo spazio accessibile.
- **Traiettorie infinitamente vicine all'istante 0 si allontanano** nel tempo.
- **I volumi si conservano.** Le traiettorie che formano una superficie chiusa all'istante 0 formano una superficie chiusa a ogni istante: nessun punto interno può uscire e nessuno esterno entrare. L'elemento di volume $d^{3N}p(0)\,d^{3N}q(0)$ è uguale a $d^{3N}p(t)\,d^{3N}q(t)$, perché $d\rho/dt=0$. Si dimostra anche calcolando lo jacobiano della trasformazione da $(q(0),p(0))$ a $(q(t),p(t))$ e mostrando che vale 1.

:::: {.passaggi titolo="Lo jacobiano vale 1 (dimostrazione mia, la stessa degli appunti di quest'anno)"}
Sia $x=(q,p)$ e $\dot x=v(x)$. Per un passo $dt$, $x(t+dt)=x(t)+v(x)\,dt$, e la matrice jacobiana è $J=1+M\,dt$ con $M_{ab}=\partial v_a/\partial x_b$. Al prim'ordine
$$\det J=1+\mathrm{Tr}M\,dt,\qquad\mathrm{Tr}M=\sum_i\Big(\frac{\partial\dot q_i}{\partial q_i}+\frac{\partial\dot p_i}{\partial p_i}\Big)=0$$
per le equazioni di Hamilton. Quindi il volume non cambia in nessun passo, e componendo i passi non cambia mai: $\det J(t)=1$. È la stessa matrice $M$ che compare a p. 20 degli appunti delle lezioni (vedi [[meccanica-statistica/corso-e-lezioni]]).
::::

::: idea
**Perché allora si arriva all'equilibrio?** Il volume si conserva, ma la forma no: la goccia si stira lungo le direzioni in cui le traiettorie si allontanano e si assottiglia nelle altre, diventando un filamento sempre più fine e ripiegato. Guardata con una risoluzione finita, cioè con misure macroscopiche, appare spalmata su tutto lo spazio accessibile. È così che una dinamica reversibile, che conserva i volumi, produce un comportamento che a grana grossa sembra irreversibile. Il laboratorio qui sopra lo mostra con un pendolo. Questa lettura è mia, nello spirito delle dispense.
:::

Le dispense consigliano un video sulla reversibilità idrodinamica: un fluido viscoso tra due cilindri, in cui una goccia di colorante si «mescola» ruotando un cilindro e si «smescola» ruotandolo all'indietro (Dispense, p. 39). Il link è omesso, perché rimanda a una pagina personale.

## Ancora sull'ergodicità: Birkhoff, osservabili micro e macro, Khinchin {#birkhoff-khinchin}

Dopo Gibbs si è lavorato molto per stabilire quando vale l'ipotesi ergodica, su cui si fonda la meccanica statistica. I problemi sono due: la dipendenza dallo stato iniziale, e quanto deve essere lungo il tempo $T$ perché il limite converga (Dispense, p. 39).

**I teoremi di Birkhoff**, enunciati qualitativamente (Dispense, p. 39):

1. Per quasi tutte le condizioni iniziali $X_0$, la media su un tempo infinito $\bar A(X_0)=\lim_{T\to\infty}\frac1T\int_0^TA(U^tX_0)\,dt$ **esiste** e non dipende dal punto di partenza.
2. Perché un sistema sia ergodico, la dinamica non deve spezzare lo spazio delle fasi in parti separate. Non serve che la traiettoria visiti tutti i punti, ma che passi arbitrariamente vicino a ciascuno.

Sono teoremi rassicuranti, anche se dimostrare l'indecomponibilità richiesta dal secondo non è facile, e risolvono il problema delle condizioni iniziali. Ma non dicono nulla su **quanto** debba essere lungo $T$.

**Un'osservabile microscopica: tempi esponenziali.** Sia $A(X)=1$ se $X$ sta in una regione $G$ di $\Gamma$, un ipercubo di lato $\epsilon$ in $6N$ dimensioni, e 0 altrimenti. Con $\rho$ costante la media statistica è $\langle A\rangle=\epsilon^{6N}/{\rm Vol}(\Gamma)$: il rapporto tra i volumi. Per campionarla la traiettoria deve trovare $G$. Se ogni particella trova la sua parte di $G$ in un tempo $\tau\sim\epsilon^{-\gamma}$, dove $\gamma$ dipende dalla dinamica, perché ci siano **tutte** contemporaneamente serve
$$T\sim\tau^N\sim\epsilon^{-\gamma N}:$$
un tempo **esponenzialmente** lungo in $N$. Per osservabili di tipo «prodotto», $A(X)=\prod_n\chi_n(p_n,q_n)$, non si può fare meccanica statistica (Dispense, p. 40).

**Un'osservabile macroscopica: la somma.** Per $A(X)=\sum_n\chi_n(p_n,q_n)$, come l'energia, cambiare un termine sposta $A$ solo di $1/N$ relativo. Le funzioni somma sono buone osservabili macroscopiche, insensibili ai dettagli microscopici (Dispense, p. 40).

:::: {.passaggi titolo="I teoremi di Khinchin"}
Per osservabili somma, con hamiltoniana somma di hamiltoniane di singola particella, Khinchin dimostrò risultati simili alla legge dei grandi numeri. La probabilità che la media temporale $\bar f$ si discosti da $\langle f\rangle$ di più di $a$ soddisfa
$$\mathrm{Prob}\big(|\bar f-\langle f\rangle|>a\big)<\frac4a\big\langle|f-\langle f\rangle|\big\rangle\le\frac4a\,\sigma,$$
dove l'ultimo passo usa la disuguaglianza di Schwarz, $\langle|f-\langle f\rangle|\rangle\le\langle(f-\langle f\rangle)^2\rangle^{1/2}=\sigma$. Dividendo per $\langle f\rangle$:
$$\mathrm{Prob}\Big(\Big|\frac{\bar f}{\langle f\rangle}-1\Big|>\frac{a}{\langle f\rangle}\Big)<\frac{4\sigma}{a}.$$
Per variabili indipendenti media e $\sigma^2$ scalano come $N$. Scegliendo $a=\sigma^{3/2}$, si ha $a/\langle f\rangle\sim N^{3/4}/N=N^{-1/4}$ e $4\sigma/a=4\sigma^{-1/2}\sim N^{-1/4}$:
$$\mathrm{Prob}\Big(\Big|\frac{\bar f}{\langle f\rangle}-1\Big|>\frac{K_1}{N^{1/4}}\Big)<\frac{K_2}{N^{1/4}}$$
(Dispense, p. 41).
::::

La differenza tra media temporale e media statistica tende a zero per $N\to\infty$. Lo stesso vale per $f$ stessa, non solo per la sua media temporale: le osservabili fisicamente rilevanti sono **automedianti** per $N$ grande, e allora è lecito pensare che $T$ non debba essere particolarmente lungo (Dispense, p. 41).

I teoremi presuppongono un'hamiltoniana somma di termini indipendenti. Ma se le interazioni sono a corto raggio, il sistema si può vedere come somma di sottosistemi indipendenti, e nel limite termodinamico le ipotesi tornano a valere. Un altro esempio sono i modi normali, dove una trasformazione elimina le interazioni a favore di modi indipendenti (Dispense, pp. 41–42). Armati di queste considerazioni, si può affrontare la meccanica statistica degli insiemi: il [[insieme-microcanonico]].

## Esercizi svolti {#esercizi}

:::: esercizio
**Il flusso dell'oscillatore armonico conserva le aree.** Per $\mathcal H=\frac{p^2}{2m}+\frac12m\omega^2q^2$, scrivere la soluzione delle equazioni di Hamilton come mappa lineare $(q_0,p_0)\mapsto(q(t),p(t))$ e verificare che conserva le aree. Esercizio mio.

::: soluzione
$\dot q=p/m$ e $\dot p=-m\omega^2q$ danno
$$q(t)=q_0\cos\omega t+\frac{p_0}{m\omega}\sin\omega t,\qquad p(t)=-m\omega q_0\sin\omega t+p_0\cos\omega t .$$
Lo jacobiano è
$$\det\begin{pmatrix}\cos\omega t&\frac{1}{m\omega}\sin\omega t\\-m\omega\sin\omega t&\cos\omega t\end{pmatrix}=\cos^2\omega t+\sin^2\omega t=1 .$$
Le aree si conservano. Nelle variabili riscalate $(q,p/m\omega)$ il flusso è una rotazione rigida: ogni regione ruota intorno all'origine senza deformarsi. Le traiettorie sono ellissi di energia costante, e la densità $\rho=f(\mathcal H)$ è costante su ciascuna: è stazionaria, come vuole $\{\rho,\mathcal H\}=0$.
:::
::::

:::: esercizio
**Con l'attrito Liouville non vale.** Aggiungere un attrito, $\dot p=-m\omega^2q-\gamma p$. Che cosa succede alle aree? Esercizio mio.

::: soluzione
La divergenza del flusso non è più nulla:
$$\frac{\partial\dot q}{\partial q}+\frac{\partial\dot p}{\partial p}=0-\gamma=-\gamma .$$
Con la formula dello jacobiano, $\frac{d}{dt}\ln\det J=\mathrm{Tr}M=-\gamma$, quindi
$$\text{area}(t)=\text{area}(0)\,e^{-\gamma t}.$$
Ogni regione si contrae esponenzialmente fino al punto fisso $(0,0)$, e $\rho$ diventa una delta. Il sistema dissipa energia verso l'esterno: non è più hamiltoniano, e la sua dinamica non è invariante per inversione del tempo. Liouville vale solo per sistemi hamiltoniani; un sistema con attrito è l'interazione con un ambiente che non viene descritto. Puoi vederlo nel laboratorio, accendendo l'attrito.
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Perché due traiettorie distinte nello spazio delle fasi non possono incrociarsi?

::: risposta
Le equazioni di Hamilton determinano univocamente il futuro e, per la reversibilità, il passato a partire da un punto. Se due traiettorie passassero per lo stesso punto, da lì in poi coinciderebbero, e coinciderebbero anche nel passato: sarebbero la stessa traiettoria.
:::
::::

:::: domanda
Che cos'è un insieme di Gibbs, e che cosa sostituisce?

::: risposta
È una distribuzione di probabilità $\rho(q,p)$ sullo spazio delle fasi, interpretabile come tante copie mentali del sistema, non interagenti, compatibili con le condizioni macroscopiche. Sostituisce il calcolo della traiettoria: invece di seguire il punto nel tempo, si fanno medie pesate con $\rho$.
:::
::::

:::: domanda
Che cosa richiede l'ergodicità, in formule e a parole?

::: risposta
Che la media nel tempo lungo una traiettoria coincida con la media sull'insieme, qualunque sia lo stato iniziale. In formule $\rho(q,p)=\lim\frac1T\int_0^T\delta(q-q(t))\delta(p-p(t))dt$. A parole: la traiettoria passa vicino a ogni punto per un tempo proporzionale alla sua probabilità, e lo spazio accessibile non è diviso in parti separate.
:::
::::

:::: domanda
Dimostra a voce il teorema di Liouville.

::: risposta
I punti rappresentativi si conservano, quindi $\partial_t\rho+\nabla\cdot(\rho\vec v)=0$. Sviluppando la divergenza, $\nabla\cdot(\rho\vec v)=\vec v\cdot\nabla\rho+\rho\nabla\cdot\vec v$. Per le equazioni di Hamilton $\nabla\cdot\vec v=\sum_i(\partial_{q_i}\partial_{p_i}\mathcal H-\partial_{p_i}\partial_{q_i}\mathcal H)=0$. Resta $\partial_t\rho+\vec v\cdot\nabla\rho=d\rho/dt=0$: la densità è costante lungo il flusso.
:::
::::

:::: domanda
Che forma deve avere $\rho$ all'equilibrio, e perché?

::: risposta
All'equilibrio $\partial_t\rho=0$, e per Liouville $\{\rho,\mathcal H\}=0$. Una funzione che ha parentesi di Poisson nulla con $\mathcal H$ è una costante del moto: quindi $\rho$ dipende dalle coordinate solo attraverso $\mathcal H$ ed eventuali altre costanti del moto, come l'impulso totale. Il microcanonico, $\delta(\mathcal H-E)$, e il canonico, $e^{-\beta\mathcal H}$, sono di questo tipo.
:::
::::

:::: domanda
Se il volume nello spazio delle fasi si conserva, come fa un sistema a «spargersi» fino all'equilibrio?

::: risposta
Il volume si conserva ma la forma no. Traiettorie vicine si allontanano, quindi una regione si stira e si ripiega in filamenti sempre più sottili, che finiscono per attraversare tutta la superficie di energia. Con una risoluzione finita la regione sembra spalmata uniformemente, anche se il suo volume vero è rimasto lo stesso.
:::
::::

:::: domanda
Perché le osservabili «somma» sono buone osservabili macroscopiche e quelle «prodotto» no?

::: risposta
Un prodotto di $N$ condizioni richiede che tutte le particelle siano contemporaneamente in una certa regione: il tempo per campionarlo cresce come $\tau^N$, esponenzialmente. Una somma cambia di $1/N$ relativo per ogni particella, ed è insensibile ai dettagli; per Khinchin la sua media temporale si discosta da quella statistica di $\sim N^{-1/4}$, quindi coincidono per $N$ grande senza tempi astronomici.
:::
::::

## Articoli correlati
- [[insieme-microcanonico]]: il primo insieme, $\rho\propto\delta(\mathcal H-E)$, con il postulato di uguale probabilità.
- [[insieme-canonico]]: $\rho\propto e^{-\beta\mathcal H}$.
- [[ripasso-di-probabilita]]: densità di probabilità, marginalizzazione, legge dei grandi numeri.
- [[ripasso-di-termodinamica]]: la teoria macroscopica che gli insiemi devono ritrovare.
- [[meccanica-statistica/corso-e-lezioni]]: gli appunti di quest'anno su Liouville (pp. 18–20) e la pagina mancante su ergodicità e insiemi di Gibbs.

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 34–42: spazio delle fasi e traiettorie p. 34; insiemi di Gibbs e media termodinamica pp. 35–36; ergodicità pp. 36–37; Liouville pp. 37–38; struttura delle traiettorie pp. 38–39; Birkhoff p. 39; osservabili micro e macro p. 40; Khinchin pp. 41–42.
- Appunti delle lezioni di quest'anno, pp. 18–20 (vedi [[meccanica-statistica/corso-e-lezioni]]); il file non è in questo repository.
