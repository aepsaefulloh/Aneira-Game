import Phaser from "phaser";
import { LanguageManager } from "../../core/managers/LanguageManager";
import type { Language } from "../../core/types/localized-text.type";
import { BRAND_THEME, toCssColor, type AgeTheme } from "../../core/theme/age-themes";

export type LanguageSelectorOptions = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  theme?: AgeTheme;
  onChange?: (language: Language) => void;
};

const SEGMENTS: { language: Language; label: string }[] = [
  { language: "idn", label: "IDN" },
  { language: "en", label: "EN" },
];

export const createLanguageSelector = ({
  scene,
  x,
  y,
  theme = BRAND_THEME,
  onChange,
}: LanguageSelectorOptions): Phaser.GameObjects.Container => {
  const segW = 54;
  const totalW = segW * SEGMENTS.length;
  const h = 44;
  const r = h / 2;

  const container = scene.add.container(x, y);
  container.setSize(totalW, h);

  // Single graphics object redrawn on state change
  const pillGfx = scene.add.graphics();
  container.add(pillGfx);

  // Text labels (added above graphics so they appear on top)
  const labels = SEGMENTS.map((seg, i) => {
    const segX = -totalW / 2 + segW / 2 + i * segW;
    const lbl = scene.add
      .text(segX, 0, seg.label, {
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "17px",
        fontStyle: "bold",
        align: "center",
        color: toCssColor(theme.mutedTextColor),
      })
      .setOrigin(0.5);
    container.add(lbl);
    container.setData(`label-${i}`, lbl);
    return lbl;
  });

  const refresh = (): void => {
    const active = LanguageManager.getLanguage();
    pillGfx.clear();

    // Pill background
    pillGfx.fillStyle(theme.surfaceColor, 0.95);
    pillGfx.fillRoundedRect(-totalW / 2, -h / 2, totalW, h, r);

    // Active segment highlight
    const activeIdx = SEGMENTS.findIndex((s) => s.language === active);
    if (activeIdx === 0) {
      pillGfx.fillStyle(theme.primaryColor, 1);
      pillGfx.fillRoundedRect(-totalW / 2, -h / 2, segW, h, { tl: r, bl: r, tr: 6, br: 6 });
    } else if (activeIdx === 1) {
      pillGfx.fillStyle(theme.primaryColor, 1);
      pillGfx.fillRoundedRect(-totalW / 2 + segW, -h / 2, segW, h, { tl: 6, bl: 6, tr: r, br: r });
    }

    // Center divider line
    pillGfx.lineStyle(1.5, theme.primaryColor, 0.3);
    pillGfx.beginPath();
    pillGfx.moveTo(0, -h / 2 + 8);
    pillGfx.lineTo(0, h / 2 - 8);
    pillGfx.strokePath();

    // Outer stroke
    pillGfx.lineStyle(2, theme.primaryColor, 0.85);
    pillGfx.strokeRoundedRect(-totalW / 2, -h / 2, totalW, h, r);

    SEGMENTS.forEach((seg, i) => {
      const isActive = seg.language === active;
      labels[i].setColor(isActive ? "#ffffff" : toCssColor(theme.mutedTextColor));
      labels[i].setFontStyle(isActive ? "bold" : "normal");
    });
  };

  // Transparent hit rectangles for each segment (added last so they sit on top)
  SEGMENTS.forEach((seg, i) => {
    const segX = -totalW / 2 + segW / 2 + i * segW;
    const hit = scene.add
      .rectangle(segX, 0, segW, h, 0x000000, 0)
      .setInteractive({ useHandCursor: true });
    container.add(hit);

    hit.on("pointerup", () => {
      if (LanguageManager.getLanguage() === seg.language) return;
      LanguageManager.setLanguage(seg.language);
      refresh();
      onChange?.(seg.language);
    });
  });

  refresh();
  return container;
};
