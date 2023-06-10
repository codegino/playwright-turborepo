import { test, expect } from "@playwright/test";

test("ordering mobile plan", async ({ page }) => {
  await page.goto("https://tre.se");

  await page.getByRole("button", { name: "Godkänn alla" }).click();

  await expect(page).toHaveTitle(
    "Mobiloperatören Tre - Det är Trevligt! | Tre"
  );

  await page.getByRole("link", { name: "Mobiler", exact: true }).click();

  await page
    .getByRole("link", {
      name: "Extra inbytesrabatt Apple iPhone 14 Apple iPhone 14 Från 469 kr/månad med 36 månader delbetalning 479 kr/mån",
    })
    .click();

  await page.getByLabel("256GB", { exact: true }).click();
  await page.getByLabel("24 mån510 kr/mån").click();
  await page.getByLabel("20GB299 kr/mån").click();

  const summary = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "Översikt" }) });

  await summary.getByRole("button", { name: "Prisdetaljer" }).click();

  await page.getByRole("link", { name: "Gå vidare" }).click();

  await page.getByLabel("3Snabbast för 49 kr/månUpp till 1000 Mbit/s").click();

  await page.getByRole("link", { name: "Gå vidare" }).click();

  await page.getByLabel("Nytt nummer").click();

  await page.getByRole("button", { name: "Nästa" }).click();

  await page.getByLabel("Personnummer").fill("191212121212");
  await page.getByLabel("Mejladress").fill("Test@tre.se");
  await page.getByLabel("Kontaktnummer").fill("0700000000");

  await page.getByRole("button", { name: "Nästa" }).click();

  await expect(
    page.getByRole("heading", { name: "Leverans", exact: true })
  ).toBeVisible();

  await page.getByRole("button", { name: "Nästa" }).click();

  await page
    .getByText(
      "Jag godkänner Tres allmänna villkor och integritetspolicy samt att en kredituppl"
    )
    .click();

  await page.getByRole("button", { name: "Slutför köp" }).click();

  await expect(
    page.getByRole("heading", { name: "Tack för din beställning" })
  ).toBeVisible();

  await page.getByRole("button", { name: "Prisdetaljer" }).click();

  // await expect(
  //   page.getByText(
  //     "ÖversiktApple iPhone 14510 kr/månMidnatt, 256GB525 kr/månDelbetalning 24 månAbon"
  //   )
  // ).toHaveScreenshot();
  await page.close();
});
