import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("Falta DATABASE_URL");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Obligatorio para Neon
  max: 1, // En Serverless (Vercel) solo debe haber 1 conexión por instancia
});

pool.on("error", (err) => {
  console.error("Unexpected event on idle Neon PostgreSQL client:", err);
  // No salimos de process.exit() porque Vercel lo maneja
});

export const db = drizzle(pool, { schema });

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}