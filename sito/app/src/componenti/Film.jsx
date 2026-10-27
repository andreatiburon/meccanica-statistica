import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { useApp } from "../App.jsx";
import { Gioca, Indietro, Ingrandisci, Pausa, Rivedi } from "./icone.jsx";

// Lettore dei film Manim: il video si ferma alla fine di ogni passo e la didascalia spiega il passo corrente,
// così chi studia decide il ritmo. «Tutto di seguito» lo fa scorrere senza fermate.
const EPS = 0.06;

export default function Film({ nome, grande = false }) {
  const { indice, apriFilm } = useApp();
  const info = indice.film[nome];
  const id = useId();
  const v = useRef(null);
  const riemp = useRef([]);
  const [i, setI] = useState(0);
  const [stato, setStato] = useState("nuovo"); // nuovo | gioca | pausa (a metà) | fermo (fine del passo)
  const [tutto, setTutto] = useState(false);
  const stRef = useRef({ i, stato, tutto });
  stRef.current = { i, stato, tutto };

  const P = info?.passi ?? [];
  const N = P.length;
  const fine = P.map((p, k) => (k + 1 < N ? P[k + 1].t : info.durata));

  // un solo film alla volta: chi parte ferma gli altri
  useEffect(() => {
    const altro = e => { if (e.detail !== id && stRef.current.stato === "gioca") { v.current?.pause(); setStato("pausa"); } };
    addEventListener("ms:film", altro);
    return () => removeEventListener("ms:film", altro);
  }, [id]);

  // durante la riproduzione: barre di avanzamento e fermata a fine passo
  useEffect(() => {
    if (stato !== "gioca") { barre(); return; }
    let raf;
    const segui = () => {
      const t = v.current?.currentTime ?? 0;
      const { i: k, tutto: tt } = stRef.current;
      if (tt) {
        if (k + 1 < N && t >= P[k + 1].t) setI(k + 1);
      } else if (t >= fine[k] - EPS) {
        v.current.pause();
        setStato("fermo");
        barre(k, fine[k]);
        return;
      }
      barre(k, t);
      raf = requestAnimationFrame(segui);
    };
    raf = requestAnimationFrame(segui);
    return () => cancelAnimationFrame(raf);
  });

  function barre(k = i, t = v.current?.currentTime ?? 0) {
    riemp.current.forEach((el, j) => {
      if (!el) return;
      const f = j < k ? 1 : j > k ? 0 : Math.max(0, Math.min(1, (t - P[j].t) / Math.max(fine[j] - P[j].t, 0.01)));
      el.style.transform = `scaleX(${stato === "nuovo" ? 0 : f})`;
    });
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
    else if (stato === "nuovo") vaiA(0);
    else vaiA(i + 1 < N ? i + 1 : 0);
  }
  const etichetta = { gioca: "Pausa", pausa: "Riprendi", nuovo: "Inizia" }[stato] || (i + 1 < N ? "Passo successivo" : "Ricomincia");

  if (!info) return null;
  return (
    <figure className={`m-0 overflow-hidden border border-filetto/70 bg-superficie font-ui ${grande ? "rounded-bozza" : "rounded-bozza"}`}>
      <div className="relative aspect-video bg-[#0B1020]">
        <video ref={v} className="absolute inset-0 h-full w-full" poster={`video/${nome}.jpg`} preload="none" playsInline muted
          onClick={premi} onEnded={() => { setI(N - 1); setStato("fermo"); }}>
          <source src={`video/${nome}.mp4`} type="video/mp4" />
        </video>
        <AnimatePresence>
          {stato === "nuovo" && (
            <motion.button type="button" onClick={() => vaiA(0)} exit={{ opacity: 0, scale: 0.96 }}
              whileTap={{ scale: 0.96 }}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/25 bg-black/55 py-3 pl-4 pr-6 text-[0.95rem] font-medium text-white backdrop-blur-md">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F2C14E] text-[#0B1020]"><Gioca size={16} /></span>
              Guarda passo per passo
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <figcaption className="grid gap-3 p-4">
        <div className="flex items-baseline gap-3">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accento">Film</span>
          <span className="min-w-0 flex-1 truncate font-display text-[1.05rem] text-testo">{info.titolo}</span>
          <span className="tabulare text-[0.8rem] text-tenue">{i + 1} / {N}</span>
        </div>
        <ol className="m-0 flex list-none gap-1 p-0">
          {P.map((p, k) => (
            <li key={k} style={{ flex: Math.max(fine[k] - p.t, 0.5) }}>
              <button type="button" onClick={() => vaiA(k)} aria-label={`Vai al passo ${k + 1}`}
                className="group block w-full py-2.5">
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
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.22 }}
              dangerouslySetInnerHTML={{ __html: P[i].html }} />
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tasto onClick={() => vaiA(i - 1)} disabled={i === 0 && stato === "nuovo"} aria-label="Passo precedente"><Indietro size={18} /></Tasto>
          <Tasto onClick={() => vaiA(i)} aria-label="Rivedi il passo"><Rivedi size={18} /></Tasto>
          <motion.button type="button" onClick={premi} whileTap={{ scale: 0.97 }}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accento px-5 text-[0.9rem] font-semibold text-fondo">
            {stato === "gioca" ? <Pausa size={16} /> : <Gioca size={16} />}{etichetta}
          </motion.button>
          <label className="ml-1 inline-flex h-11 cursor-pointer items-center gap-2 text-[0.84rem] text-testo-2">
            <input type="checkbox" checked={tutto} onChange={e => setTutto(e.target.checked)} className="h-4 w-4" />
            tutto di seguito
          </label>
          {!grande && (
            <Tasto onClick={() => { v.current?.pause(); setStato(s => (s === "gioca" ? "pausa" : s)); apriFilm(nome); }}
              aria-label="Apri il film in grande" className="ml-auto"><Ingrandisci size={18} /></Tasto>
          )}
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
