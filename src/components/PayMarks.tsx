import React from 'react';

/**
 * Zahlungsmarken als eigene SVGs, einfarbig in Markenblau — die Anmutung der
 * Vorlage (blaue Kontur, blaues Zeichen), ohne fremde Logodateien zu
 * uebernehmen. Bewusst schlicht gehalten: sie sind Hinweis auf die
 * akzeptierten Zahlungswege, kein Markenauftritt.
 */
type Name = 'paypal' | 'visa' | 'mastercard' | 'paysafecard' | 'amazon' | 'sofort';

const BLAU = 'var(--color-blue)';

export const PayMark: React.FC<{ name: Name }> = ({ name }) => {
  switch (name) {
    case 'paypal':
      return (
        <svg viewBox="0 0 64 36" className="h-8 w-auto" role="img" aria-label="PayPal">
          {/* Zwei versetzte P — die Doppel-P-Silhouette der Marke. */}
          <path
            d="M14 6h10.5c5 0 8 2.6 7.2 7.3-.8 4.8-4.4 7.2-9.6 7.2h-3.4L17.4 30H12L14 6Zm4.5 4-.9 6.6h2.9c2.5 0 4.2-1.1 4.6-3.4.4-2.3-.8-3.2-3.2-3.2h-3.4Z"
            fill={BLAU}
          />
          <path
            d="M26 10h10.5c5 0 8 2.6 7.2 7.3-.8 4.8-4.4 7.2-9.6 7.2h-3.4L29.4 34H24L26 10Z"
            fill={BLAU}
            opacity="0.55"
          />
        </svg>
      );
    case 'visa':
      return (
        <span className="text-[22px] font-extrabold italic tracking-tight" style={{ color: BLAU }}>
          VISA
        </span>
      );
    case 'mastercard':
      return (
        <span className="flex flex-col items-center gap-0.5">
          <svg viewBox="0 0 48 30" className="h-6 w-auto" role="img" aria-label="Mastercard">
            <circle cx="18" cy="15" r="12" fill="none" stroke={BLAU} strokeWidth="2.4" />
            <circle cx="30" cy="15" r="12" fill="none" stroke={BLAU} strokeWidth="2.4" />
          </svg>
          <span className="text-[9px] font-bold tracking-tight" style={{ color: BLAU }}>
            mastercard
          </span>
        </span>
      );
    case 'paysafecard':
      return (
        <span className="flex flex-col items-center gap-0.5">
          <svg viewBox="0 0 24 24" className="h-5 w-auto" role="img" aria-label="paysafecard">
            <rect x="5" y="10" width="14" height="10" rx="2" fill={BLAU} />
            <path d="M8.5 10V7.5a3.5 3.5 0 1 1 7 0V10" fill="none" stroke={BLAU} strokeWidth="2" />
          </svg>
          <span className="text-[9px] font-bold" style={{ color: BLAU }}>
            <span className="font-extrabold">paysafe</span>card
          </span>
        </span>
      );
    case 'amazon':
      return (
        <span className="flex flex-col items-center">
          <span className="text-[16px] font-extrabold lowercase tracking-tight" style={{ color: BLAU }}>
            amazon
          </span>
          <svg viewBox="0 0 60 10" className="h-2 w-[56px]" aria-hidden="true">
            <path d="M2 3c14 7 42 7 56 0" fill="none" stroke={BLAU} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      );
    case 'sofort':
      return (
        <span className="text-[16px] font-extrabold italic tracking-tight" style={{ color: BLAU }}>
          SOFORT
        </span>
      );
  }
};
