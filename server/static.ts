// server/static.ts
import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  // dist es lo que tu build de Vite está generando (ver vite.config.ts)
  const publicDir = path.resolve(process.cwd(), "dist");

  // 1) ESTÁTICOS PRIMERO (assets, css, js, favicon, etc)
  app.use(express.static(publicDir));

  // Opcional: Servir la carpeta assets explícitamente para asegurar que los MIME types sean correctos
  app.use("/assets", express.static(path.join(publicDir, "assets"), {
    immutable: true,
    maxAge: "1y"
  }));

  // 2) Fallback SPA AL FINAL
  // Importante: esto debe ir después de express.static, si no rompe /assets/*
  app.get("*", (req, res) => {
    // si tienes APIs bajo /api, evita capturarlas
    if (req.path.startsWith("/api")) return res.status(404).end();
    res.sendFile(path.join(publicDir, "index.html"));
  });
}
