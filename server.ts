import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const db = new Database("condo.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_number TEXT NOT NULL,
    block TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    legal_name TEXT,
    emails TEXT,
    phones TEXT,
    UNIQUE(unit_number, block)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    template_type TEXT NOT NULL,
    description TEXT,
    occurrence_date TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    sent_at DATETIME,
    FOREIGN KEY(unit_id) REFERENCES units(id)
  );
`);

// Migration: Add occurrence_date if missing
const tableInfo = db.prepare("PRAGMA table_info(notifications)").all() as any[];
const hasOccDate = tableInfo.some(col => col.name === 'occurrence_date');
if (!hasOccDate) {
  db.exec("ALTER TABLE notifications ADD COLUMN occurrence_date TEXT");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.get("/api/units", (req, res) => {
    const units = db.prepare("SELECT * FROM units ORDER BY block, unit_number").all();
    res.json(units);
  });

  app.post("/api/units/import", (req, res) => {
    const { data } = req.body; // Array of objects
    const insert = db.prepare(`
      INSERT OR REPLACE INTO units (unit_number, block, owner_name, legal_name, emails, phones) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const transaction = db.transaction((rows) => {
      for (const row of rows) {
        // Normalize keys to handle case-insensitivity and spaces
        const normalizedRow: any = {};
        Object.keys(row).forEach(key => {
          normalizedRow[key.trim().toLowerCase()] = row[key];
        });

        const findVal = (keys: string[]) => {
          for (const k of keys) {
            const val = normalizedRow[k.toLowerCase()];
            if (val && val.toString().trim()) return val.toString().trim();
          }
          return '';
        };

        const unitNumber = findVal(['unit_number', 'unidade', 'unid']);
        const block = findVal(['block', 'bloco', 'bl']);
        const ownerName = findVal(['owner_name', 'nome', 'proprietário', 'proprietario', 'condômino', 'condomino', 'propriet']);
        const legalName = findVal(['legal_name', 'nome / razão social', 'nome/razão social', 'razão social', 'razao social', 'nome completo', 'nome/razao social', 'raz', 'social']);
        const emails = findVal(['emails', 'e-mail(s)', 'email', 'e-mail']);
        const phones = findVal(['phones', 'telefone/whatsapp', 'telefone', 'whatsapp', 'celular']);

        if (!unitNumber || !block) {
          console.warn("Skipping row due to missing unit or block:", row);
          continue;
        }

        insert.run(
          unitNumber,
          block,
          ownerName || legalName, // Fallback to legalName if ownerName is empty
          legalName || ownerName, // Fallback to ownerName if legalName is empty
          emails,
          phones
        );
      }
    });

    try {
      transaction(data);
      res.json({ message: `${data.length} units imported successfully` });
    } catch (error) {
      console.error("Import error:", error);
      res.status(500).json({ error: "Failed to import units" });
    }
  });

  app.post("/api/units/seed", (req, res) => {
    const insert = db.prepare("INSERT OR IGNORE INTO units (unit_number, block, owner_name, legal_name, emails, phones) VALUES (?, ?, ?, ?, ?, ?)");
    const sampleData = [
      ['101', 'A', 'João Silva', 'JOAO SILVA ME', 'joao@example.com', '85999999999'],
      ['102', 'A', 'Maria Oliveira', 'MARIA OLIVEIRA', 'maria@example.com', '85988888888'],
      ['201', 'B', 'Carlos Santos', 'CARLOS SANTOS LTDA', 'carlos@example.com', '85977777777'],
    ];
    
    const transaction = db.transaction((data) => {
      for (const row of data) insert.run(row);
    });
    transaction(sampleData);
    res.json({ message: "Database seeded" });
  });

  app.get("/api/notifications/history/:unitId", (req, res) => {
    const history = db.prepare(`
      SELECT * FROM notifications 
      WHERE unit_id = ? 
      ORDER BY date DESC
    `).all(req.params.unitId);
    res.json(history);
  });

  app.put("/api/units/:id", (req, res) => {
    const { owner_name, legal_name, emails, phones } = req.body;
    try {
      db.prepare(`
        UPDATE units 
        SET owner_name = ?, legal_name = ?, emails = ?, phones = ?
        WHERE id = ?
      `).run(owner_name, legal_name, emails, phones, req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Failed to update unit" });
    }
  });

  app.post("/api/notifications", (req, res) => {
    const { unit_id, type, description, template_type, occurrence_date } = req.body;
    const result = db.prepare(`
      INSERT INTO notifications (unit_id, type, description, template_type, occurrence_date)
      VALUES (?, ?, ?, ?, ?)
    `).run(unit_id, type, description, template_type, occurrence_date);
    res.json({ id: result.lastInsertRowid });
  });

  app.post("/api/send-email", async (req, res) => {
    const { to, cc, subject, text, html, attachmentBase64, filename, evidencePhoto } = req.body;

    // Note: In a real app, you'd use real SMTP credentials from process.env
    console.log(`Sending email to ${to} (CC: ${cc}) with subject: ${subject}`);

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(400).json({ 
        error: "SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS in secrets." 
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER?.trim(),
        pass: process.env.SMTP_PASS?.trim(),
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const attachments = [];
    if (attachmentBase64) {
      attachments.push({
        filename: filename || 'notificacao.pdf',
        content: attachmentBase64.split("base64,")[1],
        encoding: 'base64'
      });
    }
    if (evidencePhoto) {
      attachments.push({
        filename: 'foto_evidencia.jpg',
        content: evidencePhoto.split("base64,")[1],
        encoding: 'base64'
      });
    }

    try {
      await transporter.sendMail({
        from: `"Marcos Shalom - Assessoria Jurídica" <${process.env.SMTP_USER}>`,
        to,
        cc,
        subject,
        text,
        html,
        attachments
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to send email" });
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
