import { useEffect, useRef, useState } from "react";
import { fmt } from "../base.js";
import { Cornice, Cursore, Lettura, Pulsante, Voce, gauss, piano, useTela } from "./strumenti.jsx";

/* Dipoli in un campo: la funzione di Langevin.
   Fisica: con x = cos θ e α = βμE la densità di x è ∝ e^{αx} su [−1, 1] (dΩ = dφ dx), quindi
   ⟨cos θ⟩ = 𝓛(α) = coth α − 1/α; per α ≪ 1 vale la legge di Curie 𝓛 ≈ α/3, per α ≫ 1 si satura a 1.
   Pedagogia: i dipoli si muovono davvero (Metropolis su x e passeggiata su φ), così la media misurata
   insegue la curva teorica: si vede il campo che ordina e l'agitazione termica che disordina.
   Colori: ogni freccia ha il colore della sua energia −μE cos θ (allineata = fredda, opposta = calda);
   la distribuzione di cos θ è una probabilità; la retta di Curie è l'approssimazione, tratteggiata. */
const L = a => (a < 1e-3 ? a / 3 - a ** 3 / 45 : 1 / Math.tanh(a) - 1 / a);
const P = (a, x) => (a < 1e-6 ? 0.5 : a * Math.exp(a * (x - 1)) / -Math.expm1(-2 * a));
const M = 2400;          // dipoli del campione statistico
const COL = 8, RIG = 5;  // i primi COL×RIG si vedono come frecce
const BIN = 24;

export default function Langevin() {
  const [a, setA] = useState(1);
  const aRef = useRef(a);
  aRef.current = a;
  const cam = useRef(null);
  if (!cam.current) cam.current = { x: Float64Array.from({ length: M }, () => 2 * Math.random() - 1), f: Float64Array.from({ length: M }, () => 2 * Math.PI * Math.random()) };
  const [misura, setMisura] = useState(0);

  // un passo di Metropolis per ogni dipolo: accetta x' con probabilità min(1, e^{α(x'−x)})
  const evolvi = () => {
    const { x, f } = cam.current, al = aRef.current;
    for (let i = 0; i < M; i++) {
      let y = x[i] + 0.16 * gauss();
      if (y > 1) y = 2 - y; else if (y < -1) y = -2 - y;
      if (Math.log(Math.random()) < al * (y - x[i])) x[i] = y;
      f[i] += 0.08 * gauss();
    }
  };
  const media = () => { let s = 0; for (let i = 0; i < M; i++) s += cam.current.x[i]; return s / M; };

  // le frecce: proiezione del dipolo sul piano verticale, accorciata quando punta verso di noi
  const frecce = useTela((ctx, w, h, C, dt) => {
    if (dt > 0) evolvi();
    ctx.fillStyle = C.schermo; ctx.fillRect(0, 0, w, h);
    const sx = 54, cw = (w - sx - 10) / COL, ch = h / RIG, lung = Math.min(cw, ch) * 0.4;
    // il campo E, verso l'alto
    ctx.strokeStyle = C.energia; ctx.fillStyle = C.energia; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(24, h - 18); ctx.lineTo(24, 26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(24, 16); ctx.lineTo(17, 30); ctx.lineTo(31, 30); ctx.closePath(); ctx.fill();
    ctx.font = `italic 600 17px ${C.display}`; ctx.textAlign = "center"; ctx.fillText("E", 40, 30);
    const { x, f } = cam.current;
    for (let r = 0; r < RIG; r++) for (let c = 0; c < COL; c++) {
      const i = r * COL + c, cx = sx + (c + 0.5) * cw, cy = (r + 0.5) * ch;
      const s = Math.sqrt(1 - x[i] * x[i]), dx = s * Math.cos(f[i]) * lung, dy = -x[i] * lung;
      ctx.strokeStyle = ctx.fillStyle = C.termico((1 - x[i]) / 2);
      ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(cx - dx, cy - dy); ctx.lineTo(cx + dx, cy + dy); ctx.stroke();
      const n = Math.hypot(dx, dy) || 1, ux = dx / n, uy = dy / n, t = Math.min(9, n * 0.7);
      ctx.beginPath(); ctx.moveTo(cx + dx + ux * 3, cy + dy + uy * 3);
      ctx.lineTo(cx + dx - ux * t - uy * t * 0.55, cy + dy - uy * t + ux * t * 0.55);
      ctx.lineTo(cx + dx - ux * t + uy * t * 0.55, cy + dy - uy * t - ux * t * 0.55); ctx.closePath(); ctx.fill();
      ctx.fillStyle = C.a("testo", 0.25); ctx.beginPath(); ctx.arc(cx, cy, 2, 0, 6.2832); ctx.fill();
    }
  }, [], { anima: true });

  // i grafici: 𝓛(α) con la retta di Curie, e la distribuzione di cos θ con l'istogramma del campione
  const grafici = useTela((ctx, w, h, C) => {
    ctx.fillStyle = C.schermo; ctx.fillRect(0, 0, w, h);
    const al = aRef.current, largo = w >= 520;
    const [r1, r2] = largo ? [{ x: 0, y: 0, w: w * 0.52, h }, { x: w * 0.52, y: 0, w: w * 0.48, h }]
      : [{ x: 0, y: 0, w, h: h / 2 }, { x: 0, y: h / 2, w, h: h / 2 }];
    const p1 = piano(ctx, r1, { x0: 0, x1: 15, y0: 0, y1: 1.08, tx: [0, 5, 10, 15], ty: [0, 0.5, 1], ex: "α = βμE", ey: "⟨cos θ⟩" }, C);
    p1.orizzontale(1, C.filetto);
    p1.curva(x => x / 3, C.freddo, 1.8, [6, 5]);
    p1.curva(L, C.accento, 2.6);
    p1.verticale(al, C.tenue);
    p1.punto(al, L(al), C.accento, 6);
    const m = media();
    ctx.strokeStyle = C.testo; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p1.X(al), p1.Y(Math.max(0, m)), 9, 0, 6.2832); ctx.stroke();
    const cima = Math.max(P(al, 1), 0.5) * 1.15;
    const p2 = piano(ctx, r2, { x0: -1, x1: 1, y0: 0, y1: cima, tx: [-1, 0, 1], ex: "cos θ", ey: "densità di cos θ" }, C);
    const conta = new Float64Array(BIN), { x } = cam.current;
    for (let i = 0; i < M; i++) conta[Math.min(BIN - 1, (x[i] + 1) / 2 * BIN | 0)]++;
    ctx.fillStyle = C.a("probabilita", 0.28);
    for (let b = 0; b < BIN; b++) {
      const d = conta[b] / M / (2 / BIN), x0 = p2.X(-1 + 2 * b / BIN) + 1, x1 = p2.X(-1 + 2 * (b + 1) / BIN) - 1;
      ctx.fillRect(x0, p2.Y(Math.min(d, cima)), x1 - x0, p2.Y(0) - p2.Y(Math.min(d, cima)));
    }
    p2.curva(xx => P(al, xx), C.probabilita, 2.6);
    p2.verticale(L(al), C.accento, [3, 3]);
  }, [], { anima: true });

  useEffect(() => { const id = setInterval(() => setMisura(media()), 300); return () => clearInterval(id); }, []);

  const curie = a / 3, errore = a < 0.01 ? 0 : (curie - L(a)) / L(a) * 100;
  return (
    <Cornice titolo="Il campo ordina, la temperatura disordina" sotto="2400 dipoli liberi di ruotare in un campo E. Muovi α = βμE: alzare il campo o abbassare la temperatura è la stessa cosa."
      legenda={<>
        <Voce colore="rgb(var(--accento))">𝓛(α) = coth α − 1/α</Voce>
        <Voce colore="rgb(var(--freddo))" tratteggio>legge di Curie α/3</Voce>
        <Voce colore="rgb(var(--probabilita))">densità e<sup>αx</sup> (teoria) e campione</Voce>
        <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-full border-2 border-testo" />media misurata</span>
      </>}
      letture={<>
        <Lettura nome="α = βμE" valore={fmt(a, 2)} colore="text-energia" />
        <Lettura nome="⟨cos θ⟩ teorico, 𝓛(α)" valore={fmt(L(a), 3)} colore="text-accento" />
        <Lettura nome="⟨cos θ⟩ misurato" valore={fmt(misura, 3)} />
        <Lettura nome="errore della legge di Curie" valore={fmt(Math.min(errore, 999), 1) + " %"} colore="text-freddo" />
      </>}
      comandi={<>
        <Cursore id="langevin-a" etichetta="α = βμE (campo / temperatura)" valore={a} testo={fmt(a, 2)} min={0} max={15} step={0.01} onChange={setA} />
        <div className="flex flex-wrap gap-2">
          <Pulsante onClick={() => setA(0)} attivo={a === 0}>Campo spento</Pulsante>
          <Pulsante onClick={() => setA(0.3)} attivo={a === 0.3}>Campo debole</Pulsante>
          <Pulsante onClick={() => setA(3)} attivo={a === 3}>α = 3</Pulsante>
          <Pulsante onClick={() => setA(15)} attivo={a === 15}>Saturazione</Pulsante>
        </div>
      </>}>
      <canvas ref={frecce} className="aspect-[16/7] w-full rounded-bozza-sm" aria-label="Quaranta dipoli che si orientano nel campo" />
      <canvas ref={grafici} className="grafici-langevin w-full rounded-bozza-sm" aria-label="Funzione di Langevin e distribuzione di cos θ" />
    </Cornice>
  );
}
