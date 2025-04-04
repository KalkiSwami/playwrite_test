import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
export default defineConfig({
  testDir: "./tests",
  use: {
    browserName: "chromium",
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
  },
  reporter: [["html", { outputFolder: "test-results" }]],
  projects: [
    {
      name: "chrome",
      testMatch: ["**/*.spec.ts"],
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.BASE_URL,
      },
      testIgnore: [],
    },
  ],
});
