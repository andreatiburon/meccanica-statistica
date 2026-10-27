import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../App.jsx";
import { useLargo } from "../base.js";
import Barra from "../componenti/Barra.jsx";
import { Avanti, Chiudi, Elenco, Indietro } from "../componenti/icone.jsx";

/* Solo nella versione privata: le dispense del corso (PDF anonimizzato da scripts/contenuti.py --privato).
   pdf.js si carica da cdnjs soltanto qui, al primo uso; il lavoratore gira nel thread principale, come nel
   sito attuale, perché un Artifact non può avviare worker da un altro dominio. */
const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174";
let documento = null;
const script = src => new Promise((ok, ko) => {
  const s = document.createElement("script");
  s.src = src; s.onload = ok; s.onerror = () => ko(new Error(`non riesco a caricare ${src}`));
  document.head.append(s);
});
export function caricaDispense() {
  if (!documento) {
    documento = script(`${PDFJS}/pdf.min.js`).then(() => script(`${PDFJS}/pdf.worker.min.js`))
      .then(() => window.pdfjsLib.getDocument("dispense/dispense.pdf").promise);
    documento.catch(() => (documento = null));
  }
  return documento;
}
const gutter = { paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" };

// Una pagina del PDF, larga quanto il suo contenitore (per lo zoom), nitida sullo schermo retina dell'iPad.
export function PaginaPdf({ n, zoom = 1, onTotale }) {
  const box = useRef(null), cv = useRef(null);
  const [stato, setStato] = useState("Caricamento delle dispense…");
  useEffect(() => {
    let vivo = true, lavoro = null;
    const disegna = async () => {
      try {
        const doc = await caricaDispense();
        if (!vivo) return;
        onTotale?.(doc.numPages);
        const p = await doc.getPage(Math.max(1, Math.min(doc.numPages, n)));
        if (!vivo) return;
        const dpr = Math.min(devicePixelRatio || 1, 2), base = p.getViewport({ scale: 1 });
        const scala = Math.max(box.current.clientWidth - 2, 260) / base.width * zoom;
        const vp = p.getViewport({ scale: scala * dpr });
        cv.current.width = vp.width; cv.current.height = vp.height;
        cv.current.style.width = `${vp.width / dpr}px`; cv.current.style.height = `${vp.height / dpr}px`;
        lavoro = p.render({ canvasContext: cv.current.getContext("2d"), viewport: vp });
        await lavoro.promise;
        if (vivo) setStato(null);
      } catch (e) {
        if (vivo && e?.name !== "RenderingCancelledException") setStato(`Non riesco ad aprire le dispense: ${e.message}`);
      }
    };
    disegna();
    const ro = new ResizeObserver(() => { lavoro?.cancel(); disegna(); });
    ro.observe(box.current);
    return () => { vivo = false; lavoro?.cancel(); ro.disconnect(); };
  }, [n, zoom]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div ref={box} className="relative min-h-[200px] overflow-auto rounded-piccolo bg-white/95">
      <canvas ref={cv} className="mx-auto block" aria-label={`Dispense, pagina ${n}`} />
      {stato && <p className="absolute inset-x-0 top-8 m-0 px-6 text-center font-ui text-[0.9rem] text-[#3a3f3c]">{stato}</p>}
    </div>
  );
}

/* Il cassetto: la pagina citata si apre accanto al testo (a destra sull'iPad orizzontale, dal basso in verticale). */
export function Cassetto({ pagina, setPagina, chiudi }) {
  const { apri } = useApp();
  const largo = useLargo();
  const [totale, setTotale] = useState(null);
  useEffect(() => {
    const esc = e => e.key === "Escape" && chiudi();
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [chiudi]);
  return (
    <motion.aside role="dialog" aria-label={`Dispense, pagina ${pagina}`}
      initial={largo ? { x: "100%" } : { y: "100%" }} animate={largo ? { x: 0 } : { y: 0 }} exit={largo ? { x: "100%" } : { y: "100%" }}
      transition={{ type: "spring", stiffness: 340, damping: 36 }}
      className={`fixed z-50 flex flex-col border-filetto bg-superficie font-ui shadow-2xl shadow-black/50 ${largo
        ? "bottom-0 right-0 top-0 w-[min(560px,46vw)] border-l" : "inset-x-0 bottom-0 h-[86dvh] rounded-t-[22px] border-t"}`}
      style={largo ? { paddingTop: "env(safe-area-inset-top, 0px)", paddingRight: "env(safe-area-inset-right, 0px)" } : { paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="flex items-center gap-2 border-b border-filetto px-3 py-2">
        <p className="m-0 flex-1 pl-2 text-[0.95rem] text-testo">Dispense, p. <span className="tabulare font-semibold">{pagina}</span>{totale && <span className="text-tenue"> di {totale}</span>}</p>
        <button type="button" onClick={() => setPagina(p => Math.max(1, p - 1))} aria-label="Pagina precedente" className="grid h-10 w-10 place-items-center rounded-full text-testo-2 hover:bg-testo/5"><Indietro size={18} /></button>
        <button type="button" onClick={() => setPagina(p => (totale ? Math.min(totale, p + 1) : p + 1))} aria-label="Pagina successiva" className="grid h-10 w-10 place-items-center rounded-full text-testo-2 hover:bg-testo/5"><Avanti size={18} /></button>
        <button type="button" onClick={() => { chiudi(); apri("dispense", pagina); }} className="h-10 rounded-full px-3 text-[0.84rem] text-testo-2 hover:bg-testo/5">Apri nelle dispense</button>
        <button type="button" onClick={chiudi} aria-label="Chiudi" className="grid h-10 w-10 place-items-center rounded-full text-testo-2 hover:bg-testo/5"><Chiudi size={18} /></button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3"><PaginaPdf n={pagina} onTotale={setTotale} /></div>
    </motion.aside>
  );
}

/* La pagina «Dispense»: indice, ricerca nel testo, pagina con zoom. */
export default function Dispense() {
  const { destinazione } = useApp();
  const largo = useLargo();
  const [n, setN] = useState(() => {
    const d = destinazione.current;
    if (d?.slug === "dispense") { destinazione.current = null; return d.sezione; }
    return 1;
  });
  const [totale, setTotale] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [voci, setVoci] = useState([]);
  const [testi, setTesti] = useState(null);
  const [q, setQ] = useState("");
  const [indiceAperto, setIndiceAperto] = useState(false);
  useEffect(() => {
    fetch("dispense/indice.json").then(r => r.json()).then(setVoci).catch(() => {});
    fetch("dispense/testo.json").then(r => r.json()).then(setTesti).catch(() => {});
  }, []);
  const risultati = useMemo(() => {
    const s = q.trim();
    if (!testi || s.length < 3) return null;
    const re = new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), out = [];
    testi.forEach((t, k) => {
      const m = t.search(re);
      if (m >= 0 && out.length < 40) out.push({ p: k + 1, prima: t.slice(Math.max(0, m - 45), m), trovato: t.slice(m, m + s.length), dopo: t.slice(m + s.length, m + s.length + 60) });
    });
    return out;
  }, [q, testi]);
  const vai = k => { setN(Math.max(1, Math.min(totale || k, k))); setIndiceAperto(false); scrollTo({ top: 0, behavior: "smooth" }); };
  const corrente = voci.reduce((c, v) => (v.pagina <= n ? v : c), null);

  const laterale = (
    <div className="grid gap-4 font-ui">
      <label htmlFor="cerca-dispense" className="grid gap-1.5 text-[0.84rem] text-testo-2">
        Cerca nel testo
        <input id="cerca-dispense" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="per esempio Bragg, viriale, Debye" autoComplete="off"
          className="h-11 rounded-piccolo border border-filetto bg-fondo px-3 text-[0.95rem] text-testo placeholder:text-tenue focus:border-testo/60 focus:outline-none" />
      </label>
      {risultati && (
        <ol className="m-0 grid list-none gap-1 p-0" aria-live="polite">
          {risultati.length === 0 && <li className="text-[0.86rem] text-tenue">Nessuna pagina contiene «{q.trim()}».</li>}
          {risultati.map(r => (
            <li key={r.p}>
              <button type="button" onClick={() => vai(r.p)} className="w-full rounded-piccolo px-2 py-2 text-left text-[0.84rem] leading-snug text-testo-2 hover:bg-testo/5">
                <b className="tabulare text-testo">p. {r.p}</b> …{r.prima}<mark className="rounded bg-energia/30 text-testo">{r.trovato}</mark>{r.dopo}…
              </button>
            </li>
          ))}
        </ol>
      )}
      {voci.length > 0 && (
        <nav aria-label="Indice delle dispense">
          <p className="m-0 mb-1 text-[0.84rem] font-semibold text-tenue">Indice</p>
          <ol className="m-0 grid list-none gap-0.5 p-0">
            {voci.map((v, k) => (
              <li key={k}>
                <button type="button" onClick={() => vai(v.pagina)} style={{ paddingLeft: `${8 + v.livello * 14}px` }}
                  className={`flex w-full items-baseline gap-2 rounded-piccolo py-1.5 pr-2 text-left text-[0.86rem] leading-snug ${v === corrente ? "bg-testo/10 text-testo" : "text-testo-2 hover:bg-testo/5"}`}>
                  <span className="min-w-0 flex-1">{v.titolo}</span><span className="tabulare text-tenue">{v.pagina}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );

  return (
    <>
      <Barra centro={<p className="m-0 hidden text-[0.86rem] text-testo-2 md:block">Dispense del corso, versione privata</p>} />
      <div className="mx-auto max-w-[1240px] pb-16" style={gutter}>
        <header className="grid gap-2 pb-5 pt-8">
          <h1 className="m-0 font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-tight text-testo">Dispense</h1>
          <p className="m-0 max-w-[62ch] font-ui text-[0.95rem] leading-relaxed text-testo-2">Le dispense del corso pagina per pagina, in una copia senza i nomi dei docenti. Ogni citazione «Dispense, p. N» nelle lezioni apre la pagina giusta.</p>
        </header>
        <div className={largo ? "grid grid-cols-[300px_minmax(0,1fr)] gap-8" : "grid gap-4"}>
          {largo && <aside className="sticky top-[72px] max-h-[calc(100dvh-90px)] self-start overflow-y-auto pr-1">{laterale}</aside>}
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2 font-ui">
              {!largo && <button type="button" onClick={() => setIndiceAperto(true)} className="inline-flex h-11 items-center gap-2 rounded-full border border-filetto px-4 text-[0.86rem] text-testo-2"><Elenco size={17} />Indice e ricerca</button>}
              <button type="button" onClick={() => vai(n - 1)} aria-label="Pagina precedente" className="grid h-11 w-11 place-items-center rounded-full border border-filetto text-testo-2"><Indietro size={18} /></button>
              <label className="inline-flex items-center gap-2 text-[0.86rem] text-testo-2">
                pagina
                <input type="number" min="1" max={totale ?? undefined} value={n} onChange={e => e.target.value && vai(+e.target.value)}
                  className="tabulare h-11 w-20 rounded-piccolo border border-filetto bg-fondo px-2 text-center text-testo" />
                {totale && <span className="text-tenue">di {totale}</span>}
              </label>
              <button type="button" onClick={() => vai(n + 1)} aria-label="Pagina successiva" className="grid h-11 w-11 place-items-center rounded-full border border-filetto text-testo-2"><Avanti size={18} /></button>
              <span className="ml-auto flex gap-1">
                <button type="button" onClick={() => setZoom(z => Math.max(0.6, z / 1.2))} aria-label="Rimpicciolisci" className="h-11 w-11 rounded-full border border-filetto text-[1.1rem] text-testo-2">−</button>
                <button type="button" onClick={() => setZoom(z => Math.min(3, z * 1.2))} aria-label="Ingrandisci" className="h-11 w-11 rounded-full border border-filetto text-[1.1rem] text-testo-2">+</button>
              </span>
            </div>
            {corrente && <p className="m-0 font-ui text-[0.86rem] text-tenue">{corrente.titolo}</p>}
            <PaginaPdf n={n} zoom={zoom} onTotale={setTotale} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {indiceAperto && !largo && (
          <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/45" onClick={() => setIndiceAperto(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-y-auto rounded-t-[22px] border-t border-filetto bg-superficie p-5"
              style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom, 0px))" }}>
              <div className="mb-3 flex items-center"><p className="m-0 flex-1 font-display text-[1.2rem] text-testo">Indice e ricerca</p>
                <button type="button" onClick={() => setIndiceAperto(false)} aria-label="Chiudi" className="grid h-11 w-11 place-items-center rounded-full text-testo-2"><Chiudi /></button></div>
              {laterale}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
