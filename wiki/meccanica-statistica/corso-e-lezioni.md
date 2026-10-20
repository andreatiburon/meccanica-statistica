---
tags: [meccanica-statistica, corso, lezioni]
data_creazione: 2026-10-06
data_aggiornamento: 2026-10-12
fonti:
  - raw/appunti mec statistica/mec stat.pdf
  - raw/appunti mec statistica/spaziodellefasi.pdf
---

# Corso di Meccanica Statistica: organizzazione e lezioni

Stato del corso di Meccanica Statistica, ricavato dagli appunti manoscritti dell'utente e dalla dispensa "Lo spazio delle fasi". La trascrizione integrale degli appunti è in `.testo/appunti-ms-lezioni/trascrizione.md`.

## Punti chiave
- **Materiale:** le dispense del corso; il sito web di un'ex docente resta un riferimento.
- **Fatto fino al 6 ottobre 2026:**
  - ripasso di termodinamica (principi, potenziali, trasformata di Legendre, relazioni di Maxwell);
  - richiami di probabilità (distribuzioni, legge dei grandi numeri, limite centrale, punto di sella);
  - teorema di Liouville.
- **Dal quaderno Goodnotes, letto il 9 ottobre 2026 (pp. 20-24):** teorema di Birkhoff (media temporale); osservabili microscopiche e macroscopiche e tempi di esplorazione ($T_{exp} \gg \varepsilon^{-6N}$); teorema di Khinchin (stima con Markov e Cauchy-Schwarz, scala $N^{-1/4}$); insieme microcanonico: postulato di uguale probabilità a priori, $\Gamma(E)$, $\Gamma_\Delta(E)$, $\Sigma(E)$ e $\omega(E) = d\Sigma/dE$. Trascrizione in `.testo/appunti-ms-lezioni/trascrizione.md`.
- **Pagina di studio (11 ottobre 2026):** spazio delle fasi, insieme microcanonico e insieme canonico dalle dispense del corso, con tutti i passaggi: `output/studio-ms/Studio MS - microcanonico e canonico.pdf` (16 pagine, formato Goodnotes; sorgente `output/studio-ms/insiemi.html`). Testo delle dispense in `.testo/ms-microcanonico/` e `.testo/ms-canonico/`.
- **Ora persa:** spazio delle fasi Γ, ensemble di Gibbs, media termodinamica ed ergodicità. Negli appunti è il salto tra p. 15 e p. 18, con le pp. 16-17 vuote. Si recupera dalla dispensa, pp. 1-4. Il foglio di recupero pronto per Goodnotes è `output/recupero-ms/recupero-spazio-fasi-gibbs-ergodicita.pdf`.
- **Dopo Liouville la dispensa prosegue con argomenti non ancora negli appunti**, probabilmente le prossime lezioni (pp. 5-8):
  - struttura delle traiettorie;
  - teoremi di Birkhoff;
  - osservabili microscopiche ("prodotto") contro macroscopiche ("somma");
  - teoremi di Khinchin.

## Contenuto delle lezioni (pagine degli appunti)
| Argomento | Pagine |
|---|---|
| Meccanica statistica e termodinamica; parametri, stato di equilibrio, equazione di stato, gas ideale | 1-2 |
| Lavoro e calore, primo principio, differenziali esatti | 3 |
| Secondo principio (Clausius), entropia; terzo principio (Nernst), $C_R(0)=0$ | 4-5 |
| Identità tra derivate parziali; potenziale termodinamico $U(S,V)$ | 5 |
| Lez. 2: trasformata di Legendre; $A$, $G$, $H$; relazioni di Maxwell | 6-9 |
| Probabilità: momenti, distribuzioni congiunte e marginali, somma di variabili, cambio di variabile, $\delta$ | 10-12 |
| Binomiale, Poisson, Gaussiana; Chebyshev, Markov; grandi numeri; limite centrale | 13-14 |
| Rappresentazione integrale della $\delta$, metodo del punto di sella | 14-15 |
| **[mancante] Spazio Γ, ensemble di Gibbs, media termodinamica, ergodicità** | 16-17 (vuote) → dispensa pp. 1-4 |
| Teorema di Liouville: equazione di continuità in Γ, $d\rho/dt=0$, $\{\rho,H\}=0$ all'equilibrio, conservazione del volume | 18-20 |

## Correzioni agli appunti
- **p. 9:** $-P=(\partial U/\partial V)_S$, non con il pedice $T$. Corretto nella trascrizione. La PNG da incollare in Goodnotes è `output/recupero-ms/errata-p09-maxwell-pedice.png`.
- **p. 2:** la frase sullo stato di equilibrio ("i parametri … continuano a dipendere dal tempo") è di lettura incerta. Il senso corretto è che all'equilibrio i parametri macroscopici **non** dipendono dal tempo.
- **p. 20:** gli elementi della matrice $M$ nello Jacobiano sono trascritti come nel manoscritto. La forma attesa è $M=\partial(\dot q,\dot p)/\partial(q,p)$, con $\mathrm{Tr}M=0$ per le equazioni di Hamilton: vedi la dispensa, p. 6.

## Articoli correlati
- [[insieme-microcanonico]] e [[insieme-canonico]]: gli argomenti delle prossime lezioni, già sviluppati dal quaderno dell'anno scorso.
- [[appunti-anno-scorso]] e [[dispense-ed-esami]]: le due fonti complete del corso.
- [[meccanica-quantistica/corso-e-lezioni]]: le particelle identiche si vedono prima qui, in Meccanica Statistica.
- [[metodi-e-modelli/analisi-funzionale]]: distribuzioni e $\delta$.

## Fonti
- `raw/appunti mec statistica/mec stat.pdf`, 20 pp. (le pp. 16-17 sono vuote). Trascrizione in `.testo/appunti-ms-lezioni/trascrizione.md`.
- `raw/appunti mec statistica/spaziodellefasi.pdf`, dispensa del corso, 9 pp. Testo in `.testo/ms-spaziodellefasi/`.
