import React from 'react';
import { ALL_CHANNELS, CHANNELS_DOCS, CHANNELS_FAMILY_SPORT, Channel, TOTAL_CHANNELS, TOTAL_VOD, VOD_TITLES } from '../data/catalog';
import { useReducedMotion } from '../hooks/useReducedMotion';

/* Laufbaender direkt unter dem Hero: erst die Sender, dann Filme & Serien.
   Beide Spuren werden im DOM verdoppelt, damit translateX(-50%) auf der
   Kopie landet und die Schleife nahtlos wirkt. Auf dem Telefon haelt sich
   die Zahl der Kacheln an die Viewportbreite — sonst layoutet das Geraet
   Dutzende Elemente, die niemand sieht. */

const IS_PHONE = typeof window !== 'undefined' && window.innerWidth < 640;
const TILE_UNIT_PX = 208;
const MIN_PERIOD_PX = Math.max(1100, (typeof window !== 'undefined' ? window.innerWidth : 1400) * 1.6);

const repeatsFor = (length: number) => {
  const needed = Math.ceil((2 * MIN_PERIOD_PX) / (length * TILE_UNIT_PX));
  const even = needed % 2 === 0 ? needed : needed + 1;
  return Math.max(2, even);
};

/**
 * Senderkachel. Die Marken sind ueberwiegend weiss und fuer dunklen Grund
 * gezeichnet — auf heller Karte verschwinden sie schlicht. Die Platte ist
 * blaustichig statt neutral schwarz, damit sie zur Palette passt, und traegt
 * eine feine Innenkante plus Qualitaetschip: so wirkt die Reihe wie ein
 * Programmangebot und nicht wie eine Logoliste.
 */
const ChannelTile: React.FC<{ channel: Channel }> = ({ channel }) => (
  <figure
    className="tile-lift relative flex h-24 w-40 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl px-3 pb-6 pt-3 sm:h-28 sm:w-48"
    style={{
      background: 'linear-gradient(160deg, #1b3057 0%, #101d38 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.09)',
    }}
    title={channel.name}
  >
    {/* Bewusst `eager`: die Kacheln laufen. Lazy geladen tauchen sie erst auf,
        wenn sie schon im Bild sind — man sah leere Platten durchziehen. Es
        sind 26 kleine Dateien, die zusammen unter 160 KB bleiben. */}
    <img
      src={channel.logo}
      alt={channel.name}
      loading="eager"
      decoding="async"
      className="h-full max-h-11 w-full object-contain sm:max-h-14"
    />
    {/* Qualitaet und Name unten in der Kachel — klein, damit das Logo fuehrt. */}
    <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 pb-2 text-[9.5px] font-bold uppercase tracking-[0.1em]">
      <span className="truncate text-white/45">{channel.name}</span>
      <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-white/70">
        {channel.quality.replace(' Ultra HD', 'K').replace(' 60FPS', '')}
      </span>
    </figcaption>
  </figure>
);

const Strip: React.FC<{ label: string; list: Channel[]; reverse?: boolean; reduce: boolean }> = ({
  label,
  list,
  reverse,
  reduce,
}) => {
  const repeats = repeatsFor(list.length);
  const duration = `${Math.round((repeats / 2) * list.length * 7.5)}s`;
  const kopf = (
    <p className="mx-auto mb-3 max-w-[1160px] px-6 text-[11px] font-extrabold uppercase tracking-[0.22em] text-blue">
      {label}
    </p>
  );
  if (reduce) {
    return (
      <div>
        {kopf}
        <div className="rail-snap flex gap-4 overflow-x-auto px-6 pb-1">
          {list.map((c) => <ChannelTile key={c.id} channel={c} />)}
        </div>
      </div>
    );
  }
  return (
    <div>
      {kopf}
      <div className="marquee-row edge-fade overflow-hidden">
      <div
        className={`marquee-track flex w-max gap-4 will-change-transform ${reverse ? 'marquee-track-reverse' : ''}`}
        style={{ animationDuration: duration }}
      >
        {Array.from({ length: repeats }).flatMap((_, r) =>
          list.map((c, i) => <ChannelTile key={`${c.id}-${r}-${i}`} channel={c} />),
        )}
        </div>
      </div>
    </div>
  );
};

export const Sender: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <section id="sender" className="bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-[1160px] px-6">
        <h2 className="text-[clamp(1.7rem,3.6vw,2.4rem)] font-extrabold leading-tight text-ink">
          {TOTAL_CHANNELS} Sender aus der ganzen Welt
        </h2>
        <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted">
          Von Doku und Unterhaltung über Sport und Musik bis zum Kinderprogramm — in SD, HD, FHD
          und UHD, mit schnellem Umschalten.
        </p>
      </div>
      <div className="mt-9 space-y-8">
        <Strip label="Doku & Unterhaltung" list={CHANNELS_DOCS} reduce={reduce} />
        <Strip label="Sport, Musik & Familie" list={CHANNELS_FAMILY_SPORT} reverse reduce={reduce} />
      </div>
    </section>
  );
};

/* Poster 2:3 mit Verlauf ueber dem unteren Drittel, damit der Titel auf
   jedem Motiv lesbar bleibt. */
const HALF = Math.ceil(VOD_TITLES.length / 2);
const PER_ROW = IS_PHONE ? 8 : HALF;
const ROW_A = VOD_TITLES.slice(0, HALF).slice(0, PER_ROW);
const ROW_B = VOD_TITLES.slice(HALF).slice(0, PER_ROW);

const PosterTile: React.FC<{ title: (typeof VOD_TITLES)[number] }> = ({ title }) => (
  <article className="tile-lift group relative aspect-[2/3] w-[132px] shrink-0 overflow-hidden rounded-2xl bg-cream sm:w-[164px]">
    <img
      src={title.poster}
      alt={`${title.title} (${title.year})`}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Qualitaetsplakette: das Angebot laeuft bis UHD, und genau das soll an
        jedem Titel ablesbar sein. Glasoptik, damit sie ueber jedem Motiv
        sitzt, ohne es zuzudecken. */}
    <span
      className="absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-white backdrop-blur-sm"
      style={{ background: 'rgba(10,18,34,.55)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.22)' }}
    >
      4K
    </span>

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5"
      style={{ background: 'linear-gradient(180deg, rgba(16,29,56,0) 0%, rgba(16,29,56,.92) 100%)' }}
    />

    <div className="absolute inset-x-0 bottom-0 p-2.5">
      <h3 className="truncate text-[12.5px] font-extrabold leading-tight text-white sm:text-[13.5px]">
        {title.title}
      </h3>
      <p className="mt-0.5 truncate text-[10.5px] font-semibold uppercase tracking-wide text-white/55">
        {title.genre} · {title.year}
      </p>
    </div>
  </article>
);

const PosterRow: React.FC<{ reverse?: boolean; reduce: boolean }> = ({ reverse, reduce }) => {
  const list = reverse ? ROW_B : ROW_A;
  if (reduce) {
    return (
      <div className="rail-snap flex gap-4 overflow-x-auto px-6 pb-1">
        {VOD_TITLES.map((t) => <PosterTile key={t.id} title={t} />)}
      </div>
    );
  }
  return (
    <div className="marquee-row edge-fade overflow-hidden">
      <div
        className={`marquee-track flex w-max gap-4 will-change-transform ${reverse ? 'marquee-track-reverse' : ''}`}
        style={{ animationDuration: `${Math.round(list.length * (reverse ? 8.5 : 7.5))}s` }}
      >
        {[...list, ...list].map((t, i) => <PosterTile key={`${t.id}-${i}`} title={t} />)}
      </div>
    </div>
  );
};

export const Filme: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <section id="filme" className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1160px] px-6">
        <h2 className="text-[clamp(1.7rem,3.6vw,2.4rem)] font-extrabold leading-tight text-ink">
          {TOTAL_VOD} Filme &amp; Serien in 4K
        </h2>
        <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted">
          Die komplette Video-on-Demand-Bibliothek ist im Paket enthalten und wird laufend
          erweitert — in SD, HD, FHD und UHD, jederzeit abrufbar und ohne Aufpreis.
        </p>
      </div>
      <div className="mt-8 space-y-4 overflow-x-hidden">
        <PosterRow reduce={reduce} />
        <PosterRow reverse reduce={reduce} />
      </div>
    </section>
  );
};
