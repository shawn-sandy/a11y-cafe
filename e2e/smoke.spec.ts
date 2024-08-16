import { test, expect } from "@playwright/test";

test("smoke test", async ({ page }) => {
  await page.goto("http://localhost:4321/");
  expect(true).toBe(true);
});
