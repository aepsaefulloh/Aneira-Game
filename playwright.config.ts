import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  outputDir: "./evidence/pw-artifacts",
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
  },
  // Reuse an already-running dev server; start one if needed.
  webServer: {
    command: "bun run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 15_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        headless: true,
      },
    },
  ],
});
