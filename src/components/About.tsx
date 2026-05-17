import React from 'react';
import { motion } from 'motion/react';
import { Code2, Laptop, GraduationCap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden glass-dark border border-white/10 relative p-8 group">
            <div className="absolute inset-x-8 top-8 bottom-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 blur-2xl group-hover:opacity-100 opacity-60 transition-opacity" />
            <div className="relative h-full flex flex-col justify-end">
              <span className="text-[120px] font-display font-black text-white/5 leading-none select-none">
                TKJ
              </span>
              <h3 className="text-3xl font-display font-bold mt-4">Alfachridzy</h3>
              <p className="text-white/40 uppercase tracking-widest text-xs font-semibold">Web Developer & Student</p>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute -bottom-6 -right-6 p-6 glass rounded-2xl border border-white/20 shadow-2xl z-20">
            <span className="text-4xl font-display font-black block">1+</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">Tahun Belajar</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-8 leading-tight">
            Seorang Pelajar Yang <br/> <span className="text-white/40 italic font-medium">Hanyut Dalam Kode.</span>
          </h2>
          
          <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed">
            <p>
              Halo! Saya siswa kelas <span className="text-white font-medium">X TKJ</span> yang sudah menyelam ke dunia programming sekitar setahun terakhir. Berawal dari rasa penasaran "kok ini bisa jalan?", eh taunya malah kejebak di console log seharian.
            </p>
            <p>
              Fokus saya saat ini adalah membangun website yang tidak cuma fungsional, tapi juga enak dilihat (eye-pleasing) dan seru buat dimainin. Ya, makanya saya buat section mini games di bawah, biar portofolio ini tidak kaku-kaku amat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {[
              { icon: <GraduationCap className="text-indigo-400" />, label: 'Pendidikan', value: 'SMK (TKJ)' },
              { icon: <Code2 className="text-cyan-400" />, label: 'Pengalaman', value: '± 1 Tahun' },
              { icon: <Laptop className="text-indigo-400" />, label: 'Minat', value: 'Full Stack Web' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl glass-dark border border-white/5">
                <div className="p-3 rounded-xl bg-white/5">{item.icon}</div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
                  <p className="text-sm font-medium text-slate-200">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
