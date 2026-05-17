/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { GamesSection } from './components/GamesSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LiveBackground } from './components/LiveBackground';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-white/20 selection:text-white">
      <LiveBackground />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GamesSection />
        <Contact />
      </main>

      <Footer />
      <MusicPlayer />
    </div>
  );
}

