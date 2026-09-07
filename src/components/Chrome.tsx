import React, { useState } from 'react';
import { Check, MapPin, Menu, X } from 'lucide-react';
import { BRAND, NAV, WHATSAPP } from '../data/site';

export const WhatsAppGlyph: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7.59.26 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

/**
 * Wortmarke als PNG statt Inline-SVG.
 *
 * Der Grund ist Auffindbarkeit: eine Bilddatei mit `alt` und fester Adresse
 * taucht in der Bildersuche auf und laesst sich als `logo` im JSON-LD und
 * als Open-Graph-Bild referenzieren — Inline-SVG kann das alles nicht.
 * Dieselbe Datei liefert auch die Favicons (public/logo.png, erzeugt aus
 * denselben drei Scheiben: #1d3e78 / #2f63b1 / #3372f6).
 */
export const Logo: React.FC<{ className?: string }> = ({ className = 'h-9' }) => (
  <a href="#top" className={`flex items-center no-underline ${className}`}>
    <img
      src="/logo.png"
      alt={`${BRAND.name} — Premium IPTV`}
      width={441}
      height={200}
      loading="eager"
      decoding="async"
      className="h-full w-auto"
    />
  </a>
);

/**
 * Kopfzeile als schwebende weisse Karte ueber dem cremefarbenen Grund — die
 * Anmutung der Vorlage. Der Punkt „Reseller werden" fehlt bewusst; er war
 * ausdruecklich nicht gewuenscht.
 */
export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="nav-card mx-auto flex max-w-[1160px] items-center justify-between rounded-2xl px-5 py-3.5">
        <div className="flex items-center gap-5">
          <Logo />
          <span className="hidden h-7 w-px bg-line lg:block" />
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((l) => (
            <a key={l.label} href={l.href} className="text-[15px] font-semibold text-ink no-underline hover:text-blue">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Kontakt fuehrt direkt in den WhatsApp-Chat; der Login-Button
              entfaellt, es gibt keinen Kundenbereich zu betreten. */}
          <a
            href={WHATSAPP.chat}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-soft px-4 text-[15px]"
          >
            <WhatsAppGlyph className="h-4 w-4" /> Kontakt
          </a>
          <button
            type="button"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-card mx-auto mt-2 max-w-[1160px] rounded-2xl px-5 py-3 lg:hidden">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center border-b border-line text-[16px] font-semibold text-ink no-underline last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

/** Schmale Zeile unter der Kopfzeile: Land, Support-Adresse, Social. */
export const TopBar: React.FC = () => (
  <div className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-x-6 gap-y-2 px-9 py-4 text-[13.5px] text-muted">
    <span className="flex items-center gap-1.5">
      <MapPin className="h-4 w-4" /> {BRAND.land}
    </span>
  </div>
);

export const Footer: React.FC = () => (
  <footer className="border-t border-line bg-surface">
    <div className="mx-auto grid max-w-[1160px] gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Logo />
        <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-muted">
          Premium IPTV aus Deutschland: über 80.000 Sender und 200.000 Filme & Serien in SD bis UHD, blitzschnelle
          Aktivierung und Support rund um die Uhr.
        </p>
      </div>
      <div>
        <h3 className="text-[13px] font-extrabold tracking-[0.14em] text-blue">SEITEN</h3>
        <ul className="mt-4 space-y-2.5">
          {NAV.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-[14px] font-semibold text-muted no-underline hover:text-blue">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-[13px] font-extrabold tracking-[0.14em] text-blue">KONTAKT</h3>
        <ul className="mt-4 space-y-2.5 text-[14px] text-muted">
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {BRAND.land}</li>
          <li>
            <a
              href={WHATSAPP.chat}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted no-underline hover:text-blue"
            >
              <WhatsAppGlyph className="h-4 w-4" /> Chat über WhatsApp
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-[13px] font-extrabold tracking-[0.14em] text-blue">GUT ZU WISSEN</h3>
        <ul className="mt-4 space-y-2.5 text-[14px] text-muted">
          {['Kostenloser VPN Zugang', '24/7 Premium Support', 'M3U, MAG & Enigma'].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-line py-5 text-center text-[13px] text-muted">
      © 2026 {BRAND.name} — Premium IPTV. Alle Rechte vorbehalten.
    </div>
  </footer>
);
