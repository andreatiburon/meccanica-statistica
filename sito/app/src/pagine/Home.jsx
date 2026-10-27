import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useApp } from "../App.jsx";
import { carica, fmt, memoria } from "../base.js";
import Barra from "../componenti/Barra.jsx";
import { Prosa } from "../componenti/Blocchi.jsx";
import { Avanti, Film as IconaFilm, Gioca, Lab as IconaLab } from "../componenti/icone.jsx";
import Titolo from "../componenti/Titolo.jsx";
import LABORATORI from "../lab/index.js";

const gutter = { paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" };
const durata = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

export default function Home() {
  const { indice, apri, apriFilm } = useApp();
  const [T, setT] = useState(0.08);
  const ultimo = memoria.leggi("ultimo", null);
  const lezUltima = ultimo && indice.percorso.find(l => l.slug === ultimo.slug);
  const film = Object.entries(indice.film).filter(([, f]) => f.slug)
    .sort((a, b) => ordine(indice, a[1]) - ordine(indice, b[1]));
  const fase = T < 0.45 ? "condensate nelle lettere" : T < 0.9 ? "le lettere si sciolgono" : "gas: le lettere sono evaporate";

  return (
    <>
      <Barra />
      <div className="mx-auto max-w-[1240px] pb-24" style={gutter}>
        {/* copertina: il titolo è un gas, la temperatura la decide chi legge */}
        <section className="grid gap-6 pb-14 pt-10 largo:pt-14">
          <h1 className="sr-only">Meccanica Statistica</h1>
          <Titolo T={T} className="h-[clamp(190px,34vw,380px)]" />
          <div className="grid items-end gap-6 largo:grid-cols-[minmax(0,1fr)_420px]">
            <p className="m-0 max-w-[60ch] font-testo text-[1.15rem] italic leading-relaxed text-testo-2">
              Ogni punto del titolo è una particella. A bassa temperatura le particelle restano nelle lettere; scaldale e diventano un gas.
              Queste pagine spiegano come da miliardi di particelle escano poche grandezze termodinamiche: dal postulato di uguale
              probabilità all'insieme canonico, fino ai gas quantistici e al corpo nero.
            </p>
            <div className="grid gap-1 rounded-bozza border border-filetto/80 bg-superficie/70 p-4 font-ui backdrop-blur">
              <label htmlFor="home-T" className="flex items-baseline justify-between text-[0.84rem] text-testo-2">
                <span>Temperatura del titolo</span>
                <output htmlFor="home-T" className="tabulare text-[1rem] text-caldo">{fmt(T, 2)}</output>
              </label>
              <input id="home-T" className="cursore" type="range" min="0" max="1.4" step="0.01" value={T} onChange={e => setT(+e.target.value)} />
              <p className="m-0 text-[0.82rem] text-tenue">{fase}. Tocca il titolo per scaldarlo in un punto.</p>
            </div>
          </div>
        </section>

        {lezUltima && (
          <motion.button type="button" onClick={() => apri(lezUltima.slug, ultimo.sezione)} whileTap={{ scale: 0.99 }}
            onPointerDown={() => carica(lezUltima.slug).catch(() => {})}
            className="mb-14 flex w-full items-center gap-4 rounded-bozza border border-accento/40 bg-accento/[0.07] p-5 text-left font-ui transition-colors hover:bg-accento/10">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accento text-fondo"><Gioca size={18} /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.84rem] font-semibold text-accento">Riprendi da dove eri</span>
              <span className="block truncate font-display text-[1.25rem] text-testo">{lezUltima.numero}. {lezUltima.breve}</span>
              <span className="block truncate text-[0.86rem] text-testo-2" dangerouslySetInnerHTML={{ __html: lezUltima.sezioni.find(s => s.id === ultimo.sezione)?.titolo ?? "" }} />
            </span>
            <Avanti className="shrink-0 text-accento" />
          </motion.button>
        )}

        <Titoletto titolo="Percorso" sotto="Dieci lezioni nell'ordine del corso. Ognuna si studia da sola: idea in breve, conti completi, film, laboratori e domande per ripassare." />
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {indice.percorso.map(l => (
            <li key={l.slug}>
              <Scheda l={l} apri={apri} />
            </li>
          ))}
        </ol>

        <Titoletto titolo="Cineteca" sotto={`${film.length} film Manim che si fermano a ogni passo. Toccane uno per guardarlo in grande.`} />
        <div className="scorri-x -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
          {film.map(([nome, f]) => (
            <motion.button key={nome} type="button" onClick={() => apriFilm(nome)} whileTap={{ scale: 0.98 }}
              className="group grid w-[280px] shrink-0 snap-start gap-2 text-left font-ui">
              <span className="relative block aspect-video overflow-hidden rounded-bozza-sm border border-filetto/70 bg-[#0B1020]">
                <img src={`video/${nome}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[0.72rem] tabulare text-white">{durata(f.durata)}</span>
              </span>
              <span className="text-[0.92rem] font-medium leading-snug text-testo">{f.titolo}</span>
              <span className="text-[0.78rem] text-tenue">{indice.percorso.find(l => l.slug === f.slug)?.breve}, {f.passi.length} passi</span>
            </motion.button>
          ))}
        </div>

        <Titoletto titolo="Laboratori" sotto="Simulazioni da manovrare: prima prevedi, poi muovi i comandi e controlla. Nel prototipo ne sono già stati rifatti due." />
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 largo:grid-cols-3">
          {Object.entries(indice.lab).filter(([, x]) => x.slug).sort((a, b) => ordine(indice, a[1]) - ordine(indice, b[1])).map(([nome, x]) => {
            const pronto = !!LABORATORI[nome];
            return (
              <li key={nome}>
                <button type="button" disabled={!pronto} onClick={() => apri(x.slug, x.sezione)}
                  className={`flex h-full w-full items-start gap-3 rounded-bozza border p-4 text-left font-ui transition-colors
                    ${pronto ? "border-accento/45 bg-accento/[0.06] hover:bg-accento/10" : "border-filetto/60 opacity-60"}`}>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${pronto ? "bg-accento/15 text-accento" : "bg-testo/5 text-tenue"}`}><IconaLab size={18} /></span>
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-medium leading-snug text-testo">{x.titolo}</span>
                    <span className="block text-[0.8rem] text-testo-2">{x.sottotitolo}</span>
                    <span className="mt-1 block text-[0.74rem] text-tenue">{indice.percorso.find(l => l.slug === x.slug)?.breve}{pronto ? "" : ", ancora da rifare"}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <Titoletto titolo="Fonti" sotto="Da dove viene il materiale: le lezioni del corso, gli appunti dell'anno scorso, le dispense e i compiti d'esame." />
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
          {indice.fonti.map(f => (
            <li key={f.slug}>
              <button type="button" onClick={() => apri(f.slug)}
                className="grid h-full w-full gap-1 rounded-bozza border border-filetto/80 bg-superficie/50 p-4 text-left font-ui transition-colors hover:border-accento/50">
                <span className="font-display text-[1.1rem] text-testo">{f.breve}</span>
                <span className="text-[0.82rem] leading-snug text-testo-2 [&_.katex]:text-[1em]" dangerouslySetInnerHTML={{ __html: f.descrizione }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const ordine = (indice, x) => { const k = indice.percorso.findIndex(l => l.slug === x.slug); return (k < 0 ? 99 : k) * 100 + (x.sezione ? 1 : 0); };

function Titoletto({ titolo, sotto }) {
  return (
    <div className="mb-6 mt-20 grid gap-2">
      <h2 className="m-0 font-display text-[clamp(2rem,4vw,2.6rem)] font-medium leading-tight text-testo">{titolo}</h2>
      <p className="m-0 max-w-[62ch] font-ui text-[0.95rem] leading-relaxed text-testo-2">{sotto}</p>
    </div>
  );
}

/* Scheda di una lezione: copertina (il primo film, o un campione di Boltzmann), numero, titolo, descrizione, avanzamento. */
const Scheda = memo(function Scheda({ l, apri }) {
  const visti = memoria.leggi(`visti:${l.slug}`, []).length;
  const totale = l.sezioni.length;
  return (
    <motion.button type="button" onClick={() => apri(l.slug)} onPointerDown={() => carica(l.slug).catch(() => {})}
      whileTap={{ scale: 0.985 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group grid h-full w-full grid-rows-[auto_1fr] overflow-hidden rounded-bozza border border-filetto/80 bg-superficie/60 text-left font-ui transition-colors hover:border-accento/50">
      <span className="relative block aspect-[16/6] overflow-hidden bg-schermo">
        {l.film[0] ? <img src={`video/${l.film[0]}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]" />
          : <Campione seme={l.slug} />}
        <span className="absolute left-4 top-3 font-display text-[2.6rem] font-medium leading-none text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,.6)] tabulare">{l.numero}</span>
      </span>
      <span className="grid content-start gap-2 p-5">
        <span className="font-display text-[1.35rem] font-medium leading-snug text-testo">{l.breve}</span>
        <span className="line-clamp-3 text-[0.86rem] leading-relaxed text-testo-2 [&_.katex]:text-[1em]" dangerouslySetInnerHTML={{ __html: l.descrizione }} />
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.76rem] text-tenue">
          <span>Dispense {l.pagine}</span>
          {l.film.length > 0 && <span className="inline-flex items-center gap-1"><IconaFilm size={14} />{l.film.length}</span>}
          {l.lab.length > 0 && <span className="inline-flex items-center gap-1"><IconaLab size={14} />{l.lab.length}</span>}
          <span className="tabulare ml-auto">{visti ? `${visti}/${totale} sezioni lette` : `${totale} sezioni`}</span>
        </span>
        <span className="block h-1 overflow-hidden rounded-full bg-testo/10">
          <span className="block h-full rounded-full bg-probabilita transition-[width] duration-700" style={{ width: `${(visti / totale) * 100}%` }} />
        </span>
      </span>
    </motion.button>
  );
});

// copertina per le lezioni senza film: punti sparsi con densità e^{−x}, come un campione di Boltzmann
function Campione({ seme }) {
  let h = 7;
  for (const c of seme) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = () => ((h = (h * 1664525 + 1013904223) >>> 0) / 4294967296);
  const punti = Array.from({ length: 220 }, () => [Math.min(-Math.log(1 - r()) * 140, 598), r() * 220, 1 + r() * 2.2, r()]);
  return (
    <svg viewBox="0 0 600 225" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      {punti.map(([x, y, rr, t], k) => <circle key={k} cx={x} cy={y} r={rr} fill={`rgb(var(--${t < 0.5 ? "freddo" : "caldo"}) / ${0.35 + t * 0.5})`} />)}
    </svg>
  );
}
