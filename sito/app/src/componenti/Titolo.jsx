import { useEffect, useRef } from "react";
import { useColori, useRiduci } from "../base.js";
import { gauss } from "../lab/strumenti.jsx";

/* Il titolo come gas di particelle. Ogni punto è legato al suo posto nella lettera da una molla
   e scosso da un rumore termico (dinamica di Langevin): k cala e il rumore cresce con T.
   A bassa T le particelle restano nelle lettere, ad alta T le lettere evaporano. Il dito scalda localmente. */
export default function Titolo({ T, className = "" }) {
  const cv = useRef(null);
  const C = useColori();
  const riduci = useRiduci();
  const Tref = useRef(T);
  Tref.current = T;

  useEffect(() => {
    const canvas = cv.current;
    let G = null, n = 0, x, y, vx, vy, tx, ty, riga, raggio = 2, dim = 100, raf = 0, vivo = true;
    const dito = { x: -1e9, y: -1e9 };
    const font = C.display;

    function costruisci() {
      const dpr = Math.min(devicePixelRatio || 1, 2), r = canvas.getBoundingClientRect();
      if (r.width < 20 || r.height < 20) return false;
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      G = { ctx, w: r.width, h: r.height };
      const off = document.createElement("canvas");
      off.width = Math.round(G.w); off.height = Math.round(G.h);
      const o = off.getContext("2d");
      dim = Math.min(G.h * 0.46, G.w * 0.2);
      for (;;) {
        o.font = `600 ${dim}px ${font}`;
        const l1 = o.measureText("Meccanica").width;
        o.font = `italic 500 ${dim}px ${font}`;
        const l2 = o.measureText("Statistica").width;
        if (Math.max(l1, l2 + dim * 0.55) < G.w * 0.96 || dim < 20) break;
        dim *= 0.94;
      }
      const y1 = dim * 0.98, y2 = y1 + dim * 0.95;
      o.fillStyle = "#fff";
      o.font = `600 ${dim}px ${font}`; o.fillText("Meccanica", G.w * 0.01, y1);
      o.font = `italic 500 ${dim}px ${font}`; o.fillText("Statistica", G.w * 0.01 + dim * 0.55, y2);
      const d = o.getImageData(0, 0, off.width, off.height).data;
      let passo = Math.max(2, Math.round(dim / 34)), bers;
      for (;;) {
        bers = [];
        for (let j = 0; j < off.height; j += passo) for (let i = 0; i < off.width; i += passo)
          if (d[(j * off.width + i) * 4 + 3] > 140) bers.push(i, j);
        if (bers.length / 2 <= 5200) break;
        passo++;
      }
      n = bers.length / 2;
      raggio = Math.max(1.1, passo * 0.46);
      x = new Float32Array(n); y = new Float32Array(n); vx = new Float32Array(n); vy = new Float32Array(n);
      tx = new Float32Array(n); ty = new Float32Array(n); riga = new Uint8Array(n);
      const confine = (y1 + y2) / 2 - dim * 0.35;
      for (let k = 0; k < n; k++) {
        tx[k] = bers[2 * k] + (Math.random() - 0.5) * passo * 0.6;
        ty[k] = bers[2 * k + 1] + (Math.random() - 0.5) * passo * 0.6;
        x[k] = tx[k]; y[k] = ty[k]; riga[k] = ty[k] > confine ? 1 : 0;
      }
      return true;
    }
    const liscio = (a, b, v) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
    function evolvi() {
      const T = Tref.current, k = 0.05 * (1 - liscio(0.45, 0.9, T)), gamma = 0.1, r2 = (dim * 0.55) ** 2;
      for (let i = 0; i < n; i++) {
        const dx = x[i] - dito.x, dy = y[i] - dito.y;
        const a = Math.sqrt(2 * gamma * (T + 7 * Math.exp(-(dx * dx + dy * dy) / r2)));
        vx[i] += -k * (x[i] - tx[i]) - gamma * vx[i] + a * gauss();
        vy[i] += -k * (y[i] - ty[i]) - gamma * vy[i] + a * gauss();
        x[i] += vx[i]; y[i] += vy[i];
        if (x[i] < 0) { x[i] = 0; vx[i] = Math.abs(vx[i]); } else if (x[i] > G.w) { x[i] = G.w; vx[i] = -Math.abs(vx[i]); }
        if (y[i] < 0) { y[i] = 0; vy[i] = Math.abs(vy[i]); } else if (y[i] > G.h) { y[i] = G.h; vy[i] = -Math.abs(vy[i]); }
      }
    }
    // colori a secchi (un fill per secchio): la prima riga parte fredda, la seconda calda; scaldando vanno verso il caldo
    const S = 14, colori = [...Array(S)].map((_, i) => C.termico(0.12 + 0.88 * i / (S - 1)))
      .concat([...Array(S)].map((_, i) => C.termico(0.62 + 0.38 * i / (S - 1))));
    const secchi = Array.from({ length: 2 * S }, () => []);
    function disegna() {
      if (!G) return;
      const { ctx, w, h } = G;
      ctx.clearRect(0, 0, w, h);
      secchi.forEach(s => (s.length = 0));
      for (let i = 0; i < n; i++) secchi[riga[i] * S + Math.min(S - 1, Math.floor(Math.hypot(vx[i], vy[i]) / 3.2 * S))].push(i);
      for (let c = 0; c < 2 * S; c++) {
        ctx.fillStyle = colori[c];
        ctx.beginPath();
        for (const i of secchi[c]) { ctx.moveTo(x[i] + raggio, y[i]); ctx.arc(x[i], y[i], raggio, 0, 6.2832); }
        ctx.fill();
      }
    }
    const giro = () => { if (!vivo) return; if (G) { evolvi(); disegna(); } raf = requestAnimationFrame(giro); };
    const muovi = e => { const r = canvas.getBoundingClientRect(); dito.x = e.clientX - r.left; dito.y = e.clientY - r.top; };
    const via = () => { dito.x = dito.y = -1e9; };
    canvas.addEventListener("pointermove", muovi);
    canvas.addEventListener("pointerdown", muovi);
    canvas.addEventListener("pointerleave", via);
    canvas.addEventListener("pointerup", via);
    canvas.addEventListener("pointercancel", via);
    const ro = new ResizeObserver(() => {
      const w = canvas.getBoundingClientRect().width;
      if (w >= 20 && (!G || Math.abs(w - G.w) > 2) && costruisci()) disegna();
    });
    const pronto = document.fonts?.load ? Promise.all([document.fonts.load(`600 80px ${font}`), document.fonts.load(`italic 500 80px ${font}`)]).catch(() => {}) : Promise.resolve();
    pronto.then(() => {
      if (!vivo) return;
      if (costruisci()) disegna();
      ro.observe(canvas);
      if (riduci) { for (let s = 0; s < 120; s++) evolvi(); disegna(); } else raf = requestAnimationFrame(giro);
    });
    return () => {
      vivo = false; cancelAnimationFrame(raf); ro.disconnect();
      canvas.removeEventListener("pointermove", muovi); canvas.removeEventListener("pointerdown", muovi);
      canvas.removeEventListener("pointerleave", via); canvas.removeEventListener("pointerup", via); canvas.removeEventListener("pointercancel", via);
    };
  }, [C, riduci]);

  return <canvas ref={cv} className={`block w-full ${className}`} style={{ touchAction: "pan-y" }}
    role="img" aria-label="Il titolo Meccanica Statistica disegnato da migliaia di particelle" />;
}
