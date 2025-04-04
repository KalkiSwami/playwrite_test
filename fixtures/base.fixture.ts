import { test as base } from "@playwright/test";
import { AppPage } from "../pages/AppPage";

// Extend the base test fixture with page objects
export const test = base.extend<{
  appPage: AppPage;
}>({
  // Define fixtures
  appPage: async ({ page }, use) => {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
      throw new Error("BASE_URL is not defined in the environment variables.");
    }
    const appPage = new AppPage(page);
    await appPage.navigate(baseUrl);
    await use(appPage);
  },
});

export { expect } from "@playwright/test";
