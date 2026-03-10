import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import { insertContactMessageSchema, insertTestimonialSchema, insertGalleryImageSchema } from "@shared/schema";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// --- EXTENSIÓN DE TIPOS DE SESIÓN ---
// Esto elimina el error "Property isAdmin does not exist"
import "express-session";
declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

// 1. CONFIGURACIÓN DE CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. CONFIGURACIÓN DE MULTER
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } 
});

// Limitadores de tráfico
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 5,
  message: { error: "Demasiados mensajes. Intenta más tarde." },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  message: { error: "Demasiados intentos. Intenta más tarde." },
});

// Middleware de Autorización
function requireAdmin(req: Request, res: Response, next: Function) {
  if (!req.session.isAdmin) return res.status(401).json({ error: "No autorizado" });
  next();
}

export async function registerRoutes(app: Express, httpServer: Server): Promise<Server> {

  // --- RUTA DE SUBIDA (CLOUDINARY) ---
  app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No se subió archivo" });

      const result: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "jardin_ayenhue", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file!.buffer).pipe(uploadStream);
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: "Error al subir a la nube" });
    }
  });

  // --- RUTAS PÚBLICAS ---
  app.get("/api/testimonials", async (_req, res) => {
    const testimonials = await storage.getActiveTestimonials();
    res.json(testimonials);
  });

  app.get("/api/gallery", async (_req, res) => {
    const images = await storage.getActiveGalleryImages();
    res.json(images);
  });

  app.post("/api/contact", contactLimiter, [
    body("name").trim().isLength({ min: 2 }),
    body("email").isEmail(),
    body("message").trim().isLength({ min: 10 }),
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: "Datos inválidos" });

    try {
      const validated = insertContactMessageSchema.parse({ ...req.body, status: "new" });
      const msg = await storage.createContactMessage(validated);
      res.status(201).json(msg);
    } catch (error) {
      res.status(500).json({ error: "Error al enviar mensaje" });
    }
  });

  // --- RUTAS DE ADMIN (AUTH) ---
  app.post("/api/admin/login", loginLimiter, async (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      // IMPORTANTE: Exigimos guardar la sesión de forma explícita, porque Vercel Serverless
      // podría terminar el proceso (handler) antes de que la escritura asíncrona a NeonPG haya terminado.
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ error: "Error al guardar la sesión en base de datos" });
        }
        res.json({ success: true });
      });
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

  // --- CRUD ADMIN (PROTEGIDO) ---
  
  // Mensajes
  app.get("/api/admin/messages", requireAdmin, async (_req, res) => {
    const msgs = await storage.getContactMessages();
    res.json(msgs);
  });

  app.patch("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    const updated = await storage.updateContactMessageStatus(Number(req.params.id), req.body.status);
    res.json(updated);
  });

  app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
    await storage.deleteContactMessage(Number(req.params.id));
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
    const updated = await storage.updateTestimonial(Number(req.params.id), req.body);
    res.json(updated);
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    await storage.deleteTestimonial(Number(req.params.id));
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
    const updated = await storage.updateGalleryImage(Number(req.params.id), req.body);
    res.json(updated);
  });

  app.delete("/api/admin/gallery/:id", requireAdmin, async (req, res) => {
    await storage.deleteGalleryImage(Number(req.params.id));
    res.json({ success: true });
  });

  return httpServer;
}