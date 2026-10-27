import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../App.jsx";
import { useRiduci } from "../base.js";
import Barra from "../componenti/Barra.jsx";
import { useTela } from "../lab/strumenti.jsx";

/* La mappa dei collegamenti: ogni articolo è un nodo, ogni wikilink un arco.
   Il grafo si dispone da solo con una simulazione a molle (archi) e cariche (nodi), come nel sito attuale.
   Al tocco: un nodo si seleziona e si accendono i suoi vicini; trascinandolo si sposta.
   I nodi delle wiki che non sono in questo repository restano tratteggiati. */
const gutter = { paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" };

export default function Mappa() {
  const { indice, apri, destinazione } = useApp();
  const riduci = useRiduci();
  const lezioni = useMemo(() => [...indice.percorso, ...indice.fonti], [indice]);
  const [scelto, setScelto] = useState(() => {
    const d = destinazione.current;
    if (d?.slug === "mappa") { destinazione.current = null; return d.sezione; }
    return null;
  });
  const sceltoRef = useRef(scelto);
  sceltoRef.current = scelto;

  // stato della simulazione, fuori da React: cambia a ogni fotogramma
  const g = useRef(null);
  if (!g.current) {
    const nodi = indice.mappa.nodi.map((d, k) => ({ ...d, x: Math.cos(k * 2.4) * 0.3, y: Math.sin(k * 2.4) * 0.3, vx: 0, vy: 0, grado: 0 }));
    const per = Object.fromEntries(nodi.map(n => [n.id, n]));
    const archi = indice.mappa.archi.filter(([a, b]) => per[a] && per[b]);
    archi.forEach(([a, b]) => { per[a].grado++; per[b].grado++; });
    g.current = { nodi, per, archi, trascinato: null, mosso: false, energia: 1, adatta: null, gmax: Math.max(...nodi.map(n => n.grado)) };
    for (let k = 0; k < 500; k++) fisica(g.current, null);
  }

  const tela = useTela((ctx, w, h, C, dt) => {
    const G = g.current;
    if (dt > 0 && !riduci && (G.energia > 1e-4 || G.trascinato)) fisica(G, G.trascinato);
    const { s, cx, cy } = scala(G, w, h);
    ctx.fillStyle = C.schermo; ctx.fillRect(0, 0, w, h);
    const fuoco = sceltoRef.current ? G.per[sceltoRef.current] : null;
    const vicini = new Set(fuoco ? G.archi.filter(e => e.includes(fuoco.id)).flat() : []);
    for (const [i, j] of G.archi) {
      const a = G.per[i], b = G.per[j], acceso = fuoco && (i === fuoco.id || j === fuoco.id);
      ctx.strokeStyle = acceso ? C.testo : C.a("filetto", fuoco ? 0.5 : 1); ctx.lineWidth = acceso ? 1.8 : 1;
      ctx.setLineDash(a.gruppo === "mancante" || b.gruppo === "mancante" ? [4, 4] : []);
      ctx.beginPath(); ctx.moveTo(cx + a.x * s, cy + a.y * s); ctx.lineTo(cx + b.x * s, cy + b.y * s); ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.font = `${w < 500 ? 12 : 14}px ${getComputedStyle(document.documentElement).getPropertyValue("--f-ui")}`;
    ctx.textAlign = "center";
    for (const n of G.nodi) {
      const X = cx + n.x * s, Y = cy + n.y * s, r = n.gruppo === "mancante" ? 5 : 5 + n.grado * 0.9;
      ctx.globalAlpha = fuoco && !vicini.has(n.id) && n !== fuoco ? 0.25 : 1;
      ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.2832);
      if (n.gruppo === "mancante") { ctx.setLineDash([3, 3]); ctx.strokeStyle = C.tenue; ctx.lineWidth = 1.2; ctx.stroke(); ctx.setLineDash([]); }
      else if (n.gruppo === "fonte") { ctx.strokeStyle = C.testo; ctx.lineWidth = 2; ctx.fillStyle = C.fondo; ctx.fill(); ctx.stroke(); }
      else { ctx.fillStyle = n === fuoco ? C.testo : C.a("testo", 0.35 + 0.65 * n.grado / G.gmax); ctx.fill(); }
      ctx.fillStyle = n.gruppo === "mancante" ? C.tenue : C.testo;
      ctx.fillText(n.nome.length > 30 ? n.nome.slice(0, 28) + "…" : n.nome, X, Y - r - 7);
      ctx.globalAlpha = 1;
    }
  }, [scelto], { anima: true });

  // tocco e trascinamento
  useEffect(() => {
    const cv = tela.current, G = g.current;
    const nodoIn = e => {
      const r = cv.getBoundingClientRect(), { s, cx, cy } = scala(G, r.width, r.height);
      const px = (e.clientX - r.left - cx) / s, py = (e.clientY - r.top - cy) / s;
      let best = null, bd = 26 / s;
      for (const n of G.nodi) { const d = Math.hypot(n.x - px, n.y - py); if (d < bd) { bd = d; best = n; } }
      return { best, px, py };
    };
    const giu = e => { const { best } = nodoIn(e); G.mosso = false; if (best) { G.trascinato = best; cv.setPointerCapture(e.pointerId); } };
    const muovi = e => { if (!G.trascinato) return; const { px, py } = nodoIn(e); G.trascinato.x = px; G.trascinato.y = py; G.energia = 1; G.mosso = true; };
    const su = e => {
      if (G.trascinato && !G.mosso) setScelto(G.trascinato.id);
      else if (!G.trascinato && !nodoIn(e).best) setScelto(null);
      G.trascinato = null; G.adatta = null;
    };
    cv.addEventListener("pointerdown", giu); cv.addEventListener("pointermove", muovi);
    cv.addEventListener("pointerup", su); cv.addEventListener("pointercancel", su);
    return () => { cv.removeEventListener("pointerdown", giu); cv.removeEventListener("pointermove", muovi); cv.removeEventListener("pointerup", su); cv.removeEventListener("pointercancel", su); };
  }, [tela]);

  const nodo = scelto ? g.current.per[scelto] : null;
  const lez = nodo && lezioni.find(l => l.slug === nodo.id);
  const vicini = nodo ? g.current.archi.filter(e => e.includes(nodo.id)).map(([a, b]) => g.current.per[a === nodo.id ? b : a]) : [];

  return (
    <>
      <Barra centro={<p className="m-0 hidden text-[0.86rem] text-testo-2 md:block">Mappa dei collegamenti</p>} />
      <div className="mx-auto max-w-[1240px] pb-10" style={gutter}>
        <header className="grid gap-2 pb-5 pt-8">
          <h1 className="m-0 font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-tight text-testo">Mappa dei collegamenti</h1>
          <p className="m-0 max-w-[62ch] font-ui text-[0.95rem] leading-relaxed text-testo-2">
            Ogni punto è un articolo, ogni linea un collegamento tra due articoli. Più collegamenti ha un articolo, più il punto è grande e luminoso; i cerchi vuoti sono le fonti, quelli tratteggiati le wiki che non sono qui. Tocca un punto per vederne i vicini, trascinalo per spostarlo.
          </p>
        </header>
        <div className="relative overflow-hidden rounded-scheda border border-filetto/80">
          <canvas ref={tela} className="block h-[min(72dvh,760px)] w-full touch-none" aria-label="Grafo dei collegamenti tra gli articoli della wiki" />
          <AnimatePresence>
            {nodo && (
              <motion.aside key={nodo.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                className="absolute bottom-3 left-3 right-3 grid gap-2 rounded-scheda border border-filetto bg-superficie/95 p-4 font-ui shadow-2xl shadow-black/40 backdrop-blur sm:right-auto sm:w-[380px]">
                <p className="m-0 font-display text-[1.2rem] leading-snug text-testo">{lez?.titolo ?? nodo.nome}</p>
                {lez?.descrizione && <p className="m-0 text-[0.86rem] leading-relaxed text-testo-2 [&_.katex]:text-[1em]" dangerouslySetInnerHTML={{ __html: lez.descrizione }} />}
                {!lez && <p className="m-0 text-[0.86rem] text-tenue">Questa wiki non è in questo repository: il collegamento resta in sospeso.</p>}
                <p className="m-0 text-[0.8rem] text-tenue">{vicini.length} collegamenti: {vicini.map(v => v.nome).join(", ")}</p>
                {lez && (
                  <button type="button" onClick={() => apri(lez.slug)} className="mt-1 h-11 justify-self-start rounded-full bg-accento px-5 text-[0.9rem] font-semibold text-fondo">
                    Apri {lez.numero ? "la lezione" : "l'articolo"}
                  </button>
                )}
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

// Un passo della simulazione: repulsione tra tutti i nodi, molle sugli archi, richiamo verso il centro, attrito.
function fisica(G, fermo) {
  const { nodi, archi, per } = G;
  for (const a of nodi) for (const b of nodi) if (a !== b) {
    const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 1e-4, f = (a.gruppo === "mancante" || b.gruppo === "mancante" ? 0.0012 : 0.006) / d2;
    a.vx += dx * f; a.vy += dy * f;
  }
  for (const [i, j] of archi) {
    const a = per[i], b = per[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-3;
    const f = 0.03 * (d - (a.gruppo === "mancante" || b.gruppo === "mancante" ? 0.2 : 0.5)) / d;
    a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f;
  }
  G.energia = 0;
  for (const n of nodi) {
    n.vx -= n.x * 0.006; n.vy -= n.y * 0.006;
    if (n === fermo) { n.vx = n.vy = 0; continue; }
    n.vx *= 0.82; n.vy *= 0.82; n.x += n.vx; n.y += n.vy; G.energia += Math.abs(n.vx) + Math.abs(n.vy);
  }
}

// Scala e centro per far stare tutto il grafo nel riquadro (fissi mentre si trascina un nodo).
function scala(G, w, h) {
  if (G.adatta && G.trascinato && G.adatta.w === w) return G.adatta;
  const mx = Math.min(120, w * 0.16), my = 40;
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const n of G.nodi) { x0 = Math.min(x0, n.x); x1 = Math.max(x1, n.x); y0 = Math.min(y0, n.y); y1 = Math.max(y1, n.y); }
  const s = Math.min((w - 2 * mx) / Math.max(x1 - x0, 1e-3), (h - 2 * my) / Math.max(y1 - y0, 1e-3));
  G.adatta = { w, s, cx: w / 2 - (x0 + x1) / 2 * s, cy: h / 2 - (y0 + y1) / 2 * s + 8 };
  return G.adatta;
}
