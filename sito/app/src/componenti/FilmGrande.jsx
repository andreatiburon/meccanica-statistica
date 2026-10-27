import { motion } from "framer-motion";
import { useEffect } from "react";
import { useApp } from "../App.jsx";
import Film from "./Film.jsx";
import { Chiudi } from "./icone.jsx";

// Un film a tutta pagina, sopra a qualunque vista: dalla cineteca della home o da «Apri in grande».
export default function FilmGrande({ nome, chiudi }) {
  const { indice, apri } = useApp();
  const info = indice.film[nome];
  const lezione = [...indice.percorso, ...indice.fonti].find(l => l.slug === info?.slug);
  useEffect(() => {
    const esc = e => e.key === "Escape" && chiudi();
    addEventListener("keydown", esc);
    const prima = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", esc); document.body.style.overflow = prima; };
  }, [chiudi]);
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/70 backdrop-blur-sm"
      style={{ padding: "max(16px, env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px)) max(16px, env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px))" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => e.target === e.currentTarget && chiudi()}>
      <motion.div className="w-full max-w-[1000px]" initial={{ y: 24, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}>
        <div className="mb-3 flex items-center gap-3 font-ui">
          {lezione && (
            <button type="button" onClick={() => { chiudi(); apri(lezione.slug, info.sezione); }}
              className="rounded-full bg-white/10 px-4 py-2.5 text-[0.86rem] text-white hover:bg-white/15">
              Apri nella lezione: {lezione.breve}
            </button>
          )}
          <button type="button" onClick={chiudi} aria-label="Chiudi" className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15">
            <Chiudi />
          </button>
        </div>
        <Film nome={nome} grande />
      </motion.div>
    </motion.div>
  );
}
