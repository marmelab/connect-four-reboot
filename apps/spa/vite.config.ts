import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()] as UserConfig["plugins"],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
});
