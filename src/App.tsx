import React from 'react';
import { Footer, Navbar, TopBar } from './components/Chrome';
import { Faq, Geraete, Hero, Kompatibel, Pakete, SmartTv, Vorteile } from './components/Sections';
import { Filme, Sender } from './components/Marquees';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream font-sans text-ink">
      <Navbar />
      <TopBar />
      <main>
        <Hero />
        <Sender />
        <Filme />
        {/* Preise folgen direkt auf die Serien: wer die Auswahl gesehen hat,
            soll nicht erst an drei Textspalten vorbei. */}
        <Pakete />
        <Vorteile />
        <Geraete />
        <SmartTv />
        <Kompatibel />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
