// I colori sono token CSS (canali RGB) definiti in src/stile.css:
// Tailwind li usa con l'opacità, per esempio bg-superficie/80.
const token = n => `rgb(var(--${n}) / <alpha-value>)`;
const nomi = ["fondo", "fondo-2", "superficie", "schermo", "filetto", "testo", "testo-2", "tenue", "accento", "link",
  "energia", "freddo", "caldo", "entropia", "probabilita", "particelle", "libera", "idea", "attenzione"];

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: Object.fromEntries(nomi.map(n => [n, token(n)])),
      fontFamily: { display: "var(--f-display)", testo: "var(--f-testo)", ui: "var(--f-ui)", mono: "var(--f-mono)" },
      borderRadius: { scheda: "var(--raggio)", piccolo: "var(--raggio-sm)" },
      screens: { largo: "1024px" },
    },
  },
  plugins: [],
};
