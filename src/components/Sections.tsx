import React, { useState } from 'react';
import {
  Check, ChevronDown, Monitor, Rocket,
} from 'lucide-react';
import { ALL_CHANNELS } from '../data/catalog';
import { FAQ, GERAETE, GERAETE_OPTIONEN, KOMPATIBEL, PAKETE, STATS, VORTEILE, WHATSAPP } from '../data/site';
import { PayMark } from './PayMarks';
import { WhatsAppGlyph } from './Chrome';

/* Senderwand im Hero: alle Logos, auf drei Spalten reihum verteilt, damit
   keine Spalte den Rhythmus der Nachbarin wiederholt. Jede Spalte laeuft
   doppelt im DOM — so ist die Schleife nahtlos. */
const WALL_COLS = 3;
const WALL_LOGOS = ALL_CHANNELS.filter((c) => c.logo);
const WALL = Array.from({ length: WALL_COLS }, (_, col) =>
  WALL_LOGOS.filter((_, i) => i % WALL_COLS === col),
);
/* Bewusst ungleiche Dauern: so treffen sich die Spalten nie auf einer Linie. */
const WALL_SECONDS = [26, 32, 22];

export const Hero: React.FC = () => (
  <section id="top" className="relative overflow-hidden">
    <div className="relative mx-auto grid max-w-[1160px] items-center gap-12 px-6 pb-20 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <h1 className="max-w-[15ch] text-[clamp(2rem,4.6vw,3.5rem)] font-normal leading-[1.3] text-ink">
          Keine Lust auf Bufferings und Freezer?
          <br />
          <strong className="marker font-extrabold">6IPTV ist die Lösung!</strong>
          <br />
          Sie werden Teil des{' '}
          <strong className="marker font-extrabold">stabilsten Netzwerks</strong> der Welt 🌍
        </h1>

        <p className="mt-7 text-[15px] font-extrabold text-ink">
          Verifizierter Premium IPTV-Anbieter seit 2018
        </p>

        <div className="mt-6 h-px max-w-[520px] bg-line" />

        <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-muted">
          Welche App zum Empfang von IPTV ist für Sie am geeignetsten? Wenden Sie sich an unseren
          Kundenservice und lassen Sie sich jederzeit kompetent beraten!
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#pakete" className="btn btn-blue px-7 text-[15px]">
            <Rocket className="h-4 w-4" /> Paket wählen
          </a>
          <a
            href={WHATSAPP.chat}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-soft px-7 text-[15px]"
          >
            <WhatsAppGlyph className="h-4 w-4" /> Kontakt aufnehmen
          </a>
        </div>

        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-[14px] font-semibold text-muted">
          {['+80.000 Sender', '+200.000 Filme & Serien', 'SD, HD, FHD & UHD'].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green" /> {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[470px]">
        {/* Illustration von unDraw (undraw.co) — frei fuer kommerzielle
            Nutzung, keine Namensnennung noetig. Der Akzent der Vorlage
            (#6c63ff) ist auf das Markenblau umgefaerbt, das dunkle Violett
            auf das Navy der Wortmarke; sonst staende sie farblich neben
            der Seite. Die Originalillustration von 6iptv.com ist lizenzierte
            Stockgrafik und wurde nicht uebernommen. */}
        <img
          src="/illu/movie-night.svg"
          alt="Familie schaut gemeinsam fern"
          loading="eager"
          decoding="async"
          className="mb-6 w-full"
        />

      {/* Senderwand im Geraeterahmen — laufend statt statisch. */}
      <div
        className="wall relative mx-auto w-full max-w-[430px] rounded-[1.75rem] p-3.5 shadow-[0_30px_60px_-30px_rgba(19,36,68,.55)]"
        style={{ background: 'linear-gradient(160deg, #1b3057 0%, #101d38 100%)' }}
      >
        <div className="wall-mask flex h-[290px] gap-2.5 overflow-hidden sm:h-[340px]">
          {WALL.map((col, i) => (
            <div key={i} className="flex-1 overflow-hidden">
              <div
                className={`wall-col flex flex-col gap-2.5 will-change-transform ${i === 1 ? 'wall-col-reverse' : ''}`}
                style={{ animationDuration: `${WALL_SECONDS[i]}s` }}
              >
                {[...col, ...col].map((ch, j) => (
                  <span
                    key={`${ch.id}-${j}`}
                    className="flex h-[62px] shrink-0 items-center justify-center rounded-xl p-2 sm:h-[76px]"
                    style={{ background: 'rgba(255,255,255,.05)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.07)' }}
                  >
                    <img
                      src={ch.logo}
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      decoding="async"
                      className="h-full max-h-9 w-full object-contain sm:max-h-11"
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-white/[.06] px-3.5 py-2.5">
          <span>
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/50">
              Jetzt live
            </span>
            <span className="block text-[13px] font-bold text-white">80.000+ Sender · 4K</span>
          </span>
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
          </span>
        </div>
      </div>
      </div>
    </div>
  </section>
);

/* Je Vorteil eine Illustration statt einer Icon-Kachel — so haelt es auch
   die Vorlage. Alle von unDraw, auf die Markenfarben umgefaerbt. */
const VORTEIL_BILDER = ['/illu/support.svg', '/illu/auswahl.svg', '/illu/schnell.svg'];

export const Vorteile: React.FC = () => (
  <section id="vorteile" className="bg-surface py-16 sm:py-24">
    <div className="mx-auto grid max-w-[1160px] gap-10 px-6 md:grid-cols-3">
      {VORTEILE.map((v, i) => (
        <article key={v.titel}>
          <img
            src={VORTEIL_BILDER[i]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-[170px] w-full object-contain object-left"
          />
          <h2 className="mt-7 text-[26px] font-extrabold leading-tight text-ink">{v.titel}</h2>
          <div className="mt-5 h-px bg-line" />
          <p className="mt-5 text-[15px] leading-relaxed text-muted">{v.text}</p>
        </article>
      ))}
    </div>
  </section>
);

export const Pakete: React.FC = () => {
  const [geraete, setGeraete] = useState<number>(1);
  return (
    <section id="pakete" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="text-center">
          <span className="inline-block rounded-md bg-blue-soft px-3 py-1.5 text-[13px] font-bold text-blue">
            von Profis empfohlen
          </span>
          <h2 className="mx-auto mt-5 max-w-[16ch] text-[clamp(1.9rem,5vw,3rem)] font-extrabold leading-tight text-ink">
            Wählen Sie Ihr Premium 6IPTV-Paket
          </h2>

          {/* Geraeteumschalter: alle drei Karten zeigen danach den Preis fuer
              die gewaehlte Anzahl gleichzeitiger Verbindungen. */}
          <p className="mt-8 text-[13px] font-bold uppercase tracking-[0.16em] text-muted">
            Wie viele Geräte gleichzeitig?
          </p>
          <div className="mt-4 inline-flex rounded-xl border border-line bg-surface p-1">
            {GERAETE_OPTIONEN.map((n) => {
              const aktiv = geraete === n;
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={aktiv}
                  onClick={() => setGeraete(n)}
                  className={`flex min-h-[44px] items-center gap-2 rounded-lg px-5 text-[14.5px] font-bold transition-colors ${
                    aktiv ? 'btn-blue' : 'text-muted hover:text-ink'
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                  {n} {n === 1 ? 'Gerät' : 'Geräte'}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PAKETE.map((p) => {
            const preis = p.preise[geraete];
            return (
              <article
                key={p.dauer}
                className={`relative flex flex-col rounded-2xl p-7 ${p.hervor ? 'text-white' : 'card'}`}
                style={
                  p.hervor
                    ? { background: 'linear-gradient(160deg, var(--color-blue) 0%, var(--color-blue-deep) 100%)' }
                    : undefined
                }
              >
                <p className={`text-[14px] font-bold ${p.hervor ? 'text-white/85' : 'text-muted'}`}>{p.badge}</p>
                <h3 className="mt-3 flex items-baseline gap-1">
                  <span className="text-[40px] font-extrabold leading-none">€ {preis}</span>
                  <span className={`text-[15px] font-semibold ${p.hervor ? 'text-white/70' : 'text-muted'}`}>
                    /einmalig
                  </span>
                </h3>
                <p className={`mt-3 text-[15px] font-bold ${p.hervor ? 'text-white' : 'text-ink'}`}>{p.dauer}</p>
                <p className={`mt-1 flex items-center gap-1.5 text-[13.5px] ${p.hervor ? 'text-white/75' : 'text-muted'}`}>
                  <Monitor className="h-3.5 w-3.5" />
                  {geraete} {geraete === 1 ? 'Gerät' : 'Geräte'} gleichzeitig
                </p>

                <ul className="mt-6 space-y-3.5">
                  {p.leistungen.map((l) => (
                    <li key={l} className={`flex items-center gap-2.5 text-[14.5px] ${p.hervor ? 'text-white/90' : 'text-ink'}`}>
                      <Check className={`h-4 w-4 shrink-0 ${p.hervor ? 'text-white' : 'text-green'}`} />
                      {l}
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP.bestellung(p.dauer, preis, geraete)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn mt-7 w-full px-6 text-[15px] ${p.hervor ? 'bg-[#0b3aa0] text-white hover:bg-[#092e80]' : 'btn-blue'}`}
                >
                  <WhatsAppGlyph className="h-4 w-4" /> Jetzt bestellen!
                </a>
              </article>
            );
          })}
        </div>

        {/* Zahlungsarten in blauer Kontur, wie im Vorbild — als eigene SVGs
            gezeichnet, nicht als fremde Bilddateien uebernommen. */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          {(['paypal', 'visa', 'mastercard', 'paysafecard', 'amazon', 'sofort'] as const).map((m) => (
            <span
              key={m}
              className="flex h-16 w-[122px] items-center justify-center rounded-xl border-2 border-blue/35 bg-surface px-3"
            >
              <PayMark name={m} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Geraete: React.FC = () => (
  <section className="bg-surface py-16 sm:py-24">
    <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h2 className="max-w-[20ch] text-[clamp(1.6rem,3.4vw,2.1rem)] font-extrabold leading-snug text-ink">
          Unser Dienst steht allen Geräten sowie allen IPTV-Apps zur Verfügung.
        </h2>
        <img
          src="/illu/geraete.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="mt-8 h-[190px] w-full object-contain object-left"
        />
      </div>
      <div className="card grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-3">
        {GERAETE.map((g) => (
          <span key={g} className="flex h-24 items-center justify-center bg-surface text-[15px] font-bold text-muted">
            {g}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export const SmartTv: React.FC = () => (
  <section className="py-16 sm:py-24">
    <div className="mx-auto grid max-w-[1160px] gap-8 px-6 lg:grid-cols-3">
      <div>
        <h2 className="max-w-[14ch] text-[clamp(1.9rem,4.4vw,2.8rem)] font-extrabold leading-tight text-ink">
          Herausragendes TV-Erlebnis auf Ihrem Smart TV
        </h2>
        <div className="mt-6 h-px bg-line" />
        <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-muted">
          Über 25.000 Kunden weltweit genießen bereits den Service von 6IPTV.
        </p>
        <a href="#pakete" className="btn btn-soft mt-6 px-5 text-[14.5px]">
          6IPTV Kundenportal ›
        </a>
      </div>

      <article className="card flex flex-col items-center p-8 text-center">
        <img
          src="/illu/home-cinema.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-[150px] w-full object-contain"
        />
        <h3 className="mt-6 text-[19px] font-extrabold text-ink">Bestes Preis-Leistungs-Verhältnis</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Sichern Sie sich größte Auswahl und beste Verfügbarkeit zu günstigen Preisen.
        </p>
      </article>

      <div className="grid gap-8">
        {STATS.map((s) => (
          <article key={s.titel} className="rounded-2xl bg-blue-soft p-8 text-center">
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-green text-[22px] font-extrabold text-blue">
              {s.wert}
            </span>
            <h3 className="mt-5 text-[17px] font-extrabold text-ink">{s.titel}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const Kompatibel: React.FC = () => (
  <section className="bg-surface py-16 sm:py-24">
    <div className="mx-auto max-w-[1160px] px-6">
      <h2 className="mx-auto max-w-[24ch] text-center text-[clamp(1.7rem,4vw,2.5rem)] font-extrabold leading-tight text-ink">
        Kompatibilität: Nutzen Sie Ihr bevorzugtes Gerät für unser IPTV-Angebot
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {KOMPATIBEL.map((k) => (
          <article key={k.titel} className="card p-7">
            <h3 className="text-[20px] font-extrabold text-ink">{k.titel}</h3>
            <div className="mt-4 h-px bg-line" />
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{k.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const Faq: React.FC = () => {
  const [offen, setOffen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[820px] px-6">
        <img
          src="/illu/fragen.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="mx-auto h-[150px] w-full max-w-[300px] object-contain"
        />
        <h2 className="mt-8 text-center text-[clamp(1.8rem,4.4vw,2.6rem)] font-extrabold text-ink">
          Häufig gestellte Fragen (FAQ)
        </h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((f, i) => {
            const auf = offen === i;
            return (
              <div key={f.frage} className="card overflow-hidden">
                <button
                  type="button"
                  aria-expanded={auf}
                  onClick={() => setOffen(auf ? null : i)}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-[16px] font-bold text-ink">{f.frage}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-blue transition-transform ${auf ? 'rotate-180' : ''}`} />
                </button>
                {auf && (
                  <p className="border-t border-line px-6 py-4 text-[15px] leading-relaxed text-muted">{f.antwort}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
