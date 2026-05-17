import React from 'react';
import { motion } from 'motion/react';

const SKILLS = [
  { name: 'React', level: 85, category: 'Frontend', color: 'bg-indigo-400' },
  { name: 'TypeScript', level: 75, category: 'Language', color: 'bg-indigo-500' },
  { name: 'Tailwind CSS', level: 90, category: 'Styling', color: 'bg-cyan-400' },
  { name: 'Node.js', level: 70, category: 'Backend', color: 'bg-cyan-500' },
  { name: 'Express', level: 75, category: 'Backend', color: 'bg-slate-200' },
  { name: 'GitHub', level: 80, category: 'Tool', color: 'bg-indigo-600' },
  { name: 'Framer Motion', level: 80, category: 'Animation', color: 'bg-cyan-600' },
  { name: 'UI Design', level: 70, category: 'Creative', color: 'bg-indigo-300' },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-4"
          >
            Capabilities
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">My <span className="text-white/40 italic">Tech Stack</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-6 glass rounded-2xl group transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">{skill.category}</span>
                  <h4 className="text-xl font-bold font-display text-slate-200">{skill.name}</h4>
                </div>
                <div className={`w-2 h-2 rounded-full ${skill.color} shadow-[0_0_8px_rgba(99,102,241,0.5)]`} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>PROFICIENCY</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${skill.color} opacity-60`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
