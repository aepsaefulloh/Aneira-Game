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
  // Each age card previews its own segment theme accent.
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
  const fillColor = disabled ? 0xe9e5dd : theme.surfaceColor;
  const strokeColor = disabled ? 0xc4beb4 : theme.accentColor;
  const titleColor = disabled ? "#7f786e" : "#5b4636";
  const bodyColor = disabled ? "#928a80" : "#6c5a4d";
  const badgeColor = disabled ? 0xd3d0ca : theme.accentColor;

  const background = scene.add
    .rectangle(0, 0, width, height, fillColor)
    .setStrokeStyle(3, strokeColor);

  // Small theme swatch on the left edge to make each segment feel distinct.
  const swatch = scene.add
    .rectangle(-width / 2 + 14, 0, 8, height - 28, disabled ? 0xc4beb4 : theme.secondaryColor)
    .setOrigin(0.5);

  const title = scene.add
    .text(-width / 2 + 32, -height / 2 + 18, label, {
      color: titleColor,
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "28px",
      fontStyle: "bold",
      wordWrap: { width: width - 150 },
    })
    .setOrigin(0, 0);
  const subtitle = scene.add
    .text(-width / 2 + 32, -height / 2 + 62, description, {
      color: bodyColor,
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "18px",
      wordWrap: { width: width - 52 },
    })
    .setOrigin(0, 0);
  const statusChip = scene.add
    .rectangle(width / 2 - 74, -height / 2 + 24, 120, 34, badgeColor, disabled ? 1 : 0.5)
    .setStrokeStyle(2, disabled ? 0xb8b2a7 : theme.accentColor);
  const statusLabel = scene.add
    .text(width / 2 - 74, -height / 2 + 24, badgeText, {
      color: disabled ? "#6f685f" : "#395442",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "14px",
      fontStyle: "bold",
      align: "center",
    })
    .setOrigin(0.5);

  const container = scene.add.container(x, y, [
    background,
    swatch,
    title,
    subtitle,
    statusChip,
    statusLabel,
  ]);
  container.setSize(width, height);

  background.setInteractive({ useHandCursor: !disabled });
  background
    .on("pointerdown", () => {
      if (!disabled) {
        background.setScale(0.985);
      }
    })
    .on("pointerup", () => {
      background.setScale(1);
      if (!disabled) {
        onClick();
      }
    })
    .on("pointerout", () => {
      background.setScale(1);
    });

  return container;
};
