---
tags: [meccanica-statistica, corpo-nero, planck, debye, einstein, calore-specifico, lezione]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-26
fonti:
  - raw/libri/fisica/Meccanica Statistica - dispense complete.pdf
  - raw/foto appunti mec stat anno scorso/IMG_6355_COMPILED.HEIC … IMG_6357_COMPILED.HEIC
---

# Corpo nero e calore specifico dei solidi

Due fallimenti della meccanica statistica classica: la catastrofe ultravioletta del corpo nero e il calore specifico dei solidi a bassa temperatura. Si risolvono entrambi quantizzando l'energia degli oscillatori. Per il campo elettromagnetico questo dà la legge di Planck; per il reticolo cristallino dà prima il modello di Einstein e poi quello di Debye.

## Punti chiave
- **Dati sul corpo nero:** Kirchhoff (comportamento universale), Stefan ($u\propto T^4$), Wien ($\lambda_{\max}T=$ costante). La fisica classica non spiega né il massimo dello spettro né la legge di Stefan.
- **Conteggio dei modi:** in una cavità cubica di lato $L$ i modi hanno $\vec k=\frac\pi L(n_x,n_y,n_z)$, due polarizzazioni ciascuno, e $dN=\frac{L^3}{\pi^2c^3}\omega^2d\omega=\frac{8\pi L^3}{c^3}\nu^2d\nu$. Ogni modo è un oscillatore armonico.
- **Rayleigh-Jeans:** con l'energia classica $k_BT$ per modo, $\rho(\nu)=\frac{8\pi\nu^2}{c^3}k_BT$, che integrata su $\nu$ diverge: è la catastrofe ultravioletta.
- **Planck:** con $U=n\hbar\omega$, $\langle U\rangle=\frac{\hbar\omega}{e^{\beta\hbar\omega}-1}$ e $\rho(\nu)=\frac{8\pi h\nu^3}{c^3}\frac{1}{e^{\beta h\nu}-1}$. Ne seguono Stefan-Boltzmann ($u\propto T^4$), Wien ($T\lambda_{\max}\simeq hc/5k_B$) e, a bassa frequenza, il limite classico.
- **Fotoni nel gran canonico:** il loro numero non si conserva ed è fissato minimizzando $G$, quindi $\mu=0$, $z=1$ e $G=0$. La distribuzione di Planck è Bose-Einstein a $z=1$.
- **Solidi:** classicamente vale Dulong-Petit, $C_V=3Nk_B$. Einstein, con una sola frequenza, ottiene $C_V\to0$, ma come $e^{-\theta_E/T}$, troppo in fretta. Debye, con $\rho(\nu)\propto\nu^2$ fino a $\nu_{\max}$, ottiene $C_V=\frac{12\pi^4}{5}Nk_B(T/\theta_D)^3$, in accordo con i dati.

## L'idea in breve {#idea}

::: idea
**Un'analogia per cominciare.** L'equipartizione è una legge democratica: dà la stessa quota di energia, $k_BT$, a ogni oscillatore, qualunque sia la sua frequenza. In una cavità i modi del campo sono infiniti, sempre più fitti ad alta frequenza: una democrazia con infiniti elettori distribuisce un'energia infinita. È la catastrofe ultravioletta.

Planck introduce un **biglietto d'ingresso**: un oscillatore di frequenza $\nu$ può ricevere energia solo a pacchetti di $h\nu$. Se il biglietto costa molto più di quanto il bagno termico può dare, cioè $h\nu\gg k_BT$, quell'oscillatore resta escluso: è **congelato**. Solo i modi con $h\nu\lesssim k_BT$ partecipano. Il numero di modi sotto la soglia cresce come $T^3$ e ognuno porta circa $k_BT$: ecco la legge $T^4$ di Stefan.

Lo stesso biglietto spiega perché i solidi smettono di assorbire calore a bassa temperatura: le vibrazioni del reticolo sono oscillatori, e a bassa $T$ restano attive solo quelle di frequenza più bassa, sempre meno numerose.
:::

La lezione segue questo filo.

1. [Che cos'è un corpo nero e che cosa dicono gli esperimenti](#corpo-nero).
2. [Contare i modi della cavità](#modi) e [la previsione classica](#rayleigh-jeans).
3. [Perché ogni modo è un oscillatore](#oscillatore).
4. [L'ipotesi di Planck](#planck): canonico e [gran canonico con i fotoni](#fotoni). Poi [le predizioni](#predizioni): Stefan e Wien.
5. [Il calore specifico dei solidi](#solidi): [Einstein](#einstein) e [Debye](#debye).
6. [Esercizi svolti](#esercizi).

## Il corpo nero e gli esperimenti {#corpo-nero}

Un **corpo nero** è un contenitore chiuso in equilibrio termico, per esempio una scatola. Conviene immaginarla metallica, così che la temperatura sia uniforme e la radiazione interna sia schermata da quella esterna, e cubica, di lato $L$. All'equilibrio nella scatola c'è un campo elettromagnetico che scambia energia con gli atomi del metallo a temperatura $T$: la temperatura fissa l'energia cinetica degli atomi, che accelerando emettono radiazione. Un forellino permette di misurare intensità e distribuzione in frequenza della radiazione contenuta (Dispense, p. 207).

I risultati sperimentali accumulati dalla fine dell'Ottocento (Dispense, p. 207):

- **Kirchhoff (1859):** a parità di frequenza e temperatura, materiali diversi si comportano allo stesso modo. La radiazione di corpo nero è una proprietà universale, indipendente dal contenitore.
- **Stefan (1879):** l'energia totale emessa scala come $U\sim T^4$, molto diversamente dalla previsione classica (non ancora nota all'epoca), $U\sim T$.
- **Wien (1894):** la distribuzione in frequenza ha un massimo, in contrasto con la previsione classica, e $\lambda_{\max}T=$ costante. Esperimenti successivi mostrarono che la sua formula non funziona per $\lambda$ grandi, cioè a bassa frequenza.
- **Rayleigh (1900):** calcola la distribuzione teorica e apre un problema interpretativo che porta alla meccanica quantistica.

## Contare i modi della cavità {#modi}

Il campo elettrico si annulla sulle pareti del metallo: le onde possibili sono **stazionarie**, con $n\frac\lambda2=L$ in ogni direzione. Un campo con vettore d'onda $\vec k$ è del tipo $\vec E(\vec r,t)=\vec E_0e^{i(\vec k\cdot\vec r-\omega_kt)}$ con
$$\vec k=\frac\pi L(n_x,n_y,n_z),\qquad n_i=0,1,2,\dots$$
Per ogni $\vec k$ ci sono **due polarizzazioni**, cioè due versori ortogonali a $\vec k$. Una terna $(n_x,n_y,n_z)$ più una polarizzazione definisce un **modo** di oscillazione (Dispense, p. 208).

Nello spazio dei $\vec k$ i modi formano un reticolo cubico di passo $\pi/L$, nel solo ottante positivo. In una sfera di raggio $K$ ce ne sono
$$N_{\rm modi}(k<K)=2\cdot\frac{\frac18\cdot\frac43\pi K^3}{(\pi/L)^3},\qquad dN_{\rm modi}=2\,\frac{4\pi K^2}{8}\Big(\frac L\pi\Big)^3dK=\frac{L^3}{\pi^2}K^2dK .$$
Con $\omega=ck$ e $\omega=2\pi\nu$:
$$dN_{\rm modi}(\omega)=\frac{L^3}{\pi^2c^3}\,\omega^2d\omega=\frac{8\pi L^3}{c^3}\,\nu^2d\nu$$
(Dispense, pp. 208–209; Appunti MS, pp. 70–72). **Il numero di modi cresce come il quadrato della frequenza**: ad alta frequenza ce ne sono sempre di più.

## La previsione classica: Rayleigh-Jeans {#rayleigh-jeans}

In fisica classica un modo in equilibrio a temperatura $T$ ha energia media $k_BT$, **indipendente da $\omega$**. Lo si vede scrivendo l'energia del modo, $U=\int d\tau\big(\frac{\epsilon_0|E_0|^2}{2}+\frac{|B_0|^2}{2\mu_0}\big)$. Con $E/B=c$ e $c=1/\sqrt{\epsilon_0\mu_0}$ diventa $U=L^3\epsilon_0|E_0|^2=L^3\epsilon_0(E_R^2+E_I^2)$, dove $E_R$ ed $E_I$ sono parte reale e immaginaria dell'ampiezza. Sono due termini quadratici, quindi
$$\langle U\rangle=\frac{\int dE_R\,dE_I\,U\,e^{-U/k_BT}}{\int dE_R\,dE_I\,e^{-U/k_BT}}=\frac{k_BT}{2}+\frac{k_BT}{2}=k_BT$$
(Dispense, p. 208).

Moltiplicando per il numero di modi, la densità di energia per unità di volume è
$$du=\frac1Vk_BT\,dN_{\rm modi}=\frac{8\pi}{c^3}\nu^2k_BT\,d\nu,\qquad\rho(\nu)=\frac{8\pi\nu^2}{c^3}k_BT$$
(Dispense, p. 209). La distribuzione cresce come $\nu^2$ (cioè come $\lambda^{-4}$) e linearmente con $T$. L'assurdo è ad alta frequenza: l'energia si accumula lì senza limite, e **l'energia totale diverge**. È la **catastrofe ultravioletta** (Dispense, p. 209). Il quaderno lo riassume così: ogni modo ha energia $k_BT$ qualunque sia la sua frequenza, e i modi sono infiniti (Appunti MS, p. 72).

## Perché ogni modo è un oscillatore {#oscillatore}

Per capire il passo di Planck conviene mostrare che un modo del campo è esattamente un oscillatore armonico (Dispense, pp. 209–211; Appunti MS, p. 72).

:::: {.passaggi titolo="L'energia di un modo come hamiltoniana di un oscillatore"}
**Il modo.** Un campo lungo $\hat x$ che si propaga lungo $z$, con $k_m=\pi m/L$:
$$E_x=q(t)\sqrt{\frac2L}\sin\frac{\pi mz}{L},\qquad\int_0^L\frac2L\sin^2\frac{\pi mz}{L}dz=1 .$$
**Il campo magnetico** si ricava da $\nabla\times\vec B=\frac{1}{c^2}\partial_t\vec E$, cioè $\partial_zB_y=-\frac{1}{c^2}\partial_tE_x$:
$$B_y=\frac{1}{c^2}\,\dot q(t)\sqrt{\frac2L}\,\frac{L}{\pi m}\cos\frac{\pi mz}{L},\qquad\frac{L}{\pi m}=\frac{c}{\omega_m},$$
usando $\omega_m=ck_m$.

**L'energia.** $U=\frac{\epsilon_0}{2}\int d^3r\,(E_x^2+c^2B_y^2)$. Gli integrali di $\sin^2$ e $\cos^2$ su un numero intero di semiperiodi danno la metà della lunghezza, e con $C=\epsilon_0L^2$:
$$U=C\Big(\frac{q^2}{2}+\frac{\dot q^2}{2\omega^2}\Big).$$
**Le variabili canoniche.** Con $q_X=\sqrt{C/\hbar\omega}\;q$ e $p_X=\sqrt{C/\hbar\omega}\;\dot q/\omega$:
$$U=\hbar\omega\Big(\frac{q_X^2}{2}+\frac{p_X^2}{2}\Big).$$
Prendendo $U$ come hamiltoniana, $q_X$ e $p_X$ si comportano da variabili coniugate: $\dot q_X=\frac1\hbar\frac{\partial U}{\partial p_X}=\omega p_X$ e $\dot p_X=-\frac1\hbar\frac{\partial U}{\partial q_X}=-\omega q_X$, da cui $\ddot q_X+\omega^2q_X=0$ e quindi $\ddot q+\omega^2q=0$.
::::

**Ogni modo del campo è a tutti gli effetti un oscillatore armonico**, in cui $q$ e $p$ sono le energie associate al campo elettrico e al campo magnetico (Dispense, p. 211).

::: attenzione
**Un segno.** Le dispense (p. 211) scrivono le equazioni di Hamilton come $\frac1\hbar\frac{\partial H}{\partial p_X}=\omega p_X=-\dot q_X$ e $\frac1\hbar\frac{\partial H}{\partial q_X}=\omega q_X=\dot p_X$, e concludono con $\ddot q-\omega^2q=0$, che descriverebbe una crescita esponenziale, non un'oscillazione. Dalle definizioni stesse, $\dot q_X=\sqrt{C/\hbar\omega}\,\dot q=\omega p_X$ e $\dot p_X=\sqrt{C/\hbar\omega}\,\ddot q/\omega$: con i segni corretti si ottiene $\ddot q+\omega^2q=0$. Calcolo mio.
:::

## L'ipotesi di Planck {#planck}

La catastrofe ultravioletta dice che c'è sicuramente un problema ad alta frequenza, e le leggi di Wien (valida ad alta frequenza) e di Stefan lo confermano. Il calcolo classico è d'accordo con i dati solo a bassa frequenza. Planck, guidato solo dall'intuizione, **postula** che le energie possibili di un modo siano multipli di un'energia base proporzionale a $\omega$:
$$U_{\vec k}=n\hbar\omega_{\vec k},\qquad n=0,1,2,\dots$$
La costante di proporzionalità, un'energia diviso una frequenza, è oggi la **costante di Planck** (Dispense, pp. 211–212).

**Il calcolo canonico.** La probabilità che il modo abbia energia $E_n$ è proporzionale a $e^{-E_n/k_BT}$. Con $x=e^{-\beta\hbar\omega}$:
$$Q=\sum_{n=0}^\infty e^{-\beta n\hbar\omega}=\sum_nx^n=\frac{1}{1-e^{-\beta\hbar\omega}},$$
$$\langle U(\omega,T)\rangle=\hbar\omega\frac{\sum_nnx^n}{\sum_nx^n}=\hbar\omega\,x\frac{d}{dx}\ln\frac{1}{1-x}=\hbar\omega\frac{x}{1-x}=\frac{\hbar\omega}{e^{\beta\hbar\omega}-1}$$
(Dispense, p. 212; Appunti MS, p. 73). Il trucco è che $nx^n=x\frac{d}{dx}x^n$.

::: idea
**Il congelamento dei modi.** Per $\hbar\omega\ll k_BT$, $e^{\beta\hbar\omega}-1\simeq\beta\hbar\omega$ e $\langle U\rangle\to k_BT$: il modo è classico. Per $\hbar\omega\gg k_BT$, $\langle U\rangle\simeq\hbar\omega\,e^{-\beta\hbar\omega}\to0$: il modo è congelato, perché anche un solo quanto costa troppo rispetto all'energia termica disponibile. I modi ad alta frequenza, che erano infiniti, smettono di contare, e la catastrofe sparisce. È lo stesso comportamento dell'oscillatore quantistico nell'[[insieme-canonico]].
:::

## Il punto di vista dei fotoni: il gran canonico {#fotoni}

Si può cambiare linguaggio: invece di dire che il modo ha energia $n\hbar\omega$, si dice che il modo ha energia $\hbar\omega$ ed è **popolato da $n$ particelle**, i **fotoni**. L'energia del livello è fissa e il numero di particelle varia: si passa al gran canonico, $\mathcal Q_{gc}=\sum_nz^ne^{-\beta n\hbar\omega}$ (Dispense, p. 212).

**Perché $\mu=0$.** A differenza dei gas di [[gas-quantistici-ideali|particelle quantistiche]], che hanno un'identità e si possono solo scambiare con il serbatoio, i fotoni si creano e si distruggono. Il loro numero non è fissato dall'esterno: lo sceglie il sistema, **minimizzando l'energia libera di Gibbs**. Deve valere $dG/dn=0$, e poiché $dG/dn=\mu$, si conclude che $\mu=0$ sempre, e quindi $G=0$ (Dispense, pp. 212–213). Il quaderno, su questo punto, annota «perché? Boh» (Appunti MS, p. 73): la risposta è proprio questa.

Con $\mu=0$, $z=1$ e $\mathcal Q_{gc}=\sum_ne^{-\beta n\hbar\omega}=Q_{\rm canonico}$:
$$n_\omega(T)=\frac{1}{e^{\beta\hbar\omega}-1},\qquad\langle U\rangle_\omega=\frac{\hbar\omega}{e^{\beta\hbar\omega}-1},$$
esattamente lo stesso risultato del canonico (Dispense, p. 213). **La distribuzione di Planck è la distribuzione di Bose-Einstein con $z=1$.**

**Verifica che $G=0$.** $\beta G=\beta A+\beta PV$, ma $\beta PV=\ln\mathcal Q_{gc}=\ln Q_{\rm canonico}=-\beta A$, quindi $G=0$ (Dispense, p. 213).

I due approcci sono due letture dello stesso fenomeno: un sistema di livelli equispaziati, oppure un livello solo popolato da un numero arbitrario di fotoni. Il fotone è un bosone, come mostra la sua statistica, e ha spin 1. Dei tre stati di spin, quello lungo la direzione di propagazione non esiste, perché il campo elettrico non può oscillare in quella direzione; i due rimasti corrispondono alle polarizzazioni circolari destra e sinistra (Dispense, p. 213).

## Le predizioni della teoria di Planck {#predizioni}

La densità di energia tra $\omega$ e $\omega+d\omega$ è l'energia media di un modo per il numero di modi, diviso il volume:
$$\rho(\omega)\,d\omega=\frac1V\langle U(\omega,T)\rangle\,dN_{\rm modi}(\omega)=\frac{\hbar\omega^3}{\pi^2c^3}\frac{d\omega}{e^{\beta\hbar\omega}-1},$$
$$\rho(\nu)=\frac{8\pi h\nu^3}{c^3}\,\frac{1}{e^{\beta h\nu}-1}$$
(Dispense, p. 213).

**L'energia totale: Stefan-Boltzmann.** Con $x=\beta h\nu$:
$$u=\int_0^\infty\rho(\nu)\,d\nu=\frac{8\pi h}{c^3}\,\frac{1}{(\beta h)^4}\int_0^\infty\frac{x^3\,dx}{e^x-1}.$$
L'integrale è un numero puro: non c'è più catastrofe, e tutta la dipendenza dalla temperatura è in $\beta^{-4}$, cioè $T^4$. È la legge di Stefan (Dispense, pp. 213–214; Appunti MS, pp. 73–74).

**Il massimo: Wien.** A bassa $\nu$, $e^{\beta h\nu}-1\simeq\beta h\nu$ e $\rho\sim\nu^2$; ad alta $\nu$, $\rho\sim\nu^3e^{-\beta h\nu}$. In mezzo c'è un massimo. Scritta in funzione della variabile adimensionale $\beta h\nu$, la distribuzione ha il massimo a un valore fisso di $\beta h\nu$; poiché $\lambda\nu=c$, ne segue $\lambda_{\max}T=$ costante: la legge di Wien. Calcolando il massimo esattamente,
$$T\lambda_{\max}\simeq\frac{hc}{5k_B},$$
che permise di determinare $h$, dato che $c$ e $k_B$ erano noti: $h\approx6{,}7\cdot10^{-34}$ J s (Dispense, p. 214). A 1 Hz i livelli distano $\sim10^{-34}$ J, praticamente un continuo; nel visibile, $\nu\sim10^{15}$ Hz, distano $\sim10^{-19}$ J, un valore significativo.

**Il limite di bassa frequenza.** Per $\beta h\nu\ll1$:
$$\rho(\nu)\simeq\frac{8\pi h\nu^3}{c^3}\,\frac{1}{\beta h\nu}=\frac{8\pi\nu^2}{c^3}k_BT,$$
che è esattamente Rayleigh-Jeans (Dispense, p. 214). La teoria di Planck funziona ovunque, e dà un grosso impulso alla meccanica quantistica.

::: {.lab-segnaposto tipo="planck"}
:::

## Il calore specifico dei solidi {#solidi}

**La previsione classica.** In prima approssimazione un solido è un sistema di atomi legati da un potenziale armonico. Sviluppando l'energia potenziale attorno al minimo:
$$V(\vec r^{\,N})\simeq V(\vec r^{\,N}_{\min})+\frac12\sum_{i\alpha}\sum_{j\beta}\Big(\frac{\partial^2V}{\partial r_{i\alpha}\partial r_{j\beta}}\Big)_{\min}(r_{i\alpha}-r_{i\alpha,\min})(r_{j\beta}-r_{j\beta,\min}),$$
senza termine lineare, perché nel minimo le forze sono nulle. Diagonalizzata, l'hamiltoniana è la somma di $3N-6$ **modi normali** armonici di frequenze diverse; il 6 conta le 3 traslazioni e le 3 rotazioni rigide. Energia cinetica e potenziale sono quadratiche, quindi ogni modo porta $k_BT$, e trascurando il 6 per $N$ grande:
$$U=3Nk_BT,\qquad C_V=3Nk_B,$$
indipendente da $T$ e uguale per tutti i materiali (Dispense, pp. 214–215; Appunti MS, p. 75).

**Gli esperimenti.** Le prime misure (1819) portarono Dulong e Petit a postulare che tutti i solidi abbiano lo stesso calore specifico. Ma nel tardo Ottocento le misure sotto la temperatura ambiente mostrarono che $C_V$ cala, fino ad annullarsi a basse temperature. Il paradosso: proprio dove l'approssimazione armonica dovrebbe funzionare meglio, la previsione classica peggiora (Dispense, p. 215).

## Il modello di Einstein {#einstein}

Nel 1906 Einstein riconobbe l'analogia tra le vibrazioni di un solido e l'idea di Planck, e postulò che anche l'energia dei modi di vibrazione fosse quantizzata: $E_n=n\hbar\omega$. L'energia media di un modo è quella di Planck, $\langle U(\omega,T)\rangle=\frac{\hbar\omega}{e^{\beta\hbar\omega}-1}$, che passa da $k_BT$ ad alta $T$ a zero a bassa $T$. Supponendo per semplicità che **tutti** i modi abbiano la stessa frequenza $\omega$ (Dispense, p. 215; Appunti MS, pp. 75–76):
$$\langle U(T)\rangle=3N\frac{\hbar\omega}{e^{\beta\hbar\omega}-1},\qquad C_V=3N\frac{(\hbar\omega)^2}{k_BT^2}\,\frac{e^{\beta\hbar\omega}}{(e^{\beta\hbar\omega}-1)^2}.$$
Con la **temperatura di Einstein** $\theta_E=\hbar\omega/k_B$:
$$C_V^E=3Nk_B\Big(\frac{\theta_E}{T}\Big)^2\frac{e^{\theta_E/T}}{\big(e^{\theta_E/T}-1\big)^2},\qquad C_V^E(T\to0)\simeq3Nk_B\Big(\frac{\theta_E}{T}\Big)^2e^{-\theta_E/T}.$$
Il modello cattura la discesa di $C_V$ e mostra che la discretizzazione dei livelli conta anche nei solidi. Ma a bassa $T$ la discesa è **esponenziale**, molto più rapida di quella misurata (Dispense, p. 215). La figura delle dispense (p. 216) riporta i dati originali di Dulong e Petit con il fit di Debye.

## Il modello di Debye {#debye}

Debye sostituisce la frequenza unica di Einstein con una **densità di modi**, calcolata come per la radiazione nella cavità (Dispense, p. 218; Appunti MS, pp. 76–77).

**La densità dei modi.** Per onde stazionarie in un volume $L^3$, per una polarizzazione, $\rho(\nu)=\frac{4\pi V}{v_s^3}\nu^2$, dove al posto di $c$ c'è la velocità del suono $v_s$. Nelle vibrazioni di un solido ci sono **due modi trasversi**, con velocità $v_t$, e **uno longitudinale**, con velocità $v_l$. Con una velocità media definita da $\frac{3}{v^3}=\frac{2}{v_t^3}+\frac{1}{v_l^3}$:
$$\rho(\nu)=\frac{12\pi V}{v^3}\,\nu^2 .$$

**Il taglio.** A differenza della radiazione, un solido ha un numero finito di modi, $3N$ (trascurando il 6): gli atomi stanno a una distanza reticolare, quindi esiste una lunghezza d'onda minima. Debye sceglie la frequenza massima, la **frequenza di Debye**, in modo che i modi siano esattamente $3N$:
$$\int_0^{\nu_{\max}}\rho(\nu)\,d\nu=3N\quad\Longrightarrow\quad\nu_{\max}=v\Big(\frac{3N}{4\pi V}\Big)^{1/3}.$$

**Il calore specifico.** Moltiplicando la densità dei modi per l'energia media di Planck e derivando rispetto a $T$, con $x=h\nu/k_BT$ e la **temperatura di Debye** $\theta_D=h\nu_{\max}/k_B$:
$$C_V^D=9Nk_B\Big(\frac{T}{\theta_D}\Big)^3\int_0^{\theta_D/T}\frac{x^4e^x}{(e^x-1)^2}\,dx$$
(Dispense, p. 218).

:::: {.passaggi titolo="I due limiti della formula di Debye"}
**Alta temperatura.** L'estremo $\theta_D/T\to0$, quindi $x$ è piccolo: $\frac{x^4e^x}{(e^x-1)^2}\simeq\frac{x^4(1+x)}{x^2}\simeq x^2$, e
$$C_V^D\simeq9Nk_B\Big(\frac{T}{\theta_D}\Big)^3\int_0^{\theta_D/T}x^2dx=9Nk_B\Big(\frac{T}{\theta_D}\Big)^3\frac13\Big(\frac{\theta_D}{T}\Big)^3=3Nk_B :$$
Dulong-Petit.

**Bassa temperatura.** L'estremo va all'infinito, e l'integrale diventa un numero:
$$\int_0^\infty\frac{x^4e^x}{(e^x-1)^2}dx=\frac{4\pi^4}{15},\qquad C_V^D(T\to0)=\frac{12\pi^4}{5}Nk_B\Big(\frac{T}{\theta_D}\Big)^3$$
(Dispense, pp. 218–219).
::::

È la famosa **legge $T^3$**, il trionfo della teoria di Debye. La ragione è la stessa della legge di Stefan: a bassa $T$ sono attivi solo i modi con $h\nu\lesssim k_BT$, che sono $\propto T^3$, e ciascuno porta $\sim k_BT$, quindi $U\propto T^4$ e $C_V\propto T^3$. Le figure delle dispense confrontano la teoria con i dati (p. 217) e le due teorie tra loro (p. 219). La parte lineare a bassa $T$ che si osserva nei metalli viene dal calore specifico degli **elettroni**, il gas di Fermi dei [[gas-quantistici-ideali]] (Dispense, p. 217).

**Stati corrispondenti.** Sia Einstein sia Debye prevedono una legge degli stati corrispondenti: scalando la temperatura con $\theta_E$ o $\theta_D$, tutti i materiali seguono la stessa curva (Dispense, p. 219). È lo stesso tipo di universalità visto per [[gas-reali-viriale-e-van-der-waals|Van der Waals]].

::: {.lab-segnaposto tipo="solidi"}
:::

## Esercizi svolti {#esercizi}

:::: esercizio
**Wien, Stefan e il Sole.** (a) Trovare la posizione del massimo di $\rho(\nu)$ e quella del massimo della distribuzione in lunghezza d'onda. (b) Ricavare la costante di Stefan-Boltzmann $\sigma$, sapendo che la potenza emessa per unità di superficie è $\frac c4u$. (c) Il Sole emette come un corpo nero a circa 5800 K: dove cade il massimo? Esercizio mio, costruito sulle formule di pp. 213–214.

::: soluzione
**(a) In frequenza.** Con $x=\beta h\nu$, $\rho\propto\frac{x^3}{e^x-1}$. Derivando e annullando: $3(1-e^{-x})=x$, con soluzione numerica $x\simeq2{,}821$, cioè $h\nu_{\max}\simeq2{,}82\,k_BT$.

**In lunghezza d'onda.** $\rho(\lambda)\,d\lambda=\rho(\nu)\,|d\nu|$ con $\nu=c/\lambda$, quindi $\rho(\lambda)\propto\lambda^{-5}/(e^{hc/\lambda k_BT}-1)$. Con $x=hc/\lambda k_BT$ il massimo soddisfa $5(1-e^{-x})=x$, cioè $x\simeq4{,}965$:
$$T\lambda_{\max}=\frac{hc}{4{,}965\,k_B}\simeq2{,}898\cdot10^{-3}\ {\rm m\,K}.$$
È il «$hc/5k_B$» delle dispense. Attenzione: i due massimi **non** corrispondono, $c/\nu_{\max}\neq\lambda_{\max}$, perché $d\lambda$ e $d\nu$ non sono proporzionali.

**(b)** $\int_0^\infty\frac{x^3dx}{e^x-1}=\Gamma(4)\zeta(4)=6\cdot\frac{\pi^4}{90}=\frac{\pi^4}{15}$, quindi
$$u=\frac{8\pi^5k_B^4}{15h^3c^3}T^4,\qquad\sigma=\frac c4\cdot\frac{8\pi^5k_B^4}{15h^3c^3}=\frac{2\pi^5k_B^4}{15h^3c^2}\simeq5{,}67\cdot10^{-8}\ {\rm W\,m^{-2}K^{-4}}.$$

**(c)** $\lambda_{\max}\simeq2{,}898\cdot10^{-3}/5800\simeq500$ nm: verde, al centro del visibile. Il massimo in frequenza invece è a $\nu\simeq2{,}82\,k_BT/h\simeq340$ THz, che corrisponde a circa 880 nm, nell'infrarosso. Dire dove sta «il massimo» dello spettro solare dipende da come lo si disegna.
:::
::::

:::: esercizio
**Einstein contro Debye a bassa temperatura.** Confrontare il calore specifico dei due modelli a $T=\theta/10$, prendendo la stessa temperatura caratteristica $\theta_E=\theta_D=\theta$. Esercizio mio, costruito sulle formule di pp. 215 e 219.

::: soluzione
**Einstein:** $C_V^E/Nk_B=3\cdot10^2\,\frac{e^{10}}{(e^{10}-1)^2}\simeq3\cdot100\cdot4{,}54\cdot10^{-5}\simeq0{,}0136$.

**Debye** (limite di bassa $T$): $C_V^D/Nk_B=\frac{12\pi^4}{5}\cdot10^{-3}\simeq0{,}234$.

Debye dà un calore specifico circa **17 volte** più grande. Il motivo: in Einstein tutti i modi hanno la stessa frequenza alta, e a $T=\theta/10$ sono tutti congelati; in Debye i modi di frequenza bassissima, le onde sonore lunghe, restano attivi a qualunque temperatura. A temperature ancora più basse la differenza cresce senza limite: un esponenziale contro una potenza. Sono proprio i modi acustici di bassa frequenza a spiegare i dati.
:::
::::

## Mettiti alla prova {#mettiti-alla-prova}

Prova a rispondere a voce, con parole tue, prima di aprire la risposta.

:::: domanda
Da dove viene la catastrofe ultravioletta? Quali due ingredienti la producono?

::: risposta
Dal prodotto di due cose: il numero di modi della cavità cresce come $\nu^2$ senza limite, e l'equipartizione assegna a ciascuno la stessa energia $k_BT$, indipendente dalla frequenza. La densità di energia $\rho(\nu)\propto\nu^2T$ integrata su tutte le frequenze diverge.
:::
::::

:::: domanda
Perché un modo del campo elettromagnetico è un oscillatore armonico?

::: risposta
L'energia di un modo stazionario si scrive come $C\big(\frac{q^2}{2}+\frac{\dot q^2}{2\omega^2}\big)$, dove $q$ è l'ampiezza del campo elettrico e $\dot q$ è legato al campo magnetico. Con le variabili riscalate $q_X$ e $p_X$ diventa $\hbar\omega\frac{q_X^2+p_X^2}{2}$, che è l'hamiltoniana di un oscillatore: le equazioni di Hamilton danno $\ddot q+\omega^2q=0$.
:::
::::

:::: domanda
Come elimina la catastrofe l'ipotesi di Planck?

::: risposta
Con energie $n\hbar\omega$, l'energia media di un modo è $\hbar\omega/(e^{\beta\hbar\omega}-1)$: vale $k_BT$ se $\hbar\omega\ll k_BT$, ma va a zero esponenzialmente se $\hbar\omega\gg k_BT$. I modi ad alta frequenza sono congelati, perché anche un solo quanto costa troppo, e l'integrale su tutte le frequenze converge a un valore $\propto T^4$.
:::
::::

:::: domanda
Perché il potenziale chimico dei fotoni è zero?

::: risposta
I fotoni si creano e si distruggono: il loro numero non è vincolato dall'esterno, e il sistema lo sceglie minimizzando l'energia libera di Gibbs. Il minimo richiede $\partial G/\partial n=\mu=0$. Con $z=1$ la funzione gran canonica coincide con quella canonica, e la distribuzione di Planck è Bose-Einstein con $\mu=0$.
:::
::::

:::: domanda
Perché l'energia del corpo nero va come $T^4$? Prova a spiegarlo senza integrali.

::: risposta
Sono attivi solo i modi con $h\nu\lesssim k_BT$. Il numero di modi sotto una frequenza $\nu$ va come $\nu^3$, quindi quelli attivi sono $\propto T^3$. Ciascuno porta un'energia dell'ordine di $k_BT$: in totale $T^3\cdot T=T^4$. Lo stesso argomento, per i fononi, dà $C_V\propto T^3$ nella teoria di Debye.
:::
::::

:::: domanda
Che cosa sbaglia il modello di Einstein, e come lo corregge Debye?

::: risposta
Einstein dà a tutti i modi la stessa frequenza: a bassa $T$ sono tutti congelati insieme e $C_V$ cala esponenzialmente, troppo in fretta. Nel solido vero ci sono anche onde sonore di frequenza arbitrariamente bassa, che restano attive. Debye usa la densità dei modi delle onde sonore, $\rho(\nu)\propto\nu^2$, tagliata a $\nu_{\max}$ per avere $3N$ modi, e ottiene $C_V\propto T^3$, come nei dati.
:::
::::

:::: domanda
Nei metalli, a temperature molto basse, $C_V$ va come $aT+bT^3$. Da dove viene ciascun termine?

::: risposta
$bT^3$ viene dalle vibrazioni del reticolo, i fononi di Debye. $aT$ viene dagli elettroni di conduzione, un gas di Fermi degenere: solo quelli entro $k_BT$ dall'energia di Fermi si eccitano, e danno $C_V\propto T$. A temperature abbastanza basse il termine lineare domina, perché $T^3$ va a zero più in fretta.
:::
::::

## Articoli correlati
- [[gas-quantistici-ideali]]: i fotoni sono bosoni con $\mu=0$, e la distribuzione di Planck è Bose-Einstein a $z=1$; il calore specifico elettronico dei metalli.
- [[insieme-canonico]]: l'oscillatore quantistico e il congelamento dei gradi di libertà.
- [[insieme-microcanonico]]: equipartizione, che qui fallisce, e il difetto degli oscillatori classici.
- [[astrofisica/corpo-nero-e-spettri-stellari]]: lo stesso corpo nero, usato per gli spettri stellari.
- [[appunti-anno-scorso]]: la mappa del quaderno.

## Fonti
- `raw/libri/fisica/Meccanica Statistica - dispense complete.pdf`, Dispense, pp. 207–219: corpo nero ed esperimenti p. 207; modi e previsione classica pp. 208–209; il modo come oscillatore pp. 209–211; Planck, canonico e gran canonico pp. 211–213; predizioni p. 214; solidi e Dulong-Petit pp. 214–215; Einstein pp. 215–217; Debye pp. 218–219.
- `raw/foto appunti mec stat anno scorso/IMG_6355_COMPILED.HEIC`–`IMG_6357_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 70–77.
