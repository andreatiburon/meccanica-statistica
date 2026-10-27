// Icone a tratto, disegnate sul quadrato 24×24 e colorate con currentColor.
const Icona = ({ children, size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{children}</svg>
);

export const Gioca = p => <Icona {...p}><path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none" /></Icona>;
export const Pausa = p => <Icona {...p}><path d="M8 5v14M16 5v14" strokeWidth="3" /></Icona>;
export const Indietro = p => <Icona {...p}><path d="M15 5l-7 7 7 7" /></Icona>;
export const Avanti = p => <Icona {...p}><path d="M9 5l7 7-7 7" /></Icona>;
export const Su = p => <Icona {...p}><path d="M5 15l7-7 7 7" /></Icona>;
export const Giu = p => <Icona {...p}><path d="M5 9l7 7 7-7" /></Icona>;
export const Rivedi = p => <Icona {...p}><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" /></Icona>;
export const Chiudi = p => <Icona {...p}><path d="M6 6l12 12M18 6L6 18" /></Icona>;
export const Elenco = p => <Icona {...p}><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" fill="currentColor" /><circle cx="4.5" cy="12" r="1" fill="currentColor" /><circle cx="4.5" cy="18" r="1" fill="currentColor" /></Icona>;
export const Film = p => <Icona {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" /></Icona>;
export const Lab = p => <Icona {...p}><path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7.5 15h9" /></Icona>;
export const Formula = p => <Icona {...p}><path d="M14 4h-2.5a2 2 0 0 0-2 1.8L8 19.2A2 2 0 0 1 6 21H4.5M6 11h7M15 13l5 6M20 13l-5 6" /></Icona>;
export const Casa = p => <Icona {...p}><path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" /></Icona>;
export const Spunta = p => <Icona {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></Icona>;
export const Ingrandisci = p => <Icona {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></Icona>;
