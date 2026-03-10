import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { pool, log } from "./db"; 

const app = express();
const PostgresStore = connectPg(session);

// --- CONFIGURACIÓN CRÍTICA PARA VERCEL ---
// Permite que las cookies funcionen a través del proxy de Vercel
app.set('trust proxy', 1); 

app.use(express.json({
  verify: (req, _res, buf) => {
    (req as any).rawBody = buf;
  },
}));

app.use(express.urlencoded({ extended: false }));

// --- SESIONES PERSISTENTES EN NEON (BASE DE DATOS) ---
// Esto arregla el Login en Vercel evitando que la sesión se borre
app.use(
  session({
    store: new PostgresStore({
      pool: pool,
      tableName: "session", // La tabla que creaste en Neon
    }),
    secret: process.env.SESSION_SECRET || "ayenhue-prod-secret-2026",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: true, // Obligatorio para HTTPS en Vercel
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días de duración
    },
  })
);

// Middleware de logging para depuración en Vercel
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
  
  // 1. Registramos las rutas de la API
  await registerRoutes(app, httpServer);

  // 2. Archivos estáticos
  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  } else {
    // En producción (Vercel), servimos el build de la carpeta dist/public
    serveStatic(app);
  }

  // 3. Manejo Global de Errores
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error("Error detectado:", err);
  });

  // 4. Encendido del servidor (Solo para modo local, Vercel usa el export default)
  const port = parseInt(process.env.PORT || "5000", 10);
  if (process.env.NODE_ENV !== "production") {
    httpServer.listen(port, "0.0.0.0", () => {
      log(`Servidor local activo en puerto ${port}`);
    });
  }
})();

// --- EXPORTACIÓN PARA VERCEL (SERVERLESS) ---
// Esto es lo que permite que Vercel encuentre tu API de Express
export default app;