import Phaser from "phaser";
import { getViewportCenter } from "../../core/utils/scale";
import { BRAND_THEME, toCssColor, type AgeTheme } from "../../core/theme/age-themes";

export const createSceneBackdrop = (
  scene: Phaser.Scene,
  color: number = BRAND_THEME.backgroundColor,
): void => {
  const { width, height } = scene.scale;
  scene.add.rectangle(width / 2, height / 2, width, height, color).setOrigin(0.5);
};

export const createSceneTitle = (
  scene: Phaser.Scene,
  title: string,
  subtitle?: string,
  theme: AgeTheme = BRAND_THEME,
): void => {
  const { width } = scene.scale;
  const center = getViewportCenter(width, scene.scale.height);

  scene.add
    .text(center.x, 90, title, {
      color: toCssColor(theme.textColor),
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "36px",
      fontStyle: "bold",
      align: "center",
    })
    .setOrigin(0.5);

  if (subtitle) {
    scene.add
      .text(center.x, 142, subtitle, {
        color: toCssColor(theme.mutedTextColor),
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "20px",
        align: "center",
        wordWrap: { width: width - 64 },
      })
      .setOrigin(0.5);
  }
};
