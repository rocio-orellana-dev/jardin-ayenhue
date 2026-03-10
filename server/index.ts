import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { pool, log } from "./db"; // Importamos pool y log desde db.ts

const app = express();
const PostgresStore = connectPg(session);

// --- CONFIGURACIÓN PARA VERCEL ---
app.set('trust proxy', 1); 

app.use(express.json({
  verify: (req, _res, buf) => {
    (req as any).rawBody = buf;
  },
}));

app.use(express.urlencoded({ extended: false }));

// --- SESIONES PERSISTENTES EN NEON ---
app.use(
  session({
    store: new PostgresStore({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "ayenhue-dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Crucial para Vercel (HTTPS)
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    },
  })
);

// Middleware de logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: any = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      log(logLine.length > 80 ? logLine.slice(0, 79) + "…" : logLine);
    }
  });
  next();
});

(async () => {
  const httpServer = createServer(app);
  await registerRoutes(app, httpServer);

  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  } else {
    serveStatic(app);
  }

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, "0.0.0.0", () => {
    log(`Servidor activo en puerto ${port}`);
  });
})();