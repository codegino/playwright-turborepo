import { Page, expect } from "@playwright/test";

export class AuthenticatedPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login() {
    await this.page.goto("https://tre.se/mitt3");

    await expect(this.page).toHaveURL(
      new RegExp("https://accounts.tre.se/logga-in/")
    );

    await this.page.locator("label").filter({ hasText: "E-post" }).click();

    await this.page
      .getByLabel("Användarnamn (e-post)")
      .fill("henrik.ed@tre.se");

    await this.page.getByLabel("Lösenord", { exact: true }).fill("Citron23");

    await this.page.getByRole("button", { name: "Logga in" }).click();

    await expect(this.page).toHaveURL("https://www.tre.se/mitt3", {
      timeout: 10000,
    });
  }

  async navigateToHomePage() {
    await this.page.goto("https://www.tre.se/mitt3");
  }

  async acceptAllCookies() {
    await this.page.getByRole("button", { name: "Godkänn alla" }).click();
  }
}
