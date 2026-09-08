/**
 * SSR-Einstiegspunkt fuer den Prerender-Schritt.
 *
 * Wird von Vite als eigenes Bundle fuer Node gebaut (`vite build --ssr`),
 * damit derselbe Ablauf wie auf den vier deutschen Seiten gilt — dort ist der
 * Umweg ueber Vite zwingend, weil deren Komponenten Bilder importieren, die
 * Node nicht laden kann. Hier waere ein direktes renderToString moeglich;
 * ein gemeinsames Verfahren fuer alle fuenf Seiten ist die Wartung wert.
 *
 * `prerenderToNodeStream` wartet Suspense-Grenzen aus. Diese Seite hat heute
 * keine, aber die API kostet nichts und bricht nicht, sobald eine dazukommt.
 */
import { prerenderToNodeStream } from 'react-dom/static';
import App from './App';

export async function render(): Promise<string> {
  const { prelude } = await prerenderToNodeStream(<App />);
  return new Promise<string>((resolve, reject) => {
    let out = '';
    prelude.setEncoding('utf8');
    prelude.on('data', (c: string) => { out += c; });
    prelude.on('end', () => resolve(out));
    prelude.on('error', reject);
  });
}
