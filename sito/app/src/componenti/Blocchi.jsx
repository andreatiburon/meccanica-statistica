import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo, useState } from "react";
import { useApp } from "../App.jsx";
import { memoria } from "../base.js";
import LABORATORI from "../lab/index.js";
import { useLezione } from "./contesto.js";
import Film from "./Film.jsx";
import { Avanti, Film as IconaFilm, Giu, Indietro, Lab as IconaLab, Spunta } from "./icone.jsx";

/* Rende la lista di blocchi di una sezione. I blocchi vengono da scripts/contenuti.py:
   html · idea · attenzione · passaggi · domanda · esercizio · lab · film. Le domande consecutive diventano un mazzo. */
export default function Blocchi({ blocchi, dentro = false }) {
  const gruppi = useMemo(() => {
    const out = [];
    for (const b of blocchi) {
      if (b.t === "domanda" && out.at(-1)?.t === "mazzo") out.at(-1).domande.push(b);
      else if (b.t === "domanda") out.push({ t: "mazzo", domande: [b] });
      else out.push(b);
    }
    return out;
  }, [blocchi]);
  return (
    <div className={`grid gap-[1.1em] ${dentro ? "" : "min-w-0"}`}>
      {gruppi.map((b, k) => <Blocco key={k} b={b} />)}
    </div>
  );
}

const Blocco = memo(function Blocco({ b }) {
  switch (b.t) {
    case "html": return <Prosa html={b.html} />;
    case "idea": return <Riquadro tipo="idea" blocchi={b.blocchi} />;
    case "attenzione": return <Riquadro tipo="attenzione" blocchi={b.blocchi} />;
    case "passaggi": return <Passaggi titolo={b.titolo} blocchi={b.blocchi} />;
    case "mazzo": return <Mazzo domande={b.domande} />;
    case "esercizio": return <Esercizio b={b} />;
    case "lab": return <PostoLab nome={b.nome} />;
    case "film": return <PostoFilm nome={b.nome} />;
    default: return null;
  }
});

export const Prosa = memo(function Prosa({ html, className = "" }) {
  return <div className={`prosa ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
});

function Etichetta({ children, className = "" }) {
  return <p className={`etichetta-mano m-0 font-ui text-[0.84rem] font-semibold ${className}`}>{children}</p>;
}

/* L'intuizione e le trappole: due riquadri con un ruolo fisso, riconoscibili a colpo d'occhio. */
function Riquadro({ tipo, blocchi }) {
  const idea = tipo === "idea";
  return (
    <aside className={`${idea ? "blocco-idea border-idea/30 bg-idea/[0.07]" : "border-attenzione/40 bg-attenzione/[0.06]"}
      grid gap-2 rounded-bozza border px-5 py-4`}>
      <Etichetta className={idea ? "text-idea" : "text-attenzione"}>{idea ? "L'idea, in parole semplici" : "Attenzione"}</Etichetta>
      <Blocchi blocchi={blocchi} dentro />
    </aside>
  );
}

/* I conti completi: chiusi, si aprono con un tocco. Restano fuori dalla lavagna (data-lavagna-no). */
function Passaggi({ titolo, blocchi }) {
  const [aperto, setAperto] = useState(false);
  return (
    <section data-lavagna-no className={`rounded-bozza border transition-colors ${aperto ? "border-accento/40 bg-superficie/70" : "border-filetto bg-superficie/40"}`}>
      <button type="button" onClick={() => setAperto(a => !a)} aria-expanded={aperto}
        className="flex min-h-[56px] w-full items-center gap-3 px-5 py-3 text-left font-ui">
        <span className="etichetta-mano text-[0.84rem] font-semibold text-accento">Passaggi</span>
        <span className="min-w-0 flex-1 text-[0.95rem] font-medium leading-snug text-testo">{titolo}</span>
        <motion.span animate={{ rotate: aperto ? 180 : 0 }} className="text-tenue"><Giu size={18} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {aperto && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ height: { type: "spring", stiffness: 260, damping: 32 }, opacity: { duration: 0.2 } }} className="overflow-hidden">
            <div className="border-t border-filetto/70 px-5 pb-5 pt-4"><Blocchi blocchi={blocchi} dentro /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* «Mettiti alla prova» come mazzo di schede: rispondi a voce, poi gira la scheda. Si scorre anche con il dito. */
function Mazzo({ domande }) {
  const { slug } = useLezione();
  const chiave = `prova:${slug}`;
  const [k, setK] = useState(0);
  const [girata, setGirata] = useState(false);
  const [voti, setVoti] = useState(() => memoria.leggi(chiave, {}));
  const [verso, setVerso] = useState(1);
  const n = domande.length;
  const vai = d => { const j = Math.max(0, Math.min(n - 1, k + d)); if (j === k) return; setVerso(d); setK(j); setGirata(false); };
  const vota = v => { const nuovi = { ...voti, [k]: v }; setVoti(nuovi); memoria.scrivi(chiave, nuovi); if (k + 1 < n) vai(1); };
  const d = domande[k];
  const sapute = Object.values(voti).filter(v => v === "si").length;
  return (
    <div data-lavagna-no className="grid gap-3 font-ui">
      <div className="flex items-center gap-3">
        <span className="tabulare text-[0.8rem] text-tenue">Domanda {k + 1} di {n}</span>
        <div className="flex flex-1 gap-1.5" role="tablist" aria-label="Domande">
          {domande.map((_, j) => (
            <button key={j} type="button" role="tab" aria-selected={j === k} aria-label={`Domanda ${j + 1}`}
              onClick={() => vai(j - k)} className="grid h-8 flex-1 place-items-center">
              <span className={`block h-1.5 w-full rounded-full transition-colors ${j === k ? "bg-accento" : voti[j] === "si" ? "bg-probabilita/70" : voti[j] === "no" ? "bg-caldo/70" : "bg-testo/15"}`} />
            </button>
          ))}
        </div>
        <span className="tabulare text-[0.8rem] text-tenue">{sapute}/{n} sapute</span>
      </div>
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false} custom={verso}>
          <motion.article key={k} custom={verso}
            variants={{ entra: v => ({ opacity: 0, x: 40 * v }), qui: { opacity: 1, x: 0 }, esce: v => ({ opacity: 0, x: -40 * v }) }}
            initial="entra" animate="qui" exit="esce" transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x" dragDirectionLock dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
            onDragEnd={(_, info) => { if (info.offset.x < -70) vai(1); else if (info.offset.x > 70) vai(-1); }}
            className="grid gap-4 rounded-bozza border border-filetto bg-superficie p-5 shadow-lg shadow-black/10">
            <div className="font-testo text-[1.08rem] leading-relaxed text-testo"><Blocchi blocchi={d.blocchi} dentro /></div>
            <AnimatePresence initial={false}>
              {girata && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="border-t border-filetto/70 pt-4 font-testo">
                    <Etichetta className="mb-2 text-probabilita">Risposta</Etichetta>
                    <Blocchi blocchi={d.risposta} dentro />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-wrap items-center gap-2">
              {!girata ? (
                <button type="button" onClick={() => setGirata(true)}
                  className="h-11 rounded-full bg-accento px-5 text-[0.9rem] font-semibold text-fondo">Mostra la risposta</button>
              ) : (
                <>
                  <button type="button" onClick={() => vota("si")}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-probabilita/50 bg-probabilita/10 px-4 text-[0.88rem] font-medium text-probabilita">
                    <Spunta size={16} />La sapevo
                  </button>
                  <button type="button" onClick={() => vota("no")}
                    className="h-11 rounded-full border border-caldo/50 bg-caldo/10 px-4 text-[0.88rem] font-medium text-caldo">Da ripassare</button>
                </>
              )}
              <span className="ml-auto flex gap-2">
                <button type="button" onClick={() => vai(-1)} disabled={k === 0} aria-label="Domanda precedente"
                  className="grid h-11 w-11 place-items-center rounded-full border border-filetto text-testo-2 disabled:opacity-35"><Indietro size={18} /></button>
                <button type="button" onClick={() => vai(1)} disabled={k === n - 1} aria-label="Domanda successiva"
                  className="grid h-11 w-11 place-items-center rounded-full border border-filetto text-testo-2 disabled:opacity-35"><Avanti size={18} /></button>
              </span>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Esercizio svolto: la soluzione si scopre un passo alla volta, come alla lavagna. */
function Esercizio({ b }) {
  const passi = useMemo(() => {
    const out = [];
    for (const x of b.soluzione) {
      if (x.t !== "html") { out.push(x); continue; }
      const tpl = document.createElement("template");
      tpl.innerHTML = x.html;
      for (const el of tpl.content.children) out.push({ t: "html", html: el.outerHTML });
    }
    return out;
  }, [b.soluzione]);
  const [visti, setVisti] = useState(0);
  return (
    <section data-lavagna-no className="grid gap-4 rounded-bozza border border-filetto bg-superficie/60 p-5">
      <Etichetta className="text-entropia">Esercizio svolto</Etichetta>
      <Blocchi blocchi={b.blocchi} dentro />
      <div className="grid gap-[1em] border-t border-filetto/70 pt-4">
        <AnimatePresence initial={false}>
          {passi.slice(0, visti).map((p, k) => (
            <motion.div key={k} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
              <Blocchi blocchi={[p]} dentro />
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex flex-wrap items-center gap-2 font-ui">
          {visti < passi.length ? (
            <>
              <button type="button" onClick={() => setVisti(v => v + 1)}
                className="h-11 rounded-full bg-accento px-5 text-[0.9rem] font-semibold text-fondo">
                {visti === 0 ? "Comincia la soluzione" : "Passo successivo"}
              </button>
              <button type="button" onClick={() => setVisti(passi.length)}
                className="h-11 rounded-full px-4 text-[0.88rem] text-testo-2 hover:bg-testo/5">Mostra tutto</button>
            </>
          ) : (
            <button type="button" onClick={() => setVisti(0)} className="h-11 rounded-full px-4 text-[0.88rem] text-testo-2 hover:bg-testo/5">Richiudi la soluzione</button>
          )}
          <span className="tabulare ml-auto text-[0.8rem] text-tenue">{visti} / {passi.length} passi</span>
        </div>
      </div>
    </section>
  );
}

/* Film e laboratori: sull'iPad orizzontale vivono nel banco a destra, qui resta un segnaposto che lo richiama;
   in verticale si aprono direttamente nel testo. */
function Segnaposto({ icona, etichetta, titolo, sotto, azione, onClick }) {
  return (
    <button type="button" onClick={onClick} disabled={!onClick}
      className="group flex w-full items-center gap-4 rounded-bozza border border-dashed border-accento/45 bg-accento/[0.06] px-5 py-4 text-left font-ui transition-colors enabled:hover:bg-accento/10">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accento/15 text-accento">{icona}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.84rem] font-semibold text-accento">{etichetta}</span>
        <span className="block font-display text-[1.05rem] leading-snug text-testo">{titolo}</span>
        {sotto && <span className="block text-[0.82rem] text-testo-2">{sotto}</span>}
      </span>
      {azione && <span className="hidden shrink-0 text-[0.84rem] font-medium text-testo-2 sm:block">{azione}</span>}
    </button>
  );
}

function PostoFilm({ nome }) {
  const { indice } = useApp();
  const { largo, mostra } = useLezione();
  const info = indice.film[nome];
  if (!info) return null;
  if (largo) return <Segnaposto icona={<IconaFilm />} etichetta="Film" titolo={info.titolo} sotto={`${info.passi.length} passi, ${Math.round(info.durata)} secondi`} azione="Apri nel banco" onClick={() => mostra(`film:${nome}`)} />;
  return <Film nome={nome} />;
}

function PostoLab({ nome }) {
  const { indice } = useApp();
  const { largo, mostra } = useLezione();
  const info = indice.lab[nome] ?? { titolo: nome };
  const Vivo = LABORATORI[nome];
  if (!Vivo) return <Segnaposto icona={<IconaLab />} etichetta="Laboratorio ancora da rifare" titolo={info.titolo} sotto={info.sottotitolo} />;
  if (largo) return <Segnaposto icona={<IconaLab />} etichetta="Laboratorio" titolo={info.titolo} sotto={info.sottotitolo} azione="Apri nel banco" onClick={() => mostra(`lab:${nome}`)} />;
  return <Vivo />;
}
