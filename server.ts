import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Semua field harus diisi." });
    }

    try {
      // Setup Nodemailer
      // Users should configure these in their Secrets
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: email,
        to: process.env.SMTP_USER || "zandygege@gmail.com",
        subject: `Pesan Portofolio Baru dari ${name}`,
        text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: "Pesan berhasil dikirim!" });
    } catch (error) {
      console.error("SMTP Error:", error);
      res.status(500).json({ error: "Gagal mengirim pesan. Pastikan SMTP sudah diatur." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
