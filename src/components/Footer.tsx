import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xl font-display font-black tracking-tighter mb-1">
            AL<span className="text-blue-500">.</span>FA
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Built by Alfachridzy © 2026</p>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Github</a>
          <a href="#" className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">Dribbble</a>
        </div>

        <p className="text-[10px] text-white/20 font-mono">
          Made with React, Tailwind, and a lot of caffeine.
        </p>
      </div>
    </footer>
  );
};
