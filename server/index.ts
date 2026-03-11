import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import helmet from "helmet";
import cors from "cors";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { pool } from "./db"; 

const app = express();
const PostgresStore = connectPg(session);

// 1. SEGURIDAD BÁSICA (CORS y Cabeceras HTTP Seguras)
app.set('trust proxy', 1);

// Configuramos Helmet para cabeceras seguras ultra-estrictas
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      objectSrc: ["'none'"], // Previene cargar plugins como Flash/Java
      // En producción bloqueamos scripts inline. En desarrollo Vite los necesita.
      scriptSrc: process.env.NODE_ENV === "production" 
        ? ["'self'"] 
        : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://www.transparenttextures.com"],
      frameSrc: ["'self'", "https://www.google.com"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Configuramos CORS para permitir peticiones solo desde dominios específicos si es necesario
// Por defecto allow all en la misma API, pero es una buena práctica tenerlo
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? ["https://jardinayenhue.cl", "https://www.jardinayenhue.cl"] : true,
  credentials: true, // Necesario para enviar cookies de sesión
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const poolStore = new PostgresStore({
  pool: pool,
  tableName: "session",
  createTableIfMissing: true,
  errorLog: console.error
});

poolStore.on('error', (err) => {
  console.error("Session store background error:", err);
});

// SESIÓN GLOBAL ÚNICA
app.use(
  session({
    store: poolStore,
    secret: process.env.SESSION_SECRET || "ayenhue-prod-2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, 
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

const httpServer = createServer(app);
// Registro de rutas SINCRONIZADO para que sirva a Vercel inmediatamente. 
// Las funciones Serverless no esperan a un Immediately Invoked Function Expression asíncrono.
registerRoutes(app, httpServer);

// Iniciamos el servidor web con createServer.listen() si no estamos en VERCEL.
// Importante para Render/Railway, donde sí existe NODE_ENV=production.
if (!process.env.VERCEL) {
  (async () => {
    if (app.get("env") === "development") {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    } else {
      serveStatic(app);
    }

    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(port, "0.0.0.0", () => {
      console.log(`Server listening on port ${port}`);
    });
  })();
}

// Global Error Handler for Express
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Express Error:", err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

export default app;