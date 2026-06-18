import Phaser from "phaser";
import { LanguageManager } from "../../core/managers/LanguageManager";
import type { Language } from "../../core/types/localized-text.type";
import { BRAND_THEME, toCssColor, type AgeTheme } from "../../core/theme/age-themes";

export type LanguageSelectorOptions = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  theme?: AgeTheme;
  // Called after the language has been stored. Scenes typically restart so all
  // user-facing text refreshes in the newly selected language.
  onChange?: (language: Language) => void;
};

const SEGMENTS: { language: Language; label: string }[] = [
  { language: "idn", label: "IDN" },
  { language: "en", label: "EN" },
];

// Reusable pill: [ IDN | EN ]. Large enough for touch, never a tiny dropdown.
export const createLanguageSelector = ({
  scene,
  x,
  y,
  theme = BRAND_THEME,
  onChange,
}: LanguageSelectorOptions): Phaser.GameObjects.Container => {
  const segmentWidth = 56;
  const height = 44;
  const width = segmentWidth * SEGMENTS.length;

  const container = scene.add.container(x, y);
  container.setSize(width, height);

  const border = scene.add
    .rectangle(0, 0, width, height, theme.surfaceColor)
    .setStrokeStyle(3, theme.primaryColor);
  container.add(border);

  const refresh = (): void => {
    const active = LanguageManager.getLanguage();

    SEGMENTS.forEach((segment, index) => {
      const isActive = segment.language === active;
      const fill = container.getData(`fill-${index}`) as Phaser.GameObjects.Rectangle;
      const label = container.getData(`label-${index}`) as Phaser.GameObjects.Text;
      fill.setFillStyle(isActive ? theme.primaryColor : theme.surfaceColor);
      label.setColor(isActive ? "#ffffff" : toCssColor(theme.mutedTextColor));
      label.setFontStyle(isActive ? "bold" : "normal");
    });
  };

  SEGMENTS.forEach((segment, index) => {
    const segmentX = -width / 2 + segmentWidth / 2 + index * segmentWidth;
    const fill = scene.add.rectangle(segmentX, 0, segmentWidth - 4, height - 6, theme.surfaceColor);
    const label = scene.add
      .text(segmentX, 0, segment.label, {
        color: toCssColor(theme.mutedTextColor),
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "18px",
        align: "center",
      })
      .setOrigin(0.5);

    container.add(fill);
    container.add(label);
    container.setData(`fill-${index}`, fill);
    container.setData(`label-${index}`, label);

    fill.setInteractive({ useHandCursor: true });
    fill.on("pointerup", () => {
      if (LanguageManager.getLanguage() === segment.language) {
        return;
      }

      LanguageManager.setLanguage(segment.language);
      refresh();
      onChange?.(segment.language);
    });
  });

  refresh();
  return container;
};
