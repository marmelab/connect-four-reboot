import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), basicSsl()] as UserConfig["plugins"],
  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
});
