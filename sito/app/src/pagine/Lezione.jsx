import { AnimatePresence, motion, useDragControls, useScroll, useSpring } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "../App.jsx";
import { memoria, useDati, useLargo, useRiduci, vai } from "../base.js";
import Barra, { BottoneBarra } from "../componenti/Barra.jsx";
import Blocchi, { Prosa } from "../componenti/Blocchi.jsx";
import { LezioneCtx } from "../componenti/contesto.js";
import Film from "../componenti/Film.jsx";
import { Avanti, Chiudi, Elenco, Film as IconaFilm, Formula, Giu, Indietro, Lab as IconaLab, Spunta, Su, Rete } from "../componenti/icone.jsx";
import LABORATORI from "../lab/index.js";

/* Una lezione, pensata per l'iPad 11" dentro l'Artifact.
   Orizzontale (≥ 1024 px): testo a sinistra, «banco» fisso a destra con il film, il laboratorio o la lavagna
   delle formule della sezione che stai leggendo. Verticale: una colonna, film e laboratori nel testo,
   e un dock in basso a portata di pollice con sommario, sezione precedente/successiva e lavagna. */

const media = s => s.blocchi
  .filter(b => b.t === "film" || (b.t === "lab" && LABORATORI[b.nome]))
  .map(b => `${b.t}:${b.nome}`);

export default function Lezione({ slug }) {
  const { indice, apri, apriPdf, destinazione } = useApp();
  const { dati: art } = useDati(slug);
  const largo = useLargo();
  const riduci = useRiduci();
  const lezioni = indice.percorso;
  const voce = [...lezioni, ...indice.fonti].find(l => l.slug === slug);
  const [attiva, setAttiva] = useState(null);
  const [sommario, setSommario] = useState(false);
  const [lavagna, setLavagna] = useState(false);
  const [scelta, setScelta] = useState(null);
  const [richiamo, setRichiamo] = useState(0);
  const [tutte, setTutte] = useState(() => destinazione.current?.slug === slug);
  const [visti, setVisti] = useState(() => new Set(memoria.leggi(`visti:${slug}`, [])));
  const { scrollYProgress } = useScroll();
  const avanzamento = useSpring(scrollYProgress, { stiffness: 220, damping: 34, restDelta: 0.001 });

  // le sezioni pesanti arrivano dopo la transizione d'ingresso: la pagina entra subito e fluida
  useEffect(() => {
    if (!art || tutte) return;
    const id = setTimeout(() => setTutte(true), 480);
    return () => clearTimeout(id);
  }, [art, tutte]);
  const sezioni = art ? (tutte ? art.sezioni : art.sezioni.slice(0, 2)) : [];

  // sezione attiva: l'ultima il cui titolo ha superato il 35% dell'altezza dello schermo
  useEffect(() => {
    if (!art) return;
    let raf = 0;
    const calcola = () => {
      raf = 0;
      const linea = innerHeight * 0.35;
      let id = null;
      for (const s of art.sezioni) {
        const el = document.getElementById("sez-" + s.id);
        if (el && el.getBoundingClientRect().top < linea) id = s.id;
      }
      setAttiva(id);
    };
    const su = () => { if (!raf) raf = requestAnimationFrame(calcola); };
    addEventListener("scroll", su, { passive: true });
    addEventListener("resize", su);
    calcola();
    return () => { removeEventListener("scroll", su); removeEventListener("resize", su); cancelAnimationFrame(raf); };
  }, [art, tutte]);

  // memoria del lettore: sezioni viste e punto in cui riprendere
  useEffect(() => {
    if (!attiva || !art) return;
    memoria.scrivi("ultimo", { slug, sezione: attiva });
    setVisti(v => {
      if (v.has(attiva)) return v;
      const n = new Set(v).add(attiva);
      memoria.scrivi(`visti:${slug}`, [...n]);
      return n;
    });
  }, [attiva, art, slug]);

  const vaiSezione = useCallback(id => {
    const el = document.getElementById("sez-" + id);
    if (el) el.scrollIntoView({ behavior: riduci ? "auto" : "smooth", block: "start" });
  }, [riduci]);

  // arrivo da un collegamento a una sezione precisa (cineteca, laboratori, «riprendi»)
  useEffect(() => {
    const d = destinazione.current;
    if (!art || !tutte || d?.slug !== slug) return;
    destinazione.current = null;
    requestAnimationFrame(() => {
      const el = document.getElementById("sez-" + d.sezione);
      if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 70, behavior: "instant" });
    });
  }, [art, tutte, slug, destinazione]);

  // collegamenti dentro il testo: sezioni della lezione, altre lezioni, link esterni
  const clic = e => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    const pagina = href.match(/^dispense\.html#p(\d+)$/);  // versione privata: la citazione apre la pagina nel cassetto
    if (pagina) {
      e.preventDefault();
      apriPdf(+pagina[1]);
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const id = decodeURIComponent(href.slice(1));
      if (art.sezioni.some(s => s.id === id)) vaiSezione(id);
      else if ([...lezioni, ...indice.fonti].some(l => l.slug === id)) apri(id);
      else vai("home");
    } else if (/^https?:/.test(href)) {
      a.target = "_blank"; a.rel = "noopener";
    }
  };

  const sez = art?.sezioni.find(s => s.id === attiva);
  const indiceSez = art ? art.sezioni.findIndex(s => s.id === attiva) : -1;
  const sposta = d => {
    if (!art) return;
    const j = Math.max(0, Math.min(art.sezioni.length - 1, indiceSez + d));
    vaiSezione(art.sezioni[j].id);
  };
  const mostra = useCallback(chiave => {
    const dove = art?.sezioni.find(s => media(s).includes(chiave));
    setScelta({ chiave, sezioni: [attiva, dove?.id] });
    setRichiamo(r => r + 1);
    if (!largo) setLavagna(true);
  }, [art, attiva, largo]);
  const ctx = useMemo(() => ({ largo, mostra, slug }), [largo, mostra, slug]);

  const conteggi = useMemo(() => {
    if (!art) return [];
    const tutti = art.sezioni.flatMap(s => s.blocchi);
    const n = t => tutti.filter(b => b.t === t).length;
    return [
      [art.sezioni.length, "sezioni"], [n("film") + (art.film_testa ? 1 : 0), "film"], [n("lab"), "laboratori"],
      [n("passaggi"), "conti passo per passo"], [n("esercizio"), "esercizi svolti"], [n("domanda"), "domande"],
    ].filter(([k]) => k > 0);
  }, [art]);

  const pos = lezioni.findIndex(l => l.slug === slug);
  const prec = pos > 0 ? lezioni[pos - 1] : null, succ = pos >= 0 && pos + 1 < lezioni.length ? lezioni[pos + 1] : null;

  return (
    <LezioneCtx.Provider value={ctx}>
      <Barra avanzamento={avanzamento}
        centro={
          <AnimatePresence mode="wait" initial={false}>
            {sez && (
              <motion.p key={sez.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
                className="m-0 hidden truncate text-[0.86rem] text-testo-2 md:block">
                <span className="text-tenue">{voce?.breve}</span>
                <span className="mx-2 text-filetto">/</span>
                <span className="tabulare text-tenue">{indiceSez + 1}.</span> <span dangerouslySetInnerHTML={{ __html: sez.titolo }} />
              </motion.p>
            )}
          </AnimatePresence>
        }
        destra={largo && <BottoneBarra onClick={() => setSommario(true)}><Elenco size={18} />Sommario</BottoneBarra>}
      />

      <div className="mx-auto max-w-[1240px] pb-32" style={{ paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" }}>
        <div className={largo ? "grid grid-cols-[minmax(0,1fr)_min(480px,40vw)] gap-10" : "mx-auto max-w-[720px]"}>
          <article className="min-w-0" onClick={clic}>
            <Testata voce={voce} art={art} conteggi={conteggi} />
            {art && sezioni.map((s, k) => <Sezione key={s.id} s={s} k={k} slug={slug} />)}
            {art && tutte && <Coda art={art} prec={prec} succ={succ} apri={apri} />}
            {!art && <div className="mt-10 h-40 animate-pulse rounded-scheda bg-testo/5" />}
          </article>
          {largo && art && (
            <Banco art={art} sez={sez} indiceSez={indiceSez} scelta={scelta} richiamo={richiamo}
              setScelta={setScelta} sposta={sposta} vaiSezione={vaiSezione} visti={visti} />
          )}
        </div>
      </div>

      {!largo && art && (
        <Dock sez={sez} indiceSez={indiceSez} totale={art.sezioni.length} sposta={sposta}
          apriSommario={() => setSommario(true)} apriLavagna={() => setLavagna(true)} />
      )}
      <AnimatePresence>
        {sommario && art && (
          <Pannello lato={largo ? "sinistra" : "basso"} chiudi={() => setSommario(false)} titolo="Sommario">
            <Sommario art={art} attiva={attiva} visti={visti} vai={id => { setSommario(false); setTimeout(() => vaiSezione(id), 220); }} />
          </Pannello>
        )}
        {lavagna && !largo && art && (
          <Pannello lato="basso" chiudi={() => { setLavagna(false); setScelta(null); }} titolo={sez ? <span dangerouslySetInnerHTML={{ __html: sez.titolo }} /> : "Lavagna"}>
            {scelta?.chiave && scelta.sezioni.includes(attiva) ? <Media chiave={scelta.chiave} /> : sez ? <Lavagna sezione={sez.id} /> : <p className="font-ui text-testo-2">Scorri fino a una sezione per vederne le formule.</p>}
          </Pannello>
        )}
      </AnimatePresence>
    </LezioneCtx.Provider>
  );
}

/* ---------------------------------------------------------------- testata */
function Testata({ voce, art, conteggi }) {
  const [ripasso, setRipasso] = useState(false);
  return (
    <header className="grid gap-5 pb-8 pt-10 largo:pt-14">
      <p className="m-0 font-ui text-[0.84rem] font-semibold text-tenue">
        {voce?.numero ? `Lezione ${voce.numero} di 10` : "Fonte del corso"}{voce?.pagine ? `, dispense alle ${voce.pagine}` : ""}
      </p>
      <h1 className="m-0 font-display text-[clamp(2.4rem,5.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.01em] text-testo">{voce?.titolo}</h1>
      {art && <Prosa html={art.lede} className="text-[1.12em] italic text-testo-2" />}
      {conteggi.length > 0 && (
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0 font-ui">
          {conteggi.map(([n, nome]) => (
            <li key={nome} className="rounded-full border border-filetto/80 px-3 py-1 text-[0.8rem] text-testo-2">
              <span className="tabulare font-semibold text-testo">{n}</span> {nome}
            </li>
          ))}
        </ul>
      )}
      {art?.punti && (
        <div className="rounded-scheda border border-filetto bg-superficie/50">
          <button type="button" onClick={() => setRipasso(r => !r)} aria-expanded={ripasso}
            className="flex min-h-[56px] w-full items-center gap-3 px-5 text-left font-ui">
            <span className="text-[0.95rem] font-semibold text-testo">Ripasso in un minuto</span>
            <span className="text-[0.86rem] text-testo-2">i punti chiave della lezione</span>
            <motion.span animate={{ rotate: ripasso ? 180 : 0 }} className="ml-auto text-tenue"><Giu size={18} /></motion.span>
          </button>
          <AnimatePresence initial={false}>
            {ripasso && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ height: { type: "spring", stiffness: 260, damping: 32 } }} className="overflow-hidden">
                <Prosa html={art.punti} className="border-t border-filetto px-5 pb-5 pt-3 text-[0.96em]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {art?.film_testa && <Film nome={art.film_testa} />}
    </header>
  );
}

/* ---------------------------------------------------------------- sezioni */
const Sezione = memo(function Sezione({ s, k, slug }) {
  return (
    <section id={"sez-" + s.id} className="grid gap-5 pt-12" style={{ scrollMarginTop: "72px" }}>
      <div className="grid gap-2">
        <h2 className="m-0 flex items-baseline gap-3 font-display text-[clamp(1.6rem,3vw,2.05rem)] font-medium leading-tight text-testo">
          <span className="tabulare text-[0.62em] font-normal text-tenue">{k + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: s.titolo }} />
        </h2>
      </div>
      <Blocchi blocchi={s.blocchi} />
    </section>
  );
});

function Coda({ art, prec, succ, apri }) {
  return (
    <footer className="mt-16 grid gap-8 border-t border-filetto pt-10">
      {art.correlati && (
        <div className="grid gap-2">
          <p className="m-0 font-ui text-[0.84rem] font-semibold text-tenue">Articoli correlati</p>
          <Prosa html={art.correlati} className="text-[0.92em]" />
          <button type="button" onClick={() => apri("mappa", art.slug)}
            className="inline-flex h-10 items-center gap-2 justify-self-start rounded-full border border-filetto px-4 font-ui text-[0.86rem] text-testo-2 hover:bg-testo/5">
            <Rete size={16} />I collegamenti di questa lezione nella mappa
          </button>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {[[prec, "Lezione precedente", Indietro], [succ, "Lezione successiva", Avanti]].map(([l, nome, Icona]) => l ? (
          <motion.button key={nome} type="button" onClick={() => apri(l.slug)} whileTap={{ scale: 0.98 }}
            className="grid content-start gap-1 rounded-scheda border border-filetto bg-superficie/60 p-5 text-left font-ui transition-colors hover:border-accento/50">
            <span className="flex items-center gap-1 text-[0.84rem] font-semibold text-tenue"><Icona size={14} />{nome}</span>
            <span className="font-display text-[1.25rem] leading-snug text-testo"><span className="tabulare text-accento">{l.numero}</span> {l.breve}</span>
          </motion.button>
        ) : <span key={nome} />)}
      </div>
      {art.fonti && (
        <details className="font-ui text-[0.86rem] text-testo-2">
          <summary className="cursor-pointer py-2 text-tenue">Fonti di questa pagina</summary>
          <Prosa html={art.fonti} className="text-[0.95em]" />
        </details>
      )}
    </footer>
  );
}

/* ---------------------------------------------------------------- banco (iPad orizzontale) */
function Banco({ art, sez, indiceSez, scelta, richiamo, setScelta, sposta, vaiSezione, visti }) {
  const voci = sez ? media(sez) : [];
  const fissata = scelta?.chiave && scelta.sezioni.includes(sez?.id) ? scelta.chiave : null;
  const chiave = sez ? (fissata ?? voci[0] ?? "lavagna") : "sommario";
  const schede = sez ? [...voci, "lavagna"] : [];
  return (
    <aside className="sticky self-start" style={{ top: "calc(56px + env(safe-area-inset-top, 0px))", height: "calc(100dvh - 56px - env(safe-area-inset-top, 0px))" }}>
      <motion.div key={richiamo} animate={richiamo ? { boxShadow: ["0 0 0 0 rgb(var(--accento) / 0)", "0 0 0 4px rgb(var(--accento) / .45)", "0 0 0 0 rgb(var(--accento) / 0)"] } : {}}
        transition={{ duration: 0.9 }} className="flex h-[calc(100%-24px)] flex-col overflow-hidden rounded-scheda border border-filetto/80 bg-fondo-2/80 backdrop-blur-xl mt-3 font-ui">
        <div className="grid gap-3 border-b border-filetto/70 px-4 pb-3 pt-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={sez?.id ?? "inizio"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
              className="m-0 flex items-baseline gap-2 text-[0.95rem] font-medium leading-snug text-testo">
              {sez ? <><span className="tabulare text-tenue">{indiceSez + 1}</span><span dangerouslySetInnerHTML={{ __html: sez.titolo }} /></> : "In questa lezione"}
            </motion.p>
          </AnimatePresence>
          {schede.length > 1 && (
            <div className="flex gap-1 rounded-full bg-testo/5 p-1" role="tablist">
              {schede.map(c => (
                <button key={c} type="button" role="tab" aria-selected={c === chiave}
                  onClick={() => setScelta({ chiave: c === "lavagna" ? "lavagna" : c, sezioni: [sez.id] })}
                  className={`relative flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full text-[0.8rem] font-medium transition-colors ${c === chiave ? "text-fondo" : "text-testo-2"}`}>
                  {c === chiave && <motion.span layoutId="scheda-banco" className="absolute inset-0 rounded-full bg-accento" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative inline-flex items-center gap-1.5">{iconaDi(c)}{nomeDi(c)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={chiave + (sez?.id ?? "")} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
              {chiave === "sommario" ? <Sommario art={art} attiva={null} visti={visti} vai={vaiSezione} />
                : chiave === "lavagna" ? <Lavagna sezione={sez.id} /> : <Media chiave={chiave} />}
            </motion.div>
          </AnimatePresence>
        </div>
        {sez && (
          <div className="flex items-center gap-2 border-t border-filetto/70 px-3 py-2">
            <button type="button" onClick={() => sposta(-1)} disabled={indiceSez <= 0}
              className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-[0.82rem] text-testo-2 hover:bg-testo/5 disabled:opacity-35"><Su size={16} />Precedente</button>
            <span className="tabulare flex-1 text-center text-[0.78rem] text-tenue">{indiceSez + 1} / {art.sezioni.length}</span>
            <button type="button" onClick={() => sposta(1)} disabled={indiceSez >= art.sezioni.length - 1}
              className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-[0.82rem] text-testo-2 hover:bg-testo/5 disabled:opacity-35">Successiva<Giu size={16} /></button>
          </div>
        )}
      </motion.div>
    </aside>
  );
}

const iconaDi = c => c.startsWith("film:") ? <IconaFilm size={16} /> : c.startsWith("lab:") ? <IconaLab size={16} /> : <Formula size={16} />;
const nomeDi = c => c.startsWith("film:") ? "Film" : c.startsWith("lab:") ? "Laboratorio" : "Lavagna";

function Media({ chiave }) {
  const [tipo, nome] = chiave.split(":");
  if (tipo === "film") return <Film nome={nome} />;
  const Vivo = LABORATORI[nome];
  return Vivo ? <Vivo /> : null;
}

/* La lavagna: le formule in evidenza della sezione, nell'ordine del testo. Quelle già lette sono piene,
   quella che stai leggendo è segnata, le successive sono appena accennate: la lavagna si riempie mentre leggi.
   Un tocco su una formula porta il testo lì. */
function Lavagna({ sezione }) {
  const [formule, setFormule] = useState([]);
  const [corrente, setCorrente] = useState(-1);
  const lista = useRef(null);
  useEffect(() => {
    const sec = document.getElementById("sez-" + sezione);
    if (!sec) return;
    const els = [...sec.querySelectorAll(".katex-display")].filter(el => !el.closest("[data-lavagna-no]"));
    setFormule(els.map(el => ({ el, html: el.innerHTML })));
  }, [sezione]);
  useEffect(() => {
    let raf = 0;
    const calcola = () => {
      raf = 0;
      let k = -1;
      formule.forEach((f, j) => { if (f.el.getBoundingClientRect().top < innerHeight * 0.6) k = j; });
      setCorrente(k);
    };
    const su = () => { if (!raf) raf = requestAnimationFrame(calcola); };
    addEventListener("scroll", su, { passive: true });
    calcola();
    return () => { removeEventListener("scroll", su); cancelAnimationFrame(raf); };
  }, [formule]);
  useEffect(() => {
    const box = lista.current?.closest(".overflow-y-auto"), it = lista.current?.children[Math.max(corrente, 0)];
    if (box && it) box.scrollTo({ top: it.offsetTop - box.clientHeight * 0.3, behavior: "smooth" });
  }, [corrente]);
  const vai = f => {
    f.el.scrollIntoView({ behavior: "smooth", block: "center" });
    f.el.classList.add("lampeggia");
    setTimeout(() => f.el.classList.remove("lampeggia"), 1400);
  };
  if (!formule.length) return <p className="m-0 text-[0.9rem] text-testo-2">In questa sezione non ci sono formule in evidenza: il ragionamento è tutto nel testo.</p>;
  return (
    <ol ref={lista} className="lavagna m-0 grid list-none gap-2 p-0">
      {formule.map((f, j) => (
        <li key={j}>
          <button type="button" onClick={() => vai(f)}
            className={`grid w-full grid-cols-[2rem_minmax(0,1fr)] items-center gap-2 rounded-piccolo border px-2 py-3 text-left transition-all duration-500
              ${j === corrente ? "border-accento/60 bg-accento/10" : "border-transparent hover:bg-testo/5"}
              ${j > corrente ? "opacity-30" : j < corrente ? "opacity-70" : "opacity-100"}`}>
            <span className="tabulare self-start pt-1 font-testo text-[0.8rem] text-tenue">({j + 1})</span>
            <span className="katex-display min-w-0 font-testo text-[0.92rem] text-testo" dangerouslySetInnerHTML={{ __html: f.html }} />
          </button>
        </li>
      ))}
    </ol>
  );
}

function Sommario({ art, attiva, visti, vai }) {
  return (
    <ol className="m-0 grid list-none gap-0.5 p-0 font-ui">
      {art.sezioni.map((s, k) => {
        const m = media(s);
        return (
          <li key={s.id}>
            <button type="button" onClick={() => vai(s.id)}
              className={`grid w-full grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-2 rounded-piccolo px-2 py-2.5 text-left transition-colors ${s.id === attiva ? "bg-accento/10" : "hover:bg-testo/5"}`}>
              <span className={`tabulare pt-px font-testo text-[0.9rem] ${s.id === attiva ? "text-testo" : "text-tenue"}`}>{k + 1}</span>
              <span className={`text-[0.92rem] leading-snug ${s.id === attiva ? "font-semibold text-testo" : "text-testo-2"}`} dangerouslySetInnerHTML={{ __html: s.titolo }} />
              <span className="flex items-center gap-1 pt-0.5 text-tenue">
                {m.some(c => c.startsWith("film:")) && <IconaFilm size={15} />}
                {m.some(c => c.startsWith("lab:")) && <IconaLab size={15} />}
                {visti.has(s.id) && <span className="text-probabilita"><Spunta size={15} /></span>}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------------------------------------------------------- iPad verticale */
function Dock({ sez, indiceSez, totale, sposta, apriSommario, apriLavagna }) {
  return (
    <motion.nav initial={{ y: 80 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center font-ui"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))", paddingLeft: "max(16px, env(safe-area-inset-left, 0px))", paddingRight: "max(16px, env(safe-area-inset-right, 0px))" }}>
      <div className="flex w-full max-w-[640px] items-center gap-1 rounded-full border border-filetto bg-superficie/90 p-1.5 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <button type="button" onClick={apriSommario} aria-label="Sommario" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-testo-2 active:bg-testo/10"><Elenco /></button>
        <button type="button" onClick={() => sposta(-1)} aria-label="Sezione precedente" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-testo-2 active:bg-testo/10"><Su /></button>
        <button type="button" onClick={apriSommario} className="min-w-0 flex-1 truncate px-1 text-center text-[0.86rem] text-testo">
          {sez ? <><span className="tabulare text-accento">{indiceSez + 1}</span><span className="text-tenue">/{totale}</span> <span dangerouslySetInnerHTML={{ __html: sez.titolo }} /></> : <span className="text-testo-2">Inizio della lezione</span>}
        </button>
        <button type="button" onClick={() => sposta(1)} aria-label="Sezione successiva" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-testo-2 active:bg-testo/10"><Giu /></button>
        <button type="button" onClick={apriLavagna} className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-accento px-4 text-[0.84rem] font-semibold text-fondo">
          <Formula size={16} />Lavagna
        </button>
      </div>
    </motion.nav>
  );
}

/* Pannello sovrapposto: cassetto a sinistra sul largo, foglio dal basso in verticale (si chiude anche trascinandolo giù). */
function Pannello({ lato, titolo, chiudi, children }) {
  useEffect(() => {
    const esc = e => e.key === "Escape" && chiudi();
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [chiudi]);
  const basso = lato === "basso";
  const trascina = useDragControls();
  return (
    <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={chiudi} />
      <motion.div role="dialog" aria-modal="true"
        initial={basso ? { y: "100%" } : { x: "-100%" }} animate={basso ? { y: 0 } : { x: 0 }} exit={basso ? { y: "100%" } : { x: "-100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 36 }}
        drag={basso ? "y" : "x"} dragListener={false} dragControls={trascina} dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }} dragElastic={{ top: 0, bottom: 0.6, left: 0.6, right: 0 }}
        onDragEnd={(_, i) => { if ((basso && i.offset.y > 110) || (!basso && i.offset.x < -110)) chiudi(); }}
        className={`absolute flex flex-col border-filetto bg-superficie font-ui shadow-2xl ${basso
          ? "inset-x-0 bottom-0 max-h-[82dvh] rounded-t-[22px] border-t"
          : "inset-y-0 left-0 w-[min(400px,88vw)] border-r"}`}
        style={basso ? { paddingBottom: "env(safe-area-inset-bottom, 0px)" } : { paddingTop: "env(safe-area-inset-top, 0px)", paddingLeft: "env(safe-area-inset-left, 0px)" }}>
        <div className="touch-none" onPointerDown={e => trascina.start(e)}>
        {basso && <div className="mx-auto mt-2.5 h-1.5 w-11 rounded-full bg-testo/20" />}
        <div className="flex items-center gap-3 px-5 pb-2 pt-3">
          <p className="m-0 min-w-0 flex-1 truncate font-display text-[1.2rem] text-testo">{titolo}</p>
          <button type="button" onClick={chiudi} onPointerDown={e => e.stopPropagation()} aria-label="Chiudi" className="grid h-11 w-11 place-items-center rounded-full text-testo-2 hover:bg-testo/5"><Chiudi /></button>
        </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}
