import { test, expect, type Page } from "@playwright/test";
import path from "path";
import fs from "fs";

const GAME_W = 390;
const GAME_H = 844;

const VIEWPORTS = [
  { name: "mobile-small",     width: 360,  height: 640  },
  { name: "mobile-standard",  width: 390,  height: 844  },
  { name: "mobile-large",     width: 430,  height: 932  },
  { name: "tablet-portrait",  width: 768,  height: 1024 },
  { name: "tablet-landscape", width: 1024, height: 768  },
  { name: "desktop",          width: 1366, height: 768  },
] as const;

const EVIDENCE = path.join(process.cwd(), "evidence", "responsive");

async function clickAtGame(page: Page, gx: number, gy: number): Promise<void> {
  const box = await page.locator("canvas").first().boundingBox();
  if (!box) throw new Error("Canvas bounding box not available");
  await page.mouse.click(
    box.x + (gx / GAME_W) * box.width,
    box.y + (gy / GAME_H) * box.height,
  );
}

async function waitForScene(page: Page, ms = 900): Promise<void> {
  await page.waitForTimeout(ms);
}

async function assertCanvas(page: Page, vp: { width: number; height: number }): Promise<void> {
  const box = await page.locator("canvas").first().boundingBox();
  expect(box, "Canvas bounding box should exist").not.toBeNull();
  // Portrait game canvas width is constrained by the smaller viewport dimension on landscape screens.
  // Use min(vw, vh) * 0.35 so the check is meaningful for both portrait and landscape viewports.
  const minDim = Math.min(vp.width, vp.height);
  expect(box!.width).toBeGreaterThan(minDim * 0.35);
  // Canvas should be at least 55% as tall as the viewport
  expect(box!.height).toBeGreaterThan(vp.height * 0.55);
  // No horizontal overflow
  expect(box!.x + box!.width).toBeLessThanOrEqual(vp.width + 2);
}

// ── HomeScene at every viewport ─────────────────────────────────────────────

for (const vp of VIEWPORTS) {
  test(`HomeScene — ${vp.name} (${vp.width}×${vp.height})`, async ({ page }) => {
    fs.mkdirSync(EVIDENCE, { recursive: true });
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    await page.locator("canvas").first().waitFor({ state: "visible" });
    await waitForScene(page, 1200);

    await assertCanvas(page, vp);

    await page.screenshot({
      path: path.join(EVIDENCE, `home-${vp.name}.png`),
      fullPage: false,
    });
  });
}

// ── Full navigation flow at mobile-standard ──────────────────────────────────

test("full flow — mobile-standard (390×844)", async ({ page }) => {
  fs.mkdirSync(EVIDENCE, { recursive: true });
  const vp = { width: 390, height: 844 };
  await page.setViewportSize(vp);
  await page.goto("/");
  await page.locator("canvas").first().waitFor({ state: "visible" });
  await waitForScene(page, 1400);

  await assertCanvas(page, vp);
  await page.screenshot({ path: path.join(EVIDENCE, "flow-1-home.png") });

  // Start button (cardY=430 + cardH*0.22 ≈ 545)
  await clickAtGame(page, 195, 545);
  await waitForScene(page);

  await assertCanvas(page, vp);
  await page.screenshot({ path: path.join(EVIDENCE, "flow-2-age-select.png") });

  // Age 3 card (first card, y≈250)
  await clickAtGame(page, 195, 250);
  await waitForScene(page);

  await assertCanvas(page, vp);
  await page.screenshot({ path: path.join(EVIDENCE, "flow-3-game-list.png") });

  // Animal Food card (first game, y≈220)
  await clickAtGame(page, 195, 220);
  await waitForScene(page, 1000);

  await assertCanvas(page, vp);
  await page.screenshot({ path: path.join(EVIDENCE, "flow-4-animal-food.png") });
});

// ── AnimalFoodScene at key viewports ─────────────────────────────────────────

const AF_VIEWPORTS = [
  { name: "mobile-small",   width: 360,  height: 640  },
  { name: "mobile-standard",width: 390,  height: 844  },
  { name: "tablet-portrait",width: 768,  height: 1024 },
  { name: "desktop",        width: 1366, height: 768  },
] as const;

for (const vp of AF_VIEWPORTS) {
  test(`AnimalFoodScene — ${vp.name}`, async ({ page }) => {
    fs.mkdirSync(EVIDENCE, { recursive: true });
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    await page.locator("canvas").first().waitFor({ state: "visible" });
    await waitForScene(page, 1400);

    await clickAtGame(page, 195, 545); // Start button (btnY = cardY + cardH*0.22 ≈ 545)
    await waitForScene(page);
    await clickAtGame(page, 195, 250); // Age 3
    await waitForScene(page);
    await clickAtGame(page, 195, 220); // Animal Food
    await waitForScene(page, 1000);

    await assertCanvas(page, { width: vp.width, height: vp.height });

    await page.screenshot({
      path: path.join(EVIDENCE, `animal-food-${vp.name}.png`),
      fullPage: false,
    });
  });
}
