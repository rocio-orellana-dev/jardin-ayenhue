import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // CAMBIO CRÍTICO: Usamos process.cwd() para ir a la raíz del proyecto y luego entrar a dist/public
  // Esto coincide exactamente con el 'outDir' que pusimos en vite.config.ts
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}. Asegúrate de ejecutar 'npm run build' primero.`,
    );
  }

  // Servir archivos estáticos (JS, CSS, Imágenes)
  app.use(express.static(distPath));

  // Catch-all: Si el usuario entra a cualquier ruta, servimos el index.html
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}