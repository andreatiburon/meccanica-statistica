// Simulazioni e interazioni del sito. Ogni blocco si attiva solo se nella pagina c'è il suo elemento [data-lab].
(() => {
  const riduci = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (x, d = 2) => x.toFixed(d).replace(".", ",");
  const COL = { notte: "#0B1020", filetto: "#2A3762", tenue: "#9AA3BA", ink: "#E8E5DC", oro: "#F2C14E", freddo: "#78A0F0", caldo: "#F29563" };
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

  /* ================= film passo per passo ================= */
  // Il video si ferma alla fine di ogni passo; la didascalia spiega il passo corrente.
  const lettori = [];
  function film(fig) {
    const v = fig.querySelector("video");
    const dati = JSON.parse(fig.dataset.film);
    const P = dati.passi, N = P.length, EPS = 0.06;
    const fine = P.map((p, k) => (k + 1 < N ? P[k + 1].t : dati.durata));
    const riemp = [...fig.querySelectorAll(".film-barra .riemp")];
    const segmenti = [...fig.querySelectorAll(".film-barra button")];
    const testo = fig.querySelector(".film-testo"), conta = fig.querySelector("[data-conta]");
    const btn = a => fig.querySelector(`[data-a="${a}"]`);
    const avanti = btn("avanti"), tutto = btn("tutto");
    let i = 0, stato = "nuovo"; // nuovo | gioca | fermo (fine del passo) | pausa (a metà)

    function barra() {
      const t = v.currentTime || 0;
      riemp.forEach((r, k) => {
        const f = k < i ? 1 : k > i ? 0 : Math.max(0, Math.min(1, (t - P[k].t) / Math.max(fine[k] - P[k].t, 0.01)));
        r.style.transform = `scaleX(${f})`;
      });
      segmenti.forEach((b, k) => b.classList.toggle("attivo", k === i));
    }
    function scrivi() {
      testo.innerHTML = P[i].html;  // HTML generato dal sito a partire dalle didascalie dei film
      conta.textContent = `${i + 1} / ${N}`;
      avanti.textContent = { gioca: "Pausa", pausa: "Riprendi", nuovo: "Inizia" }[stato] || (i + 1 < N ? "Continua" : "Ricomincia");
      fig.dataset.stato = stato;
      barra();
    }
    function segui() {
      if (stato !== "gioca") return;
      const t = v.currentTime;
      if (tutto.checked) {
        while (i + 1 < N && t >= P[i + 1].t) { i++; scrivi(); }
      } else if (t >= fine[i] - EPS) {
        v.pause();
        stato = "fermo";
        scrivi();
        return;
      }
      barra();
      requestAnimationFrame(segui);
    }
    function gioca() {
      lettori.forEach(l => l !== lettore && l.ferma());
      fig.classList.add("avviato");
      stato = "gioca";
      scrivi();
      const p = v.play();
      if (p) p.catch(() => { stato = "pausa"; scrivi(); });
      requestAnimationFrame(segui);
    }
    function vai(k) {
      i = Math.max(0, Math.min(N - 1, k));
      const parti = () => { v.currentTime = P[i].t + 0.01; gioca(); };
      if (v.readyState >= 1) parti();
      else {
        v.preload = "auto";
        v.addEventListener("loadedmetadata", parti, { once: true });
        v.load();
      }
    }
    function premi() {
      if (stato === "gioca") { v.pause(); stato = "pausa"; scrivi(); }
      else if (stato === "pausa") gioca();
      else if (stato === "nuovo") vai(0);
      else vai(i + 1 < N ? i + 1 : 0);
    }
    const lettore = { ferma() { if (stato === "gioca") { v.pause(); stato = "pausa"; scrivi(); } } };
    lettori.push(lettore);
    avanti.addEventListener("click", premi);
    btn("prec").addEventListener("click", () => vai(i - 1));
    btn("rivedi").addEventListener("click", () => vai(i));
    fig.querySelector(".film-avvia").addEventListener("click", () => vai(0));
    v.addEventListener("click", premi);
    segmenti.forEach((b, k) => b.addEventListener("click", () => vai(k)));
    tutto.addEventListener("change", () => { if (tutto.checked && stato === "fermo" && i + 1 < N) vai(i + 1); });
    v.addEventListener("ended", () => { i = N - 1; stato = "fermo"; scrivi(); });
    btn("schermo").addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen?.();
      else fig.requestFullscreen?.().catch(() => {});
    });
    fig.addEventListener("keydown", e => {
      if (e.target.tagName === "INPUT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); premi(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); vai(i - 1); }
    });
    scrivi();
  }

  /* ================= dispense (solo versione privata) ================= */
  function dispense(box) {
    const stato = box.querySelector(".lettore-stato");
    const lib = window.pdfjsLib;
    if (!lib) { stato.textContent = "Il visore PDF non si è caricato: controlla la connessione e ricarica la pagina."; return; }
    const cv = box.querySelector(".lettore-tela canvas"), tela = box.querySelector(".lettore-tela");
    const num = box.querySelector('[data-c="numero"]'), tot = box.querySelector('[data-c="totale"]');
    const voci = [...box.querySelectorAll(".toc-dispense a")].map(a => ({ a, p: +a.getAttribute("href").slice(2) }));
    let doc = null, pag = 1, zoom = 1, lavoro = null, testi = null;

    async function mostra(n) {
      if (!doc) return;
      pag = Math.max(1, Math.min(doc.numPages, n | 0));
      num.value = pag;
      try { history.replaceState(null, "", "#p" + pag); } catch (e) { /* non serve altrove */ }
      let corrente = null;
      for (const v of voci) { if (v.p <= pag) corrente = v; v.a.classList.remove("on"); }
      corrente?.a.classList.add("on");
      const p = await doc.getPage(pag);
      const base = p.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scala = Math.max(tela.clientWidth - 2, 280) / base.width * zoom;
      const vp = p.getViewport({ scale: scala * dpr });
      if (lavoro) lavoro.cancel();
      cv.width = vp.width; cv.height = vp.height;
      cv.style.width = vp.width / dpr + "px"; cv.style.height = vp.height / dpr + "px";
      lavoro = p.render({ canvasContext: cv.getContext("2d"), viewport: vp });
      try { await lavoro.promise; } catch (e) { /* rendering annullato da una pagina più recente */ }
    }
    const daHash = () => { const m = location.hash.match(/^#p(\d+)$/); mostra(m ? +m[1] : pag); };
    lib.getDocument(box.dataset.pdf).promise.then(d => {
      doc = d;
      tot.textContent = d.numPages;
      num.max = d.numPages;
      stato.hidden = true;
      daHash();
    }).catch(e => { stato.textContent = "Non riesco ad aprire le dispense: " + e.message; });
    addEventListener("hashchange", daHash);
    box.querySelector('[data-c="prec"]').onclick = () => mostra(pag - 1);
    box.querySelector('[data-c="succ"]').onclick = () => mostra(pag + 1);
    box.querySelector('[data-c="zoom-piu"]').onclick = () => { zoom = Math.min(3, zoom * 1.2); mostra(pag); };
    box.querySelector('[data-c="zoom-meno"]').onclick = () => { zoom = Math.max(0.5, zoom / 1.2); mostra(pag); };
    num.addEventListener("change", () => mostra(+num.value));
    addEventListener("keydown", e => {
      if (/INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") mostra(pag + 1);
      if (e.key === "ArrowLeft") mostra(pag - 1);
    });
    ridisegni.push(() => mostra(pag));

    // ricerca nel testo estratto, pagina per pagina
    const campo = box.querySelector("#cerca-testo"), lista = box.querySelector(".risultati");
    box.querySelector(".cerca").addEventListener("submit", e => e.preventDefault());
    fetch(box.dataset.testo).then(r => r.json()).then(t => { testi = t; }).catch(() => {});
    let attesa;
    campo.addEventListener("input", () => {
      clearTimeout(attesa);
      attesa = setTimeout(() => {
        lista.textContent = "";
        const q = campo.value.trim();
        if (!testi || q.length < 3) return;
        const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        let trovati = 0;
        testi.forEach((t, k) => {
          const m = t.search(re);
          if (m < 0 || trovati >= 40) return;
          trovati++;
          const li = document.createElement("li"), a = document.createElement("a");
          a.href = "#p" + (k + 1);
          const b = document.createElement("b");
          b.textContent = "p. " + (k + 1);
          const prima = document.createTextNode(" …" + t.slice(Math.max(0, m - 45), m));
          const evid = document.createElement("mark");
          evid.textContent = t.slice(m, m + q.length);
          const dopo = document.createTextNode(t.slice(m + q.length, m + q.length + 60) + "…");
          a.append(b, prima, evid, dopo);
          li.append(a);
          lista.append(li);
        });
        if (!trovati) {
          const li = document.createElement("li");
          li.className = "vuoto";
          li.textContent = "Nessuna pagina contiene «" + q + "».";
          lista.append(li);
        }
      }, 200);
    });
  }

  /* ================= laboratorio: il volume sta nella buccia ================= */
  function guscio(box) {
    const cv = box.querySelector(".guscio-grafico");
    const out = k => box.querySelector(`[data-v="${k}"]`);
    const cD = box.querySelector('[data-c="D"]'), cE = box.querySelector('[data-c="eps"]');
    let G = prepara(cv);
    const apice = n => String(n).replace("-", "⁻").replace(/\d/g, c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]);
    const potenza = x => {
      if (x >= 1e-3 && x < 1e4) return x.toLocaleString("it-IT", { maximumFractionDigits: x < 10 ? 3 : 0 });
      const e = Math.floor(Math.log10(x)), m = x / 10 ** e;
      return `${fmt(m, 1)}·10${apice(e)}`;
    };
    const percento = f => (f > 0.9999 ? "più del 99,99 %" : f < 1e-4 ? fmt(f * 100, 6) + " %" : fmt(f * 100, 2) + " %");
    function disegna() {
      const D = 10 ** +cD.value, eps = 10 ** +cE.value;
      const { ctx, w, h } = G, m = { l: 36, r: 14, t: 16, b: 30 };
      const X = r => m.l + r * (w - m.l - m.r), Y = f => h - m.b - f * (h - m.t - m.b);
      ctx.fillStyle = COL.notte; ctx.fillRect(0, 0, w, h);
      // guscio esterno [1-ε, 1]
      ctx.fillStyle = "rgba(242,193,78,.18)";
      const x0 = X(Math.max(0, 1 - eps));
      ctx.fillRect(Math.min(x0, X(1) - 2), m.t, Math.max(X(1) - x0, 2), h - m.t - m.b);
      // densità del raggio normalizzata al massimo: r^(D-1)
      ctx.strokeStyle = COL.oro; ctx.lineWidth = 2.4; ctx.beginPath();
      const passi = Math.round(w - m.l - m.r);
      for (let k = 0; k <= passi; k++) {
        const r = k / passi, f = r === 0 ? (D <= 1 ? 1 : 0) : Math.exp((D - 1) * Math.log(r));
        k ? ctx.lineTo(X(r), Y(f)) : ctx.moveTo(X(r), Y(f));
      }
      ctx.lineTo(X(1), Y(1)); ctx.stroke();
      ctx.strokeStyle = COL.filetto; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(m.l, h - m.b + 0.5); ctx.lineTo(w - m.r, h - m.b + 0.5); ctx.stroke();
      ctx.fillStyle = COL.tenue; ctx.font = "11px 'JetBrains Mono', monospace"; ctx.textAlign = "center";
      [0, 0.25, 0.5, 0.75, 1].forEach(r => ctx.fillText(fmt(r, 2), X(r), h - 10));
      ctx.textAlign = "left"; ctx.fillText("r / R", m.l, m.t + 2);
      const frazione = -Math.expm1(D * Math.log1p(-eps));
      const mezzo = -Math.expm1(-Math.LN2 / D);
      out("D").textContent = potenza(D);
      out("eps").textContent = eps >= 0.01 ? fmt(eps * 100, 1) + " %" : potenza(eps);
      out("frazione").textContent = percento(frazione);
      out("mezzo").textContent = mezzo < 1e-3 ? `(1 − ${potenza(mezzo)}) R` : `${fmt(1 - mezzo, 3)} R`;
    }
    cD.addEventListener("input", disegna);
    cE.addEventListener("input", disegna);
    box.querySelectorAll("[data-p]").forEach(b => b.addEventListener("click", () => { cD.value = b.dataset.p; disegna(); }));
    ridisegni.push(() => { G = prepara(cv); disegna(); });
    disegna();
  }

  /* ================= strumenti dei laboratori piccoli ================= */
  const etich = v => (typeof v === "string" ? v : String(v).replace(".", ","));
  // numero in notazione scientifica leggibile: 0,034 oppure 2,5·10⁻⁷
  function sci(x) {
    if (x >= 1e-3 && x < 1e4) return x.toLocaleString("it-IT", { maximumSignificantDigits: 3 });
    const e = Math.floor(Math.log10(x)), m = x / 10 ** e;
    return `${fmt(m, 1)}·10${String(e).replace("-", "⁻").replace(/\d/g, c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c])}`;
  }
  // Piano cartesiano nel riquadro r del canvas: assi, tacche, etichette; restituisce le mappe e i disegnatori.
  function piano(G, r, o) {
    const { ctx } = G, m = Object.assign({ l: 40, r: 14, t: 22, b: 28 }, o.m || {});
    const X = x => r.x + m.l + (x - o.x0) / (o.x1 - o.x0) * (r.w - m.l - m.r);
    const Y = y => r.y + r.h - m.b - (y - o.y0) / (o.y1 - o.y0) * (r.h - m.t - m.b);
    ctx.setLineDash([]); ctx.strokeStyle = COL.filetto; ctx.lineWidth = 1; ctx.beginPath();
    ctx.moveTo(X(o.x0), Y(o.y0) + 0.5); ctx.lineTo(X(o.x1), Y(o.y0) + 0.5);
    ctx.moveTo(X(o.x0) - 0.5, Y(o.y0)); ctx.lineTo(X(o.x0) - 0.5, Y(o.y1)); ctx.stroke();
    ctx.fillStyle = COL.tenue; ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.textAlign = "center"; (o.tx || []).forEach(v => ctx.fillText(etich(v), X(v), r.y + r.h - 9));
    ctx.textAlign = "right"; (o.ty || []).forEach(v => ctx.fillText(etich(v), X(o.x0) - 6, Y(v) + 4));
    if (o.ex) { ctx.textAlign = "right"; ctx.fillText(o.ex, X(o.x1), Y(o.y0) - 7); }
    if (o.ey) { ctx.textAlign = "left"; ctx.fillText(o.ey, X(o.x0) + 6, r.y + m.t - 6); }
    const ritaglia = () => { ctx.save(); ctx.beginPath(); ctx.rect(X(o.x0), Y(o.y1), X(o.x1) - X(o.x0), Y(o.y0) - Y(o.y1)); ctx.clip(); };
    function traccia(f, a, b, unito = false) {
      const n = Math.max(60, Math.round(Math.abs(X(b) - X(a))));
      let su = unito;
      for (let k = 0; k <= n; k++) {
        const x = a + (b - a) * k / n, y = f(x);
        if (!isFinite(y)) { su = false; continue; }
        su ? ctx.lineTo(X(x), Y(Math.max(o.y0 - 1e3 * (o.y1 - o.y0), Math.min(y, o.y1 + 1e3 * (o.y1 - o.y0))))) : ctx.moveTo(X(x), Y(y));
        su = true;
      }
    }
    return {
      X, Y,
      curva(f, col, lw = 2.4, trat = [], a = o.x0, b = o.x1) {
        ritaglia(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(trat); ctx.beginPath(); traccia(f, a, b); ctx.stroke(); ctx.restore();
      },
      area(f, col, a = o.x0, b = o.x1) {
        ritaglia(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(X(a), Y(o.y0)); traccia(f, a, b, true);
        ctx.lineTo(X(b), Y(o.y0)); ctx.closePath(); ctx.fill(); ctx.restore();
      },
      verticale(x, col, trat = [4, 4]) {
        ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.setLineDash(trat); ctx.beginPath();
        ctx.moveTo(X(x), Y(o.y0)); ctx.lineTo(X(x), Y(o.y1)); ctx.stroke(); ctx.setLineDash([]);
      },
      orizzontale(y, col, trat = [4, 4]) {
        ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.setLineDash(trat); ctx.beginPath();
        ctx.moveTo(X(o.x0), Y(y)); ctx.lineTo(X(o.x1), Y(y)); ctx.stroke(); ctx.setLineDash([]);
      },
      punto(x, y, col, rr = 5) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(x), Y(y), rr, 0, 2 * Math.PI); ctx.fill(); },
      scritta(x, y, t, col, al = "left") { ctx.fillStyle = col; ctx.textAlign = al; ctx.fillText(t, X(x), Y(y)); },
    };
  }
  // Due riquadri affiancati sul largo, impilati sullo stretto.
  function riquadri(G, quota = 0.55) {
    const { w, h } = G;
    return w >= 560 ? [{ x: 0, y: 0, w: w * quota, h }, { x: w * quota, y: 0, w: w * (1 - quota), h }]
      : [{ x: 0, y: 0, w, h: h / 2 }, { x: 0, y: h / 2, w, h: h / 2 }];
  }
  // Cursori, pulsanti preimpostati (data-imposta='{"chiave": valore}') e ridisegno al cambio di misura.
  function laboratorioPiccolo(box, disegna) {
    const cv = box.querySelector("canvas");
    const stato = { G: prepara(cv) };
    const val = k => +box.querySelector(`[data-c="${k}"]`).value;
    const scrivi = (k, t) => { const el = box.querySelector(`[data-v="${k}"]`); if (el) el.textContent = t; };
    const giro = () => { const G = stato.G; G.ctx.fillStyle = COL.notte; G.ctx.fillRect(0, 0, G.w, G.h); disegna(G, val, scrivi); };
    box.querySelectorAll('input[type="range"]').forEach(c => c.addEventListener("input", giro));
    box.querySelectorAll("[data-imposta]").forEach(b => b.addEventListener("click", () => {
      Object.entries(JSON.parse(b.dataset.imposta)).forEach(([k, v]) => { box.querySelector(`[data-c="${k}"]`).value = v; });
      giro();
    }));
    ridisegni.push(() => { stato.G = prepara(cv); giro(); });
    giro();
  }

  /* ---- dipoli nel campo: funzione di Langevin e legge di Curie */
  function langevin(box) {
    const L = a => (a < 1e-3 ? a / 3 - a ** 3 / 45 : 1 / Math.tanh(a) - 1 / a);
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const a = val("a"), [r1, r2] = riquadri(G);
      const p1 = piano(G, r1, { x0: 0, x1: 15, y0: 0, y1: 1.08, tx: [0, 5, 10, 15], ty: [0, 0.5, 1], ex: "α = βμE", ey: "⟨cos θ⟩" });
      p1.orizzontale(1, COL.filetto);
      p1.curva(x => x / 3, COL.freddo, 1.6, [6, 5]);
      p1.curva(L, COL.oro);
      p1.verticale(a, COL.tenue);
      p1.punto(a, L(a), COL.ink);
      p1.scritta(3.25, 1.0, "Curie: α/3", COL.freddo);
      // distribuzione di x = cos θ: α e^{αx} / (2 sinh α)
      const P = x => (a < 1e-6 ? 0.5 : a * Math.exp(a * (x - 1)) / -Math.expm1(-2 * a));
      const cima = Math.max(P(1), 0.5) * 1.12;
      const p2 = piano(G, r2, { x0: -1, x1: 1, y0: 0, y1: cima, tx: [-1, 0, 1], ex: "cos θ", ey: "probabilità di cos θ" });
      p2.area(P, "rgba(242,193,78,.22)");
      p2.curva(P, COL.oro);
      p2.verticale(L(a), COL.ink, [3, 3]);
      p2.scritta(L(a), cima * 0.93, " ⟨cos θ⟩", COL.ink, L(a) > 0.3 ? "right" : "left");
      scrivi("a", fmt(a, 2));
      scrivi("L", fmt(L(a), 3));
      scrivi("curie", fmt(Math.min(a / 3, 99), 3));
      scrivi("err", a < 0.01 ? "0 %" : fmt((a / 3 - L(a)) / L(a) * 100, 1) + " %");
    });
  }

  /* ---- adsorbimento: isoterma di Langmuir */
  function langmuir(box) {
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const be = val("be"), lx = val("x");
      const f = (b, l) => { const y = Math.exp(l * Math.LN10 + b); return y / (1 + y); };
      const p = piano(G, { x: 0, y: 0, w: G.w, h: G.h }, { x0: -6, x1: 2, y0: 0, y1: 1.08, tx: [-6, -4, -2, 0, 2], ty: [0, 0.5, 1], ex: "log₁₀ della densità", ey: "frazione di siti occupati f", m: { l: 40, r: 16, t: 22, b: 28 } });
      p.orizzontale(0.5, COL.filetto);
      p.curva(l => f(0, l), COL.freddo, 1.6, [6, 5]);
      p.area(l => f(be, l) * (1 - f(be, l)) * 4 * 0.25, "rgba(242,149,99,.18)");
      p.curva(l => f(be, l), COL.oro);
      const mezzo = -be / Math.LN10;
      if (mezzo >= -6) p.verticale(mezzo, COL.tenue);
      p.punto(lx, f(be, lx), COL.ink);
      p.scritta(0.15, 0.4, "βε = 0", COL.freddo);
      const fl = f(be, lx);
      scrivi("be", fmt(be, 1));
      scrivi("x", sci(10 ** lx));
      scrivi("f", fmt(fl * 100, 1) + " %");
      scrivi("mezzo", sci(Math.exp(-be)));
      scrivi("var", fmt(fl * (1 - fl), 3));
    });
  }

  /* ---- Van der Waals: isoterma ridotta, spinodale e costruzione di Maxwell */
  function vdw(box) {
    const bis = (g, a, b) => { let ga = g(a); for (let k = 0; k < 90; k++) { const c = (a + b) / 2, gc = g(c); if ((gc > 0) === (ga > 0)) { a = c; ga = gc; } else b = c; } return (a + b) / 2; };
    // per θ < 1: punti spinodali, pressione di coesistenza e volumi delle due fasi
    function maxwell(th) {
      const pi = f => 8 * th / (3 * f - 1) - 3 / (f * f), prim = f => 8 * th / 3 * Math.log(3 * f - 1) + 3 / f;
      const h = f => (3 * f - 1) ** 2 - 4 * th * f ** 3;
      const sl = bis(h, 1 / 3 + 1e-9, 1), sg = bis(h, 1, 1e3);
      const radici = p => [bis(f => pi(f) - p, 1 / 3 + 1e-9, sl), bis(f => pi(f) - p, sg, 1e5)];
      const area = p => { const [a, b] = radici(p); return prim(b) - prim(a) - p * (b - a); };
      const pc = bis(area, Math.max(pi(sl), 0) + 1e-12, pi(sg) - 1e-12);
      const [fl, fg] = radici(pc);
      return { sl, sg, pc, fl, fg, pi };
    }
    const cupola = [];
    for (let th = 0.6; th < 0.9995; th += 0.01) { const m = maxwell(th); cupola.push([m.fl, m.pc], [m.fg, m.pc]); }
    const binodale = cupola.filter((_, i) => i % 2 === 0).concat([[1, 1]], cupola.filter((_, i) => i % 2).reverse());
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const th = val("th"), pi = f => 8 * th / (3 * f - 1) - 3 / (f * f);
      const p = piano(G, { x: 0, y: 0, w: G.w, h: G.h }, { x0: 0.35, x1: 4, y0: -0.6, y1: 2.2, tx: [1, 2, 3, 4], ty: [0, 1, 2], ex: "φ = V/Vc", ey: "π = P/Pc" });
      p.orizzontale(0, COL.filetto, []);
      // cupola di coesistenza
      const { ctx } = G;
      ctx.save(); ctx.beginPath(); ctx.rect(p.X(0.35), p.Y(2.2), p.X(4) - p.X(0.35), p.Y(-0.6) - p.Y(2.2)); ctx.clip();
      ctx.strokeStyle = "rgba(154,163,186,.55)"; ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]); ctx.beginPath();
      binodale.forEach(([x, y], i) => (i ? ctx.lineTo(p.X(x), p.Y(y)) : ctx.moveTo(p.X(x), p.Y(y))));
      ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      p.curva(f => 8 / (3 * f - 1) - 3 / (f * f), COL.freddo, 1.4, [6, 5], 0.4, 4);
      if (th < 0.9995) {
        const m = maxwell(th);
        // i due lobi di area uguale
        ctx.save(); ctx.beginPath(); ctx.rect(p.X(0.35), p.Y(2.2), p.X(4) - p.X(0.35), p.Y(-0.6) - p.Y(2.2)); ctx.clip();
        ctx.fillStyle = "rgba(242,149,99,.28)"; ctx.beginPath(); ctx.moveTo(p.X(m.fl), p.Y(m.pc));
        const n = 240;
        for (let k = 0; k <= n; k++) { const f = m.fl + (m.fg - m.fl) * k / n; ctx.lineTo(p.X(f), p.Y(pi(f))); }
        ctx.closePath(); ctx.fill(); ctx.restore();
        p.curva(pi, COL.oro, 2.4, [], 0.36, 4);
        ctx.strokeStyle = COL.caldo; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(p.X(m.fl), p.Y(m.pc)); ctx.lineTo(p.X(m.fg), p.Y(m.pc)); ctx.stroke();
        p.punto(m.fl, m.pc, COL.ink, 4.5); p.punto(m.fg, m.pc, COL.ink, 4.5);
        p.punto(m.sl, pi(m.sl), COL.tenue, 3.5); p.punto(m.sg, pi(m.sg), COL.tenue, 3.5);
        scrivi("pc", fmt(m.pc, 3)); scrivi("fl", fmt(m.fl, 3)); scrivi("fg", fmt(m.fg, 2)); scrivi("r", fmt(m.fg / m.fl, 2));
      } else {
        p.curva(pi, COL.oro, 2.4, [], 0.36, 4);
        ["pc", "fl", "fg", "r"].forEach(k => scrivi(k, "—"));
      }
      p.scritta(3.95, 0.66, "isoterma critica", COL.freddo, "right");
      scrivi("th", fmt(th, 3));
    });
  }

  /* ---- campo medio: soluzione grafica di L = tanh((Tc/T)(L + h)) ed energia libera di Bragg-Williams */
  function campoMedio(box) {
    const ent = L => { const p = (1 + L) / 2, q = (1 - L) / 2; return (p > 0 ? p * Math.log(p) : 0) + (q > 0 ? q * Math.log(q) : 0); };
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const t = val("t"), h = val("h");
      const g = L => Math.tanh((L + h) / t);
      const f = L => -h * L - L * L / 2 + t * ent(L);           // in unità di k_B T_c, a meno di costanti
      // radici di g(L) - L su [-1, 1]
      const radici = [], n = 800;
      let xa = -1, ya = g(-1) + 1;
      for (let k = 1; k <= n; k++) {
        const xb = -1 + 2 * k / n, yb = g(xb) - xb;
        if (ya === 0) radici.push(xa);
        else if (ya * yb < 0) { let a = xa, b = xb, fa = ya; for (let i = 0; i < 60; i++) { const c = (a + b) / 2, fc = g(c) - c; if ((fc > 0) === (fa > 0)) { a = c; fa = fc; } else b = c; } radici.push((a + b) / 2); }
        xa = xb; ya = yb;
      }
      const stabile = L => (1 - g(L) ** 2) / t < 1;
      const migliore = radici.filter(stabile).reduce((m, L) => (m === null || f(L) < f(m) ? L : m), null);
      const [r1, r2] = riquadri(G, 0.5);
      const p1 = piano(G, r1, { x0: -1, x1: 1, y0: -1.05, y1: 1.05, tx: [-1, 0, 1], ty: [-1, 0, 1], ex: "L", ey: "L  e  tanh((Tc/T)(L + h))" });
      p1.curva(L => L, COL.freddo, 1.6, [6, 5]);
      p1.curva(g, COL.oro);
      radici.forEach(L => p1.punto(L, L, stabile(L) ? COL.ink : COL.tenue, stabile(L) ? 5 : 3.5));
      const fl = [-0.999, ...Array.from({ length: 199 }, (_, i) => -0.99 + i * 0.01), 0.999].map(f);
      const lo = Math.min(...fl), hi = Math.max(...fl);
      const p2 = piano(G, r2, { x0: -1, x1: 1, y0: lo - 0.02 * (hi - lo + 1e-9), y1: lo + 1.1 * (hi - lo + 1e-9), tx: [-1, 0, 1], ex: "L", ey: "energia libera f(L)" });
      p2.curva(f, COL.caldo, 2.4, [], -0.999, 0.999);
      if (migliore !== null) p2.punto(migliore, f(migliore), COL.ink);
      scrivi("t", fmt(t, 2)); scrivi("h", fmt(h, 3));
      const simmetrico = Math.abs(h) < 1e-9 && radici.length === 3;
      scrivi("L", migliore === null ? "—" : (simmetrico ? "±" : "") + fmt(simmetrico ? Math.abs(migliore) : migliore, 3));
      scrivi("n", radici.length === 3 ? "3, due stabili" : String(radici.length));
      scrivi("chi", t > 1.0005 ? fmt(1 / (t - 1), 1) : t < 0.9995 ? "—" : "∞");
    });
  }

  /* ---- gas di Fermi in 3D: unità ε_F = 1, g(ε) ∝ √ε, N fissato */
  function fermi(box) {
    // ∫_0^∞ ε^q n(ε) dε con ε = u²: integrando liscio, Simpson
    const momento = (q, m, t) => {
      const sup = Math.sqrt(Math.max(m, 0) + 40 * t + 1e-9), n = 1200, h = sup / n;
      let s = 0;
      for (let k = 0; k <= n; k++) {
        const u = k * h, e = u * u, x = (e - m) / t;
        const f = 2 * u * e ** q / (x > 50 ? Infinity : Math.exp(x) + 1);
        s += f * (k === 0 || k === n ? 1 : k % 2 ? 4 : 2);
      }
      return s * h / 3;
    };
    const mu = t => {
      if (t < 2e-3) return 1;
      let a = -30 * t - 5, b = 1.5;
      for (let i = 0; i < 70; i++) { const c = (a + b) / 2; if (momento(0.5, c, t) > 2 / 3) b = c; else a = c; }
      return (a + b) / 2;
    };
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const t = val("t"), m = mu(t);
      const n = e => (t < 2e-3 ? (e < 1 ? 1 : 0) : 1 / (Math.exp(Math.min((e - m) / t, 60)) + 1));
      const p = piano(G, { x: 0, y: 0, w: G.w, h: G.h }, { x0: 0, x1: 2.5, y0: 0, y1: 1.7, tx: [0, 0.5, 1, 1.5, 2, 2.5], ty: [0, 0.5, 1, 1.5], ex: "ε / εF", ey: "g(ε), stati occupati g(ε)n(ε), occupazione n(ε)" });
      p.area(e => Math.sqrt(e) * n(e), "rgba(242,149,99,.32)");
      p.curva(e => Math.sqrt(e), COL.tenue, 1.4, [5, 4]);
      p.curva(e => Math.sqrt(e) * n(e), COL.caldo, 2);
      p.curva(n, COL.oro, 2.2);
      p.verticale(1, COL.filetto);
      if (m > 0) { p.verticale(m, COL.ink, [3, 3]); p.scritta(m, 1.55, " μ", COL.ink, m > 2.2 ? "right" : "left"); }
      const E = t < 2e-3 ? 1 : momento(1.5, m, t) / 0.4;
      scrivi("t", fmt(t, 3));
      scrivi("mu", fmt(m, 4)); scrivi("muS", fmt(1 - Math.PI ** 2 * t * t / 12, 4));
      scrivi("E", fmt(E, 4)); scrivi("ES", fmt(1 + 5 * Math.PI ** 2 * t * t / 12, 4)); scrivi("ED", fmt(1 + 5 * Math.PI ** 2 * t * t / 8, 4));
    });
  }

  /* ---- gas di Bose in 3D: saturazione degli stati eccitati e condensato */
  function bose(box) {
    const Z32 = 2.612375348685488, Z52 = 1.341487257250917, Z12 = -1.4603545088095868;
    const g = (nu, z) => {
      if (z <= 0) return 0;
      const a = -Math.log(z);
      if (a < 0.01) {
        if (nu === 0.5) return Math.sqrt(Math.PI / a) + Z12;
        if (nu === 1.5) return Z32 - 2 * Math.sqrt(Math.PI * a) - Z12 * a;
        return Z52 - Z32 * a + (4 / 3) * Math.sqrt(Math.PI) * a ** 1.5;
      }
      let s = 0, zk = 1;
      for (let k = 1; k < 20000; k++) { zk *= z; const d = zk / k ** nu; s += d; if (d < 1e-10) break; }
      return s;
    };
    const zDi = r => { if (r >= Z32) return 1; let a = 0, b = 1; for (let i = 0; i < 50; i++) { const c = (a + b) / 2; if (g(1.5, c) > r) b = c; else a = c; } return (a + b) / 2; };
    const cv = t => {
      if (t <= 1) return 3.75 * Z52 / Z32 * t ** 1.5;
      const z = zDi(Z32 * t ** -1.5);
      return 3.75 * g(2.5, z) / g(1.5, z) - 2.25 * g(1.5, z) / g(0.5, z);
    };
    const curvaCv = Array.from({ length: 161 }, (_, i) => { const t = 0.01 + i * 2.49 / 160; return [t, cv(t)]; });
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const t = val("t"), r = Z32 * t ** -1.5, z = zDi(r), f0 = Math.max(0, 1 - t ** 1.5);
      const [r1, r2] = riquadri(G);
      const p1 = piano(G, r1, { x0: 0, x1: 1, y0: 0, y1: 4.2, tx: [0, 0.5, 1], ty: [0, 1, 2, 2.612, 4], ex: "z = e^βμ", ey: "ρλ³ e g₃/₂(z)" });
      p1.orizzontale(Z32, COL.filetto);
      p1.curva(x => g(1.5, x), COL.oro, 2.4, [], 0, 0.9995);
      p1.orizzontale(Math.min(r, 4.2), COL.caldo, [6, 4]);
      if (r <= Z32) p1.punto(z, r, COL.ink);
      else {
        const { ctx } = G; ctx.strokeStyle = COL.caldo; ctx.lineWidth = 5; ctx.beginPath();
        ctx.moveTo(p1.X(1) - 3, p1.Y(Z32)); ctx.lineTo(p1.X(1) - 3, p1.Y(Math.min(r, 4.2))); ctx.stroke();
        p1.punto(1, Z32, COL.ink);
        p1.scritta(0.97, Math.min((Z32 + Math.min(r, 4.2)) / 2, 4), "condensato ", COL.caldo, "right");
      }
      const p2 = piano(G, r2, { x0: 0, x1: 2.5, y0: 0, y1: 2.1, tx: [0, 1, 2], ty: [0, 1, 2], ex: "T / Tc", ey: "N₀/N e CV/NkB" });
      p2.orizzontale(1.5, COL.filetto);
      p2.curva(x => Math.max(0, 1 - x ** 1.5), COL.freddo, 2);
      const { ctx } = G; ctx.strokeStyle = COL.oro; ctx.lineWidth = 2.2; ctx.beginPath();
      curvaCv.forEach(([x, y], i) => (i ? ctx.lineTo(p2.X(x), p2.Y(y)) : ctx.moveTo(p2.X(x), p2.Y(y)))); ctx.stroke();
      p2.verticale(t, COL.tenue);
      p2.punto(t, f0, COL.freddo, 4.5); p2.punto(t, cv(t), COL.ink, 4.5);
      p2.scritta(0.08, 1.62, "classico 3/2", COL.tenue);
      scrivi("t", fmt(t, 2)); scrivi("r", fmt(r, 3)); scrivi("z", z >= 1 ? "1" : fmt(z, 4));
      scrivi("bm", z >= 1 ? "0" : fmt(Math.log(z), 3)); scrivi("f0", fmt(f0 * 100, 1) + " %"); scrivi("cv", fmt(cv(t), 3));
    });
  }

  /* ---- spettro di corpo nero: Planck contro Rayleigh-Jeans */
  function planck(box) {
    const H = 6.62607015e-34, K = 1.380649e-23, C = 2.99792458e8, SIGMA = 5.670374419e-8;
    const x3 = x => (x < 1e-6 ? x * x : x ** 3 / Math.expm1(x));
    const frazione = (a, b) => { // ∫_a^b x³/(e^x − 1) dx / (π⁴/15), Simpson
      const n = 400, h = (b - a) / n; let s = 0;
      for (let k = 0; k <= n; k++) s += x3(a + k * h) * (k === 0 || k === n ? 1 : k % 2 ? 4 : 2);
      return s * h / 3 / (Math.PI ** 4 / 15);
    };
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const T = 10 ** val("lt"), a = H * C / (K * T);           // x = a/λ con λ in metri
      const u = lnm => { const l = lnm * 1e-9, x = a / l; return x > 700 ? 0 : l ** -5 / Math.expm1(x); };
      const lmax = H * C / (4.965114231744277 * K * T) * 1e9;
      const umax = u(lmax);
      const x1 = Math.max(2000, Math.min(20000, lmax * 4));
      const p = piano(G, { x: 0, y: 0, w: G.w, h: G.h }, { x0: 0, x1, y0: 0, y1: 1.15, tx: [0, x1 / 4, x1 / 2, 3 * x1 / 4, x1].map(v => Math.round(v)), ty: [0, 0.5, 1], ex: "λ (nm)", ey: "densità di energia per lunghezza d'onda (unità del massimo)" });
      const { ctx } = G;
      const g = ctx.createLinearGradient(p.X(380), 0, p.X(750), 0);
      ["#7b2cbf", "#3a86ff", "#2ec4b6", "#8ac926", "#ffca3a", "#ff7f11", "#e63946"].forEach((c, i, v) => g.addColorStop(i / (v.length - 1), c));
      ctx.save(); ctx.globalAlpha = 0.16; ctx.fillStyle = g; ctx.fillRect(p.X(380), p.Y(1.15), p.X(750) - p.X(380), p.Y(0) - p.Y(1.15)); ctx.restore();
      p.curva(l => (K * T * (l * 1e-9) ** -4 / (H * C)) / umax, COL.freddo, 1.8, [7, 6], lmax * 0.45, x1);
      p.area(l => (l <= 0 ? 0 : u(l) / umax), "rgba(242,149,99,.22)");
      p.curva(l => (l <= 0 ? 0 : u(l) / umax), COL.oro, 2.4);
      p.verticale(lmax, COL.ink, [3, 3]);
      p.scritta(lmax, 1.08, " λmax", COL.ink, lmax > 0.8 * x1 ? "right" : "left");
      p.scritta(x1 * 0.98, 0.15, "Rayleigh-Jeans", COL.freddo, "right");
      scrivi("T", Math.round(T).toLocaleString("it-IT") + " K");
      scrivi("lm", Math.round(lmax).toLocaleString("it-IT") + " nm");
      scrivi("sig", sci(SIGMA * T ** 4) + " W/m²");
      scrivi("vis", fmt(100 * frazione(a / 750e-9, a / 380e-9), 1) + " %");
    });
  }

  /* ---- calore specifico dei solidi: Dulong-Petit, Einstein, Debye */
  function solidi(box) {
    const ein = t => { const x = 1 / t; if (x > 700) return 0; const e = Math.expm1(x); return x * x * (e + 1) / (e * e); };
    const integrando = x => { if (x < 1e-6) return x * x; const e = Math.expm1(x); return x ** 4 * (e + 1) / (e * e); };
    const deb = t => {
      const b = Math.min(1 / t, 60), n = 400, h = b / n; let s = 0;
      for (let k = 0; k <= n; k++) s += integrando(k * h) * (k === 0 || k === n ? 1 : k % 2 ? 4 : 2);
      return 3 * t ** 3 * s * h / 3;
    };
    const curvaE = [], curvaD = [];
    for (let i = 0; i <= 240; i++) { const t = 0.005 + i * 1.495 / 240; curvaE.push([t, ein(t)]); curvaD.push([t, deb(t)]); }
    const lg = [];
    for (let i = 0; i <= 200; i++) { const t = 10 ** (-2 + 2 * i / 200); lg.push([t, ein(t), deb(t)]); }
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const t = val("t"), [r1, r2] = riquadri(G);
      const { ctx } = G;
      const linea = (p, pts, col, lw = 2.2) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash([]); ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(p.X(x), p.Y(y)) : ctx.moveTo(p.X(x), p.Y(y)))); ctx.stroke(); };
      const p1 = piano(G, r1, { x0: 0, x1: 1.5, y0: 0, y1: 1.12, tx: [0, 0.5, 1, 1.5], ty: [0, 0.5, 1], ex: "T / θ", ey: "CV / 3NkB" });
      p1.orizzontale(1, COL.tenue, [6, 5]);
      linea(p1, curvaE, COL.freddo); linea(p1, curvaD, COL.oro);
      p1.verticale(t, COL.tenue);
      p1.punto(t, ein(t), COL.freddo, 4.5); p1.punto(t, deb(t), COL.ink, 4.5);
      p1.scritta(1.48, 1.04, "Dulong-Petit", COL.tenue, "right");
      // log-log: log10 C contro log10 T/θ
      const p2 = piano(G, r2, { x0: -2, x1: 0, y0: -7, y1: 0.3, tx: [-2, -1, 0].map(v => v), ty: [-6, -4, -2, 0], ex: "log₁₀ T/θ", ey: "log₁₀ CV/3NkB" });
      linea(p2, lg.filter(v => v[1] > 1e-7).map(([x, e]) => [Math.log10(x), Math.log10(e)]), COL.freddo);
      linea(p2, lg.map(([x, , d]) => [Math.log10(x), Math.log10(d)]), COL.oro);
      p2.curva(x => Math.log10(4 * Math.PI ** 4 / 5 * 10 ** (3 * x)), COL.caldo, 1.4, [4, 4], -2, -0.6);
      if (t <= 1) p2.verticale(Math.log10(t), COL.tenue);
      p2.scritta(-1.95, -6.6, "Einstein: esponenziale", COL.freddo);
      p2.scritta(-1.25, -3.1, "Debye: T³", COL.oro);
      scrivi("t", fmt(t, 3)); scrivi("e", fmt(ein(t), 4)); scrivi("d", fmt(deb(t), 4));
      scrivi("r", ein(t) > 1e-300 ? sci(deb(t) / ein(t)) : "enorme");
    });
  }

  /* ---- limite centrale: istogramma di somme di N variabili */
  function limiteCentrale(box) {
    const NOMI = ["uniforme", "esponenziale", "Cauchy"], M = 20000;
    const estrai = [() => Math.random(), () => -Math.log(1 - Math.random()), () => Math.tan(Math.PI * (Math.random() - 0.5))];
    const MU = [0.5, 1, 0], SIG = [Math.sqrt(1 / 12), 1, Infinity];
    let chiave = "", campione = [];
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const d = Math.round(val("d")), N = Math.round(val("n"));
      if (chiave !== d + "-" + N) {
        chiave = d + "-" + N; campione = new Float64Array(M);
        for (let m = 0; m < M; m++) {
          let s = 0; for (let i = 0; i < N; i++) s += estrai[d]();
          campione[m] = d === 2 ? s / N : (s - N * MU[d]) / (SIG[d] * Math.sqrt(N));
        }
      }
      const x0 = -5, x1 = 5, nb = 60, h = (x1 - x0) / nb, conta = new Array(nb).fill(0);
      let dentro = 0, s2 = 0, nn = 0;
      for (const v of campione) { if (v >= x0 && v < x1) conta[Math.floor((v - x0) / h)]++; if (Math.abs(v) < 1) dentro++; if (Math.abs(v) < 50) { s2 += v * v; nn++; } }
      const dens = conta.map(c => c / (M * h));
      const teoria = d === 2 ? x => 1 / (Math.PI * (1 + x * x)) : x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
      const cima = Math.max(0.45, ...dens) * 1.1;
      const p = piano(G, { x: 0, y: 0, w: G.w, h: G.h }, { x0, x1, y0: 0, y1: cima, tx: [-4, -2, 0, 2, 4], ty: [0, 0.2, 0.4], ex: d === 2 ? "media Y/N" : "somma standardizzata T", ey: "densità di probabilità" });
      const { ctx } = G;
      ctx.fillStyle = "rgba(242,149,99,.45)";
      dens.forEach((v, i) => { const xa = p.X(x0 + i * h) + 0.5, xb = p.X(x0 + (i + 1) * h) - 0.5; ctx.fillRect(xa, p.Y(v), xb - xa, p.Y(0) - p.Y(v)); });
      p.curva(teoria, COL.oro, 2.4);
      if (d === 2) p.curva(x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI), COL.freddo, 1.4, [6, 5]);
      scrivi("d", NOMI[d]); scrivi("n", String(N));
      scrivi("f1", fmt(100 * dentro / M, 1) + " %"); scrivi("f1t", d === 2 ? "50,0 %" : "68,3 %");
      scrivi("v", d === 2 ? "infinita" : fmt(s2 / nn, 3));
    });
  }

  /* ---- trasformata di Legendre: y = e^x e ψ(p) = p − p ln p */
  function legendre(box) {
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const x0 = val("x"), y0 = Math.exp(x0), p0 = y0, psi0 = y0 - p0 * x0;
      const [r1, r2] = riquadri(G, 0.5);
      const p1 = piano(G, r1, { x0: -2.5, x1: 1.6, y0: -1.5, y1: 5, tx: [-2, -1, 0, 1], ty: [0, 2, 4], ex: "x", ey: "y(x) = eˣ e la sua tangente" });
      p1.verticale(0, COL.filetto, []);
      p1.curva(x => Math.exp(x), COL.oro);
      p1.curva(x => y0 + p0 * (x - x0), COL.freddo, 1.6, [6, 5]);
      p1.punto(x0, y0, COL.ink); p1.punto(0, psi0, COL.caldo, 5.5);
      p1.scritta(0.08, psi0 - 0.45, "intercetta ψ", COL.caldo);
      const p2 = piano(G, r2, { x0: 0, x1: 5, y0: -3.2, y1: 1.4, tx: [0, 1, 2, 3, 4, 5], ty: [-3, -2, -1, 0, 1], ex: "p = pendenza", ey: "ψ(p) = p − p ln p" });
      p2.orizzontale(0, COL.filetto, []);
      p2.curva(q => (q <= 0 ? 0 : q - q * Math.log(q)), COL.caldo, 2.4, [], 0.001, 5);
      p2.curva(q => psi0 - x0 * (q - p0), COL.freddo, 1.4, [6, 5], 0.001, 5);
      p2.punto(p0, psi0, COL.ink);
      scrivi("x", fmt(x0, 2)); scrivi("y", fmt(y0, 3)); scrivi("p", fmt(p0, 3)); scrivi("psi", fmt(psi0, 3)); scrivi("dpsi", fmt(-Math.log(p0), 2));
    });
  }

  /* ---- Liouville: una goccia di condizioni iniziali nel pendolo, H = p²/2 − cos θ */
  function liouville(box) {
    const K = 1600, base = [];
    for (let i = 0; i < K; i++) { const r = 0.28 * Math.sqrt((i + 0.5) / K), a = i * 2.399963; base.push([1.0 + r * Math.cos(a), 0.0 + 0.9 * r * Math.sin(a), r / 0.28]); }
    const avvolgi = th => th - 2 * Math.PI * Math.floor((th + Math.PI) / (2 * Math.PI));
    laboratorioPiccolo(box, (G, val, scrivi) => {
      const T = val("t"), gam = val("g"), dt = 0.02, passi = Math.round(T / dt), smorza = Math.exp(-gam * dt / 2);
      const p = piano(G, { x: 0, y: 0, w: G.w, h: G.h }, { x0: -Math.PI, x1: Math.PI, y0: -2.6, y1: 2.6, tx: [-3, -2, -1, 0, 1, 2, 3], ty: [-2, -1, 0, 1, 2], ex: "angolo θ", ey: "impulso p" });
      [-0.6, 0, 0.5, 1, 1.6].forEach(E => {
        const f = th => 2 * (E + Math.cos(th));
        p.curva(th => (f(th) >= 0 ? Math.sqrt(f(th)) : NaN), E === 1 ? COL.tenue : COL.filetto, E === 1 ? 1.4 : 1, E === 1 ? [5, 4] : []);
        p.curva(th => (f(th) >= 0 ? -Math.sqrt(f(th)) : NaN), E === 1 ? COL.tenue : COL.filetto, E === 1 ? 1.4 : 1, E === 1 ? [5, 4] : []);
      });
      const { ctx } = G;
      for (const [th0, p0, c] of base) {
        let th = th0, pp = p0;
        for (let s = 0; s < passi; s++) {              // leapfrog, con l'attrito trattato esattamente a metà passo
          pp *= smorza; pp -= 0.5 * dt * Math.sin(th); th += dt * pp; pp -= 0.5 * dt * Math.sin(th); pp *= smorza;
        }
        ctx.fillStyle = termico(c);
        ctx.fillRect(p.X(avvolgi(th)) - 1, p.Y(pp) - 1, 2.2, 2.2);
      }
      scrivi("t", fmt(T, 1)); scrivi("g", fmt(gam, 2)); scrivi("a", fmt(100 * Math.exp(-gam * T), 1) + " %");
    });
  }

  /* ================= pannello laterale con la pagina originale (versione privata) ================= */
  function cassetto() {
    const box = document.querySelector(".cassetto");
    if (!box) return;
    const lib = window.pdfjsLib;
    const cv = box.querySelector("canvas"), tela = box.querySelector(".cassetto-tela"), stato = box.querySelector(".cassetto-stato");
    const etichetta = box.querySelector('[data-c="pag"]'), apri = box.querySelector('[data-c="apri"]');
    let doc = null, pag = 1, lavoro = null;
    async function mostra(n) {
      if (!lib) { stato.textContent = "Il visore PDF non si è caricato."; return; }
      if (!doc) {
        try { doc = await lib.getDocument("dispense/dispense.pdf").promise; }
        catch (e) { stato.textContent = "Non riesco ad aprire le dispense: " + e.message; return; }
      }
      pag = Math.max(1, Math.min(doc.numPages, n));
      etichetta.textContent = pag;
      apri.href = "dispense.html#p" + pag;
      const p = await doc.getPage(pag);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scala = (tela.clientWidth - 24) / p.getViewport({ scale: 1 }).width;
      const vp = p.getViewport({ scale: scala * dpr });
      if (lavoro) lavoro.cancel();
      cv.width = vp.width; cv.height = vp.height;
      cv.style.width = vp.width / dpr + "px"; cv.style.height = vp.height / dpr + "px";
      stato.hidden = true;
      lavoro = p.render({ canvasContext: cv.getContext("2d"), viewport: vp });
      try { await lavoro.promise; } catch (e) { /* pagina sostituita da una più recente */ }
    }
    document.addEventListener("click", e => {
      const a = e.target.closest('a.cit[href^="dispense.html#p"]');
      if (!a || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      box.hidden = false;
      document.body.classList.add("con-cassetto");
      mostra(+a.getAttribute("href").split("#p")[1]);
    });
    box.querySelector('[data-c="prec"]').onclick = () => mostra(pag - 1);
    box.querySelector('[data-c="succ"]').onclick = () => mostra(pag + 1);
    box.querySelector('[data-c="chiudi"]').onclick = () => { box.hidden = true; document.body.classList.remove("con-cassetto"); };
    addEventListener("keydown", e => { if (e.key === "Escape" && !box.hidden) box.querySelector('[data-c="chiudi"]').click(); });
    ridisegni.push(() => { if (!box.hidden) mostra(pag); });
  }

  /* ================= avvio ================= */
  cassetto();
  const avvii = { sciame, gas, ising, mappa, dispense, guscio, langevin, langmuir, vdw, "campo-medio": campoMedio, fermi, bose, planck, solidi, "limite-centrale": limiteCentrale, legendre, liouville };
  document.querySelectorAll("[data-lab]").forEach(el => {
    try { avvii[el.dataset.lab]?.(el); } catch (err) { console.error(err); }
  });
  document.querySelectorAll("figure.film").forEach(f => {
    try { film(f); } catch (err) { console.error(err); }
  });
  indice();
  requestAnimationFrame(ciclo);
})();
