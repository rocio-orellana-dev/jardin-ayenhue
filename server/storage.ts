import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import { 
  contactMessages, testimonials, galleryImages, adminUsers,
  type ContactMessage, type InsertContactMessage,
  type Testimonial, type InsertTestimonial,
  type GalleryImage, type InsertGalleryImage,
  type AdminUser
} from "@shared/schema";

export interface IStorage {
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  updateContactMessageStatus(id: number, status: "new" | "read"): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: number): Promise<void>;
  
  // Testimonials
  getActiveTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<void>;
  
  // Gallery
  getActiveGalleryImages(): Promise<GalleryImage[]>;
  getAllGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: number): Promise<void>;
  
  // Admin
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
}

export class DbStorage implements IStorage {
  // Contact Messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }

  async updateContactMessageStatus(id: number, status: "new" | "read"): Promise<ContactMessage | undefined> {
    const [updated] = await db
      .update(contactMessages)
      .set({ status })
      .where(eq(contactMessages.id, id))
      .returning();
    return updated;
  }

  async deleteContactMessage(id: number): Promise<void> {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
  }

  // Testimonials
  async getActiveTestimonials(): Promise<Testimonial[]> {
    return db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db.insert(testimonials).values(testimonial).returning();
    return created;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Gallery
  async getActiveGalleryImages(): Promise<GalleryImage[]> {
    return db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.isActive, true))
      .orderBy(galleryImages.displayOrder);
  }

  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return db.select().from(galleryImages).orderBy(galleryImages.displayOrder);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [created] = await db.insert(galleryImages).values(image).returning();
    return created;
  }

  async updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const [updated] = await db
      .update(galleryImages)
      .set(image)
      .where(eq(galleryImages.id, id))
      .returning();
    return updated;
  }

  async deleteGalleryImage(id: number): Promise<void> {
    await db.delete(galleryImages).where(eq(galleryImages.id, id));
  }

  // Admin
  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin;
  }
}

export const storage = new DbStorage();