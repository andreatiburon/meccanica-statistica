---
tags: [meccanica-statistica, ensemble, gran-canonico, npt, fluttuazioni]
data_creazione: 2026-10-12
data_aggiornamento: 2026-10-12
fonti:
  - raw/foto appunti mec stat anno scorso/IMG_6338_COMPILED.HEIC … IMG_6340_COMPILED.HEIC
  - output/dispense-ms/Meccanica Statistica - dispense complete.pdf
---

# Insieme gran canonico e insieme NPT

Quando il sistema scambia con il serbatoio anche particelle (gran canonico) o volume (NPT), si ripete la derivazione del canonico con una variabile in più. Nel primo caso compaiono il potenziale chimico e la fugacità, nel secondo la pressione e l'energia libera di Gibbs. Entrambi gli insiemi sono una somma di canonici pesata, rispettivamente su $N$ o su $V$.

## Punti chiave
- **Gran canonico:** $\rho\propto z^Ne^{-\beta H}/(N!h^{3N})$, con $\mathcal Q_{GC}(z,V,T)=\sum_Nz^NQ_N(V,T)=e^{\beta PV}$.
- **Fugacità:** $z=e^{\beta\mu}$, dove il potenziale chimico è $\mu=(\partial A/\partial N)_{V,T}$. Per il gas perfetto $z=\rho\lambda^3$.
- **Medie:** $\langle N\rangle=z\,\partial_z\log\mathcal Q_{GC}$ e $U=-\partial_\beta\log\mathcal Q_{GC}$.
- **Fluttuazioni di $N$:** $\langle\Delta N^2\rangle=(z\partial_z)^2\log\mathcal Q_{GC}=Nk_B T\rho K_T$, dove $K_T$ è la compressibilità isoterma. Le fluttuazioni relative vanno come $N^{-1/2}$ e divergono soltanto dove diverge $K_T$, cioè al punto critico.
- **NPT:** $e^{-\beta G(N,P,T)}=\int\mathrm{d} V\,e^{-\beta PV}Q_N(V,T)$, cioè una somma di canonici su tutti i volumi. Con il punto di sella si ottiene $G=P\bar V+A(\bar V)$.

## Gran canonico
Si classificano i microstati di sistema + serbatoio per il numero $N_1$ di particelle nel sistema, trascurando l'interazione all'interfaccia. Si sviluppano $A(V-V_1,N-N_1)$ al primo ordine e si definiscono $\mu=(\partial A/\partial N)_V$ e $P=-(\partial A/\partial V)_N$. Il rapporto tra le funzioni di partizione del serbatoio diventa allora
$$\frac{Q_{N-N_1}(V-V_1)}{Q_N(V)}=e^{\beta\mu N_1-\beta PV_1}.$$
Ne segue $1=\sum_{N_1}e^{-\beta PV_1}z^{N_1}Q_{N_1}$, cioè la normalizzazione della probabilità di avere $N_1$ particelle (Appunti MS, pp. 27–28; Dispense, pp. 118–120).

Per il gas perfetto, derivando $A=-Nk_B T\log(Ve/N\lambda^3)$ si ottiene $\mu=k_B T\log(\rho\lambda^3)$ (Appunti MS, p. 29).

## Compressibilità isoterma e fluttuazioni di N
Applicando due volte $z\partial_z$ a $\log\mathcal Q_{GC}$ si ottiene $\langle N^2\rangle-\langle N\rangle^2$. Con $z\partial_z=\partial/\partial(\beta\mu)$ e $\log\mathcal Q_{GC}=\beta PV$ questo diventa $\langle\Delta N^2\rangle=\frac V\beta\,\partial^2P/\partial\mu^2$.

Per calcolare $\partial^2P/\partial\mu^2$ si usa l'estensività, $A=N\,a(v,T)$ con $v=V/N$. Allora $P=-\partial a/\partial v$, $\mu=a-v\,\partial a/\partial v$ e $\partial P/\partial\mu=1/v$. Derivando ancora si trova $\partial^2P/\partial\mu^2=K_T/v^2$, con $K_T=-\frac1v(\partial v/\partial P)_T$ (Appunti MS, pp. 30–31; Dispense, pp. 122–123).

La distribuzione $P(N)=z^NQ_N/\mathcal Q_{GC}$ è gaussiana attorno a $\bar N$, con larghezza fissata da $\partial^2A/\partial N^2$ (Appunti MS, p. 31). La trascrizione segnala che il fattore sotto radice del prefattore va al denominatore.

## Insieme NPT
Volume del sistema e volume del serbatoio fluttuano, con $V_1+V_2=V$ costante. Si integra sul serbatoio inserendo $\int\mathrm{d} V_1\,\delta(V_1-V(q_1,p_1))=1$ e si usa lo stesso sviluppo del gran canonico. Si ottiene
$$\rho(q_1,p_1)=\frac1{N_1!h^{3N_1}}\,e^{-\beta(H_1+PV_1)}\,e^{\beta\mu N_1}.$$
Qui $e^{\beta\mu N_1}=e^{\beta G}$ fa da normalizzazione. Il punto di sella in $\bar V$ dà la condizione $P+\partial A/\partial V|_{\bar V}=0$ e la relazione $G=P\bar V+A$ (Appunti MS, pp. 32–33; Dispense, pp. 128–131). Nel quaderno la sezione «Funzione di partizione dell'NPT» è solo intitolata.

## Articoli correlati
- [[insieme-canonico]]: la derivazione di base, di cui questa è un'estensione.
- [[gas-quantistici-ideali]]: il gran canonico rende fattorizzabili i gas di bosoni e di fermioni.
- [[modello-di-ising-e-campo-medio]]: il lattice gas si risolve passando al gran canonico.
- [[gas-reali-viriale-e-van-der-waals]]: $K_T$ diverge al punto critico di Van der Waals.

## Fonti
- `raw/foto appunti mec stat anno scorso/IMG_6338_COMPILED.HEIC`–`IMG_6340_COMPILED.HEIC`, trascritte in «Appunti MS», pp. 27–33.
- Dispense, PDF unito: gran canonico pp. 118–127, NPT pp. 128–131.
