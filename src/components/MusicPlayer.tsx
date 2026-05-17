import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Ganti link ini dengan path ke file Happiness - Rex Orange County milikmu
  // Pastikan file diletakkan di /public/audio/happiness.mp3
  const audioSrc = "/audio/happiness.mp3"; 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Autoplay blocked or error:", e));
      }
      setIsPlaying(!isPlaying);
      setHasInteracted(true);
    }
  };

  useEffect(() => {
    // Autoplay fallback logic
    const handleFirstClick = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
        setHasInteracted(true);
      }
      window.removeEventListener('click', handleFirstClick);
    };

    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-2 pr-6 rounded-full z-50 shadow-2xl">
      <audio ref={audioRef} src={audioSrc} loop />
      
      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center relative overflow-hidden group">
        <motion.div
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-rose-500 flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-slate-900 rounded-full" />
        </motion.div>
        
        {/* Play/Pause Overlay on Hover */}
        <button 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
        </button>

        {/* Music Waves (Animated) */}
        {isPlaying && (
          <div className="absolute top-1/2 -translate-y-1/2 -right-1 flex gap-[2px] items-end h-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                className="w-[2px] bg-indigo-400"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col ml-1">
        <span className="text-[10px] font-bold text-white leading-tight">Happiness</span>
        <span className="text-[9px] text-slate-400 uppercase tracking-tighter">Rex Orange County</span>
      </div>

      <button onClick={togglePlay} className="ml-4 text-slate-300 hover:text-white transition-colors">
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
};
