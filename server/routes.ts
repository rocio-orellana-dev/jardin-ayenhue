import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import { insertContactMessageSchema, insertTestimonialSchema, insertGalleryImageSchema } from "@shared/schema";
// --- IMPORTS PARA CLOUDINARY ---
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// 1. CONFIGURACIÓN DE CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. CONFIGURACIÓN DE MULTER (Memoria para subir a la nube)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

// Rate limiters
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 5,
  message: { error: "Demasiados mensajes enviados. Por favor intenta más tarde." },
  standardHeaders: true, legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  message: { error: "Demasiados intentos. Intenta más tarde." },
});

// Session types
declare module "express-session" {
  interface SessionData { isAdmin: boolean; }
}

// Auth middleware
function requireAdmin(req: Request, res: Response, next: Function) {
  if (!req.session.isAdmin) return res.status(401).json({ error: "No autorizado" });
  next();
}

export async function registerRoutes(app: Express, httpServer: Server): Promise<Server> {

  // --- 1. CRUCIAL PARA RENDER: CONFÍA EN EL PROXY ---
  app.set("trust proxy", 1);

  // Seguridad
  app.use(helmet({ contentSecurityPolicy: false }));

  // Sesiones
  app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Solo seguro en producción
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hrs
      sameSite: 'lax',
    },
  }));

  // --- RUTA DE SUBIDA (HACIA CLOUDINARY) ---
  app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No se subió archivo" });

      const result: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "jardin_ayenhue" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      console.error("Error subiendo a Cloudinary:", error);
      res.status(500).json({ error: "Error al subir imagen a la nube" });
    }
  });

  // --- RUTAS PÚBLICAS ---

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
  });

  app.get("/api/gallery", async (_req, res) => {
    try {
      const images = await storage.getActiveGalleryImages();
      res.json(images);
    } catch (error) { res.status(500).json({ error: "Error interno" }); }
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
        const validated = insertContactMessageSchema.parse({ ...req.body, status: "new", ip: req.ip });
        await storage.createContactMessage(validated);
        res.status(201).json({ success: true, message: "Mensaje enviado" });
      } catch (error) { res.status(500).json({ error: "Error al guardar mensaje" }); }
    }
  );

  // --- RUTAS DE ADMIN ---

  app.post("/api/admin/login", loginLimiter, async (req, res) => {
    const { password } = req.body;
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

  // CRUD Mensajes
  app.get("/api/admin/messages", requireAdmin, async (_req, res) => {
    const msgs = await storage.getContactMessages();
    res.json(msgs);
  });
  app.patch("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    const updated = await storage.updateContactMessageStatus(parseInt(req.params.id), req.body.status);
    res.json(updated);
  });
  app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    await storage.deleteContactMessage(parseInt(req.params.id));
    res.json({ success: true });
  });

  // CRUD Testimonios
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

  // CRUD Galería
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