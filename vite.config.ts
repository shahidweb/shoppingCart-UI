import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/",
  // base: "/www/shopkart/", for dev
  plugins: [react(), tailwindcss()],
});
