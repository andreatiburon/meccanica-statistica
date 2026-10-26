---
tags: [meccanica-statistica, ensemble, canonico, funzione-di-partizione, lezione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-26
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
  - raw/foto appunti mec stat anno scorso/IMG_6334_COMPILED.HEIC … IMG_6337_COMPILED.HEIC
---

# Insieme canonico

Un sistema chiuso ($N$ e $V$ fissati) non è isolato: sta a contatto con un serbatoio molto più grande che gli fissa la temperatura. La sua energia non è più nota, ma la probabilità di ogni microstato si scrive in forma chiusa: è il peso di Boltzmann $e^{-\beta\mathcal H}$. Tutta la termodinamica si ricava da un solo integrale, la funzione di partizione $Q_N(V,T)$.

## Punti chiave
- **Peso di Boltzmann:** da un microcanonico sistema + serbatoio, sviluppando $S_2(E-E_1)\simeq S_2(E)-E_1/T$, si ottiene $\rho(q,p)=e^{-\beta\mathcal H(q,p)}/(N!\,h^{3N}Q_N)$, con $\beta=1/k_BT$. Il serbatoio entra solo attraverso $T$.
- **Funzione di partizione:** $Q_N=\frac{1}{N!h^{3N}}\int d^{3N}q\,d^{3N}p\,e^{-\beta\mathcal H}$ e $A=-k_BT\ln Q_N$. Da $A$ seguono $P=-(\partial A/\partial V)_T$, $S=-(\partial A/\partial T)_V$ e $U=\langle\mathcal H\rangle=-\partial\ln Q_N/\partial\beta$.
- **Pressione:** $P=Nk_BT/V-\langle\partial\mathcal H/\partial V\rangle$. Il primo termine è entropico e c'è sempre; il secondo esiste solo se le particelle interagiscono.
- **Particelle indipendenti:** $Q_N=Q_1^N/N!$. Per il gas ideale $Q_1=V/\Lambda^3$, con $\Lambda=h/\sqrt{2\pi mk_BT}$; ne seguono Sackur-Tetrode, $PV=Nk_BT$, la distribuzione di Maxwell-Boltzmann e $\beta\mu=\ln(\rho\Lambda^3)$.
- **Energia e fluttuazioni:** $P(\varepsilon)\propto e^{-\beta[\varepsilon-TS(\varepsilon)]}$ è una gaussiana centrata nel minimo dell'energia libera, con $\langle\Delta\mathcal H^2\rangle=k_BT^2C_V$. Quindi $\sigma_\varepsilon/\bar\varepsilon\sim N^{-1/2}$ e le medie canoniche coincidono con quelle microcanoniche: è l'equivalenza degli insiemi.
- **Densità degli stati di singola particella:** $g(\varepsilon)=\frac{1}{h^3}\int d^3q\,d^3p\,\delta(\mathcal H_1-\varepsilon)$ e $P(\varepsilon)=g(\varepsilon)e^{-\beta\varepsilon}/Q_1$. È lo strumento degli esercizi d'esame.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Un sistema piccolo, per esempio una molecola, vive dentro un serbatoio enorme, per esempio tutto il resto del gas. Ogni volta che la molecola prende in prestito un'energia $\varepsilon$, il serbatoio resta con $E-\varepsilon$, e il numero dei suoi stati cala. Il punto chiave è **di quanto** cala: per un serbatoio enorme, ogni unità di energia ceduta riduce i suoi stati sempre dello **stesso fattore**, qualunque prestito abbia già fatto. Prestiti che costano ogni volta lo stesso fattore si compongono come un interesse composto al contrario: il costo totale è un esponenziale, $e^{-\varepsilon/k_BT}$. Il fattore lo fissa il serbatoio, e quel fattore è la temperatura.

Ecco perché l'aria è più rarefatta in montagna. Portare una molecola a quota $z$ costa l'energia $mgz$, e la probabilità di trovarla lì è $e^{-mgz/k_BT}$. **Il peso di Boltzmann è la legge che dice quanto costa, in probabilità, ogni unità di energia.** Tutto il resto della lezione consiste nel sommare questi pesi.
:::

La lezione segue questo filo.

1. [Dal serbatoio al peso di Boltzmann](#serbatoio): la derivazione dal microcanonico.
2. [La funzione di partizione](#funzione-di-partizione) contiene tutta la termodinamica; [la pressione](#pressione) ha un significato microscopico preciso.
3. Le applicazioni a particelle indipendenti: [gas ideale](#gas-ideale), [Maxwell-Boltzmann](#maxwell), [oscillatori](#oscillatori), [atomi e molecole](#molecole), [dipoli nel campo](#dipolo), [polimero](#polimero).
4. [Quale energia ha davvero il sistema](#distribuzione-energia), [le fluttuazioni per un'altra strada](#fluttuazioni) e [l'equivalenza con il microcanonico](#equivalenza).
5. Gli strumenti per gli esercizi: [particelle indipendenti e potenziale chimico](#particelle-indipendenti), [l'atmosfera](#barometrica), [la densità degli stati](#densita-stati), e due [esercizi d'esame svolti](#esercizi).

## Dal serbatoio al peso di Boltzmann {#serbatoio}

In molti esperimenti il sistema non è isolato ($dQ\neq0$): sta a contatto con un termostato e scambia energia con esso. Sperimentalmente si controlla la temperatura, non l'energia. Come si descrive la statistica a $T$ fissata? (Dispense, p. 72.)

**L'impostazione.** Il nostro sistema 1 ($N_1$, $V_1$) fa parte di un sistema più grande; il resto è il sistema 2, con $N_2\gg N_1$ e $V_2\gg V_1$. I due scambiano energia ma non particelle. La sproporzione serve a far sì che gli scambi di energia non alterino la temperatura del sistema 2. Il sistema complessivo è isolato, quindi microcanonico, con $E<E_1+E_2<E+2\Delta$, e all'equilibrio $\bar E_2\gg\bar E_1$.

**Marginalizzare.** La densità di probabilità congiunta è uniforme: $\rho(q_1,p_1,q_2,p_2)=1/\Gamma_{1+2}(E)$. Vogliamo la probabilità che il sistema 1 stia in $(q_1,p_1)$, con energia $E_1=\mathcal H_1(q_1,p_1)$, **qualunque** sia lo stato del sistema 2. Integriamo su tutti gli stati del 2 compatibili con l'energia rimasta:
$$\rho(q_1,p_1)=\int dq_2\,dp_2\,\frac{\delta(E-E_1-\mathcal H_2)}{\Gamma_{1+2}(E)}=\frac{\Gamma_2(E-E_1)}{\Gamma_{1+2}(E)} .$$
La probabilità di uno stato del sistema piccolo è proporzionale al **numero di stati che lascia al serbatoio** (Dispense, p. 72; Appunti MS, p. 18).

**Sviluppare.** Poiché $E_1\ll E$, sviluppiamo il logaritmo, che varia lentamente, e non $\Gamma_2$, che varia in modo esplosivo:
$$k_B\ln\Gamma_2(E-E_1)=S_2(E)-E_1\frac{\partial S_2}{\partial E}\Big|_{E}+\dots=S_2(E)-\frac{E_1}{T}.$$
Quindi
$$\rho(q_1,p_1)=\frac{\Gamma_2(E)}{\Gamma_{1+2}(E)}\;e^{-\beta\mathcal H_1(q_1,p_1)},\qquad\beta=\frac{1}{k_BT}.$$
Il primo fattore non dipende da $(q_1,p_1)$: è solo una costante di normalizzazione. Il serbatoio è sparito, tranne che attraverso $T$. Possiamo togliere il pedice 1: per **qualunque** sistema a contatto con un termostato, $\rho(q,p)\propto e^{-\beta\mathcal H(q,p)}$ (Dispense, p. 73; Appunti MS, pp. 18–19).

:::: {.passaggi titolo="Perché si sviluppa il logaritmo e non Γ₂"}
$\Gamma_2(E)\sim e^{S_2/k_B}$ e $S_2\propto N_2$. Uno sviluppo di Taylor di $\Gamma_2$ stesso, $\Gamma_2(E-E_1)\simeq\Gamma_2(E)-E_1\Gamma_2'(E)$, sarebbe inutile: la derivata relativa $\Gamma_2'/\Gamma_2=\partial\ln\Gamma_2/\partial E=1/k_BT$ moltiplicata per $E_1$ non è piccola, e i termini successivi non lo sono nemmeno. Il logaritmo invece è proporzionale a $N_2$ e cambia di poco: il termine del second'ordine vale
$$\frac{E_1^2}{2}\frac{\partial^2S_2}{\partial E^2}=-\frac{E_1^2}{2T^2C_2},$$
con $C_2\propto N_2$ la capacità termica del serbatoio, e sparisce per $N_2\to\infty$. Per questo il serbatoio deve essere grande: la sua temperatura non cambia quando cede energia.
::::

::: idea
**Che cosa è cambiato rispetto al microcanonico.** Nel microcanonico il sistema poteva stare solo sul guscio $\mathcal H\simeq E$. Ora **tutto** lo spazio delle fasi è accessibile, ma con pesi diversi. Ad alta $T$ ($\beta\to0$) il peso è quasi uguale ovunque e tutti gli stati tornano equiprobabili: domina l'entropia. A bassa $T$ ($\beta\to\infty$) sopravvivono solo gli stati di energia minima: raffreddandosi, il sistema scende verso il fondamentale (Dispense, p. 73; Appunti MS, p. 20).
:::

## La funzione di partizione e l'energia libera {#funzione-di-partizione}

Imponendo che la densità sia adimensionale (il fattore $h^{3N}$) e che le particelle identiche non si contino due volte (il fattore $N!$), la densità canonica normalizzata è
$$\rho(q,p)=\frac{1}{Q_N\,h^{3N}N!}\,e^{-\beta\mathcal H(q,p)},$$
$$Q_N(V,T)=\frac{1}{N!\,h^{3N}}\int d^{3N}q\,d^{3N}p\;e^{-\beta\mathcal H(q,p)} .$$
$Q_N$, la **funzione di partizione**, è la somma dei pesi di Boltzmann di tutti gli stati (in tedesco *Zustandssumme*, «somma sugli stati»). Dipende da $N$, $V$ e $T$ (Dispense, p. 73).

Il ponte con la termodinamica è
$$A(V,T,N)=-k_BT\ln Q_N(V,T),$$
dove $A$ è l'**energia libera di Helmholtz**: il potenziale termodinamico che è minimo all'equilibrio per un sistema chiuso a contatto con un bagno termico.

:::: {.passaggi titolo="Verifica: questa A è proprio l'energia libera della termodinamica"}
**La termodinamica.** $A=U-TS$, quindi $dA=dU-T\,dS-S\,dT=-P\,dV-S\,dT$ (usando $dU=T\,dS-P\,dV$). Confrontando con $dA=(\partial A/\partial V)_T\,dV+(\partial A/\partial T)_V\,dT$:
$$P=-\Big(\frac{\partial A}{\partial V}\Big)_T,\qquad S=-\Big(\frac{\partial A}{\partial T}\Big)_V .$$

**La meccanica statistica.** Deriviamo $A=-k_BT\ln Q_N$ rispetto a $T$. Il $T$ compare due volte, davanti e dentro $\beta$:
$$\Big(\frac{\partial A}{\partial T}\Big)_V=-k_B\ln Q_N-\frac{k_BT}{Q_N}\frac{1}{N!h^{3N}}\int d^{3N}q\,d^{3N}p\,\frac{\mathcal H}{k_BT^2}\,e^{-\beta\mathcal H}.$$
Moltiplicando per $T$, il primo termine è $A$ e il secondo è $-\langle\mathcal H\rangle$:
$$T\Big(\frac{\partial A}{\partial T}\Big)_V=A-\langle\mathcal H\rangle\quad\Longrightarrow\quad A=U+T\Big(\frac{\partial A}{\partial T}\Big)_V=U-TS,$$
con $U\equiv\langle\mathcal H\rangle$. È la definizione termodinamica di $A$, con la $S$ di sopra (Dispense, p. 74; Appunti MS, p. 19).
::::

Due formule si usano di continuo. Poiché $\partial e^{-\beta\mathcal H}/\partial\beta=-\mathcal H e^{-\beta\mathcal H}$,
$$U=\langle\mathcal H\rangle=-\frac{\partial\ln Q_N}{\partial\beta},\qquad S=\frac{U-A}{T}.$$
Il metodo canonico è sempre lo stesso: **calcola $Q_N$, prendi il logaritmo, deriva.**

## Che cos'è la pressione {#pressione}

Da $\beta A=-\ln Q_N$ segue $P=k_BT\,(\partial\ln Q_N/\partial V)_T$. Per vedere da dove viene la dipendenza da $V$ conviene esplicitarla (Dispense, pp. 74–75; Appunti MS, pp. 20–21).

:::: {.passaggi titolo="Riscalare le coordinate"}
Il sistema sta in un cubo di lato $L$, $V=L^3$. Cambiamo variabili, $q=L\,t$, con $0<t<1$. Lo jacobiano dà $d^{3N}q=V^N d^{3N}t$, e la dipendenza da $V$ si separa in due pezzi: il fattore $V^N$ e quella che resta dentro l'hamiltoniana, $\mathcal H(p,Lt)$:
$$Q_N=\frac{V^N}{N!h^{3N}}\int d^{3N}p\,d^{3N}t\;e^{-\beta\mathcal H(p,t)} .$$
Derivando rispetto a $V$:
$$\frac{\partial Q_N}{\partial V}=\frac{N}{V}Q_N-\frac{V^N}{N!h^{3N}}\int d^{3N}p\,d^{3N}t\;\beta\frac{\partial\mathcal H}{\partial V}e^{-\beta\mathcal H}=\frac NVQ_N-\beta\Big\langle\frac{\partial\mathcal H}{\partial V}\Big\rangle Q_N .$$
Moltiplicando per $k_BT/Q_N$:
$$P=\frac{Nk_BT}{V}-\Big\langle\frac{\partial\mathcal H}{\partial V}\Big\rangle .$$
::::

La pressione ha due contributi.

- **$Nk_BT/V$**: la pressione del gas ideale. C'è sempre, anche senza interazioni. È di natura **entropica**: esprime la «voglia» del sistema di espandersi per avere più volume da esplorare.
- **$-\langle\partial\mathcal H/\partial V\rangle$**: la media di quanto cambia l'energia in una dilatazione isotropa. Esiste solo se le particelle interagiscono, perché solo allora l'energia dipende dalle distanze relative che la dilatazione modifica.

Il secondo termine è il punto di partenza dell'espansione del viriale, in [[gas-reali-viriale-e-van-der-waals]].

## Il gas ideale {#gas-ideale}

Per $N$ atomi liberi $\mathcal H=\sum_ip_i^2/2m$. L'integrale si fattorizza in $N$ integrali identici:
$$Q_N=\frac1{N!}\Big[\frac{1}{h^3}\int d^3q\,d^3p\;e^{-\beta p^2/2m}\Big]^N,$$
$$\frac{1}{h^3}\int d^3q\,d^3p\;e^{-\beta p^2/2m}=\frac{V}{h^3}\Big(\sqrt{2\pi m/\beta}\Big)^3 .$$
Definendo la **lunghezza termica di de Broglie**
$$\Lambda=\sqrt{\frac{h^2}{2\pi mk_BT}},\qquad Q_N(V,T)=\frac{1}{N!}\Big(\frac{V}{\Lambda^3}\Big)^N .$$
Dopo aver integrato sugli impulsi, ogni particella «esplora» $V/\Lambda^3$ stati: il volume misurato in celle di lato $\Lambda$ (Dispense, pp. 75–76; Appunti MS, p. 21).

::: idea
**Che cosa misura Λ.** È, a meno di fattori numerici, la lunghezza d'onda quantistica di una particella con energia cinetica termica. Da $\hbar^2k^2/2m=h^2/(2m\lambda^2)=\frac12k_BT$ si ricava $\lambda=h/\sqrt{mk_BT}$, che differisce da $\Lambda$ solo per $\sqrt{2\pi}$ (Dispense, p. 76). Finché le particelle distano tra loro molto più di $\Lambda$, cioè $\rho\Lambda^3\ll1$, la trattazione classica funziona. Quando $\rho\Lambda^3\sim1$ le onde si sovrappongono e servono i [[gas-quantistici-ideali]].
:::

**La termodinamica.** Con Stirling, $\ln N!\simeq N\ln N-N$:
$$A=-k_BT\Big[N\ln\frac{V}{\Lambda^3}-N\ln N+N\Big]=-Nk_BT\Big[\ln\frac{V}{N\Lambda^3}+1\Big],$$
estensiva, perché nel logaritmo c'è $V/N$.

:::: {.passaggi titolo="Entropia, energia e pressione"}
**Entropia.** $\Lambda^3\propto T^{-3/2}$, quindi $\partial\ln\Lambda^3/\partial T=-\frac{3}{2T}$:
$$S=-\Big(\frac{\partial A}{\partial T}\Big)_V=Nk_B\Big[\ln\frac{V}{N\Lambda^3}+1\Big]+Nk_BT\,\frac{3}{2T}=Nk_B\Big[\ln\frac{V}{N\Lambda^3}+\frac52\Big].$$
È la formula di Sackur-Tetrode, già trovata nell'[[insieme-microcanonico]] con un conto molto più faticoso.

**Energia.** $U=A+TS=\frac52Nk_BT-Nk_BT=\frac32Nk_BT$.

**Pressione.** Solo il $\ln V$ dipende dal volume: $P=-(\partial A/\partial V)_T=Nk_BT/V$.
(Dispense, p. 76; Appunti MS, pp. 21–22.)
::::

## La distribuzione di Maxwell-Boltzmann {#maxwell}

La fattorizzazione si spinge oltre: $Q_1$ si separa nelle tre direzioni, $Q_1=Q_xQ_yQ_z$ con $Q_\alpha=\frac Lh\int_{-\infty}^{\infty}dp_\alpha\,e^{-\beta p_\alpha^2/2m}$. Ogni fattore è indipendente dagli altri, quindi la probabilità che un atomo abbia componente $p_\alpha$ dell'impulso è
$$P(p_\alpha)=\frac{e^{-\beta p_\alpha^2/2m}}{\int dp_\alpha\,e^{-\beta p_\alpha^2/2m}}=\frac{e^{-\beta p_\alpha^2/2m}}{\sqrt{2\pi mk_BT}} :$$
una gaussiana di varianza $mk_BT$ (Dispense, p. 77; Appunti MS, p. 22).

**La distribuzione del modulo.** Vogliamo la probabilità che $|\vec p|=p_0$. Si inserisce una delta e si passa a coordinate sferiche:
$$P(|\vec p|=p_0)=\frac{\int d^3p\;e^{-\beta p^2/2m}\,\delta(|\vec p|-p_0)}{\int d^3p\;e^{-\beta p^2/2m}}=\frac{4\pi p_0^2\,e^{-\beta p_0^2/2m}}{(2\pi mk_BT)^{3/2}} .$$

:::: {.passaggi titolo="Il denominatore con la funzione Γ"}
Nel rapporto il $4\pi$ angolare si semplifica, e resta da calcolare $\int_0^\infty p^2dp\,e^{-\beta p^2/2m}$. Con $y=\beta p^2/2m$, cioè $p=\sqrt{2mk_BT}\,y^{1/2}$ e $p^2dp=(2mk_BT)^{3/2}\,\tfrac12y^{1/2}dy$:
$$\begin{aligned}\int_0^\infty p^2dp\,e^{-\beta p^2/2m}&=(2mk_BT)^{3/2}\,\frac12\int_0^\infty y^{1/2}e^{-y}dy\\&=(2mk_BT)^{3/2}\,\frac12\,\Gamma\big(\tfrac32\big)=(2mk_BT)^{3/2}\,\frac{\sqrt\pi}{4}.\end{aligned}$$
Rimettendo il $4\pi$ al numeratore, $4\pi\cdot\frac{\sqrt\pi}{4}(2mk_BT)^{3/2}=(2\pi mk_BT)^{3/2}$ (Dispense, p. 77).
::::

La forma $p^2e^{-\beta p^2/2m}$ racconta una competizione: il fattore di Boltzmann favorisce gli impulsi piccoli, ma il guscio sferico di raggio $p$ ha area $4\pi p^2$ e favorisce quelli grandi. Il prodotto ha un massimo a $p=\sqrt{2mk_BT}$. È la **distribuzione di Maxwell-Boltzmann**. Nel film e nel laboratorio sotto la si vede nascere dagli urti.

Essendo gaussiana per componente, $\langle p_\alpha^2\rangle=mk_BT$, $\langle v_\alpha^2\rangle=k_BT/m$ e $\langle K_\alpha\rangle=\frac12k_BT$ per ciascuna direzione. Le dispense definiscono una velocità termica $v_{\rm term}=\sqrt{\langle v^2\rangle}$ e citano 1370 m/s per l'elio e 476 m/s per l'ossigeno a temperatura ambiente. Il cammino libero medio in un gas è dell'ordine di $10^{-7}$ m (Dispense, p. 78).

::: attenzione
**Per componente o in modulo.** La formula $\langle p^2\rangle=mk_BT$ vale **per una componente**; per il modulo $\langle|\vec p|^2\rangle=3mk_BT$. Il quaderno lo annota (Appunti MS, p. 22). I numeri delle dispense (p. 78) corrispondono al modulo, $\sqrt{3k_BT/m}$: a 300 K si ottengono 1368 m/s per l'elio e 484 m/s per l'ossigeno (476 m/s a circa 290 K). Con la formula per componente si avrebbero 790 m/s e 279 m/s. Calcolo mio.
:::

## Oscillatori: classico e quantistico {#oscillatori}

**Classico.** $\mathcal H=\frac{p^2}{2m}+\frac12m\omega^2x^2$. Due termini quadratici, quindi per l'equipartizione $U=k_BT$ già prima di fare conti. La funzione di partizione è il prodotto di due gaussiane:
$$Q=\frac1h\int dp\,e^{-\beta p^2/2m}\int dx\,e^{-\beta m\omega^2x^2/2}=\frac1h\sqrt{\frac{2\pi m}{\beta}}\sqrt{\frac{2\pi}{\beta m\omega^2}}=\frac{2\pi}{h\beta\omega}=\frac{1}{\beta\hbar\omega}.$$
Ne seguono
$$A=k_BT\ln(\beta\hbar\omega),\qquad S=-\frac{\partial A}{\partial T}=-k_B\big[\ln(\beta\hbar\omega)-1\big],$$
$$U=A+TS=k_BT,$$
come previsto (Dispense, pp. 78–79). La pressione nascerebbe solo da una dipendenza di $\omega$ dal volume. La probabilità di trovare la particella in $x$, qualunque sia $p$, è una gaussiana:
$$P(x)\,dx=\frac{e^{-\beta m\omega^2x^2/2}}{\sqrt{2\pi k_BT/m\omega^2}}\,dx :$$
la particella sta preferibilmente vicino al minimo del potenziale, con uno sparpagliamento $\langle x^2\rangle=k_BT/m\omega^2$ che cresce con $T$ (Dispense, p. 79).

**Quantistico.** I livelli sono $E_n=\hbar\omega(n+\frac12)$ e la funzione di partizione è la **somma** dei pesi su tutti gli stati, una serie geometrica:
$$Q=\sum_{n=0}^\infty e^{-\beta E_n}=e^{-\beta\hbar\omega/2}\sum_{n=0}^\infty\big(e^{-\beta\hbar\omega}\big)^n=\frac{e^{-\beta\hbar\omega/2}}{1-e^{-\beta\hbar\omega}} .$$
Quindi $A=\frac{\hbar\omega}{2}+k_BT\ln(1-e^{-\beta\hbar\omega})$ e
$$U=-\frac{\partial\ln Q}{\partial\beta}=\frac{\hbar\omega}{2}+\frac{\hbar\omega}{e^{\beta\hbar\omega}-1}$$
(Dispense, pp. 79–80).

::: idea
**Il congelamento quantistico.** Ad alta $T$, $e^{\beta\hbar\omega}-1\simeq\beta\hbar\omega$ e $U\to k_BT$: si ritrova il classico. A bassa $T$ l'energia termica $k_BT$ non basta a pagare nemmeno un quanto $\hbar\omega$: l'oscillatore resta nel fondamentale, $U\to\hbar\omega/2$, e il calore specifico va a zero esponenzialmente. Il grado di libertà si «congela». È la cura del difetto degli oscillatori classici visto nel microcanonico, ed è la base del solido di Einstein e di Planck: [[corpo-nero-e-solidi]].
:::

## Atomi e molecole: gradi di libertà interni {#molecole}

**Atomi di idrogeno a temperatura $T$.** I livelli sono $E_n=E_1/n^2$, con $E_1=-13{,}6$ eV, e il livello $n$ ha degenerazione $n^2$ (senza contare lo spin). Il rapporto tra le probabilità del primo eccitato e del fondamentale è
$$\frac{P(2)}{P(1)}=\frac{4\,e^{-\beta E_1/4}}{e^{-\beta E_1}}=4\,e^{\frac34\beta E_1}=4\,e^{-10{,}2\,{\rm eV}/k_BT}.$$
A 300 K, con $k_BT\approx0{,}03$ eV, viene $4e^{-340}$: nessun atomo di un campione macroscopico è eccitato (Dispense, p. 80). Con il valore più preciso $k_BT=0{,}0259$ eV l'esponente è $-395$, ma la conclusione non cambia (calcolo mio).

::: attenzione
**Una sottigliezza (osservazione mia, non è nelle dispense).** Il rapporto $P(2)/P(1)$ è ben definito, ma la funzione di partizione **completa** dell'idrogeno, $\sum_nn^2e^{-\beta E_n}$, diverge: per $n\to\infty$ i livelli si accumulano verso $E=0$, il peso tende a 1 e la degenerazione $n^2$ cresce. Il paradosso si risolve con il volume finito: un atomo con orbita più grande del contenitore non esiste, e la somma va troncata. Per i rapporti tra livelli bassi la questione non conta.
:::

**Molecola biatomica flessibile.** Due atomi legati da una molla, $\mathcal H_1=\frac{p_1^2}{2m_1}+\frac{p_2^2}{2m_2}+\frac12K|\vec r_1-\vec r_2|^2$. Gli impulsi danno una lunghezza termica al cubo per atomo:
$$Q_1=\frac{1}{\lambda_1^3\lambda_2^3}\int d^3r_1\,d^3r_2\;e^{-\beta K|\vec r_1-\vec r_2|^2/2}.$$

:::: {.passaggi titolo="Centro di massa e distanza relativa"}
Con $\vec r_{12}=\vec r_1-\vec r_2$ e $\vec r_{\rm CM}=(\vec r_1+\vec r_2)/2$ lo jacobiano vale 1. L'integrale su $\vec r_{\rm CM}$ dà $V$; quello su $\vec r_{12}$, in coordinate sferiche, è una gaussiana:
$$Q_1=\frac{V}{\lambda_1^3\lambda_2^3}\int_0^\infty4\pi r^2dr\;e^{-\beta Kr^2/2}.$$
Con $y=\beta Kr^2/2$, $r^2dr=\big(\frac{2k_BT}{K}\big)^{3/2}\frac12y^{1/2}dy$, e l'integrale vale $4\pi\cdot\frac12\Gamma(\frac32)\big(\frac{2k_BT}{K}\big)^{3/2}=\big(\frac{2\pi k_BT}{K}\big)^{3/2}$:
$$Q_1=\frac{V}{\lambda_1^3\lambda_2^3}\Big(\frac{2\pi k_BT}{K}\Big)^{3/2}.$$
**Energia.** $\lambda^6\propto\beta^3$ e la parte della molla va come $\beta^{-3/2}$:
$$U_1=-\frac{\partial\ln Q_1}{\partial\beta}=\frac62k_BT+\frac32k_BT=\frac92k_BT,$$
cioè $\frac12k_BT$ per ciascuno dei nove termini quadratici: sei impulsi e tre componenti della molla (Dispense, pp. 80–81).
::::

**Molecola biatomica rigida.** Ora la distanza è fissa e restano gli angoli. Con il centro di massa fermo e $I$ il momento d'inerzia, la lagrangiana è $\mathcal L_{\rm rot}=\frac I2(\dot\theta^2+\sin^2\theta\,\dot\phi^2)$. Gli impulsi coniugati sono $p_\theta=I\dot\theta$ e $p_\phi=I\sin^2\theta\,\dot\phi$, e la trasformata di Legendre dà
$$\mathcal H_{\rm rot}=\frac{p_\theta^2}{2I}+\frac{p_\phi^2}{2I\sin^2\theta}$$
(Dispense, pp. 81–82).

:::: {.passaggi titolo="La funzione di partizione rotazionale"}
$$Q_{\rm rot}=\frac{1}{h^2}\int d\theta\,d\phi\,dp_\theta\,dp_\phi\;e^{-\beta\mathcal H_{\rm rot}}.$$
L'integrale su $\phi$ dà $2\pi$, quello su $p_\theta$ dà $\sqrt{2\pi Ik_BT}$, quello su $p_\phi$ è una gaussiana di varianza $Ik_BT\sin^2\theta$ e dà $\sqrt{2\pi Ik_BT}\,\sin\theta$. Resta $\int_0^\pi\sin\theta\,d\theta=2$:
$$Q_{\rm rot}=\frac{2\pi}{h^2}\,(2\pi Ik_BT)\int_0^\pi\sin\theta\,d\theta=\frac{8\pi^2Ik_BT}{h^2}.$$
Il $\sin\theta$ nato dall'integrale sugli impulsi è esattamente l'elemento d'angolo solido: gli orientamenti sono equiprobabili sulla sfera.
::::

Allora $U_{\rm rot}=-\partial\ln Q_{\rm rot}/\partial\beta=k_BT$: due termini quadratici. Con i $\frac32k_BT$ del centro di massa, il calore specifico per molecola è $C_V=\frac52k_B$ (Dispense, p. 82).

**La molecola d'acqua.** Le dispense (pp. 84–88, in inglese) trattano anche l'H₂O, un triangolo isoscele con $r_{\rm OH}=0{,}9578$ Å e angolo di $104{,}5^\circ$. Ne riporto i passaggi in forma compressa.

:::: {.passaggi titolo="Acqua: coordinate, masse ridotte e funzione di partizione (compressione mia)"}
**Coordinate nuove.** Con $m$ la massa dell'idrogeno, $M$ quella dell'ossigeno e $M_T=M+2m$:
$$\vec R=\frac{\vec r_{H1}+\vec r_{H2}}{2}-\vec r_O,\qquad\vec r=\vec r_{H1}-\vec r_{H2},\qquad\vec r_{\rm CM}=\frac{M\vec r_O+m\vec r_{H1}+m\vec r_{H2}}{M_T}.$$
$\vec R$ va dall'ossigeno al punto medio dei due idrogeni, $\vec r$ unisce i due idrogeni.

**Energia cinetica.** Invertendo le relazioni, i termini misti si cancellano e
$$E_K=\frac12M_T\dot{\vec r}_{\rm CM}^{\,2}+\frac12\mu_R\dot{\vec R}^2+\frac12\mu_r\dot{\vec r}^{\,2},\qquad\mu_R=\frac{2mM}{M_T},\quad\mu_r=\frac m2 .$$

**Jacobiano.** Il determinante della trasformazione $(\vec r_O,\vec r_{H1},\vec r_{H2})\to(\vec R,\vec r,\vec r_{\rm CM})$ vale 1, e lo stesso per gli impulsi.

**Funzione di partizione.** Il potenziale intramolecolare dipende solo da $R$, $r$ e dall'angolo $\gamma$ tra $\vec R$ e $\vec r$. Gli impulsi danno tre gaussiane, $(2\pi M_Tk_BT)^{3/2}(2\pi\mu_rk_BT)^{3/2}(2\pi\mu_Rk_BT)^{3/2}$. Tolto il centro di massa, la parte interna è
$$Z_{\rm mol}=\frac{8\pi^2}{2(2\pi\hbar)^6}\Big(\frac{4\pi^2\mu_R\mu_r}{\beta^2}\Big)^{3/2}\int_0^\infty R^2dR\int_0^\infty r^2dr\int_0^\pi\sin\gamma\,d\gamma\;e^{-\beta V_{\rm intra}(R,r,\gamma)},$$
dove il 2 al denominatore conta lo scambio dei due idrogeni identici. L'ultimo integrale si fa numericamente (Dispense, pp. 84–88).
::::

## Un dipolo in un campo esterno {#dipolo}

Un gas di dipoli elettrici non interagenti, fissi nello spazio ma liberi di ruotare, in un campo $\vec E$ diretto lungo $z$:
$$\mathcal H=\mathcal H_{\rm rot}-\vec\mu\cdot\vec E=\mathcal H_{\rm rot}-\mu E\cos\theta .$$
Il conto è quello del rotatore rigido con un fattore in più nell'integrale angolare (Dispense, p. 83):
$$Q=\frac{4\pi^2Ik_BT}{h^2}\int_0^\pi d\theta\,\sin\theta\,e^{\beta\mu E\cos\theta}=\frac{4\pi^2Ik_BT}{h^2}\,\frac{e^{\beta\mu E}-e^{-\beta\mu E}}{\beta\mu E},$$
perché con $x=\cos\theta$ l'integrale è $\int_{-1}^1e^{\beta\mu Ex}dx$.

**L'orientazione media.** Il campo favorisce i dipoli allineati, la temperatura li disordina. La probabilità di un angolo è $P(\theta)\,d\theta\propto e^{\beta\mu E\cos\theta}\sin\theta\,d\theta$, e la media di $\mu_z=\mu\cos\theta$ si calcola con il solito trucco della derivata del logaritmo. Con $\alpha=\beta\mu E$:
$$\frac{\langle\mu_z\rangle}{\mu}=\frac{\int_{-1}^1x\,e^{\alpha x}dx}{\int_{-1}^1e^{\alpha x}dx}=\frac{d}{d\alpha}\ln\frac{2\sinh\alpha}{\alpha}=\coth\alpha-\frac1\alpha\equiv\mathcal L(\alpha),$$
la **funzione di Langevin** (Dispense, pp. 83–84).

**I due limiti.**

- **Campo debole o alta temperatura**, $\alpha\ll1$. Da $\coth x\simeq\frac1x+\frac x3-\frac{x^3}{45}$ segue $\mathcal L(\alpha)\simeq\alpha/3$. La polarizzazione per unità di volume è
$$M=\frac NV\,\mu\,\frac{\beta\mu E}{3}=\frac{N\mu^2}{3Vk_BT}\,E :$$
proporzionale al campo e inversamente proporzionale a $T$. È la **legge di Curie**; il coefficiente è la **suscettività**, che misura quanto il sistema risponde al campo.
- **Campo forte**, $\alpha\gg1$. $\coth\alpha\to1$ e $\mathcal L\to1$: tutti i dipoli sono allineati e la polarizzazione **satura** a $M=N\mu/V$ (Dispense, p. 84).

::: {.lab-segnaposto tipo="langevin"}
:::

## Un polimero: una catena di molle {#polimero}

Un modello semplice di catena polimerica: $N+2$ siti, numerati da 0 a $N+1$, legati in fila da molle. Le estremità sono fissate in $\vec r$ e $\vec r^{\,\prime}$, con impulso nullo; il volume è molto più grande della catena (Dispense, p. 88):
$$\mathcal H=\sum_{i=0}^{N+1}\frac{p_i^2}{2m}+\sum_{i=0}^{N}\frac{m\omega^2}{2}(\vec r_i-\vec r_{i+1})^2 .$$
L'integrale sugli impulsi dei siti interni dà $(2\pi m/\beta)^{3N/2}$. Il problema è l'integrale sulle coordinate, perché ogni sito è accoppiato ai due vicini.

:::: {.passaggi titolo="Disaccoppiare la catena con un cambio di variabili"}
**Il cambio.** Si definisce, un po' anomalo,
$$\vec u_k=\vec r_k-\frac{k\,\vec r_{k+1}+\vec r}{k+1},$$
con inversa ricorsiva
$$\vec r_k=\vec u_k+\frac{k}{k+1}\vec r_{k+1}+\frac{1}{k+1}\vec r .$$
Si parte da $k=N$, dove $\vec r_{N+1}=\vec r^{\,\prime}$, e si scende fino a $k=1$.

**La forma quadratica diventa diagonale.** Si verifica, per esempio per induzione a partire da $N=3$, che
$$\sum_{i=0}^{N}(\vec r_i-\vec r_{i+1})^2=\sum_{i=1}^{N}\frac{i+1}{i}\,\vec u_i^{\,2}+\frac{1}{N+1}(\vec r^{\,\prime}-\vec r)^2 .$$

**Lo jacobiano** è una matrice triangolare con 1 sulla diagonale: determinante 1.

**Gli integrali gaussiani.** Ogni $\vec u_i$ dà $\big(\frac{2\pi}{\beta m\omega^2}\frac{i}{i+1}\big)^{3/2}$, e $\prod_{i=1}^N\frac{i}{i+1}=\frac{1}{N+1}$ (il prodotto telescopico). Usando $\frac1h\sqrt{2\pi m/\beta}\sqrt{2\pi/\beta m\omega^2}=1/\beta\hbar\omega$:
$$Q(N,V,T,\vec r,\vec r^{\,\prime})=\Big(\frac{1}{\beta\hbar\omega}\Big)^{3N}\Big(\frac{1}{N+1}\Big)^{3/2}\exp\Big[-\frac{\beta m\omega^2}{2}\,\frac{(\vec r-\vec r^{\,\prime})^2}{N+1}\Big]$$
(Dispense, pp. 88–90).
::::

Il risultato è una gaussiana nella **distanza tra le estremità** (end-to-end). Liberando anche le estremità e integrando su posizioni e impulsi del primo e dell'ultimo sito si trova
$$Q(N,V,T)=\frac{V}{\lambda^3}\Big(\frac{1}{\beta\hbar\omega}\Big)^{3(N+1)} :$$
un centro di massa libero e $3(N+1)$ modi oscillanti (Dispense, p. 90).

**La distanza end-to-end.** La probabilità delle due estremità è gaussiana in $\vec s=\vec r_0-\vec r_{N+1}$, con $\exp[-\beta m\omega^2s^2/2(N+1)]$. Con $\int_0^\infty x^4e^{-ax^2}dx=\frac{3\sqrt\pi}{8a^{5/2}}$:
$$\langle|\vec r_0-\vec r_{N+1}|^2\rangle=\frac{3(N+1)\,k_BT}{m\omega^2}\;\propto\;N+1 .$$
Le dispense scrivono il risultato come $\sim(N+1)$; la costante esatta l'ho ricavata dalla gaussiana (calcolo mio). Il quadrato della distanza tra le estremità cresce **linearmente** con il numero di monomeri: la distanza cresce come $\sqrt N$ (Dispense, pp. 90–91).

::: idea
**Perché $\sqrt N$: è una passeggiata a caso.** Chiamiamo $\vec b_i=\vec r_{i+1}-\vec r_i$ i vettori dei legami. Con le estremità libere l'hamiltoniana è $\sum_i\frac{m\omega^2}{2}\vec b_i^{\,2}$: i legami sono **indipendenti**, ciascuno una gaussiana con $\langle\vec b_i^{\,2}\rangle=3k_BT/m\omega^2$. La distanza end-to-end è la somma di $N+1$ passi indipendenti, $\vec s=\sum_i\vec b_i$, e le varianze si sommano: $\langle s^2\rangle=(N+1)\cdot3k_BT/m\omega^2$. È lo stesso $\sqrt N$ di un ubriaco che fa $N$ passi a caso. Il cambio di variabili delle dispense serve a ottenere lo stesso risultato quando le estremità sono fissate. Questa lettura è mia.
:::

## Quale energia ha il sistema? {#distribuzione-energia}

Ad alta $T$ il sistema esplora tutto, a bassa $T$ scende nel fondamentale. A una temperatura fissata, quali energie campiona davvero? La grandezza giusta è la probabilità $P(\varepsilon)$ che l'energia valga $\varepsilon$. Si marginalizza la densità canonica inserendo $\delta(\mathcal H-\varepsilon)$ (Dispense, pp. 91–92; Appunti MS, pp. 23–24):
$$\begin{aligned}P(\varepsilon)&=\frac{1}{Q_N}\frac{1}{N!h^{3N}}\int d^{3N}q\,d^{3N}p\;\delta(\mathcal H-\varepsilon)\,e^{-\beta\mathcal H}\\&=\frac{e^{-\beta\varepsilon}}{Q_N}\,\Gamma(\varepsilon)=\frac{1}{Q_N\,\Delta\varepsilon}\,e^{-\beta[\varepsilon-TS(\varepsilon)]} .\end{aligned}$$
$\Gamma(\varepsilon)$ è la densità microcanonica degli stati, e $\Gamma(\varepsilon)\Delta\varepsilon=e^{S(\varepsilon)/k_B}$.

::: idea
**La competizione.** Il fattore di Boltzmann $e^{-\beta\varepsilon}$ crolla con l'energia; il numero di stati $e^{S(\varepsilon)/k_B}$ esplode. Il prodotto ha un picco. Le configurazioni più probabili **non** sono quelle di energia minima, ma quelle che minimizzano $\varepsilon-TS(\varepsilon)$: l'energia libera. A bassa $T$ conta di più l'energia, ad alta $T$ l'entropia (Dispense, p. 92).
:::

**$Q_N$ come integrale sulle energie.** Normalizzando $P(\varepsilon)$, oppure inserendo $1=\int d\varepsilon\,\delta(\mathcal H-\varepsilon)$ nella definizione di $Q_N$:
$$Q_N=\int d\varepsilon\;\Gamma(\varepsilon)\,e^{-\beta\varepsilon}=\frac{1}{\Delta\varepsilon}\int d\varepsilon\;e^{-\beta[\varepsilon-TS(\varepsilon)]} .$$
La funzione di partizione canonica è la **trasformata di Laplace** della densità degli stati microcanonica. Da qui in poi si trascura $\Delta\varepsilon$, irrilevante nel limite termodinamico.

:::: {.passaggi titolo="Il punto di sella: dove sta il picco e quanto è largo"}
**Il massimo.** Sia $f(\varepsilon)=\varepsilon-TS(\varepsilon)$. Sia $\varepsilon$ sia $S$ sono estensivi, quindi l'esponente è enorme e l'integrale è dominato dal minimo di $f$:
$$f'(\bar\varepsilon)=1-T\frac{dS}{d\varepsilon}\Big|_{\bar\varepsilon}=0\quad\Longleftrightarrow\quad T(\bar\varepsilon)=T,$$
dove $T(\varepsilon)\equiv(dS/d\varepsilon)^{-1}$ è la temperatura microcanonica. Il picco sta all'energia alla quale il sistema isolato avrebbe proprio la temperatura del serbatoio.

**È un minimo.**
$$f''(\varepsilon)=-T\frac{d}{d\varepsilon}\frac{1}{T(\varepsilon)}=\frac{T}{T(\varepsilon)^2}\frac{dT}{d\varepsilon}=\frac{T}{T(\varepsilon)^2C_V(\varepsilon)},\qquad f''(\bar\varepsilon)=\frac{1}{TC_V}>0,$$
perché $C_V\geq0$.

**La gaussiana.** Sviluppando al second'ordine, $e^{-\beta f(\varepsilon)}\simeq e^{-\beta f(\bar\varepsilon)}\,e^{-\beta(\varepsilon-\bar\varepsilon)^2/2TC_V}$, quindi
$$Q_N\simeq e^{-\beta f(\bar\varepsilon)}\sqrt{2\pi k_BT^2C_V},\qquad P(\varepsilon)=\frac{1}{\sqrt{2\pi k_BT^2C_V}}\,\exp\Big[-\frac{(\varepsilon-\bar\varepsilon)^2}{2k_BT^2C_V}\Big]$$
(Dispense, pp. 92–93).
::::

::: attenzione
**Un fattore 2 perso.** A p. 93 le dispense scrivono l'esponente finale di $P(\varepsilon)$ come $-\beta(\varepsilon-\bar\varepsilon)^2/TC_V$, senza il 2 che compare nella riga precedente. La forma corretta è $-\beta(\varepsilon-\bar\varepsilon)^2/(2TC_V)$: solo così la gaussiana è normalizzata con il prefattore $1/\sqrt{2\pi k_BT^2C_V}$ e ha varianza $k_BT^2C_V$, come le dispense stesse concludono. Calcolo mio.
:::

**Le fluttuazioni.** La varianza dell'energia è
$$\langle(\varepsilon-\bar\varepsilon)^2\rangle=k_BT^2C_V .$$
Poiché $\bar\varepsilon\sim N$ e $C_V\sim N$, l'ampiezza relativa è
$$\frac{\sigma_\varepsilon}{\bar\varepsilon}=\frac{\sqrt{k_BT^2C_V}}{\bar\varepsilon}\sim\frac{1}{\sqrt N}\to0 .$$
Nel limite termodinamico **tutti** gli stati campionati dall'insieme canonico hanno di fatto la stessa energia $\bar\varepsilon$ (Dispense, p. 93).

## Le fluttuazioni per un'altra strada {#fluttuazioni}

Lo stesso risultato si ottiene senza punto di sella, con un trucco di derivazione (Dispense, p. 94; Appunti MS, pp. 24–25).

:::: {.passaggi titolo="Derivare un'identità rispetto a β"}
**L'identità.** Sostituendo $Q_N=e^{-\beta A}$ al denominatore, $U=\frac{1}{N!h^{3N}}\int\mathcal H\,e^{\beta(A-\mathcal H)}$. Poiché $\frac{1}{N!h^{3N}}\int e^{\beta(A-\mathcal H)}=1$, si può scrivere
$$\frac{1}{N!h^{3N}}\int d^{3N}q\,d^{3N}p\;\big[U-\mathcal H\big]\,e^{\beta[A(V,T)-\mathcal H]}=0 .$$
**La derivata.** Deriviamo rispetto a $\beta$: dal fattore $U$ e dall'esponente,
$$\frac{\partial U}{\partial\beta}+\Big\langle\big[U-\mathcal H\big]\Big[A-\mathcal H+\beta\frac{\partial A}{\partial\beta}\Big]\Big\rangle=0 .$$
**Semplificare.** $A=U+T(\partial A/\partial T)_V=U-\beta(\partial A/\partial\beta)_V$, quindi $A+\beta\,\partial A/\partial\beta=U$ e la seconda parentesi è $U-\mathcal H$:
$$\frac{\partial U}{\partial\beta}+\big\langle(U-\mathcal H)^2\big\rangle=0 .$$
::::

La media $\langle(U-\mathcal H)^2\rangle=\langle\mathcal H^2\rangle-\langle\mathcal H\rangle^2$ è la varianza dell'energia, e $\partial/\partial\beta=-k_BT^2\,\partial/\partial T$:
$$\langle\Delta\mathcal H^2\rangle=-\frac{\partial U}{\partial\beta}=k_BT^2\frac{\partial U}{\partial T}=k_BT^2C_V .$$

::: idea
**Una relazione tra fluttuazione e risposta.** Il membro di sinistra misura quanto l'energia **fluttua spontaneamente** all'equilibrio; quello di destra quanto il sistema **risponde** se si cambia la temperatura. Sono la stessa cosa. Una conseguenza: $C_V\geq0$ sempre, perché una varianza non può essere negativa. Lo stesso schema torna nel [[insieme-gran-canonico-e-npt|gran canonico]], dove le fluttuazioni di $N$ sono legate alla compressibilità.
:::

## Equivalenza con il microcanonico {#equivalenza}

Il valore medio canonico di un'osservabile $O$ si può scrivere come media pesata dei valori microcanonici $\langle O\rangle_\varepsilon$:
$$\langle O\rangle=\frac{1}{Q_N}\int d\varepsilon\;e^{-\beta\varepsilon}\,e^{S(\varepsilon)/k_B}\,\langle O\rangle_\varepsilon .$$
Anche se $\langle O\rangle_\varepsilon$ è estensivo, portato nell'esponente contribuisce solo un $\ln N$, che non sposta il picco $\bar\varepsilon$. Quindi
$$\langle O\rangle_{\rm canonico}=\langle O\rangle_{\bar\varepsilon} :$$
il valore canonico è quello microcanonico calcolato all'energia tipica. È l'**equivalenza degli insiemi** per i valori medi delle osservabili macroscopiche (Dispense, p. 94; Appunti MS, p. 26). Il canonico è più comodo perché non ha vincoli: gli integrali si fattorizzano.

::: attenzione
**Un segno.** Nella formula di $\langle O\rangle$ le dispense (p. 94) scrivono $e^{-S(\varepsilon)/k_B}$. Il segno corretto è $e^{+S(\varepsilon)/k_B}$: è il numero di stati $\Gamma(\varepsilon)=e^{S/k_B}$, come nella $P(\varepsilon)$ della sezione precedente. Calcolo mio.
:::

## Particelle indipendenti: densità, potenziale chimico, Maxwell-Boltzmann {#particelle-indipendenti}

Quando le particelle non interagiscono, tutto si riduce a una particella sola. Quattro risultati che servono negli esercizi (Dispense, pp. 95–97).

**1. La densità media in un punto.** L'osservabile densità in $\vec q$ è $\rho(\vec q)=\sum_{i=1}^N\delta(\vec q_i-\vec q)$. Per il gas ideale l'integrale si fattorizza: il numeratore di ciascun termine ha $V^{N-1}$, il denominatore $V^N$, e
$$\langle\rho(\vec q)\rangle=N\langle\delta(\vec q_1-\vec q)\rangle=\frac NV .$$
Con un potenziale esterno di singola particella $V(\vec q)$ la densità non è più uniforme:
$$\langle\rho(\vec q)\rangle=N\,\frac{e^{-\beta V(\vec q)}}{\int d^3q\,e^{-\beta V(\vec q)}} .$$

**2. $Q_1$ si fattorizza** in coordinate e impulsi, $Q_1=\frac{1}{h^3}\int d^3q\,e^{-\beta V(\vec q)}\int d^3p\,e^{-\beta p^2/2m}$. Le due densità di probabilità sono separate:
$$P_q(\vec q)=\frac{e^{-\beta V(\vec q)}}{\int d^3q\,e^{-\beta V(\vec q)}},\qquad P_p(\vec p)=\frac{e^{-\beta p^2/2m}}{\int d^3p\,e^{-\beta p^2/2m}} .$$
Il potenziale esterno cambia dove stanno le particelle, non come si muovono: la distribuzione degli impulsi è Maxwell ovunque.

**3. Il potenziale chimico.** Il potenziale chimico $\mu$ è l'energia libera di Gibbs per particella. Da $A=-k_BT\ln(Q_1^N/N!)=-k_BT(N\ln Q_1-N\ln N+N)$ e $PV=Nk_BT$:
$$G=A+PV=Nk_BT\ln\frac{N}{Q_1},\qquad\beta\mu=-\ln\frac{Q_1}{N} .$$
Per il gas ideale $Q_1=V/\Lambda^3$ e
$$\beta\mu=\ln(\rho\Lambda^3),\qquad\rho=N/V$$
(Dispense, p. 96; Appunti MS, p. 26).

**4. La statistica di Maxwell-Boltzmann.** La densità di probabilità che la particella 1 sia in $(\vec q,\vec p)$ è $P(\vec q,\vec p)=e^{-\beta\mathcal H_1(\vec q,\vec p)}/(h^3Q_1)$. Moltiplicando per $N$ e per $h^3$ si ottiene il numero medio di particelle in una cella di volume $h^3$ attorno a $(\vec q,\vec p)$. Usando $N/Q_1=e^{\beta\mu}$:
$$N_{\rm MB}(\vec q,\vec p)=Nh^3P(\vec q,\vec p)=e^{-\beta[\mathcal H_1(\vec q,\vec p)-\mu]} .$$
È la **statistica di Maxwell-Boltzmann** per particelle non interagenti (Dispense, pp. 96–97).

::: idea
**Il ponte verso i gas quantistici.** $N_{\rm MB}$ è il numero medio di particelle per **cella** dello spazio delle fasi. La statistica classica regge se è molto minore di 1, cioè se $e^{\beta\mu}=\rho\Lambda^3\ll1$: le particelle sono così rade che due di loro non si contendono mai la stessa cella. Quando questo non è vero bisogna sapere se due particelle possono stare nella stessa cella. Le risposte di Fermi e di Bose sostituiscono $e^{-\beta(\varepsilon-\mu)}$ con $1/(e^{\beta(\varepsilon-\mu)}\pm1)$: vedi [[gas-quantistici-ideali]]. Questa lettura è mia.
:::

## L'atmosfera: la relazione barometrica {#barometrica}

Gas ideale in un cilindro di raggio $R$ e altezza $H$, in un campo gravitazionale: $\mathcal H=\sum_i\big(\frac{p_i^2}{2m}+mgz_i\big)$. L'integrale sugli impulsi è gaussiano, quello su $z$ un esponenziale (Dispense, p. 97):
$$Q_1=\frac{1}{h^3}\Big(\sqrt{2\pi m/\beta}\Big)^3\pi R^2\int_0^Hdz\,e^{-\beta mgz}=\frac{1}{h^3}\Big(\sqrt{2\pi m/\beta}\Big)^3\pi R^2\,\frac{1-e^{-\beta mgH}}{\beta mg} .$$

**L'energia media per particella.** Tenendo solo i termini con $\beta$, $\ln Q_1=-\frac32\ln\beta-\ln\beta+\ln(1-e^{-\beta mgH})+\text{cost}$, e
$$\langle E_1\rangle=-\frac{\partial\ln Q_1}{\partial\beta}=\frac52k_BT-mgH\,\frac{e^{-\beta mgH}}{1-e^{-\beta mgH}} .$$

::: attenzione
**Un segno.** Le dispense (p. 97) scrivono l'ultimo termine con il segno $+$. Derivando, $-\frac{\partial}{\partial\beta}\ln(1-e^{-\beta mgH})=-\frac{mgH\,e^{-\beta mgH}}{1-e^{-\beta mgH}}$: il segno è $-$. Controllo con i limiti. Per $H\to\infty$ si deve avere $\frac32k_BT$ cinetico più $k_BT$ potenziale (l'energia media di una distribuzione esponenziale), cioè $\frac52k_BT$, e il termine sparisce in entrambi i casi. Per $H\to0$ il termine vale $k_BT$: con il segno $-$ resta $\frac32k_BT$, solo cinetica, come deve essere in un cilindro piatto; con il $+$ si avrebbero $\frac72k_BT$. Calcolo mio.
:::

**Dove sta la particella.** Marginalizzando su tutto tranne $z$:
$$\mathcal P(z)=\frac{\beta mg\,e^{-\beta mgz}}{1-e^{-\beta mgH}} .$$
La concentrazione cala esponenzialmente con la lunghezza caratteristica $\xi=k_BT/mg$. Per l'ossigeno ($m=32$ g/mol) a temperatura ambiente $\xi\approx8000$ m. Sull'Everest la concentrazione di ossigeno è quindi circa $e$ volte, cioè 2,7 volte, minore che al livello del mare (Dispense, p. 98). Con 8849 m e $\xi\approx7900$ m a 300 K il rapporto viene circa 3: l'ordine di grandezza è quello, in un modello di atmosfera isoterma (calcolo mio).

**La pressione in cima.** Si varia $H$ di $\delta H$, cioè $\delta V=\pi R^2\delta H$. Con $\beta A=N\ln(N/eQ_1)$:
$$\beta P(H)=-\frac{1}{\pi R^2}\frac{\partial\beta A}{\partial H}=\frac{N}{\pi R^2}\frac{\partial\ln Q_1}{\partial H}=\frac{N}{\pi R^2}\,\frac{\beta mg\,e^{-\beta mgH}}{1-e^{-\beta mgH}} .$$
La densità numerica in $z$ è $\rho(z)=N\mathcal P(z)/\pi R^2$; calcolata in $z=H$ è esattamente la stessa espressione. Quindi $\beta P(H)=\rho(H)$: in cima vale la legge del gas ideale (Dispense, p. 98).

**La pressione a una quota qualunque.** Il sistema non è omogeneo, e serve un trucco. Se, all'equilibrio, si inserisce una parete orizzontale a quota $z$, nessuna delle due parti si accorge di niente: la densità resta la stessa. Allora la formula trovata per la cima vale per la parete a quota $z$:
$$\beta P(z)=\rho(z).$$
Con particelle indipendenti **il potenziale esterno cambia la densità, ma localmente la pressione segue sempre la legge del gas ideale** (Dispense, p. 99).

:::: {.passaggi titolo="Verifica: il gradiente di pressione regge il peso"}
La forza sulla sezione a quota $z$ è $F(z)=P(z)\pi R^2$. Tra $z$ e $z+dz$:
$$\begin{aligned}F(z+dz)-F(z)&=\pi R^2\frac{dP}{dz}dz=\pi R^2\frac{1}{\beta}\frac{d\rho}{dz}dz\\&=-\pi R^2\,mg\,\rho(z)\,dz=-mg\,N(z)\,dz,\end{aligned}$$
usando $d\rho/dz=-\beta mg\rho$. È il peso delle $N(z)dz$ particelle nello strato: la pressione dal basso regge il gas sopra.

**Verifica della parete.** Prima della parete $\rho(z)=\frac{N}{\pi R^2}\frac{\beta mg\,e^{-\beta mgz}}{1-e^{-\beta mgH}}$. Sotto una parete a quota $L$ ci sono $N_L=N\frac{1-e^{-\beta mgL}}{1-e^{-\beta mgH}}$ particelle. Rifacendo il conto per il solo sistema di altezza $L$:
$$\rho_L(z)=\frac{N_L}{\pi R^2}\frac{\beta mg\,e^{-\beta mgz}}{1-e^{-\beta mgL}}=\frac{N}{\pi R^2}\frac{\beta mg\,e^{-\beta mgz}}{1-e^{-\beta mgH}}=\rho(z),$$
e lo stesso per la pressione: $\beta P_L(z)=\beta P(z)=\rho(z)$ (Dispense, pp. 99–100).
::::

## La densità degli stati di singola particella {#densita-stati}

Per una particella la probabilità di avere energia $\varepsilon$ è
$$P(\varepsilon)=\frac{1}{h^3Q_1}\int d^3q\,d^3p\;e^{-\beta\mathcal H_1}\,\delta(\mathcal H_1-\varepsilon)=\frac{1}{Q_1}\,g(\varepsilon)\,e^{-\beta\varepsilon},$$
$$g(\varepsilon)=\frac{1}{h^3}\int d^3q\,d^3p\;\delta(\mathcal H_1-\varepsilon).$$
$g(\varepsilon)$ è la **densità degli stati di singola particella**: quante celle $h^3$ ci sono per unità di energia attorno a $\varepsilon$. Sapendola, $Q_1=\int d\varepsilon\,g(\varepsilon)e^{-\beta\varepsilon}$ (Dispense, p. 100). Alcuni testi d'esame la chiamano $G(\varepsilon)$.

**Il gas ideale in 1, 2 e 3 dimensioni.** $\mathcal H_1=p^2/2m$ in ogni dimensione. Con la sostituzione $t=p^2/2m$:
$$\begin{aligned}g_{1D}(\varepsilon)&=\frac Lh\sqrt{\frac{2m}{\varepsilon}}\;\theta(\varepsilon),\\ g_{2D}(\varepsilon)&=\frac{L^2}{h^2}\,2\pi m\;\theta(\varepsilon),\\ g_{3D}(\varepsilon)&=\frac{L^3}{h^3}\,2\pi(2m)^{3/2}\sqrt\varepsilon\;\theta(\varepsilon)\end{aligned}$$
(Dispense, pp. 100–101).

:::: {.passaggi titolo="Il conto in 3D"}
In coordinate sferiche negli impulsi, $d^3p=4\pi p^2dp$:
$$g(\varepsilon)=\frac{L^3}{h^3}\int_0^\infty4\pi p^2dp\;\delta\Big(\frac{p^2}{2m}-\varepsilon\Big).$$
Con $t=p^2/2m$, $p\,dp=m\,dt$ e $p=\sqrt{2mt}$, quindi $4\pi p^2dp=4\pi m\sqrt{2m}\sqrt t\,dt=2\pi(2m)^{3/2}\sqrt t\,dt$. La delta fissa $t=\varepsilon$, se $\varepsilon>0$:
$$g(\varepsilon)=\frac{L^3}{h^3}\,2\pi(2m)^{3/2}\sqrt\varepsilon\;\theta(\varepsilon).$$
In 1D gli impulsi sono due ($\pm p$) e $dp=\sqrt{m/2t}\,dt$; in 2D $2\pi p\,dp=2\pi m\,dt$, che non dipende da $t$: la densità è costante.
::::

La dipendenza da $\varepsilon$ cambia con la dimensione: $\varepsilon^{-1/2}$, costante, $\varepsilon^{1/2}$. In tutti i casi c'è $\theta(\varepsilon)$, che segnala un'**energia minima** fissata dall'hamiltoniana: per $p^2/2m$ la particella ferma ha $\varepsilon=0$ e non può scendere sotto (Dispense, p. 101).

::: idea
**Il metodo per gli esercizi.** Tutti i conti di $g(\varepsilon)$ seguono la stessa ricetta.
1. Si separano le coordinate e gli impulsi e si passa a variabili «energia», per esempio $y=p^2/2m$ e $t=V(q)$.
2. La delta $\delta(y+t-\varepsilon)$ integrata su $y\geq0$ diventa una $\theta(\varepsilon-t)$: c'è uno stato solo se l'energia potenziale non supera quella totale.
3. Si integra la $\theta$ sulla regione permessa delle coordinate, **un intervallo alla volta**. Conviene disegnare l'asse delle energie con i punti in cui cambiano le $\theta$.
4. Si semplificano i prodotti di $\theta$, come $\theta(\varepsilon)\theta(\varepsilon+V_0)=\theta(\varepsilon)$ per $V_0>0$.
:::

:::: esercizio
**Prova in itinere del 23/11/2019.** $N$ particelle identiche in 2D, non interagenti, con $\mathcal H_1=\frac{p^2}{2m}+V(r)$ e
$$V(r)=\begin{cases}V_0\big[(r/R)^2-1\big] & 0\leq r<R\\ 0 & R\leq r<2R\\ \infty & r\geq2R\end{cases}$$
Calcolare $g(\varepsilon)$ classica (Dispense, pp. 102–103).

::: soluzione
**1. Impulsi.** Con $y=p^2/2m$, $d^2p=2\pi p\,dp=2\pi m\,dy$. In coordinate polari per $\vec q$:
$$\begin{aligned}g(\varepsilon)&=\frac{(2\pi)^2m}{h^2}\int_0^{2R}r\,dr\int_0^\infty dy\;\delta\big(y+V(r)-\varepsilon\big)\\&=\frac{(2\pi)^2m}{h^2}\int_0^{2R}r\,dr\;\theta\big(\varepsilon-V(r)\big).\end{aligned}$$

**2. Il disco esterno**, $R<r<2R$, dove $V=0$: $\int_R^{2R}r\,dr\,\theta(\varepsilon)=\frac{3R^2}{2}\theta(\varepsilon)$.

**3. Il disco interno.** Con $t=V_0(r/R)^2$, $r\,dr=\frac{R^2}{2V_0}dt$ e $t\in[0,V_0]$:
$$\int_0^Rr\,dr\;\theta\big(\varepsilon+V_0-t\big)=\frac{R^2}{2V_0}\int_0^{V_0}dt\;\theta(\varepsilon+V_0-t).$$
Tre casi: se $\varepsilon+V_0<0$ l'integrale è 0; se $0<\varepsilon+V_0<V_0$ vale $\varepsilon+V_0$; se $\varepsilon+V_0>V_0$, cioè $\varepsilon>0$, vale $V_0$. In una riga: $\frac{R^2}{2V_0}\big[(\varepsilon+V_0)\theta(\varepsilon+V_0)-\varepsilon\,\theta(\varepsilon)\big]$.

**4. Somma.**
$$g(\varepsilon)=\frac{(2\pi)^2m}{h^2}\,\frac{R^2}{2V_0}\Big[(\varepsilon+V_0)\,\theta(\varepsilon+V_0)+(3V_0-\varepsilon)\,\theta(\varepsilon)\Big].$$
**Lettura.** L'energia minima è $-V_0$, la particella ferma al centro. Tra $-V_0$ e 0, $g$ cresce linearmente: si apre una porzione sempre più grande del pozzo. Sopra 0 è costante, $\frac{(2\pi)^2m}{h^2}\frac{(2R)^2}{2}=\frac{2\pi m}{h^2}\pi(2R)^2$: la densità del gas ideale 2D nell'area $\pi(2R)^2$.
:::
::::

:::: esercizio
**Compito del 30/01/2019.** In 1D, $\mathcal H_1=A|p|+B(a-q)$ con $0<q<a$, $A$ e $B$ positivi. Calcolare $g(\varepsilon)$ (Dispense, pp. 103–104).

::: soluzione
Con $y=A|p|$ (i due segni di $p$ danno un fattore 2) e $t=B(a-q)\in[0,Ba]$:
$$g(\varepsilon)=\frac{2}{ABh}\int_0^\infty dy\int_0^{Ba}dt\;\delta(y+t-\varepsilon)=\frac{2}{ABh}\int_0^{Ba}dt\;\theta(\varepsilon-t).$$
Tre regioni: per $\varepsilon<0$ niente; per $0<\varepsilon<Ba$ si integra da 0 a $\varepsilon$; per $\varepsilon>Ba$ su tutto l'intervallo. Quindi
$$g(\varepsilon)=\frac{2}{ABh}\Big[\varepsilon\,\theta(\varepsilon)+(aB-\varepsilon)\,\theta(\varepsilon-aB)\Big]:$$
cresce linearmente fino a $\varepsilon=aB$, poi resta costante a $2a/Ah$. Sopra $aB$, per ogni $q$ esiste un $p$ con $\mathcal H=\varepsilon$. Nelle dispense la seconda $\theta$ compare a volte come $\theta(\varepsilon-bA)$, un refuso per $\theta(\varepsilon-aB)$.
:::
::::

:::: {.passaggi titolo="Altri sei casi d'esame: impostazione e risultato (compressione mia: i conti sono nelle dispense)"}
- **13/02/2019** (pp. 104–105). Biatomica 2D con molla, $\mathcal H=\frac{p_1^2+p_2^2}{2m}+\frac k2|\vec q_1-\vec q_2|^2$, in un quadrato di lato $L$. Con $t=\frac k2|\vec q_1-\vec q_2|^2$ e due variabili $y_i=p_i^2/2m$, restano tre variabili d'energia: $g(\varepsilon)=\frac{L^2}{h^4}\frac{4\pi^3m^2}{k}\,\varepsilon^2\,\theta(\varepsilon)$.
- **15/07/2019** (pp. 105–106). Particella relativistica in un'area $A$, $\mathcal H=c\sqrt{p^2+m^2c^2}$. Con $y=c\sqrt{p^2+m^2c^2}$, $y\,dy=c^2p\,dp$: $g(\varepsilon)=\frac{2\pi A}{c^2h^2}\,\varepsilon\,\theta(\varepsilon-mc^2)$. L'energia minima è quella di riposo.
- **22/06/2018** (p. 106). Cilindro di raggio $R$ e altezza $L$, $\mathcal H=\frac{p^2}{2m}-U_0\frac zL$. Con $t=U_0z/L$: $g(\varepsilon)=\frac{2\pi(2m)^{3/2}\pi R^2L}{h^3U_0}\,\frac23\Big[(\varepsilon+U_0)^{3/2}\theta(\varepsilon+U_0)-\varepsilon^{3/2}\theta(\varepsilon)\Big]$. A p. 106 manca il fattore $2\pi$ che viene da $4\pi p^2dp=2\pi(2m)^{3/2}y^{1/2}dy$; c'è nella versione dello stesso compito a p. 224 (calcolo mio). Il compito intero è svolto nei [[gas-quantistici-ideali]].
- **08/05/2018** (p. 107). Sfera di raggio $4R$, $\mathcal H=c|p|^3+V(r)$, con $V=-V_0,\,+V_0,\,-V_0$ sui gusci $[0,R)$, $[R,33^{1/3}R)$, $[33^{1/3}R,4R]$. Con $y=c|p|^3$: $g(\varepsilon)=\frac{(4\pi)^2}{9ch^3}\,32R^3\big[\theta(\varepsilon+V_0)+\theta(\varepsilon-V_0)\big]$. I raggi sono scelti perché i due volumi coincidano.
- **18/02/2014** (p. 109). 1D tra $-2L$ e $2L$, $\mathcal H=c|p|+V(x)$, con $V=0,\,V_0,\,-V_0$ sui tratti $(-2L,-L)$, $(-L,L)$, $(L,2L)$: $g(\varepsilon)=\frac{2L}{hc}\big[\theta(\varepsilon)+2\theta(\varepsilon-V_0)+\theta(\varepsilon+V_0)\big]$.
- **11/11/2020** (pp. 109–110). Ultrarelativistica nel piano con potenziale armonico, $\mathcal H=c|\vec p|+\omega(|\vec q|^2/a^2-m)$ con $m=\pm1$. Per ciascun $m$ viene $\frac{\pi^2a^2}{c^2h^2\omega}(\varepsilon+m\omega)^2\theta(\varepsilon+m\omega)$; sommando, $g(\varepsilon)=\frac{\pi^2a^2}{c^2h^2\omega}\big[(\varepsilon+\omega)^2\theta(\varepsilon+\omega)+(\varepsilon-\omega)^2\theta(\varepsilon-\omega)\big]$.

Il caso del disco con $\mathcal H=\frac{p^2}{2m}-Aq^2$ (31/01/2018, pp. 107–108) è svolto per intero nella sezione successiva.
::::

## Esercizi d'esame svolti {#esercizi}

:::: esercizio
**Esercizio dell'8/11/2019, prima parte.** Gas perfetto di $N$ particelle identiche in un piano, $\mathcal H_1=\frac{p^2}{2m}+V(q)$ con $q=|\vec q|$ e
$$V(q)=\begin{cases}-V_0 & 0\leq q<R\\ 0 & R\leq q<2R\\ \infty & q\geq2R\end{cases}\qquad V_0>0 .$$
Il sistema è a temperatura $T$, statistica classica.
(a) Calcolare $S(T)$ e discuterne i limiti $T\ll1$ e $T\gg1$.
(b) Determinare la pressione $P(R)$ a distanza $R$ dall'origine.
(c) Determinare la probabilità $P(n;N)$ che $n$ particelle abbiano energia $\varepsilon\leq0$, con media e varianza di $n$ (Dispense, pp. 111–114).

::: soluzione
**Prima di calcolare: che cosa aspettarsi.** A bassa $T$ le particelle cadono nel pozzo: la parte configurazionale dell'entropia per particella è $k_B\ln(\pi R^2/\lambda^2)$. Ad alta $T$ il gradino $V_0$ è irrilevante e la particella esplora tutto il disco: $k_B\ln(\pi(2R)^2/\lambda^2)$. La parte cinetica va invece come $\ln T$ e diverge in entrambi i limiti: domina su quella configurazionale (Dispense, pp. 111–112).

**La funzione di partizione.** Impulsi e coordinate si separano:
$$Q_1=\frac{1}{h^2}\frac{2\pi m}{\beta}\int d^2q\;e^{-\beta V(q)},$$
$$\int d^2q\;e^{-\beta V}=e^{\beta V_0}\pi R^2+\big(\pi(2R)^2-\pi R^2\big)=\pi R^2\big(e^{\beta V_0}+3\big).$$
Con $\lambda^2=h^2/2\pi mk_BT$:
$$Q_1=\pi\Big(\frac R\lambda\Big)^2\big(e^{\beta V_0}+3\big).$$

**(a) Energia ed entropia.** $\lambda^2\propto\beta$ dà $Nk_BT$; la parte configurazionale dà il resto:
$$\langle E\rangle=-N\frac{\partial\ln Q_1}{\partial\beta}=Nk_BT-NV_0\,\frac{e^{\beta V_0}}{e^{\beta V_0}+3}.$$
L'energia potenziale va da $-NV_0$ a bassa $T$ (tutti nel pozzo) a $-NV_0/4$ ad alta $T$ (un quarto dell'area è nel pozzo). Con $A=-Nk_BT\ln(eQ_1/N)$ e $TS=\langle E\rangle-A$:
$$\frac{S}{Nk_B}=1-\beta V_0\,\frac{e^{\beta V_0}}{e^{\beta V_0}+3}+\ln\Big[\frac eN\,\pi\Big(\frac R\lambda\Big)^2\big(e^{\beta V_0}+3\big)\Big].$$
Per $\beta\to\infty$ i due termini in $\beta V_0$ si cancellano e resta $-2\ln\lambda\sim\ln T\to-\infty$. Per $\beta\to0$ domina ancora $-\ln\lambda^2\sim\ln T$. È il comportamento cinetico previsto. L'entropia classica che diverge a $T\to0$ è il solito limite della statistica classica (Dispense, pp. 112–113).

**(c) Particelle con energia negativa.** Una particella ha $\varepsilon<0$ se sta nel pozzo e ha energia cinetica minore di $V_0$:
$$\begin{aligned}P(\varepsilon<0)&=\frac{1}{Q_1h^2}\int_0^R2\pi q\,dq\;e^{\beta V_0}\int_{p^2/2m<V_0}2\pi p\,dp\;e^{-\beta p^2/2m}\\&=\frac{e^{\beta V_0}-1}{e^{\beta V_0}+3}\equiv p .\end{aligned}$$
Le particelle sono indipendenti, quindi il numero $n$ con energia negativa è **binomiale**:
$$P(n;N)=\binom Nn\,p^n(1-p)^{N-n},\qquad\langle n\rangle=Np,\qquad\sigma_n^2=Np(1-p).$$
Lo stesso $p$ si ottiene da $g(\varepsilon)=\frac{4\pi^2m}{h^2}\frac{R^2}{2}\big[\theta(\varepsilon+V_0)+3\theta(\varepsilon)\big]$, integrando $g(\varepsilon)e^{-\beta\varepsilon}/Q_1$ tra $-V_0$ e 0 (Dispense, pp. 113–114).

**(b) Pressione in $R$.** Gas ideale in un potenziale esterno: $P=\rho k_BT$ localmente. Appena dentro il pozzo la densità è uniforme e vale $\rho=N\,e^{\beta V_0}/\big[\pi R^2(e^{\beta V_0}+3)\big]$, quindi
$$P(R^-)=\frac{Nk_BT}{\pi R^2}\,\frac{e^{\beta V_0}}{e^{\beta V_0}+3}$$
(Dispense, p. 114). Appena fuori, in $R^+$, manca il fattore $e^{\beta V_0}$: la pressione salta. La differenza è la forza per unità di lunghezza con cui il bordo del pozzo trattiene il gas (osservazione mia).
:::
::::

:::: esercizio
**Esercizio del 31/01/2018, prima parte.** $N$ particelle identiche non interagenti in un disco di raggio $R$, con $\mathcal H_1=\frac{p^2}{2m}-Aq^2$, $A>0$, statistica classica a temperatura $T$.
(a) Calcolare $E(T)$.
(b) Calcolare la pressione $P(r)$ in $r=R$ e in $r=0$.
(c) Calcolare la densità di probabilità $P(\varepsilon)$ dell'energia di singola particella.
(d) Trovare la temperatura $T^*$ alla quale la probabilità di avere energia negativa è doppia di quella di avere energia positiva (Dispense, pp. 115–117). Il testo coincide con il compito del 31/01/2018 di p. 107; a p. 115 la data è scritta 31/12/2018.

::: soluzione
**Funzione di partizione.** Con $t=q^2$, $2\pi q\,dq=\pi\,dt$:
$$Q_1=\frac{1}{h^2}\frac{2\pi m}{\beta}\int_0^R2\pi q\,dq\;e^{\beta Aq^2}=\frac{2\pi m}{h^2\beta}\,\frac{\pi}{\beta A}\Big[e^{\beta AR^2}-1\Big].$$

**(a)** $\ln Q_1=-2\ln\beta+\ln\big(e^{\beta AR^2}-1\big)+\text{cost}$, quindi
$$E=-N\frac{\partial\ln Q_1}{\partial\beta}=N\Big[2k_BT-AR^2\,\frac{e^{\beta AR^2}}{e^{\beta AR^2}-1}\Big].$$
Le dispense omettono il fattore $N$ nell'ultimo passaggio. **Controllo dei limiti** (mio): a bassa $T$ le particelle stanno sul bordo, dove l'energia potenziale è minima, e $E/N\to2k_BT-AR^2$; ad alta $T$, con $\frac{e^x}{e^x-1}\simeq\frac1x+\frac12$, si ottiene $E/N\to k_BT-AR^2/2$, cioè la media di $-Aq^2$ sul disco uniforme più l'energia cinetica.

**(b)** La probabilità che una particella stia a distanza $r$ è $\mathcal P(r)=2\beta Ar\,e^{\beta Ar^2}/(e^{\beta AR^2}-1)$, e la densità si ottiene da $\rho(r)\,2\pi r=N\mathcal P(r)$:
$$\rho(r)=\frac{N\beta A}{\pi}\,\frac{e^{\beta Ar^2}}{e^{\beta AR^2}-1},\qquad P(r)=\rho(r)k_BT=\frac{NA}{\pi}\,\frac{e^{\beta Ar^2}}{e^{\beta AR^2}-1},$$
$$P(0)=\frac{NA}{\pi\big(e^{\beta AR^2}-1\big)},\qquad P(R)=\frac{NA\,e^{\beta AR^2}}{\pi\big(e^{\beta AR^2}-1\big)}.$$
Il potenziale spinge verso il bordo: lì la pressione è massima (Dispense, pp. 115–116).

**(c)** Con $z=p^2/2m$ e $t=Aq^2$:
$$g(\varepsilon)=\frac{2\pi^2m}{h^2A}\int_0^{AR^2}dt\;\theta(\varepsilon+t)=\frac{2\pi^2m}{h^2A}\times\begin{cases}AR^2 & \varepsilon>0\\ AR^2+\varepsilon & -AR^2<\varepsilon<0\\ 0 & \varepsilon<-AR^2\end{cases}$$
e $P(\varepsilon)=g(\varepsilon)e^{-\beta\varepsilon}/Q_1$. L'energia minima è $-AR^2$ (particella ferma sul bordo). Per $\varepsilon>0$ la densità è costante: ogni posizione del disco è compatibile con qualunque energia positiva (Dispense, pp. 116–117).

**(d)** $P(\varepsilon<0)=2P(\varepsilon>0)$ e la somma è 1, quindi $P(\varepsilon>0)=\frac13$. Per $\varepsilon>0$ $g$ è costante:
$$P(\varepsilon>0)=\frac{1}{Q_1}\frac{2\pi^2mR^2}{h^2}\int_0^\infty e^{-\beta\varepsilon}d\varepsilon=\frac{\beta AR^2}{e^{\beta AR^2}-1}=\frac13 .$$
Le dispense si fermano qui (p. 117). L'equazione $x/(e^x-1)=1/3$ si risolve numericamente: $x=\beta^*AR^2\simeq1{,}904$, cioè
$$k_BT^*\simeq0{,}525\,AR^2 .$$
La soluzione numerica è mia. Sopra $T^*$ le particelle con energia positiva sono più di un terzo, sotto meno.
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Perché nella derivazione del canonico si sviluppa $\ln\Gamma_2$ e non $\Gamma_2$? E perché il serbatoio deve essere grande?

::: risposta
$\Gamma_2\sim e^{S_2/k_B}$ varia in modo esplosivo: il suo sviluppo di Taylor non converge in fretta. Il logaritmo invece è $S_2/k_B\propto N_2$ e varia lentamente: al prim'ordine dà $-E_1/k_BT$, e il termine del second'ordine, $-E_1^2/(2k_BT^2C_2)$, sparisce perché la capacità termica $C_2$ del serbatoio è enorme. Serbatoio grande vuol dire temperatura che non cambia quando cede energia.
:::
::::

:::: domanda
Nel canonico il sistema esplora tutto lo spazio delle fasi. Allora perché le medie coincidono con quelle microcanoniche?

::: risposta
Perché la distribuzione dell'energia è un picco strettissimo. $P(\varepsilon)\propto e^{-\beta\varepsilon}e^{S(\varepsilon)/k_B}$ ha un massimo dove $T(\bar\varepsilon)=T$ e larghezza relativa $\sqrt{k_BT^2C_V}/\bar\varepsilon\sim N^{-1/2}$. Gli stati lontani dal guscio $\bar\varepsilon$ sono permessi ma hanno peso trascurabile.
:::
::::

:::: domanda
La pressione è $P=Nk_BT/V-\langle\partial\mathcal H/\partial V\rangle$. Da dove viene ciascun termine?

::: risposta
Riscalando le coordinate, $q=Lt$, il volume compare in due modi: nel fattore $V^N$ dello jacobiano e dentro l'hamiltoniana. Il primo dà $Nk_BT/V$, un contributo entropico che c'è anche senza interazioni. Il secondo è la variazione media dell'energia potenziale quando il sistema si dilata, e c'è solo se l'energia dipende dalle distanze tra le particelle.
:::
::::

:::: domanda
Perché a bassa temperatura il calore specifico di un oscillatore quantistico va a zero e quello classico no?

::: risposta
Il classico può assorbire energia in quantità arbitrariamente piccole: $U=k_BT$ e $C=k_B$ sempre. Il quantistico assorbe solo quanti $\hbar\omega$. Se $k_BT\ll\hbar\omega$ la probabilità di eccitarlo è $\sim e^{-\beta\hbar\omega}$, l'oscillatore resta nel fondamentale e $C$ va a zero esponenzialmente: il grado di libertà si congela.
:::
::::

:::: domanda
Un gas di dipoli è in un campo debole. Se dimezzi la temperatura, che cosa succede alla polarizzazione? E in un campo fortissimo?

::: risposta
In campo debole vale la legge di Curie, $M=N\mu^2E/3Vk_BT$: dimezzando $T$ la polarizzazione raddoppia, perché l'agitazione termica disordina di meno. In campo fortissimo i dipoli sono già tutti allineati, $\mathcal L(\alpha)\to1$, e la polarizzazione resta al valore di saturazione $N\mu/V$, indipendente da $T$.
:::
::::

:::: domanda
Perché la distanza tra le estremità di un polimero cresce come $\sqrt N$ e non come $N$?

::: risposta
Con le estremità libere ogni legame $\vec b_i$ è una gaussiana indipendente, orientata a caso. La distanza end-to-end è la somma di $N+1$ vettori casuali indipendenti: le medie si annullano e si sommano le varianze, quindi $\langle s^2\rangle=(N+1)\langle b^2\rangle$ e $s\sim\sqrt N$. È una passeggiata a caso.
:::
::::

:::: domanda
In un gas ideale nel campo gravitazionale la densità cambia con la quota. Vale ancora $P=\rho k_BT$?

::: risposta
Sì, localmente: $\beta P(z)=\rho(z)$. Il trucco della parete lo mostra: inserendo un setto a quota $z$ all'equilibrio non cambia nulla, e la pressione sul setto è quella di un gas ideale alla densità locale. Il gradiente $dP/dz=-mg\rho$ è esattamente la forza che regge il peso del gas sopra.
:::
::::

:::: domanda
Quando smette di valere la statistica di Maxwell-Boltzmann, e perché?

::: risposta
$N_{\rm MB}=e^{-\beta(\varepsilon-\mu)}$ è il numero medio di particelle per cella $h^3$ dello spazio delle fasi. Se $\rho\Lambda^3=e^{\beta\mu}$ non è molto minore di 1, due particelle si contendono la stessa cella, e allora conta se sono fermioni o bosoni. Succede a bassa temperatura o ad alta densità: è il regime dei gas quantistici.
:::
::::

## Articoli correlati
- [[insieme-microcanonico]]: il punto di partenza; il fattore $e^{-\beta\varepsilon}$ era già comparso nel sistema a due livelli.
- [[insieme-gran-canonico-e-npt]]: lo stesso procedimento quando il serbatoio scambia anche particelle o volume.
- [[gas-reali-viriale-e-van-der-waals]]: il termine $\langle\partial\mathcal H/\partial V\rangle$ della pressione quando le particelle interagiscono.
- [[gas-quantistici-ideali]]: dove $g(\varepsilon)$ e $e^{\beta\mu}$ diventano gli strumenti centrali.
- [[corpo-nero-e-solidi]]: gli oscillatori quantistici in un solido e nel campo elettromagnetico.
- [[dispense-ed-esami]]: gli esercizi su $g(\varepsilon)$ (pp. 102–110) e quelli svolti in classe (pp. 111–117).
- [[appunti-anno-scorso]]: la mappa del quaderno.

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 72–117: derivazione pp. 72–74; pressione pp. 74–75; gas ideale pp. 75–76; Maxwell-Boltzmann pp. 77–78; oscillatori pp. 78–80; idrogeno e molecole biatomiche pp. 80–82; dipolo pp. 83–84; acqua pp. 84–88; polimero pp. 88–91; distribuzione dell'energia pp. 91–93; fluttuazioni ed equivalenza p. 94; particelle indipendenti pp. 95–97; relazione barometrica pp. 97–100; densità degli stati pp. 100–101; esercizi su $g(\varepsilon)$ pp. 102–110; esercizi svolti in classe pp. 111–117.
- `raw/foto appunti mec stat anno scorso/IMG_6334_COMPILED.HEIC`–`IMG_6337_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 18–27.
