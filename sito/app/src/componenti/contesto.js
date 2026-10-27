import { createContext, useContext } from "react";

// Contesto di una lezione: modo di impaginazione e richiamo del banco (il pannello fisso a destra sull'iPad orizzontale).
export const LezioneCtx = createContext({ largo: false, mostra: () => {}, slug: null });
export const useLezione = () => useContext(LezioneCtx);
