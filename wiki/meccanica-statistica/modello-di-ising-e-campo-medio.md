---
tags: [meccanica-statistica, ising, campo-medio, transizioni-di-fase, magnetismo, lezione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-26
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
  - raw/foto appunti mec stat anno scorso/IMG_6343_COMPILED.HEIC … IMG_6348_COMPILED.HEIC
---

# Modello di Ising e campo medio

Il modello di Ising è un reticolo di spin $s_i=\pm1$ che interagiscono solo con i primi vicini. È il modello minimo per il ferromagnetismo, cioè per l'allineamento spontaneo degli spin sotto la temperatura di Curie. In una dimensione si risolve esattamente con la matrice di trasferimento, e non c'è transizione. In più dimensioni lo si tratta in campo medio (Bragg-Williams), che prevede una magnetizzazione spontanea sotto $T_c=\gamma\varepsilon/k_B$.

## Punti chiave
- **Hamiltoniana:** $\mathcal H=-\varepsilon\sum_{\langle ij\rangle}s_is_j-H\sum_is_i$, con $\varepsilon>0$ ferromagnete. La magnetizzazione è $M=\langle\sum_is_i\rangle=-\partial A/\partial H$. Spin liberi: $Q=(2\cosh\beta H)^N$ e $\langle s\rangle=\tanh\beta H$.
- **Ising 1D esatto:** con la matrice di trasferimento $Q=\mathrm{Tr}\,P^N=\lambda_+^N+\lambda_-^N$, con $\lambda_\pm=e^{\beta\varepsilon}\big[\cosh\beta H\pm\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}\big]$. Ne segue $M/N=\sinh\beta H/\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}$, nulla a $H=0$ per ogni $T>0$: in 1D non c'è transizione.
- **Correlazioni in 1D:** $\langle s_is_{i+j}\rangle=(\tanh\beta\varepsilon)^j=e^{-j/\xi}$, con $\xi\simeq\frac12e^{2\beta\varepsilon}$ a bassa $T$. La lunghezza di correlazione diverge solo per $T\to0$.
- **Bragg-Williams:** si suppone che gli spin up siano distribuiti a caso, quindi $N_{++}=\frac{N\gamma}{2}(N_+/N)^2$, con $\gamma$ il numero di primi vicini. Ne segue l'equazione autoconsistente $\bar L=\tanh(\beta H+\beta\varepsilon\gamma\bar L)$: ogni spin sente il campo esterno più un campo medio $\varepsilon\gamma\bar L$. Sotto $k_BT_c=\gamma\varepsilon$ nascono le soluzioni $\bar L=\pm L_0$, con $L_0\simeq\sqrt{3(1-T/T_c)}$.
- **Energia libera di Landau:** $f(L)=-k_BT\ln2+\frac{k_B(T-T_c)}{2}L^2+\frac{k_BT}{12}L^4-HL$. Sotto $T_c$ il minimo in $L=0$ diventa un massimo e compaiono due minimi simmetrici. Il campo medio è anche un metodo variazionale: $A\le A_0+\langle W\rangle_0$.
- **Criticità:** la suscettività diverge come $(T-T_c)^{-1}$ ed è l'integrale della funzione di correlazione. A $T_c$ vale $L\sim H^{1/3}$. Gli esponenti di campo medio, $\beta=\frac12$, $\gamma=1$, $\delta=3$, sono gli stessi di Van der Waals; quelli sperimentali sono circa $\frac13$, $\frac54$, 5.
- **Lattice gas:** un gas su reticolo con $\mathcal H=-\varepsilon\sum n_in_j$, nel gran canonico, è un modello di Ising con $J=\varepsilon/4$ e $H=\varepsilon\gamma/4+\mu/2$: la transizione liquido-gas e quella magnetica sono lo stesso problema.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** Una fila di persone deve rispondere sì o no, e a ciascuno conviene essere d'accordo con i vicini: il disaccordo costa imbarazzo. La temperatura è quanto le persone sono distratte. A temperatura zero tutti dicono la stessa cosa. Ma basta un po' di distrazione perché in una **fila** compaia un «fronte», un punto in cui si passa dal sì al no. Il fronte costa sempre la stessa energia, mentre i posti dove metterlo sono $N$: guadagna entropia $k_B\ln N$. Per $N$ enorme l'entropia vince a qualunque temperatura, e la fila si spezza in blocchi alterni: niente ordine a lungo raggio. Questo è Ising in una dimensione.

In un **piano** le cose cambiano. Per separare una regione di «no» bisogna disegnarle intorno un bordo, e il bordo costa energia proporzionale alla sua lunghezza. A bassa temperatura le isole di dissenso restano piccole e il sì vince ovunque: c'è una **transizione di fase**.

Calcolarla esattamente è difficile. Il **campo medio** semplifica: ognuno decide guardando non i suoi vicini veri, ma un sondaggio, cioè l'opinione media di tutti. Se la media pende verso il sì, ognuno è spinto verso il sì, e questo rinforza la media. Sotto una temperatura critica la media si sostiene da sola: è la magnetizzazione spontanea.
:::

La lezione segue questo filo.

1. [Il modello](#modello) e [gli spin liberi](#spin-liberi).
2. [Ising 1D risolto esattamente](#ising-1d), [perché in 1D non c'è ordine](#interfacce), [le correlazioni](#correlazioni) e [l'espansione di alta temperatura](#alta-temperatura).
3. [Il campo medio di Bragg-Williams](#bragg-williams) e [l'energia libera in funzione della magnetizzazione](#landau).
4. [Il campo medio come metodo variazionale](#variazionale), [suscettività e isoterma critica](#suscettivita), [Bethe-Peierls](#bethe-peierls).
5. [Gli esponenti critici, ritorno a Van der Waals](#esponenti-critici) e [il lattice gas](#lattice-gas).
6. [Esercizi svolti](#esercizi).

## Il modello {#modello}

In alcuni metalli, sotto una temperatura detta **di Curie**, una frazione finita degli spin atomici si allinea e il materiale si magnetizza. Il modello di Ising è una rappresentazione rozza del fenomeno, ma ha avuto un ruolo centrale nella storia della meccanica statistica, perché si risolve analiticamente in una e in due dimensioni (Dispense, p. 143).

Su ciascuno degli $N$ siti di un reticolo (lineare, quadrato, cubico…) sta uno spin che può valere solo $s=+1$ (up) o $s=-1$ (down). Spin adiacenti interagiscono con energia $-\varepsilon s_is_j$: con $\varepsilon>0$ conviene che siano paralleli (ferromagnete), con $\varepsilon<0$ antiparalleli (antiferromagnete). Con un campo esterno $H$:
$$\mathcal H\{s_i\}=-\varepsilon\sum_{\langle i,j\rangle}s_is_j-H\sum_{i=1}^Ns_i ,$$
dove $\langle i,j\rangle$ indica le coppie di primi vicini. La funzione di partizione canonica è la somma sui $2^N$ stati:
$$Q(H,T)=\sum_{s_1}\sum_{s_2}\cdots\sum_{s_N}e^{-\beta\mathcal H\{s_i\}}$$
(Dispense, p. 144; Appunti MS, pp. 39–40).

**La magnetizzazione** si ottiene derivando rispetto al campo, che fa scendere $\sum_is_i$:
$$M=\frac1\beta\frac{\partial\ln Q}{\partial H}=-\frac{\partial A}{\partial H}=\frac1Q\sum_{\{s\}}\Big(\sum_{i=1}^Ns_i\Big)e^{-\beta\mathcal H}=\Big\langle\sum_{i=1}^Ns_i\Big\rangle .$$

## Spin senza interazione {#spin-liberi}

Con $\varepsilon=0$ gli spin sono indipendenti in un campo esterno. La somma su $2^N$ stati si fattorizza in $N$ somme su due stati:
$$Q_0(H,T)=\sum_{\{s\}}e^{\beta H\sum_is_i}=\prod_i\sum_{s_i=\pm1}e^{\beta Hs_i}=\big(e^{\beta H}+e^{-\beta H}\big)^N=\big(2\cosh\beta H\big)^N,$$
$$\beta A=-N\ln(2\cosh\beta H),\qquad\langle s_i\rangle=\frac{(+1)e^{\beta H}+(-1)e^{-\beta H}}{2\cosh\beta H}=\tanh(\beta H)$$
(Dispense, p. 144). È il paramagnete: a $H=0$ la magnetizzazione è nulla, e la suscettività per spin a campo debole è $\beta$, la legge di Curie. È lo stesso comportamento dei [[insieme-canonico|dipoli nel campo]] con soli due orientamenti, ed è il sistema a due livelli del [[insieme-microcanonico]].

## Ising in una dimensione: la matrice di trasferimento {#ising-1d}

Una catena di $N$ spin con condizioni al contorno periodiche, $s_{N+1}=s_1$ (Dispense, pp. 144–145; Appunti MS, pp. 40–41):
$$\mathcal H\{s_i\}=-\varepsilon\sum_{i=1}^Ns_is_{i+1}-H\sum_{i=1}^Ns_i .$$

**Il trucco.** Il termine di campo si simmetrizza: grazie alla periodicità $\sum_is_i=\frac12\sum_i(s_i+s_{i+1})$. Così ogni addendo dell'esponente dipende **solo da due spin consecutivi**:
$$Q=\sum_{\{s\}}\prod_{i=1}^N\exp\Big\{\beta\Big[\varepsilon s_is_{i+1}+\frac H2(s_i+s_{i+1})\Big]\Big\}.$$
Ogni fattore è il numero $\langle s_i|P|s_{i+1}\rangle$, un elemento di una matrice $2\times2$, la **matrice di trasferimento**:
$$P=\begin{pmatrix}\langle1|P|1\rangle&\langle1|P|-1\rangle\\\langle-1|P|1\rangle&\langle-1|P|-1\rangle\end{pmatrix}=\begin{pmatrix}e^{\beta(\varepsilon+H)}&e^{-\beta\varepsilon}\\e^{-\beta\varepsilon}&e^{\beta(\varepsilon-H)}\end{pmatrix}.$$

:::: {.passaggi titolo="Perché la somma diventa una traccia"}
$$Q=\sum_{s_1}\cdots\sum_{s_N}\langle s_1|P|s_2\rangle\langle s_2|P|s_3\rangle\cdots\langle s_N|P|s_1\rangle .$$
Somma su $s_2$: $\sum_{s_2}\langle s_1|P|s_2\rangle\langle s_2|P|s_3\rangle$ è il prodotto riga per colonna, cioè $\langle s_1|P^2|s_3\rangle$. È l'identità $\sum_{s}|s\rangle\langle s|=1$. Ripetendo per $s_3,\dots,s_N$ resta
$$Q=\sum_{s_1}\langle s_1|P^N|s_1\rangle=\mathrm{Tr}\,P^N=\lambda_+^N+\lambda_-^N,$$
dove $\lambda_\pm$ sono gli autovalori di $P$: la traccia non dipende dalla base, e in quella degli autovettori $P^N$ è diagonale. Per $N$ grande conta solo l'autovalore maggiore: $Q\simeq\lambda_+^N$ (Dispense, p. 145).
::::

**Campo nullo.** Con $x=e^{\beta\varepsilon}$, $\det(P-\lambda I)=(x-\lambda)^2-1/x^2=0$ dà $\lambda_\pm=x\pm1/x$:
$$\lambda_+=2\cosh\beta\varepsilon,\qquad\lambda_-=2\sinh\beta\varepsilon,\qquad Q_N=2^N\big[\cosh^N\beta\varepsilon+\sinh^N\beta\varepsilon\big]$$
(Dispense, p. 145; Appunti MS, p. 42).

**Campo non nullo.** Con $x=e^{\beta\varepsilon}$ e $y=e^{\beta H}$, $P=\begin{pmatrix}xy&1/x\\1/x&x/y\end{pmatrix}$ e l'equazione caratteristica è $\lambda^2-\lambda\big(xy+\frac xy\big)+x^2-\frac{1}{x^2}=0$.

:::: {.passaggi titolo="Gli autovalori e la magnetizzazione"}
$$\begin{aligned}\lambda_\pm&=\frac x2\Big[\Big(y+\frac1y\Big)\pm\sqrt{\Big(y-\frac1y\Big)^2+\frac{4}{x^4}}\Big]\\&=e^{\beta\varepsilon}\Big[\cosh\beta H\pm\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}\Big],\end{aligned}$$
usando $y+1/y=2\cosh\beta H$ e $y-1/y=2\sinh\beta H$. Per $N$ grande
$$\begin{aligned}A&=-k_BTN\ln\lambda_+\\&=N\Big(-\varepsilon-k_BT\ln\Big[\cosh\beta H+\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}\Big]\Big).\end{aligned}$$
Derivando $-A/N$ rispetto a $H$:
$$\frac MN=\frac{\sinh\beta H+\frac{\sinh\beta H\cosh\beta H}{\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}}}{\cosh\beta H+\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}}=\frac{\sinh\beta H}{\sqrt{\sinh^2\beta H+e^{-4\beta\varepsilon}}}$$
(Dispense, p. 146). Nell'ultimo passaggio si raccoglie $\sinh\beta H/\sqrt{\cdots}$ al numeratore, e la parentesi che resta si semplifica con il denominatore.
::::

Poiché $\sinh0=0$, $M(H=0,T)=0$: **a nessuna temperatura finita la catena si magnetizza spontaneamente** (Dispense, p. 146; Appunti MS, p. 42). Ci si aspetterebbe che spin vicini tendano ad allinearsi, ed è così, ma la catena è una sequenza di blocchi paralleli con inversioni di segno sparse, che in media si compensano.

::: attenzione
**Il segno sotto radice.** Nel quaderno il termine sotto radice compare come $-e^{-4\beta\varepsilon}$; le dispense (p. 146) hanno $+e^{-4\beta\varepsilon}$, che è corretto: il discriminante è $(y-1/y)^2+4/x^4$, somma di due quantità positive. Vedi [[appunti-anno-scorso]].
:::

## Perché in una dimensione non c'è ordine {#interfacce}

Un argomento di energia libera lo spiega senza conti (Dispense, p. 147). Chiamiamo **interfaccia** il punto in cui due spin consecutivi hanno segno opposto.

- Lo stato fondamentale, l'unico con $M=N$, non ha interfacce: $A(0)=-N\varepsilon$.
- Con un'interfaccia, rovesciando coerentemente tutti gli spin alla sua destra, si paga $2\varepsilon$, ma l'interfaccia si può mettere in $N$ posti: $A(1)=-N\varepsilon+2\varepsilon-k_BT\ln N$.
- Con due interfacce $A(2)=-N\varepsilon+4\varepsilon-k_BT\ln\frac{N(N-1)}{2}$, e così via.

Lo stato con un'interfaccia, che ha già $M\simeq0$, diventa più stabile del fondamentale appena $k_BT>2\varepsilon/\ln N$, che per $N\to\infty$ è **qualunque** temperatura positiva. Il minimo di $A$ cade a un numero finito e crescente di interfacce per unità di lunghezza.

::: attenzione
**Refusi di p. 147.** Lo stato con due interfacce (energia $4\varepsilon$) è chiamato $A(3)$; nelle formule manca $k_B$ davanti a $T\ln N$; e $-N\varepsilon$ è l'energia totale, non «per spin». Con condizioni periodiche le interfacce sono sempre in numero pari, ma l'argomento non cambia. Calcolo mio.
:::

::: idea
**E in due dimensioni?** Un'isola di spin rovesciati ha un bordo di lunghezza $\ell$ e costa energia $2\varepsilon\ell$. Il numero di bordi chiusi di lunghezza $\ell$ cresce al più come $3^\ell$, quindi l'entropia è al più $k_B\ell\ln3$. Energia ed entropia crescono entrambe come $\ell$: a bassa $T$ vince l'energia e le isole restano piccole, cioè c'è ordine. È l'argomento di Peierls, che qui riporto come conoscenza generale. La soluzione esatta di Onsager per il reticolo quadrato dà $k_BT_c=2{,}269\,\varepsilon$ (Dispense, p. 150).
:::

## Le correlazioni in una dimensione {#correlazioni}

Niente magnetizzazione, ma gli spin vicini sono comunque correlati. Quanto lontano arriva la correlazione? (Dispense, pp. 147–149; Appunti MS, pp. 43–44.)

**Metodo 1: contare i cambi di segno.** Sia $p_\uparrow$, con $\frac12<p_\uparrow<1$, la probabilità che due spin adiacenti siano paralleli; $\frac12$ è il caso completamente casuale, $T=\infty$. Per $j=1$: $\langle s_is_{i+1}\rangle=p_\uparrow-(1-p_\uparrow)$. Per $j=2$ ci sono quattro casi: due paralleli, due antiparalleli, e due casi misti, che danno prodotto negativo:
$$\langle s_is_{i+2}\rangle=p_\uparrow^2+(1-p_\uparrow)^2-2p_\uparrow(1-p_\uparrow).$$
Dopo $j$ passi compaiono tutti i termini dello sviluppo binomiale, $\binom jk p_\uparrow^{j-k}(1-p_\uparrow)^k$, con segno $+$ se il numero $k$ di inversioni è pari e $-$ se è dispari:
$$\langle s_is_{i+j}\rangle=\big(p_\uparrow-(1-p_\uparrow)\big)^j=(2p_\uparrow-1)^j=e^{j\ln(2p_\uparrow-1)}\equiv e^{-j/\xi},$$
$$\xi=-\frac{1}{\ln(2p_\uparrow-1)} .$$
Il decadimento è **esponenziale**, con lunghezza di correlazione $\xi$: nulla per $p_\uparrow=\frac12$, infinita per $p_\uparrow\to1$ (Dispense, p. 148).

In 1D $p_\uparrow=\frac{e^{\beta\varepsilon}}{e^{\beta\varepsilon}+e^{-\beta\varepsilon}}$, quindi $2p_\uparrow-1=\tanh\beta\varepsilon$. A bassa $T$, $p_\uparrow\simeq1-e^{-2\beta\varepsilon}$ e
$$\xi(T\to0)=-\frac{1}{\ln(1-2e^{-2\beta\varepsilon})}\simeq\frac{e^{2\beta\varepsilon}}{2} :$$
**la magnetizzazione è nulla, ma la lunghezza di correlazione diverge per $T\to0$** (Dispense, p. 148).

:::: {.passaggi titolo="Metodo 2, per i curiosi: derivare rispetto ad accoppiamenti diversi"}
Si complica apparentemente il modello, con un accoppiamento diverso per ogni legame, $\gamma_i=\beta\varepsilon_i$. Poiché $\partial e^{\sum_i\gamma_is_is_{i+1}}/\partial\gamma_m=s_ms_{m+1}\,e^{\sum_i\gamma_is_is_{i+1}}$, derivando rispetto a $\gamma_k,\dots,\gamma_{k+r-1}$ si ottiene $s_ks_{k+1}^2\cdots s_{k+r-1}^2s_{k+r}=s_ks_{k+r}$, perché $s^2=1$. Quindi
$$\langle s_ks_{k+r}\rangle=\frac{1}{Q_N}\frac{\partial}{\partial\gamma_k}\frac{\partial}{\partial\gamma_{k+1}}\cdots\frac{\partial}{\partial\gamma_{k+r-1}}Q_N .$$
Per una catena aperta (o per $N$ grande) $Q_N=2^N\prod_{i=1}^{N-1}\cosh\gamma_i$. Ogni derivata trasforma un $\cosh\gamma$ in $\sinh\gamma$, e dividendo per $Q_N$:
$$\langle s_ks_{k+r}\rangle=\prod_{i=1}^r\tanh\gamma_{k+i-1}=(\tanh\beta\varepsilon)^r,\qquad\xi=-\frac{1}{\ln\tanh\beta\varepsilon}.$$
Per $T\to0$, $\tanh x\simeq1-2e^{-2x}$ e $\xi\simeq\frac{1}{2e^{-2\beta\varepsilon}}=\frac{e^{2\beta\varepsilon}}{2}$, lo stesso del metodo 1 (Dispense, p. 149).
::::

::: attenzione
**Tre sviste a p. 149.** (1) La funzione di partizione della catena aperta è scritta $Q_N=2^N\sum_{i}\cosh\gamma_i$: è un **prodotto**, $2^N\prod_i\cosh\gamma_i$; solo così le derivate danno il prodotto di tangenti iperboliche. (2) Nell'ultima uguaglianza della formula per $\langle s_ks_{k+r}\rangle$ manca il fattore $1/Q_N$. (3) Il risultato finale è scritto $\xi=-\frac{1}{2e^{-2\beta\varepsilon}}$: il segno meno è di troppo, perché $\ln\tanh\beta\varepsilon<0$ e $\xi>0$, come a p. 148. Calcolo mio.
:::

## L'espansione di alta temperatura {#alta-temperatura}

Con $H=0$, sviluppando l'esponenziale al second'ordine in $\beta\varepsilon$ (Dispense, p. 150; Appunti MS, p. 44):
$$Q\simeq\sum_{\{s\}}\Big(1+\beta\varepsilon\sum_ks_ks_{k+1}+\frac{\beta^2\varepsilon^2}{2}\sum_k\sum_ls_ks_{k+1}s_ls_{l+1}\Big).$$
- Il termine 1 dà $2^N$.
- Il termine lineare: ognuno degli $N$ addendi, sommato su $s_k$ e $s_{k+1}$, dà zero.
- Nel termine quadratico, i prodotti di quattro spin diversi e quelli del tipo $s_1s_2^2s_3$ hanno media nulla. Sopravvivono solo i termini con $l=k$, dove $s_k^2s_{k+1}^2=1$: sono $N$, ciascuno pari a $2^N\frac{\beta^2\varepsilon^2}{2}$.

$$Q_N(T)\simeq2^N\Big(1+N\frac{\beta^2\varepsilon^2}{2}\Big).$$
Il risultato coincide con lo sviluppo del risultato esatto, $(2\cosh\beta\varepsilon)^N\simeq2^N(1+\beta^2\varepsilon^2/2)^N$. In questo modello non c'è il nocciolo duro che rovinava lo stesso sviluppo nei [[gas-reali-viriale-e-van-der-waals|gas reali]].

## Il campo medio di Bragg-Williams {#bragg-williams}

In più di una dimensione Ising non si risolve facilmente (in 2D sì, ma con molta fatica). Serve un'approssimazione (Dispense, pp. 151–153; Appunti MS, pp. 45–49).

**Contare i legami.** Si introducono il numero di spin up $N_+$, quelli down $N_-$, e il numero di coppie di vicini $N_{++}$, $N_{--}$, $N_{+-}$. Il reticolo ha **coordinazione** $\gamma$: 2 in una dimensione, 4 per il reticolo quadrato, 6 per quello cubico. Contando i legami che partono dagli spin up, $\gamma N_+$, quelli up-up si contano due volte e quelli up-down una:
$$\gamma N_+=2N_{++}+N_{+-},\qquad\gamma N_-=2N_{--}+N_{+-},\qquad N_++N_-=N .$$
Delle cinque quantità, tre si esprimono in funzione di $N_+$ e $N_{++}$:
$$N_{+-}=\gamma N_+-2N_{++},\qquad N_-=N-N_+,\qquad N_{--}=\frac\gamma2N+N_{++}-\gamma N_+ .$$

**L'hamiltoniana in due numeri.** $\sum_{\langle ij\rangle}s_is_j=N_{++}+N_{--}-N_{+-}=4N_{++}-2\gamma N_++\frac\gamma2N$ e $M=N_+-N_-=2N_+-N$, quindi
$$\mathcal H(N_+,N_{++})=-4\varepsilon N_{++}+2(\varepsilon\gamma-H)N_+-\Big(\frac\gamma2\varepsilon-H\Big)N,$$
$$Q=e^{\beta(\frac\gamma2\varepsilon-H)N}\sum_{N_+=0}^N\sum_{N_{++}}g(N_+,N_{++})\,e^{-2\beta(\varepsilon\gamma-H)N_+}\,e^{4\beta\varepsilon N_{++}}.$$
Tutta la difficoltà è in $g(N_+,N_{++})$, il numero di configurazioni con $N_+$ spin up e $N_{++}$ coppie up-up. Senza una relazione tra $N_+$ e $N_{++}$ calcolarlo «è un incubo» (Appunti MS, p. 46).

**L'approssimazione.** Bragg-Williams suppone che gli spin up siano **distribuiti a caso**, ciascun sito up con probabilità $N_+/N$. Allora un legame qualunque è up-up con probabilità $(N_+/N)^2$, e su $N\gamma/2$ legami
$$N_{++}=\frac{N\gamma}{2}\Big(\frac{N_+}{N}\Big)^2 .$$
La somma su $N_{++}$ sparisce, e $g(N_+)=\binom{N}{N_+}$ conta solo i modi di scegliere i siti up:
$$Q_{BW}=e^{\beta(\frac\gamma2\varepsilon-H)N}\sum_{N_+=0}^N\frac{N!}{(N-N_+)!\,N_+!}\,e^{-2\beta(\varepsilon\gamma-H)N_+}\,e^{2\beta\varepsilon N\gamma(N_+/N)^2}.$$

:::: {.passaggi titolo="Il termine dominante e l'equazione autoconsistente"}
Il logaritmo di una somma di termini esponenziali in $N$ è dato dal termine più grande. Si annulla la derivata del logaritmo dell'addendo rispetto a $N_+$:
$$\frac{d}{dN_+}\Big[\ln N!-\ln(N-N_+)!-\ln N_+!-2\beta(\varepsilon\gamma-H)N_++2\beta\varepsilon N\gamma\frac{N_+^2}{N^2}\Big]=0 .$$
Con Stirling, $\frac{d}{dN_+}\ln(N-N_+)!=-\ln(N-N_+)$ e $\frac{d}{dN_+}\ln N_+!=\ln N_+$: la regola è $d\ln N!/dN=\ln N$. Quindi
$$\ln\frac{N-N_+}{N_+}=2\beta(\varepsilon\gamma-H)-4\beta\varepsilon\gamma\frac{N_+}{N}.$$
Con la magnetizzazione per sito $L=\sum_is_i/N$ si ha $N_+/N=(L+1)/2$ e $\frac{N-N_+}{N_+}=\frac{1-L}{1+L}$:
$$\ln\frac{1-L}{1+L}=2\beta(\varepsilon\gamma-H)-2\beta\varepsilon\gamma(L+1)=-2\beta H-2\beta\varepsilon\gamma L .$$
Esponenziando, $1-\bar L=(1+\bar L)e^{-2\beta H-2\beta\varepsilon\gamma\bar L}$, e risolvendo per $\bar L$:
$$\bar L=\frac{1-e^{-2(\beta H+\beta\varepsilon\gamma\bar L)}}{1+e^{-2(\beta H+\beta\varepsilon\gamma\bar L)}}=\tanh\big(\beta H+\beta\varepsilon\gamma\bar L\big)$$
(Dispense, pp. 152–153).
::::

$$\boxed{\;\bar L=\tanh\Big(\frac{H}{k_BT}+\frac{\varepsilon\gamma}{k_BT}\bar L\Big)\;}$$

È lo stesso risultato degli spin liberi, $\tanh\beta H$, ma con un **campo aggiuntivo** $\varepsilon\gamma\bar L$ generato dalla magnetizzazione stessa. Ogni spin, indipendentemente dai vicini veri, sente il campo esterno più il campo medio prodotto da tutti gli altri. È l'essenza del campo medio (Dispense, p. 153).

**La soluzione grafica.** A $H=0$ l'equazione si risolve intersecando la retta $y=L$ con la curva $y=\tanh(\beta\varepsilon\gamma L)$. La pendenza della tangente iperbolica nell'origine è $\beta\varepsilon\gamma$, perché $\frac{d}{dx}\tanh ax=\frac{4a}{(e^{ax}+e^{-ax})^2}$ vale $a$ in 0.

- Se $\beta\varepsilon\gamma<1$, l'unica intersezione è $L=0$: niente magnetizzazione.
- Se $\beta\varepsilon\gamma>1$, la curva parte più ripida della retta e la ritaglia altre due volte: nascono le soluzioni stabili $L=\pm L_0$, e $L=0$ diventa instabile.

La temperatura critica è quella della tangenza:
$$k_BT_c=\gamma\varepsilon .$$
La figura delle dispense (p. 154) mostra le curve per $\beta\varepsilon\gamma=0{,}5$, 1 e 1,5.

**Vicino a $T_c$.** Con $\tanh x\simeq x-x^3/3$:
$$\bar L=\frac{T_c}{T}\bar L-\frac13\Big(\frac{T_c}{T}\bar L\Big)^3\quad\Longrightarrow\quad\bar L^2=\frac{3\big(\frac{T_c}{T}-1\big)}{\big(\frac{T_c}{T}\big)^3}\simeq3\,\frac{T_c-T}{T_c},$$
$$\bar L=\pm\sqrt{3\,\frac{T_c-T}{T_c}}\qquad(T<T_c)$$
(Dispense, pp. 153–154; Appunti MS, pp. 48–49). La magnetizzazione nasce con continuità da zero, con un andamento a radice quadrata.

## L'energia libera in funzione della magnetizzazione {#landau}

Si può guardare la stessa fisica dall'energia libera di un singolo termine della somma, a $N_+$ fissato, cioè a magnetizzazione $L$ fissata (Dispense, pp. 154–157).

:::: {.passaggi titolo="Entropia ed energia a magnetizzazione fissata"}
**L'entropia.** Con Stirling e $N_\pm/N=(1\pm L)/2$:
$$\begin{aligned}\ln\frac{N!}{(N-N_+)!N_+!}&=-N_-\ln\frac{N_-}{N}-N_+\ln\frac{N_+}{N}\\&=-\frac N2\Big[(1-L)\ln(1-L)+(1+L)\ln(1+L)-2\ln2\Big].\end{aligned}$$
Con $(1+x)\ln(1+x)\simeq x+\frac{x^2}{2}-\frac{x^3}{6}+\frac{x^4}{12}$ e $(1-x)\ln(1-x)\simeq-x+\frac{x^2}{2}+\frac{x^3}{6}+\frac{x^4}{12}$, la somma è $L^2+L^4/6$, e
$$\ln\frac{N!}{(N-N_+)!N_+!}\simeq-N\Big[-\ln2+\frac{L^2}{2}+\frac{L^4}{12}\Big].$$
**L'energia** per sito, dall'hamiltoniana in $N_+$ e $N_{++}$:
$$\frac EN=-\frac\gamma2\varepsilon+H+(\varepsilon\gamma-H)(L+1)-\frac{\varepsilon\gamma}{2}(L+1)^2=-HL-\frac{\varepsilon\gamma}{2}L^2 .$$
::::

L'energia libera per sito, $f=-\frac{k_BT}{N}\ln Q_{BW}(N_+)$, per $L$ piccolo:
$$\begin{aligned}f(L,T)&=-k_BT\ln2+\frac{k_BT-\varepsilon\gamma}{2}L^2+\frac{k_BT}{12}L^4-HL\\&=-k_BT\ln2+\frac{k_B(T-T_c)}{2}L^2+\frac{k_BT}{12}L^4-HL .\end{aligned}$$
A $H=0$ è una parabola più una quartica, entrambe centrate in $L=0$. Il coefficiente di $L^2$ **cambia segno proprio a $T=T_c$**. Sopra $T_c$ c'è un solo minimo, in $L=0$. Sotto $T_c$, $L=0$ diventa un massimo e compaiono due minimi simmetrici: la magnetizzazione spontanea. Tra i due minimi c'è una regione di concavità negativa, che segnala instabilità termodinamica (Dispense, p. 157; Appunti MS, pp. 49–51). Con un campo $H$ il termine $-HL$ inclina la curva e uno dei due minimi diventa il più profondo. Le due figure delle dispense (p. 156) mostrano $F/N\gamma\varepsilon$ a $T/T_c=1{,}05$, 1, 0,95 e 0,90, senza campo e con $H/k_BT_c=0{,}02$.

::: attenzione
**Refusi di p. 155.** Nelle derivate di $f(x)=(1+x)\ln(1+x)$ le dispense scrivono $\ln(1-x)+1$ e $1/(1-x)$ al posto di $\ln(1+x)+1$ e $1/(1+x)$, e nella parentesi dell'entropia $+2\ln2$ al posto di $-2\ln2$. I risultati finali sono corretti. Calcolo mio.
:::

::: {.lab-segnaposto tipo="campo-medio"}
:::

## Il campo medio come metodo variazionale {#variazionale}

Il campo medio ha una giustificazione più profonda: è il miglior sistema di spin **indipendenti** che approssima quello vero (Dispense, pp. 157–159; Appunti MS, pp. 54–56).

**La disuguaglianza.** Si divide l'hamiltoniana in una parte $\mathcal H_0$ risolubile, di solito di particelle non interagenti, e una parte difficile $W$: $\mathcal H(s)=\mathcal H_0(s)+W(s)$. Dividendo $Q$ per $Q_0$:
$$\frac{Q}{Q_0}=\frac{\sum_se^{-\beta[\mathcal H_0+W]}}{\sum_se^{-\beta\mathcal H_0}}=\big\langle e^{-\beta W}\big\rangle_0\quad\Longrightarrow\quad e^{-\beta(A-A_0)}=\big\langle e^{-\beta W}\big\rangle_0 .$$
Per la **disuguaglianza di Jensen**, valida per le funzioni convesse come $e^x$, $\langle e^{f}\rangle\geq e^{\langle f\rangle}$. Il quaderno annota di non averla mai vista prima (Appunti MS, p. 54).

:::: {.passaggi titolo="Jensen: due modi per convincersene"}
**Graficamente.** Una funzione convessa sta sopra le sue corde: la media dei valori trasformati supera il valore trasformato della media, perché la convessità «allunga» i valori grandi più di quanto accorci quelli piccoli. Le dispense mostrano la figura (p. 158).

**Con un esempio.** $x$ uniforme in $[1-\Delta,1+\Delta]$, con $\langle x\rangle=1$ e $P(x)=1/2\Delta$:
$$\langle e^x\rangle=\frac{1}{2\Delta}\big(e^{1+\Delta}-e^{1-\Delta}\big)=\frac{e}{2\Delta}\sum_{n\ \rm dispari}\frac{2\Delta^n}{n!}=e\Big(1+\frac{\Delta^2}{6}+\dots\Big)\geq e=e^{\langle x\rangle}$$
(Dispense, p. 158). Si dimostra anche notando che a ogni ordine $\langle f^k\rangle\geq\langle f\rangle^k$.
::::

Quindi $e^{-\beta(A-A_0)}\geq e^{-\beta\langle W\rangle_0}$, cioè
$$A\leq A_0+\langle W\rangle_0 .$$
È la **disuguaglianza di Gibbs-Bogoliubov**: l'energia libera vera sta sotto quella stimata con qualunque $\mathcal H_0$. Si sceglie allora un $\mathcal H_0$ con dei parametri e si cercano i valori che rendono minima la stima: è il **calcolo variazionale** (Dispense, p. 159).

**Applicazione a Ising.** Si aggiunge e si toglie un campo di prova $\lambda$:
$$\mathcal H_0=-\lambda\sum_is_i,\qquad W=-\varepsilon\sum_{\langle ij\rangle}s_is_j-H\sum_is_i+\lambda\sum_is_i .$$
$\mathcal H_0$ sono spin liberi in un campo $\lambda$: $Q_0=(2\cosh\beta\lambda)^N$ e $m\equiv\langle s_i\rangle_0=\tanh\beta\lambda$, quindi $m$ e $\lambda$ si determinano a vicenda. Nel sistema 0 gli spin sono indipendenti, $\langle s_is_j\rangle_0=\langle s_i\rangle_0\langle s_j\rangle_0=m^2$, e le somme contano $N\gamma/2$ legami e $N$ siti:
$$\langle W\rangle_0=N\Big[-\varepsilon\frac\gamma2m^2-Hm+\lambda m\Big]$$
(Dispense, pp. 159–160).

:::: {.passaggi titolo="Minimizzare: si ritrova Bragg-Williams"}
Per sito, la stima è $-k_BT\ln(2\cosh\beta\lambda)-\frac{\varepsilon\gamma}{2}m^2-Hm+\lambda m$, con $\lambda=k_BT\tanh^{-1}m$. Poiché $dm/d\lambda\neq0$, basta minimizzare in $m$. Per $m$ piccolo:
$$\tanh^{-1}m\simeq m+\frac{m^3}{3},$$
$$\ln\big(2\cosh(\tanh^{-1}m)\big)=\ln2-\frac12\ln(1-m^2)\simeq\ln2+\frac{m^2}{2}+\frac{m^4}{4}.$$
A $H=0$, in unità di $k_BT$:
$$-\ln2-\frac{m^2}{2}-\frac{m^4}{4}-\frac{\gamma\varepsilon}{2k_BT}m^2+m^2+\frac{m^4}{3}=-\ln2+\frac{k_BT-\gamma\varepsilon}{2k_BT}m^2+\frac{m^4}{12}.$$
È **esattamente** l'energia libera di Bragg-Williams: per $k_BT>\gamma\varepsilon$ il minimo è in $m=0$, sotto ci sono due minimi con $m\neq0$ (Dispense, pp. 160–161). Minimizzando senza sviluppare si ottiene $m=\tanh(\beta H+\beta\varepsilon\gamma m)$.
::::

## Suscettività, isoterma critica e correlazioni {#suscettivita}

**La suscettività** misura quanto la magnetizzazione risponde al campo: $\chi_m=(\partial\bar L/\partial H)_{H=0}$. Vicino a $T_c$, sopra $T_c$, sviluppando la tangente al prim'ordine:
$$\bar L=\frac{H}{k_BT}+\frac{\varepsilon\gamma}{k_BT}\bar L\quad\Longrightarrow\quad\bar L\Big(1-\frac{T_c}{T}\Big)=\frac{H}{k_BT}\quad\Longrightarrow\quad\chi_m=\frac{1}{k_B(T-T_c)}$$
(Dispense, p. 161; Appunti MS, p. 52). **La suscettività diverge al punto critico**: un campo infinitesimo produce una magnetizzazione finita. È l'analogo della compressibilità isoterma di un fluido.

**L'isoterma critica.** A $T=T_c$, con $\tanh x\simeq x-x^3/3$:
$$\bar L=\beta H+\bar L-\frac13(\beta H+\bar L)^3\quad\Longrightarrow\quad\beta H+\bar L=(3\beta H)^{1/3},$$
$$\bar L\sim H^{1/3}$$
(Dispense, p. 161; Appunti MS, p. 52).

:::: {.passaggi titolo="Per i curiosi: la suscettività è l'integrale delle correlazioni"}
In una versione continua, con densità di magnetizzazione $m(\vec r)$ e $\mathcal H=\mathcal H_0-H\int d^3r'\,m(\vec r^{\,\prime})$, la magnetizzazione media per volume è $\langle M\rangle/V$ con $\langle M\rangle=\langle\int d^3r\,m(\vec r)\rangle$. Derivando rispetto a $H$ scende un fattore $\beta\int d^3r'\,m(\vec r^{\,\prime})$ sia al numeratore sia al denominatore:
$$\frac{\partial}{\partial H}\frac{\langle M\rangle}{V}=\frac\beta V\Big\{\Big\langle\int d^3r'\,m(\vec r^{\,\prime})\int d^3r\,m(\vec r)\Big\rangle-\Big\langle\int d^3r\,m(\vec r)\Big\rangle^2\Big\}.$$
Passando a $\vec r^{\,\prime\prime}=\vec r^{\,\prime}-\vec r$ e sfruttando l'omogeneità:
$$\chi=\beta\int d^3r\,\big[\langle m(\vec r)\,m(0)\rangle-\langle m(0)\rangle\langle m(\vec r)\rangle\big]$$
(Dispense, pp. 161–162). La suscettività è l'integrale della funzione di correlazione connessa: **se diverge, le correlazioni devono diventare a lungo raggio**. È lo stesso legame tra fluttuazioni e risposta visto nel [[insieme-canonico]] e nel [[insieme-gran-canonico-e-npt|gran canonico]].
::::

## Un campo medio più raffinato: Bethe-Peierls {#bethe-peierls}

Per i curiosi (Dispense, pp. 162–165). Invece di un solo spin nel campo medio si tratta esattamente un **grappolo**: uno spin centrale $s_0$ e i suoi $\gamma$ vicini. Il centrale interagisce con i vicini, $-\varepsilon s_0\sum_{j=1}^\gamma s_j$. I vicini sentono in più un campo efficace $h$, che rappresenta il resto del reticolo: $-h\sum_js_j$.

:::: {.passaggi titolo="La condizione di autoconsistenza e la temperatura critica (compressione mia)"}
**La funzione di partizione del grappolo.** Con $N_\uparrow$ il numero di vicini up, $\sum_js_j=2N_\uparrow-\gamma$, e la somma sui vicini è binomiale:
$$Q_{BP}=e^{-\beta\varepsilon\gamma-\beta h\gamma}\big(1+e^{2\beta(\varepsilon+h)}\big)^\gamma+e^{\beta\varepsilon\gamma-\beta h\gamma}\big(1+e^{2\beta(-\varepsilon+h)}\big)^\gamma .$$
**L'autoconsistenza.** Lo spin centrale e un vicino qualunque sono equivalenti nel reticolo vero, quindi devono avere la stessa probabilità di essere up: $P(\uparrow_0)=P(\uparrow_i)$. Con $z=e^{2\beta h}$ questa condizione diventa
$$z=\Big(\frac{1+z\,e^{2\beta\varepsilon}}{z+e^{2\beta\varepsilon}}\Big)^{\gamma-1}.$$
$z=1$ ($h=0$) è sempre soluzione e corrisponde a $\bar L=0$; se $z$ è soluzione lo è anche $1/z$, che inverte $\bar L$ in $-\bar L$. La magnetizzazione è $\bar L=\frac{z^{\gamma/(\gamma-1)}-1}{z^{\gamma/(\gamma-1)}+1}$.

**La temperatura critica.** Come per Bragg-Williams, si impone che la pendenza del lato destro in $z=1$ valga 1. Con $a=e^{2\beta\varepsilon}$ la pendenza è $(\gamma-1)\frac{a-1}{a+1}$, e $(\gamma-1)(e^{2\beta\varepsilon}-1)=e^{2\beta\varepsilon}+1$ dà
$$k_BT_c^{BP}=\frac{2\varepsilon}{\ln\frac{\gamma}{\gamma-2}}$$
(Dispense, pp. 163–164).
::::

La temperatura critica di Bethe-Peierls è **più bassa** di quella di Bragg-Williams: trattare esattamente i vicini toglie una parte dell'ordine fittizio del campo medio. La figura delle dispense (p. 165) confronta la soluzione grafica e il calore specifico nei due approcci. Il confronto numerico è nel secondo [esercizio](#esercizi).

## Gli esponenti critici: ritorno a Van der Waals {#esponenti-critici}

Per i curiosi (Dispense, pp. 165–167). Vicino al punto critico le grandezze vanno come potenze di $|T-T_c|$. Gli esponenti si leggono bene sull'equazione di Van der Waals in unità ridotte, $P=\frac{8T}{3V-1}-\frac{3}{V^2}$, con $P_c=T_c=V_c=1$.

**La compressibilità** lungo l'isocora critica $V=1$:
$$\frac{\partial P}{\partial V}\Big|_T=-\frac{24T}{(3V-1)^2}+\frac{6}{V^3}\Big|_{V=1}=6(1-T),$$
$$k_T=-\frac1V\frac{\partial V}{\partial P}=\frac16(T-1)^{-1}:$$
diverge con esponente $-1$ (Dispense, p. 165).

**Il parametro d'ordine.** Sviluppando attorno al punto critico e assumendo $(V-1)^2\sim T-1$:
$$P\simeq1-\frac32(V-1)^3+4(T-1)-6(T-1)(V-1).$$
A $P=1+4(T-1)$, oltre a $V=1$, ci sono le soluzioni $(V-1)^2=-4(T-1)$, cioè $V_{1,2}=1\pm\sqrt{4(1-T)}$, simmetriche rispetto a $V=1$. Questa $P$ è proprio la pressione di coesistenza: la funzione $-\frac38(V-1)^4-3(T-1)(V-1)^2$, primitiva di $P-P_{\rm coex}$, è pari in $V-1$, quindi l'integrale di Maxwell tra $V_1$ e $V_2$ si annulla. Ne segue
$$\frac{V-V_c}{V_c}=\pm2\sqrt{\frac{T_c-T}{T_c}} :$$
il parametro d'ordine scala con esponente $\frac12$ (Dispense, p. 166).

::: attenzione
**Un fattore.** Le dispense (p. 166) concludono con $\frac{V-V_c}{V_c}=4\sqrt{\frac{T_c-T}{T_c}}$. Dalla riga sopra, $V_{1,2}-1=\pm\sqrt{4(1-T)}=\pm2\sqrt{1-T}$: il coefficiente è 2, non 4. L'esponente $\frac12$ non cambia. Calcolo mio.
:::

**A $T=T_c$:** $P-1=-\frac32(V-1)^3$, cioè $\frac{V-V_c}{V_c}\sim\big(\frac{P-P_c}{P_c}\big)^{1/3}$ (Dispense, p. 166). La figura di p. 167 mostra l'isoterma $T/T_c=0{,}999$ con la sua costruzione di Maxwell.

**Il confronto.** Identificando il parametro d'ordine con la magnetizzazione per Ising e con la differenza di densità $\rho-\rho_c$ per il fluido, e chiamando $\epsilon=(T-T_c)/T_c$:

| grandezza | Ising (campo medio) | fluido (Van der Waals) | esponente di campo medio | esperimenti |
|---|---|---|---|---|
| parametro d'ordine sotto $T_c$ | $L\sim(-\epsilon)^\beta$ | $\rho-\rho_c\sim(-\epsilon)^\beta$ | $\beta=\frac12$ | $\beta\approx\frac13$ |
| risposta | $\chi\sim\lvert\epsilon\rvert^{-\gamma}$ | $K_T\sim\lvert\epsilon\rvert^{-\gamma}$ | $\gamma=1$ | $\gamma\approx\frac54$ |
| isoterma critica | $L\sim H^{1/\delta}$ | $\rho-\rho_c\sim(P-P_c)^{1/\delta}$ | $\delta=3$ | $\delta\approx5$ |

(Dispense, p. 167.) Ising in campo medio e Van der Waals hanno **gli stessi esponenti**: la fisica vicino al punto critico non dipende dai dettagli. Gli esponenti sperimentali sono anch'essi universali, ma diversi da quelli di campo medio: il campo medio fa capire che cosa succede, ma trascura proprio le fluttuazioni che al punto critico diventano dominanti. Gli esponenti corretti li predice il **gruppo di rinormalizzazione** (Dispense, p. 167).

::: attenzione
**Due $\gamma$ diversi.** In questa lezione $\gamma$ indica sia la coordinazione del reticolo sia l'esponente critico della suscettività: è la notazione delle dispense. Dal contesto si capisce sempre quale dei due.
:::

## Il lattice gas {#lattice-gas}

Si torna alla transizione gas-liquido, ma su reticolo (Dispense, pp. 168–169; Appunti MS, pp. 52–53). Ogni sito, di volume $v_0$, può ospitare **un solo** atomo: $n_i=1$ se occupato, $n_i=0$ se vuoto. Il volume è $Nv_0$. Così è già incluso il nocciolo duro: due atomi non stanno nello stesso sito. L'attrazione si aggiunge come in Ising, con energia $-\varepsilon$ tra atomi vicini:
$$\mathcal H=-\varepsilon\sum_{\langle ij\rangle}n_in_j .$$
Con $N_P$ particelle la funzione di partizione ha un vincolo, $\delta\big(\sum_in_i-N_P\big)$, scomodo. Nel **gran canonico** il vincolo sparisce:
$$\mathcal Q_{gc}=\sum_{N_P}z^{N_P}Q_{N_P}=\sum_{n_1=0}^1\cdots\sum_{n_N=0}^1e^{\beta\varepsilon\sum_{\langle ij\rangle}n_in_j}\,z^{\sum_in_i}.$$

:::: {.passaggi titolo="Dalla variabile di occupazione allo spin"}
Con $n_i=(s_i+1)/2$:
$$\sum_in_i=\frac12\sum_is_i+\frac N2,\qquad\sum_{\langle ij\rangle}n_in_j=\frac14\sum_{\langle ij\rangle}s_is_j+\frac\gamma4\sum_is_i+\frac{N\gamma}{8}.$$
L'esponente, a parte $\beta$, con $z=e^{\beta\mu}$:
$$\varepsilon\sum_{\langle ij\rangle}n_in_j+\mu\sum_in_i=\frac\varepsilon4\sum_{\langle ij\rangle}s_is_j+\Big(\frac{\varepsilon\gamma}{4}+\frac\mu2\Big)\sum_is_i+\Big(\frac{\varepsilon\gamma}{8}+\frac\mu2\Big)N .$$
Chiamando $J=\varepsilon/4$ e $H=\varepsilon\gamma/4+\mu/2$:
$$\mathcal Q_{gc}=e^{\beta(\frac{\varepsilon\gamma}{8}+\frac\mu2)N}\sum_{\{s\}}e^{\beta J\sum_{\langle ij\rangle}s_is_j+\beta H\sum_is_i}=e^{\beta(\frac{\varepsilon\gamma}{8}+\frac\mu2)N}\,Q_{\rm Ising}(J,H).$$
::::

**La funzione di partizione gran canonica del lattice gas è quella canonica di Ising**, a parte una costante, con un'opportuna corrispondenza tra energie e campo (Dispense, p. 169). La densità è la magnetizzazione: $\langle n_i\rangle=(\langle s_i\rangle+1)/2$. La pressione viene da $\beta PN=\ln\mathcal Q_{gc}$ (con $v_0=1$):
$$P=-\frac{A_{\rm Ising}}{N}+\frac{\varepsilon\gamma}{8}+\frac\mu2=-\frac{A_{\rm Ising}}{N}+H-\frac{\gamma J}{2}.$$
Il lattice gas non include i contributi cinetici alla pressione, ma questo non cambia la fisica della transizione (Dispense, p. 169).

::: attenzione
**Un segno.** Le dispense (p. 169) scrivono $P=-\frac{A_{\rm Ising}}{N}-\frac{\varepsilon\gamma}{8}-\frac\mu2$ e quindi $P=-\frac{A}{N}+\frac{J\gamma}{2}-H$. Da $\ln\mathcal Q_{gc}=\beta\big(\frac{\varepsilon\gamma}{8}+\frac\mu2\big)N+\ln Q_{\rm Ising}$ e $\ln Q_{\rm Ising}=-\beta A_{\rm Ising}$, i due termini costanti entrano con il segno $+$. Anche il quaderno ha un errore di segno qui (Appunti MS, pp. 52–53; vedi [[appunti-anno-scorso]]). Calcolo mio.
:::

::: idea
**Che cosa significa la corrispondenza.** Il campo $H=0$ di Ising corrisponde a $\mu=-\varepsilon\gamma/2$, dove la simmetria tra spin up e down diventa una simmetria tra siti pieni e vuoti, cioè tra liquido e gas. La transizione di Ising sotto $T_c$ a campo nullo, dove la magnetizzazione salta da $-L_0$ a $+L_0$, è la condensazione: la densità salta da $(1-L_0)/2$, il gas, a $(1+L_0)/2$, il liquido. E la versione in campo medio del lattice gas è Van der Waals: esclusione di volume più attrazione media. Questa lettura è mia.
:::

## Esercizi svolti {#esercizi}

:::: esercizio
**Energia e calore specifico della catena di Ising.** Calcolare energia media e calore specifico di una catena di Ising con $N\to\infty$ spin a $H=0$, e discutere i limiti. Esercizio mio, costruito sui risultati di p. 145.

::: soluzione
**1.** Per $N$ grande $Q\simeq\lambda_+^N=(2\cosh\beta\varepsilon)^N$, quindi
$$U=-\frac{\partial\ln Q}{\partial\beta}=-N\varepsilon\tanh\beta\varepsilon .$$
**2.** $C=\frac{\partial U}{\partial T}=-k_B\beta^2\frac{\partial U}{\partial\beta}$:
$$C=Nk_B\,\frac{(\beta\varepsilon)^2}{\cosh^2\beta\varepsilon}.$$
**3. Limiti.** A $T\to0$, $U\to-N\varepsilon$ (tutti paralleli) e $C\to4Nk_B(\beta\varepsilon)^2e^{-2\beta\varepsilon}\to0$: per creare un'interfaccia serve l'energia $2\varepsilon$, e la sua probabilità è esponenzialmente piccola. Ad alta $T$, $U\simeq-N\beta\varepsilon^2$, che è proprio quello che dà l'espansione di alta temperatura, $\ln Q\simeq N\ln2+N\beta^2\varepsilon^2/2$. In mezzo $C$ ha un **massimo liscio**, attorno a $k_BT\simeq0{,}83\,\varepsilon$ (calcolo numerico mio), simile al picco di Schottky. Niente singolarità: un'altra conferma che in 1D non c'è transizione di fase.
:::
::::

:::: esercizio
**Quanto è buono il campo medio?** Confrontare la temperatura critica prevista da Bragg-Williams, da Bethe-Peierls e quella esatta per la catena ($\gamma=2$) e per il reticolo quadrato ($\gamma=4$). Esercizio mio; le formule sono quelle di pp. 153 e 164, il valore esatto 2D è quello citato a p. 150.

::: soluzione
**Bragg-Williams:** $k_BT_c=\gamma\varepsilon$. **Bethe-Peierls:** $k_BT_c=2\varepsilon/\ln\frac{\gamma}{\gamma-2}$.

| reticolo | Bragg-Williams | Bethe-Peierls | esatto |
|---|---|---|---|
| catena, $\gamma=2$ | $2\varepsilon$ | $0$ | $0$ (nessuna transizione) |
| quadrato, $\gamma=4$ | $4\varepsilon$ | $2\varepsilon/\ln2\simeq2{,}885\,\varepsilon$ | $2{,}269\,\varepsilon$ |

**Lettura.** Bragg-Williams prevede una transizione anche in 1D, dove non c'è: ignorando le correlazioni tra vicini sovrastima l'ordine. Bethe-Peierls, che tratta esattamente i vicini, dà correttamente $T_c=0$ in 1D, perché $\ln\frac{\gamma}{\gamma-2}\to\infty$, e in 2D si avvicina al valore esatto, sbagliando ancora del 27 %. Più la dimensione è alta, più ogni spin ha vicini e più il campo medio funziona: le fluttuazioni di un singolo vicino pesano meno nella media.
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Come si trasforma la funzione di partizione della catena di Ising in una traccia di matrice? E perché per $N$ grande conta solo $\lambda_+$?

::: risposta
Simmetrizzando il termine di campo, l'esponente diventa una somma di termini che dipendono ognuno da due spin consecutivi. Ciascun fattore è l'elemento $\langle s_i|P|s_{i+1}\rangle$ di una matrice $2\times2$, e sommare sugli spin intermedi equivale a moltiplicare matrici: $Q=\mathrm{Tr}\,P^N=\lambda_+^N+\lambda_-^N$. Per $N$ grande $(\lambda_-/\lambda_+)^N\to0$.
:::
::::

:::: domanda
Perché la catena di Ising non si magnetizza mai a $T>0$, anche se gli spin vicini preferiscono essere paralleli?

::: risposta
Un'interfaccia tra un blocco up e uno down costa un'energia finita, $2\varepsilon$, ma si può mettere in $N$ posti, con un guadagno di entropia $k_B\ln N$. Per $N\to\infty$ l'entropia vince a qualunque temperatura positiva: la catena si spezza in blocchi alterni e la magnetizzazione media è nulla. Restano correlazioni esponenziali, con $\xi\sim e^{2\beta\varepsilon}/2$.
:::
::::

:::: domanda
Qual è l'ipotesi di Bragg-Williams, e che cosa trascura?

::: risposta
Che gli spin up siano distribuiti a caso, ciascuno con probabilità $N_+/N$ indipendente dai vicini, così che $N_{++}=\frac{N\gamma}{2}(N_+/N)^2$. Trascura le correlazioni: nel modello vero un vicino up rende più probabile che anche lo spin considerato sia up. Per questo sovrastima l'ordine e $T_c$, e prevede persino una transizione in 1D.
:::
::::

:::: domanda
Spiega la soluzione grafica di $\bar L=\tanh(\beta\varepsilon\gamma\bar L)$ e da dove viene $k_BT_c=\gamma\varepsilon$.

::: risposta
Si intersecano la retta $y=L$ e la curva $y=\tanh(\beta\varepsilon\gamma L)$, che nell'origine ha pendenza $\beta\varepsilon\gamma$. Se la pendenza è minore di 1, la curva sta sotto la retta per $L>0$ e l'unica intersezione è $L=0$. Se è maggiore di 1, la curva parte sopra la retta e poi satura a 1, quindi la incrocia altre due volte, in $\pm L_0$. Il confine è $\beta\varepsilon\gamma=1$.
:::
::::

:::: domanda
Disegna l'energia libera di Landau sopra e sotto $T_c$. Che cosa cambia, e che effetto ha un campo esterno?

::: risposta
$f(L)=\frac{k_B(T-T_c)}{2}L^2+\frac{k_BT}{12}L^4-HL$. Sopra $T_c$ è una scodella con il minimo in $L=0$. Sotto $T_c$ il coefficiente di $L^2$ è negativo: $L=0$ diventa un massimo e compaiono due minimi simmetrici, a forma di W. Il campo aggiunge $-HL$, che inclina la curva e rende più profondo il minimo con $L$ dello stesso segno di $H$.
:::
::::

:::: domanda
Perché il campo medio è un metodo variazionale? Che cosa garantisce la disuguaglianza di Gibbs-Bogoliubov?

::: risposta
Con $\mathcal H=\mathcal H_0+W$ si ha $e^{-\beta(A-A_0)}=\langle e^{-\beta W}\rangle_0\geq e^{-\beta\langle W\rangle_0}$ per Jensen, quindi $A\leq A_0+\langle W\rangle_0$ per qualunque $\mathcal H_0$. Scegliendo come $\mathcal H_0$ spin liberi in un campo di prova $\lambda$ e minimizzando la stima su $\lambda$, si ottiene il miglior modello di spin indipendenti, che è esattamente Bragg-Williams.
:::
::::

:::: domanda
Che cosa dicono gli esponenti critici, e perché quelli di campo medio sono sbagliati?

::: risposta
Vicino al punto critico parametro d'ordine, suscettività e isoterma critica vanno come potenze: $\beta=\frac12$, $\gamma=1$, $\delta=3$ in campo medio, gli stessi per Ising e Van der Waals. Gli esperimenti danno esponenti universali ma diversi, circa $\frac13$, $\frac54$, 5. Il campo medio sostituisce i vicini con una media e trascura le fluttuazioni, che proprio al punto critico, con correlazioni a lungo raggio, dominano.
:::
::::

:::: domanda
Come si trasforma un gas su reticolo in un modello di Ising?

::: risposta
Ogni sito è vuoto o pieno, $n_i=0,1$, con attrazione $-\varepsilon$ tra vicini pieni. Nel gran canonico il vincolo sul numero di particelle sparisce, e con $n_i=(s_i+1)/2$ l'esponente diventa quello di Ising con $J=\varepsilon/4$ e $H=\varepsilon\gamma/4+\mu/2$. La densità è $(1+\langle s\rangle)/2$, e la condensazione è la transizione di Ising a campo nullo.
:::
::::

## Articoli correlati
- [[gas-reali-viriale-e-van-der-waals]]: la stessa approssimazione di campo medio, la stessa struttura critica.
- [[insieme-microcanonico]]: il sistema a due livelli è Ising senza interazione.
- [[insieme-canonico]]: i dipoli nel campo e la legge di Curie.
- [[insieme-gran-canonico-e-npt]]: serve per il lattice gas; il legame tra fluttuazioni e risposta.
- [[appunti-anno-scorso]]: gli errori di segno del quaderno su questo argomento.

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 143–169: modello e spin liberi pp. 143–144; Ising 1D pp. 144–146; interfacce p. 147; correlazioni pp. 147–149; alta temperatura e Ising 2D p. 150; Bragg-Williams pp. 151–154; energia libera pp. 154–157; metodo variazionale pp. 157–161; suscettività, isoterma critica e correlazioni pp. 161–162; Bethe-Peierls pp. 162–165; esponenti critici pp. 165–167; lattice gas pp. 168–169.
- `raw/foto appunti mec stat anno scorso/IMG_6343_COMPILED.HEIC`–`IMG_6348_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 39–56.
