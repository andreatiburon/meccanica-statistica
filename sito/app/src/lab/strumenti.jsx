import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { fmt, useColori, useRiduci } from "../base.js";
import { Gioca, Pausa } from "../componenti/icone.jsx";

/* ---------------------------------------------------------------- cornice comune dei laboratori
   Titolo e domanda in alto, scena al centro, poi comandi e letture dal vivo (la «telemetria»). */
export function Cornice({ titolo, sotto, children, comandi, letture, legenda }) {
  return (
    <figure className="lab m-0 grid gap-4 rounded-scheda border border-filetto/80 bg-superficie p-4 font-ui shadow-lg shadow-black/10">
      <figcaption className="grid gap-0.5 px-1">
        <span className="text-[0.84rem] font-semibold text-accento">Laboratorio</span>
        <span className="font-display text-[1.15rem] leading-snug text-testo">{titolo}</span>
        {sotto && <span className="text-[0.84rem] leading-snug text-testo-2">{sotto}</span>}
      </figcaption>
      {children}
      {legenda && <div className="flex flex-wrap gap-x-4 gap-y-1 px-1 text-[0.78rem] text-testo-2">{legenda}</div>}
      {letture && <dl className="m-0 grid grid-cols-2 gap-px overflow-hidden rounded-piccolo border border-filetto/70 bg-filetto/70">{letture}</dl>}
      {comandi && <div className="grid gap-3">{comandi}</div>}
    </figure>
  );
}

export function Lettura({ nome, valore, colore = "text-testo" }) {
  return (
    <div className="bg-superficie px-3 py-2.5">
      <dt className="text-[0.72rem] leading-tight text-tenue">{nome}</dt>
      <dd className={`tabulare m-0 mt-0.5 font-testo text-[1.08rem] ${colore}`}>{valore}</dd>
    </div>
  );
}

export function Voce({ colore, children, tratteggio = false }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-block h-[3px] w-5 rounded-full" style={{ background: tratteggio ? `repeating-linear-gradient(90deg, ${colore} 0 5px, transparent 5px 9px)` : colore }} />
      {children}
    </span>
  );
}

export function Cursore({ id, etichetta, valore, testo, min, max, step, onChange }) {
  return (
    <div className="grid gap-0.5 px-1">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.84rem] text-testo-2">
        <span>{etichetta}</span>
        <output htmlFor={id} className="tabulare font-testo text-[1.02rem] text-testo">{testo ?? valore}</output>
      </label>
      <input id={id} className="cursore" type="range" min={min} max={max} step={step} value={valore}
        onChange={e => onChange(+e.target.value)} />
    </div>
  );
}

export function Pulsante({ children, onClick, primario = false, attivo = false }) {
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.96 }}
      className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.86rem] font-medium transition-colors
        ${primario ? "bg-accento text-fondo" : attivo ? "border border-accento bg-accento/15 text-accento" : "border border-filetto text-testo-2 hover:bg-testo/5"}`}>
      {children}
    </motion.button>
  );
}

export function GiocaPausa({ inPausa, onClick }) {
  return <Pulsante primario onClick={onClick}>{inPausa ? <Gioca size={16} /> : <Pausa size={16} />}{inPausa ? "Avvia" : "Pausa"}</Pulsante>;
}

/* ---------------------------------------------------------------- canvas
   useTela: canvas nitido alla densità dello schermo, ridisegnato quando cambia misura.
   disegna(ctx, w, h, colori) è chiamata a ogni cambio; con anima=true gira a ogni fotogramma
   (solo mentre il canvas è visibile). */
export function useTela(disegna, deps = [], { anima = false } = {}) {
  const ref = useRef(null);
  const colori = useColori();
  const riduci = useRiduci();
  const stato = useRef({ w: 0, h: 0, visibile: true });
  const fn = useRef(disegna);
  fn.current = disegna;

  useEffect(() => {
    const cv = ref.current;
    const prepara = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
      cv.width = Math.max(1, Math.round(r.width * dpr));
      cv.height = Math.max(1, Math.round(r.height * dpr));
      cv.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
      stato.current.w = r.width; stato.current.h = r.height;
    };
    prepara();
    const ro = new ResizeObserver(() => { prepara(); fn.current(cv.getContext("2d"), stato.current.w, stato.current.h, colori, 0); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (stato.current.visibile = e.isIntersecting), { rootMargin: "80px" });
    io.observe(cv);
    return () => { ro.disconnect(); io.disconnect(); };
  }, [colori]);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    fn.current(ctx, stato.current.w, stato.current.h, colori, 0);
    if (!anima || riduci) return;
    let raf, prima = performance.now();
    const giro = t => {
      const dt = Math.min(0.05, (t - prima) / 1000);
      prima = t;
      if (stato.current.visibile) fn.current(ctx, stato.current.w, stato.current.h, colori, dt);
      raf = requestAnimationFrame(giro);
    };
    raf = requestAnimationFrame(giro);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colori, anima, riduci, ...deps]);
  return ref;
}

/* Piano cartesiano dentro il riquadro r: assi, tacche, etichette e disegnatori di curve. */
export function piano(ctx, r, o, C) {
  const m = Object.assign({ l: 38, r: 12, t: 22, b: 26 }, o.m || {});
  const X = x => r.x + m.l + (x - o.x0) / (o.x1 - o.x0) * (r.w - m.l - m.r);
  const Y = y => r.y + r.h - m.b - (y - o.y0) / (o.y1 - o.y0) * (r.h - m.t - m.b);
  const etich = v => String(Math.round(v * 100) / 100).replace(".", ",");
  ctx.setLineDash([]);
  ctx.strokeStyle = C.filetto; ctx.lineWidth = 1; ctx.beginPath();
  ctx.moveTo(X(o.x0), Y(o.y0) + 0.5); ctx.lineTo(X(o.x1), Y(o.y0) + 0.5);
  ctx.moveTo(X(o.x0) - 0.5, Y(o.y0)); ctx.lineTo(X(o.x0) - 0.5, Y(o.y1)); ctx.stroke();
  ctx.fillStyle = C.tenue; ctx.font = `11px ${C.mono}`;
  ctx.textAlign = "center"; (o.tx || []).forEach(v => ctx.fillText(etich(v), X(v), r.y + r.h - 8));
  ctx.textAlign = "right"; (o.ty || []).forEach(v => ctx.fillText(etich(v), X(o.x0) - 6, Y(v) + 4));
  if (o.ex) { ctx.textAlign = "right"; ctx.fillText(o.ex, X(o.x1), Y(o.y0) - 7); }
  if (o.ey) { ctx.textAlign = "left"; ctx.fillText(o.ey, X(o.x0) + 6, r.y + m.t - 8); }
  const ritaglia = () => { ctx.save(); ctx.beginPath(); ctx.rect(X(o.x0), Y(o.y1), X(o.x1) - X(o.x0), Y(o.y0) - Y(o.y1)); ctx.clip(); };
  const traccia = (f, a, b, unito = false) => {
    const n = Math.max(60, Math.round(Math.abs(X(b) - X(a))));
    let su = unito;
    for (let k = 0; k <= n; k++) {
      const x = a + (b - a) * k / n, y = f(x);
      if (!isFinite(y)) { su = false; continue; }
      su ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y));
      su = true;
    }
  };
  return {
    X, Y,
    curva(f, col, lw = 2.4, trat = [], a = o.x0, b = o.x1) {
      ritaglia(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(trat); ctx.beginPath(); traccia(f, a, b); ctx.stroke(); ctx.restore();
    },
    area(f, col, a = o.x0, b = o.x1) {
      ritaglia(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(X(a), Y(o.y0)); traccia(f, a, b, true);
      ctx.lineTo(X(b), Y(o.y0)); ctx.closePath(); ctx.fill(); ctx.restore();
    },
    verticale(x, col, trat = [4, 4]) {
      ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.setLineDash(trat); ctx.beginPath();
      ctx.moveTo(X(x), Y(o.y0)); ctx.lineTo(X(x), Y(o.y1)); ctx.stroke(); ctx.setLineDash([]);
    },
    orizzontale(y, col, trat = [4, 4]) {
      ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.setLineDash(trat); ctx.beginPath();
      ctx.moveTo(X(o.x0), Y(y)); ctx.lineTo(X(o.x1), Y(y)); ctx.stroke(); ctx.setLineDash([]);
    },
    punto(x, y, col, rr = 5) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(x), Y(y), rr, 0, 2 * Math.PI); ctx.fill(); },
    scritta(x, y, t, col, al = "left") { ctx.fillStyle = col; ctx.textAlign = al; ctx.fillText(t, X(x), Y(y)); },
  };
}

export function gauss() {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* ---------------------------------------------------------------- laboratori a grafico
   La forma comune dei laboratori «piccoli»: qualche cursore, qualche preimpostazione, un grafico che si
   ridisegna a ogni cambio e le letture numeriche. calcola(val) fa i conti una volta sola per stato
   (radici, integrali); disegna e letture ne usano il risultato. */
export function LabGrafico({ nome, titolo, sotto, legenda, parametri, preset = [], calcola = () => ({}), disegna, letture, doppio = false, etichettaTela }) {
  const [val, setVal] = useState(() => Object.fromEntries(parametri.map(p => [p.id, p.iniziale])));
  const dati = useMemo(() => calcola(val), [val]); // eslint-disable-line react-hooks/exhaustive-deps
  const tela = useTela((ctx, w, h, C) => {
    ctx.fillStyle = C.schermo; ctx.fillRect(0, 0, w, h);
    ctx.font = `12px ${C.mono}`;
    disegna(ctx, w, h, C, val, dati);
  }, [val, dati]);
  const attivo = v => Object.entries(v).every(([k, x]) => Math.abs(val[k] - x) < 1e-9);
  return (
    <Cornice titolo={titolo} sotto={sotto} legenda={legenda}
      letture={letture(val, dati).map(([n, v, c]) => <Lettura key={n} nome={n} valore={v} colore={c} />)}
      comandi={<>
        {parametri.map(p => (
          <Cursore key={p.id} id={`${nome}-${p.id}`} etichetta={p.etichetta} valore={val[p.id]} testo={p.testo?.(val[p.id], val)}
            min={p.min} max={p.max} step={p.step} onChange={x => setVal(v => ({ ...v, [p.id]: x }))} />
        ))}
        {preset.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {preset.map(([etichetta, v]) => <Pulsante key={etichetta} attivo={attivo(v)} onClick={() => setVal(x => ({ ...x, ...v }))}>{etichetta}</Pulsante>)}
          </div>
        )}
      </>}>
      <canvas ref={tela} className={`${doppio ? "tela-doppia" : "tela"} w-full rounded-piccolo`} aria-label={etichettaTela ?? titolo} />
    </Cornice>
  );
}

// Due riquadri affiancati quando c'è spazio, uno sopra l'altro quando il laboratorio è stretto.
export function riquadri(w, h, quota = 0.55) {
  return w >= 520 ? [{ x: 0, y: 0, w: w * quota, h }, { x: w * quota, y: 0, w: w * (1 - quota), h }]
    : [{ x: 0, y: 0, w, h: h / 2 }, { x: 0, y: h / 2, w, h: h / 2 }];
}

// Numeri leggibili: 0,034 oppure 2,5·10⁻⁷.
const apice = n => String(n).replace("-", "⁻").replace(/\d/g, c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]);
export function sci(x) {
  if (!isFinite(x)) return "∞";
  if (x >= 1e-3 && x < 1e4) return x.toLocaleString("it-IT", { maximumSignificantDigits: 3 });
  const e = Math.floor(Math.log10(x)), m = x / 10 ** e;
  return `${fmt(m, 1)}·10${apice(e)}`;
}

// Integrale di Simpson su [a, b] con n intervalli (n pari).
export function simpson(f, a, b, n = 400) {
  const h = (b - a) / n;
  let s = 0;
  for (let k = 0; k <= n; k++) s += f(a + k * h) * (k === 0 || k === n ? 1 : k % 2 ? 4 : 2);
  return s * h / 3;
}

// Bisezione di g su [a, b] (g cambia segno).
export function bisezione(g, a, b, passi = 80) {
  let ga = g(a);
  for (let k = 0; k < passi; k++) { const c = (a + b) / 2, gc = g(c); if ((gc > 0) === (ga > 0)) { a = c; ga = gc; } else b = c; }
  return (a + b) / 2;
}
