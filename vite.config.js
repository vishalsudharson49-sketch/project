import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// optional config for smoother dev experience
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
