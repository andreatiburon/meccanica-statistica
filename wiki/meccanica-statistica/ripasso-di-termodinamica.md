---
tags: [meccanica-statistica, termodinamica, entropia, potenziali-termodinamici, legendre, lezione]
data_creazione: 2026-10-27
data_aggiornamento: 2026-10-27
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
---

# Ripasso di termodinamica

La termodinamica è una teoria fenomenologica: ricava i suoi assiomi direttamente dagli esperimenti, senza parlare di atomi. La meccanica statistica nasce per spiegarla a partire dalla dinamica microscopica, e deve ritrovarne tutti i risultati. Questa lezione ne ripassa i concetti, i tre principi, le funzioni di risposta, i potenziali termodinamici e la trasformata di Legendre che li collega.

## Punti chiave
- **Stati e trasformazioni:** uno stato di equilibrio è fissato da pochi parametri legati da un'equazione di stato, $f(P,V,T)=0$. Una trasformazione reversibile è quasi-statica, ma non vale il contrario.
- **Primo principio:** $\Delta U=\Delta Q-\Delta W$ non dipende dal percorso, quindi $dU$ è un differenziale esatto, mentre $dQ$ e $dW$ non lo sono.
- **Secondo principio:** nessuna trasformazione ha come unico effetto trasformare in lavoro il calore di un solo serbatoio (Kelvin), né portare calore dal freddo al caldo (Clausius). Ne seguono $\oint dQ/T\le0$, l'entropia $dS=dQ_{\rm rev}/T$ e la sua crescita nei sistemi isolati.
- **Terzo principio:** $S\to0$ per $T\to0$, quindi tutte le capacità termiche e il coefficiente di dilatazione si annullano a $T=0$.
- **Funzioni di risposta:** $\alpha$, $K_T$, $K_S$, $C_V$, $C_P$, legate da identità tra derivate parziali, per esempio $C_P-C_V=TV\alpha^2/K_T$.
- **Potenziali:** $A=U-TS$ è minima a $T$ e $V$ fissati, $G=A+PV$ a $T$ e $P$ fissati; $-\Delta A$ è il massimo lavoro estraibile a $T$ costante. Le derivate danno le relazioni di Maxwell.
- **Legendre:** $\psi(p)=y(x)-px$, con $p=dy/dx$, descrive la stessa curva con pendenze e intercette. $U(S,V)$, $A(T,V)$ e $G(T,P)$ contengono la stessa informazione.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Il primo principio è un conto in banca. L'energia interna $U$ è il saldo; il calore e il lavoro sono due modi di versare o prelevare, come contanti e bonifici. Il saldo dipende solo da dove sei, non da come ci sei arrivato: è una **funzione di stato**. Invece «quanti contanti hai versato in tutto» dipende dalla storia: calore e lavoro non lo sono.

Il secondo principio aggiunge una regola che la banca non avrebbe: i contanti (il calore) non si convertono liberamente in bonifici (il lavoro). Qualcosa si perde sempre, e quel qualcosa si misura con l'entropia, che in un sistema isolato può solo crescere. La meccanica statistica dirà **perché**: l'entropia conta i microstati, e un sistema lasciato a sé finisce dove i microstati sono di più. Una pietra non si raffredda spontaneamente sollevandosi fino al soffitto: non è vietato dalla conservazione dell'energia, ma i modi di farlo sono così pochi che non succede mai.
:::

La lezione segue questo filo.

1. [I concetti base](#concetti) e [la scala di temperatura](#temperatura).
2. [Il primo principio](#primo-principio), [il secondo e l'entropia](#secondo-principio), [il terzo](#terzo-principio).
3. [Le funzioni di risposta](#funzioni-risposta).
4. [I potenziali termodinamici](#potenziali) e [le relazioni di Maxwell](#maxwell).
5. [La trasformata di Legendre](#legendre).
6. [Esercizi svolti](#esercizi).

## I concetti base {#concetti}

La meccanica statistica nasce per descrivere il comportamento collettivo della materia, e oggi le sue idee si applicano ovunque grandi numeri di «attori» interagiscono: biologia, scienze sociali, economia. Resta però legata alla termodinamica, una teoria fenomenologica che ricava i suoi assiomi dagli esperimenti (Dispense, p. 21). Le definizioni di base (Dispense, pp. 21–23):

- **Sistema termodinamico:** qualunque sistema macroscopico.
- **Parametri termodinamici:** grandezze macroscopiche misurabili, come $P$, $V$, $T$ o il campo magnetico $H$, definite sperimentalmente.
- **Stato termodinamico:** l'insieme dei valori di tutti i parametri necessari. Si ha **equilibrio** quando lo stato non cambia nel tempo.
- **Equazione di stato:** una relazione $f(P,V,T)=0$ tra i parametri all'equilibrio, che riduce le variabili indipendenti da tre a due. Gli stati di equilibrio formano una superficie nello spazio $P$-$V$-$T$.
- **Trasformazione:** un cambiamento di stato, ottenuto cambiando le condizioni esterne. È **quasi-statica** se le condizioni cambiano così lentamente che il sistema è sempre quasi all'equilibrio; è **reversibile** se può ripercorrere la sua storia all'indietro. Una reversibile è quasi-statica, ma non vale il contrario: un gas che si espande liberamente in tanti volumetti infinitesimi successivi fa una trasformazione quasi-statica ma irreversibile.
- **Diagramma $P$-$V$:** la proiezione della superficie di stato. Una trasformazione reversibile è una curva continua (isoterma, adiabatica, isocora…); una irreversibile non si rappresenta in modo continuo.
- **Lavoro:** $dW=P\,dV$ è il lavoro fatto **dal** sistema quando il volume aumenta di $dV$.
- **Calore e capacità termica:** il calore è ciò che un sistema assorbe quando la temperatura sale senza lavoro. Se $\Delta Q=C\,\Delta T$, $C$ è la capacità termica, che dipende dalla trasformazione: $C_V$ a volume costante, $C_P$ a pressione costante. Per unità di massa o per mole si parla di calori specifici.
- **Serbatoio:** un sistema così grande che scambiare una quantità finita di calore non ne cambia la temperatura.
- **Isolamento termico:** nessuno scambio di calore con l'esterno, attraverso una parete adiabatica. Una trasformazione che lo rispetta è **adiabatica**.
- **Estensive e intensive:** una grandezza estensiva è proporzionale alla quantità di sostanza, $Q=N\,q(P,N/V,T)$; una intensiva non ne dipende, $Q=q'(P,N/V,T)$. È un fatto empirico che quasi tutte le grandezze termodinamiche siano dell'uno o dell'altro tipo.
- **Gas ideale:** l'idealizzazione del comportamento universale di tutti i gas molto diluiti. A temperatura costante vale la legge di Boyle, $PV/N=$ costante.

## La scala di temperatura {#temperatura}

L'equazione di stato del gas ideale **definisce** una scala di temperatura (Dispense, p. 23):
$$PV=Nk_BT,\qquad k_B=1{,}38\cdot10^{-16}\ {\rm erg/K}=1{,}38\cdot10^{-23}\ {\rm J/K}.$$
La scala è universale perché il gas ideale lo è. Per costruirla si misura $PV/Nk_B$ di un gas diluito all'ebollizione e al congelamento dell'acqua, si traccia la retta per i due punti e si prende la sua intercetta come origine; si mettono 100 divisioni tra i due punti. È la scala Kelvin. Per misurare una temperatura si mette il corpo a contatto con il gas ideale, per esempio elio molto rarefatto, e si legge $PV/Nk_B$. In forma molare, $PV=nRT$ con $R=8{,}315$ J/K $=N_Ak_B$ e $N_A=6{,}023\cdot10^{23}$ (Dispense, pp. 23–24). L'origine $T=0$ sembra arbitraria; il secondo principio le darà un significato assoluto.

Le leggi della termodinamica si possono vedere come assiomi di un modello matematico. Ignorano la struttura atomica e falliranno nel dominio atomico, ma nel mondo macroscopico sono potenti: da tre leggi apparentemente ingenue seguono conclusioni precise e molto restrittive (Dispense, p. 24).

## Il primo principio: l'energia si conserva {#primo-principio}

In una trasformazione arbitraria, con $\Delta Q$ il calore netto assorbito dal sistema e $\Delta W$ il lavoro netto fatto dal sistema,
$$\Delta U=\Delta Q-\Delta W$$
è **lo stesso per tutte le trasformazioni** che collegano due stati dati. Questo definisce una funzione di stato, l'**energia interna** $U$, a meno di una costante additiva: si sceglie uno stato di riferimento e si misura $\Delta Q-\Delta W$ lungo un percorso qualunque. Empiricamente $U$ è estensiva. Il fondamento sperimentale è l'esperimento di Joule sull'equivalenza tra calore e lavoro meccanico (Dispense, p. 24).

In forma infinitesima, $dU=dQ-dW$ è un **differenziale esatto**: esiste una funzione $U$ di cui è il differenziale, e $\int dU$ dipende solo dagli estremi. Per $dQ$ e $dW$ non è così.

**Che cosa vuol dire esatto.** $df=g(A,B)\,dA+h(A,B)\,dB$ è esatto se $\partial g/\partial B=\partial h/\partial A$. Per esempio, prendendo $P$ e $V$ come variabili indipendenti, $dU=(\partial U/\partial P)_VdP+(\partial U/\partial V)_PdV$, e l'esattezza impone
$$\Big[\frac{\partial}{\partial V}\Big(\frac{\partial U}{\partial P}\Big)_V\Big]_P=\Big[\frac{\partial}{\partial P}\Big(\frac{\partial U}{\partial V}\Big)_P\Big]_V$$
(Dispense, p. 25). È l'uguaglianza delle derivate miste, da cui nasceranno le relazioni di Maxwell.

## Il secondo principio e l'entropia {#secondo-principio}

Ci sono processi che conservano l'energia ma non si osservano mai: una pietra sul pavimento non si raffredda spontaneamente per sollevarsi fino al soffitto. Il secondo principio raccoglie questi fatti, in due forme equivalenti (Dispense, p. 25):

- **Kelvin:** non esiste una trasformazione il cui **unico** effetto sia estrarre calore da un serbatoio e trasformarlo interamente in lavoro.
- **Clausius:** non esiste una trasformazione il cui **unico** effetto sia portare calore da un serbatoio più freddo a uno più caldo.

La parola chiave è «unico». In un'espansione isoterma reversibile di un gas ideale $\Delta U=0$, quindi tutto il calore assorbito diventa lavoro; ma non è l'unico effetto, perché il gas alla fine occupa un volume maggiore. Le due formulazioni sono equivalenti: se una è falsa, lo è anche l'altra (Dispense, p. 25).

**Il teorema di Clausius.** In ogni trasformazione ciclica in cui la temperatura è definita,
$$\oint\frac{dQ}{T}\le0,$$
con l'uguaglianza se il ciclo è reversibile (Dispense, p. 26).

**L'entropia.** Scelto uno stato di riferimento $O$, si definisce
$$S(A)=\int_O^A\frac{dQ}{T}$$
lungo un **qualunque percorso reversibile** da $O$ ad $A$. Per il teorema di Clausius il risultato non dipende dal percorso reversibile scelto, e in una trasformazione reversibile infinitesima $dS=dQ/T$ è un differenziale esatto: il fattore $1/T$ trasforma il differenziale inesatto $dQ$ in uno esatto (Dispense, p. 26).

:::: {.passaggi titolo="Due proprietà dell'entropia"}
**(a) Per una trasformazione qualunque da $A$ a $B$:** $\int_A^B\frac{dQ}{T}\le S(B)-S(A)$. Si chiude il percorso con un tratto reversibile da $B$ ad $A$ e si applica Clausius:
$$\oint\frac{dQ}{T}=\int_A^B\frac{dQ}{T}+\int_B^A\frac{dQ_{\rm rev}}{T}\le0\quad\Longrightarrow\quad\int_A^B\frac{dQ}{T}\le-\big[S(A)-S(B)\big].$$
**(b) L'entropia di un sistema isolato non diminuisce mai.** Isolato vuol dire $dQ=0$, quindi da (a) $S(B)-S(A)\ge0$, con l'uguaglianza per trasformazioni reversibili (Dispense, pp. 26–27).
::::

Conseguenza: **per un sistema isolato lo stato di equilibrio è quello di massima entropia compatibile con i vincoli**. È il punto di aggancio con il [[insieme-microcanonico]], dove l'entropia sarà il logaritmo del numero di microstati (Dispense, p. 27).

::: idea
**Una legge solo statistica.** Le leggi microscopiche sono invarianti per inversione del tempo: non distinguono il passato dal futuro. Allora in che senso il secondo principio, che invece li distingue, è vero? È vero **in media**: nei fenomeni macroscopici le violazioni sono così improbabili che, a tutti gli effetti, non accadono mai (Dispense, p. 27). La meccanica statistica lo rende quantitativo: le fluttuazioni relative vanno come $N^{-1/2}$, e una violazione macroscopica ha probabilità del tipo $e^{-10^{23}}$. Se ne discute anche la conseguenza estrema, la «morte termica» dell'universo, uno stato di massima entropia verso cui tenderebbe un universo isolato (Dispense, p. 27).
:::

## Il terzo principio {#terzo-principio}

Il secondo principio fissa l'entropia a meno di una costante, ed è utile solo se esiste un percorso reversibile tra i due stati. Per sostanze diverse, o fasi metastabili della stessa sostanza, la superficie di stato può essere fatta di pezzi disgiunti, e il percorso non esiste. Per risolvere l'ambiguità Nernst (1905) propose la regola oggi chiamata **terzo principio** (Dispense, p. 27):

> L'entropia di un sistema allo zero assoluto è una costante universale, che si può porre uguale a zero.

Vale per qualunque sistema e indipendentemente da tutti gli altri parametri da cui $S$ può dipendere, quindi rende unica l'entropia di ogni stato.

**Le capacità termiche si annullano a $T=0$.** Lungo un percorso reversibile $R$ dallo zero assoluto allo stato $A$, $S(A)=\int_0^{T_A}C_R(T)\frac{dT}{T}$. Sviluppando $C_R(T)=C_R(0)+C_R'(0)\,T+\dots$, il primo termine darebbe $C_R(0)\int\frac{dT}{T}$, che diverge. Perché l'integrale converga anche per $T_A\to0$ deve essere
$$C_R(T)\to0\quad\text{per }T\to0,$$
dove $C_R$ può essere $C_V$ o $C_P$. È verificato per tutte le sostanze esaminate. Una conseguenza meno ovvia: anche il coefficiente di dilatazione termica si annulla, $\alpha(T)\to0$ (Dispense, pp. 27–28). Il gas classico viola il terzo principio ($C_V=\frac32Nk_B$), e la cura è quantistica: vedi [[gas-quantistici-ideali]] e [[corpo-nero-e-solidi]].

## Le funzioni di risposta {#funzioni-risposta}

**Identità tra derivate parziali.** Per tre variabili legate da $f(x,y,z)=0$, e $w$ funzione di due di esse (Dispense, p. 28):
$$\Big(\frac{\partial x}{\partial y}\Big)_w\Big(\frac{\partial y}{\partial z}\Big)_w=\Big(\frac{\partial x}{\partial z}\Big)_w,\qquad\Big(\frac{\partial x}{\partial y}\Big)_z\Big(\frac{\partial y}{\partial x}\Big)_z=1,$$
$$\Big(\frac{\partial x}{\partial y}\Big)_z\Big(\frac{\partial y}{\partial z}\Big)_x\Big(\frac{\partial z}{\partial x}\Big)_y=-1 .$$
L'ultima è la **relazione ciclica** (chain relation): attenzione al segno meno.

**Le grandezze misurabili.**
$$\alpha=\frac1V\Big(\frac{\partial V}{\partial T}\Big)_P,\qquad K_T=-\frac1V\Big(\frac{\partial V}{\partial P}\Big)_T,\qquad K_S=-\frac1V\Big(\frac{\partial V}{\partial P}\Big)_S :$$
il coefficiente di dilatazione termica e le compressibilità isoterma e adiabatica. Con le identità si ricavano, tra l'altro (Dispense, pp. 28–29):
$$T\,dS=C_VdT+\frac{\alpha T}{K_T}dV,\qquad T\,dS=C_PdT-\alpha TV\,dP,$$
$$C_P-C_V=\frac{TV\alpha^2}{K_T}.$$

:::: {.passaggi titolo="Da dove viene C_P − C_V (derivazione mia)"}
Si scrive $S=S(T,V)$: $T\,dS=T\big(\frac{\partial S}{\partial T}\big)_VdT+T\big(\frac{\partial S}{\partial V}\big)_TdV=C_VdT+T\big(\frac{\partial P}{\partial T}\big)_VdV$, usando la relazione di Maxwell $(\partial S/\partial V)_T=(\partial P/\partial T)_V$ che si ricava sotto da $A$. Per la relazione ciclica, $\big(\frac{\partial P}{\partial T}\big)_V=-\frac{(\partial V/\partial T)_P}{(\partial V/\partial P)_T}=\frac{\alpha}{K_T}$: è la prima equazione.

A pressione costante, $dV=\alpha V\,dT$, e $T\,dS=C_PdT$. Sostituendo nella prima equazione:
$$C_PdT=C_VdT+\frac{\alpha T}{K_T}\alpha V\,dT\quad\Longrightarrow\quad C_P-C_V=\frac{TV\alpha^2}{K_T}.$$
Poiché $K_T>0$ per la stabilità, $C_P\ge C_V$ sempre.
::::

**Il gas ideale.** Da $V=nRT/P$:
$$\alpha=\frac1V\frac{nR}{P}=\frac1T,\qquad K_T=\frac1V\frac{nRT}{P^2}=\frac1P,\qquad C_P-C_V=\frac{TV}{T^2}P=nR$$
(Dispense, p. 29): la relazione di Mayer.

## I potenziali termodinamici {#potenziali}

Per un sistema **non** isolato si introducono due funzioni di stato ausiliarie (Dispense, p. 29):
$$A(V,T)=U-TS,\qquad G(T,P)=A+PV=A-V\Big(\frac{\partial A}{\partial V}\Big)_T :$$
l'**energia libera di Helmholtz** e il **potenziale di Gibbs**.

**Il significato di $A$: il massimo lavoro.** In una trasformazione isoterma da $A$ a $B$, il secondo principio dà $\int\frac{dQ}{T}=\frac{\Delta Q}{T}\le\Delta S$. Con il primo, $\Delta Q=\Delta U+W$:
$$\Delta U+W\le T\Delta S\quad\Longrightarrow\quad W\le-\Delta U+T\Delta S=-\Delta A .$$
**Il lavoro che un sistema può fare a temperatura costante è al massimo la diminuzione della sua energia libera.** Se non fa lavoro, $\Delta A\le0$: un sistema a $V$ e $T$ costanti evolve verso il **minimo di $A$** (Dispense, pp. 29–30). Da qui il nome: $A$ è l'energia «libera» di diventare lavoro. Nel [[insieme-canonico]] sarà $A=-k_BT\ln Q_N$.

**Il differenziale:** $dA=dU-T\,dS-S\,dT=-P\,dV-S\,dT$, quindi
$$\Big(\frac{\partial A}{\partial V}\Big)_T=-P,\qquad\Big(\frac{\partial A}{\partial T}\Big)_V=-S :$$
conoscere $A(V,T)$ dà accesso a $P$ e a $S$ (Dispense, p. 30).

**Esempio: il pistone.** Un gas in un cilindro a temperatura costante, diviso da un pistone scorrevole in due parti, $V_1$ e $V_2$, con pressioni $P_1$ e $P_2$. Dove si ferma il pistone, se lo si lascia libero? Al minimo di $A$: uno spostamento piccolo non deve cambiarla. Con $dV_1=-dV_2$:
$$0=\delta A=\Big(\frac{\partial A}{\partial V_1}\Big)_TdV_1+\Big(\frac{\partial A}{\partial V_2}\Big)_TdV_2\quad\Longrightarrow$$
$$\Big(\frac{\partial A}{\partial V_1}\Big)_T=\Big(\frac{\partial A}{\partial V_2}\Big)_T\quad\Longrightarrow\quad P_1=P_2$$
(Dispense, p. 30). È lo stesso ragionamento del setto mobile nel [[insieme-microcanonico]], con $A$ al posto di $S$.

**A $T$ e $P$ costanti.** Da $W\le-\Delta A$ con $W=P\Delta V$: $P\Delta V+\Delta A\le0$, cioè $\Delta G\le0$. **Per un sistema a $T$ e $P$ costanti l'equilibrio è il minimo di $G$** (Dispense, pp. 30–31). In una trasformazione reversibile
$$dG=dA+P\,dV+V\,dP=-S\,dT+V\,dP,$$
$$\Big(\frac{\partial G}{\partial T}\Big)_P=-S,\qquad\Big(\frac{\partial G}{\partial P}\Big)_T=V .$$

## Le relazioni di Maxwell e il quadrato termodinamico {#maxwell}

Le derivate dei potenziali rispetto alle loro variabili naturali, e l'uguaglianza delle derivate miste, danno le **relazioni di Maxwell**. Si ricordano con un diagramma (Dispense, p. 31):

<figure class="quadrato-termo">
<svg viewBox="0 0 240 200" role="img" aria-label="Quadrato termodinamico: V in alto a sinistra, T in alto a destra, P in basso a destra, S in basso a sinistra; A in alto, G a destra, H in basso, U a sinistra; frecce da S verso T e da P verso V">
<defs><marker id="punta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.6" opacity=".8">
<line x1="62" y1="152" x2="174" y2="52" marker-end="url(#punta)"/>
<line x1="178" y1="152" x2="66" y2="52" marker-end="url(#punta)"/>
</g>
<g font-family="Spectral, Georgia, serif" font-style="italic" font-size="26" fill="currentColor" text-anchor="middle">
<text x="45" y="45">V</text><text x="195" y="45">T</text><text x="195" y="178">P</text><text x="45" y="178">S</text>
</g>
<g font-family="Spectral, Georgia, serif" font-style="italic" font-size="24" fill="#F2C14E" text-anchor="middle">
<text x="120" y="45">A</text><text x="200" y="112">G</text><text x="120" y="178">H</text><text x="40" y="112">U</text>
</g>
</svg>
</figure>

I potenziali $A$, $G$, $H$, $U$ stanno sui lati, affiancati dalle loro variabili naturali: $A=A(V,T)$, $G=G(T,P)$, $H=H(S,P)$, $U=U(S,V)$. La derivata rispetto a una variabile, con l'altra fissa, si trova percorrendo la diagonale che parte da quella variabile: si legge la variabile all'altro capo, con segno meno se si va contro la freccia. Per esempio $(\partial A/\partial T)_V=-S$ e $(\partial A/\partial V)_T=-P$ (Dispense, p. 31). $H=U+PV$ è l'**entalpia**.

Uguagliando le derivate miste di ciascun potenziale si ottengono le quattro relazioni di Maxwell (conoscenza generale, coerente con i differenziali delle dispense):
$$\Big(\frac{\partial T}{\partial V}\Big)_S=-\Big(\frac{\partial P}{\partial S}\Big)_V,\qquad\Big(\frac{\partial S}{\partial V}\Big)_T=\Big(\frac{\partial P}{\partial T}\Big)_V,$$
$$\Big(\frac{\partial S}{\partial P}\Big)_T=-\Big(\frac{\partial V}{\partial T}\Big)_P,\qquad\Big(\frac{\partial T}{\partial P}\Big)_S=\Big(\frac{\partial V}{\partial S}\Big)_P .$$

::: attenzione
**Un pedice negli appunti di quest'anno.** Nella p. 9 degli appunti delle lezioni compare $-P=(\partial U/\partial V)_T$: il pedice corretto è $S$, perché le variabili naturali di $U$ sono $S$ e $V$. Da $dU=T\,dS-P\,dV$ segue $(\partial U/\partial V)_S=-P$. La correzione è già registrata in [[meccanica-statistica/corso-e-lezioni]].
:::

## La trasformata di Legendre {#legendre}

Una funzione convessa o concava $y(x)$ si può descrivere in due modi: con le coppie $(x,y)$, oppure con la **pendenza** $p$ in ogni punto e l'**intercetta** $\psi$ della retta tangente. La seconda descrizione è
$$\psi(p)=y(x)-px,\qquad p=\frac{dy}{dx}$$
(Dispense, p. 31).

:::: {.passaggi titolo="Perché ψ dipende solo da p, e come si torna indietro"}
$$d\psi=dy-p\,dx-x\,dp=\frac{dy}{dx}dx-p\,dx-x\,dp=-x\,dp .$$
Quindi $\psi$ è funzione solo di $p$, e $x=-\frac{d\psi}{dp}$. La relazione è unica perché la funzione è convessa o concava: a ogni pendenza corrisponde un solo punto. Per tornare indietro:
$$y(x)=\psi(p)+px=\psi(p)-p\frac{d\psi}{dp}$$
(Dispense, pp. 31–32). Le due funzioni sono due rappresentazioni della stessa relazione, **senza perdita di informazione**.
::::

**Un esempio che conoscete: dalla lagrangiana all'hamiltoniana.** Con $L(q,v)$ si vuole sostituire la velocità $v$ con $p=\partial L/\partial v$. La trasformata di Legendre, cambiata di segno, è
$$-H=L-v\frac{\partial L}{\partial v}\quad\Longrightarrow\quad H(q,p)=pv-L,\qquad v=\frac{\partial H}{\partial p}$$
(Dispense, p. 32).

**In termodinamica.** Si parte da $U(S,V)$ e si sostituisce $S$ con la sua coniugata. A volume costante $\frac{dU}{dS}\big|_V=T$, e l'«intercetta» è
$$A(T,V)=U-TS,$$
$$dA=T\,dS-P\,dV-T\,dS-S\,dT=-P\,dV-S\,dT :$$
le variabili sono diventate $T$ e $V$. Poi si trasforma $A$ rispetto a $V$, a $T$ costante:
$$G(T,P)=A-V\frac{\partial A}{\partial V}\Big|_T=A+PV,\qquad dG=-S\,dT+V\,dP .$$
**$U(S,V)$, $A(T,V)$ e $G(T,P)$ contengono la stessa informazione** (Dispense, p. 33). La meccanica statistica dà direttamente una di queste funzioni per ogni insieme: $S(E,V)$ nel microcanonico, $A(T,V)$ nel canonico, $-PV(T,\mu)$ nel gran canonico, $G(T,P)$ nell'NPT.

::: {.lab-segnaposto tipo="legendre"}
:::

## Esercizi svolti {#esercizi}

:::: esercizio
**Entropia di un gas ideale in espansione isoterma.** Calcolare $\Delta S$ per $n$ moli di gas ideale che passano da $V_1$ a $V_2$ a temperatura costante, sia per un'espansione reversibile sia per un'espansione libera nel vuoto. Esercizio mio, sui principi di pp. 24–27.

::: soluzione
**Con una relazione di Maxwell.** $\big(\frac{\partial S}{\partial V}\big)_T=\big(\frac{\partial P}{\partial T}\big)_V=\frac{nR}{V}$, quindi
$$\Delta S=\int_{V_1}^{V_2}\frac{nR}{V}dV=nR\ln\frac{V_2}{V_1}.$$
**Espansione reversibile.** $\Delta U=0$ per un gas ideale isotermo, quindi $Q=W=\int P\,dV=nRT\ln\frac{V_2}{V_1}$ e $\Delta S=Q/T$: lo stesso risultato. Il serbatoio cede $Q$ e perde $Q/T$: l'entropia totale non cambia.

**Espansione libera.** Il gas non fa lavoro e non scambia calore: $Q=W=0$ e $\Delta U=0$. Ma $S$ è una funzione di stato e gli stati iniziale e finale sono gli stessi di prima: $\Delta S_{\rm gas}=nR\ln\frac{V_2}{V_1}>0$, mentre l'ambiente non cambia. L'entropia dell'universo aumenta: la trasformazione è irreversibile. Si noti che $\int dQ/T=0<\Delta S$, come vuole la proprietà (a). Nel [[insieme-microcanonico]] lo stesso risultato viene dal conteggio: ogni particella ha $V_2/V_1$ volte più posti.
:::
::::

:::: esercizio
**$C_P-C_V$ per un fluido di Van der Waals.** Con $P=\frac{Nk_BT}{V-Nb}-\frac{aN^2}{V^2}$, calcolare $C_P-C_V$ e confrontarlo con il gas ideale. Esercizio mio, con la formula di p. 29.

::: soluzione
Conviene la forma $C_P-C_V=-T\frac{(\partial P/\partial T)_V^2}{(\partial P/\partial V)_T}$, equivalente a $TV\alpha^2/K_T$ per la relazione ciclica. Qui
$$\Big(\frac{\partial P}{\partial T}\Big)_V=\frac{Nk_B}{V-Nb},\qquad\Big(\frac{\partial P}{\partial V}\Big)_T=-\frac{Nk_BT}{(V-Nb)^2}+\frac{2aN^2}{V^3},$$
$$C_P-C_V=\frac{Nk_B}{1-\dfrac{2aN(V-Nb)^2}{k_BTV^3}} .$$
Per $a\to0$ si ritrova $Nk_B$, cioè $nR$. Con l'attrazione la differenza è **maggiore** che nel gas ideale, e diverge dove $(\partial P/\partial V)_T=0$: sulla spinodale e al punto critico, dove la compressibilità diverge (vedi [[gas-reali-viriale-e-van-der-waals]]).
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Perché $dU$ è un differenziale esatto e $dQ$ no?

::: risposta
Il primo principio dice che $\Delta Q-\Delta W$ è lo stesso per tutti i percorsi tra due stati: definisce una funzione di stato $U$. Calore e lavoro presi separatamente dipendono dal percorso, per esempio un'espansione può avvenire con o senza lavoro. Il fattore $1/T$ rende esatto $dQ_{\rm rev}$: $dS=dQ_{\rm rev}/T$.
:::
::::

:::: domanda
Un gas ideale si espande isotermicamente e trasforma tutto il calore assorbito in lavoro. Perché non viola Kelvin?

::: risposta
Perché la conversione non è l'**unico** effetto: alla fine il gas occupa un volume maggiore. Kelvin vieta un ciclo che, ripetuto, prenda calore da un solo serbatoio e lo trasformi tutto in lavoro senza lasciare altre tracce. Per tornare al volume iniziale bisognerebbe comprimere il gas, cedendo calore.
:::
::::

:::: domanda
Perché il terzo principio impone che le capacità termiche vadano a zero per $T\to0$?

::: risposta
$S(T)=\int_0^TC(T')\frac{dT'}{T'}$. Se $C$ restasse finita a $T=0$, l'integrale divergerebbe logaritmicamente vicino a zero, mentre $S$ deve essere finita, anzi nulla. Quindi $C\to0$, per esempio come una potenza $T^\alpha$ con $\alpha>0$.
:::
::::

:::: domanda
Che cosa misura l'energia libera di Helmholtz, e perché all'equilibrio è minima?

::: risposta
A temperatura costante, $-\Delta A$ è il massimo lavoro che il sistema può fare: $W\le-\Delta A$, dal secondo principio. Se il sistema non fa lavoro, a $V$ e $T$ costanti, $\Delta A\le0$: evolve spontaneamente verso valori di $A$ più bassi, e all'equilibrio $A$ è minima.
:::
::::

:::: domanda
Come si usa il quadrato termodinamico per trovare $(\partial G/\partial P)_T$?

::: risposta
$G$ sta sul lato tra $T$ e $P$. Si parte da $P$, la variabile rispetto a cui si deriva, e si segue la diagonale fino all'angolo opposto, $V$. Si va nel verso della freccia, quindi il segno è $+$: $(\partial G/\partial P)_T=V$. Per $(\partial G/\partial T)_P$ si parte da $T$, si va contro la freccia fino a $S$: $-S$.
:::
::::

:::: domanda
Che cos'è una trasformata di Legendre, e perché non si perde informazione?

::: risposta
Si descrive una curva convessa con le pendenze delle sue tangenti e le intercette, invece che con le coppie $(x,y)$: $\psi(p)=y-px$ con $p=y'(x)$. Per una funzione convessa a ogni pendenza corrisponde un solo punto, quindi la corrispondenza è invertibile: $x=-\psi'(p)$ e $y=\psi-p\psi'$. In termodinamica permette di cambiare variabile naturale, per esempio da $S$ a $T$, senza perdere niente.
:::
::::

## Articoli correlati
- [[insieme-microcanonico]]: l'entropia come logaritmo del numero di microstati, e da lì temperatura e pressione.
- [[insieme-canonico]]: $A=-k_BT\ln Q_N$ e la verifica che coincide con l'energia libera della termodinamica.
- [[insieme-gran-canonico-e-npt]]: il potenziale $\Omega=-PV$ e $G=\mu N$ come trasformate di Legendre.
- [[ripasso-di-probabilita]]: l'altra metà dei prerequisiti.
- [[spazio-delle-fasi-e-liouville]]: il ponte tra la dinamica microscopica e la descrizione statistica.
- [[meccanica-statistica/corso-e-lezioni]]: gli appunti di quest'anno su questi argomenti (pp. 1–9).

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 21–33: concetti base pp. 21–23; temperatura pp. 23–24; primo principio pp. 24–25; secondo principio ed entropia pp. 25–27; terzo principio pp. 27–28; funzioni di risposta pp. 28–29; potenziali termodinamici pp. 29–31; quadrato termodinamico e Legendre pp. 31–33.
- Appunti delle lezioni di quest'anno, pp. 1–9 (vedi [[meccanica-statistica/corso-e-lezioni]]); il file non è in questo repository.
