import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig, type PluginOption } from "vite";

export default defineConfig({
  plugins: [react(), svgr() as unknown as PluginOption]
});
