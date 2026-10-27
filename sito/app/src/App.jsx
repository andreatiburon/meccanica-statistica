import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Colori, carica, leggiColori, useDati, useRotta, vai } from "./base.js";
import Home from "./pagine/Home.jsx";
import Lezione from "./pagine/Lezione.jsx";
import Mappa from "./pagine/Mappa.jsx";
import Dispense, { Cassetto } from "./pagine/Dispense.jsx";
import FilmGrande from "./componenti/FilmGrande.jsx";

// Contesto dell'app: indice dei contenuti, film aperto a tutto schermo, destinazione dentro una lezione.
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

// Transizione tra pagine: la vecchia si allontana appena, la nuova sale in posizione.
const PAGINA = {
  iniziale: { opacity: 0, y: 18 },
  visibile: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  uscita: { opacity: 0, y: -10, scale: 0.995, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

export default function App() {
  const rotta = useRotta();
  const { dati: indice, errore } = useDati("indice");
  const [colori, setColori] = useState(null);
  const [film, setFilm] = useState(null);
  const [pdf, setPdf] = useState(null);  // pagina delle dispense aperta nel cassetto (solo versione privata)
  const destinazione = useRef(null);
  const scorrimenti = useRef({});

  // I laboratori disegnano con i colori dei token CSS: si leggono una volta, dopo il primo montaggio.
  useLayoutEffect(() => setColori(leggiColori()), []);

  const lezioni = useMemo(() => indice ? [...indice.percorso, ...indice.fonti] : [], [indice]);
  // pagine: #home, #mappa, #dispense (solo versione privata) e una lezione per slug; il resto riporta alla home
  const speciali = useMemo(() => (indice?.privato ? ["mappa", "dispense"] : ["mappa"]), [indice]);
  const pagina = speciali.includes(rotta) || lezioni.some(l => l.slug === rotta) ? rotta : "home";

  // cambiando pagina il cassetto delle dispense si chiude
  useLayoutEffect(() => setPdf(null), [pagina]);

  const apri = useCallback((slug, sezione = null) => {
    scorrimenti.current[pagina] = scrollY;
    destinazione.current = sezione ? { slug, sezione } : null;
    if (lezioni.some(l => l.slug === slug)) carica(slug).catch(() => {});
    vai(slug);
  }, [pagina, lezioni]);

  // Quando la nuova pagina entra, si parte dall'alto (o da dove si era lasciata la home).
  const entrata = useCallback(() => {
    if (destinazione.current?.slug === pagina && !speciali.includes(pagina)) return;  // la lezione scorre da sé alla sezione
    scrollTo({ top: pagina === "home" ? scorrimenti.current.home || 0 : 0, behavior: "instant" });
  }, [pagina, speciali]);

  const ctx = useMemo(() => ({ indice, apriFilm: setFilm, apriPdf: setPdf, apri, destinazione }), [indice, apri]);

  return (
    <MotionConfig reducedMotion="user">
      <Colori.Provider value={colori}>
        <Ctx.Provider value={ctx}>
          <div className="atmosfera" aria-hidden="true" />
          {errore && <p className="p-8 font-ui">Non riesco a caricare i contenuti ({errore.message}).</p>}
          {indice && colori && (
            <AnimatePresence mode="wait" initial={false} onExitComplete={entrata}>
              <motion.main key={pagina} variants={PAGINA} initial="iniziale" animate="visibile" exit="uscita">
                {pagina === "home" ? <Home /> : pagina === "mappa" ? <Mappa /> : pagina === "dispense" ? <Dispense /> : <Lezione slug={pagina} />}
              </motion.main>
            </AnimatePresence>
          )}
          <AnimatePresence>{film && <FilmGrande nome={film} chiudi={() => setFilm(null)} />}</AnimatePresence>
          <AnimatePresence>{pdf && <Cassetto pagina={pdf} setPagina={setPdf} chiudi={() => setPdf(null)} />}</AnimatePresence>
        </Ctx.Provider>
      </Colori.Provider>
    </MotionConfig>
  );
}
