// I laboratori del nuovo sito, per nome (lo stesso dei segnaposto nella wiki e di LABORATORI in sito.py).
import Gas from "./Gas.jsx";
import Ising from "./Ising.jsx";
import Langevin from "./Langevin.jsx";
import { Bose, CampoMedio, Fermi, Guscio, Langmuir, Legendre, LimiteCentrale, Liouville, Planck, Solidi, Vdw } from "./piccoli.jsx";

export default {
  gas: Gas, ising: Ising, langevin: Langevin, guscio: Guscio, langmuir: Langmuir, vdw: Vdw, "campo-medio": CampoMedio,
  fermi: Fermi, bose: Bose, planck: Planck, solidi: Solidi, "limite-centrale": LimiteCentrale, legendre: Legendre, liouville: Liouville,
};
