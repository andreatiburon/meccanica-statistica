---
tags: [meccanica-statistica, gas-reali, viriale, van-der-waals, transizioni-di-fase]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-12
fonti:
  - raw/foto appunti mec stat anno scorso/IMG_6341_COMPILED.HEIC
  - raw/foto appunti mec stat anno scorso/IMG_6342_COMPILED.HEIC
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Gas reali: espansione del viriale e Van der Waals

Le interazioni tra particelle correggono l'equazione di stato del gas perfetto. A bassa densità le correzioni sono una serie di potenze in $\rho$, l'espansione del viriale, il cui primo coefficiente si calcola con la funzione di Mayer. Il modello di Van der Waals aggiunge volume escluso e attrazione media, e produce una transizione liquido-gas con un punto critico.

## Punti chiave
- **Espansione del viriale:** $\beta P/\rho=1+\sum_{n\ge2}B_n(T)\rho^{n-1}$. Il coefficiente $B_n$ descrive le interazioni tra $n$ particelle.
- **Funzione di Mayer:** $f_{ij}=e^{-\beta v(r_{ij})}-1$, che vale $0$ dove non c'è interazione e $-1$ dove il potenziale diverge. A bassa densità basta il termine lineare in $f$, e si ottiene $B_2(T)=-\frac12\int f_{12}\,\mathrm{d}^3r=-2\pi\int r^2f(r)\,\mathrm{d} r$.
- **Van der Waals:** $Q_N=\frac1{N!\lambda^{3N}}(V-Nv_0)^Ne^{\beta aN^2/V}$, da cui $P=\frac{k_B T}{v-v_0}-\frac a{v^2}$.
- **Punto critico:** si annullano insieme $\partial P/\partial v$ e $\partial^2P/\partial v^2$, e si ottiene $v_c=3v_0$, $k_B T_c=8a/27v_0$, $P_c=a/27v_0^2$.
- **Coesistenza:** la costruzione di Maxwell, $\int_{V_2}^{V_1}[P(V)-P_{\rm coe}]\,\mathrm{d} V=0$, equivale a uguagliare $\mu$ nelle due fasi, cioè alla tangente comune a $A(V)$.
- **Vicino al punto critico** $K_T\propto(1-\tilde T)^{-1}$ diverge, e con esso $\langle\Delta N^2\rangle$: l'approssimazione di campo medio smette di essere affidabile.

## Primo coefficiente del viriale
Con un potenziale a coppie si scrive $e^{-\beta\sum v_{ij}}=\prod_{ij}(1+f_{ij})$ e si sviluppa il prodotto: $1+\sum f_{ij}+\sum f_{ij}f_{kl}+\dots$ A bassa densità è improbabile che più coppie interagiscano insieme, quindi si tiene solo il termine lineare. Le $N(N-1)/2$ coppie danno integrali tutti uguali, e
$$Q_N\simeq\frac{V^N}{N!\lambda^{3N}}\Big(1+\frac{N(N-1)}{2V}\int f_{12}\,\mathrm{d}^3r_{12}\Big).$$
Derivando $\log Q_N$ rispetto a $V$ si ottiene $\beta P=\rho+\rho^2B_2$ (Appunti MS, pp. 33–35; Dispense, pp. 132–135).

**Espansione ad alta temperatura.** Se $k_B T\gg v$ si sviluppa direttamente $e^{-\beta v}\simeq1-\beta v$. Il termine quadratico contiene tre classi di integrali, a seconda di quante particelle condividono le due coppie (Appunti MS, p. 35).

## Van der Waals
Per sfere dure di diametro $\sigma$, il volume escluso da una coppia è $\frac43\pi\sigma^3$; va dimezzato perché conta due particelle, e il volume accessibile diventa $V-Nv_0$. L'attrazione si modella in campo medio: ogni particella interagisce con energia $-\varepsilon$ con le altre entro un raggio $R_c$, e l'energia totale è $E=-aN^2/V$ (Appunti MS, pp. 36–37; Dispense, pp. 137–140).

L'equazione di stato è cubica in $V$, quindi sotto $T_c$ l'isoterma non è monotona. In forma ridotta, con $\tilde P=P/P_c$ e analoghi:
$$\tilde P=\frac{8\tilde T}{3\tilde v-1}-\frac3{\tilde v^2}.$$
Vicino al punto critico vale $\partial\tilde P/\partial\tilde v|_{\tilde v=1}=6(1-\tilde T)$, quindi la compressibilità diverge in $T_c$ (Appunti MS, pp. 37–39).

## Costruzione di Maxwell
All'equilibrio tra due fasi sono uguali $T$, $P$ e $G/N=\mu$. Da $A_1+P_{\rm coe}V_1=A_2+P_{\rm coe}V_2$ e $P=-\partial A/\partial V$ segue la regola delle aree uguali. Nel grafico $A(V)$ le due fasi sono i punti di tangenza della retta comune, con pendenza $-P_{\rm coe}$. Tra i due flessi c'è la zona spinodale, instabile; tra il punto di tangenza e il flesso ci sono gli stati metastabili (Appunti MS, pp. 37–38; Dispense, p. 126).

## Articoli correlati
- [[insieme-canonico]]: la formula $P=Nk_B T/V-\langle\partial H/\partial V\rangle$ da cui parte tutto.
- [[insieme-gran-canonico-e-npt]]: il legame $\langle\Delta N^2\rangle\propto K_T$.
- [[modello-di-ising-e-campo-medio]]: il lattice gas riporta a Van der Waals, e la stessa approssimazione di campo medio dà Bragg-Williams.

## Fonti
- `raw/foto appunti mec stat anno scorso/IMG_6341_COMPILED.HEIC`, `IMG_6342_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 33–39.
- Dispense, PDF unito: viriale pp. 132–135, Van der Waals pp. 137–140, costruzione di Maxwell p. 126.
