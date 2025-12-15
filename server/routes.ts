import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import { insertContactMessageSchema, insertTestimonialSchema, insertGalleryImageSchema } from "@shared/schema";
// --- NUEVOS IMPORTS PARA SUBIDA DE ARCHIVOS ---
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// Rate limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Demasiados mensajes enviados. Por favor intenta más tarde." },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Demasiados intentos. Intenta más tarde." },
});

// Session types
declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

// Auth middleware
function requireAdmin(req: Request, res: Response, next: Function) {
  if (!req.session.isAdmin) {
    return res.status(401).json({ error: "No autorizado" });
  }
  next();
}

export async function registerRoutes(
  app: Express,
  httpServer: Server
): Promise<Server> {

  // --- CONFIGURACIÓN DE SUBIDA DE IMÁGENES (MULTER) ---
  const uploadDir = path.join(process.cwd(), "uploads");
  
  // Crear carpeta 'uploads' si no existe
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Configurar dónde y cómo se guardan los archivos
  const upload = multer({
    storage: multer.diskStorage({
      destination: uploadDir,
      filename: (req, file, cb) => {
        // Generamos un nombre único: fecha-random.extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
  });

  // Habilitar que la carpeta uploads sea pública (para ver las fotos en el navegador)
  app.use("/uploads", express.static(uploadDir));

  // Middleware de Seguridad
  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hrs
    },
  }));

  // --- RUTA NUEVA: SUBIR ARCHIVO ---
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }
    // Devolvemos la URL pública
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  });

  // --- PUBLIC ROUTES ---

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Error interno" });
    }
  });

  app.get("/api/gallery", async (_req, res) => {
    try {
      const images = await storage.getActiveGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Error interno" });
    }
  });

  app.post("/api/contact", contactLimiter, [
      body("name").trim().isLength({ min: 2 }).escape(),
      body("email").isEmail().normalizeEmail(),
      body("phone").trim().escape(),
      body("message").trim().isLength({ min: 5 }).escape(),
      body("honeypot").isEmpty(),
    ],
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ error: "Datos inválidos" });
      if (req.body.honeypot) return res.status(400).json({ error: "Spam" });

      try {
        const validated = insertContactMessageSchema.parse({
          ...req.body,
          status: "new",
          ip: req.ip
        });
        await storage.createContactMessage(validated);
        res.status(201).json({ success: true, message: "Mensaje enviado" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al guardar mensaje" });
      }
    }
  );

  // --- ADMIN AUTH ---

  app.post("/api/admin/login", loginLimiter, async (req, res) => {
    const { password } = req.body;
    // NOTA: Asegúrate de tener ADMIN_PASSWORD en tus variables de entorno (.env)
    if (password === process.env.ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Contraseña incorrecta" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => res.json({ success: true }));
  });

  app.get("/api/admin/check", (req, res) => {
    res.json({ isAdmin: !!req.session.isAdmin });
  });

  // --- ADMIN DATA ROUTES ---

  // Mensajes
  app.get("/api/admin/messages", requireAdmin, async (_req, res) => {
    const msgs = await storage.getContactMessages();
    res.json(msgs);
  });

  app.patch("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id);
    const updated = await storage.updateContactMessageStatus(id, req.body.status);
    res.json(updated);
  });

  app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    await storage.deleteContactMessage(parseInt(req.params.id));
    res.json({ success: true });
  });

  // Testimonios
  app.get("/api/admin/testimonials", requireAdmin, async (_req, res) => {
    const data = await storage.getAllTestimonials();
    res.json(data);
  });

  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    const validated = insertTestimonialSchema.parse(req.body);
    const created = await storage.createTestimonial(validated);
    res.status(201).json(created);
  });

  app.patch("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    const updated = await storage.updateTestimonial(parseInt(req.params.id), req.body);
    res.json(updated);
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    await storage.deleteTestimonial(parseInt(req.params.id));
    res.json({ success: true });
  });

  // Galería
  app.get("/api/admin/gallery", requireAdmin, async (_req, res) => {
    const data = await storage.getAllGalleryImages();
    res.json(data);
  });

  app.post("/api/admin/gallery", requireAdmin, async (req, res) => {
    const validated = insertGalleryImageSchema.parse(req.body);
    const created = await storage.createGalleryImage(validated);
    res.status(201).json(created);
  });

  app.patch("/api/admin/gallery/:id", requireAdmin, async (req, res) => {
    const updated = await storage.updateGalleryImage(parseInt(req.params.id), req.body);
    res.json(updated);
  });

  app.delete("/api/admin/gallery/:id", requireAdmin, async (req, res) => {
    await storage.deleteGalleryImage(parseInt(req.params.id));
    res.json({ success: true });
  });

  return httpServer;
}