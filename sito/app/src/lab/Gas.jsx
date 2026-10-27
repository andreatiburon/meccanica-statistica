import { useEffect, useRef, useState } from "react";
import { fmt } from "../base.js";
import { Cornice, Cursore, GiocaPausa, Lettura, Pulsante, Voce, useTela } from "./strumenti.jsx";

/* Gas di dischi rigidi in 2D che si termalizza.
   Fisica: 300 dischi, urti elastici tra loro e con le pareti; nessuna forza esterna.
   Pedagogia: partendo da velocità tutte uguali, l'istogramma delle velocità passa da un picco
   alla distribuzione di Maxwell-Boltzmann in 2D, f(v) = (2v/⟨v²⟩) e^{−v²/⟨v²⟩}, senza che nessuno la imponga.
   Colori: particelle e barre sulla scala termica (lente = fredde, veloci = calde); la curva teorica è una
   probabilità, quindi nel colore della probabilità. */
const W = 1.5, H = 1, N = 300, R = 0.0085, BIN = 28;
const UNITA = 100; // k_BT = ⟨v²⟩/2 in unità arbitrarie, moltiplicato per leggibilità

function nuovoGas() {
  const g = { px: new Float64Array(N), py: new Float64Array(N), vx: new Float64Array(N), vy: new Float64Array(N), binH: new Float64Array(BIN), urti: 0 };
  const col = Math.ceil(Math.sqrt(N * W / H)), rig = Math.ceil(N / col);
  for (let i = 0; i < N; i++) {
    g.px[i] = (i % col + 0.5) / col * W; g.py[i] = (Math.floor(i / col) + 0.5) / rig * H;
    const v = 0.18 + 0.18 * Math.random(), a = Math.random() * 2 * Math.PI;
    g.vx[i] = v * Math.cos(a); g.vy[i] = v * Math.sin(a);
  }
  return g;
}
const v2medio = g => { let s = 0; for (let i = 0; i < N; i++) s += g.vx[i] ** 2 + g.vy[i] ** 2; return s / N; };

// un passo di dinamica: moto libero, pareti, urti tra dischi vicini (griglia di celle per trovarli in fretta)
const cella = 2 * R, nc = Math.ceil(W / cella), nr = Math.ceil(H / cella);
const testa = new Int32Array(nc * nr), dopo = new Int32Array(N);
function passo(g, dt) {
  const { px, py, vx, vy } = g;
  for (let i = 0; i < N; i++) {
    px[i] += vx[i] * dt; py[i] += vy[i] * dt;
    if (px[i] < R) { px[i] = R; vx[i] = Math.abs(vx[i]); } else if (px[i] > W - R) { px[i] = W - R; vx[i] = -Math.abs(vx[i]); }
    if (py[i] < R) { py[i] = R; vy[i] = Math.abs(vy[i]); } else if (py[i] > H - R) { py[i] = H - R; vy[i] = -Math.abs(vy[i]); }
  }
  testa.fill(-1);
  for (let i = 0; i < N; i++) {
    const k = Math.min(nr - 1, py[i] / cella | 0) * nc + Math.min(nc - 1, px[i] / cella | 0);
    dopo[i] = testa[k]; testa[k] = i;
  }
  for (let i = 0; i < N; i++) {
    const cx = Math.min(nc - 1, px[i] / cella | 0), cy = Math.min(nr - 1, py[i] / cella | 0);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const xx = cx + dx, yy = cy + dy;
      if (xx < 0 || yy < 0 || xx >= nc || yy >= nr) continue;
      for (let j = testa[yy * nc + xx]; j !== -1; j = dopo[j]) {
        if (j <= i) continue;
        const rx = px[i] - px[j], ry = py[i] - py[j], d2 = rx * rx + ry * ry;
        if (d2 >= 4 * R * R || d2 === 0) continue;
        const p = rx * (vx[i] - vx[j]) + ry * (vy[i] - vy[j]);
        if (p >= 0) continue;
        const k = p / d2;
        vx[i] -= k * rx; vy[i] -= k * ry; vx[j] += k * rx; vy[j] += k * ry;
        g.urti++;
      }
    }
  }
}

export default function Gas() {
  const g = useRef(null);
  if (!g.current) g.current = nuovoGas();
  const [pausa, setPausa] = useState(false);
  const [letture, setLetture] = useState({ T: v2medio(g.current) / 2 * UNITA, urti: 0, scarto: 0 });
  const scarto = useRef(0);
  const pausaRef = useRef(pausa);
  pausaRef.current = pausa;

  // scatola del gas: avanza la dinamica e disegna i dischi
  const scatola = useTela((ctx, w, h, C, dt) => {
    const G = g.current;
    if (dt > 0 && !pausaRef.current) for (let k = 0; k < 3; k++) passo(G, 1 / 180);
    const s = Math.min(w / W, h / H), ox = (w - W * s) / 2, oy = (h - H * s) / 2;
    ctx.fillStyle = C.schermo; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = C.filetto; ctx.lineWidth = 1; ctx.strokeRect(ox + 0.5, oy + 0.5, W * s - 1, H * s - 1);
    const vr = Math.sqrt(v2medio(G)) || 1, rr = Math.max(1.6, R * s * 1.15);
    for (let i = 0; i < N; i++) {
      ctx.fillStyle = C.termico(Math.hypot(G.vx[i], G.vy[i]) / (2.2 * vr));
      ctx.beginPath(); ctx.arc(ox + G.px[i] * s, oy + (H - G.py[i]) * s, rr, 0, 6.2832); ctx.fill();
    }
  }, [], { anima: true });

  // istogramma delle velocità contro la curva di Maxwell-Boltzmann 2D
  const istogramma = useTela((ctx, w, h, C) => {
    const G = g.current, m = { l: 14, r: 12, t: 26, b: 28 };
    const v2 = v2medio(G), vmax = 3 * Math.sqrt(v2), dv = vmax / BIN, conta = new Float64Array(BIN);
    for (let i = 0; i < N; i++) { const b = Math.hypot(G.vx[i], G.vy[i]) / dv | 0; if (b < BIN) conta[b]++; }
    let sc = 0;
    for (let b = 0; b < BIN; b++) {
      G.binH[b] += 0.12 * (conta[b] / (N * dv) - G.binH[b]);
      const v = (b + 0.5) * dv;
      sc += Math.abs(G.binH[b] - 2 * v / v2 * Math.exp(-v * v / v2)) * dv;
    }
    scarto.current = sc * 50;
    const ymax = 1.25 * Math.sqrt(2 / v2) * Math.exp(-0.5);
    const X = v => m.l + v / vmax * (w - m.l - m.r), Y = f => h - m.b - Math.min(f / ymax, 1.15) * (h - m.t - m.b);
    ctx.fillStyle = C.schermo; ctx.fillRect(0, 0, w, h);
    for (let b = 0; b < BIN; b++) {
      ctx.fillStyle = C.termico((b + 0.5) / BIN * 3 / 2.2);
      const x0 = X(b * dv) + 1, x1 = X((b + 1) * dv) - 1;
      ctx.fillRect(x0, Y(G.binH[b]), x1 - x0, h - m.b - Y(G.binH[b]));
    }
    ctx.strokeStyle = C.probabilita; ctx.lineWidth = 2.6; ctx.beginPath();
    for (let k = 0; k <= 120; k++) { const v = k / 120 * vmax, f = 2 * v / v2 * Math.exp(-v * v / v2); k ? ctx.lineTo(X(v), Y(f)) : ctx.moveTo(X(v), Y(f)); }
    ctx.stroke();
    ctx.strokeStyle = C.filetto; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(m.l, h - m.b + 0.5); ctx.lineTo(w - m.r, h - m.b + 0.5); ctx.stroke();
    ctx.fillStyle = C.tenue; ctx.font = `11px ${C.mono}`; ctx.textAlign = "center";
    for (let k = 0; k <= 3; k++) ctx.fillText(k ? k + "·v_rms" : "0", X(k * Math.sqrt(v2)), h - 9);
    ctx.textAlign = "left"; ctx.fillText("frazione di particelle per velocità", m.l, 15);
  }, [], { anima: true });

  // letture dal vivo, quattro volte al secondo
  useEffect(() => {
    let prima = performance.now();
    const id = setInterval(() => {
      const t = performance.now(), G = g.current;
      setLetture({ T: v2medio(G) / 2 * UNITA, urti: pausaRef.current ? 0 : G.urti * 1000 / (t - prima), scarto: scarto.current });
      G.urti = 0; prima = t;
    }, 250);
    return () => clearInterval(id);
  }, []);

  const scala = f => { const G = g.current; for (let i = 0; i < N; i++) { G.vx[i] *= f; G.vy[i] *= f; } };
  const uguali = () => {
    const G = g.current, v = Math.sqrt(v2medio(G));
    for (let i = 0; i < N; i++) { const a = Math.random() * 2 * Math.PI; G.vx[i] = v * Math.cos(a); G.vy[i] = v * Math.sin(a); }
    G.binH.fill(0);
  };
  // toccare la scatola scalda le particelle vicine al dito
  const tocca = e => {
    const cv = scatola.current, r = cv.getBoundingClientRect(), G = g.current;
    const s = Math.min(r.width / W, r.height / H);
    const cx = (e.clientX - r.left - (r.width - W * s) / 2) / s, cy = H - (e.clientY - r.top - (r.height - H * s) / 2) / s;
    const vr = Math.sqrt(v2medio(G));
    for (let i = 0; i < N; i++) if (Math.hypot(G.px[i] - cx, G.py[i] - cy) < 0.12) {
      const a = Math.random() * 2 * Math.PI; G.vx[i] += 2.2 * vr * Math.cos(a); G.vy[i] += 2.2 * vr * Math.sin(a);
    }
  };

  return (
    <Cornice titolo="Un gas che si termalizza" sotto="Prevedi: se tutte le particelle partono con la stessa velocità, che forma prende l'istogramma? Poi premi «Velocità tutte uguali». Tocca la scatola per scaldare un punto."
      legenda={<>
        <Voce colore="rgb(var(--freddo))">lente</Voce><Voce colore="rgb(var(--termo-medio))">medie</Voce><Voce colore="rgb(var(--caldo))">veloci</Voce>
        <Voce colore="rgb(var(--probabilita))">Maxwell-Boltzmann 2D (teoria)</Voce>
      </>}
      letture={<>
        <Lettura nome="k_BT = ⟨v²⟩/2 (unità arb.)" valore={fmt(letture.T, 2)} colore="text-caldo" />
        <Lettura nome="urti al secondo" valore={pausa ? "in pausa" : Math.round(letture.urti).toLocaleString("it-IT")} />
        <Lettura nome="scarto dalla curva" valore={fmt(letture.scarto, 1) + " %"} colore="text-probabilita" />
        <Lettura nome="particelle" valore={N} />
      </>}
      comandi={<>
        <Cursore id="gas-T" etichetta="Temperatura: riscala tutte le velocità" valore={Math.min(12, Math.max(0.5, letture.T))} testo={fmt(letture.T, 2)}
          min={0.5} max={12} step={0.05} onChange={T => { scala(Math.sqrt(T / Math.max(letture.T, 1e-6))); setLetture(l => ({ ...l, T })); }} />
        <div className="flex flex-wrap gap-2">
          <GiocaPausa inPausa={pausa} onClick={() => setPausa(p => !p)} />
          <Pulsante onClick={uguali}>Velocità tutte uguali</Pulsante>
          <Pulsante onClick={() => scala(1.2)}>Riscalda</Pulsante>
          <Pulsante onClick={() => scala(1 / 1.2)}>Raffredda</Pulsante>
        </div>
      </>}>
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
        <canvas ref={scatola} onPointerDown={tocca} className="aspect-[3/2] w-full touch-none rounded-piccolo"
          aria-label="Scatola con 300 dischi colorati secondo la velocità" />
        <canvas ref={istogramma} className="aspect-[3/2] w-full rounded-piccolo" aria-label="Istogramma delle velocità e curva di Maxwell-Boltzmann" />
      </div>
    </Cornice>
  );
}
