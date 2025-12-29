// server/static.ts
import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  // dist/public es lo que tu build está generando en Render
  const publicDir = path.resolve(process.cwd(), "dist", "public");

  // 1) ESTÁTICOS PRIMERO (assets, css, js, favicon, etc)
  app.use(
    express.static(publicDir, {
      index: false,
      maxAge: "1y",
      immutable: true,
    })
  );

  // 2) Fallback SPA AL FINAL
  // Importante: esto debe ir después de express.static, si no rompe /assets/*
  app.get("*", (req, res) => {
    // si tienes APIs bajo /api, evita capturarlas
    if (req.path.startsWith("/api")) return res.status(404).end();
    res.sendFile(path.join(publicDir, "index.html"));
  });
}
