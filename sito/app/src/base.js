// Strumenti comuni: dati, rotta, misura dello schermo, memoria locale, colori dei token.
import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";

/* ---------------------------------------------------------------- dati
   Ogni file di public/dati/ si scarica una volta sola; carica() restituisce sempre la stessa promessa. */
const cache = new Map();
export function carica(nome) {
  if (!cache.has(nome)) {
    cache.set(nome, fetch(`dati/${nome}.json`).then(r => {
      if (!r.ok) throw new Error(`dati/${nome}.json: ${r.status}`);
      return r.json();
    }).catch(e => { cache.delete(nome); throw e; }));
  }
  return cache.get(nome);
}
export function useDati(nome) {
  const [stato, setStato] = useState({ dati: null, errore: null, nome });
  useEffect(() => {
    let vivo = true;
    if (!nome) return;
    carica(nome).then(d => vivo && setStato({ dati: d, errore: null, nome }), e => vivo && setStato({ dati: null, errore: e, nome }));
    return () => { vivo = false; };
  }, [nome]);
  return stato.nome === nome ? stato : { dati: null, errore: null, nome };
}

/* ---------------------------------------------------------------- rotta
   L'Artifact passa solo un #nome semplice: #home, #<slug della lezione>. */
const leggiRotta = () => decodeURIComponent(location.hash.slice(1)) || "home";
const iscriviRotta = cb => { addEventListener("hashchange", cb); return () => removeEventListener("hashchange", cb); };
export const useRotta = () => useSyncExternalStore(iscriviRotta, leggiRotta);
export function vai(nome) {
  if (leggiRotta() !== nome) location.hash = nome === "home" ? "home" : nome;
}

/* ---------------------------------------------------------------- schermo
   «largo» è l'iPad in orizzontale (e il desktop): testo a sinistra, banco a destra. */
export function useMedia(query) {
  const iscrivi = useCallback(cb => {
    const m = matchMedia(query);
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
  }, [query]);
  return useSyncExternalStore(iscrivi, () => matchMedia(query).matches);
}
export const useLargo = () => useMedia("(min-width: 1024px)");
export const useRiduci = () => useMedia("(prefers-reduced-motion: reduce)");

/* ---------------------------------------------------------------- memoria del lettore
   Solo comodità (bozza scelta, sezioni lette, domande ripassate): la pagina funziona anche se il browser la nega. */
export const memoria = {
  leggi(chiave, base) {
    try { const v = localStorage.getItem("ms:" + chiave); return v == null ? base : JSON.parse(v); } catch { return base; }
  },
  scrivi(chiave, valore) {
    try { localStorage.setItem("ms:" + chiave, JSON.stringify(valore)); } catch { /* memoria non disponibile */ }
  },
};

/* ---------------------------------------------------------------- colori per i canvas
   I laboratori disegnano con gli stessi token del CSS, letti dal documento a ogni cambio di bozza o di tema. */
const NOMI = ["fondo", "superficie", "schermo", "filetto", "testo", "testo-2", "tenue", "accento",
  "energia", "freddo", "caldo", "termo-medio", "entropia", "probabilita", "particelle", "libera"];
export function leggiColori() {
  const st = getComputedStyle(document.documentElement);
  const c = { canali: {} };
  for (const n of NOMI) {
    const v = st.getPropertyValue("--" + n).trim().split(/\s+/).map(Number);
    c.canali[n] = v;
    c[n] = `rgb(${v.join(",")})`;
  }
  c.a = (n, alfa) => `rgba(${c.canali[n].join(",")},${alfa})`;
  // scala termica: freddo -> medio -> caldo, x in [0, 1]
  c.termico = x => {
    x = Math.max(0, Math.min(1, x));
    const [a, b, t] = x < 0.5 ? [c.canali.freddo, c.canali["termo-medio"], x * 2] : [c.canali["termo-medio"], c.canali.caldo, (x - 0.5) * 2];
    return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
  };
  c.mono = getComputedStyle(document.documentElement).getPropertyValue("--f-mono").trim();
  c.display = getComputedStyle(document.documentElement).getPropertyValue("--f-display").trim();
  return c;
}
export const Colori = createContext(null);
export const useColori = () => useContext(Colori);

export const fmt = (x, d = 2) => x.toFixed(d).replace(".", ",");
