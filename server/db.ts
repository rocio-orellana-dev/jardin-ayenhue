import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("Falta DATABASE_URL en las variables de entorno");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    rejectUnauthorized: false // <--- ESTO ES OBLIGATORIO PARA NEON EN DESARROLLO
  },
  max: 20,
});

export const db = drizzle(pool, { schema });