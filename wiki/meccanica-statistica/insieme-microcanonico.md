---
tags: [meccanica-statistica, ensemble, microcanonico, entropia, lezione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-26
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
  - raw/foto appunti mec stat anno scorso/IMG_6329_COMPILED.HEIC … IMG_6333_COMPILED.HEIC
---

# Insieme microcanonico

Un sistema isolato ha $N$ particelle, volume $V$ ed energia $E$ fissati. Non sappiamo in quale dei suoi stati microscopici si trovi, e non proviamo nemmeno a seguirlo: assumiamo che tutti quelli con l'energia giusta siano ugualmente probabili e li contiamo. Da questo conteggio escono l'entropia, la temperatura, la pressione e tutta la termodinamica.

## Punti chiave
- **Postulato di uguale probabilità a priori:** in un sistema isolato all'equilibrio ogni microstato con energia tra $E$ ed $E+\Delta$ ha la stessa probabilità: $\rho(q,p)=1/(h^{3N}\Gamma_\Delta)$ nel guscio, zero fuori.
- **Contare:** $\Sigma(E)$ conta gli stati con energia minore di $E$, $\Gamma_\Delta(E)=\Sigma(E+\Delta)-\Sigma(E)\simeq\omega(E)\Delta$ quelli nel guscio. In $3N\sim10^{23}$ dimensioni quasi tutto il volume sta nel guscio esterno, quindi $k_B\ln\Sigma$, $k_B\ln\Gamma$ e $k_B\ln\Gamma_\Delta$ differiscono solo per $O(\ln N)$.
- **Entropia di Boltzmann:** $S=k_B\ln\Gamma_\Delta(E)$. Il logaritmo la rende additiva, perché i conteggi di sistemi indipendenti si moltiplicano.
- **Equilibrio:** due sistemi a contatto si dividono energia e volume nel modo che massimizza $\Gamma_1\Gamma_2$. Ne seguono $1/T=\partial S/\partial E$ e $P/T=\partial S/\partial V$, quindi $dE=T\,dS-P\,dV$.
- **Equipartizione:** $\langle x_i\,\partial\mathcal H/\partial x_j\rangle=\delta_{ij}k_BT$. Ogni termine quadratico dell'hamiltoniana porta $\tfrac12k_BT$; per il gas, $\langle E_{\rm kin}\rangle=\tfrac32Nk_BT$.
- **Gas ideale e Gibbs:** il conteggio con le ipersfere dà $E=\tfrac32Nk_BT$ e $PV=Nk_BT$, ma un'entropia non estensiva. Dividendo per $N!$ (particelle identiche) si ottiene la formula di Sackur-Tetrode, e il paradosso di Gibbs sparisce.
- **Oltre lo spazio delle fasi:** nel sistema a due livelli si contano le scelte di quali particelle eccitare; compaiono il picco di Schottky e le temperature negative.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Lancia 100 monete. La sequenza esatta di teste e croci, il *microstato*, è imprevedibile e non ti interessa. Ti interessa il numero di teste, il *macrostato*. Quasi tutte le $2^{100}$ sequenze danno un numero di teste vicino a 50: non perché le monete «vogliano» stare a metà, ma perché a metà ci sono incomparabilmente più sequenze. Con 50 teste ce ne sono circa $10^{29}$, con 90 teste circa $10^{13}$.

La meccanica statistica fa la stessa cosa con un gas. Un microstato è la lista di posizioni e impulsi di tutte le particelle; un macrostato è dato da poche grandezze come $E$, $V$ e $N$. Se tutti i microstati compatibili sono ugualmente probabili, il sistema si troverà quasi sempre nel macrostato che ha più microstati. **L'entropia è il logaritmo di quanti sono**, e la tendenza all'equilibrio è solo la tendenza a finire dove gli stati sono di più.
:::

La lezione segue questo filo. Ogni passo usa solo i precedenti.

1. [Lo spazio delle fasi](#spazio-fasi): dove vivono i microstati.
2. [Il postulato](#postulato): tutti i microstati con la stessa energia sono equiprobabili. Serve contarli.
3. [Contare](#contare), e perché [in tante dimensioni il volume sta nella buccia](#alta-dimensione).
4. [L'entropia](#entropia) come logaritmo del conteggio, e perché è additiva.
5. Mettendo in contatto due sistemi nascono [la temperatura](#equilibrio-termico) e [la pressione](#equilibrio-meccanico).
6. [La termodinamica](#termodinamica) è tutta contenuta in $S(E,V)$. Ma serve [una costante $h$](#costante-h) per contare davvero.
7. Due risultati generali: [equipartizione](#equipartizione) e [fluttuazioni](#fluttuazioni).
8. Le applicazioni: [gas ideale](#gas-ideale), [paradosso di Gibbs](#gibbs), [oscillatori](#oscillatori), [sistema a due livelli](#due-livelli), [probabilità di una singola particella](#probabilita-microscopiche).

## Da dove partiamo: lo spazio delle fasi {#spazio-fasi}

Un gas di $N$ atomi è descritto, in meccanica classica, da $3N$ coordinate $q_1,\dots,q_{3N}$ e $3N$ impulsi $p_1,\dots,p_{3N}$. Mettendole tutte in fila si ottiene un punto in uno spazio a $6N$ dimensioni, lo **spazio delle fasi** $\Gamma$. Un punto di $\Gamma$ è un **microstato**: dice tutto del sistema in quell'istante. Con il passare del tempo il punto si muove seguendo le equazioni di Hamilton; se il sistema è isolato si muove sulla superficie di energia costante $\mathcal H(q,p)=E$ (Dispense, p. 43).

Seguire quella traiettoria per $10^{23}$ particelle è impossibile e inutile. Rinunciamo e ci chiediamo qualcosa di più modesto: con che **probabilità** il sistema si trova in un elemento di volume $d^{3N}q\,d^{3N}p$ attorno a $(q,p)$? Questa densità $\rho(q,p)$ descrive un **insieme** (o ensemble) di Gibbs: tante copie immaginarie del sistema, tutte con gli stessi $N$, $V$, $E$, distribuite nello spazio delle fasi. Le grandezze macroscopiche sono medie su questo insieme. Il teorema di Liouville garantisce che una densità che dipende solo dall'energia resta invariata nel tempo: è il candidato naturale per l'equilibrio (vedi [[spazio-delle-fasi-e-liouville]]).

## Il postulato di uguale probabilità a priori {#postulato}

> Ogni microstato compatibile con i vincoli macroscopici, qui $N$, $V$ ed $E$, ha la stessa probabilità.

È un postulato: non si dimostra, si giustifica a posteriori perché le sue conseguenze coincidono con la termodinamica. La motivazione intuitiva è una forma di onestà: se non abbiamo nessuna informazione che distingua un microstato da un altro con la stessa energia, non abbiamo motivo di preferirne nessuno (Dispense, p. 43; Appunti MS, p. 5).

Se tutti i punti con energia $E$ sono equiprobabili, la probabilità di ciascuno è uno diviso il loro numero. Il problema diventa **contare**, e prima di farlo servono due accorgimenti.

1. **L'energia non è mai nota con precisione infinita.** La superficie $\mathcal H=E$ in $6N$ dimensioni ha volume nullo. Prendiamo allora un guscio sottile $E<\mathcal H<E+\Delta$, con $\Delta\ll E$ l'incertezza sperimentale.
2. **Un volume nello spazio delle fasi non è un numero puro**: $dq\,dp$ ha le dimensioni di un'azione. Per contare dividiamo per un «volumetto per stato» $h^{3N}$, con $h$ un'azione. Il perché di questa scelta è nella sezione [sulla costante $h$](#costante-h).

Il numero di microstati nel guscio è allora
$$\Gamma_\Delta(E)=\frac{1}{h^{3N}}\int_{E<\mathcal H(q,p)<E+\Delta}d^{3N}q\,d^{3N}p ,$$
e la densità di probabilità microcanonica è costante nel guscio e nulla fuori:
$$\rho(q,p)=\begin{cases}\dfrac{1}{h^{3N}\,\Gamma_\Delta(E)} & E<\mathcal H(q,p)<E+\Delta\\[2mm] 0 & \text{altrimenti.}\end{cases}$$
(Dispense, pp. 43–44.)

:::: {.passaggi titolo="Lo stesso conteggio scritto con θ e δ"}
Con la funzione gradino $\theta(x)$, che vale 1 per $x>0$ e 0 per $x<0$, l'indicatrice del guscio è $\theta(\mathcal H-E)-\theta(\mathcal H-E-\Delta)$: vale 1 solo se $\mathcal H$ supera $E$ ma non $E+\Delta$. Quindi
$$\Gamma_\Delta(E)=\frac{1}{h^{3N}}\int d^{3N}q\,d^{3N}p\,\big[\theta(\mathcal H-E)-\theta(\mathcal H-E-\Delta)\big].$$
Per $\Delta$ piccolo la differenza di due gradini spostati di $\Delta$ è $\Delta$ volte la derivata del gradino, che è la delta di Dirac:
$$\Gamma_\Delta(E)\simeq\frac{\Delta}{h^{3N}}\int d^{3N}q\,d^{3N}p\;\delta(\mathcal H-E)\equiv\Delta\,\Gamma(E).$$
Così la densità si scrive in forma compatta, $\rho(q,p)=\delta(\mathcal H(q,p)-E)/\big(h^{3N}\Gamma(E)\big)$, e la condizione $\int\rho=1$ è proprio la definizione di $\Gamma(E)$ (Dispense, p. 44).

**Perché la derivata del gradino è una delta.** Presa una funzione di prova $P(x)$ che si annulla all'infinito e integrando per parti:
$$\begin{aligned}\int_{-\infty}^{\infty}P(x)\,\frac{d\theta(x-x_0)}{dx}\,dx&=\Big[\theta P\Big]_{-\infty}^{\infty}-\int_{x_0}^{\infty}\frac{dP}{dx}\,dx\\&=0-\big(P(\infty)-P(x_0)\big)=P(x_0),\end{aligned}$$
che è esattamente ciò che fa $\delta(x-x_0)$ (Dispense, p. 50).
::::

**Un esempio da fare a mano.** Due particelle libere e non interagenti su un segmento di lunghezza $L$, con energia tra $E_0$ ed $E_0+\Delta E$. Lo spazio delle fasi ha 4 dimensioni, $(q_1,q_2,p_1,p_2)$, e si separa in due parti.

- **Coordinate:** ogni $q_i$ va da 0 a $L$, nessun vincolo. Il contributo è un quadrato di area $L^2$.
- **Impulsi:** $(p_1^2+p_2^2)/2m=E_0$ è una circonferenza di raggio $R=\sqrt{2mE_0}$. Il guscio è un anello di area $2\pi R\,dR$. Da $R^2=2mE$ segue $R\,dR=m\,dE$, quindi l'area è $2\pi m\,\Delta E$.

$$\Gamma_\Delta=\frac{1}{h^2}\,L^2\cdot2\pi m\,\Delta E .$$
Curiosità: in due dimensioni degli impulsi l'area dell'anello non dipende da $E_0$, perché la circonferenza cresce come $R$ mentre lo spessore cala come $1/R$. Con $3N$ dimensioni non sarà più così: il conteggio cresce come una potenza enorme di $E$ (Dispense, p. 45).

## Contare gli stati: Σ, Γ e ω {#contare}

Il guscio è scomodo da calcolare. Conviene contare prima **tutti** gli stati con energia minore di $E$, il **volume** nello spazio delle fasi:
$$\Sigma(E)=\frac{1}{h^{3N}}\int_{\mathcal H(q,p)<E}d^{3N}q\,d^{3N}p .$$
Il guscio è la differenza tra due volumi, e per $\Delta\ll E$ si scrive con la derivata:
$$\Gamma_\Delta(E)=\Sigma(E+\Delta)-\Sigma(E)\simeq\omega(E)\,\Delta,\qquad \omega(E)=\frac{\partial\Sigma}{\partial E}=\Gamma(E).$$
$\omega(E)$ è la **densità degli stati**: quanti stati ci sono per unità di energia attorno a $E$ (Dispense, p. 46).

Abbiamo così tre candidati per «il numero di stati», cioè $\Sigma$, $\Gamma_\Delta$ e $\Gamma=\omega$. La prossima sezione mostra che, per l'entropia, fa lo stesso quale si usa.

## In tante dimensioni il volume sta nella buccia {#alta-dimensione}

::: idea
Un'arancia ha la buccia sottile, eppure in 3 dimensioni la buccia contiene una frazione apprezzabile del volume. In $D$ dimensioni la frazione di volume in un guscio di spessore relativo $\epsilon$ è $1-(1-\epsilon)^D$. Per $D=3N\approx10^{24}$ anche un guscio di spessore relativo $10^{-10}$ contiene praticamente **tutto** il volume: $(1-10^{-10})^{10^{24}}\approx e^{-10^{14}}$. Un'arancia a $10^{24}$ dimensioni è tutta buccia.
:::

Il volume di un'ipersfera di raggio $r$ in $D$ dimensioni cresce come $C_Dr^D$. Per dimezzare il volume il raggio va ridotto a $r'=(1/2)^{1/D}\,r$: per $D=2$ serve $r'\simeq0{,}71\,r$, per $D=3$ $r'\simeq0{,}79\,r$, per $D=10$ $r'\simeq0{,}93\,r$, per $D=100$ $r'\simeq0{,}993\,r$. Per $D$ dell'ordine del numero di Avogadro $r'$ e $r$ sono indistinguibili (Dispense, p. 52).

::: attenzione
**Una svista nelle dispense.** A p. 52 le dispense scrivono «per $D=10$, $r'=0{,}5^{0{,}1}r=0{,}993\,r$». Il conto dà $0{,}5^{0{,}1}=0{,}933$; il valore $0{,}993$ corrisponde a $D=100$. Il ragionamento non cambia. Il calcolo è mio, da verificare a lezione.
:::

::: {.lab-segnaposto tipo="guscio"}
:::

**Conseguenza per l'entropia.** Per il gas ideale vedremo che $\Sigma\propto E^{3N/2}$, quindi $\omega=\partial\Sigma/\partial E=\frac{3N}{2E}\Sigma$ e
$$\ln\omega=\ln\Sigma+\ln\frac{3N}{2E},\qquad \ln\Gamma_\Delta=\ln\omega+\ln\Delta .$$
Le differenze sono logaritmi di $N$ o di $\Delta$, mentre $\ln\Sigma$ è proporzionale a $N$. Quindi, a meno di termini $O(\ln N)$, trascurabili rispetto a $N$,
$$S=k_B\ln\Gamma_\Delta\simeq k_B\ln\Gamma\simeq k_B\ln\Sigma$$
(Dispense, p. 52). In pratica si usa quello che si calcola meglio, quasi sempre $\Sigma$.

## L'entropia di Boltzmann {#entropia}

Definiamo
$$\boxed{S(E,V)=k_B\ln\Gamma_\Delta(E)}$$
con $k_B$ la costante di Boltzmann. L'entropia statistica è il logaritmo del numero di microstati accessibili. Resta da far vedere che si comporta come l'entropia della termodinamica: deve essere **additiva** e deve **crescere** fino all'equilibrio (Dispense, p. 46; Appunti MS, pp. 5–6).

::: idea
**Perché proprio il logaritmo?** Se due sistemi sono indipendenti, a ogni microstato del primo si può affiancare ogni microstato del secondo, quindi i conteggi si **moltiplicano**: $\Gamma=\Gamma_1\Gamma_2$. L'entropia invece deve **sommarsi**, $S=S_1+S_2$. L'unica funzione che trasforma prodotti in somme è il logaritmo.
:::

**Additività, il conto.** Due sistemi si scambiano energia, con $E_1+E_2=E$, e possono dividersela in tanti modi. Dividiamo l'asse dell'energia in intervalli larghi $\Delta$: ci sono $E/\Delta$ divisioni possibili, e per ognuna il numero di stati è $\Gamma_1(E_i)\Gamma_2(E-E_i)$. Il totale è
$$\Gamma(E)=\sum_{i=1}^{E/\Delta}\Gamma_1(E_i)\,\Gamma_2(E-E_i).$$
Chiamiamo $\bar E_1$ la divisione che dà il termine più grande. Tutti i termini sono positivi, quindi la somma è almeno il suo termine massimo e al più $E/\Delta$ volte quel termine:
$$\Gamma_1(\bar E_1)\Gamma_2(E-\bar E_1)\le\Gamma(E)\le\frac{E}{\Delta}\,\Gamma_1(\bar E_1)\Gamma_2(E-\bar E_1).$$
Prendendo il logaritmo, i due estremi differiscono di $k_B\ln(E/\Delta)$. Ora $\ln\Gamma_1\sim N_1$ e $\ln\Gamma_2\sim N_2$, mentre $\ln(E/\Delta)\sim\ln N$: per $N\sim10^{23}$ il primo vale circa $10^{23}$ e il secondo circa 50. Dunque
$$S(E)=S_1(\bar E_1)+S_2(\bar E_2)+O(\ln N).$$
L'entropia è additiva, e la somma è dominata **da un solo termine**: quasi certamente il sottosistema 1 ha energia $\bar E_1$ (Dispense, pp. 46–47; Appunti MS, pp. 6–7).

## Equilibrio termico: nasce la temperatura {#equilibrio-termico}

Chi decide $\bar E_1$? È la divisione che massimizza $\Gamma_1(E_1)\Gamma_2(E-E_1)$, quindi anche il suo logaritmo. Derivando rispetto a $E_1$, con $dE_2/dE_1=-1$:
$$\frac{d}{dE_1}\Big[\ln\Gamma_1(E_1)+\ln\Gamma_2(E-E_1)\Big]=0\quad\Longrightarrow\quad\frac{\partial S_1}{\partial E_1}\Big|_{\bar E_1}=\frac{\partial S_2}{\partial E_2}\Big|_{\bar E_2}.$$
All'equilibrio c'è una grandezza uguale nei due sistemi. La termodinamica la chiama temperatura, e la definizione che la fa coincidere con quella termodinamica è
$$\boxed{\frac{1}{T}=\frac{\partial S}{\partial E}\Big|_V}$$
così che la condizione di equilibrio è $T_1=T_2$ (Dispense, p. 48; Appunti MS, p. 7).

::: idea
**Perché la temperatura è l'inverso di una pendenza.** $\partial S/\partial E$ dice quanta entropia guadagna un sistema per ogni unità di energia ricevuta. Se il sistema 1 ha pendenza più grande del 2, spostare energia da 2 a 1 fa guadagnare a 1 più entropia di quanta ne perde 2: il conteggio totale cresce, e l'energia fluisce così. Un corpo **freddo** è uno con pendenza **grande**: ha fame di energia. Per questo $T$ sta al denominatore.
:::

:::: {.passaggi titolo="Lo stesso risultato con le delta e il punto di sella"}
Due volumi $V_1$, $V_2$ separati da un setto fisso che lascia passare energia ma non particelle. Se l'interazione attraverso il setto è trascurabile, $\mathcal H=\mathcal H_1+\mathcal H_2$ e
$$\Gamma(E)=\int d\Gamma_1\,d\Gamma_2\;\delta(\mathcal H_1+\mathcal H_2-E).$$
Moltiplichiamo per due «uni» scritti come $\int dE_1\,\delta(\mathcal H_1-E_1)$ e $\int dE_2\,\delta(\mathcal H_2-E_2)$, e scambiamo l'ordine degli integrali. Dentro le delta possiamo sostituire $\mathcal H_1\to E_1$ e $\mathcal H_2\to E_2$:
$$\begin{aligned}\Gamma(E)&=\int dE_1\,dE_2\;\delta(E_1+E_2-E)\Big[\int d\Gamma_1\delta(\mathcal H_1-E_1)\Big]\Big[\int d\Gamma_2\delta(\mathcal H_2-E_2)\Big]\\&=\int dE_1\,\Gamma_1(E_1)\,\Gamma_2(E-E_1).\end{aligned}$$
Scrivendo $\Gamma=e^{S/k_B}$:
$$\Gamma(E)=\int dE_1\;e^{[S_1(E_1)+S_2(E-E_1)]/k_B}.$$
L'esponente è proporzionale a $N$, quindi l'integrale è dominato dal massimo dell'esponente (**metodo del punto di sella**): $dS_1/dE_1-dS_2/dE_2=0$, la stessa condizione di prima (Dispense, pp. 48–49; Appunti MS, pp. 8–9).

**Quanto è stretto il picco** (calcolo mio, coerente con la sezione [Fluttuazioni](#fluttuazioni)). Sviluppando l'esponente al secondo ordine attorno a $\bar E_1$ e usando $\partial^2S/\partial E^2=\partial(1/T)/\partial E=-1/(T^2C_V)$:
$$e^{[S_1+S_2]/k_B}\propto\exp\Big[-\frac{(E_1-\bar E_1)^2}{2k_BT^2}\Big(\frac{1}{C_1}+\frac{1}{C_2}\Big)\Big],$$
una gaussiana con varianza $\sigma^2=k_BT^2\,C_1C_2/(C_1+C_2)$. Poiché $C\sim Nk_B$ ed $E\sim Nk_BT$, la larghezza relativa è $\sigma/\bar E_1\sim1/\sqrt N$.

Le dispense mostrano anche che il valor medio dell'energia del sottosistema 1, $\langle\mathcal H_1\rangle$, coincide con $\bar E_1$: con le stesse delta si trova $\langle\mathcal H_1\rangle=\frac{1}{\Gamma}\int dE_1\,E_1\,\Gamma_1\Gamma_2$, e il fattore $E_1$ nell'esponente pesa come $\ln E_1\sim\ln N$, trascurabile rispetto a $S\sim N$ (Dispense, p. 50).
::::

## Equilibrio meccanico: nasce la pressione {#equilibrio-meccanico}

Ora il setto non lascia passare energia (è adiabatico) ma può scorrere: $V_1$ e $V_2$ cambiano, con $V_1+V_2=V$ fisso. Lo stesso ragionamento, con le delta messe sui volumi invece che sulle energie, dà
$$\Gamma=\int dV_1\;e^{[S_1(E_1,V_1)+S_2(E_2,V-V_1)]/k_B}\quad\Longrightarrow\quad\frac{\partial S_1}{\partial V_1}\Big|_{\bar V_1}=\frac{\partial S_2}{\partial V_2}\Big|_{\bar V_2}.$$
Il setto si sposta finché questa grandezza non è uguale dalle due parti. Definendo
$$\boxed{\frac{P}{T}=\frac{\partial S}{\partial V}\Big|_E}$$
la condizione dice che il setto si ferma quando le pressioni sono uguali (Dispense, pp. 50–52).

## Il collegamento con la termodinamica {#termodinamica}

Con le due definizioni il differenziale dell'entropia è
$$dS=\frac{\partial S}{\partial E}dE+\frac{\partial S}{\partial V}dV=\frac{1}{T}dE+\frac{P}{T}dV\quad\Longleftrightarrow\quad dE=T\,dS-P\,dV,$$
cioè il primo principio della termodinamica per trasformazioni reversibili. In più l'entropia statistica cresce nella termalizzazione: unendo due sistemi il conteggio va verso il suo termine massimo (Dispense, p. 53; Appunti MS, p. 10).

**La ricetta del microcanonico.** Data un'hamiltoniana:

1. calcola $\Sigma(E,V)$, oppure $\Gamma$ o $\omega$;
2. ricava $S(E,V)=k_B\ln\Sigma$;
3. inverti per avere $E(S,V)$;
4. ottieni il resto: $T=(\partial E/\partial S)_V$, $P=-(\partial E/\partial V)_S$, $C_V=(\partial E/\partial T)_V$, e con le trasformate di Legendre $A=E-TS$ e $G=E-TS+PV$.

:::: {.passaggi titolo="Perché P = −(∂E/∂V) a S costante"}
Per tre variabili legate da una relazione vale la regola ciclica
$$\Big(\frac{\partial E}{\partial V}\Big)_S\Big(\frac{\partial V}{\partial S}\Big)_E\Big(\frac{\partial S}{\partial E}\Big)_V=-1 .$$
Sostituendo $(\partial V/\partial S)_E=1/(\partial S/\partial V)_E=T/P$ e $(\partial S/\partial E)_V=1/T$:
$$\Big(\frac{\partial E}{\partial V}\Big)_S\cdot\frac{T}{P}\cdot\frac{1}{T}=-1\quad\Longrightarrow\quad P=-\Big(\frac{\partial E}{\partial V}\Big)_S .$$
(Dispense, pp. 53–54.)
::::

## Perché si divide per h^3N^ {#costante-h}

$\Gamma_\Delta$ dovrebbe essere un numero puro, perché conta stati. L'integrale $\int d^{3N}q\,d^{3N}p$ ha però le dimensioni di (lunghezza × impulso)$^{3N}$, cioè di un'azione alla $3N$. Serve un'unità di volume per stato.

La meccanica quantistica la fornisce: due stati con $\Delta x\,\Delta p_x\lesssim h$ non si possono distinguere, per il principio di indeterminazione. Ha quindi senso dividere lo spazio delle fasi in celle di volume $h$ per ogni coppia $(q,p)$, e contare le celle. Con questa scelta il conteggio classico coincide con quello quantistico nel limite in cui la descrizione classica funziona (Dispense, p. 56). Da qui in poi
$$\Gamma(E)\equiv\frac{1}{h^{3N}}\int d^{3N}q\,d^{3N}p\;\delta(\mathcal H-E).$$

::: attenzione
Il valore di $h$ non cambia né la temperatura né la pressione, che sono derivate di $S$: una costante moltiplicativa in $\Gamma$ diventa una costante additiva in $S$. Cambia invece il valore assoluto dell'entropia, e diventa essenziale quando si confrontano sistemi diversi o si parla di potenziale chimico.
:::

## Il teorema di equipartizione {#equipartizione}

::: idea
Ogni grado di libertà che entra **quadraticamente** nell'energia, come $p^2/2m$ per un impulso o $\tfrac12m\omega^2q^2$ per un oscillatore, riceve in media la stessa quota di energia, $\tfrac12k_BT$. La temperatura è la «tariffa» per ogni modo di immagazzinare energia.
:::

Sia $x_i$ uno qualunque dei $6N$ $q$ o $p$. Il risultato da dimostrare è
$$\Big\langle x_i\frac{\partial\mathcal H}{\partial x_j}\Big\rangle=\delta_{ij}\,k_BT .$$

:::: {.passaggi titolo="La dimostrazione, passo per passo"}
**1. La media sul guscio diventa una derivata di un integrale sul volume.** Con $d\Gamma=dq\,dp$ e $\Gamma_\Delta=\Delta\,\partial\Sigma/\partial E$:
$$\Big\langle x_i\frac{\partial\mathcal H}{\partial x_j}\Big\rangle=\frac{1}{\Gamma_\Delta}\int_{E<\mathcal H<E+\Delta}d\Gamma\;x_i\frac{\partial\mathcal H}{\partial x_j}=\frac{\Delta}{\Gamma_\Delta}\frac{\partial}{\partial E}\int_{\mathcal H<E}d\Gamma\;x_i\frac{\partial\mathcal H}{\partial x_j}.$$

**2. Un'integrazione per parti.** Poiché $E$ non dipende da $x_j$ e $\partial x_i/\partial x_j=\delta_{ij}$,
$$x_i\frac{\partial\mathcal H}{\partial x_j}=\frac{\partial}{\partial x_j}\big[x_i(\mathcal H-E)\big]-\delta_{ij}(\mathcal H-E).$$

**3. Il termine di bordo è nullo.** Integrando il primo termine su $x_j$, a tutte le altre variabili fisse, resta $x_i(\mathcal H-E)$ valutato agli estremi della regione $\mathcal H<E$. Agli estremi $\mathcal H=E$, quindi vale zero.

**4. Resta un integrale semplice:**
$$\int_{\mathcal H<E}d\Gamma\;x_i\frac{\partial\mathcal H}{\partial x_j}=\delta_{ij}\int_{\mathcal H<E}d\Gamma\,(E-\mathcal H).$$

**5. La derivata rispetto a $E$** di quest'ultimo integrale. Il bordo non contribuisce, perché lì $E-\mathcal H=0$, e resta $\int_{\mathcal H<E}d\Gamma=\Sigma(E)$ (nelle stesse unità). Quindi
$$\Big\langle x_i\frac{\partial\mathcal H}{\partial x_j}\Big\rangle=\delta_{ij}\frac{\Delta\,\Sigma}{\Gamma_\Delta}=\delta_{ij}\frac{\Sigma}{\partial\Sigma/\partial E}=\frac{\delta_{ij}}{\partial\ln\Sigma/\partial E}.$$

**6. Si riconosce la temperatura.** A meno di $O(\ln N)$ si ha $S=k_B\ln\Sigma$, quindi $\partial\ln\Sigma/\partial E=1/(k_BT)$ (Dispense, pp. 54–55; Appunti MS, pp. 11–12).
::::

**Tre conseguenze.**

- $x_i=p_i$ con $\mathcal H=\sum_ip_i^2/2m+V(q)$: $\langle p_i^2/m\rangle=k_BT$. Ogni componente dell'impulso porta $\tfrac12k_BT$ di energia cinetica, e in totale $\langle E_{\rm kin}\rangle=\tfrac32Nk_BT$.
- Hamiltoniana quadratica, $\mathcal H=\sum_iA_ix_i^2$: $x_i\,\partial\mathcal H/\partial x_i=2A_ix_i^2$, quindi $\langle A_ix_i^2\rangle=\tfrac12k_BT$ per ogni termine quadratico.
- $x_i=q_i$, sommando su tutti e usando $\partial\mathcal H/\partial q_i=-\dot p_i$: $\big\langle\sum_iq_i\dot p_i\big\rangle=-3Nk_BT$, il **teorema del viriale** (Dispense, pp. 55–56; Appunti MS, p. 12).

## Il gas ideale classico {#gas-ideale}

Il gas ideale ha solo energia cinetica, $\mathcal H=\sum_{i=1}^{N}\mathbf p_i^2/2m$. Seguiamo la ricetta, cominciando da $\Sigma(E)$.

**Le coordinate.** Il vincolo $\mathcal H<E$ riguarda solo gli impulsi, quindi ogni particella può stare ovunque nel volume: le coordinate danno $V^N$.

**Gli impulsi.** $\sum p_i^2<2mE$ è l'interno di un'ipersfera di raggio $R=\sqrt{2mE}$ in $3N$ dimensioni. Detto $\Omega_n(R)=C_nR^n$ il volume dell'ipersfera in $n$ dimensioni,
$$\Sigma(E)=\frac{V^N}{h^{3N}}\,C_{3N}\,(2mE)^{3N/2}=C_{3N}\Big[\frac{V}{h^3}(2mE)^{3/2}\Big]^N .$$

:::: {.passaggi titolo="Il volume dell'ipersfera con un trucco gaussiano"}
L'integrale gaussiano in $n$ dimensioni si può calcolare in due modi.

**In coordinate cartesiane** si fattorizza:
$$\int d^nx\;e^{-(x_1^2+\dots+x_n^2)}=\Big(\int_{-\infty}^{\infty}dx\,e^{-x^2}\Big)^n=\pi^{n/2}.$$

**In coordinate sferiche** si integra per gusci: la superficie dell'ipersfera di raggio $R$ è $S(R)=d\Omega_n/dR=nC_nR^{n-1}$, quindi
$$\begin{aligned}\int d^nx\;e^{-R^2}&=nC_n\int_0^{\infty}R^{n-1}e^{-R^2}dR\overset{t=R^2}{=}\frac{n}{2}C_n\int_0^\infty t^{n/2-1}e^{-t}dt\\&=\frac n2\,C_n\,\Gamma\!\Big(\frac n2\Big)=C_n\,\Gamma\!\Big(\frac n2+1\Big).\end{aligned}$$
Uguagliando i due risultati:
$$C_n=\frac{\pi^{n/2}}{\Gamma(n/2+1)}.$$
Per controllo, $n=2$ dà $C_2=\pi$ e $n=3$ dà $C_3=\pi^{3/2}/\Gamma(5/2)=\tfrac43\pi$: le formule note (Dispense, p. 57). Per $n$ grande, con Stirling, $\ln C_n\simeq\frac n2\ln\pi-\frac n2\ln\frac n2+\frac n2$ (Dispense, p. 58).
::::

**L'entropia.** Mettendo insieme $S=k_B\ln\Sigma$ e lo sviluppo di $\ln C_{3N}$, i termini si raccolgono in
$$S(E,V)=Nk_B\ln\Big[V\Big(\frac{4\pi m}{3h^2}\frac EN\Big)^{3/2}\Big]+\frac32Nk_B .$$
**La termodinamica** si ottiene derivando:
$$\frac1T=\frac{\partial S}{\partial E}=\frac32\frac{Nk_B}{E}\ \Rightarrow\ E=\frac32Nk_BT,$$
$$\frac PT=\frac{\partial S}{\partial V}=\frac{Nk_B}{V}\ \Rightarrow\ PV=Nk_BT .$$
Ritroviamo l'energia dell'equipartizione e l'equazione di stato dei gas perfetti. Invertendo si ha anche $E(S,V,N)=\frac{3h^2N}{4\pi mV^{2/3}}\exp\big[\frac23\big(\frac{S}{Nk_B}-\frac32\big)\big]$, da cui $T=\partial E/\partial S$ ridà $E=\frac32Nk_BT$ (Dispense, pp. 57–58; Appunti MS, p. 13).

::: attenzione
**C'è un problema serio: questa entropia non è estensiva.** Dentro il logaritmo $E/N$ è intensivo, ma $V$ no. Con un modello giocattolo, $S_1=N_1\ln V_1$: raddoppiando il sistema si ottiene $S_2=2N_1\ln(2V_1)=2S_1+2N_1\ln2\neq2S_1$. Se dentro il logaritmo ci fosse $V/N$ tutto tornerebbe: $2N_1\ln\frac{2V_1}{2N_1}=2S_1$. **Manca una $N$ nel logaritmo.** A contare davvero, per un gas, deve essere il volume per particella (Dispense, pp. 58–59).
:::

## Il paradosso di Gibbs {#gibbs}

Il problema esplode quando si mescolano due gas. Prendiamo $N_1$ particelle in $V_1$ ed $N_2$ in $V_2$, **alla stessa temperatura e pressione**, separate da un setto. Stessa $T$ vuol dire $E_1/N_1=E_2/N_2=E/N$; stessa $P$ vuol dire $V_1/N_1=V_2/N_2=V/N$ (Dispense, pp. 59–60).

**Gas diversi**, per esempio atomi rossi e verdi. Tolto il setto, ogni specie esplora tutto il volume $V$ invece di $V_i$. Con l'entropia appena trovata, scritta come $S=Nk_B\ln[V(aE/N)^{3/2}]$ con $a=\frac{4\pi m}{3h^2}e$:
$$\begin{aligned}S^{\rm dopo}-S^{\rm prima}&=N_1k_B\ln\frac{V}{V_1}+N_2k_B\ln\frac{V}{V_2}\\&=k_B\Big[N_1\ln\frac{N}{N_1}+N_2\ln\frac{N}{N_2}\Big]\equiv S_{\rm mix}.\end{aligned}$$
È l'**entropia di mescolamento**. È positiva e ragionevole: il mescolamento di due gas diversi è irreversibile e non torna indietro da solo. Per due metà uguali vale $Nk_B\ln2$ (Dispense, pp. 60–61).

**Gas uguali.** Ora le particelle sono tutte dello stesso tipo. Togliere il setto non cambia niente di osservabile: se lo rimettiamo, siamo di nuovo nello stato iniziale. L'entropia **non** deve cambiare. Ma la formula, che non sa se le particelle sono uguali o diverse, dà di nuovo $S_{\rm mix}>0$. È il **paradosso di Gibbs**.

**La soluzione di Gibbs.** Nel contare i microstati abbiamo trattato le particelle come etichettate: scambiare la particella 3 con la 17 dà un punto diverso dello spazio delle fasi, quindi un microstato diverso. Ma se le particelle sono identiche, quei due punti descrivono **la stessa** situazione fisica. Ogni microstato è stato contato $N!$ volte, una per ogni permutazione. Basta dividere:
$$\Gamma(E)=\frac{1}{N!\,h^{3N}}\int d^{3N}q\,d^{3N}p\;\delta(\mathcal H-E).$$
Sottraendo $\ln N!\simeq N\ln N-N$ all'entropia si ottiene la **formula di Sackur-Tetrode**:
$$S(E,V)=Nk_B\ln\Big[\frac VN\Big(\frac{4\pi m}{3h^2}\frac EN\Big)^{3/2}\Big]+\frac52Nk_B ,$$
che contiene solo grandezze intensive nel logaritmo ed è estensiva (Dispense, pp. 61–62; Appunti MS, pp. 14–15).

**La verifica.** Con gas uguali, prima del mescolamento $V_i/N_i=V/N$ ed $E_i/N_i=E/N$, quindi
$$S^{\rm prima}=\sum_{i=1,2}N_ik_B\ln\Big[\frac VN\Big(\frac{4\pi m}{3h^2}\frac EN\Big)^{3/2}\Big]+\frac52Nk_B=S^{\rm dopo}:$$
nessuna entropia di mescolamento. Con gas diversi si divide per $N_1!\,N_2!$ invece che per $N!$: dopo il mescolamento ogni specie ha $V/N_i$ al posto di $V_i/N_i$, e si ritrova esattamente $S_{\rm mix}$ (Dispense, p. 62).

::: idea
**La lezione profonda.** In fisica classica le particelle sono sempre distinguibili in linea di principio: potremmo seguirle. Il fattore $1/N!$ è un'anticipazione della meccanica quantistica, in cui particelle identiche sono davvero indistinguibili. Lo ritroveremo in forma esatta nei [[gas-quantistici-ideali]].
:::

## Esercizio svolto: M oscillatori armonici {#oscillatori}

:::: esercizio
Calcolare l'entropia e l'energia di $M$ oscillatori armonici unidimensionali, indipendenti e distinguibili, con hamiltoniana $\mathcal H=\sum_{i=1}^M\big(\frac{p_i^2}{2m}+\frac12m\omega_i^2q_i^2\big)$ (Dispense, p. 63).

::: soluzione
**1. Cambio di variabili** per trasformare l'energia in una somma di quadrati: $\tilde p_i=p_i/\sqrt{2m}$ e $\tilde q_i=\sqrt{m\omega_i^2/2}\;q_i$. Allora $\mathcal H=\sum_i(\tilde p_i^2+\tilde q_i^2)$ e lo jacobiano è $d\tilde p_i\,d\tilde q_i=\frac{\omega_i}{2}dp_i\,dq_i$.

**2. Il volume.** $\mathcal H<E$ è un'ipersfera di raggio $\sqrt E$ in $2M$ dimensioni ($M$ impulsi e $M$ coordinate):
$$\Sigma(E)=\frac{1}{h^M}\prod_{i=1}^M\frac{2}{\omega_i}\;C_{2M}\,(\sqrt E)^{2M},\qquad C_{2M}=\frac{\pi^M}{M!}.$$
Con $h=2\pi\hbar$ i fattori si raccolgono in $\Sigma(E)=\prod_i\frac{1}{\hbar\omega_i}\,\frac{E^M}{M!}$.

**3. L'entropia**, con Stirling:
$$\frac{S}{k_B}=M\ln E-M\ln M+M-\sum_i\ln\hbar\omega_i ,$$
che per frequenze tutte uguali diventa $\frac{S}{k_B}=M\Big[1+\ln\frac{E}{M\hbar\omega}\Big]$.

**4. La temperatura:** $\frac1T=\frac{\partial S}{\partial E}=\frac{Mk_B}{E}$, quindi $E=Mk_BT$. Ogni oscillatore ha due termini quadratici e porta $k_BT$, in accordo con l'equipartizione (Dispense, pp. 63–64).

**Un'altra strada, per controllo.** Si possono trattare impulsi e coordinate come due sottosistemi in equilibrio termico, con $E_p+E_q=E$ e la stessa $T$. Ciascuno è un'ipersfera in $M$ dimensioni, e $\frac{\partial S_p}{\partial E_p}=\frac{M}{2E_p}=\frac{1}{k_BT}$ dà $E_p=E_q=\frac12Mk_BT$. La somma dà ancora $E=Mk_BT$ e la stessa entropia (Dispense, pp. 64–65).
:::
::::

::: attenzione
Questo risultato ha un difetto fisico. Il calore specifico $C_V=Mk_B$ non va a zero per $T\to0$, contro il terzo principio e contro i dati sui solidi. La cura è quantistica (Einstein, Debye): vedi [[corpo-nero-e-solidi]]. Le dispense lo annotano come punto da discutere (Dispense, p. 64).
:::

## Oltre lo spazio delle fasi: il sistema a due livelli {#due-livelli}

Finora un microstato era un punto dello spazio delle fasi. A volte però le particelle non sono descritte da coordinate e impulsi ma da stati discreti, e allora un microstato è una scelta discreta. L'esempio più semplice è il sistema a due livelli, che ritorna in molti campi: spin, vetri, qubit (Dispense, pp. 65–66).

$N$ particelle, ciascuna con due livelli di energia, $0$ ed $\varepsilon$. Se l'energia totale è $E$, ci sono $n=E/\varepsilon$ particelle eccitate.

**Contare.** Un microstato è la scelta di **quali** $n$ particelle sono eccitate:
$$\Gamma(n)=\binom Nn=\frac{N!}{n!\,(N-n)!},$$
$$\frac{S}{k_B}\simeq N\ln N-n\ln n-(N-n)\ln(N-n).$$

**La temperatura.** Con $E=n\varepsilon$:
$$\frac1T=\frac{\partial S}{\partial E}=\frac1\varepsilon\frac{\partial S}{\partial n}=\frac{k_B}{\varepsilon}\ln\frac{N-n}{n}\quad\Longrightarrow\quad\frac{n}{N-n}=e^{-\beta\varepsilon},$$
$$n=N\frac{e^{-\beta\varepsilon}}{1+e^{-\beta\varepsilon}},$$
con $\beta=1/k_BT$. Il rapporto tra popolazione eccitata e fondamentale è il fattore di Boltzmann $e^{-\beta\varepsilon}$: lo ritroveremo come regola generale nell'[[insieme-canonico]].

**Il calore specifico.** Da $E=N\varepsilon\,e^{-\beta\varepsilon}/(1+e^{-\beta\varepsilon})$, derivando rispetto a $T$:
$$C_V=Nk_B\,\frac{(\beta\varepsilon)^2\,e^{-\beta\varepsilon}}{(1+e^{-\beta\varepsilon})^2}.$$
Ha un **picco** (anomalia di Schottky). A bassa $T$ non c'è energia per eccitare nessuno, e $C_V\to0$ esponenzialmente; ad alta $T$ i due livelli sono già quasi equipopolati e aggiungere energia non cambia più nulla (Dispense, pp. 66–67; Appunti MS, pp. 16–17).

::: attenzione
**Dove sta il picco.** Le dispense (p. 67) scrivono che il picco cade «intorno a $\beta\varepsilon\approx0{,}41$». Il grafico della stessa pagina ha però in ascissa $k_BT/\varepsilon$, e il massimo di $x^2e^{-x}/(1+e^{-x})^2$ si trova a $x=\beta\varepsilon\simeq2{,}40$, cioè $k_BT/\varepsilon\simeq0{,}42$. Il valore giusto è quindi $k_BT/\varepsilon\approx0{,}42$. Il calcolo è mio.
:::

**Le temperature negative.** Guardiamo $S(n)$: è nulla per $n=0$ e per $n=N$ e massima per $n=N/2$. La pendenza $1/T$ è positiva per $n<N/2$, nulla in $n=N/2$ e **negativa** per $n>N/2$. Aumentando l'energia la temperatura va da $0^+$ a $+\infty$ (a metà), poi salta a $-\infty$ e risale verso $0^-$ (Dispense, p. 67).

::: idea
**Se le temperature negative non ti tornano** (il quaderno annota «non l'ho ben capito», Appunti MS, p. 17). Il trucco è smettere di pensare a $T$ e pensare a $\beta=1/k_BT$, che è la grandezza che compare davvero, come $\partial S/\partial E$. Aggiungendo energia $\beta$ scende **con continuità**, da $+\infty$ a 0 (a metà) e poi a valori negativi. La scala «da freddo a caldo» è quindi
$$T=0^+\ \to\ T=+\infty\ \equiv\ T=-\infty\ \to\ T=0^-,$$
cioè, per $\beta$: da $+\infty$ a $0$ e poi verso $-\infty$.
Un sistema a $T<0$ **non è più freddo dello zero assoluto: è più caldo di qualunque temperatura positiva**. Messo a contatto con un sistema a $T>0$ gli cede energia, perché così entrambi guadagnano entropia: il primo perché sta sul ramo discendente di $S(E)$, il secondo perché sta su quello crescente.

Perché non si vede tutti i giorni? Serve un'energia **limitata dall'alto**, come nei due livelli. Un gas, con energia cinetica illimitata, non può avere $T<0$. E all'equilibrio con un ambiente a $T>0$ la popolazione eccitata è sempre meno della metà. Le popolazioni invertite si preparano fuori equilibrio: è così che funziona un laser, e così si sono misurate temperature negative negli spin nucleari. Questi esempi sono conoscenza generale, non vengono dalle dispense.
:::

## Fluttuazioni di un'osservabile estensiva {#fluttuazioni}

Nel microcanonico l'energia è fissata, ma un'altra grandezza $A$, per esempio l'energia di una metà del sistema, può fluttuare. La probabilità di osservare $A=a$ è la frazione degli stati che hanno sia energia $E$ sia $A=a$:
$$P(a)=\frac{\Gamma(E,a)}{\Gamma(E)}=\frac{e^{S(E,a)/k_B}}{e^{S(E)/k_B}} .$$
Sviluppiamo $S(E,a)$ attorno al suo massimo $\bar a$: $S(E,a)\simeq S(E,\bar a)+\frac12S''(\bar a)(a-\bar a)^2$, con $S''<0$. Con il punto di sella anche il denominatore si calcola, $\Gamma(E)=\int da\,e^{S(E,a)/k_B}\simeq e^{S(E,\bar a)/k_B}\sqrt{2\pi k_B/|S''|}$, e si ottiene una gaussiana normalizzata:
$$P(a)=\frac{1}{\sqrt{2\pi\sigma^2}}\,e^{-(a-\bar a)^2/2\sigma^2},\qquad\sigma^2=\frac{k_B}{|S''(\bar a)|}$$
(Dispense, pp. 67–68; Appunti MS, p. 17).

**Perché le fluttuazioni non si vedono.** Se $A$ è estensiva, $S\sim N$ e $a\sim N$, quindi $S''=\partial^2S/\partial a^2\sim N/N^2=1/N$. Allora $\sigma^2\sim N$ e
$$\frac{\sigma}{\bar a}\sim\frac{\sqrt N}{N}=\frac{1}{\sqrt N}\approx10^{-12}\quad\text{per }N\sim10^{24}.$$
Le grandezze macroscopiche hanno valori nettissimi: è per questo che la termodinamica funziona.

## Due probabilità microscopiche nel gas ideale {#probabilita-microscopiche}

Il microcanonico permette anche di chiedere qualcosa su **una** particella. Due esempi nel gas ideale (Dispense, pp. 69–71).

**Dove si trova la particella 1?** L'intuizione basta: le altre particelle non la influenzano e ogni posizione è equivalente, quindi la densità di probabilità lungo un lato $L$ della scatola è costante: $P(x_1=x)=1/L$. Il conto formale lo conferma: poiché $\mathcal H$ dipende solo dagli impulsi, gli integrali sulle coordinate si separano e restano $L^2/L^3=1/L$.

**Che impulso ha la particella 1?** Qui l'intuizione non basta. Se $p_{1x}$ è grande, alle altre particelle resta meno energia, quindi meno stati: la probabilità **non** è uniforme. Fissare $p_{1x}=p$ lascia un'ipersfera in $3N-1$ dimensioni di raggio $\sqrt{2mE-p^2}$, quindi
$$P(p_{1x}=p)=\frac{C_{3N-1}}{C_{3N}}\,\frac{(2mE-p^2)^{(3N-1)/2}}{(2mE)^{3N/2}} .$$

:::: {.passaggi titolo="Dal rapporto di ipersfere alla gaussiana"}
**Il numeratore.** L'energia di una particella è minuscola rispetto al totale, $p^2\ll2mE$, quindi
$$\begin{aligned}(2mE-p^2)^{\frac{3N-1}{2}}&=(2mE)^{\frac{3N-1}{2}}\Big(1-\frac{p^2}{2mE}\Big)^{\frac{3N-1}{2}}\\&\simeq(2mE)^{\frac{3N-1}{2}}\exp\Big[-\frac{3N}{2}\,\frac{p^2}{2mE}\Big].\end{aligned}$$

**L'esponente.** Usando $E=\frac32Nk_BT$ diventa $-p^2/(2mk_BT)$.

**Il prefattore.** Con $C_n=\pi^{n/2}/\Gamma(n/2+1)$ e $\Gamma(x+1)/\Gamma(x+1/2)\simeq\sqrt x$ per $x$ grande, $C_{3N-1}/C_{3N}\simeq\sqrt{3N/2\pi}$. Il prefattore totale è allora $\sqrt{3N/2\pi}/\sqrt{2mE}=1/\sqrt{2\pi mk_BT}$. Questa verifica è mia: la gaussiana risulta correttamente normalizzata.

$$P(p_{1x}=p)=\frac{1}{\sqrt{2\pi mk_BT}}\;e^{-p^2/2mk_BT}.$$
È la **distribuzione di Maxwell-Boltzmann** per una componente dell'impulso, ottenuta qui dal solo postulato di uguale probabilità.
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta. È il cuore del metodo Feynman: se non riesci a spiegarlo semplicemente, c'è un buco da colmare.

:::: domanda
Perché nel microcanonico si conta un guscio di spessore $\Delta$ invece della superficie esatta $\mathcal H=E$? E il risultato dipende da $\Delta$?

::: risposta
La superficie in $6N$ dimensioni ha volume nullo, e comunque l'energia è nota solo con un'incertezza finita. Il guscio dà $\Gamma_\Delta=\omega\Delta$, quindi $S=k_B\ln\omega+k_B\ln\Delta$: $\Delta$ entra solo come termine additivo $O(\ln\Delta)$, trascurabile rispetto a $S\sim N$, e scompare dalle derivate che danno $T$ e $P$.
:::
::::

:::: domanda
Perché l'entropia è il **logaritmo** del numero di stati e non il numero stesso?

::: risposta
Per sistemi indipendenti i conteggi si moltiplicano, $\Gamma=\Gamma_1\Gamma_2$, mentre l'entropia termodinamica è additiva. Il logaritmo è la funzione che trasforma prodotti in somme. In più $\Gamma$ è un numero astronomico, come $e^{10^{23}}$, mentre $\ln\Gamma$ è proporzionale a $N$, come deve essere una grandezza estensiva.
:::
::::

:::: domanda
Due sistemi sono a contatto termico. Il sistema A ha $\partial S/\partial E$ maggiore del sistema B. In che verso fluisce l'energia, e chi è più caldo?

::: risposta
L'energia va da B ad A. Spostando $\delta E$ da B ad A l'entropia totale cambia di $\big(\partial S_A/\partial E-\partial S_B/\partial E\big)\delta E>0$. Pendenza maggiore vuol dire $1/T$ maggiore, cioè $T$ minore: A è più freddo, e l'energia va dal caldo al freddo.
:::
::::

:::: domanda
In $10^{24}$ dimensioni, dove sta il volume di una sfera? Che cosa c'entra con l'entropia?

::: risposta
Quasi tutto in un guscio esterno sottilissimo: la frazione fuori da un guscio di spessore relativo $\epsilon$ è $(1-\epsilon)^D\simeq e^{-\epsilon D}$, nulla per $D$ enorme. Per questo il volume $\Sigma(E)$ e il guscio $\Gamma_\Delta(E)$ hanno logaritmi che differiscono solo per $O(\ln N)$, e si può calcolare l'entropia con il più comodo dei due.
:::
::::

:::: domanda
Quanto vale l'energia media di un oscillatore armonico classico unidimensionale a temperatura $T$? E di una molecola biatomica rigida?

::: risposta
L'oscillatore ha due termini quadratici, $p^2/2m$ e $\tfrac12m\omega^2q^2$, quindi $k_BT$. La biatomica rigida ha 3 termini traslazionali e 2 rotazionali, quindi $\tfrac52k_BT$ (classicamente; a bassa $T$ la quantistica «congela» alcuni gradi di libertà).
:::
::::

:::: domanda
Senza il fattore $1/N!$, cosa va storto nell'entropia del gas ideale? Che cosa sistema il fattore?

::: risposta
L'entropia contiene $\ln V$ invece di $\ln(V/N)$, quindi non è estensiva: raddoppiando il sistema non raddoppia. Ne segue un'entropia di mescolamento anche tra gas identici, il paradosso di Gibbs. Il fattore $1/N!$ toglie le permutazioni di particelle identiche, che contano più volte lo stesso stato fisico; con Stirling $\ln N!\simeq N\ln N-N$ porta la $N$ mancante dentro il logaritmo.
:::
::::

:::: domanda
Un sistema a due livelli con $n>N/2$ viene messo a contatto con un gas a 1000 K. Chi cede energia a chi?

::: risposta
Il sistema a due livelli cede energia al gas. Con $n>N/2$ ha $T<0$, cioè $\beta<0$: è più caldo di qualunque temperatura positiva. Cedendo energia scende lungo il ramo di $S(E)$ in cui $S$ cresce al diminuire di $E$, e il gas guadagna entropia ricevendola.
:::
::::

## Articoli correlati
- [[insieme-canonico]]: lo stesso sistema a contatto con un serbatoio; il fattore $e^{-\beta\varepsilon}$ trovato nei due livelli diventa la regola generale.
- [[meccanica-statistica/corso-e-lezioni]]: le lezioni di quest'anno su Liouville, ergodicità e $\Gamma(E)$.
- [[spazio-delle-fasi-e-liouville]]: lo spazio delle fasi, l'insieme di Gibbs e il teorema di Liouville.
- [[gas-quantistici-ideali]]: dove l'indistinguibilità diventa esatta.
- [[corpo-nero-e-solidi]]: perché il calore specifico degli oscillatori classici non va a zero, e come lo cura la quantistica.
- [[modello-di-ising-e-campo-medio]]: un altro sistema a due stati per sito, con interazione.
- [[appunti-anno-scorso]]: la mappa del quaderno.

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 43–71: postulato e conteggio pp. 43–45; Σ, Γ, ω p. 46; additività e temperatura pp. 46–48; setto fisso e mobile pp. 48–52; alta dimensione ed equivalenza di S p. 52; termodinamica pp. 53–54; equipartizione pp. 54–56; costante h p. 56; gas ideale pp. 56–59; Gibbs pp. 59–62; oscillatori pp. 63–65; due livelli pp. 65–67; fluttuazioni pp. 67–69; probabilità microscopiche pp. 69–71.
- `raw/foto appunti mec stat anno scorso/IMG_6329_COMPILED.HEIC`–`IMG_6333_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 5–18. La trascrizione integrale del quaderno sarà aggiunta quando i file saranno nel repository.
