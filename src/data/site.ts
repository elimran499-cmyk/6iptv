/* Inhalte und Preise wie auf 6iptv.com — ohne den Reseller-Bereich, der auf
   Wunsch entfaellt (auch aus der Navigation). */

export const BRAND = { name: '6IPTV', mail: 'support@6iptv.cc', land: 'Germany' };

export const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Sender', href: '#sender' },
  { label: 'Filme & Serien', href: '#filme' },
  { label: 'Senderliste', href: '#pakete' },
];

/**
 * Bestellungen und Kontakt laufen ueber WhatsApp — dieselbe Nummer wie auf
 * den Schwesterseiten. `wa.me` braucht sie in E.164 ohne Leerzeichen und
 * ohne fuehrendes Plus; sie steht nur hier.
 */
const NUMMER = '447832486269';
export const WHATSAPP = {
  chat: `https://wa.me/${NUMMER}`,
  bestellung: (paket: string, preis: string, geraete: number) =>
    `https://wa.me/${NUMMER}?text=` +
    encodeURIComponent(
      `Hallo 6IPTV, ich möchte das Paket "${paket}" für ${geraete} ` +
        `${geraete === 1 ? 'Gerät' : 'Geräte'} gleichzeitig für € ${preis} bestellen. ` +
        `Können Sie mir die Zahlungsdaten und die Aktivierungsschritte schicken?`,
    ),
};

export const VORTEILE = [
  {
    titel: 'Optimale Kundenbetreuung',
    text: 'Wir legen großen Wert auf einen optimalen Kundenkontakt. Schreiben Sie uns Ihr Anliegen per E-Mail – unsere Mitarbeiter werden Ihre Anfrage schnellstmöglich bearbeiten.',
  },
  {
    titel: 'Benutzerfreundliche Angebotsvielfalt',
    text: 'Bei uns erhalten Sie das IPTV-Rundum-Paket: über 80.000 Sender aus der ganzen Welt, Video-on-Demand und vieles mehr! So bleiben keine Wünsche mehr offen.',
  },
  {
    titel: 'Blitzschnelle Aktivierung',
    text: 'Erhalten Sie Ihre persönlichen Zugangsdaten nur wenige Minuten nach Bestellung während den Geschäftszeiten. Sie können somit sofort starten!',
  },
];

const LEISTUNGEN = [
  'Blitzschnelle Aktivierung',
  '24/7 Premium Support',
  'Schnelles Umschalten',
  '+80.000 Sender',
  '+200.000 Filme & Serien',
  'SD, HD, FHD & UHD',
  'M3U, MAG & Enigma',
  'Kostenloser VPN Zugang',
];

/**
 * Pakete nach Laufzeit, Preis je Anzahl gleichzeitiger Geraete.
 *
 * `preise` ist nach Geraetezahl indiziert (1, 2, 3). Der Aufschlag faellt
 * mit jedem weiteren Geraet geringer aus — ueblich in diesem Markt und der
 * Grund, warum das dritte Geraet nicht das Dreifache kostet.
 *
 * Nur die Ein-Geraete-Spalte ist vorgegeben; die Preise fuer zwei und drei
 * Geraete sind gesetzt, nicht abgestimmt. Hier anpassen, sonst nirgends —
 * Karten und WhatsApp-Nachricht lesen dieselben Werte.
 */
export const GERAETE_OPTIONEN = [1, 2, 3] as const;

export const PAKETE = [
  {
    badge: 'niederigster Preis! 😃',
    dauer: '30 Tage Premium IPTV',
    hervor: false,
    preise: { 1: '19.99', 2: '29.99', 3: '39.99' } as Record<number, string>,
    leistungen: LEISTUNGEN,
  },
  {
    badge: 'Am beliebtesten! 😍',
    // 12 Monate zahlen, 15 bekommen — deshalb "12+3" statt "365 Tage".
    dauer: '12+3 Monate Premium IPTV',
    hervor: true,
    preise: { 1: '144.99', 2: '199.99', 3: '280.00' } as Record<number, string>,
    leistungen: LEISTUNGEN,
  },
  {
    badge: 'für Einsteiger! 🌠',
    dauer: '90 Tage Premium IPTV',
    hervor: false,
    preise: { 1: '44.99', 2: '64.99', 3: '84.99' } as Record<number, string>,
    leistungen: LEISTUNGEN,
  },
];

export const ZAHLUNG = ['PayPal', 'VISA', 'Mastercard', 'paysafecard', 'Amazon', 'SOFORT'];

export const GERAETE = ['Formuler', 'Infomir', 'Smart IPTV', 'Android TV', 'Fire TV', 'Apple TV'];

export const KOMPATIBEL = [
  {
    titel: 'Android-Geräte',
    text: 'Smartphones, Tablets, Android-TV-Boxen und Sticks — etwa der Formuler Z11 Pro Max. Einfach eine IPTV-App wie IPTV Smarters Pro oder TiviMate installieren und die Zugangsdaten eintragen.',
  },
  {
    titel: 'Enigma2-Geräte',
    text: 'Receiver mit Enigma2 binden unser Angebot über M3U-Playlist oder Xtream Codes ein — inklusive EPG mit vollständiger Programmvorschau. Die Einrichtung dauert wenige Minuten, unser Support begleitet Sie mit einer deutschen Anleitung.',
  },
  {
    titel: 'Andere Geräte',
    text: 'Smart TVs von Samsung und LG, MAG-Boxen, Windows und macOS, iPhone und iPad. Unser Dienst läuft mit allen gängigen IPTV-Apps — darunter Smart IPTV, IBO Player und Duplex Play.',
  },
];

export const STATS = [
  {
    wert: '99%',
    titel: 'Kundenbetreuung rund um die Uhr',
    text: 'Unser Kundendienst steht Ihnen 24 Stunden täglich/sieben Tage die Woche zur Verfügung.',
  },
  {
    wert: '25.000+',
    titel: 'Kunden weltweit',
    text: 'Über 25.000 Kunden weltweit genießen bereits den Service von 6IPTV.',
  },
];

export const FAQ = [
  {
    frage: 'Welche Geräte sind kompatibel?',
    antwort: 'Unser Dienst steht allen Geräten sowie allen IPTV-Apps zur Verfügung: Android, Enigma2, MAG, Smart TV, Fire TV, Apple TV sowie Windows und macOS.',
  },
  {
    frage: 'Welches Gerät wird empfohlen?',
    antwort: 'Für den langfristigen Einsatz empfehlen wir Android-Geräte wie den Formuler Z11 Pro Max. Ein FireTV Stick ist die günstigere, aber in Leistung und Bedienung eingeschränkte Lösung.',
  },
  {
    frage: 'Wie schnell wird mein Zugang aktiviert?',
    antwort: 'Sie erhalten Ihre persönlichen Zugangsdaten wenige Minuten nach Bestellung während der Geschäftszeiten und können sofort starten.',
  },
  {
    frage: 'Welche Zahlungsmöglichkeiten gibt es?',
    antwort: 'PayPal, VISA, Mastercard, paysafecard, Amazon und SOFORT — flexible Zahlungsmöglichkeiten für Ihren Komfort.',
  },
  {
    frage: 'In welcher Qualität wird gestreamt?',
    antwort: 'SD, HD, FHD und UHD. Für die optimale Wiedergabe von Full-HD-Inhalten empfehlen wir eine stabile Verbindung ab 25 Mbit/s.',
  },
];
