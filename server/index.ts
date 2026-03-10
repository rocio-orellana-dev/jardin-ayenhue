import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { pool } from "./db"; 

const app = express();
const PostgresStore = connectPg(session);

app.set('trust proxy', 1); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SESIÓN GLOBAL ÚNICA
app.use(
  session({
    store: new PostgresStore({
      pool: pool,
      tableName: "session",
    }),
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

// Solo iniciamos el servidor web con createServer.listen() y serveStatic si NO estamos en produccion serverless de Vercel.
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
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

export default app;