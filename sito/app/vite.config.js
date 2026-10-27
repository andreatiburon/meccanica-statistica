import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Un solo bundle con percorsi relativi: la stessa build va su GitHub Pages e in un Artifact di claude.ai.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "../../_app",
    emptyOutDir: true,
    assetsDir: "assets",
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true, entryFileNames: "assets/app.js", assetFileNames: "assets/[name][extname]" } },
  },
});
