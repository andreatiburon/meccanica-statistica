// Simulazioni e interazioni del sito. Ogni blocco si attiva solo se nella pagina c'è il suo elemento [data-lab].
(() => {
  const riduci = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (x, d = 2) => x.toFixed(d).replace(".", ",");
  const COL = { notte: "#1D2747", filetto: "#2E3A60", tenue: "#9AA3BA", ink: "#E8E5DC", oro: "#F2C14E" };
  const FREDDO = [91, 134, 224], CREMA = [232, 229, 220], CALDO = [236, 140, 85], GHIACCIO = [207, 218, 242];

  function mescola(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)); }
  // velocità bassa -> blu, media -> crema, alta -> arancio
  function termico(x) {
    x = Math.max(0, Math.min(1, x));
    const c = x < 0.5 ? mescola(FREDDO, CREMA, x * 2) : mescola(CREMA, CALDO, (x - 0.5) * 2);
    return `rgb(${c.join(",")})`;
  }
  function prepara(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: r.width, h: r.height };
  }
  function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

  // un solo ciclo di animazione; ogni attività gira solo quando il suo elemento è visibile
  const attivita = [];
  const visibile = new WeakMap();
  const osserva = new IntersectionObserver(es => es.forEach(e => visibile.set(e.target, e.isIntersecting)), { rootMargin: "80px" });
  function registra(el, passo) { visibile.set(el, false); osserva.observe(el); attivita.push({ el, passo }); }
  function ciclo(t) {
    for (const a of attivita) if (visibile.get(a.el)) a.passo(t);
    requestAnimationFrame(ciclo);
  }
  const ridisegni = [];
  let attesa;
  addEventListener("resize", () => { clearTimeout(attesa); attesa = setTimeout(() => ridisegni.forEach(f => f()), 150); });

  /* ================= copertina: il titolo come gas di particelle ================= */
  function sciame(box) {
    const cv = box.querySelector("canvas.sciame");
    const cursore = box.querySelector("input[type=range]");
    const outT = box.querySelector('[data-v="T"]'), outFase = box.querySelector('[data-v="fase"]');
    let G, n = 0, x, y, vx, vy, tx, ty, riga2, raggio = 2, dimensione = 100;
    let T = +cursore.value;
    const pt = { x: -1e9, y: -1e9 };

    function costruisci() {
      box.classList.add("viva");
      G = prepara(cv);
      const { w, h } = G;
      const off = document.createElement("canvas");
      off.width = Math.round(w); off.height = Math.round(h);
      const o = off.getContext("2d");
      dimensione = Math.min(h * 0.43, w * 0.2);
      o.textBaseline = "alphabetic";
      for (;;) {
        o.font = `600 ${dimensione}px Spectral, Georgia, serif`;
        const l1 = o.measureText("Meccanica").width;
        o.font = `italic 500 ${dimensione}px Spectral, Georgia, serif`;
        const l2 = o.measureText("Statistica").width;
        if (Math.max(l1, l2 + dimensione * 0.55) < w * 0.96 || dimensione < 20) break;
        dimensione *= 0.94;
      }
      const sx = w * 0.02;
      const y1 = h * 0.47, y2 = y1 + dimensione * 0.92;
      o.fillStyle = "#fff";
      o.font = `600 ${dimensione}px Spectral, Georgia, serif`; o.fillText("Meccanica", sx, y1);
      o.font = `italic 500 ${dimensione}px Spectral, Georgia, serif`; o.fillText("Statistica", sx + dimensione * 0.55, y2);
      const dati = o.getImageData(0, 0, off.width, off.height).data;
      let passo = Math.max(2, Math.round(dimensione / 34));
      let bersagli;
      for (;;) {
        bersagli = [];
        for (let j = 0; j < off.height; j += passo) for (let i = 0; i < off.width; i += passo)
          if (dati[(j * off.width + i) * 4 + 3] > 140) bersagli.push(i, j);
        if (bersagli.length / 2 <= 5200) break;
        passo++;
      }
      n = bersagli.length / 2;
      raggio = Math.max(1.1, passo * 0.46);
      x = new Float32Array(n); y = new Float32Array(n); vx = new Float32Array(n); vy = new Float32Array(n);
      tx = new Float32Array(n); ty = new Float32Array(n); riga2 = new Uint8Array(n);
      const confine = (y1 + y2) / 2 - dimensione * 0.35;
      for (let k = 0; k < n; k++) {
        tx[k] = bersagli[2 * k] + (Math.random() - 0.5) * passo * 0.6;
        ty[k] = bersagli[2 * k + 1] + (Math.random() - 0.5) * passo * 0.6;
        x[k] = tx[k]; y[k] = ty[k]; riga2[k] = ty[k] > confine ? 1 : 0;
      }
      disegna();
    }

    const liscio = (a, b, v) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
    function evolvi() {
      const { w, h } = G;
      const k = 0.05 * (1 - liscio(0.45, 0.9, T)), gamma = 0.1;
      const r2 = (dimensione * 0.55) ** 2;
      for (let i = 0; i < n; i++) {
        const dx = x[i] - pt.x, dy = y[i] - pt.y;
        const Tl = T + 7 * Math.exp(-(dx * dx + dy * dy) / r2);
        const a = Math.sqrt(2 * gamma * Tl);
        vx[i] += -k * (x[i] - tx[i]) - gamma * vx[i] + a * gauss();
        vy[i] += -k * (y[i] - ty[i]) - gamma * vy[i] + a * gauss();
        x[i] += vx[i]; y[i] += vy[i];
        if (x[i] < 0) { x[i] = 0; vx[i] = Math.abs(vx[i]); } else if (x[i] > w) { x[i] = w; vx[i] = -Math.abs(vx[i]); }
        if (y[i] < 0) { y[i] = 0; vy[i] = Math.abs(vy[i]); } else if (y[i] > h) { y[i] = h; vy[i] = -Math.abs(vy[i]); }
      }
    }
    // due tavolozze: la prima riga parte dal ghiaccio, la seconda dall'arancio tenue; scaldando vanno entrambe verso l'arancio
    const SECCHI = 14, PESCA = [244, 178, 140];
    const tavolozza = base => Array.from({ length: SECCHI }, (_, i) => {
      const t = i / (SECCHI - 1);
      const c = t < 0.35 ? mescola(base, CREMA, t / 0.35) : mescola(CREMA, CALDO, (t - 0.35) / 0.65);
      return `rgb(${c.join(",")})`;
    });
    const colori = [...tavolozza(GHIACCIO), ...tavolozza(PESCA)];
    const secchi = Array.from({ length: 2 * SECCHI }, () => []);
    function disegna() {
      const { ctx, w, h } = G;
      ctx.clearRect(0, 0, w, h);
      secchi.forEach(s => (s.length = 0));
      let e = 0;
      for (let i = 0; i < n; i++) {
        const v2 = vx[i] * vx[i] + vy[i] * vy[i];
        e += v2;
        secchi[riga2[i] * SECCHI + Math.min(SECCHI - 1, Math.floor(Math.sqrt(v2) / 3.2 * SECCHI))].push(i);
      }
      for (let c = 0; c < 2 * SECCHI; c++) {
        ctx.fillStyle = colori[c];
        ctx.beginPath();
        for (const i of secchi[c]) { ctx.moveTo(x[i] + raggio, y[i]); ctx.arc(x[i], y[i], raggio, 0, 6.2832); }
        ctx.fill();
      }
      return e / (2 * Math.max(n, 1));
    }
    function aggiornaT() {
      T = +cursore.value;
      outT.textContent = fmt(T, 2);
      outFase.textContent = T < 0.45 ? "condensate nelle lettere" : T < 0.9 ? "le lettere si sciolgono" : "gas: le lettere sono evaporate";
    }
    cursore.addEventListener("input", () => { aggiornaT(); if (riduci) { for (let s = 0; s < 200; s++) evolvi(); disegna(); } });
    const muovi = e => { const r = cv.getBoundingClientRect(); pt.x = e.clientX - r.left; pt.y = e.clientY - r.top; };
    cv.addEventListener("pointermove", muovi);
    cv.addEventListener("pointerdown", muovi);
    cv.addEventListener("pointerleave", () => { pt.x = pt.y = -1e9; });
    aggiornaT();
    const avvia = () => { costruisci(); if (!riduci) registra(cv, () => { evolvi(); disegna(); }); };
    (document.fonts && document.fonts.load ? document.fonts.load("600 80px Spectral").then(() => document.fonts.load("italic 500 80px Spectral")) : Promise.resolve())
      .catch(() => {}).then(avvia);
    ridisegni.push(() => { if (G && Math.abs(cv.getBoundingClientRect().width - G.w) > 2) costruisci(); });
  }

  /* ================= laboratorio: gas di dischi rigidi ================= */
  function gas(box) {
    const gasCv = box.querySelector(".lab-gas"), istCv = box.querySelector(".lab-ist");
    const out = k => box.querySelector(`[data-v="${k}"]`);
    const W = 1.5, H = 1, N = 300, R = 0.0085, BIN = 28;
    const px = new Float64Array(N), py = new Float64Array(N), vx = new Float64Array(N), vy = new Float64Array(N);
    const binH = new Float64Array(BIN);
    let urti = 0, tUltimo = performance.now(), pausa = riduci;
    const col = Math.ceil(Math.sqrt(N * W / H)), rig = Math.ceil(N / col);
    for (let i = 0; i < N; i++) {
      px[i] = (i % col + 0.5) / col * W; py[i] = (Math.floor(i / col) + 0.5) / rig * H;
      const v = 0.18 + 0.18 * Math.random(), a = Math.random() * 2 * Math.PI;
      vx[i] = v * Math.cos(a); vy[i] = v * Math.sin(a);
    }
    const v2medio = () => { let s = 0; for (let i = 0; i < N; i++) s += vx[i] * vx[i] + vy[i] * vy[i]; return s / N; };
    const cella = 2 * R, nc = Math.ceil(W / cella), nr = Math.ceil(H / cella);
    const testa = new Int32Array(nc * nr), dopo = new Int32Array(N);
    function passo(dt) {
      for (let i = 0; i < N; i++) {
        px[i] += vx[i] * dt; py[i] += vy[i] * dt;
        if (px[i] < R) { px[i] = R; vx[i] = Math.abs(vx[i]); } else if (px[i] > W - R) { px[i] = W - R; vx[i] = -Math.abs(vx[i]); }
        if (py[i] < R) { py[i] = R; vy[i] = Math.abs(vy[i]); } else if (py[i] > H - R) { py[i] = H - R; vy[i] = -Math.abs(vy[i]); }
      }
      testa.fill(-1);
      for (let i = 0; i < N; i++) {
        const k = Math.min(nr - 1, py[i] / cella | 0) * nc + Math.min(nc - 1, px[i] / cella | 0);
        dopo[i] = testa[k]; testa[k] = i;
      }
      for (let i = 0; i < N; i++) {
        const cx = Math.min(nc - 1, px[i] / cella | 0), cy = Math.min(nr - 1, py[i] / cella | 0);
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const xx = cx + dx, yy = cy + dy;
          if (xx < 0 || yy < 0 || xx >= nc || yy >= nr) continue;
          for (let j = testa[yy * nc + xx]; j !== -1; j = dopo[j]) {
            if (j <= i) continue;
            const rx = px[i] - px[j], ry = py[i] - py[j], d2 = rx * rx + ry * ry;
            if (d2 >= 4 * R * R || d2 === 0) continue;
            const p = rx * (vx[i] - vx[j]) + ry * (vy[i] - vy[j]);
            if (p >= 0) continue;
            const k = p / d2;
            vx[i] -= k * rx; vy[i] -= k * ry; vx[j] += k * rx; vy[j] += k * ry;
            urti++;
          }
        }
      }
    }
    let gG = prepara(gasCv), iG = prepara(istCv);
    ridisegni.push(() => { gG = prepara(gasCv); iG = prepara(istCv); disegnaGas(); disegnaIst(); });
    function disegnaGas() {
      const { ctx, w, h } = gG, s = Math.min(w / W, h / H), ox = (w - W * s) / 2, oy = (h - H * s) / 2;
      ctx.fillStyle = COL.notte; ctx.fillRect(0, 0, w, h);
      const vr = Math.sqrt(v2medio()) || 1, rr = Math.max(1.6, R * s * 1.15);
      for (let i = 0; i < N; i++) {
        ctx.fillStyle = termico(Math.hypot(vx[i], vy[i]) / (2.2 * vr));
        ctx.beginPath(); ctx.arc(ox + px[i] * s, oy + (H - py[i]) * s, rr, 0, 6.2832); ctx.fill();
      }
    }
    function disegnaIst() {
      const { ctx, w, h } = iG, m = { l: 14, r: 12, t: 18, b: 30 };
      const v2 = v2medio(), vmax = 3 * Math.sqrt(v2), dv = vmax / BIN, conta = new Float64Array(BIN);
      for (let i = 0; i < N; i++) { const b = Math.hypot(vx[i], vy[i]) / dv | 0; if (b < BIN) conta[b]++; }
      let scarto = 0;
      for (let b = 0; b < BIN; b++) {
        binH[b] += 0.12 * (conta[b] / (N * dv) - binH[b]);
        const v = (b + 0.5) * dv; scarto += Math.abs(binH[b] - 2 * v / v2 * Math.exp(-v * v / v2)) * dv;
      }
      const ymax = 1.25 * Math.sqrt(2 / v2) * Math.exp(-0.5);
      const X = v => m.l + v / vmax * (w - m.l - m.r), Y = f => h - m.b - Math.min(f / ymax, 1.15) * (h - m.t - m.b);
      ctx.fillStyle = COL.notte; ctx.fillRect(0, 0, w, h);
      for (let b = 0; b < BIN; b++) {
        ctx.fillStyle = termico((b + 0.5) / BIN * 3 / 2.2);
        const x0 = X(b * dv) + 1, x1 = X((b + 1) * dv) - 1;
        ctx.fillRect(x0, Y(binH[b]), x1 - x0, h - m.b - Y(binH[b]));
      }
      ctx.strokeStyle = COL.oro; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let k = 0; k <= 120; k++) { const v = k / 120 * vmax, f = 2 * v / v2 * Math.exp(-v * v / v2); k ? ctx.lineTo(X(v), Y(f)) : ctx.moveTo(X(v), Y(f)); }
      ctx.stroke();
      ctx.strokeStyle = COL.filetto; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(m.l, h - m.b + 0.5); ctx.lineTo(w - m.r, h - m.b + 0.5); ctx.stroke();
      ctx.fillStyle = COL.tenue; ctx.font = "11px 'JetBrains Mono', monospace"; ctx.textAlign = "center";
      for (let k = 0; k <= 3; k++) ctx.fillText(k ? k + "·v_rms" : "0", X(k * Math.sqrt(v2)), h - 10);
      ctx.textAlign = "right"; ctx.fillStyle = COL.oro; ctx.font = "italic 14px Spectral, serif";
      ctx.fillText("Maxwell-Boltzmann 2D", w - m.r, m.t + 2);
      out("T").textContent = fmt(v2 / 2 * 100, 2) + " (unità arb.)";
      out("scarto").textContent = fmt(scarto * 50, 1) + " %";
    }
    const ridisegna = () => { disegnaGas(); disegnaIst(); };
    gasCv.addEventListener("pointerdown", e => {
      const r = gasCv.getBoundingClientRect(), { w, h } = gG, s = Math.min(w / W, h / H);
      const cx = (e.clientX - r.left - (w - W * s) / 2) / s, cy = H - (e.clientY - r.top - (h - H * s) / 2) / s;
      const vr = Math.sqrt(v2medio());
      for (let i = 0; i < N; i++) if (Math.hypot(px[i] - cx, py[i] - cy) < 0.12) {
        const a = Math.random() * 2 * Math.PI; vx[i] += 2.2 * vr * Math.cos(a); vy[i] += 2.2 * vr * Math.sin(a);
      }
      if (pausa) ridisegna();
    });
    const scala = f => { for (let i = 0; i < N; i++) { vx[i] *= f; vy[i] *= f; } if (pausa) ridisegna(); };
    const btn = c => box.querySelector(`[data-c="${c}"]`);
    btn("uguali").onclick = () => {
      const v = Math.sqrt(v2medio());
      for (let i = 0; i < N; i++) { const a = Math.random() * 2 * Math.PI; vx[i] = v * Math.cos(a); vy[i] = v * Math.sin(a); }
      binH.fill(0); if (pausa) ridisegna();
    };
    btn("caldo").onclick = () => scala(1.2);
    btn("freddo").onclick = () => scala(1 / 1.2);
    const bp = btn("pausa"), etichettaPausa = () => (bp.textContent = pausa ? "Avvia" : "Pausa");
    bp.onclick = () => { pausa = !pausa; etichettaPausa(); };
    etichettaPausa();
    ridisegna();
    registra(gasCv, t => {
      if (!pausa) { for (let k = 0; k < 3; k++) passo(1 / 180); ridisegna(); }
      if (t - tUltimo > 1000) {
        out("urti").textContent = pausa ? "in pausa" : Math.round(urti * 1000 / (t - tUltimo)).toLocaleString("it-IT");
        urti = 0; tUltimo = t;
      }
    });
  }

  /* ================= laboratorio: Ising 2D con Metropolis ================= */
  function ising(box) {
    const cv = box.querySelector(".lab-ising"), ctx = cv.getContext("2d");
    const out = k => box.querySelector(`[data-v="${k}"]`);
    const cursore = box.querySelector("input[type=range]");
    const L = 128, S = new Int8Array(L * L), TC = 2 / Math.log(1 + Math.SQRT2), img = ctx.createImageData(L, L);
    let T = +cursore.value, passi = 0;
    const caos = () => { for (let i = 0; i < L * L; i++) S[i] = Math.random() < 0.5 ? 1 : -1; passi = 0; };
    function sweep() {
      const w4 = Math.exp(-4 / T), w8 = Math.exp(-8 / T);
      for (let par = 0; par < 2; par++) for (let yy = 0; yy < L; yy++) {
        const su = ((yy + L - 1) % L) * L, giu = ((yy + 1) % L) * L, riga = yy * L;
        for (let xx = (yy + par) & 1; xx < L; xx += 2) {
          const i = riga + xx, s = S[i];
          const dE = 2 * s * (S[riga + (xx + 1) % L] + S[riga + (xx + L - 1) % L] + S[su + xx] + S[giu + xx]);
          if (dE <= 0 || (dE === 4 ? Math.random() < w4 : Math.random() < w8)) S[i] = -s;
        }
      }
      passi++;
    }
    function disegna() {
      let m = 0, e = 0;
      for (let yy = 0; yy < L; yy++) for (let xx = 0; xx < L; xx++) {
        const i = yy * L + xx, s = S[i], o = i * 4;
        m += s; e -= s * (S[yy * L + (xx + 1) % L] + S[((yy + 1) % L) * L + xx]);
        if (s > 0) { img.data[o] = 236; img.data[o + 1] = 140; img.data[o + 2] = 85; }
        else { img.data[o] = 29; img.data[o + 1] = 39; img.data[o + 2] = 71; }
        img.data[o + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      const ons = T < TC ? Math.pow(1 - Math.pow(Math.sinh(2 / T), -4), 0.125) : 0;
      out("m").textContent = fmt(Math.abs(m) / (L * L), 3);
      out("onsager").textContent = fmt(ons, 3);
      out("e").textContent = fmt(e / (L * L), 3);
      out("passi").textContent = passi.toLocaleString("it-IT");
    }
    function aggiornaT() {
      T = +cursore.value;
      out("Tval").textContent = fmt(T, 2);
      const f = out("fase"), fase = Math.abs(T - TC) < 0.08 ? "critica" : T < TC ? "ordinata" : "disordinata";
      f.dataset.fase = fase;
      f.textContent = { critica: "vicino al punto critico", ordinata: "fase ordinata: T < Tc", disordinata: "fase disordinata: T > Tc" }[fase];
    }
    cursore.addEventListener("input", aggiornaT);
    box.querySelector('[data-c="caos"]').onclick = () => { caos(); disegna(); };
    box.querySelector('[data-c="su"]').onclick = () => { S.fill(1); passi = 0; disegna(); };
    box.querySelector('[data-c="tc"]').onclick = () => { cursore.value = TC.toFixed(2); aggiornaT(); };
    caos(); aggiornaT();
    for (let k = 0; k < 40; k++) sweep();
    disegna();
    if (!riduci) registra(cv, () => { sweep(); sweep(); disegna(); });
  }

  /* ================= mappa dei collegamenti ================= */
  function mappa(box) {
    const cv = box.querySelector("canvas.mappa");
    const dati = JSON.parse(document.getElementById("dati-mappa").textContent);
    const nodi = dati.nodi.map((d, k) => ({ ...d, x: Math.cos(k * 2.4) * 0.3, y: Math.sin(k * 2.4) * 0.3, vx: 0, vy: 0, grado: 0 }));
    const perId = Object.fromEntries(nodi.map(n => [n.id, n]));
    const archi = dati.archi.filter(([a, b]) => perId[a] && perId[b]);
    archi.forEach(([a, b]) => { perId[a].grado++; perId[b].grado++; });
    const gmax = Math.max(...nodi.map(n => n.grado));
    let G = prepara(cv), trascinato = null, sopra = null, mosso = false, energia = 1;
    const scelto = perId[decodeURIComponent(location.hash.slice(1))] || null;
    ridisegni.push(() => { G = prepara(cv); disegna(); });
    function fisica() {
      for (const a of nodi) for (const b of nodi) if (a !== b) {
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + 1e-4, f = (a.gruppo === "mancante" || b.gruppo === "mancante" ? 0.0012 : 0.006) / d2;
        a.vx += dx * f; a.vy += dy * f;
      }
      for (const [i, j] of archi) {
        const a = perId[i], b = perId[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-3;
        const f = 0.03 * (d - (a.gruppo === "mancante" || b.gruppo === "mancante" ? 0.2 : 0.5)) / d;
        a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f;
      }
      energia = 0;
      for (const n of nodi) {
        n.vx -= n.x * 0.006; n.vy -= n.y * 0.006;
        if (n === trascinato) { n.vx = n.vy = 0; continue; }
        n.vx *= 0.82; n.vy *= 0.82; n.x += n.vx; n.y += n.vy; energia += Math.abs(n.vx) + Math.abs(n.vy);
      }
    }
    let adatta = null;
    const scala = () => {
      if (adatta && trascinato) return adatta;
      const { w, h } = G, mx = Math.min(110, w * 0.16), my = 34;
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const n of nodi) { x0 = Math.min(x0, n.x); x1 = Math.max(x1, n.x); y0 = Math.min(y0, n.y); y1 = Math.max(y1, n.y); }
      const s = Math.min((w - 2 * mx) / Math.max(x1 - x0, 1e-3), (h - 2 * my) / Math.max(y1 - y0, 1e-3));
      adatta = { s, cx: w / 2 - (x0 + x1) / 2 * s, cy: h / 2 - (y0 + y1) / 2 * s + 8 };
      return adatta;
    };
    function disegna() {
      const { ctx, w, h } = G, { s, cx, cy } = scala();
      ctx.clearRect(0, 0, w, h);
      const fuoco = sopra || scelto;
      const vicini = new Set(fuoco ? archi.filter(e => e.includes(fuoco.id)).flat() : []);
      for (const [i, j] of archi) {
        const a = perId[i], b = perId[j], acceso = fuoco && (i === fuoco.id || j === fuoco.id);
        ctx.strokeStyle = acceso ? COL.oro : COL.filetto; ctx.lineWidth = acceso ? 1.6 : 1;
        ctx.setLineDash(a.gruppo === "mancante" || b.gruppo === "mancante" ? [4, 4] : []);
        ctx.beginPath(); ctx.moveTo(cx + a.x * s, cy + a.y * s); ctx.lineTo(cx + b.x * s, cy + b.y * s); ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.font = `${w < 500 ? 10 : 12}px 'IBM Plex Sans', sans-serif`; ctx.textAlign = "center";
      for (const n of nodi) {
        const X = cx + n.x * s, Y = cy + n.y * s, r = n.gruppo === "mancante" ? 5 : 4 + n.grado * 0.9;
        ctx.globalAlpha = fuoco && !vicini.has(n.id) ? 0.28 : 1;
        ctx.beginPath(); ctx.arc(X, Y, r, 0, 6.2832);
        if (n.gruppo === "mancante") { ctx.setLineDash([3, 3]); ctx.strokeStyle = COL.tenue; ctx.stroke(); ctx.setLineDash([]); }
        else { ctx.fillStyle = termico(n.grado / gmax); ctx.fill(); if (n.gruppo === "fonte") { ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.stroke(); } }
        ctx.fillStyle = n.gruppo === "mancante" ? COL.tenue : COL.ink;
        ctx.fillText(n.nome.length > 30 ? n.nome.slice(0, 28) + "…" : n.nome, X, Y - r - 6);
        ctx.globalAlpha = 1;
      }
    }
    function nodoIn(e) {
      const r = cv.getBoundingClientRect(), { s, cx, cy } = scala();
      const px = (e.clientX - r.left - cx) / s, py = (e.clientY - r.top - cy) / s;
      let best = null, bd = 18 / s;
      for (const n of nodi) { const d = Math.hypot(n.x - px, n.y - py); if (d < bd) { bd = d; best = n; } }
      return { best, px, py };
    }
    cv.addEventListener("pointerdown", e => { const { best } = nodoIn(e); mosso = false; if (best) { trascinato = best; cv.setPointerCapture(e.pointerId); cv.style.cursor = "grabbing"; } });
    cv.addEventListener("pointermove", e => {
      const { best, px, py } = nodoIn(e);
      if (trascinato) { trascinato.x = px; trascinato.y = py; energia = 1; mosso = true; }
      if (best !== sopra) { sopra = best; cv.style.cursor = best && best.url ? "pointer" : "grab"; if (riduci) disegna(); }
    });
    cv.addEventListener("pointerup", () => {
      if (trascinato && !mosso && trascinato.url) location.href = trascinato.url;
      trascinato = null; cv.style.cursor = "grab";
    });
    cv.addEventListener("pointercancel", () => { trascinato = null; });
    for (let k = 0; k < 500; k++) fisica();
    disegna();
    registra(cv, () => { if (!riduci && (energia > 1e-4 || trascinato)) fisica(); disegna(); });
  }

  /* ================= indice dell'articolo che segue la lettura ================= */
  function indice() {
    const link = [...document.querySelectorAll(".indice-art a")];
    if (!link.length) return;
    const perId = new Map(link.map(a => [a.getAttribute("href").slice(1), a]));
    const sezioni = [...perId.keys()].map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(es => {
      for (const e of es) if (e.isIntersecting) {
        link.forEach(a => a.classList.remove("on"));
        perId.get(e.target.id)?.classList.add("on");
      }
    }, { rootMargin: "-20% 0px -70% 0px" });
    sezioni.forEach(s => io.observe(s));
  }

  /* ================= avvio ================= */
  const avvii = { sciame, gas, ising, mappa };
  document.querySelectorAll("[data-lab]").forEach(el => {
    try { avvii[el.dataset.lab]?.(el); } catch (err) { console.error(err); }
  });
  indice();
  const vo = new IntersectionObserver(es => es.forEach(e => {
    if (riduci) return;
    e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause();
  }), { threshold: 0.45 });
  document.querySelectorAll("video").forEach(v => vo.observe(v));
  requestAnimationFrame(ciclo);
})();
