import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";

const isHTTPS = false;
// https://vitejs.dev/config/
export default defineConfig({
  envDir: "src",
  root: "src",
  server: {
    https: isHTTPS,
    port: isHTTPS ? 443 : 8080,
    host: "0.0.0.0",
  },
  plugins: isHTTPS ? [react(), basicSsl()] : [react()],
  appType: "spa",
});
