import { devices, expect, test } from "@playwright/test";
import { TRE_HOSTNAME } from "../../constants";

test.use({
  ...devices["iPhone 6"],
});

test("selects the correct tab after transitioning from consumer to business pages", async ({
  page,
}) => {
  await page.goto(TRE_HOSTNAME);

  await page.getByRole("button", { name: "Godkänn alla" }).click();
  await page.getByRole("button", { name: "Meny" }).click();

  const privateTab = page.getByRole("tab", { name: "Till Privat" });
  const businessTab = page.getByRole("tab", { name: "Till Företag" });

  await expect(privateTab).toHaveAttribute("aria-selected", "true");
  await expect(businessTab).toHaveAttribute("aria-selected", "false");

  await businessTab.click();
  await expect(businessTab).toHaveAttribute("aria-selected", "true");
  await expect(privateTab).toHaveAttribute("aria-selected", "false");

  await page.getByRole("link", { name: "Startsida" }).click();

  await expect(page).toHaveURL(`${TRE_HOSTNAME}/treforetag`);

  await page.getByRole("button", { name: "Meny" }).click();
  await expect(businessTab).toHaveAttribute("aria-selected", "true");
  await expect(privateTab).toHaveAttribute("aria-selected", "false");

  page.close();
});

test(`selects the correct tab after closing the menu`, async ({ page }) => {
  await page.goto(TRE_HOSTNAME);

  await page.getByRole("button", { name: "Godkänn alla" }).click();
  await page.getByRole("button", { name: "Meny" }).click();

  const privateTab = page.getByRole("tab", { name: "Till Privat" });
  const businessTab = page.getByRole("tab", { name: "Till Företag" });

  await expect(privateTab).toHaveAttribute("aria-selected", "true");
  await expect(businessTab).toHaveAttribute("aria-selected", "false");

  await businessTab.click();
  await expect(businessTab).toHaveAttribute("aria-selected", "true");
  await expect(privateTab).toHaveAttribute("aria-selected", "false");

  await page.getByText("Stäng").click();

  await page.getByRole("button", { name: "Meny" }).click();
  await expect(privateTab).toHaveAttribute("aria-selected", "true");
  await expect(businessTab).toHaveAttribute("aria-selected", "false");

  page.close();
});
