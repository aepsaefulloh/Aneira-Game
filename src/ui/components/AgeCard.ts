import Phaser from "phaser";
import type { AgeGroup } from "../../core/types/age-group.type";
import { BRAND_THEME, type AgeTheme } from "../../core/theme/age-themes";

export type AgeCardOptions = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  description: string;
  status: AgeGroup["status"];
  theme?: AgeTheme;
  badgeText: string;
  onClick: () => void;
};

export const createAgeCard = ({
  scene,
  x,
  y,
  width,
  height,
  label,
  description,
  status,
  theme = BRAND_THEME,
  badgeText,
  onClick,
}: AgeCardOptions): Phaser.GameObjects.Container => {
  const disabled = status !== "available";
  const radius = 16;
  const fillColor = disabled ? 0xe9e5dd : theme.surfaceColor;
  const strokeColor = disabled ? 0xc4beb4 : theme.accentColor;
  const titleColor = disabled ? "#7f786e" : "#5b4636";
  const bodyColor = disabled ? "#928a80" : "#6c5a4d";
  const badgeColor = disabled ? 0xd3d0ca : theme.accentColor;
  const swatchColor = disabled ? 0xc4beb4 : theme.secondaryColor;

  // Card background (rounded rect)
  const bgGfx = scene.add.graphics();
  bgGfx.fillStyle(fillColor, 1);
  bgGfx.fillRoundedRect(-width / 2, -height / 2, width, height, radius);
  bgGfx.lineStyle(2.5, strokeColor, 1);
  bgGfx.strokeRoundedRect(-width / 2, -height / 2, width, height, radius);

  // Left edge swatch (inset so it stays within the card's rounded corners)
  const swatchGfx = scene.add.graphics();
  swatchGfx.fillStyle(swatchColor, 1);
  swatchGfx.fillRoundedRect(-width / 2 + 10, -(height / 2 - 20), 8, height - 40, 4);

  const title = scene.add
    .text(-width / 2 + 32, -height / 2 + 18, label, {
      color: titleColor,
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "26px",
      fontStyle: "bold",
      wordWrap: { width: width - 150 },
    })
    .setOrigin(0, 0);

  const subtitle = scene.add
    .text(-width / 2 + 32, -height / 2 + 58, description, {
      color: bodyColor,
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "17px",
      wordWrap: { width: width - 52 },
    })
    .setOrigin(0, 0);

  // Badge chip (rounded pill)
  const chipX = width / 2 - 74;
  const chipY = -height / 2 + 24;
  const chipW = 120;
  const chipH = 34;
  const chipGfx = scene.add.graphics();
  chipGfx.fillStyle(badgeColor, disabled ? 1 : 0.55);
  chipGfx.fillRoundedRect(chipX - chipW / 2, chipY - chipH / 2, chipW, chipH, chipH / 2);
  chipGfx.lineStyle(1.5, disabled ? 0xb8b2a7 : theme.accentColor, 0.8);
  chipGfx.strokeRoundedRect(chipX - chipW / 2, chipY - chipH / 2, chipW, chipH, chipH / 2);

  const statusLabel = scene.add
    .text(chipX, chipY, badgeText, {
      color: disabled ? "#6f685f" : "#395442",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "14px",
      fontStyle: "bold",
      align: "center",
    })
    .setOrigin(0.5);

  // Transparent hit area for interaction (on top)
  const hitArea = scene.add
    .rectangle(0, 0, width, height, 0x000000, 0)
    .setInteractive({ useHandCursor: !disabled });

  const container = scene.add.container(x, y, [
    bgGfx,
    swatchGfx,
    title,
    subtitle,
    chipGfx,
    statusLabel,
    hitArea,
  ]);
  container.setSize(width, height);

  hitArea
    .on("pointerdown", () => {
      if (!disabled) container.setScale(0.97);
    })
    .on("pointerup", () => {
      container.setScale(1);
      if (!disabled) onClick();
    })
    .on("pointerout", () => {
      container.setScale(1);
    });

  return container;
};
