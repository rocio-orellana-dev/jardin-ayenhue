// server/static.ts
import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  // Cuando corremos `node dist/index.cjs`, __dirname o equivalent resolve a 'dist'.
  // Como construimos el server y cliente juntos, la ruta ideal al dist estático es
  // simplemente apuntar a la misma carpeta donde reside este index.cjs compilado,
  // es decir, import.meta.url o __dirname en CJS.
  // En nuestro script de build de ESBuild, el CJS resultante vive en /dist.
  const publicDir = path.resolve(__dirname);

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
