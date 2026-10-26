---
tags: [meccanica-statistica, gas-reali, viriale, van-der-waals, transizioni-di-fase, lezione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-26
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
  - raw/foto appunti mec stat anno scorso/IMG_6341_COMPILED.HEIC
  - raw/foto appunti mec stat anno scorso/IMG_6342_COMPILED.HEIC
---

# Gas reali: espansione del viriale e Van der Waals

Le interazioni tra particelle correggono l'equazione di stato del gas ideale. A bassa densità le correzioni sono una serie di potenze in $\rho$, l'espansione del viriale, il cui primo coefficiente si calcola con la funzione di Mayer. Il modello di Van der Waals aggiunge volume escluso e attrazione media, e produce una transizione liquido-gas con un punto critico.

## Punti chiave
- **Espansione del viriale:** $\beta P/\rho=1+\sum_{n\ge2}B_n(T)\rho^{n-1}$. Il coefficiente $B_n$ contiene le interazioni tra $n$ particelle.
- **Funzione di Mayer:** $f_{ij}=e^{-\beta v(r_{ij})}-1$, nulla oltre la portata del potenziale e pari a $-1$ dove il potenziale diverge. A bassa densità basta il termine lineare in $f$: $B_2(T)=-\frac12\int f_{12}\,d^3r_{12}=-2\pi\int_0^\infty r^2f(r)\,dr$.
- **Van der Waals:** volume escluso e attrazione in campo medio danno $Q_N=\frac{(V-Nv_0)^N}{N!\lambda^{3N}}e^{\beta aN^2/V}$, da cui $P=\frac{k_BT}{v-v_0}-\frac{a}{v^2}$, con $v=V/N$. A bassa densità $B_2=v_0-a/k_BT$.
- **Punto critico:** $\partial P/\partial v=\partial^2P/\partial v^2=0$ dà $v_c=3v_0$, $k_BT_c=\frac{8a}{27v_0}$, $P_c=\frac{a}{27v_0^2}$. In variabili ridotte $\pi=\frac{8\theta}{3\phi-1}-\frac{3}{\phi^2}$, la stessa per tutti i gas: è la legge degli stati corrispondenti.
- **Sotto $T_c$** l'isoterma ha un cappio: la zona spinodale ($\partial P/\partial v>0$) è instabile, e la coesistenza si trova con la costruzione di Maxwell, cioè con aree uguali.
- **Vicino al punto critico** $K_T\propto|T-T_c|^{-1}$ diverge, e con essa $\langle\Delta N^2\rangle$: le fluttuazioni non sono più piccole e il campo medio smette di essere affidabile.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Il gas ideale è una folla di persone che si ignorano: ognuno attraversa gli altri come un fantasma. Un gas vero è una festa. Ognuno **occupa spazio**: due persone non possono stare nello stesso posto, e il volume libero per muoversi è meno della stanza. Ma la gente **si attrae**: si forma qualche capannello, e chi sta per andare a sbattere contro la parete viene trattenuto dagli amici alle spalle. Il primo effetto alza la pressione sulle pareti, il secondo la abbassa.

Van der Waals ha messo questi due effetti in una formula di una riga, e ne è uscita una cosa che il gas ideale non può fare: **condensare**. Abbassando la temperatura l'attrazione vince sull'agitazione termica, e la folla si separa in un gruppo compatto, il liquido, e in pochi sparsi, il vapore. Il modello è rozzo, ma prevede il punto critico e il fatto che tutti i gas, misurati nelle unità del loro punto critico, si comportano allo stesso modo.
:::

La lezione segue questo filo.

1. [Correzioni a bassa densità: l'espansione del viriale](#viriale) e [il secondo coefficiente con la funzione di Mayer](#secondo-coefficiente). Poi [il terzo coefficiente](#terzo-coefficiente) e [l'espansione di alta temperatura](#alta-temperatura).
2. [Il modello di Van der Waals](#van-der-waals): volume escluso e attrazione.
3. [L'isoterma non monotona](#isoterme), [il punto critico](#punto-critico) e [gli stati corrispondenti](#stati-corrispondenti).
4. [La curva spinodale](#spinodale) e [la coesistenza con la costruzione di Maxwell](#coesistenza).
5. [Esercizi svolti](#esercizi).

## Quando l'interazione è debole: l'espansione del viriale {#viriale}

Il gas ideale ha $\beta P/\rho=1$. Se le interazioni contano poco, per esempio a densità piccola, ci si aspetta che le correzioni siano una serie di potenze della densità:
$$\frac{\beta P}{\rho}=1+\sum_{n=2}^\infty B_n(T)\,\rho^{n-1}$$
(Dispense, p. 134). È l'**espansione del viriale**. $B_2$, il **secondo coefficiente del viriale**, viene dagli incontri a due; $B_3$ da quelli a tre, e così via. Si calcolano nell'ipotesi di **interazioni a coppie**, $V(\vec r_1,\dots,\vec r_N)=\sum_{i<j}v(r_{ij})$. La parte cinetica dà come sempre $\lambda^{3N}$, e resta l'integrale configurazionale:
$$Q_N=\frac{1}{N!\lambda^{3N}}\int d\vec r_1\cdots d\vec r_N\;e^{-\beta\sum_{i<j}v(r_{ij})}=\frac{1}{N!\lambda^{3N}}\int d\vec r_1\cdots d\vec r_N\prod_{i<j}e^{-\beta v(r_{ij})}$$
(Dispense, pp. 132 e 134; Appunti MS, p. 33).

## Il secondo coefficiente: la funzione di Mayer {#secondo-coefficiente}

**Il trucco.** Il fattore $e^{-\beta v}$ vale 1 quando le particelle sono lontane. Per sviluppare attorno al gas ideale conviene isolare quello che **differisce** da 1. Sommando e sottraendo 1:
$$e^{-\beta v(r_{ij})}=1+f_{ij},\qquad f_{ij}\equiv e^{-\beta v(r_{ij})}-1 .$$
$f_{ij}$ è la **funzione di Mayer**. Si annulla oltre la portata del potenziale e vale $-1$ dove $v$ diverge, come dentro un nocciolo duro. È quindi diversa da zero solo quando due particelle sono vicine (Dispense, pp. 132 e 134).

**Sviluppare il prodotto.**
$$\prod_{i<j}(1+f_{ij})=1+\big(f_{12}+f_{13}+\dots\big)+\big(f_{12}f_{13}+f_{12}f_{34}+\dots\big)+\dots$$
Se la densità è piccola, è improbabile che due funzioni di Mayer distinte siano diverse da zero insieme, perché servirebbero tre o quattro particelle vicine. Si tronca al primo termine (Dispense, p. 135; Appunti MS, pp. 33–34).

:::: {.passaggi titolo="Dal primo ordine in f all'equazione di stato"}
**Gli integrali.** Il termine 1 dà $V^N$. Ciascuno dei $N(N-1)/2$ termini $f_{ij}$ dà lo stesso integrale: le $N-2$ particelle non coinvolte danno $V^{N-2}$; passando da $(\vec r_1,\vec r_2)$ al centro di massa e alla distanza relativa $\vec r_{12}$, il centro di massa dà un altro $V$:
$$\begin{aligned}Q_N&=\frac{1}{N!\lambda^{3N}}\Big[V^N+\frac{N(N-1)}{2}V^{N-1}\int d\vec r_{12}\,f_{12}(r_{12})\Big]\\&=\frac{V^N}{N!\lambda^{3N}}\Big[1+\frac{N(N-1)}{2V}\int d\vec r_{12}\,f_{12}(r_{12})\Big].\end{aligned}$$
**Il logaritmo.** Il primo fattore è il gas ideale. Per la parentesi si usa $\ln(1+x)\simeq x$:
$$\ln Q_N=\ln Q_N^{\rm ig}+\frac{N(N-1)}{2V}\int d\vec r_{12}\,f_{12}(r_{12}).$$
**La pressione.** $\beta P=\partial\ln Q_N/\partial V$:
$$\beta P=\frac NV-\frac{N(N-1)}{2V^2}\int d\vec r_{12}\,f_{12}\simeq\rho-\frac{\rho^2}{2}\int d\vec r_{12}\,f_{12}$$
(Dispense, pp. 132 e 135).
::::

Per $N$ grande si ottiene $\beta P/\rho=1+\rho B_2$, con
$$\begin{aligned}B_2(T)&=-\frac12\int d\vec r_{12}\,f_{12}(r_{12})=-\frac{4\pi}{2}\int_0^\infty r^2dr\,f(r)\\&=-2\pi\int_0^\infty r^2\big(e^{-\beta v(r)}-1\big)\,dr .\end{aligned}$$

::: idea
**Che cosa dice il segno di $B_2$.** Dove il potenziale è **repulsivo** ($v>0$), $f<0$ e il contributo a $B_2$ è positivo: la pressione cresce, perché lo spazio disponibile è meno. Dove è **attrattivo** ($v<0$), $f>0$ e il contributo è negativo: le particelle passano più tempo vicine e urtano meno le pareti. Ad alta $T$ l'attrazione conta poco ($e^{\beta|v|}\simeq1$) e domina la repulsione: $B_2>0$. A bassa $T$ domina l'attrazione: $B_2<0$. La temperatura a cui $B_2=0$, detta di Boyle, è quella in cui il gas reale si comporta da ideale fino al prim'ordine. Vedi il primo [esercizio](#esercizi).
:::

::: attenzione
**Un dettaglio di approssimazione.** $\ln(1+x)\simeq x$ richiede $x$ piccolo, ma qui $x=\frac{N(N-1)}{2V}\int f\sim N\rho\int f$ è estensivo, quindi grande. Il risultato per $B_2$ è comunque corretto: la teoria completa, cioè lo sviluppo in cluster, mostra che $\ln Q_N$ è una somma di termini proporzionali a $N$, e il termine lineare in $\rho$ è proprio quello trovato. Lo stesso problema riemerge, in forma più seria, nel terzo coefficiente. Osservazione mia.
:::

## Il terzo coefficiente {#terzo-coefficiente}

Tenendo il termine successivo, $(f_{12}f_{13}+f_{12}f_{34}+\dots)$, compaiono due tipi di prodotti: $f_{12}f_{13}$, con **tre particelle connesse** a catena, e $f_{12}f_{34}$, con **due coppie separate**. Con tre particelle manca ancora il contributo a triangolo $f_{12}f_{13}f_{23}$ (Dispense, pp. 133 e 135).

Le dispense calcolano i termini a catena. I termini $f_{12}f_{13}$ compaiono $N(N-1)(N-2)/3!$ volte; le altre particelle danno $V^{N-3}$, e il passaggio a posizioni relative rispetto alla particella 1 dà un altro $V$. Quindi a $\ln Q_N$ si aggiunge
$$\frac{N(N-1)(N-2)}{3!\,V^2}\int d\vec r_{12}\,d\vec r_{13}\,f_{12}f_{13},$$
che nella pressione dà $-\rho^3\frac{2}{3!}\int d\vec r_{12}\,d\vec r_{13}\,f_{12}f_{13}$. Le dispense lo chiamano $\rho^2B_3^1(T)$ in $\beta P/\rho$, con $B_3^1=\frac{2}{3!}\int f_{12}f_{13}$, e aggiungono il triangolo: $B_3^2=B_3^1+\frac{2}{3!}\int f_{12}f_{13}f_{23}$ (Dispense, pp. 135–136).

::: attenzione
**I termini a catena si cancellano (calcolo mio).** Il risultato corretto per il terzo coefficiente contiene **solo il triangolo**:
$$B_3(T)=-\frac13\int d\vec r_{12}\,d\vec r_{13}\;f_{12}\,f_{13}\,f_{23}.$$
Il motivo: quando si prende il logaritmo di $Q_N$ al second'ordine, oltre ai termini nuovi compare $-\frac12\big(\frac{N(N-1)}{2V}\int f\big)^2$. Le catene $f_{12}f_{13}$ e le coppie separate $f_{12}f_{34}$ fattorizzano entrambe in $\big(\int f\big)^2$. Contando con precisione i termini di ordine $N^3/V^2$ (le catene sono $N(N-1)(N-2)/2$, perché in una terna si può scegliere in 3 modi la particella centrale; le coppie separate sono $N(N-1)(N-2)(N-3)/8$), i loro coefficienti si sommano a zero con quello del quadrato. Restano solo i diagrammi **irriducibili**, quelli che non si spezzano togliendo una particella. Il triangolo dà a $\ln Q_N$ il termine $\frac{N^3}{3!V^2}\int f_{12}f_{13}f_{23}$, e derivando rispetto a $V$ si ottiene il $B_3$ scritto sopra. Anche il segno di $B_3^1$ nelle dispense non torna con il $-\rho^3$ della riga prima. È il risultato standard dello sviluppo in cluster di Mayer.
:::

## L'espansione di alta temperatura {#alta-temperatura}

Se $k_BT$ è più grande del potenziale per ogni $r$, si può sviluppare direttamente il fattore di Boltzmann (Dispense, p. 136; Appunti MS, p. 35):
$$Q_N\simeq\frac{1}{N!\lambda^{3N}}\int d\vec r_1\cdots d\vec r_N\prod_{i<j}\big(1-\beta v(r_{ij})\big),$$
$$\prod_{i<j}\big(1-\beta v(r_{ij})\big)=1-\beta\sum_{ij}v(r_{ij})+\beta^2\sum_{ij}\sum_{lm}v(r_{ij})v(r_{lm})+\dots$$
Gli integrali si classificano secondo quante particelle sono coinvolte:

- il termine 1 dà $V^N$;
- il termine lineare dà $V^{N-2}\int d\vec r_1d\vec r_2\,v(r_{12})$ per ogni coppia;
- tra i termini quadratici, se le due coppie coincidono ($i=l$, $j=m$) si ha $V^{N-2}\int d\vec r_1d\vec r_2\,v(r_{12})^2$;
- se condividono una particella ($i=l$, $j\neq m$) si ha $V^{N-3}\int d\vec r_1d\vec r_2d\vec r_3\,v(r_{12})v(r_{13})$;
- se i quattro indici sono tutti diversi si ha $V^{N-4}\int d\vec r_1\cdots d\vec r_4\,v(r_{12})v(r_{34})$.

Le dispense rimandano ai modelli di spin, dove questo sviluppo funziona meglio. Un gas ha un nocciolo duro: per $r$ piccolo il potenziale supera sempre $k_BT$, e lo sviluppo di $e^{-\beta v}$ non regge.

## Il modello di Van der Waals {#van-der-waals}

Il modello di Van der Waals mostra come un ragionamento fisico semplice possa catturare l'essenziale di un fenomeno. Fu sviluppato in una tesi di dottorato per spiegare la condensazione dei gas e la formazione del liquido (Dispense, p. 137; Appunti MS, pp. 36–37).

**1. Sfere dure: il volume escluso.** Un gas di sfere dure di diametro $\sigma$. Con $\sigma=0$ l'integrale sulle coordinate darebbe $V^N$. In condizioni diluite, in prima approssimazione, $V^N$ diventa $V_{\rm accessibile}^N$, con $V_{\rm accessibile}=V-Nv_0$ e $v_0$ il volume escluso da una sfera. Due sfere non possono avvicinarsi a meno di $\sigma$, quindi il volume escluso a una coppia è una sfera di raggio $\sigma$, $\frac43\pi\sigma^3$. Attribuendolo metà a ciascuna sfera:
$$v_0=\frac{2\pi\sigma^3}{3},\qquad Q(V,N,T)=\frac{1}{N!}\frac{(V-Nv_0)^N}{\lambda^{3N}} .$$

**2. L'attrazione in campo medio.** Ogni particella interagisce con energia $-\varepsilon$ con tutte le particelle entro un raggio $R_c$. Trascurando le fluttuazioni spaziali, cioè supponendo la densità uniforme, ogni particella ne ha intorno $\frac43\pi R_c^3\frac NV$:
$$E_i=-\varepsilon\,\frac43\pi R_c^3\,\frac NV,\qquad E=\frac12\sum_iE_i=-N\varepsilon\,\frac23\pi R_c^3\,\frac NV\equiv-a\frac{N^2}{V},$$
con $a=\frac23\pi R_c^3\varepsilon>0$. Il fattore $\frac12$ evita di contare due volte ogni coppia. L'energia è un numero, non dipende dalle coordinate, ed esce dall'integrale come un fattore di Boltzmann:
$$Q(V,N,T)=\frac{1}{N!}\frac{(V-Nv_0)^N}{\lambda^{3N}}\;e^{\beta aN^2/V}$$
(Dispense, p. 137).

**3. Energia libera e pressione.** Con Stirling:
$$\beta F=-\ln Q=-N\ln\frac{V-Nv_0}{\lambda^3}-\beta a\frac{N^2}{V}+N\ln N-N,$$
$$\frac{\beta F}{N}=-\ln\frac{(V-Nv_0)\,e}{N\lambda^3}-\beta a\frac NV .$$
$$P=-\frac{\partial F}{\partial V}=\frac{Nk_BT}{V-Nv_0}-a\frac{N^2}{V^2}=\frac{k_BT}{v-v_0}-\frac{a}{v^2}$$
(Dispense, p. 137). È l'**equazione di stato di Van der Waals**.

::: attenzione
**Un segno.** A p. 137 le dispense scrivono $\frac{\beta F}{N}=\ln\frac{(V-Nv_0)e}{N\lambda^3}-\beta a\frac NV$: manca il segno meno davanti al logaritmo, che invece c'è nella riga sopra ($\beta F=-N\ln\dots$). La pressione che segue è corretta. Calcolo mio.
:::

Le due correzioni rispetto al gas ideale fanno quello che diceva l'analogia: il volume escluso alza la pressione ($v\to v-v_0$), l'attrazione la abbassa ($-a/v^2$). Si è assunto implicitamente che accendere l'attrazione non cambi la struttura spaziale del gas di sfere dure di riferimento (Dispense, p. 138).

::: idea
**Il collegamento con il viriale.** Sviluppando a bassa densità, $\frac{\beta P}{\rho}=\frac{1}{1-v_0\rho}-\beta a\rho\simeq1+\Big(v_0-\frac{a}{k_BT}\Big)\rho$, quindi
$$B_2^{\rm vdW}(T)=v_0-\frac{a}{k_BT} .$$
È esattamente la struttura discussa sopra: una parte repulsiva positiva e indipendente da $T$, una attrattiva negativa che pesa di più a bassa $T$. Il conto è mio; nel secondo esercizio si verifica che coincide con il $B_2$ esatto di un potenziale a buca ad alta temperatura.
:::

## L'isoterma non monotona {#isoterme}

A bassa $T$ l'equazione di stato $P(V)$ **non è monotona**. Moltiplicando per $V^2(V-Nv_0)$:
$$PV^2(V-Nv_0)=Nk_BTV^2-aN^2(V-Nv_0),$$
$$PV^3-V^2\big(PNv_0+Nk_BT\big)+aN^2V-aN^3v_0=0$$
(Dispense, p. 138). È una **cubica** in $V$. A $T$ fissata possono quindi esserci una o tre soluzioni: in un intervallo di temperature, allo stesso valore di $P$ corrispondono tre volumi diversi.

- **Ad alta $T$** c'è una sola soluzione, e l'isoterma è monotona.
- **A bassa $T$** ci sono tre regioni. Per $V\to Nv_0$ la pressione diverge qualunque sia $T$: domina la sfera dura. Per $V$ molto grande domina $k_BT/v$, il gas ideale. In mezzo, per volumi in cui $a/v^2>k_BT/v$, cioè $v<a/k_BT$, domina l'attrazione $-a/v^2$ e la pressione scende: si forma un cappio con tre soluzioni.

::: attenzione
**Un refuso.** A p. 138 la prima riga è scritta $PV^2(V-Nv_0)=Nk_BTV^2-aN^2(N-Nv_0)$: nell'ultimo fattore va $V-Nv_0$, come conferma la riga successiva, che è corretta. Calcolo mio.
:::

La figura delle dispense (p. 138) mostra $\beta F$ in funzione di $v/v_c$ per $T/T_c=0{,}9$, 1 e 1,1, con $v_0=1/3$ e $a=9/8$ scelti in modo che $v_c=1$ e $k_BT_c=1$. Sotto $T_c$ la curva ha un tratto con curvatura negativa: è lì che il sistema si separa in due fasi.

## Il punto critico {#punto-critico}

Il punto critico è l'isoterma su cui il cappio si riduce a un flesso a tangente orizzontale: lì derivata prima e seconda di $P$ rispetto a $v$, a $T$ costante, si annullano insieme (Dispense, pp. 139–140).

:::: {.passaggi titolo="Calcolo di vc, Tc e Pc"}
Le derivate:
$$\frac{\partial P}{\partial v}=-\frac{k_BT}{(v-v_0)^2}+\frac{2a}{v^3},\qquad\frac{\partial^2P}{\partial v^2}=\frac{2k_BT}{(v-v_0)^3}-\frac{6a}{v^4}.$$
Imponendo che si annullino in $(T_c,v_c)$:
$$\frac{k_BT_c}{(v_c-v_0)^2}=\frac{2a}{v_c^3},\qquad\frac{2k_BT_c}{(v_c-v_0)^3}=\frac{6a}{v_c^4}.$$
Dividendo la seconda per la prima: $\frac{2}{v_c-v_0}=\frac{3}{v_c}$, quindi
$$v_c=3v_0 .$$
Sostituendo nella prima, $k_BT_c=\frac{2a}{27v_0^3}(2v_0)^2=\frac{8a}{27v_0}$, e nell'equazione di stato
$$k_BT_c=\frac{8}{27}\frac{a}{v_0},\qquad P_c=\frac{k_BT_c}{2v_0}-\frac{a}{9v_0^2}=\frac{4a}{27v_0^2}-\frac{3a}{27v_0^2}=\frac{1}{27}\frac{a}{v_0^2}.$$
::::

Un numero che non dipende da $a$ e $v_0$ (calcolo mio): il **fattore di compressibilità critico** $Z_c=\frac{P_cv_c}{k_BT_c}=\frac38=0{,}375$. Per i gas reali vale tipicamente 0,23–0,31: Van der Waals coglie la forma, non i numeri.

**Il comportamento vicino al punto critico.** In variabili ridotte (vedi sotto), sull'isocora critica $\phi=1$, si ha $\partial\pi/\partial\phi|_{\phi=1}=6(1-\theta)$ (Appunti MS, pp. 37–39). Per $\theta\to1^+$ la pendenza tende a zero, e la compressibilità isoterma $K_T=-\frac1V\frac{\partial V}{\partial P}\propto\frac{1}{\theta-1}$ diverge. Per quanto visto nel [[insieme-gran-canonico-e-npt|gran canonico]], divergono anche le fluttuazioni di densità.

## Gli stati corrispondenti {#stati-corrispondenti}

Misurando pressione, volume e temperatura nelle unità del punto critico, $\pi=P/P_c$, $\phi=V/V_c$ e $\theta=T/T_c$, i parametri $a$ e $v_0$ spariscono:
$$\pi=\frac{8\theta}{3\phi-1}-\frac{3}{\phi^2},\qquad\Big(\pi+\frac{3}{\phi^2}\Big)(3\phi-1)=8\theta$$
(Dispense, p. 140). **Tutti i fluidi di Van der Waals hanno la stessa equazione di stato ridotta**: è la legge degli stati corrispondenti.

Lo stesso vale per il fattore di compressibilità $Z\equiv\beta P/\rho$:
$$Z=\frac{1}{1-v_0\rho}-\frac{a\rho}{k_BT}=\frac{1}{1-\frac{1}{3\phi}}-\frac98\,\frac{1}{\phi\,\theta},$$
usando $v_0=v_c/3$ e $a=\frac{27}{8}k_BT_cv_0$. $Z$ dipende solo da due variabili ridotte: $(\theta,\phi)$, $(\theta,\pi)$ o $(\pi,\phi)$. La figura delle dispense (p. 141) mostra $Z$ in funzione di $\pi$ per vari $\theta$, misurato per azoto, metano, etano, etene, propano, butano, isopentano, eptano, anidride carbonica e acqua: **i punti di gas diversissimi cadono sulle stesse curve**. Il collasso dei dati è previsto da Van der Waals (Dispense, pp. 140–141).

## La curva spinodale {#spinodale}

Dove $\partial\pi/\partial\phi>0$ un aumento di volume farebbe **aumentare** la pressione: il sistema è meccanicamente instabile, e una piccola fluttuazione di densità cresce invece di riassorbirsi. Il limite di stabilità in campo medio è la **curva spinodale**, $\partial\pi/\partial\phi=0$ (Dispense, p. 141):
$$-\frac{24\theta}{(3\phi-1)^2}+\frac{6}{\phi^3}=0\quad\Longrightarrow\quad\theta_s=\frac{(3\phi_s-1)^2}{4\phi_s^3}.$$
A ogni $\theta<1$ corrispondono due valori di $\phi_s$, uno dal lato del liquido e uno dal lato del gas. Inserendoli nell'equazione di stato si ottiene la pressione spinodale:
$$\pi_s=\frac{3\phi_s-2}{\phi_s^3}$$
(Dispense, p. 142).

::: attenzione
**Un limite sbagliato.** Le dispense (p. 141) scrivono che a $\theta_s=0$ i due valori sono $\phi=1/3$, il close-packing di Van der Waals, e «$\phi=0$ (gas ideale)». Il ramo del gas va invece a $\phi\to\infty$: $\theta_s=(3\phi-1)^2/4\phi^3\simeq9/4\phi\to0$ per $\phi\to\infty$. Il gas ideale è il limite dei grandi volumi, non di volume nullo. Calcolo mio.
:::

::: idea
**Liquidi in tensione.** $\pi_s$ diventa **negativo** dal lato del liquido: un liquido di Van der Waals può sopportare pressioni negative, cioè essere tirato, in equilibrio metastabile. C'è un limite alla trazione massima: a $\theta=0$, $\phi_s=1/3$ e $\pi_s=-27$ (Dispense, p. 142). Non è una stranezza del modello: l'acqua nei vasi delle piante alte sale proprio in tensione, a pressione negativa. L'esempio è mio.
:::

## Coesistenza e costruzione di Maxwell {#coesistenza}

La coesistenza tra due fasi richiede uguali $T$, $P$ e potenziale chimico $\mu$, cioè uguale energia libera di Gibbs per particella (Dispense, p. 142; vedi anche [[insieme-gran-canonico-e-npt]]):
$$(F+PV)_{\rm fase\,1}=(F+PV)_{\rm fase\,2}\quad\Longrightarrow\quad P(V_2-V_1)=F_1-F_2 .$$
Poiché $P=-\partial F/\partial V|_T$, integrando a $T$ costante $F(V,T)=F(V_0,T)-\int_{V_0}^VP\,dV$, quindi
$$P_{\rm coex}(V_2-V_1)=F_1-F_2=\int_{V_1}^{V_2}P(V)\,dV$$
(Dispense, pp. 142–143). A sinistra c'è l'area di un rettangolo, a destra l'area sotto l'isoterma. Sono uguali solo se la retta $P=P_{\rm coex}$ taglia il cappio in **due lobi di area uguale**: è la **costruzione di Maxwell** (Appunti MS, pp. 37–38).

Il quadro completo sotto $T_c$, procedendo per volumi crescenti lungo l'isoterma (Appunti MS, pp. 37–38):

- **liquido stabile**, fino al volume $V_1$ di coesistenza;
- **liquido metastabile** (surriscaldato), tra $V_1$ e il primo punto spinodale;
- **zona spinodale, instabile**, tra i due punti spinodali: lì l'isoterma di Van der Waals non descrive nulla di fisico;
- **vapore metastabile** (sovrassaturo), tra il secondo punto spinodale e $V_2$;
- **vapore stabile** oltre $V_2$.

Nel grafico di $F(V)$ le due fasi coesistenti sono i punti di tangenza della **tangente comune**, con pendenza $-P_{\rm coex}$. Tra $V_1$ e $V_2$ il sistema reale segue il segmento orizzontale, che è una miscela delle due fasi.

::: {.lab-segnaposto tipo="vdw"}
:::

## Esercizi svolti {#esercizi}

:::: esercizio
**$B_2$ per sfere dure e per una buca quadrata.** (a) Calcolare $B_2$ per sfere dure di diametro $\sigma$. (b) Calcolare $B_2$ per il potenziale a buca: $v=\infty$ per $r<\sigma$, $v=-\varepsilon$ per $\sigma<r<R_c$, $v=0$ oltre. (c) Trovare la temperatura di Boyle e confrontare con Van der Waals. Esercizio mio, costruito sulla formula di p. 135.

::: soluzione
**(a)** Per $r<\sigma$, $f=-1$; oltre, $f=0$:
$$B_2^{\rm SD}=-2\pi\int_0^\sigma r^2(-1)\,dr=\frac{2\pi\sigma^3}{3}=v_0 .$$
È esattamente il volume escluso per particella di Van der Waals: metà della sfera di raggio $\sigma$. Positivo e indipendente da $T$.

**(b)** Si aggiunge il guscio attrattivo, dove $f=e^{\beta\varepsilon}-1>0$:
$$B_2=\frac{2\pi\sigma^3}{3}-2\pi\big(e^{\beta\varepsilon}-1\big)\int_\sigma^{R_c}r^2dr=\frac{2\pi}{3}\Big[\sigma^3-\big(e^{\beta\varepsilon}-1\big)\big(R_c^3-\sigma^3\big)\Big].$$

**(c)** Ad alta temperatura $e^{\beta\varepsilon}-1\simeq\beta\varepsilon$:
$$B_2\simeq v_0-\frac{1}{k_BT}\,\frac{2\pi}{3}\varepsilon\big(R_c^3-\sigma^3\big).$$
Ha esattamente la forma $v_0-a/k_BT$ di Van der Waals, con $a=\frac23\pi\varepsilon(R_c^3-\sigma^3)$. Per $\sigma\ll R_c$ è proprio la $a=\frac23\pi R_c^3\varepsilon$ di p. 137: il campo medio di Van der Waals è esatto all'ordine $\rho^2$ e ad alta $T$. La **temperatura di Boyle** è quella in cui $B_2=0$. Con la formula esatta, $e^{\varepsilon/k_BT_B}=\frac{R_c^3}{R_c^3-\sigma^3}$; nell'approssimazione di Van der Waals $k_BT_B=a/v_0=\frac{27}{8}k_BT_c$. Sotto $T_B$ l'attrazione domina e il gas è più comprimibile di quello ideale.
:::
::::

:::: esercizio
**Coesistenza a $\theta=0{,}9$.** Trovare numericamente pressione e volumi delle due fasi in coesistenza per l'isoterma ridotta $\theta=0{,}9$, e i due punti spinodali. Esercizio e soluzione numerica sono miei; puoi verificarli con il laboratorio qui sopra.

::: soluzione
**1. I punti spinodali.** $\theta=(3\phi-1)^2/4\phi^3=0{,}9$ ha due soluzioni: $\phi_s^{\rm liq}\simeq0{,}719$ e $\phi_s^{\rm gas}\simeq1{,}529$. Lì $\pi_s=(3\phi_s-2)/\phi_s^3$ vale circa 0,420 (minimo locale) e 0,724 (massimo locale).

**2. La costruzione di Maxwell.** Serve $\pi_{\rm coex}$ tale che $\int_{\phi_1}^{\phi_3}(\pi-\pi_{\rm coex})\,d\phi=0$, dove $\phi_1<\phi_2<\phi_3$ sono le tre soluzioni di $\pi(\phi)=\pi_{\rm coex}$. La primitiva di $\pi$ è esplicita:
$$\int\pi\,d\phi=\frac{8\theta}{3}\ln(3\phi-1)+\frac{3}{\phi}.$$
Si cerca $\pi_{\rm coex}$ per bisezione tra 0,420 e 0,724. Il risultato è
$$\pi_{\rm coex}\simeq0{,}647,\qquad\phi_{\rm liq}\simeq0{,}603,\qquad\phi_{\rm gas}\simeq2{,}35 .$$

**3. Lettura.** A $\theta=0{,}9$ il liquido è circa quattro volte più denso del vapore, $\phi_{\rm gas}/\phi_{\rm liq}\simeq3{,}9$. Avvicinandosi a $\theta=1$ i due volumi si avvicinano e si fondono in $\phi=1$: al punto critico la differenza tra liquido e gas sparisce.
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Perché si sviluppa in potenze della funzione di Mayer $f=e^{-\beta v}-1$ e non del potenziale $v$?

::: risposta
Perché $f$ è sempre limitata: vale $-1$ dove il potenziale diverge, per esempio nel nocciolo duro, e zero dove le particelle non interagiscono. Uno sviluppo in $\beta v$ non ha senso dove $v\gg k_BT$. Lo sviluppo in $f$ è invece uno sviluppo in densità: ogni $f$ in più richiede un'altra particella vicina, ed è sempre meno probabile in un gas rado.
:::
::::

:::: domanda
Che segno ha $B_2$ ad alta e a bassa temperatura, e perché?

::: risposta
Ad alta $T$ è positivo: l'attrazione conta poco ($e^{\beta|v|}\simeq1$) e domina il volume escluso, che aumenta la pressione. A bassa $T$ è negativo: le particelle restano vicine a lungo nella buca attrattiva e urtano meno le pareti. Il cambio di segno è alla temperatura di Boyle, che per Van der Waals è $a/v_0k_B=\frac{27}{8}T_c$.
:::
::::

:::: domanda
Da dove vengono i due termini dell'equazione di Van der Waals?

::: risposta
$k_BT/(v-v_0)$ è il gas ideale con il volume ridotto di quello escluso dalle sfere dure, $v_0=\frac23\pi\sigma^3$ per particella. $-a/v^2$ viene dall'energia di campo medio $E=-aN^2/V$: ogni particella sente un'attrazione proporzionale alla densità, e derivando $-aN^2/V$ rispetto a $V$ si ottiene $-aN^2/V^2$.
:::
::::

:::: domanda
Perché l'isoterma di Van der Waals sotto $T_c$ ha un tratto che sale, e che cosa succede davvero lì?

::: risposta
Per volumi intermedi l'attrazione $-a/v^2$ domina sia sulla sfera dura sia sul termine ideale, e la pressione cresce con il volume. Un sistema con $\partial P/\partial V>0$ è instabile: una fluttuazione di densità si amplifica. In realtà il sistema si separa in liquido e vapore, alla pressione di coesistenza data dalla costruzione di Maxwell. Il tratto tra i punti spinodali non è fisico; quelli tra spinodale e coesistenza sono stati metastabili.
:::
::::

:::: domanda
Che cosa dice la legge degli stati corrispondenti, e come la si verifica?

::: risposta
In unità del punto critico, $\pi=P/P_c$, $\phi=V/V_c$, $\theta=T/T_c$, l'equazione di Van der Waals non contiene più $a$ né $v_0$: è la stessa per tutti i gas. Si verifica misurando il fattore di compressibilità $Z=\beta P/\rho$ di gas diversi alle stesse $\pi$ e $\theta$: i punti cadono sulle stesse curve, come nella figura di p. 141.
:::
::::

:::: domanda
Perché la costruzione di Maxwell dà aree uguali?

::: risposta
Le due fasi devono avere stessa $P$ e stessa $G/N$, quindi $F_1+P_{\rm coex}V_1=F_2+P_{\rm coex}V_2$. Lungo l'isoterma $F_1-F_2=\int_{V_1}^{V_2}P\,dV$. Quindi l'area sotto l'isoterma tra $V_1$ e $V_2$ è uguale a quella del rettangolo $P_{\rm coex}(V_2-V_1)$: i due lobi sopra e sotto la retta hanno la stessa area.
:::
::::

:::: domanda
Che cosa succede alla compressibilità e alle fluttuazioni di densità avvicinandosi al punto critico?

::: risposta
Sull'isocora critica $\partial\pi/\partial\phi=6(1-\theta)\to0$, quindi $K_T\propto1/(\theta-1)$ diverge. Nel gran canonico $\langle\Delta N^2\rangle=\langle N\rangle\rho k_BTK_T$: le fluttuazioni di densità diventano enormi, e il fluido diffonde la luce (opalescenza critica). Proprio lì l'approssimazione di campo medio, che trascura le fluttuazioni, smette di essere affidabile.
:::
::::

## Articoli correlati
- [[insieme-canonico]]: la formula $P=Nk_BT/V-\langle\partial\mathcal H/\partial V\rangle$ da cui parte tutto.
- [[insieme-gran-canonico-e-npt]]: il legame $\langle\Delta N^2\rangle\propto K_T$, la tangente comune e la costruzione di Maxwell in generale.
- [[modello-di-ising-e-campo-medio]]: il lattice gas riporta a Van der Waals, e la stessa approssimazione di campo medio dà Bragg-Williams.
- [[appunti-anno-scorso]]: la mappa del quaderno.

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 132–143: secondo e terzo coefficiente del viriale pp. 132–136 (le pp. 132–133 sono la stessa trattazione in inglese); espansione di alta temperatura p. 136; Van der Waals p. 137; isoterme p. 138; punto critico e stati corrispondenti pp. 139–141; spinodale pp. 141–142; coesistenza pp. 142–143.
- `raw/foto appunti mec stat anno scorso/IMG_6341_COMPILED.HEIC`, `IMG_6342_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 33–39.
