import { test, expect } from "@playwright/test";
import {
  MITT3_AUTH_PAGE,
  MITT3_HOSTNAME,
  MITT3_PASSWORD,
  MITT3_USERNAME,
} from "../../constants";

test("simple authentication", async ({ page }) => {
  await page.goto(MITT3_HOSTNAME);

  await expect(page).toHaveURL(new RegExp(MITT3_AUTH_PAGE));

  await page.locator("label").filter({ hasText: "E-post" }).click();

  await page.getByLabel("Användarnamn (e-post)").fill(MITT3_USERNAME);

  await page.getByLabel("Lösenord", { exact: true }).fill(MITT3_PASSWORD);

  await page.getByRole("button", { name: "Logga in" }).click();

  await expect(page).toHaveURL(MITT3_HOSTNAME, { timeout: 20000 });

  await page.getByRole("button", { name: "Godkänn alla" }).click();

  await page.close();
});
