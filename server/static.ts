// server/static.ts
import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  // En Render, el servidor corre desde la raíz del proyecto.
  const publicDir = path.join(process.cwd(), "dist");

  // Servir TODOS archivos estáticos (JS, CSS, imágenes) desde la carpeta dist.
  // Express automáticamente infiere los MIME Types por la extensión del archivo.
  app.use(express.static(publicDir));

  // Fallback SPA: Si la ruta no es un archivo (ej. navegación en React), sirve index.html
  app.get("*", (req, res) => {
    // Proteger las rutas de la API del fallback HTML
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ error: "Endpoint no encontrado" });
    }
    res.sendFile(path.join(publicDir, "index.html"));
  });
}
