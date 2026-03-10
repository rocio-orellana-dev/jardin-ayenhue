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
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

(async () => {
  const httpServer = createServer(app);
  await registerRoutes(app, httpServer);

  if (app.get("env") === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, "0.0.0.0");
})();

export default app;