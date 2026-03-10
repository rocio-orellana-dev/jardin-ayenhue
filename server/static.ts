// server/static.ts
import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  // Garantía Absoluta: Independiente de transpilaciones y contextos extraños de Node o ESBuild,
  // process.cwd() en Render SIEMPRE es la raíz del proyecto (donde está package.json).
  // Vite siempre tira la build por defecto en la carpeta "dist" en esa misma raíz.
  const publicDir = path.join(process.cwd(), "dist");

  // Forzar headers de MIME types correctos globalmente por seguridad extra 
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

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
