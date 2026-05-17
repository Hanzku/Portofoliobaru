import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Instagram, Github } from 'lucide-react';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('LOADING');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('SUCCESS');
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Gagal mengirim pesan.');
      }
    } catch (err: any) {
      setStatus('ERROR');
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-4"
          >
            Connection
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-8 leading-tight text-slate-200">
            Mari Bicara <br/> <span className="text-white/20 italic">Tentang Project Anda.</span>
          </h2>
          <p className="text-slate-500 text-lg font-light mb-12 max-w-md">
            Punya ide website gokil, mau nawarin kerjaan, atau cuma mau nyapa? Gas, isi form di samping atau hubungi lewat sosmed.
          </p>

          <div className="flex flex-col gap-6">
            {[
              { icon: <Mail size={20} className="text-indigo-400" />, label: 'Email', value: 'zandygege@gmail.com', href: 'mailto:zandygege@gmail.com' },
              { icon: <Instagram size={20} className="text-cyan-400" />, label: 'Instagram', value: '@for.myself__k', href: 'https://instagram.com/alfachridzy_' },
              { icon: <Github size={20} className="text-indigo-400" />, label: 'GitHub', value: 'Alfachridzy', href: 'Hanzku' },
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href}
                className="flex items-center gap-4 group w-fit"
              >
                <div className="p-4 rounded-2xl glass-dark border border-white/5 group-hover:border-indigo-500/30 transition-all">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
                  <p className="text-sm font-medium group-hover:text-indigo-400 transition-colors text-slate-300">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Nama Lengkap</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 transition-all text-slate-200"
                placeholder="Siapa namamu?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Alamat Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 transition-all text-slate-200"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Pesan</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 transition-all resize-none text-slate-200"
                placeholder="Apa yang bisa saya bantu?"
              />
            </div>

            <button
              disabled={status === 'LOADING'}
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl hover:bg-indigo-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20"
            >
              {status === 'LOADING' ? (
                <> <Loader2 className="animate-spin" size={20} /> Mengirim... </>
              ) : (
                <> <Send size={20} /> Kirim Pesan </>
              )}
            </button>

            <AnimatePresence>
              {status === 'SUCCESS' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl border border-emerald-400/20"
                >
                  <CheckCircle size={18} /> Pesan berhasil dikerim! Saya akan balas segera.
                </motion.div>
              )}
              {status === 'ERROR' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                >
                  <AlertCircle size={18} /> {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
