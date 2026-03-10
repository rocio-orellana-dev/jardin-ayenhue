import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session"; // Asegúrate de tener instalado express-session
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();

// --- CONFIGURACIÓN CRÍTICA PARA VERCEL ---
// Esto permite que las cookies funcionen a través del proxy de Vercel
app.set('trust proxy', 1); 

app.use(express.json({
  verify: (req, _res, buf) => {
    (req as any).rawBody = buf;
  },
}));

app.use(express.urlencoded({ extended: false }));

// --- MIDDLEWARE DE SESIÓN (Debe ir ANTES de registerRoutes) ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "ayenhue-super-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Obligatorio para HTTPS en Vercel
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
  })
);

const httpServer = createServer(app);

// Función de Log
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

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
  // 1. Registramos las rutas de la API 
  await registerRoutes(app, httpServer);

  // 2. Archivos estáticos
  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  } else {
    serveStatic(app);
  }

  // 3. Manejo de errores
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error("Error en servidor:", err); 
  });

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();