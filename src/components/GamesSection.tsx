import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChessGame } from '../games/ChessGame';
import { FlappyBird } from '../games/FlappyBird';
import { SnakeGame } from '../games/SnakeGame';
import { Gamepad2, Swords, Bird, Target } from 'lucide-react';

const GAMES = [
  { id: 'chess', name: 'Chess AI', icon: <Swords size={20} />, component: <ChessGame /> },
  { id: 'flappy', name: 'Flappy Nengok', icon: <Bird size={20} />, component: <FlappyBird /> },
  { id: 'snake', name: 'Snake Modern', icon: <Target size={20} />, component: <SnakeGame /> },
];

export const GamesSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState(GAMES[0].id);

  return (
    <section id="games" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 text-indigo-400"
          >
            <Gamepad2 size={32} />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4 text-slate-200">Mini <span className="text-white/20 italic">Games</span></h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm font-light">Bosen liat project? Coba mainin beberapa game buatan saya di bawah ini. Hati-hati kecanduan.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-300 font-medium ${
                activeGame === game.id 
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {game.icon} {game.name}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGame}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-4xl"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative">
                  {GAMES.find(g => g.id === activeGame)?.component}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
