#!/usr/bin/env python3
"""Genera tutti i film del sito in 1080p a 60 fps e li copia in sito/galleria/video/.

Uso (con il virtualenv di Manim):
  python sito/animazioni/rendi.py            # tutti i film
  python sito/animazioni/rendi.py cn-modi    # solo quelli indicati, per nome di uscita

Per ogni film: rendering con Manim, ricompressione H.264 con faststart e un fotogramma chiave all'inizio di
ogni passo (così saltare a un passo è istantaneo), fotogramma di anteprima (.jpg) preso dall'ultimo passo.
I passi (.json) li scrive la scena stessa.

Variabili d'ambiente: FILM_USCITA (cartella di uscita), FILM_FPS (fotogrammi al secondo, 60 di default).
"""
import os
import json
import subprocess
import sys
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

QUI = Path(__file__).resolve().parent
VIDEO = Path(os.environ.get("FILM_USCITA", QUI.parent / "galleria" / "video"))
MEDIA = Path.home() / ".cache" / "manim-media"
FPS = int(os.environ.get("FILM_FPS", "60"))
MANIM = Path(sys.executable).parent / "manim"

FILM = [
    ("scene.py", "GasMaxwell", "gas-maxwell"),
    ("scene.py", "IsingRaffreddamento", "ising"),
    ("scene.py", "CondensazioneBE", "bose-einstein"),
    ("scene.py", "SpettroPlanck", "planck"),
    ("microcanonico.py", "ScambioEnergia", "micro-scambio-energia"),
    ("microcanonico.py", "ParadossoGibbs", "micro-gibbs"),
    ("microcanonico.py", "DueLivelli", "micro-due-livelli"),
    ("canonico.py", "SerbatoioBoltzmann", "can-serbatoio"),
    ("canonico.py", "PiccoEnergia", "can-picco-energia"),
    ("gran_canonico.py", "FluttuazioniN", "gc-fluttuazioni-n"),
    ("gran_canonico.py", "PistoneNPT", "gc-npt"),
    ("gas_reali.py", "MayerB2", "reali-mayer"),
    ("gas_reali.py", "IsotermeVdW", "reali-isoterme"),
    ("gas_reali.py", "CostruzioneMaxwell", "reali-maxwell"),
    ("ising.py", "Ising1D", "ising-1d"),
    ("ising.py", "BraggWilliams", "ising-bragg-williams"),
    ("gas_quantistici.py", "Occupazioni", "qg-occupazioni"),
    ("gas_quantistici.py", "TreStatistiche", "qg-tre-statistiche"),
    ("gas_quantistici.py", "MareDiFermi", "qg-mare-fermi"),
    ("gas_quantistici.py", "SaturazioneBE", "qg-saturazione"),
    ("corpo_nero.py", "ModiCavita", "cn-modi"),
    ("corpo_nero.py", "CalorSpecificoSolidi", "cn-solidi"),
]


def rendi(voce):
    file, scena, uscita = voce
    r = subprocess.run([str(MANIM), "-r", "1920,1080", "--frame_rate", str(FPS), "--media_dir", str(MEDIA),
                        "--disable_caching", "-v", "WARNING", str(QUI / file), scena], capture_output=True, text=True)
    if r.returncode:
        return f"ERRORE {uscita}\n{r.stderr[-1500:]}"
    grezzo = MEDIA / "videos" / Path(file).stem / f"1080p{FPS}" / f"{scena}.mp4"
    finale = VIDEO / f"{uscita}.mp4"
    dati = json.loads((VIDEO / f"{uscita}.json").read_text())
    chiavi = ",".join(f"{p['t']:.3f}" for p in dati["passi"])
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(grezzo), "-c:v", "libx264", "-crf", "24",
                    "-preset", "slow", "-tune", "animation", "-pix_fmt", "yuv420p", "-g", str(FPS), "-force_key_frames", chiavi,
                    "-movflags", "+faststart", "-an", str(finale)], check=True)
    ultimo = dati["passi"][-1]["t"]
    t = ultimo + 0.75 * (dati["durata"] - ultimo)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", f"{t:.2f}", "-i", str(finale), "-frames:v", "1",
                    "-vf", "scale=1280:-1", "-q:v", "4", str(VIDEO / f"{uscita}.jpg")], check=True)
    return f"ok {uscita}: {finale.stat().st_size / 1e6:.1f} MB, {len(dati['passi'])} passi, {dati['durata']:.0f} s"


if __name__ == "__main__":
    scelti = set(sys.argv[1:])
    lista = [f for f in FILM if not scelti or f[2] in scelti]
    with ProcessPoolExecutor(max_workers=3) as ex:
        for esito in ex.map(rendi, lista):
            print(esito, flush=True)
