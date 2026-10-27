import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { useApp } from "../App.jsx";
import { Avanti, Gioca, Indietro, Ingrandisci, Pausa } from "./icone.jsx";

// Lettore dei film Manim, alla 3Blue1Brown: il film scorre senza fermarsi (i tempi di lettura sono già nel film,
// vedi sito/animazioni/comune.py) e la didascalia segue il passo in corso. La barra dei passi e i tasti
// precedente/successivo servono per saltare; un tocco sul video lo mette in pausa.
const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function Film({ nome, grande = false }) {
  const { indice, apriFilm } = useApp();
  const info = indice.film[nome];
  const id = useId();
  const v = useRef(null);
  const riemp = useRef([]);
  const orologio = useRef(null);
  const [i, setI] = useState(0);
  const [stato, setStato] = useState("nuovo"); // nuovo | gioca | pausa | finito
  const stRef = useRef(stato);
  stRef.current = stato;

  const P = info?.passi ?? [];
  const N = P.length;
  const fine = P.map((p, k) => (k + 1 < N ? P[k + 1].t : info.durata));
  const passoA = t => { let k = 0; while (k + 1 < N && t >= P[k + 1].t - 0.02) k++; return k; };

  // un solo film alla volta: chi parte mette in pausa gli altri
  useEffect(() => {
    const altro = e => { if (e.detail !== id && stRef.current === "gioca") { v.current?.pause(); setStato("pausa"); } };
    addEventListener("ms:film", altro);
    return () => removeEventListener("ms:film", altro);
  }, [id]);

  // durante la riproduzione: passo corrente, barre e orologio seguono il video, fotogramma per fotogramma
  useEffect(() => {
    aggiorna();
    if (stato !== "gioca") return;
    let raf;
    const segui = () => { aggiorna(); raf = requestAnimationFrame(segui); };
    raf = requestAnimationFrame(segui);
    return () => cancelAnimationFrame(raf);
  });

  function aggiorna() {
    const t = v.current?.currentTime ?? 0;
    const k = stato === "nuovo" ? 0 : passoA(t);
    if (k !== i) setI(k);
    riemp.current.forEach((el, j) => {
      if (!el) return;
      const f = stato === "nuovo" ? 0 : Math.max(0, Math.min(1, (t - P[j].t) / Math.max(fine[j] - P[j].t, 0.01)));
      el.style.transform = `scaleX(${f})`;
    });
    if (orologio.current) orologio.current.textContent = `${mmss(t)} / ${mmss(Math.round(info.durata))}`;
  }

  function gioca() {
    dispatchEvent(new CustomEvent("ms:film", { detail: id }));
    setStato("gioca");
    const p = v.current.play();
    if (p) p.catch(() => setStato("pausa"));
  }
  function vaiA(k) {
    k = Math.max(0, Math.min(N - 1, k));
    setI(k);
    const parti = () => { v.current.currentTime = P[k].t + 0.01; gioca(); };
    if (v.current.readyState >= 1) parti();
    else {
      v.current.preload = "auto";
      v.current.addEventListener("loadedmetadata", parti, { once: true });
      v.current.load();
    }
  }
  function premi() {
    if (stato === "gioca") { v.current.pause(); setStato("pausa"); }
    else if (stato === "pausa") gioca();
    else vaiA(0);
  }
  const etichetta = { gioca: "Pausa", pausa: "Riprendi", nuovo: "Guarda", finito: "Rivedi" }[stato];

  if (!info) return null;
  return (
    <figure className="m-0 overflow-hidden rounded-bozza border border-filetto/70 bg-superficie font-ui">
      <div className="relative aspect-video bg-schermo">
        <video ref={v} className="absolute inset-0 h-full w-full" poster={`video/${nome}.jpg`} preload="metadata" playsInline muted
          onClick={premi} onEnded={() => setStato("finito")}>
          <source src={`video/${nome}.mp4`} type="video/mp4" />
        </video>
        <AnimatePresence>
          {stato === "nuovo" && (
            <motion.button type="button" onClick={() => vaiA(0)} exit={{ opacity: 0, scale: 0.96 }}
              whileTap={{ scale: 0.96 }}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-testo/25 bg-fondo/70 py-3 pl-4 pr-6 text-[0.95rem] font-medium text-testo backdrop-blur-md">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accento text-fondo"><Gioca size={16} /></span>
              Guarda il film, {Math.round(info.durata)} secondi
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <figcaption className="grid gap-3 p-4">
        <div className="flex items-baseline gap-3">
          <span className="text-[0.84rem] font-semibold text-accento">Film</span>
          <span className="min-w-0 flex-1 truncate font-display text-[1.05rem] text-testo">{info.titolo}</span>
          <span className="tabulare text-[0.8rem] text-tenue">passo {i + 1} di {N}</span>
          {!grande && (
            <button type="button" onClick={() => { v.current?.pause(); setStato(s => (s === "gioca" ? "pausa" : s)); apriFilm(nome); }}
              aria-label="Apri il film in grande" className="-my-2 grid h-9 w-9 place-items-center rounded-full text-testo-2 hover:bg-testo/5"><Ingrandisci size={17} /></button>
          )}
        </div>
        <ol className="m-0 flex list-none gap-1 p-0">
          {P.map((p, k) => (
            <li key={k} style={{ flex: Math.max(fine[k] - p.t, 0.5) }}>
              <button type="button" onClick={() => vaiA(k)} aria-label={`Vai al passo ${k + 1}`} className="block w-full py-2.5">
                <span className={`relative block h-1.5 overflow-hidden rounded-full transition-colors ${k === i ? "bg-testo/25" : "bg-testo/10"}`}>
                  <span ref={el => (riemp.current[k] = el)} className="absolute inset-0 origin-left bg-accento" style={{ transform: "scaleX(0)" }} />
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="min-h-[4.8em]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={i} className="didascalia m-0 font-testo text-[1.02rem] leading-relaxed text-testo-2"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}
              dangerouslySetInnerHTML={{ __html: P[i].html }} />
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2">
          <Tasto onClick={() => vaiA(i - 1)} disabled={i === 0} aria-label="Passo precedente"><Indietro size={18} /></Tasto>
          <motion.button type="button" onClick={premi} whileTap={{ scale: 0.97 }}
            className="inline-flex h-11 min-w-[8.5rem] items-center justify-center gap-2 rounded-full bg-accento px-5 text-[0.9rem] font-semibold text-fondo">
            {stato === "gioca" ? <Pausa size={16} /> : <Gioca size={16} />}{etichetta}
          </motion.button>
          <Tasto onClick={() => vaiA(i + 1)} disabled={i === N - 1} aria-label="Passo successivo"><Avanti size={18} /></Tasto>
          <span ref={orologio} className="tabulare ml-auto text-[0.8rem] text-tenue">0:00 / {mmss(Math.round(info.durata))}</span>
        </div>
      </figcaption>
    </figure>
  );
}

export function Tasto({ children, className = "", ...p }) {
  return (
    <button type="button" {...p}
      className={`grid h-11 w-11 place-items-center rounded-full border border-filetto text-testo-2 transition-colors hover:bg-testo/5 active:bg-testo/10 disabled:opacity-40 ${className}`}>
      {children}
    </button>
  );
}
