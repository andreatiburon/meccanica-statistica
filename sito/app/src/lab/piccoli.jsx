// I laboratori «piccoli» delle lezioni: un grafico, qualche cursore, le letture numeriche.
// La fisica è la stessa del sito attuale (sito/tema/sito.js); i colori seguono il loro significato:
// probabilità, particelle, energia, energia libera, scala termica; il gesso bianco per tutto il resto.
import { fmt } from "../base.js";
import { LabGrafico, Voce, bisezione, piano, riquadri, sci, simpson } from "./strumenti.jsx";

const tok = n => `rgb(var(--${n}))`;
const percento = f => (f > 0.9999 ? "più del 99,99 %" : f < 1e-4 ? fmt(f * 100, 6) + " %" : fmt(f * 100, 2) + " %");
const linea = (ctx, p, punti, col, lw = 2.2, trat = []) => {
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(trat); ctx.beginPath();
  punti.forEach(([x, y], i) => (i ? ctx.lineTo(p.X(x), p.Y(y)) : ctx.moveTo(p.X(x), p.Y(y))));
  ctx.stroke(); ctx.setLineDash([]);
};

/* ---------------------------------------------------------------- microcanonico: il guscio di energia */
const potenza = x => {
  if (x >= 1e-3 && x < 1e4) return x.toLocaleString("it-IT", { maximumFractionDigits: x < 10 ? 3 : 0 });
  return sci(x);
};
export function Guscio() {
  return (
    <LabGrafico nome="guscio" titolo="Il volume sta nella buccia"
      sotto={<>La probabilità che un punto preso a caso dentro una sfera a D dimensioni stia a distanza r dal centro cresce come r<sup>D−1</sup>. Sposta D verso il numero di Avogadro e guarda dove finisce tutto il volume.</>}
      legenda={<><Voce colore={tok("probabilita")}>densità del raggio, r<sup>D−1</sup></Voce><Voce colore={tok("energia")}>guscio esterno di spessore ε</Voce></>}
      parametri={[
        { id: "D", etichetta: "dimensioni D (scala logaritmica)", min: 0, max: 24, step: 0.01, iniziale: 0.48, testo: v => potenza(10 ** v) },
        { id: "eps", etichetta: "spessore relativo ε del guscio", min: -12, max: -0.3, step: 0.01, iniziale: -2, testo: v => (10 ** v >= 0.01 ? fmt(10 ** v * 100, 1) + " %" : sci(10 ** v)) },
      ]}
      preset={[["D = 3", { D: 0.48 }], ["D = 100", { D: 2 }], ["D ≈ 3N", { D: 23.8 }]]}
      calcola={v => {
        const D = 10 ** v.D, eps = 10 ** v.eps;
        return { D, eps, frazione: -Math.expm1(D * Math.log1p(-eps)), mezzo: -Math.expm1(-Math.LN2 / D) };
      }}
      disegna={(ctx, w, h, C, v, d) => {
        const p = piano(ctx, { x: 0, y: 0, w, h }, { x0: 0, x1: 1, y0: 0, y1: 1.08, tx: [0, 0.25, 0.5, 0.75, 1], ty: [0, 0.5, 1], ex: "r / R", ey: "densità (al massimo)" }, C);
        ctx.fillStyle = C.a("energia", 0.2);
        const x0 = p.X(Math.max(0, 1 - d.eps));
        ctx.fillRect(Math.min(x0, p.X(1) - 2), p.Y(1.08), Math.max(p.X(1) - x0, 2), p.Y(0) - p.Y(1.08));
        p.curva(r => (r === 0 ? (d.D <= 1 ? 1 : 0) : Math.exp((d.D - 1) * Math.log(r))), C.probabilita, 2.6);
      }}
      letture={(v, d) => [
        ["volume dentro il guscio", percento(d.frazione), "text-energia"],
        ["raggio che dimezza il volume", d.mezzo < 1e-3 ? `(1 − ${sci(d.mezzo)}) R` : `${fmt(1 - d.mezzo, 3)} R`],
      ]} />
  );
}

/* ---------------------------------------------------------------- gran canonico: isoterma di Langmuir */
const langmuirF = (b, l) => { const y = Math.exp(l * Math.LN10 + b); return y / (1 + y); };
export function Langmuir() {
  return (
    <LabGrafico nome="langmuir" titolo="Riempire una superficie"
      sotto={<>L'isoterma di Langmuir f = ρV<sub>b</sub>e<sup>βε</sup>/(1 + ρV<sub>b</sub>e<sup>βε</sup>). Aumenta βε (legame più forte o temperatura più bassa) e guarda la curva scivolare verso densità sempre più piccole.</>}
      legenda={<><Voce colore={tok("particelle")}>frazione di siti occupati f</Voce><Voce colore={tok("tenue")} tratteggio>senza legame, βε = 0</Voce><Voce colore={`rgb(var(--particelle) / .35)`}>varianza f(1−f) di un sito</Voce></>}
      parametri={[
        { id: "be", etichetta: "βε, energia di legame in unità di kBT", min: 0, max: 12, step: 0.1, iniziale: 4, testo: v => fmt(v, 1) },
        { id: "x", etichetta: "densità del gas ρVb (scala logaritmica)", min: -6, max: 2, step: 0.01, iniziale: -2, testo: v => sci(10 ** v) },
      ]}
      preset={[["legame forte", { be: 8 }], ["legame debole", { be: 1 }], ["gas denso", { x: 1.5 }]]}
      disegna={(ctx, w, h, C, v) => {
        const p = piano(ctx, { x: 0, y: 0, w, h }, { x0: -6, x1: 2, y0: 0, y1: 1.08, tx: [-6, -4, -2, 0, 2], ty: [0, 0.5, 1], ex: "log₁₀ ρVb", ey: "f", m: { l: 40, r: 16, t: 22, b: 28 } }, C);
        p.orizzontale(0.5, C.filetto);
        p.area(l => langmuirF(v.be, l) * (1 - langmuirF(v.be, l)), C.a("particelle", 0.18));
        p.curva(l => langmuirF(0, l), C.tenue, 1.6, [6, 5]);
        p.curva(l => langmuirF(v.be, l), C.particelle, 2.6);
        const mezzo = -v.be / Math.LN10;
        if (mezzo >= -6) p.verticale(mezzo, C.tenue);
        p.punto(v.x, langmuirF(v.be, v.x), C.testo);
      }}
      letture={v => {
        const f = langmuirF(v.be, v.x);
        return [["siti occupati f", fmt(f * 100, 1) + " %", "text-particelle"], ["metà copertura a ρVb =", sci(Math.exp(-v.be))],
          ["varianza per sito f(1−f)", fmt(f * (1 - f), 3)], ["βε", fmt(v.be, 1)]];
      }} />
  );
}

/* ---------------------------------------------------------------- gas reali: Van der Waals e Maxwell */
function maxwellVdw(th) {
  const pi = f => 8 * th / (3 * f - 1) - 3 / (f * f), prim = f => 8 * th / 3 * Math.log(3 * f - 1) + 3 / f;
  const hh = f => (3 * f - 1) ** 2 - 4 * th * f ** 3;
  const sl = bisezione(hh, 1 / 3 + 1e-9, 1, 90), sg = bisezione(hh, 1, 1e3, 90);
  const radici = p => [bisezione(f => pi(f) - p, 1 / 3 + 1e-9, sl, 90), bisezione(f => pi(f) - p, sg, 1e5, 90)];
  const area = p => { const [a, b] = radici(p); return prim(b) - prim(a) - p * (b - a); };
  const pc = bisezione(area, Math.max(pi(sl), 0) + 1e-12, pi(sg) - 1e-12, 90);
  const [fl, fg] = radici(pc);
  return { sl, sg, pc, fl, fg };
}
let binodale = null;
const cupola = () => {
  if (binodale) return binodale;
  const c = [];
  for (let th = 0.6; th < 0.9995; th += 0.01) { const m = maxwellVdw(th); c.push([m.fl, m.pc], [m.fg, m.pc]); }
  return (binodale = c.filter((_, i) => i % 2 === 0).concat([[1, 1]], c.filter((_, i) => i % 2).reverse()));
};
export function Vdw() {
  return (
    <LabGrafico nome="vdw" titolo="Aree uguali"
      sotto="L'isoterma ridotta di Van der Waals e la costruzione di Maxwell: la pressione di coesistenza taglia l'isoterma in due lobi di area uguale, cioè di lavoro uguale. Abbassa θ fino a vedere l'isoterma scendere sotto zero: è il liquido in tensione."
      legenda={<><Voce colore={tok("testo")}>isoterma π(φ)</Voce><Voce colore={`rgb(var(--energia) / .5)`}>lobi di area uguale</Voce><Voce colore={tok("tenue")} tratteggio>isoterma critica e cupola di coesistenza</Voce></>}
      parametri={[{ id: "th", etichetta: "temperatura ridotta θ = T/Tc", min: 0.6, max: 1.2, step: 0.002, iniziale: 0.9, testo: v => fmt(v, 3) }]}
      preset={[["θ = 0,9", { th: 0.9 }], ["vicino al punto critico", { th: 0.97 }], ["liquido in tensione", { th: 0.65 }], ["sopra Tc", { th: 1.1 }]]}
      calcola={v => (v.th < 0.9995 ? maxwellVdw(v.th) : null)}
      disegna={(ctx, w, h, C, v, m) => {
        const pi = f => 8 * v.th / (3 * f - 1) - 3 / (f * f);
        const p = piano(ctx, { x: 0, y: 0, w, h }, { x0: 0.35, x1: 4, y0: -0.6, y1: 2.2, tx: [1, 2, 3, 4], ty: [0, 1, 2], ex: "φ = V/Vc", ey: "π = P/Pc" }, C);
        const ritaglia = () => { ctx.save(); ctx.beginPath(); ctx.rect(p.X(0.35), p.Y(2.2), p.X(4) - p.X(0.35), p.Y(-0.6) - p.Y(2.2)); ctx.clip(); };
        p.orizzontale(0, C.filetto, []);
        ritaglia(); linea(ctx, p, cupola(), C.a("tenue", 0.7), 1.2, [3, 4]); ctx.restore();
        p.curva(f => 8 / (3 * f - 1) - 3 / (f * f), C.tenue, 1.4, [6, 5], 0.4, 4);
        if (m) {
          ritaglia();
          ctx.fillStyle = C.a("energia", 0.3); ctx.beginPath(); ctx.moveTo(p.X(m.fl), p.Y(m.pc));
          for (let k = 0; k <= 240; k++) { const f = m.fl + (m.fg - m.fl) * k / 240; ctx.lineTo(p.X(f), p.Y(pi(f))); }
          ctx.closePath(); ctx.fill(); ctx.restore();
        }
        p.curva(pi, C.testo, 2.4, [], 0.36, 4);
        if (m) {
          ctx.strokeStyle = C.energia; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.X(m.fl), p.Y(m.pc)); ctx.lineTo(p.X(m.fg), p.Y(m.pc)); ctx.stroke();
          p.punto(m.fl, m.pc, C.testo, 4.5); p.punto(m.fg, m.pc, C.testo, 4.5);
          p.punto(m.sl, pi(m.sl), C.tenue, 3.5); p.punto(m.sg, pi(m.sg), C.tenue, 3.5);
        }
        p.scritta(3.95, 0.66, "isoterma critica", C.tenue, "right");
      }}
      letture={(v, m) => (m ? [["pressione di coesistenza π", fmt(m.pc, 3), "text-energia"], ["volume del liquido φ", fmt(m.fl, 3)],
        ["volume del vapore φ", fmt(m.fg, 2)], ["densità liquido / vapore", fmt(m.fg / m.fl, 2)]]
        : [["pressione di coesistenza π", "nessuna: sopra Tc"], ["volume del liquido φ", "—"], ["volume del vapore φ", "—"], ["densità liquido / vapore", "—"]])} />
  );
}

/* ---------------------------------------------------------------- Ising: campo medio di Bragg-Williams */
const entropiaMista = L => { const p = (1 + L) / 2, q = (1 - L) / 2; return (p > 0 ? p * Math.log(p) : 0) + (q > 0 ? q * Math.log(q) : 0); };
export function CampoMedio() {
  return (
    <LabGrafico nome="campo-medio" titolo="La magnetizzazione che si sostiene da sola" doppio
      sotto={<>Le intersezioni tra y = L e tanh((T<sub>c</sub>/T)(L + h)) sono le soluzioni di Bragg-Williams, piene quelle stabili. A destra l'energia libera per sito: scendi sotto T<sub>c</sub> e guarda la scodella diventare una W; poi accendi un piccolo campo e guarda uno dei due minimi vincere.</>}
      legenda={<><Voce colore={tok("testo")}>tanh((Tc/T)(L + h))</Voce><Voce colore={tok("tenue")} tratteggio>y = L</Voce><Voce colore={tok("libera")}>energia libera f(L)</Voce></>}
      parametri={[
        { id: "t", etichetta: "temperatura T/Tc", min: 0.3, max: 1.6, step: 0.005, iniziale: 0.8, testo: v => fmt(v, 2) },
        { id: "h", etichetta: "campo esterno h (in unità di kBTc)", min: -0.3, max: 0.3, step: 0.002, iniziale: 0, testo: v => fmt(v, 3) },
      ]}
      preset={[["sopra Tc", { t: 1.3, h: 0 }], ["sotto Tc", { t: 0.8, h: 0 }], ["campo opposto", { t: 0.8, h: -0.05 }], ["T = Tc", { t: 1, h: 0 }]]}
      calcola={({ t, h }) => {
        const g = L => Math.tanh((L + h) / t), f = L => -h * L - L * L / 2 + t * entropiaMista(L);
        const radici = [], n = 800;
        let xa = -1, ya = g(-1) + 1;
        for (let k = 1; k <= n; k++) {
          const xb = -1 + 2 * k / n, yb = g(xb) - xb;
          if (ya === 0) radici.push(xa);
          else if (ya * yb < 0) radici.push(bisezione(L => g(L) - L, xa, xb, 60));
          xa = xb; ya = yb;
        }
        const stabile = L => (1 - g(L) ** 2) / t < 1;
        const migliore = radici.filter(stabile).reduce((m, L) => (m === null || f(L) < f(m) ? L : m), null);
        const fl = Array.from({ length: 201 }, (_, i) => f(Math.max(-0.999, Math.min(0.999, -1 + i * 0.01))));
        return { g, f, radici, stabile, migliore, lo: Math.min(...fl), hi: Math.max(...fl) };
      }}
      disegna={(ctx, w, h, C, v, d) => {
        const [r1, r2] = riquadri(w, h, 0.5);
        const p1 = piano(ctx, r1, { x0: -1, x1: 1, y0: -1.05, y1: 1.05, tx: [-1, 0, 1], ty: [-1, 0, 1], ex: "L", ey: "" }, C);
        p1.curva(L => L, C.tenue, 1.6, [6, 5]);
        p1.curva(d.g, C.testo, 2.4);
        d.radici.forEach(L => p1.punto(L, L, d.stabile(L) ? C.testo : C.tenue, d.stabile(L) ? 5 : 3.5));
        const span = d.hi - d.lo + 1e-9;
        const p2 = piano(ctx, r2, { x0: -1, x1: 1, y0: d.lo - 0.02 * span, y1: d.lo + 1.1 * span, tx: [-1, 0, 1], ex: "L", ey: "f(L)" }, C);
        p2.curva(d.f, C.libera, 2.6, [], -0.999, 0.999);
        if (d.migliore !== null) p2.punto(d.migliore, d.f(d.migliore), C.testo);
      }}
      letture={(v, d) => {
        const simm = Math.abs(v.h) < 1e-9 && d.radici.length === 3;
        return [["magnetizzazione di equilibrio", d.migliore === null ? "—" : (simm ? "±" : "") + fmt(simm ? Math.abs(d.migliore) : d.migliore, 3)],
          ["soluzioni dell'equazione", d.radici.length === 3 ? "3, due stabili" : String(d.radici.length)],
          ["suscettività kBTcχ a h = 0", v.t > 1.0005 ? fmt(1 / (v.t - 1), 1) : v.t < 0.9995 ? "—" : "∞"],
          ["T/Tc e h", `${fmt(v.t, 2)} e ${fmt(v.h, 3)}`]];
      }} />
  );
}

/* ---------------------------------------------------------------- gas di Fermi: unità εF = 1, g(ε) ∝ √ε */
const momentoFD = (q, m, t) => {
  const sup = Math.sqrt(Math.max(m, 0) + 40 * t + 1e-9);
  return simpson(u => { const e = u * u, x = (e - m) / t; return 2 * u * e ** q / (x > 50 ? Infinity : Math.exp(x) + 1); }, 0, sup, 1200);
};
const muFermi = t => {
  if (t < 2e-3) return 1;
  let a = -30 * t - 5, b = 1.5;
  for (let i = 0; i < 70; i++) { const c = (a + b) / 2; if (momentoFD(0.5, c, t) > 2 / 3) b = c; else a = c; }
  return (a + b) / 2;
};
export function Fermi() {
  return (
    <LabGrafico nome="fermi" titolo="Il mare di Fermi si sfuma"
      sotto={<>Il potenziale chimico μ è calcolato esattamente imponendo che il numero di particelle resti fisso, l'energia per integrazione numerica. Confronta i numeri esatti con lo sviluppo di Sommerfeld: per k<sub>B</sub>T ≲ 0,15 ε<sub>F</sub> il coefficiente giusto è 5π²/12, non 5π²/8.</>}
      legenda={<><Voce colore={tok("tenue")} tratteggio>densità degli stati g(ε) ∝ √ε</Voce><Voce colore={tok("probabilita")}>occupazione n(ε)</Voce><Voce colore={tok("particelle")}>stati occupati g(ε)n(ε)</Voce></>}
      parametri={[{ id: "t", etichetta: "temperatura kBT/εF", min: 0, max: 1.2, step: 0.002, iniziale: 0.1, testo: v => fmt(v, 3) }]}
      preset={[["T = 0", { t: 0 }], ["metallo caldo", { t: 0.05 }], ["kBT = 0,15 εF", { t: 0.15 }], ["verso il classico", { t: 1 }]]}
      calcola={({ t }) => { const m = muFermi(t); return { m, E: t < 2e-3 ? 1 : momentoFD(1.5, m, t) / 0.4 }; }}
      disegna={(ctx, w, h, C, { t }, { m }) => {
        const n = e => (t < 2e-3 ? (e < 1 ? 1 : 0) : 1 / (Math.exp(Math.min((e - m) / t, 60)) + 1));
        const p = piano(ctx, { x: 0, y: 0, w, h }, { x0: 0, x1: 2.5, y0: 0, y1: 1.7, tx: [0, 0.5, 1, 1.5, 2, 2.5], ty: [0, 0.5, 1, 1.5], ex: "ε / εF", ey: "" }, C);
        p.area(e => Math.sqrt(e) * n(e), C.a("particelle", 0.25));
        p.curva(e => Math.sqrt(e), C.tenue, 1.4, [5, 4]);
        p.curva(e => Math.sqrt(e) * n(e), C.particelle, 2);
        p.curva(n, C.probabilita, 2.4);
        p.verticale(1, C.filetto);
        if (m > 0) { p.verticale(m, C.testo, [3, 3]); p.scritta(m, 1.55, " μ", C.testo, m > 2.2 ? "right" : "left"); }
      }}
      letture={({ t }, { m, E }) => [
        ["μ/εF esatto", fmt(m, 4), "text-testo"], ["μ/εF Sommerfeld", fmt(1 - Math.PI ** 2 * t * t / 12, 4)],
        ["E/E(0) esatto", fmt(E, 4), "text-energia"], ["E/E(0) Sommerfeld, 5π²/12", fmt(1 + 5 * Math.PI ** 2 * t * t / 12, 4)],
        ["E/E(0) con 5π²/8 (dispense)", fmt(1 + 5 * Math.PI ** 2 * t * t / 8, 4)], ["kBT/εF", fmt(t, 3)],
      ]} />
  );
}

/* ---------------------------------------------------------------- gas di Bose: saturazione e condensato */
const Z32 = 2.612375348685488, Z52 = 1.341487257250917, Z12 = -1.4603545088095868;
const gBose = (nu, z) => {
  if (z <= 0) return 0;
  const a = -Math.log(z);
  if (a < 0.01) {
    if (nu === 0.5) return Math.sqrt(Math.PI / a) + Z12;
    if (nu === 1.5) return Z32 - 2 * Math.sqrt(Math.PI * a) - Z12 * a;
    return Z52 - Z32 * a + (4 / 3) * Math.sqrt(Math.PI) * a ** 1.5;
  }
  let s = 0, zk = 1;
  for (let k = 1; k < 20000; k++) { zk *= z; const d = zk / k ** nu; s += d; if (d < 1e-10) break; }
  return s;
};
const zDi = r => { if (r >= Z32) return 1; let a = 0, b = 1; for (let i = 0; i < 50; i++) { const c = (a + b) / 2; if (gBose(1.5, c) > r) b = c; else a = c; } return (a + b) / 2; };
const cvBose = t => {
  if (t <= 1) return 3.75 * Z52 / Z32 * t ** 1.5;
  const z = zDi(Z32 * t ** -1.5);
  return 3.75 * gBose(2.5, z) / gBose(1.5, z) - 2.25 * gBose(1.5, z) / gBose(0.5, z);
};
let curvaCv = null;
export function Bose() {
  return (
    <LabGrafico nome="bose" titolo="Il parcheggio pieno" doppio
      sotto={<>A sinistra la soluzione di g<sub>3/2</sub>(z) = ρλ³: raffreddando, ρλ³ sale come T<sup>−3/2</sup>. Finché incontra la curva c'è una soluzione con z &lt; 1; oltre 2,612 la soluzione non c'è più, z si blocca a 1 e l'eccesso finisce nel condensato. A destra la frazione condensata e il calore specifico, con la cuspide in T<sub>c</sub>.</>}
      legenda={<><Voce colore={tok("testo")}>g₃/₂(z)</Voce><Voce colore={tok("particelle")} tratteggio>ρλ³</Voce><Voce colore={tok("particelle")}>frazione condensata N₀/N</Voce><Voce colore={tok("energia")}>calore specifico CV/NkB</Voce></>}
      parametri={[{ id: "t", etichetta: "temperatura T/Tc", min: 0.05, max: 2.5, step: 0.005, iniziale: 1.5, testo: v => fmt(v, 2) }]}
      preset={[["gas quasi classico", { t: 2 }], ["T = Tc", { t: 1 }], ["condensato", { t: 0.5 }]]}
      calcola={({ t }) => {
        if (!curvaCv) curvaCv = Array.from({ length: 161 }, (_, i) => { const x = 0.01 + i * 2.49 / 160; return [x, cvBose(x)]; });
        const r = Z32 * t ** -1.5;
        return { r, z: zDi(r), f0: Math.max(0, 1 - t ** 1.5), cv: cvBose(t) };
      }}
      disegna={(ctx, w, h, C, { t }, { r, z, f0, cv }) => {
        const [r1, r2] = riquadri(w, h);
        const p1 = piano(ctx, r1, { x0: 0, x1: 1, y0: 0, y1: 4.2, tx: [0, 0.5, 1], ty: [0, 1, 2, 2.612, 4], ex: "z = e^βμ", ey: "" }, C);
        p1.orizzontale(Z32, C.filetto);
        p1.curva(x => gBose(1.5, x), C.testo, 2.4, [], 0, 0.9995);
        p1.orizzontale(Math.min(r, 4.2), C.particelle, [6, 4]);
        if (r <= Z32) p1.punto(z, r, C.testo);
        else {
          ctx.strokeStyle = C.particelle; ctx.lineWidth = 5; ctx.beginPath();
          ctx.moveTo(p1.X(1) - 3, p1.Y(Z32)); ctx.lineTo(p1.X(1) - 3, p1.Y(Math.min(r, 4.2))); ctx.stroke();
          p1.punto(1, Z32, C.testo);
          p1.scritta(0.97, Math.min((Z32 + Math.min(r, 4.2)) / 2, 4), "condensato ", C.particelle, "right");
        }
        const p2 = piano(ctx, r2, { x0: 0, x1: 2.5, y0: 0, y1: 2.1, tx: [0, 1, 2], ty: [0, 1, 2], ex: "T / Tc", ey: "" }, C);
        p2.orizzontale(1.5, C.filetto);
        p2.curva(x => Math.max(0, 1 - x ** 1.5), C.particelle, 2.2);
        linea(ctx, p2, curvaCv, C.energia, 2.4);
        p2.verticale(t, C.tenue);
        p2.punto(t, f0, C.particelle, 4.5); p2.punto(t, cv, C.energia, 4.5);
        p2.scritta(0.08, 1.62, "classico 3/2", C.tenue);
      }}
      letture={({ t }, { r, z, f0, cv }) => [
        ["ρλ³", fmt(r, 3)], ["fugacità z", z >= 1 ? "1" : fmt(z, 4)], ["βμ", z >= 1 ? "0" : fmt(Math.log(z), 3)],
        ["frazione condensata N₀/N", fmt(f0 * 100, 1) + " %", "text-particelle"], ["CV/NkB", fmt(cv, 3), "text-energia"], ["T/Tc", fmt(t, 2)],
      ]} />
  );
}

/* ---------------------------------------------------------------- corpo nero: Planck contro Rayleigh-Jeans */
const HP = 6.62607015e-34, KB = 1.380649e-23, CL = 2.99792458e8, SIGMA = 5.670374419e-8;
const x3 = x => (x < 1e-6 ? x * x : x ** 3 / Math.expm1(x));
export function Planck() {
  return (
    <LabGrafico nome="planck" titolo="Il biglietto d'ingresso"
      sotto="Lo spettro di Planck in lunghezza d'onda, normalizzato al suo massimo, contro la previsione classica di Rayleigh-Jeans, che esplode verso le lunghezze d'onda corte. La fascia colorata è il visibile. Scalda il corpo e guarda il massimo spostarsi secondo la legge di Wien, mentre la potenza emessa cresce come T⁴."
      legenda={<><Voce colore={tok("energia")}>densità di energia di Planck</Voce><Voce colore={tok("caldo")} tratteggio>Rayleigh-Jeans</Voce></>}
      parametri={[{ id: "lt", etichetta: "temperatura del corpo (scala logaritmica)", min: 2.5, max: 4.1, step: 0.002, iniziale: 3.763, testo: v => Math.round(10 ** v).toLocaleString("it-IT") + " K" }]}
      preset={[["corpo umano", { lt: 2.477 }], ["lampadina", { lt: 3.447 }], ["Sole", { lt: 3.763 }], ["stella blu", { lt: 4.0 }]]}
      calcola={({ lt }) => {
        const T = 10 ** lt, a = HP * CL / (KB * T);
        const lmax = HP * CL / (4.965114231744277 * KB * T) * 1e9;
        return { T, a, lmax, vis: simpson(x3, a / 750e-9, a / 380e-9) / (Math.PI ** 4 / 15) };
      }}
      disegna={(ctx, w, h, C, v, { T, a, lmax }) => {
        const u = lnm => { const l = lnm * 1e-9, x = a / l; return x > 700 ? 0 : l ** -5 / Math.expm1(x); };
        const umax = u(lmax), x1 = Math.max(2000, Math.min(20000, lmax * 4));
        const p = piano(ctx, { x: 0, y: 0, w, h }, { x0: 0, x1, y0: 0, y1: 1.15, tx: [0, x1 / 4, x1 / 2, 3 * x1 / 4, x1].map(Math.round), ty: [0, 0.5, 1], ex: "λ (nm)", ey: "" }, C);
        const g = ctx.createLinearGradient(p.X(380), 0, p.X(750), 0);
        ["#7b2cbf", "#3a86ff", "#2ec4b6", "#8ac926", "#ffca3a", "#ff7f11", "#e63946"].forEach((c, i, l) => g.addColorStop(i / (l.length - 1), c));
        ctx.save(); ctx.globalAlpha = 0.16; ctx.fillStyle = g; ctx.fillRect(p.X(380), p.Y(1.15), p.X(750) - p.X(380), p.Y(0) - p.Y(1.15)); ctx.restore();
        p.curva(l => (KB * T * (l * 1e-9) ** -4 / (HP * CL)) / umax, C.caldo, 1.8, [7, 6], lmax * 0.45, x1);
        p.area(l => (l <= 0 ? 0 : u(l) / umax), C.a("energia", 0.2));
        p.curva(l => (l <= 0 ? 0 : u(l) / umax), C.energia, 2.6);
        p.verticale(lmax, C.testo, [3, 3]);
        p.scritta(lmax, 1.08, " λmax", C.testo, lmax > 0.8 * x1 ? "right" : "left");
      }}
      letture={(v, { lmax, T, vis }) => [
        ["λmax (Wien)", Math.round(lmax).toLocaleString("it-IT") + " nm", "text-energia"], ["potenza emessa σT⁴", sci(SIGMA * T ** 4) + " W/m²"],
        ["energia nel visibile", fmt(100 * vis, 1) + " %"], ["temperatura", Math.round(T).toLocaleString("it-IT") + " K"],
      ]} />
  );
}

/* ---------------------------------------------------------------- solidi: Dulong-Petit, Einstein, Debye */
const einstein = t => { const x = 1 / t; if (x > 700) return 0; const e = Math.expm1(x); return x * x * (e + 1) / (e * e); };
const debye = t => 3 * t ** 3 * simpson(x => { if (x < 1e-6) return x * x; const e = Math.expm1(x); return x ** 4 * (e + 1) / (e * e); }, 0, Math.min(1 / t, 60), 400);
let curveSolidi = null;
const preparaSolidi = () => {
  if (curveSolidi) return curveSolidi;
  const E = [], D = [], lg = [];
  for (let i = 0; i <= 240; i++) { const t = 0.005 + i * 1.495 / 240; E.push([t, einstein(t)]); D.push([t, debye(t)]); }
  for (let i = 0; i <= 200; i++) { const t = 10 ** (-2 + 2 * i / 200); lg.push([t, einstein(t), debye(t)]); }
  return (curveSolidi = { E, D, lg });
};
export function Solidi() {
  return (
    <LabGrafico nome="solidi" titolo="Perché i solidi freddi non assorbono calore" doppio
      sotto="A sinistra il calore specifico di Einstein e di Debye, con la stessa temperatura caratteristica θ, contro il valore classico di Dulong-Petit. A destra, in scala logaritmica, la differenza vera: Einstein crolla esponenzialmente, Debye scende come T³. Le onde sonore lunghe restano attive a qualunque temperatura."
      legenda={<><Voce colore={tok("freddo")}>Einstein</Voce><Voce colore={tok("energia")}>Debye</Voce><Voce colore={tok("caldo")} tratteggio>legge T³</Voce><Voce colore={tok("tenue")} tratteggio>Dulong-Petit</Voce></>}
      parametri={[{ id: "t", etichetta: "temperatura T/θ", min: 0.01, max: 1.5, step: 0.001, iniziale: 0.1, testo: v => fmt(v, 3) }]}
      preset={[["T = θ", { t: 1 }], ["T = θ/10", { t: 0.1 }], ["molto freddo", { t: 0.03 }]]}
      calcola={({ t }) => ({ e: einstein(t), d: debye(t), curve: preparaSolidi() })}
      disegna={(ctx, w, h, C, { t }, { e, d, curve }) => {
        const [r1, r2] = riquadri(w, h);
        const p1 = piano(ctx, r1, { x0: 0, x1: 1.5, y0: 0, y1: 1.12, tx: [0, 0.5, 1, 1.5], ty: [0, 0.5, 1], ex: "T / θ", ey: "CV / 3NkB" }, C);
        p1.orizzontale(1, C.tenue, [6, 5]);
        linea(ctx, p1, curve.E, C.freddo); linea(ctx, p1, curve.D, C.energia);
        p1.verticale(t, C.tenue);
        p1.punto(t, e, C.freddo, 4.5); p1.punto(t, d, C.energia, 4.5);
        const p2 = piano(ctx, r2, { x0: -2, x1: 0, y0: -7, y1: 0.3, tx: [-2, -1, 0], ty: [-6, -4, -2, 0], ex: "log₁₀ T/θ", ey: "log₁₀ CV/3NkB" }, C);
        linea(ctx, p2, curve.lg.filter(x => x[1] > 1e-7).map(([x, ee]) => [Math.log10(x), Math.log10(ee)]), C.freddo);
        linea(ctx, p2, curve.lg.map(([x, , dd]) => [Math.log10(x), Math.log10(dd)]), C.energia);
        p2.curva(x => Math.log10(4 * Math.PI ** 4 / 5 * 10 ** (3 * x)), C.caldo, 1.4, [4, 4], -2, -0.6);
        if (t <= 1) p2.verticale(Math.log10(t), C.tenue);
      }}
      letture={({ t }, { e, d }) => [
        ["Einstein CV/3NkB", fmt(e, 4), "text-freddo"], ["Debye CV/3NkB", fmt(d, 4), "text-energia"],
        ["Debye / Einstein", e > 1e-300 ? sci(d / e) : "enorme"], ["T/θ", fmt(t, 3)],
      ]} />
  );
}

/* ---------------------------------------------------------------- probabilità: il limite centrale */
const DISTRIBUZIONI = ["uniforme", "esponenziale", "Cauchy"], CAMPIONI = 20000;
const estrai = [() => Math.random(), () => -Math.log(1 - Math.random()), () => Math.tan(Math.PI * (Math.random() - 0.5))];
const MU = [0.5, 1, 0], SIG = [Math.sqrt(1 / 12), 1, Infinity];
export function LimiteCentrale() {
  return (
    <LabGrafico nome="limite-centrale" titolo="Perché la gaussiana è ovunque"
      sotto="Ventimila somme di N variabili estratte a caso, centrate e divise per σ√N, contro la gaussiana standard. Parti da un'esponenziale, asimmetrica, e aumenta N: la forma si raddrizza in fretta. Con la Cauchy l'istogramma è quello della media Y/N e non cambia mai: la curva teorica è la Cauchy stessa, la gaussiana non arriva."
      legenda={<><Voce colore={`rgb(var(--probabilita) / .5)`}>istogramma del campione</Voce><Voce colore={tok("probabilita")}>densità teorica</Voce><Voce colore={tok("tenue")} tratteggio>gaussiana (caso Cauchy)</Voce></>}
      parametri={[
        { id: "d", etichetta: "distribuzione di partenza", min: 0, max: 2, step: 1, iniziale: 1, testo: v => DISTRIBUZIONI[v] },
        { id: "n", etichetta: "numero N di variabili sommate", min: 1, max: 64, step: 1, iniziale: 1, testo: v => String(v) },
      ]}
      preset={[["un'esponenziale", { d: 1, n: 1 }], ["trenta esponenziali", { d: 1, n: 30 }], ["tre uniformi", { d: 0, n: 3 }], ["cinquanta Cauchy", { d: 2, n: 50 }]]}
      calcola={({ d, n }) => {
        const c = new Float64Array(CAMPIONI);
        for (let m = 0; m < CAMPIONI; m++) {
          let s = 0; for (let i = 0; i < n; i++) s += estrai[d]();
          c[m] = d === 2 ? s / n : (s - n * MU[d]) / (SIG[d] * Math.sqrt(n));
        }
        const x0 = -5, nb = 60, hb = 10 / nb, conta = new Array(nb).fill(0);
        let dentro = 0, s2 = 0, nn = 0;
        for (const v of c) { if (v >= x0 && v < 5) conta[Math.floor((v - x0) / hb)]++; if (Math.abs(v) < 1) dentro++; if (Math.abs(v) < 50) { s2 += v * v; nn++; } }
        return { dens: conta.map(k => k / (CAMPIONI * hb)), hb, dentro: dentro / CAMPIONI, varianza: s2 / nn };
      }}
      disegna={(ctx, w, h, C, { d }, { dens, hb }) => {
        const teoria = d === 2 ? x => 1 / (Math.PI * (1 + x * x)) : x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
        const cima = Math.max(0.45, ...dens) * 1.1;
        const p = piano(ctx, { x: 0, y: 0, w, h }, { x0: -5, x1: 5, y0: 0, y1: cima, tx: [-4, -2, 0, 2, 4], ty: [0, 0.2, 0.4], ex: d === 2 ? "media Y/N" : "somma standardizzata", ey: "densità" }, C);
        ctx.fillStyle = C.a("probabilita", 0.4);
        dens.forEach((v, i) => { const xa = p.X(-5 + i * hb) + 0.5, xb = p.X(-5 + (i + 1) * hb) - 0.5; ctx.fillRect(xa, p.Y(v), xb - xa, p.Y(0) - p.Y(v)); });
        p.curva(teoria, C.probabilita, 2.6);
        if (d === 2) p.curva(x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI), C.tenue, 1.4, [6, 5]);
      }}
      letture={({ d }, { dentro, varianza }) => [
        ["frazione entro ±1", fmt(100 * dentro, 1) + " %", "text-probabilita"], ["valore teorico", d === 2 ? "50,0 %" : "68,3 %"],
        ["varianza del campione", d === 2 ? "infinita" : fmt(varianza, 3)], ["campioni", CAMPIONI.toLocaleString("it-IT")],
      ]} />
  );
}

/* ---------------------------------------------------------------- termodinamica: la trasformata di Legendre */
export function Legendre() {
  return (
    <LabGrafico nome="legendre" titolo="La stessa curva, descritta con le tangenti" doppio
      sotto="A sinistra y = eˣ con la tangente nel punto scelto: la sua intercetta con l'asse verticale è ψ. A destra ψ(p) = p − p ln p, una nuova funzione della sola pendenza, come l'energia libera è funzione della temperatura invece che dell'entropia. La sua tangente ha pendenza −x: le due descrizioni si muovono insieme, senza perdere informazione."
      legenda={<><Voce colore={tok("energia")}>y(x) = eˣ</Voce><Voce colore={tok("libera")}>ψ(p) = p − p ln p</Voce><Voce colore={tok("tenue")} tratteggio>tangenti</Voce></>}
      parametri={[{ id: "x", etichetta: "punto x sulla curva", min: -2, max: 1.5, step: 0.01, iniziale: 0.5, testo: v => fmt(v, 2) }]}
      calcola={({ x }) => { const y = Math.exp(x); return { y, p: y, psi: y - y * x }; }}
      disegna={(ctx, w, h, C, { x }, { y, p, psi }) => {
        const [r1, r2] = riquadri(w, h, 0.5);
        const p1 = piano(ctx, r1, { x0: -2.5, x1: 1.6, y0: -1.5, y1: 5, tx: [-2, -1, 0, 1], ty: [0, 2, 4], ex: "x", ey: "y" }, C);
        p1.verticale(0, C.filetto, []);
        p1.curva(Math.exp, C.energia, 2.6);
        p1.curva(q => y + p * (q - x), C.tenue, 1.6, [6, 5]);
        p1.punto(x, y, C.testo); p1.punto(0, psi, C.libera, 5.5);
        p1.scritta(0.08, psi - 0.45, "intercetta ψ", C.libera);
        const p2 = piano(ctx, r2, { x0: 0, x1: 5, y0: -3.2, y1: 1.4, tx: [0, 1, 2, 3, 4, 5], ty: [-3, -2, -1, 0, 1], ex: "p = pendenza", ey: "ψ" }, C);
        p2.orizzontale(0, C.filetto, []);
        p2.curva(q => (q <= 0 ? 0 : q - q * Math.log(q)), C.libera, 2.6, [], 0.001, 5);
        p2.curva(q => psi - x * (q - p), C.tenue, 1.4, [6, 5], 0.001, 5);
        p2.punto(p, psi, C.testo);
      }}
      letture={({ x }, { y, p, psi }) => [
        ["y(x)", fmt(y, 3), "text-energia"], ["pendenza p = y′(x)", fmt(p, 3)],
        ["intercetta ψ = y − px", fmt(psi, 3), "text-libera"], ["−dψ/dp, che ridà x", fmt(-Math.log(p), 2)],
      ]} />
  );
}

/* ---------------------------------------------------------------- spazio delle fasi: il teorema di Liouville */
const GOCCIA = Array.from({ length: 1600 }, (_, i) => { const r = 0.28 * Math.sqrt((i + 0.5) / 1600), a = i * 2.399963; return [1.0 + r * Math.cos(a), 0.9 * r * Math.sin(a), r / 0.28]; });
const avvolgi = th => th - 2 * Math.PI * Math.floor((th + Math.PI) / (2 * Math.PI));
export function Liouville() {
  return (
    <LabGrafico nome="liouville" titolo="L'inchiostro nell'acqua"
      sotto="Milleseicento condizioni iniziali vicine di un pendolo, colorate dal centro al bordo, evolvono con le equazioni di Hamilton tra le curve di energia costante. La goccia si stira in un filamento sempre più lungo e sottile, ma la sua area resta la stessa: è il teorema di Liouville. Con l'attrito il sistema non è più hamiltoniano e la goccia si restringe fino al punto di riposo."
      legenda={<><Voce colore={tok("filetto")}>curve di energia costante</Voce><Voce colore={tok("tenue")} tratteggio>separatrice</Voce></>}
      parametri={[
        { id: "t", etichetta: "tempo trascorso", min: 0, max: 40, step: 0.1, iniziale: 0, testo: v => fmt(v, 1) },
        { id: "g", etichetta: "attrito γ", min: 0, max: 0.3, step: 0.01, iniziale: 0, testo: v => fmt(v, 2) },
      ]}
      preset={[["poco dopo", { t: 6, g: 0 }], ["molto dopo", { t: 40, g: 0 }], ["con attrito", { t: 20, g: 0.15 }]]}
      calcola={({ t, g }) => {
        const dt = 0.02, passi = Math.round(t / dt), sm = Math.exp(-g * dt / 2);
        return GOCCIA.map(([th0, p0, c]) => {
          let th = th0, pp = p0;
          for (let s = 0; s < passi; s++) { pp *= sm; pp -= 0.5 * dt * Math.sin(th); th += dt * pp; pp -= 0.5 * dt * Math.sin(th); pp *= sm; }
          return [avvolgi(th), pp, c];
        });
      }}
      disegna={(ctx, w, h, C, v, punti) => {
        const p = piano(ctx, { x: 0, y: 0, w, h }, { x0: -Math.PI, x1: Math.PI, y0: -2.6, y1: 2.6, tx: [-3, -2, -1, 0, 1, 2, 3], ty: [-2, -1, 0, 1, 2], ex: "angolo θ", ey: "impulso p" }, C);
        [-0.6, 0, 0.5, 1, 1.6].forEach(E => {
          const f = th => 2 * (E + Math.cos(th)), sep = E === 1;
          p.curva(th => (f(th) >= 0 ? Math.sqrt(f(th)) : NaN), sep ? C.tenue : C.filetto, sep ? 1.4 : 1, sep ? [5, 4] : []);
          p.curva(th => (f(th) >= 0 ? -Math.sqrt(f(th)) : NaN), sep ? C.tenue : C.filetto, sep ? 1.4 : 1, sep ? [5, 4] : []);
        });
        for (const [th, pp, c] of punti) { ctx.fillStyle = C.termico(c); ctx.fillRect(p.X(th) - 1, p.Y(pp) - 1, 2.2, 2.2); }
      }}
      letture={({ t, g }) => [["area della goccia, rispetto all'inizio", fmt(100 * Math.exp(-g * t), 1) + " %"], ["tempo e attrito", `${fmt(t, 1)} e ${fmt(g, 2)}`]]} />
  );
}
