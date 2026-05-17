import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Github, Instagram, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full glass-indigo text-[10px] uppercase tracking-[0.3em] font-medium text-indigo-400 mb-8"
        >
          Web Developer Portfolio
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6 leading-[0.9]">
          ALFA<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">CHRIDZY</span>
        </h1>

        <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Saya Alfachridzy, biasa dipanggil <span className="text-white font-medium italic underline decoration-white/20 underline-offset-4">nengok</span>. 
          Siswa X TKJ yang hobi nyentuh keyboard (kadang bener, kadang cuma error).
        </p>

        <div className="flex items-center justify-center gap-4">
          <motion.a
            whileHover={{ y: -5 }}
            href="#projects"
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
          >
            Lihat Project
          </motion.a>
          <div className="flex items-center gap-3 ml-4">
            {[
              { icon: <Github size={20} />, href: "Hanzku" },
              { icon: <Instagram size={20} />, href: "https://instagram.com/for.myself__k" },
              { icon: <Mail size={20} />, href: "mailto:zandygege@gmail.com" }
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};
