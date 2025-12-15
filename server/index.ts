import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
// Pasamos 'app' al createServer inmediatamente para tener la instancia lista
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// Configuración de middlewares básicos
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// Función de Log
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Middleware de logging para capturar respuestas API
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // CORRECCIÓN IMPORTANTE: 
  // El orden es (app, httpServer) para coincidir con tu archivo routes.ts
  await registerRoutes(app, httpServer);

  // Manejo de errores global
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    // No lanzamos el error aquí para evitar crashear el servidor, solo lo logueamos
    console.error(err); 
  });

  // Configuración de Vite (Dev) vs Static (Prod)
  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  } else {
    serveStatic(app);
  }

  // Configuración del puerto y host
  const port = parseInt(process.env.PORT || "5000", 10);
  
  // Usar 0.0.0.0 es más seguro para asegurar acceso externo en deploys y local
  const host = "0.0.0.0"; 

  httpServer.listen(port, host, () => {
    log(`serving on http://${host}:${port}`);
  });
})();