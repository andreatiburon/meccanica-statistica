// Dopo la build scrive _artifact.html: la pagina senza involucro <html>, come la vuole un Artifact di claude.ai
// (che aggiunge da sé doctype, head e body). Tutti gli altri file si pubblicano accanto con lo stesso percorso.
import { readFileSync, writeFileSync } from "node:fs";

const dir = new URL("../../_app/", import.meta.url);
const pagina = readFileSync(new URL("index.html", dir), "utf8");
const tra = (a, b) => pagina.split(a)[1].split(b)[0].trim();
// TITOLO=… cambia il nome dell'Artifact (per esempio per un prototipo accanto al sito vero)
const testa = tra("<!--TESTA-->", "<!--/TESTA-->").replace(/<title>.*?<\/title>/, t => (process.env.TITOLO ? `<title>${process.env.TITOLO}</title>` : t));
const css = pagina.match(/<link rel="stylesheet"[^>]*href="\.\/assets\/[^"]+\.css">/)?.[0] ?? "";
const script = pagina.match(/<script type="module"[^>]*><\/script>/)[0];
const corpo = tra("<!--CORPO-->", "<!--/CORPO-->").replace(/<script type="module"[^>]*><\/script>/, "");
writeFileSync(new URL("_artifact.html", dir), [testa, css, corpo, script].join("\n") + "\n");
console.log("_app/_artifact.html scritto");
