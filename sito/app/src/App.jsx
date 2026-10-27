import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Colori, carica, leggiColori, memoria, useDati, useRotta, vai } from "./base.js";
import Home from "./pagine/Home.jsx";
import Lezione from "./pagine/Lezione.jsx";
import FilmGrande from "./componenti/FilmGrande.jsx";

export const BOZZE = [
  { id: "a", nome: "Nebbia", descrizione: "La camera a nebbia del sito attuale, resa fluida: blu notte, vetro, Spectral." },
  { id: "b", nome: "Lavagna", descrizione: "Ardesia quasi nera, gesso bianco per l'interfaccia, gessetti dello stesso tono per le grandezze fisiche." },
  { id: "c", nome: "Quaderno", descrizione: "Quadretti con il margine, inchiostro blu, evidenziatore e penna rossa. Segue il tema chiaro o scuro." },
];

// Contesto dell'app: indice dei contenuti, bozza, film aperto a tutto schermo, destinazione dentro una lezione.
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
  const [bozza, setBozza] = useState(() => memoria.leggi("bozza", "b"));
  const [colori, setColori] = useState(null);
  const [film, setFilm] = useState(null);
  const destinazione = useRef(null);
  const scorrimenti = useRef({});

  // La bozza vive sull'elemento radice: i token CSS cambiano tutti insieme.
  useLayoutEffect(() => {
    document.documentElement.dataset.bozza = bozza;
    memoria.scrivi("bozza", bozza);
    setColori(leggiColori());
  }, [bozza]);
  // Il tema chiaro/scuro del visualizzatore cambia i token della bozza C: i canvas rileggono i colori.
  useEffect(() => {
    const rileggi = () => setColori(leggiColori());
    const m = matchMedia("(prefers-color-scheme: dark)");
    m.addEventListener("change", rileggi);
    const oss = new MutationObserver(rileggi);
    oss.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => { m.removeEventListener("change", rileggi); oss.disconnect(); };
  }, []);

  const lezioni = useMemo(() => indice ? [...indice.percorso, ...indice.fonti] : [], [indice]);
  const pagina = rotta !== "home" && lezioni.some(l => l.slug === rotta) ? rotta : "home";

  const apri = useCallback((slug, sezione = null) => {
    scorrimenti.current[pagina] = scrollY;
    destinazione.current = sezione ? { slug, sezione } : null;
    carica(slug).catch(() => {});
    vai(slug);
  }, [pagina]);

  // Quando la nuova pagina entra, si parte dall'alto (o da dove si era lasciata la home).
  const entrata = useCallback(() => {
    if (destinazione.current?.slug === pagina) return;
    scrollTo({ top: pagina === "home" ? scorrimenti.current.home || 0 : 0, behavior: "instant" });
  }, [pagina]);

  const ctx = useMemo(() => ({ indice, bozza, setBozza, apriFilm: setFilm, apri, destinazione }), [indice, bozza, apri]);

  return (
    <MotionConfig reducedMotion="user">
      <Colori.Provider value={colori}>
        <Ctx.Provider value={ctx}>
          <div className="atmosfera" aria-hidden="true" />
          {errore && <p className="p-8 font-ui">Non riesco a caricare i contenuti ({errore.message}).</p>}
          {indice && colori && (
            <AnimatePresence mode="wait" initial={false} onExitComplete={entrata}>
              <motion.main key={pagina} variants={PAGINA} initial="iniziale" animate="visibile" exit="uscita">
                {pagina === "home" ? <Home /> : <Lezione slug={pagina} />}
              </motion.main>
            </AnimatePresence>
          )}
          <AnimatePresence>{film && <FilmGrande nome={film} chiudi={() => setFilm(null)} />}</AnimatePresence>
        </Ctx.Provider>
      </Colori.Provider>
    </MotionConfig>
  );
}
