---
tags: [meccanica-statistica, ensemble, gran-canonico, npt, fluttuazioni, lezione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-26
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
  - raw/foto appunti mec stat anno scorso/IMG_6338_COMPILED.HEIC … IMG_6340_COMPILED.HEIC
---

# Insieme gran canonico e insieme NPT

Quando il sistema scambia con il serbatoio anche particelle (gran canonico) o volume (NPT), si ripete la derivazione del canonico con una variabile in più. Nel primo caso compaiono il potenziale chimico e la fugacità, nel secondo la pressione e l'energia libera di Gibbs. Entrambi gli insiemi sono una somma di canonici, pesata su $N$ o su $V$.

## Punti chiave
- **Gran canonico:** $\rho(q,p,N)\propto z^Ne^{-\beta\mathcal H}/(N!h^{3N})$, con la fugacità $z=e^{\beta\mu}$. La funzione di partizione è $\mathcal Q(z,V,T)=\sum_Nz^NQ_N(V,T)=e^{\beta PV}$.
- **Ricette:** $\beta PV=\ln\mathcal Q$, $\langle N\rangle=z\,\partial_z\ln\mathcal Q$, $U=-\partial_\beta\ln\mathcal Q$. Per il gas ideale $\mathcal Q=e^{zV/\lambda^3}$ e $z=\rho\lambda^3$.
- **Fluttuazioni di $N$:** $\langle\Delta N^2\rangle=(z\partial_z)^2\ln\mathcal Q=\langle N\rangle\,\rho k_BTK_T$, con $K_T$ la compressibilità isoterma. Sono relative $\sim N^{-1/2}$ e divergono solo dove diverge $K_T$, al punto critico. Per il gas ideale la distribuzione è poissoniana.
- **Potenziale esterno:** in ogni punto $\beta P(\vec q)=\rho(\vec q)$, e $\mu=k_BT\ln(\rho\lambda^3)+V(\vec q)$ è uniforme: la densità si aggiusta per compensare il potenziale.
- **Coesistenza:** due fasi in equilibrio hanno uguali $T$, $P$ e $\mu$. Graficamente è la tangente comune ad $A(V)$; sull'isoterma è la costruzione di Maxwell, $\int_{V_1}^{V_2}(P-P_{\rm coex})\,dV=0$.
- **NPT:** $e^{-\beta G(N,P,T)}=\frac{1}{V_0}\int dV\,e^{-\beta PV}Q_N(V,T)$: i canonici di tutti i volumi, pesati con $e^{-\beta PV}$. Il punto di sella dà $G=P\bar V+A(\bar V)$, e $\mathcal P(V)\propto e^{-\beta[A(V)+PV]}$.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Guarda una piazza affollata da una finestra. Dentro la cornice entrano ed escono persone di continuo: il numero che vedi fluttua, e il resto della piazza fa da serbatoio di persone, oltre che di energia. Nel canonico ogni unità di energia presa dal serbatoio costava un fattore $e^{-\beta}$. Ora anche ogni **persona** presa ha un prezzo, sempre lo stesso finché il serbatoio è grande: è il fattore $z=e^{\beta\mu}$. Il potenziale chimico $\mu$ misura quanto il serbatoio «spinge» particelle verso il sistema; $z$, la **fugacità**, è letteralmente la tendenza a fuggire dal serbatoio.

Il gran canonico è allora una media pesata dei canonici con $N=0,1,2,\dots$ particelle, con peso $z^N$. Per sistemi grandi il numero di particelle è nettissimo, come lo era l'energia nel canonico, e tutti gli insiemi danno la stessa termodinamica. Allora perché cambiare insieme? Perché a volte un vincolo in meno rende i conti facili. I gas quantistici, intrattabili a $N$ fissato, nel gran canonico si fattorizzano.
:::

La lezione segue questo filo.

1. [Quando servono i sistemi aperti](#sistemi-aperti) e [la derivazione dal canonico](#derivazione).
2. [La funzione di partizione gran canonica](#funzione-di-partizione) e il [gas ideale](#gas-ideale), anche [in un potenziale esterno](#potenziale-esterno).
3. [Le fluttuazioni di N e la compressibilità](#fluttuazioni), [la distribuzione di N](#distribuzione-n), [il potenziale Ω](#legendre).
4. [Coesistenza tra fasi e costruzione di Maxwell](#coesistenza), e un'applicazione: [l'adsorbimento su una superficie](#adsorbimento).
5. [L'insieme NPT](#npt), dove a fluttuare è il volume.
6. [Due esercizi svolti](#esercizi).

## Quando servono i sistemi aperti {#sistemi-aperti}

Il microcanonico fissa $E$, $V$, $N$; il canonico fissa $T$, $V$, $N$. In molti casi però il sistema di interesse è **aperto**: scambia con l'esterno non solo calore ma anche particelle, come atomi, molecole, macromolecole o colloidi (Dispense, p. 118). Alcuni esempi:

- la **coesistenza di fase**, come un liquido in equilibrio con il suo vapore;
- una soluzione separata da una **membrana semipermeabile**, i cui pori lasciano passare il solvente;
- una **superficie con siti attrattivi**, come la membrana di una cellula su cui si attaccano i virus;
- più semplicemente, una **sottoparte** di un sistema dato, per esempio la porzione visibile in un esperimento di microscopia.

Il serbatoio è sempre molto più grande del sistema, e si procede come nel passaggio dal microcanonico al canonico.

## La derivazione dal canonico {#derivazione}

Il sistema complessivo, con $V=V_1+V_2$ e $N=N_1+N_2$, è trattato come **canonico**: la probabilità di un suo microstato è $e^{-\beta\mathcal H}/(N!h^{3N}Q_N)$ (Dispense, p. 118; Appunti MS, pp. 27–28).

**Classificare i microstati per $N_1$.** Trascurando l'interazione $\mathcal H_{12}$ all'interfaccia, si raggruppano i microstati secondo quante particelle stanno nel volume $V_1$. Le particelle, contate come distinguibili, si possono scegliere in $\binom{N}{N_1}$ modi:
$$Q_N(V,T)=\frac{1}{h^{3N}N!}\sum_{N_1=0}^N\frac{N!}{N_1!(N-N_1)!}\int dp^{N_1}dq^{N_1}e^{-\beta\mathcal H_1}\int dp^{N_2}dq^{N_2}e^{-\beta\mathcal H_2}.$$
Il fattore $N!$ si semplifica, e restano due funzioni di partizione separate:
$$Q_N(V,T)=\sum_{N_1=0}^N\frac{1}{N_1!h^{3N_1}}\int dp^{N_1}dq^{N_1}\,e^{-\beta\mathcal H_1}\;Q_{N-N_1}(V-V_1,T).$$

**Il serbatoio diventa due numeri.** Dividendo per $Q_N(V,T)$ compare il rapporto
$$\frac{Q_{N-N_1}(V-V_1,T)}{Q_N(V,T)}=\frac{e^{-\beta A(V-V_1,T,N-N_1)}}{e^{-\beta A(V,T,N)}} .$$
Come nel canonico si sviluppa al prim'ordine l'esponente, che è estensivo e varia lentamente:
$$A(V-V_1,T,N-N_1)\simeq A(V,T,N)-V_1\frac{\partial A}{\partial V}-N_1\frac{\partial A}{\partial N}.$$
Con le definizioni del **potenziale chimico** e della **pressione** del serbatoio,
$$\mu=\Big(\frac{\partial A}{\partial N}\Big)_{V,T},\qquad P=-\Big(\frac{\partial A}{\partial V}\Big)_{N,T},$$
il rapporto diventa $e^{\beta\mu N_1-\beta PV_1}$. Con la **fugacità** $z=e^{\beta\mu}$, la normalizzazione si legge
$$1=e^{-\beta PV_1}\sum_{N_1=0}^{N}z^{N_1}\,Q_{N_1}(V_1,T)$$
(Dispense, p. 119). È la somma delle probabilità di trovare il sistema con $N_1$ particelle, in qualunque posizione e con qualunque impulso.

**La densità gran canonica.** Eliminando il pedice 1, perché le proprietà del serbatoio sono ormai racchiuse in $z$ e $P$:
$$\rho(p^N,q^N,N)=\frac{1}{N!h^{3N}}\,z^N\,e^{-\beta\mathcal H(p,q)}\,e^{-\beta PV} .$$
Lo stato del sistema è dato ora da $N$ **e** dalle coordinate: si somma su tutti i numeri di particelle, e $e^{\beta PV}$ fa da normalizzazione.

## La funzione di partizione gran canonica {#funzione-di-partizione}

Si definisce
$$\mathcal Q(z,V,T)=\sum_{N=0}^\infty z^N\,Q_N(V,T)=e^{\beta PV}.$$
La seconda uguaglianza è la normalizzazione appena trovata: **il logaritmo della funzione di partizione gran canonica è $\beta PV$**. La pressione in funzione di $z$ si legge direttamente (Dispense, pp. 119–120).

**Il numero medio di particelle.** Derivare rispetto a $z$ fa scendere un fattore $N$:
$$z\frac{\partial\ln\mathcal Q}{\partial z}=\frac{z}{\mathcal Q}\sum_NNz^{N-1}Q_N=\frac{1}{\mathcal Q}\sum_NN\,z^NQ_N=\langle N\rangle .$$
Questo dà $\rho(z)=\langle N\rangle/V$. Messo insieme a $P(z)$ ed eliminando $z$, fornisce l'**equazione di stato** $P(\rho,T)$. L'energia, a $z$ fissato, è $U=-\partial\ln\mathcal Q/\partial\beta$ (Dispense, p. 120).

::: idea
**La ricetta in tre righe.** Calcola $\mathcal Q(z,V,T)$. Poi $\beta P=\frac1V\ln\mathcal Q$ e $\rho=\frac1Vz\,\partial_z\ln\mathcal Q$: due equazioni nel parametro $z$. Eliminando $z$ ottieni $P(\rho,T)$. È esattamente la strada che si segue per i [[gas-quantistici-ideali]].
:::

## Il gas ideale {#gas-ideale}

**Dal canonico.** $A=-Nk_BT\big[\ln\frac{V}{N\lambda^3}+1\big]$, e derivando rispetto a $N$:
$$\mu=\Big(\frac{\partial A}{\partial N}\Big)_V=-k_BT\Big[\ln\frac{V}{N\lambda^3}+1\Big]+k_BT=-k_BT\ln\frac{V}{N\lambda^3},$$
$$\beta\mu=\ln(\rho\lambda^3),\qquad z=\rho\lambda^3$$
(Dispense, p. 120; Appunti MS, p. 29).

**Dal gran canonico.** La somma su $N$ è la serie dell'esponenziale:
$$\mathcal Q=\sum_{N=0}^\infty z^N\frac{V^N}{N!\lambda^{3N}}=\sum_{N=0}^\infty\frac{1}{N!}\Big(\frac{zV}{\lambda^3}\Big)^N=e^{zV/\lambda^3},\qquad\langle N\rangle=z\frac{\partial}{\partial z}\frac{zV}{\lambda^3}=\frac{zV}{\lambda^3}.$$
Si ritrova $z=\rho\lambda^3$. In più $\beta PV=\ln\mathcal Q=zV/\lambda^3=\langle N\rangle$: è $PV=Nk_BT$ (Dispense, p. 120).

::: idea
**Che cosa dice $z=\rho\lambda^3$.** La fugacità è il numero medio di particelle in un cubetto di lato $\lambda$. Un gas classico ha $z\ll1$: è rado sulla scala quantistica. Quando $z$ si avvicina a 1 la statistica classica smette di funzionare. Il potenziale chimico del gas classico è quindi **negativo** e grande in modulo: aggiungere una particella a un gas rado fa guadagnare molta entropia.
:::

## Gas ideale in un potenziale esterno {#potenziale-esterno}

Gas ideale con $\mathcal H=\sum_i\big[\frac{p_i^2}{2m}+V(\vec q_i)\big]$ in equilibrio. Guardiamo un volumetto $\Delta V$ attorno a $\vec q_0$, così piccolo che $V(\vec q)\simeq V(\vec q_0)$ al suo interno. Questa parte del sistema scambia energia **e particelle** con il resto: è un sistema gran canonico (Dispense, p. 121).

:::: {.passaggi titolo="Pressione e densità locali"}
Con $Q_1=\frac{\Delta V}{\lambda^3}e^{-\beta V(\vec q_0)}$ e particelle indipendenti:
$$\mathcal Q=\sum_Nz^N\frac{Q_1^N}{N!}=\exp\Big[\frac{z\Delta V}{\lambda^3}e^{-\beta V(\vec q_0)}\Big].$$
Quindi
$$\beta P(\vec q_0)\Delta V=\ln\mathcal Q=\frac{z\Delta V}{\lambda^3}e^{-\beta V(\vec q_0)},\qquad\langle N(\vec q_0)\rangle=z\partial_z\ln\mathcal Q=\frac{z\Delta V}{\lambda^3}e^{-\beta V(\vec q_0)} .$$
Le due espressioni coincidono: $\beta P(\vec q_0)\Delta V=\langle N(\vec q_0)\rangle$, cioè
$$\beta P(\vec q_0)=\rho(\vec q_0).$$
::::

Pressione e densità cambiano da punto a punto, ma la relazione del gas ideale vale **localmente** ovunque. È lo stesso risultato ottenuto con il trucco della parete nell'[[insieme-canonico]], qui ricavato in modo più naturale.

**Il potenziale chimico è uniforme.** $z$ è lo stesso in tutto il sistema, perché tutti i volumetti scambiano particelle con lo stesso serbatoio. Dalla formula di $\langle N\rangle$:
$$z=e^{\beta\mu}=\rho(\vec q_0)\lambda^3e^{\beta V(\vec q_0)}\quad\Longrightarrow\quad\mu=k_BT\ln\big(\rho(\vec q_0)\lambda^3\big)+V(\vec q_0).$$
La densità si aggiusta **esattamente** in modo da compensare il potenziale esterno, e la somma è costante. Dove il potenziale è alto la densità è bassa, e viceversa (Dispense, p. 121).

::: idea
**Equilibrio = potenziale chimico uniforme.** Il potenziale chimico ha due pezzi: uno «entropico», $k_BT\ln(\rho\lambda^3)$, che spinge le particelle dove sono più rade, e uno energetico, $V(\vec q)$, che le spinge verso il basso del potenziale. All'equilibrio le due spinte si bilanciano punto per punto. Nell'atmosfera $V=mgz$ e si ritrova la relazione barometrica: $\rho(z)\propto e^{-mgz/k_BT}$.
:::

## Fluttuazioni di N e compressibilità isoterma {#fluttuazioni}

Nel gran canonico il volume è fissato, ma $N$, e quindi la densità, fluttua. Quanto? (Dispense, pp. 122–123; Appunti MS, pp. 30–31.)

:::: {.passaggi titolo="La varianza di N come derivata seconda"}
Applichiamo due volte $z\partial_z$ a $\ln\mathcal Q$. La prima volta si ottiene $\langle N\rangle=\frac{1}{\mathcal Q}\sum_NNz^NQ_N$. La seconda volta, derivando il quoziente:
$$\begin{aligned}z\frac{\partial}{\partial z}\Big(z\frac{\partial\ln\mathcal Q}{\partial z}\Big)&=\frac{\sum_NN^2z^NQ_N}{\mathcal Q}-\frac{\sum_NNz^NQ_N}{\mathcal Q}\;z\frac{\partial\ln\mathcal Q}{\partial z}\\&=\langle N^2\rangle-\langle N\rangle^2 .\end{aligned}$$
Poiché $z\,\partial_z=\partial/\partial\ln z=\partial/\partial(\beta\mu)$ e $\ln\mathcal Q=\beta PV$:
$$\langle N^2\rangle-\langle N\rangle^2=\frac{1}{\beta^2}\frac{\partial^2(\beta PV)}{\partial\mu^2}=\frac V\beta\,\frac{\partial^2P}{\partial\mu^2}.$$
::::

Per capire che cos'è $\partial^2P/\partial\mu^2$ serve un po' di termodinamica.

:::: {.passaggi titolo="Da ∂²P/∂μ² alla compressibilità"}
**Estensività.** $A$ è estensiva, quindi $A(N,V,T)=N\,a(v)$, con $v=V/N$ il volume per particella (sottintendendo $T$). Dentro $a$ può comparire solo una grandezza intensiva, e l'unica disponibile è $v$. Servono $\partial v/\partial N=-V/N^2=-v/N$ e $\partial v/\partial V=1/N$.

**$\mu$ e $P$ come funzioni di $v$:**
$$\mu=\frac{\partial A}{\partial N}=a+N\frac{\partial a}{\partial v}\frac{\partial v}{\partial N}=a-v\frac{\partial a}{\partial v},\qquad P=-\frac{\partial A}{\partial V}=-N\frac{\partial a}{\partial v}\frac{\partial v}{\partial V}=-\frac{\partial a}{\partial v}.$$

**Derivate rispetto a $v$:**
$$\frac{\partial\mu}{\partial v}=\frac{\partial a}{\partial v}-\frac{\partial a}{\partial v}-v\frac{\partial^2a}{\partial v^2}=-v\frac{\partial^2a}{\partial v^2},\qquad\frac{\partial P}{\partial v}=-\frac{\partial^2a}{\partial v^2}.$$
Quindi
$$\frac{\partial P}{\partial\mu}=\frac{\partial P/\partial v}{\partial\mu/\partial v}=\frac1v,$$
che è la relazione di Gibbs-Duhem a $T$ fissata: $dP=\rho\,d\mu$.

**Derivata seconda:**
$$\frac{\partial^2P}{\partial\mu^2}=\frac{\partial}{\partial\mu}\frac1v=-\frac{1}{v^2}\frac{\partial v}{\partial\mu}=-\frac{1}{v^2}\frac{1}{\partial\mu/\partial v}=\frac{1}{v^2}\,\frac{1}{v\,\partial^2a/\partial v^2}=-\frac{1}{v^3}\frac{\partial v}{\partial P}=\frac{K_T}{v^2},$$
con la **compressibilità isoterma** $K_T=-\frac1V\big(\frac{\partial V}{\partial P}\big)_T=-\frac1v\frac{\partial v}{\partial P}$ (Dispense, pp. 122–123).
::::

Il risultato:
$$\langle N^2\rangle-\langle N\rangle^2=k_BT\,V\,\frac{K_T}{v^2}=\langle N\rangle\,k_BT\,\rho\,K_T,$$
$$\frac{\sqrt{\langle\Delta N^2\rangle}}{\langle N\rangle}=\sqrt{\frac{k_BT\rho K_T}{\langle N\rangle}}\sim\frac{1}{\sqrt N}.$$
Se $K_T$ è finita, le fluttuazioni della densità sono trascurabili e vanno a zero come $N^{-1/2}$. Al contrario, **la compressibilità misura le fluttuazioni del numero di particelle**:
$$K_T\,\rho\,k_BT=\frac{\langle N^2\rangle-\langle N\rangle^2}{\langle N\rangle}$$
(Dispense, p. 123).

**Il gas ideale.** $PV=Nk_BT$ dà $K_T^{-1}=-V\,\partial P/\partial V=\rho k_BT$, quindi
$$\frac{K_T}{K_T^{\rm ig}}=\frac{\langle N^2\rangle-\langle N\rangle^2}{\langle N\rangle},$$
e per il gas ideale questo rapporto vale 1: varianza uguale alla media. È la firma della distribuzione di **Poisson**: in un gas ideale le particelle in un volume fissato seguono la statistica poissoniana (Dispense, p. 123). Lo si dimostra direttamente nel primo [esercizio](#esercizi).

::: idea
**Perché il punto critico è opalescente.** Un fluido normale ha $K_T$ finita. Al punto critico liquido-vapore l'isoterma diventa piatta, $\partial P/\partial V=0$, e $K_T$ diverge: diverge anche la varianza del numero di particelle in ogni volumetto. Il fluido è pieno di regioni dense e rade di tutte le dimensioni, che diffondono la luce: il liquido diventa lattiginoso. È l'opalescenza critica, la versione visibile della formula $\langle\Delta N^2\rangle=\langle N\rangle\rho k_BTK_T$. Vedi [[gas-reali-viriale-e-van-der-waals]]. L'esempio è mio.

Lo stesso schema del canonico, $\langle\Delta\mathcal H^2\rangle=k_BT^2C_V$, si ripete: **una fluttuazione spontanea è legata a una risposta**. Lì la capacità termica, qui la compressibilità.
:::

## La distribuzione di N {#distribuzione-n}

La probabilità di avere $N$ particelle è
$$P(N)=\frac{z^NQ_N}{\mathcal Q}=\frac{e^{N\beta\mu-\beta A(N)}}{\mathcal Q}$$
(Dispense, p. 123). L'esponente è estensivo, quindi la distribuzione è piccata attorno al valore più probabile $\bar N$, dove $\partial A/\partial N=\mu$. Sviluppando al second'ordine attorno a $\bar N$:
$$N\beta\mu-\beta A(N)\simeq\bar N\beta\mu-\beta A(\bar N)-\frac12\frac{\partial^2\beta A}{\partial N^2}\Big|_{\bar N}(N-\bar N)^2 ,$$
che dà per $P(N)$ una gaussiana. Per normalizzarla si calcola $\mathcal Q$ con lo stesso sviluppo, trasformando la somma in un integrale perché $N$ è grande:
$$\mathcal Q=\sum_Ne^{N\beta\mu-\beta A(N)}\simeq e^{\bar N\beta\mu-\beta A(\bar N)}\sqrt{\frac{2\pi}{\partial^2\beta A/\partial N^2|_{\bar N}}},$$
$$P(N)=\sqrt{\frac{\partial^2\beta A/\partial N^2}{2\pi}}\;\exp\Big[-\frac12\frac{\partial^2\beta A}{\partial N^2}(N-\bar N)^2\Big]$$
(Dispense, p. 124; Appunti MS, p. 31).

::: attenzione
**Tre sviste a p. 124 delle dispense.** (1) L'esponente da sviluppare è scritto $N\beta\mu+\beta A$; il segno corretto è $N\beta\mu-\beta A$, come nella riga successiva. (2) Nella somma per $Z_{GC}$ l'esponente della gaussiana compare con il segno $+$; deve essere $-$, altrimenti la somma diverge. (3) Il prefattore è scritto $\sqrt{2\pi\,\partial^2\beta A/\partial N^2}$: la derivata seconda va **al denominatore**, $\sqrt{2\pi/(\partial^2\beta A/\partial N^2)}$, come annota anche il quaderno (Appunti MS, p. 31). Infine la relazione $N\beta\mu=G$ va letta $N\mu=G$; con i $\beta$ al posto giusto, $\bar N\beta\mu-\beta A(\bar N)=\beta PV=\ln\mathcal Q$. Calcolo mio.
:::

**Controllo di coerenza (calcolo mio).** La varianza della gaussiana è $1/(\beta\,\partial^2A/\partial N^2)$. Con $A=Na(v)$, $\partial^2A/\partial N^2=\partial\mu/\partial N=\frac{\partial\mu}{\partial v}\frac{\partial v}{\partial N}=\frac{v^2}{N}\frac{\partial^2a}{\partial v^2}=\frac{v}{NK_T}$. Quindi la varianza è $Nk_BTK_T/v=\langle N\rangle\rho k_BTK_T$: la stessa della sezione precedente, per un'altra strada.

Le dispense notano infine che $N\mu=G=A+PV$, cioè $\bar N\beta\mu-\beta A(\bar N)=\beta PV=\ln\mathcal Q$: i pezzi non gaussiani di $P(N)$ si eliminano esattamente con la normalizzazione (Dispense, p. 124).

## Il potenziale gran canonico come trasformata di Legendre {#legendre}

$\Omega\equiv-PV$ fa da energia libera nel gran canonico: $e^{-\beta\Omega(\mu,V,T)}=\mathcal Q$. Con il punto di sella,
$$\mathcal Q=\sum_Ne^{N\ln z}e^{-\beta A}\simeq e^{\bar N\beta\mu-\beta A(\bar N)}\quad\Longrightarrow$$
$$\Omega(\mu,V,T)=A(\bar N,V,T)-\bar N\mu=A-\bar N\frac{\partial A}{\partial N}\Big|_{\bar N}.$$
Di nuovo si genera una funzione termodinamica sottraendo il prodotto di una variabile per la sua coniugata: è una **trasformata di Legendre**, che sostituisce $N$ con $\mu$ come variabile naturale (Dispense, p. 124). Nel canonico lo stesso schema aveva sostituito $E$ con $T$: $A=E-TS$.

## Coesistenza tra fasi e costruzione di Maxwell {#coesistenza}

**Condizioni di equilibrio.** Il gran canonico dice che due fasi in equilibrio, che possono scambiarsi particelle, hanno la stessa temperatura, la stessa pressione e lo stesso potenziale chimico (Dispense, p. 125).

**$\mu$ è l'energia di Gibbs per particella.** Da $\mu=\partial A/\partial N$ segue $dA=-P\,dV-S\,dT+\mu\,dN$, e per $G=A+PV$:
$$dG=V\,dP-S\,dT+\mu\,dN .$$
$G$ è funzione di $P$, $T$, $N$ ed è estensiva. L'unica variabile estensiva tra le sue è $N$, quindi $G=N\,f(P,T)$, e
$$\mu=\frac{\partial G}{\partial N}=f(P,T)=\frac GN .$$
Stessa $\mu$ vuol dire stessa energia di Gibbs per particella (Dispense, p. 125).

**La tangente comune.** A $T$ fissata si disegna $A(V)/N$ in funzione di $V/N$. La pendenza è $-P$. Una regione con $d^2A/dV^2<0$, cioè $dP/dV>0$, è instabile: lì il sistema si separa in due fasi. Il punto in cui $dP/dV=0$ al limite di questa regione è il punto critico. Due fasi coesistenti hanno la stessa $P$, cioè la stessa pendenza, e la stessa $\mu$. Tra tutte le coppie di punti con la stessa pendenza, quella giusta ha i due punti **sulla stessa retta tangente**. Se l'intercetta a $V=0$ è $A_{\rm coex}(0)$:
$$\frac{A(V_1)}{N}=\frac{A_{\rm coex}(0)}{N}-P\frac{V_1}{N},\qquad\frac{A(V_2)}{N}=\frac{A_{\rm coex}(0)}{N}-P\frac{V_2}{N},$$
quindi $A(V_1)+PV_1=A(V_2)+PV_2=A_{\rm coex}(0)$: i due volumi hanno la stessa $G$ per particella, oltre alla stessa $P$ (Dispense, pp. 125–126).

:::: {.passaggi titolo="Dalla tangente comune alla costruzione di Maxwell"}
Lungo l'isoterma $A(V_2)=A(V_1)-\int_{V_1}^{V_2}P(V)\,dV$. Le due condizioni di coesistenza sono:
$$N\mu_1=A(V_1)+P_{\rm coex}V_1,\qquad N\mu_2=A(V_1)-\int_{V_1}^{V_2}P(V)\,dV+P_{\rm coex}V_2 .$$
Imponendo $\mu_1=\mu_2$, $A(V_1)$ si semplifica:
$$\int_{V_1}^{V_2}P(V)\,dV+P_{\rm coex}V_1-P_{\rm coex}V_2=0\quad\Longrightarrow\quad\int_{V_1}^{V_2}\big(P(V)-P_{\rm coex}\big)\,dV=0 .$$
È la **costruzione di Maxwell**: la retta orizzontale $P=P_{\rm coex}$ taglia il cappio dell'isoterma in due lobi di area uguale (Dispense, p. 126).
::::

La si applica all'isoterma di Van der Waals in [[gas-reali-viriale-e-van-der-waals]], dove c'è anche il film che la costruisce.

## Un'applicazione: adsorbimento su una superficie {#adsorbimento}

Una superficie ha $N_s$ siti accessibili agli atomi di un gas. Ogni sito può legare **un solo** atomo, con energia $-\varepsilon$. I siti sono indipendenti, e ciascuno si tratta come un piccolo sistema aperto con due stati: vuoto o occupato (Dispense, p. 126).

**La funzione di partizione di un sito.** La somma su $N$ ha due termini, $N=0$ e $N=1$:
$$\mathcal Q_{\rm sito}=1+z\,\frac{V_b}{\lambda^3}\,e^{\beta\varepsilon},$$
dove $V_b$ è il volumetto in cui l'atomo legato può muoversi: $Q_1=\frac{V_b}{\lambda^3}e^{\beta\varepsilon}$.

**L'occupazione media**, cioè la frazione $f$ di siti occupati:
$$f=\langle N\rangle=z\frac{\partial\ln\mathcal Q_{\rm sito}}{\partial z}=\frac{z\frac{V_b}{\lambda^3}e^{\beta\varepsilon}}{1+z\frac{V_b}{\lambda^3}e^{\beta\varepsilon}} .$$
Il sito è in equilibrio con un gas ideale, quindi $z=\rho\lambda^3$, e $\lambda$ sparisce:
$$f=\frac{\rho V_be^{\beta\varepsilon}}{1+\rho V_be^{\beta\varepsilon}} .$$
L'energia è $-\varepsilon f$ per sito (Dispense, pp. 126–127).

::: idea
**Leggere la formula.** È l'**isoterma di Langmuir** (il nome è conoscenza generale). A bassa densità $f\simeq\rho V_be^{\beta\varepsilon}$: la copertura cresce linearmente con la pressione del gas. Ad alta densità $f\to1$: i siti sono tutti pieni, saturazione. Metà copertura si ha a $\rho V_b=e^{-\beta\varepsilon}$: più il legame è forte rispetto a $k_BT$, meno gas serve. È la stessa forma di Fermi-Dirac, e non per caso: ogni sito può ospitare al più una particella. Vedi [[gas-quantistici-ideali]].
:::

::: {.lab-segnaposto tipo="langmuir"}
:::

## L'insieme NPT {#npt}

Ora il numero di particelle è fissato, ma il volume fluttua. È la situazione di un gas sotto un pistone con un peso sopra, o di un esperimento in laboratorio a pressione atmosferica. Le dispense lo ricavano in due modi (Dispense, pp. 128–131; Appunti MS, pp. 32–33).

**Primo modo: con la delta.** Si parte da un canonico 1 + 2 in cui $N_1$ e $N_2$ sono fissati, mentre $V_1$ e $V_2$ fluttuano con $V_1+V_2=V$. Non c'è scambio di particelle, quindi la normalizzazione è $1/(N_1!N_2!)$. Si marginalizza sul sistema 2 e si inserisce l'identità $\int dV_1\,\delta\big(V_1-V(p_1,q_1)\big)=1$. Integrando sulle variabili di 2 compare $Q_{N-N_1}(V-V_1,T)$, che si sviluppa come nel gran canonico:
$$\frac{Q_{N-N_1}(V-V_1,T)}{Q_{N_1,N_2}(V,T)}=e^{\beta\mu N_1-\beta PV_1}.$$
Il risultato è
$$\rho_1(q_1,p_1,V_1)=\frac{1}{N_1!h^{3N_1}}\,e^{-\beta(\mathcal H_1+PV_1)}\,e^{\beta\mu N_1}$$
(Dispense, pp. 128–129). Gli stati sono pesati dall'**entalpia** $E+PV$, e $e^{\beta\mu N_1}$ fa da normalizzazione.

**La funzione di partizione NPT.** Integrando $\rho_1$ su tutti i volumi e, per ciascuno, su tutte le $p$ e $q$, si ottiene 1. Con $N\mu=G(N,P,T)$:
$$e^{-\beta G(N,P,T)}=\int dV\;e^{-\beta PV}\,Q_N(V,T).$$
**Tutti gli stati dell'insieme NPT sono quelli dei canonici a tutti i volumi possibili, ciascuno pesato con $e^{-\beta PV}$** (Dispense, p. 129).

**Il punto di sella.** Scrivendo l'integrando come $e^{-\beta[PV+A(N,V,T)]}$, il massimo sta in $\bar V$ con
$$P+\frac{\partial A}{\partial V}\Big|_{\bar V}=0,$$
cioè la pressione del sistema eguaglia quella imposta. Confrontando gli esponenti:
$$G(N,P,T)=P\bar V+A(N,\bar V,T)$$
(Dispense, p. 129). È di nuovo una trasformata di Legendre, che scambia $V$ con $P$.

**Secondo modo: come nel gran canonico.** Si prende una sottoparte di un grande sistema canonico con $N_1$ particelle fissate e volume $V_1$ libero. Le particelle non si scambiano: è come se quelle in $V_1$ fossero rosse e le altre verdi. A volume fissato la funzione di partizione sarebbe il prodotto $Q(N_1,V_1,T)\,Q(N-N_1,V-V_1,T)$. Per lasciar fluttuare il volume si aggiunge $\int dV_1/V_0$, dove $V_0$ è un volume di riferimento che rende adimensionale la misura, come $h$ per $dq\,dp$. Lo stesso sviluppo di $Q_2$ porta a
$$\rho(q,p,V)=\frac{1}{V_0}\frac{1}{N!h^{3N}}\,e^{-\beta\mathcal H}e^{-\beta PV}e^{\beta\mu N},$$
$$e^{-\beta G(P,T)}=\mathcal Q_{NPT}=\frac{1}{V_0}\int dV\,e^{-\beta PV}Q_N(V,T)$$
(Dispense, pp. 129–130). Le dispense scrivono il prefattore con $1/\lambda^{3N}$ e l'integrale anche sugli impulsi; qui è riscritto con $h^{3N}$ per coerenza.

**La distribuzione del volume.** Integrando su coordinate e impulsi:
$$\mathcal P(V)=\frac{1}{V_0}\,\frac{Q_N(V,T)\,e^{-\beta PV}}{\mathcal Q_{NPT}},$$
$$\ln\mathcal P(V)=-\beta A(N,V,T)-\beta PV-\ln\big[V_0\mathcal Q_{NPT}\big].$$
Misurare le fluttuazioni del volume a pressione costante equivale a misurare l'energia libera del sistema in funzione del volume, a meno di una costante e del termine noto $\beta PV$ (Dispense, pp. 130–131). È un metodo usato davvero nelle simulazioni.

::: attenzione
**Un termine mancante.** A p. 131 le dispense scrivono $\ln\mathcal P(V)=-\beta A(N,V,T)-\ln[V_0\mathcal Q_{NPT}]$, senza $-\beta PV$, che invece compare nella riga precedente ($\mathcal P\propto Q\,e^{-\beta PV}$). La conclusione resta valida, perché $\beta PV$ è lineare in $V$ e noto: $A(V)=-k_BT\ln\mathcal P(V)-PV+\text{cost}$. Calcolo mio.
:::

**Le fluttuazioni del volume (calcolo mio).** Le dispense annunciano il calcolo senza farlo. Sviluppando l'esponente attorno a $\bar V$, la derivata seconda è $\partial^2A/\partial V^2=-\partial P/\partial V=1/(VK_T)$, quindi $\mathcal P(V)$ è una gaussiana con
$$\langle\Delta V^2\rangle=k_BT\,\bar V\,K_T,\qquad\frac{\sqrt{\langle\Delta V^2\rangle}}{\bar V}=\sqrt{\frac{k_BTK_T}{\bar V}}\sim\frac{1}{\sqrt N}.$$
Di nuovo la compressibilità regola le fluttuazioni: di $N$ a volume fisso nel gran canonico, di $V$ a $N$ fisso nell'NPT. Le due cose sono la stessa fluttuazione della densità vista in due modi.

## Esercizi svolti {#esercizi}

:::: esercizio
**La statistica di Poisson nel gas ideale.** Un volume $V$ dentro un grande gas ideale a temperatura $T$ e densità $\rho$. Trovare la distribuzione esatta del numero $N$ di particelle nel volume e verificare la relazione tra varianza e compressibilità. Esercizio costruito sull'affermazione di p. 123 delle dispense; lo svolgimento è mio.

::: soluzione
**1. La distribuzione.** Nel gran canonico $P(N)=z^NQ_N/\mathcal Q$. Per il gas ideale $Q_N=\frac{1}{N!}\big(\frac{V}{\lambda^3}\big)^N$ e $\mathcal Q=e^{zV/\lambda^3}$. Con $\langle N\rangle=zV/\lambda^3=\rho V$:
$$P(N)=\frac{1}{N!}\Big(\frac{zV}{\lambda^3}\Big)^Ne^{-zV/\lambda^3}=\frac{\langle N\rangle^N}{N!}\,e^{-\langle N\rangle}:$$
è **esattamente** la distribuzione di Poisson, non solo la sua approssimazione gaussiana.

**2. La varianza.** Per la Poisson $\langle N^2\rangle-\langle N\rangle^2=\langle N\rangle$. Oppure con la ricetta: $\ln\mathcal Q=zV/\lambda^3$ e $(z\partial_z)^2\ln\mathcal Q=zV/\lambda^3=\langle N\rangle$.

**3. Il confronto.** La formula generale dà $\langle\Delta N^2\rangle=\langle N\rangle\rho k_BTK_T$. Per il gas ideale $K_T=1/P=1/(\rho k_BT)$, quindi $\langle\Delta N^2\rangle=\langle N\rangle$. Le due strade coincidono.

**Perché Poisson.** Ogni particella del grande serbatoio sta nel volume $V$ con una piccola probabilità, indipendentemente dalle altre, perché nel gas ideale non interagiscono. Tanti eventi rari e indipendenti danno una Poisson. Con interazioni repulsive, per esempio un liquido, le particelle si «evitano» e la varianza è minore della media, $K_T<K_T^{\rm ig}$.
:::
::::

:::: esercizio
**Adsorbimento: copertura, energia e fluttuazioni.** Riprendere il modello di p. 126. (a) A quale densità del gas metà dei siti è occupata? (b) Come varia questa densità con la temperatura? (c) Qual è la varianza del numero di atomi adsorbiti su $N_s$ siti? Le domande sono mie, costruite sul modello delle dispense.

::: soluzione
**(a)** $f=\frac12$ quando $\rho V_be^{\beta\varepsilon}=1$, cioè
$$\rho_{1/2}=\frac{e^{-\beta\varepsilon}}{V_b}.$$
In termini di pressione del gas ideale, $P_{1/2}=\rho_{1/2}k_BT=\frac{k_BT}{V_b}e^{-\varepsilon/k_BT}$.

**(b)** Scaldando, $e^{-\varepsilon/k_BT}$ cresce in fretta: serve molto più gas per tenere coperta metà della superficie. Le molecole adsorbite si staccano scaldando, ed è così che si «degassa» una superficie in vuoto.

**(c)** Un sito è occupato con probabilità $f$ e vuoto con probabilità $1-f$: il suo numero di occupazione è una variabile di Bernoulli, con varianza $f(1-f)$. Si ottiene anche con la ricetta: $(z\partial_z)^2\ln\mathcal Q_{\rm sito}=\frac{y}{(1+y)^2}=f(1-f)$, con $y=z\frac{V_b}{\lambda^3}e^{\beta\varepsilon}$. I siti sono indipendenti, quindi su $N_s$ siti
$$\langle\Delta N_{\rm ads}^2\rangle=N_s\,f(1-f).$$
Le fluttuazioni sono massime a metà copertura e si annullano sia a superficie vuota sia a superficie piena.
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Da dove nasce il fattore $z^N=e^{\beta\mu N}$ nella densità gran canonica?

::: risposta
Dal serbatoio. La probabilità di avere $N_1$ particelle nel sistema è proporzionale a $Q_{N-N_1}(V-V_1)$, la funzione di partizione di ciò che resta al serbatoio. Sviluppando al prim'ordine $A(V-V_1,N-N_1)$, ogni particella tolta al serbatoio cambia l'esponente di $\beta\,\partial A/\partial N=\beta\mu$. Ogni particella ha lo stesso «prezzo», e i prezzi si moltiplicano: $e^{\beta\mu N_1}$.
:::
::::

:::: domanda
Perché $\ln\mathcal Q=\beta PV$?

::: risposta
È la normalizzazione della probabilità. Nella derivazione, la somma su $N_1$ di tutte le probabilità vale 1 e il fattore che resta fuori è $e^{-\beta PV_1}$, quindi $\sum_Nz^NQ_N=e^{\beta PV}$. In termodinamica è $\Omega=-PV$, il potenziale gran canonico: $\Omega=A-\mu N=A-G=-PV$.
:::
::::

:::: domanda
In un gas ideale in un campo esterno la densità non è uniforme. Che cosa resta uniforme, e perché?

::: risposta
Il potenziale chimico $\mu=k_BT\ln(\rho\lambda^3)+V(\vec q)$, insieme alla temperatura. Ogni volumetto scambia particelle con il resto, e all'equilibrio non può esserci un flusso netto: questo richiede lo stesso $\mu$ ovunque. La densità si aggiusta esattamente per compensare il potenziale. La pressione locale invece cambia, ma segue sempre $P=\rho k_BT$.
:::
::::

:::: domanda
Che cosa misurano le fluttuazioni del numero di particelle in un volumetto? E che cosa succede al punto critico?

::: risposta
Misurano la compressibilità: $\langle\Delta N^2\rangle/\langle N\rangle=\rho k_BTK_T$. Un fluido facile da comprimere ha grandi fluttuazioni di densità. Al punto critico $\partial P/\partial V=0$, $K_T$ diverge e con lei le fluttuazioni: è l'opalescenza critica.
:::
::::

:::: domanda
Il gran canonico permette fluttuazioni di $N$. Allora perché dà la stessa termodinamica del canonico?

::: risposta
Perché $P(N)$ è una gaussiana di larghezza relativa $\sim N^{-1/2}$: per un sistema macroscopico $N$ è di fatto fissato al valore $\bar N$ dove $\partial A/\partial N=\mu$. Il potenziale $\Omega=A-\bar N\mu$ è la trasformata di Legendre di $A$, e contiene la stessa informazione. L'unica eccezione sono i punti in cui le fluttuazioni non sono piccole, come il punto critico.
:::
::::

:::: domanda
Spiega la costruzione di Maxwell a partire dall'uguaglianza dei potenziali chimici.

::: risposta
Le due fasi devono avere stessa $P$ e stessa $\mu=G/N=(A+PV)/N$. Lungo l'isoterma $A(V_2)-A(V_1)=-\int_{V_1}^{V_2}P\,dV$. Imponendo $A(V_1)+P_{\rm coex}V_1=A(V_2)+P_{\rm coex}V_2$ si ottiene $\int_{V_1}^{V_2}(P-P_{\rm coex})\,dV=0$: le due aree tra l'isoterma e la retta orizzontale sono uguali. Geometricamente è la tangente comune ad $A(V)$.
:::
::::

:::: domanda
Nell'insieme NPT che cosa pesa gli stati, e come si legge l'energia libera dalle fluttuazioni del volume?

::: risposta
Gli stati sono pesati da $e^{-\beta(\mathcal H+PV)}$, cioè dall'entalpia. La probabilità del volume è $\mathcal P(V)\propto Q_N(V,T)\,e^{-\beta PV}=e^{-\beta[A(V)+PV]}$, quindi $A(V)=-k_BT\ln\mathcal P(V)-PV+\text{cost}$. Registrando l'istogramma dei volumi si ricostruisce l'energia libera, ed è un metodo usato nelle simulazioni.
:::
::::

## Articoli correlati
- [[insieme-canonico]]: la derivazione di base, di cui questa è un'estensione; la relazione barometrica.
- [[gas-quantistici-ideali]]: il gran canonico rende fattorizzabili i gas di bosoni e di fermioni.
- [[modello-di-ising-e-campo-medio]]: il lattice gas si risolve passando al gran canonico.
- [[gas-reali-viriale-e-van-der-waals]]: $K_T$ diverge al punto critico di Van der Waals; la costruzione di Maxwell applicata.
- [[appunti-anno-scorso]]: la mappa del quaderno.

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 118–131: sistemi aperti e derivazione pp. 118–119; funzione di partizione e gas ideale p. 120; potenziale esterno p. 121; fluttuazioni e compressibilità pp. 122–123; distribuzione di $N$ e trasformata di Legendre p. 124; coesistenza e costruzione di Maxwell pp. 125–126; adsorbimento pp. 126–127; NPT pp. 128–131.
- `raw/foto appunti mec stat anno scorso/IMG_6338_COMPILED.HEIC`–`IMG_6340_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 27–33. Nel quaderno la sezione «Funzione di partizione dell'NPT» è solo intitolata.
