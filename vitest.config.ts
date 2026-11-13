import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  // La prima importazione delle route Next è lenta su una macchina carica: margine ampio, nessun test lento di proposito
  test: { include: ["tests/**/*.test.ts"], environment: "node", testTimeout: 30_000 },
});
