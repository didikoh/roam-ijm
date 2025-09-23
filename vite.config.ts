import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/demo/roam-ijm/",
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@css": path.resolve(__dirname, "src/css"),
      "@scss": path.resolve(__dirname, "src/scss"),
      "@context": path.resolve(__dirname, "src/context"),
      "@chatbot": path.resolve(__dirname, "src/chatbot"),
    },
  },
});
