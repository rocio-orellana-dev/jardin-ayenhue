import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

// ... (tus imports se mantienen igual)

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    // Limpiamos un poco la lógica de Replit para que no falle en Vercel
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) => m.cartographer()),
          await import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
      "react": path.resolve(process.cwd(), "node_modules/react"),
      "react-dom": path.resolve(process.cwd(), "node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
  // Mantenemos la raíz en client porque ahí tienes tu index.html
  root: path.resolve(process.cwd(), "client"),
  build: {
    // CAMBIO IMPORTANTE: Simplificamos a 'dist' en la raíz del proyecto
    // Usamos '..' porque la raíz (root) está configurada en 'client'
    outDir: path.resolve(process.cwd(), "dist"),
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        secure: false,
      },
    },
    fs: { strict: false },
  },
});