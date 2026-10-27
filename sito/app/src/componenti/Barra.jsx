import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BOZZE, useApp } from "../App.jsx";
import { vai } from "../base.js";
import { Tavolozza } from "./icone.jsx";

// Barra in alto, sottile e fissa: marchio a sinistra, contesto al centro, comandi a destra.
// Il filo in basso è l'avanzamento nella pagina (un MotionValue da 0 a 1).
export default function Barra({ centro, destra, avanzamento }) {
  return (
    <header className="sticky z-40 font-ui" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="relative bg-fondo/80 backdrop-blur-xl border-b border-filetto/60"
        style={{ paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" }}>
        <div className="mx-auto flex h-14 max-w-[1240px] items-center gap-3">
          <button type="button" onClick={() => vai("home")}
            className="shrink-0 rounded-lg px-1 py-2 font-display text-[1.15rem] leading-none text-testo">
            Meccanica <i className="text-caldo">Statistica</i>
          </button>
          <div className="min-w-0 flex-1">{centro}</div>
          <div className="flex shrink-0 items-center gap-1.5">
            {destra}
            <SceltaBozza />
          </div>
        </div>
        {avanzamento && (
          <motion.div className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-accento" style={{ scaleX: avanzamento }} />
        )}
      </div>
    </header>
  );
}

export function BottoneBarra({ children, attivo, ...p }) {
  return (
    <button type="button" {...p}
      className={`inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-[0.86rem] font-medium transition-colors
        ${attivo ? "bg-accento/15 text-accento" : "text-testo-2 hover:bg-testo/5 active:bg-testo/10"}`}>
      {children}
    </button>
  );
}

// Prototipo: le tre bozze visive si provano dal vivo, su qualunque pagina.
function SceltaBozza() {
  const { bozza, setBozza } = useApp();
  const [aperta, setAperta] = useState(false);
  const box = useRef(null);
  useEffect(() => {
    if (!aperta) return;
    const fuori = e => { if (!box.current?.contains(e.target)) setAperta(false); };
    addEventListener("pointerdown", fuori);
    return () => removeEventListener("pointerdown", fuori);
  }, [aperta]);
  const attuale = BOZZE.find(b => b.id === bozza);
  return (
    <div className="relative" ref={box}>
      <BottoneBarra onClick={() => setAperta(a => !a)} attivo={aperta} aria-expanded={aperta} aria-label="Scegli la bozza visiva">
        <Tavolozza size={18} /><span className="hidden sm:inline">Bozza {attuale.id.toUpperCase()} · {attuale.nome}</span>
      </BottoneBarra>
      <AnimatePresence>
        {aperta && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 z-50 w-[min(340px,calc(100vw-32px))] origin-top-right rounded-bozza border border-filetto bg-superficie p-2 shadow-2xl shadow-black/30">
            <p className="px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-tenue">Tre direzioni per il nuovo sito</p>
            {BOZZE.map(b => (
              <button key={b.id} type="button" onClick={() => { setBozza(b.id); setAperta(false); }}
                className={`flex w-full items-start gap-3 rounded-bozza-sm px-3 py-3 text-left transition-colors ${b.id === bozza ? "bg-accento/10" : "hover:bg-testo/5"}`}>
                <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[0.8rem] font-semibold ${b.id === bozza ? "border-accento bg-accento text-fondo" : "border-filetto text-testo-2"}`}>
                  {b.id.toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.95rem] font-semibold text-testo">{b.nome}</span>
                  <span className="block text-[0.82rem] leading-snug text-testo-2">{b.descrizione}</span>
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
