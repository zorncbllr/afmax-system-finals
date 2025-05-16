import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react-hot-toast"],
  },
  server: {
    // Allow requests from ngrok
    allowedHosts: [
      "676f-103-225-136-37.ngrok-free.app", // Your current ngrok host
      // Optional: Add a wildcard to allow all ngrok subdomains
      ".ngrok-free.app",
    ],
  },
});
