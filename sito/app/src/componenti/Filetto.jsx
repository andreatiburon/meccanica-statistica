import { memo } from "react";

// Filetto sotto i titoli: un campione della distribuzione di Boltzmann, densità e^{−x} (stesso seme, stessi punti).
function rng(seme) {
  let h = 2166136261;
  for (const c of seme) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296;
}

export default memo(function Filetto({ seme, n = 80, className = "" }) {
  const r = rng(seme), L = 1200, A = 14;
  const punti = Array.from({ length: n }, () => {
    const x = Math.min(-Math.log(1 - r()) * L * 0.22, L - 2);
    return [x, A / 2 + (r() - 0.5) * A * 0.64, 0.9 + r()];
  });
  return (
    <svg className={`filetto block h-3.5 w-full max-w-[640px] fill-caldo/80 ${className}`} viewBox={`0 0 ${L} ${A}`}
      preserveAspectRatio="xMinYMid slice" aria-hidden="true">
      {punti.map(([x, y, rr], k) => <circle key={k} cx={x.toFixed(1)} cy={y.toFixed(1)} r={rr.toFixed(2)} />)}
    </svg>
  );
});
