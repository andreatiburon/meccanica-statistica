import { motion } from "framer-motion";
import { vai } from "../base.js";

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
            Meccanica Statistica
          </button>
          <div className="min-w-0 flex-1">{centro}</div>
          <div className="flex shrink-0 items-center gap-1.5">
            {destra}
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
