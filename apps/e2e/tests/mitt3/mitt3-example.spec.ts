import { test, expect } from "@playwright/test";

test("ordering mobile plan", async ({ page }) => {
  await page.goto("https://tre.se/mitt3");

  await expect(page).toHaveURL(new RegExp("https://accounts.tre.se/logga-in/"));

  await page.locator("label").filter({ hasText: "E-post" }).click();

  await page.getByLabel("Användarnamn (e-post)").fill("henrik.ed@tre.se");

  await page.getByLabel("Lösenord", { exact: true }).fill("Citron23");

  await page.getByRole("button", { name: "Logga in" }).click();

  await expect(page).toHaveURL("https://www.tre.se/mitt3", { timeout: 10000 });

  await page.getByRole("button", { name: "Godkänn alla" }).click();

  await page.close();
});
