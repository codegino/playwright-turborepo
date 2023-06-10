import { Page, expect } from "@playwright/test";
import {
  MITT3_AUTH_PAGE,
  MITT3_HOSTNAME,
  MITT3_PASSWORD,
  MITT3_USERNAME,
} from "../constants";

export class AuthenticatedPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login() {
    await this.page.goto(MITT3_HOSTNAME);

    await expect(this.page).toHaveURL(new RegExp(MITT3_AUTH_PAGE));

    await this.page.locator("label").filter({ hasText: "E-post" }).click();

    await this.page.getByLabel("Användarnamn (e-post)").fill(MITT3_USERNAME);

    await this.page
      .getByLabel("Lösenord", { exact: true })
      .fill(MITT3_PASSWORD);

    await this.page.getByRole("button", { name: "Logga in" }).click();

    await expect(this.page).toHaveURL(MITT3_HOSTNAME, {
      timeout: 20000,
    });
  }

  async navigateToHomePage() {
    await this.page.goto("https://www.tre.se/mitt3");
  }

  async acceptAllCookies() {
    await this.page.getByRole("button", { name: "Godkänn alla" }).click();
  }
}
