// Legge da stdin un array JSON di formule [{tex, display}] e scrive su stdout
// l'array dei risultati [{html}] oppure [{errore}], nello stesso ordine.
const katex = require("katex");

let dati = "";
process.stdin.on("data", c => (dati += c));
process.stdin.on("end", () => {
  const risultati = JSON.parse(dati).map(({ tex, display }) => {
    try {
      return { html: katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: "ignore", output: "html" }) };
    } catch (e) {
      return { errore: e.message, html: katex.renderToString(tex, { displayMode: display, throwOnError: false, output: "html" }) };
    }
  });
  process.stdout.write(JSON.stringify(risultati));
});
