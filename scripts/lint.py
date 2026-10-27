#!/usr/bin/env python3
"""Controlla la wiki secondo le regole del CLAUDE.md (comando «audit» / «lint»). Non modifica niente.

Uso:
  python3 scripts/lint.py            # rapporto completo
  python3 scripts/lint.py --rigido   # esce con codice 1 se trova problemi (per un controllo prima del commit)

Controlli:
  link       link rotti verso articoli che dovrebbero esistere; stub verso wiki fuori dal repository
  orfani     articoli che nessun altro articolo collega
  indici     indice_wiki.md e indice.md allineati ai file
  duplicati  nomi di file uguali in wiki diverse (ambigui in Obsidian), titoli quasi uguali
  formato    frontmatter, H1, «Punti chiave», «Articoli correlati», «Fonti» nell'ordine giusto
  lezioni    tag «lezione» ↔ LEZIONI in scripts/sito.py; sezione «L'idea in breve {#idea}»;
             «Mettiti alla prova» con 5-8 domande; almeno un esercizio; laboratori e film esistenti
  citazioni  forme storte di (Dispense, p. N) e (Appunti MS, p. N)
  anonimato  nomi dei docenti, email, link a pagine personali (stessa regola della versione privata)
  ricorrenti concetti linkati spesso che non hanno un articolo
"""
import re
import sys
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import sito  # noqa: E402

RADICE = sito.RADICE
WIKI = RADICE / "wiki"
LINK = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]")
EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
CIT = re.compile(r"\(([^()]*\b(?:[Dd]ispense|[Aa]ppunti)\b[^()]*)\)")
# pagine singole, intervalli e liste («pp. 132 e 134», «pp. 12, 15–16»); «p. N» è la forma scritta nelle regole
CIT_BUONA = re.compile(r"(?:Dispense|Appunti MS), (?:p\. N|pp?\. \d+(?:[–-]\d+)?(?:(?:, | e )\d+(?:[–-]\d+)?)*)\.?")


def leggi():
    articoli = {}
    for f in sorted(WIKI.rglob("*.md")):
        rel = f.relative_to(WIKI)
        articoli[rel.with_suffix("").as_posix()] = {"file": f, "rel": rel, "testo": f.read_text()}
    return articoli


def risolvi(target, da, articoli):
    """Un wikilink → chiave dell'articolo (percorso relativo senza .md), oppure None."""
    target = target.strip()
    if target in articoli:
        return target
    stessa = f"{Path(da).parent.as_posix()}/{target}".lstrip("./")
    if stessa in articoli:
        return stessa
    per_nome = [k for k in articoli if k.split("/")[-1] == target]
    return per_nome[0] if len(per_nome) == 1 else None


def controlla():
    articoli = leggi()
    wiki_presenti = {k.split("/")[0] for k in articoli if "/" in k}
    problemi = defaultdict(list)   # categoria -> [(file, descrizione, azione)]
    entranti = Counter()
    mancanti = Counter()

    for chiave, a in articoli.items():
        t, rel = a["testo"], str(a["rel"])
        # ---- link
        for m in LINK.finditer(t):
            target = m.group(1)
            dove = risolvi(target, chiave, articoli)
            if dove:
                if dove != chiave:
                    entranti[dove] += 1
                continue
            wiki = target.split("/")[0] if "/" in target else None
            if wiki and wiki not in wiki_presenti:
                problemi["stub esterni"].append((rel, f"[[{target}]]", f"normale: la wiki «{wiki}» non è in questo repository"))
            else:
                mancanti[target] += 1
                problemi["link rotti"].append((rel, f"[[{target}]]", "crea l'articolo o correggi il link"))
        if chiave.endswith("indice_wiki") or chiave == "indice":
            continue
        # ---- formato
        fm = re.match(r"^---\n(.*?)\n---\n", t, re.S)
        if not fm:
            problemi["formato"].append((rel, "manca il frontmatter YAML", "aggiungi tags, date e fonti"))
        else:
            for campo in ("tags", "data_creazione", "data_aggiornamento", "fonti"):
                if not re.search(rf"^{campo}:", fm.group(1), re.M):
                    problemi["formato"].append((rel, f"frontmatter senza «{campo}»", f"aggiungi {campo}"))
        if not re.search(r"^# .+", t, re.M):
            problemi["formato"].append((rel, "manca il titolo H1", "aggiungi «# Titolo»"))
        sezioni = [s.split("{")[0].strip() for s in re.findall(r"^## (.+)$", t, re.M)]
        for s in ("Punti chiave", "Articoli correlati", "Fonti"):
            if s not in sezioni:
                problemi["formato"].append((rel, f"manca «## {s}»", "aggiungi la sezione"))
        ordine = [s for s in sezioni if s in ("Punti chiave", "Articoli correlati", "Fonti")]
        if ordine and ordine != sorted(ordine, key=["Punti chiave", "Articoli correlati", "Fonti"].index):
            problemi["formato"].append((rel, f"sezioni fisse fuori ordine: {', '.join(ordine)}", "Punti chiave in cima, poi Articoli correlati, poi Fonti"))
        if sezioni and sezioni[0] != "Punti chiave":
            problemi["formato"].append((rel, f"la prima sezione è «{sezioni[0]}»", "«## Punti chiave» va subito dopo l'introduzione"))
        # ---- lezioni
        tag_lezione = bool(fm and re.search(r"tags:.*\blezione\b", fm.group(1)))
        slug = chiave.split("/")[-1]
        if tag_lezione != (slug in sito.LEZIONI):
            problemi["lezioni"].append((rel, "tag «lezione» e LEZIONI di sito.py non coincidono", "allinea il tag o la costante"))
        if tag_lezione:
            if not re.search(r"^## L'idea in breve \{#idea\}", t, re.M):
                problemi["lezioni"].append((rel, "manca «## L'idea in breve {#idea}»", "aggiungi l'analogia e la mappa"))
            prova = t.split("{#mettiti-alla-prova}", 1)
            if len(prova) == 1:
                problemi["lezioni"].append((rel, "manca «## Mettiti alla prova {#mettiti-alla-prova}»", "aggiungi 5-8 domande"))
            else:
                n = len(re.findall(r"^:::: domanda", prova[1].split("\n## ")[0], re.M))
                if not 5 <= n <= 8:
                    problemi["lezioni"].append((rel, f"«Mettiti alla prova» ha {n} domande", "ne servono da 5 a 8"))
            if not re.search(r"^:::: esercizio", t, re.M):
                problemi["lezioni"].append((rel, "nessun esercizio svolto", "aggiungi almeno un :::: esercizio"))
            ids = set(re.findall(r"^## .+\{#([\w-]+)\}", t, re.M))
            for sez in sito.FILM_SEZIONI.get(slug, {}):
                if sez not in ids:
                    problemi["lezioni"].append((rel, f"FILM_SEZIONI punta alla sezione «{sez}», che non c'è", "correggi l'id o la costante"))
            for tipo in re.findall(r'lab-segnaposto tipo="([\w-]+)"', t):
                if tipo not in sito.LAB_PICCOLI:
                    problemi["lezioni"].append((rel, f"laboratorio «{tipo}» non definito in LAB_PICCOLI", "definiscilo o correggi il tipo"))
        # ---- citazioni
        for m in CIT.finditer(t):
            parti = [x.strip() for x in m.group(1).split(";")]
            citazioni = [x for x in parti if re.match(r"(?i)(dispense|appunti)\b", x)]
            if citazioni and not all(CIT_BUONA.fullmatch(x) for x in citazioni):
                problemi["citazioni"].append((rel, f"«({m.group(1)[:70]})»", "usa (Dispense, p. N) o (Appunti MS, p. N)"))
        # ---- anonimato
        for riga in t.splitlines():
            for m in list(EMAIL.finditer(riga)) + [x for x in sito.ANONIMO.finditer(riga) if not x.group(0).lower().startswith(("http", "www"))]:
                problemi["anonimato"].append((rel, f"«{m.group(0)}» in «{riga.strip()[:70]}»", "togli il nome o l'indirizzo"))

    # ---- orfani: articoli che nessun altro collega (gli indici contano come collegamento)
    for chiave, a in articoli.items():
        if chiave.endswith("indice_wiki") or chiave == "indice":
            continue
        if not entranti[chiave]:
            problemi["orfani"].append((a["rel"], "nessun link in entrata", "collegalo da un articolo affine o dall'indice"))

    # ---- indici
    for wiki in sorted(wiki_presenti):
        indice = articoli.get(f"{wiki}/indice_wiki")
        if not indice:
            problemi["indici"].append((f"{wiki}/", "manca indice_wiki.md", "crealo"))
            continue
        elencati = {risolvi(m.group(1), f"{wiki}/indice_wiki", articoli) for m in LINK.finditer(indice["testo"])}
        for chiave in articoli:
            if chiave.startswith(wiki + "/") and not chiave.endswith("indice_wiki") and chiave not in elencati:
                problemi["indici"].append((indice["rel"], f"non elenca «{chiave.split('/')[-1]}»", "aggiungi la riga all'indice"))
        if "indice" in articoli and not re.search(rf"\[\[{re.escape(wiki)}/indice_wiki", articoli["indice"]["testo"]):
            problemi["indici"].append(("indice.md", f"non elenca la wiki «{wiki}»", "aggiungi la riga"))

    # ---- duplicati
    per_nome = defaultdict(list)
    for chiave in articoli:
        per_nome[chiave.split("/")[-1]].append(chiave)
    for nome, chiavi in per_nome.items():
        if len(chiavi) > 1 and nome != "indice_wiki":
            problemi["duplicati"].append((", ".join(chiavi), "stesso nome di file in wiki diverse", "rinomina: in Obsidian [[nome]] è ambiguo"))
    titoli = {k: (re.search(r"^# (.+)$", a["testo"], re.M) or [None, ""])[1] for k, a in articoli.items()}
    chiavi = [k for k in titoli if titoli[k] and "indice" not in k]
    for i, x in enumerate(chiavi):
        for y in chiavi[i + 1:]:
            if SequenceMatcher(None, titoli[x].lower(), titoli[y].lower()).ratio() > 0.9:
                problemi["duplicati"].append((f"{x}, {y}", f"titoli quasi uguali: «{titoli[x]}» e «{titoli[y]}»", "valuta un merge"))

    # ---- concetti linkati spesso senza articolo
    for target, n in mancanti.most_common():
        if n >= 3:
            problemi["ricorrenti"].append((target, f"linkato {n} volte senza articolo", "candidato a un nuovo articolo"))
    return articoli, problemi


ORDINE = ["link rotti", "indici", "formato", "lezioni", "citazioni", "anonimato", "orfani", "duplicati", "ricorrenti", "stub esterni"]

if __name__ == "__main__":
    articoli, problemi = controlla()
    print(f"Wiki: {len(articoli)} file in {WIKI.relative_to(RADICE)}/\n")
    da_sistemare = 0
    for cat in ORDINE:
        voci = problemi.get(cat, [])
        segno = "ok" if not voci else str(len(voci))
        print(f"## {cat}: {segno}")
        for file, cosa, azione in voci:
            print(f"  - {file}: {cosa} → {azione}")
        if cat != "stub esterni":
            da_sistemare += len(voci)
        print()
    print(f"Totale da sistemare: {da_sistemare} (gli stub esterni sono attesi e non contano).")
    sys.exit(1 if "--rigido" in sys.argv and da_sistemare else 0)
