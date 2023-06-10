import { test } from "@playwright/test";
import { TRE_HOSTNAME } from "../../constants";

test(`e-sim`, async ({ page }) => {
  await page.goto(`${TRE_HOSTNAME}/esim/start`);

  await page.getByRole("button", { name: "Verifiera med BankID" }).click();
});
