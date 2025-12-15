import { pgTable, text, serial, boolean, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- CONTACT MESSAGES ---
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  status: text("status", { enum: ["new", "read"] }).default("new").notNull(),
  ip: text("ip"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
  status: true,
  ip: true,
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// --- TESTIMONIALS ---
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // Ej: "Apoderado Nivel Medio"
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  avatar_url: text("avatar_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  role: true,
  content: true,
  rating: true,
  avatar_url: true,
  isActive: true,
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

// --- GALLERY IMAGES ---
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).pick({
  url: true,
  title: true,
  description: true,
  displayOrder: true,
  isActive: true,
});

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

// --- ADMIN USERS (Para uso futuro si cambias el login de .env a base de datos) ---
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;