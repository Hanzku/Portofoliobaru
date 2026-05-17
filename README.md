# Portofolio Alfachridzy - Professional Full-Stack Portfolio

Website portofolio modern, interaktif, dan profesional yang dibangun menggunakan React, TypeScript, Tailwind CSS, dan Express.

## Fitur Utama
- **Modern & Responsive Design**: Menggunakan Tailwind CSS v4 untuk styling yang clean dan glassmorphism.
- **Interactive Animations**: Animasi halus dengan Framer Motion.
- **Live Background**: Background canvas animasi yang ringan.
- **Music Player**: Floating music player (Autoplay enabled).
- **Contact Form**: Terintegrasi dengan Node.js, Express, dan Nodemailer (SMTP).
- **Mini Games Section**: 
  - **Chess AI**: Player vs Bot (Minimax Algorithm) atau PvP.
  - **Flappy Bird**: Polished canvas game.
  - **Snake Modern**: Retro game dengan nuansa modern.

## Struktur Project
- `/src/components`: UI components (Navbar, Hero, About, dll).
- `/src/games`: Logika dan UI game.
- `/src/lib`: Utility functions.
- `/server.ts`: Backend Express untuk API Contact Form dan Vite Middleware.

---

## Panduan Pengunaan

### 1. Cara Install Dependency
Jalankan perintah berikut di terminal:
```bash
npm install
```

### 2. Cara Menjalankan Project
Untuk mode development (Frontend + Backend):
```bash
npm run dev
```
Buka `http://localhost:3000` di browsermu.

### 3. Setup SMTP Gmail (Penting untuk Contact Form)
Untuk mengaktifkan fitur kirim pesan ke email:
1. Masuk ke [Google Account Security](https://myaccount.google.com/security).
2. Aktifkan **2-Step Verification**.
3. Cari **App Passwords**.
4. Buat password aplikasi baru untuk "Mail".
5. Copy kode 16 digit yang muncul.
6. Di AI Studio Dashboard, buka panel **Secrets** dan tambahkan:
   - `SMTP_USER`: Email Gmail kamu.
   - `SMTP_PASS`: Kode 16 digit tadi (tanpa spasi).

### 4. Cara Mengganti Lagu
1. Siapkan file lagu kamu (format `.mp3`).
2. Ubah nama filenya menjadi `happiness.mp3`.
3. Upload/letakkan file tersebut di folder `public/audio/`.
4. Jika ingin menggunakan link direct, buka `src/components/MusicPlayer.tsx` dan ganti nilai `audioSrc`.

### 5. Cara Edit Konten
- **Tentang Saya**: Edit `src/components/About.tsx`.
- **Hero/Header**: Edit `src/components/Hero.tsx`.
- **Project**: Edit array `PROJECTS` di `src/components/Projects.tsx`.
- **Skill**: Edit array `SKILLS` di `src/components/Skills.tsx`.

### 6. Troubleshooting
- **Musik Tidak Jalan**: Pastikan klik sembarang tempat di website terlebih dahulu (Kebijakan browser melarang autoplay tanpa interaksi user).
- **Game Lag**: Pastikan hardware acceleration aktif di browser. Website ini dioptimalkan menggunakan `requestAnimationFrame`.
- **Pesan Tidak Terkirim**: Cek apakah `SMTP_USER` dan `SMTP_PASS` di panel Secrets sudah benar.

---

## Deployment ke Vercel
Project ini sudah dikonfigurasi untuk deployment full-stack.
1. Hubungkan repository GitHub ke Vercel.
2. Pastikan Build Command adalah `npm run build`.
3. Pastikan Output Directory adalah `dist`.
4. Tambahkan Environment Variables (`SMTP_USER`, `SMTP_PASS`) di Dashboard Vercel.

---
Dibuat dengan ❤️ oleh **Alfachridzy (nengok)**.
