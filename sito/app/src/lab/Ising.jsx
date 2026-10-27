import { useEffect, useRef, useState } from "react";
import { fmt } from "../base.js";
import { Cornice, Cursore, GiocaPausa, Lettura, Pulsante, Voce, useTela } from "./strumenti.jsx";

/* Ising 2D con l'algoritmo di Metropolis, 128 × 128 spin con bordi periodici.
   Fisica: due mezzi passi a scacchiera per fotogramma; ΔE = 2s·(somma dei vicini) in unità di J, T in J/kB.
   Pedagogia: sotto Tc crescono i domini, sopra il reticolo torna rumore; partendo da «Tutti su» la
   magnetizzazione segue la curva esatta di Onsager, |m| = (1 − sinh⁻⁴(2/T))^{1/8}.
   Colori: spin su in arancio, spin giù in ardesia, come nel film. */
const L = 128, TC = 2 / Math.log(1 + Math.SQRT2);
const onsager = T => (T < TC ? Math.pow(1 - Math.pow(Math.sinh(2 / T), -4), 0.125) : 0);

export default function Ising() {
  const S = useRef(null);
  if (!S.current) S.current = Int8Array.from({ length: L * L }, () => (Math.random() < 0.5 ? 1 : -1));
  const passi = useRef(0);
  const [T, setT] = useState(2.27);
  const Tref = useRef(T);
  Tref.current = T;
  const [pausa, setPausa] = useState(false);
  const pausaRef = useRef(pausa);
  pausaRef.current = pausa;
  const [letture, setLetture] = useState({ m: 0, e: 0, passi: 0 });
  const off = useRef(null);

  function sweep() {
    const s = S.current, t = Tref.current, w4 = Math.exp(-4 / t), w8 = Math.exp(-8 / t);
    for (let par = 0; par < 2; par++) for (let y = 0; y < L; y++) {
      const su = ((y + L - 1) % L) * L, giu = ((y + 1) % L) * L, riga = y * L;
      for (let x = (y + par) & 1; x < L; x += 2) {
        const i = riga + x, si = s[i];
        const dE = 2 * si * (s[riga + (x + 1) % L] + s[riga + (x + L - 1) % L] + s[su + x] + s[giu + x]);
        if (dE <= 0 || (dE === 4 ? Math.random() < w4 : Math.random() < w8)) s[i] = -si;
      }
    }
    passi.current++;
  }

  const tela = useTela((ctx, w, h, C, dt) => {
    if (dt > 0 && !pausaRef.current) { sweep(); sweep(); }
    if (!off.current) { off.current = document.createElement("canvas"); off.current.width = off.current.height = L; }
    const o = off.current.getContext("2d"), img = o.createImageData(L, L), s = S.current;
    const su = C.canali.caldo, giu = C.canali.superficie.map((v, k) => Math.round((v + C.canali.filetto[k]) / 2));
    for (let i = 0; i < L * L; i++) {
      const c = s[i] > 0 ? su : giu, q = i * 4;
      img.data[q] = c[0]; img.data[q + 1] = c[1]; img.data[q + 2] = c[2]; img.data[q + 3] = 255;
    }
    o.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(off.current, 0, 0, w, h);
  }, [], { anima: true });

  // letture dal vivo, quattro volte al secondo
  useEffect(() => {
    const id = setInterval(() => {
      const s = S.current;
      let m = 0, e = 0;
      for (let y = 0; y < L; y++) for (let x = 0; x < L; x++) {
        const i = y * L + x;
        m += s[i]; e -= s[i] * (s[y * L + (x + 1) % L] + s[((y + 1) % L) * L + x]);
      }
      setLetture({ m: Math.abs(m) / (L * L), e: e / (L * L), passi: passi.current });
    }, 250);
    return () => clearInterval(id);
  }, []);

  const fase = Math.abs(T - TC) < 0.08 ? "vicino al punto critico" : T < TC ? "fase ordinata, T < Tc" : "fase disordinata, T > Tc";
  return (
    <Cornice titolo="Ising con il termostato in mano"
      sotto="128 × 128 spin, algoritmo di Metropolis. Sotto Tc crescono i domini; sopra, il reticolo torna rumore. Partendo da «Tutti su» la magnetizzazione segue la curva esatta di Onsager."
      legenda={<><Voce colore="rgb(var(--caldo))">spin su</Voce><Voce colore="rgb(var(--filetto))">spin giù</Voce></>}
      letture={<>
        <Lettura nome="|m| simulata" valore={fmt(letture.m, 3)} colore="text-caldo" />
        <Lettura nome="|m| di Onsager" valore={fmt(onsager(T), 3)} />
        <Lettura nome="energia per spin (J)" valore={fmt(letture.e, 3)} colore="text-energia" />
        <Lettura nome="passi Monte Carlo" valore={letture.passi.toLocaleString("it-IT")} />
      </>}
      comandi={<>
        <Cursore id="ising-T" etichetta={`temperatura kBT/J, ${fase}`} valore={T} testo={fmt(T, 2)} min={1} max={4} step={0.01} onChange={setT} />
        <div className="flex flex-wrap gap-2">
          <GiocaPausa inPausa={pausa} onClick={() => setPausa(p => !p)} />
          <Pulsante onClick={() => { S.current.forEach((_, i) => (S.current[i] = Math.random() < 0.5 ? 1 : -1)); passi.current = 0; }}>Spin casuali</Pulsante>
          <Pulsante onClick={() => { S.current.fill(1); passi.current = 0; }}>Tutti su</Pulsante>
          <Pulsante onClick={() => setT(Math.round(TC * 100) / 100)} attivo={Math.abs(T - TC) < 0.006}>Vai a Tc</Pulsante>
        </div>
      </>}>
      <canvas ref={tela} className="mx-auto aspect-square w-full max-w-[460px] rounded-piccolo" aria-label="Reticolo di Ising: arancio spin su, scuro spin giù" />
    </Cornice>
  );
}
