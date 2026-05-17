import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Folder } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Modern E-Commerce UI',
    description: 'Landing page belanja online dengan fitur cart dan checkout sederhana menggunakan React & Tailwind.',
    tags: ['React', 'Tailwind', 'Motion'],
    link: '#',
    github: '#',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Chat App Realtime',
    description: 'Aplikasi chatting sederhana yang mendukung grup room dan pesan langsung.',
    tags: ['Node.js', 'Socket.io', 'Express'],
    link: '#',
    github: '#',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Weather Dashboard',
    description: 'Dashboard cuaca interaktif dengan integrasi API OpenWeatherMap.',
    tags: ['JavaScript', 'API', 'Charts'],
    link: '#',
    github: '#',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800'
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-4"
          >
            Selection
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">Bento <span className="text-white/40 italic">Projects</span></h2>
        </div>
        <p className="text-white/40 max-w-sm text-sm font-light leading-relaxed">
          Beberapa hasil eksperimen ngoding saya di waktu luang (pas ga lagi main game).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative h-[450px] rounded-3xl overflow-hidden glass-dark border border-white/5"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
              <div className="flex gap-2 mb-4">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/60 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{project.title}</h3>
              <p className="text-sm text-slate-400 mb-6 font-light">{project.description}</p>
              
              <div className="flex items-center gap-4">
                <a href={project.link} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
                  <ExternalLink size={14} /> Demo
                </a>
                <a href={project.github} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-white/40 transition-colors">
                  <Github size={14} /> Source
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
