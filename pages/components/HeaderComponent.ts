import { Page, Locator } from "@playwright/test";

export class HeaderComponent {
  constructor(readonly page: Page) {}

  get signinBtn(): Locator {
    return this.page.locator('a[href="/auth/login"]');
  }

  get languageBtn(): Locator {
    return this.page.locator("#language");
  }

  get categoriesDropdownBtn(): Locator {
    return this.page.locator('a[data-test="nav-categories"]');
  }

  get linkCategory(): Locator {
    return this.page.locator('ul[aria-label="nav-categories"] li a');
  }

  get cartCount(): Locator {
    return this.page.locator("span#lblCartCount");
  }

  get basketIcon(): Locator {
    return this.page.locator('a[data-test="nav-cart"]');
  }

  async clickSigninBtn() {
    await this.signinBtn.click();
  }

  async changeLanguage(lang: string) {
    await this.languageBtn.click();
    await this.page.locator(`a[data-test="lang-${lang}"]`).click();
  }

  async clickRandomCategory() {
    await this.categoriesDropdownBtn.click();
    const categories = await this.linkCategory.all();

    if (categories.length === 0) {
      throw new Error("No category links found");
    }
    const maxItems = Math.min(categories.length, 3);
    const firstFour = categories.slice(0, maxItems);
    const randomIndex = Math.floor(Math.random() * firstFour.length);
    await firstFour[randomIndex].click();
  }
}
