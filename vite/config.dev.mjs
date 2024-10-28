import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  assetsInclude: ["*/**.mp3"],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
        },
      },
    },
  },
  server: {
    port: 8080,
  },
});
