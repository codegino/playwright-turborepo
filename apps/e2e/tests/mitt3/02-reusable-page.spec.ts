import { test, expect, Browser } from "@playwright/test";
import { AuthenticatedPage } from "../../pom/authenticated-page";

let homePage: AuthenticatedPage;

test.beforeAll(async ({ browser }) => {
  homePage = new AuthenticatedPage(await browser.newPage());

  await homePage.login();
  await homePage.acceptAllCookies();
});

test.beforeEach(async () => {
  await homePage.navigateToHomePage();
});

test("some test 02", async () => {
  const { page } = homePage;

  await page.getByRole("link", { name: "Mina beställningar" }).click();

  await expect(
    page.getByRole("heading", { name: "Ordernummer: 34950915" })
  ).toBeVisible();
});

test("some test 03", async () => {
  const { page } = homePage;

  await page.getByRole("link", { name: "Rörliga kostnader" }).click();

  await expect(
    page.getByRole("heading", { name: "Rörliga kostnader" })
  ).toBeVisible();
});

test.afterAll(async () => {
  await homePage.page.close();
});
