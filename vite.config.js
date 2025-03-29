/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import eslintPlugin from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    build: {
        outDir: "build",
    },
    plugins: [react(), svgr({ svgrOptions: { icon: true } })],
    define: {
        global: "window",
    },
    server: {
        host: "localhost",
        port: 3000,
        open: true,
    },
});
