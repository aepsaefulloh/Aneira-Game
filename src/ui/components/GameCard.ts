import Phaser from "phaser";
import type { GameModule } from "../../core/types/game-module.type";
import { BRAND_THEME, type AgeTheme } from "../../core/theme/age-themes";

export type GameCardOptions = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  status: GameModule["status"];
  theme?: AgeTheme;
  badgeText: string;
  onClick: () => void;
};

export const createGameCard = ({
  scene,
  x,
  y,
  width,
  height,
  title,
  subtitle,
  status,
  theme = BRAND_THEME,
  badgeText,
  onClick,
}: GameCardOptions): Phaser.GameObjects.Container => {
  const disabled = status !== "available";
  const radius = 16;
  const fillColor = disabled ? 0xf0ede6 : theme.surfaceColor;
  const strokeColor = disabled ? 0xcbc3b7 : theme.accentColor;
  const badgeColor = disabled ? 0xe0ddd7 : theme.accentColor;

  // Card background (rounded rect)
  const bgGfx = scene.add.graphics();
  bgGfx.fillStyle(fillColor, 1);
  bgGfx.fillRoundedRect(-width / 2, -height / 2, width, height, radius);
  bgGfx.lineStyle(2.5, strokeColor, 1);
  bgGfx.strokeRoundedRect(-width / 2, -height / 2, width, height, radius);

  const heading = scene.add
    .text(-width / 2 + 20, -height / 2 + 18, title, {
      color: disabled ? "#7d766c" : "#5b4636",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "26px",
      fontStyle: "bold",
      wordWrap: { width: width - 140 },
    })
    .setOrigin(0, 0);

  const copy = scene.add
    .text(-width / 2 + 20, -height / 2 + 57, subtitle, {
      color: disabled ? "#928a80" : "#6c5a4d",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "17px",
      wordWrap: { width: width - 40 },
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

  const badgeLabel = scene.add
    .text(chipX, chipY, badgeText, {
      color: disabled ? "#6f685f" : "#395442",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "14px",
      fontStyle: "bold",
      align: "center",
    })
    .setOrigin(0.5);

  // Transparent hit area (on top)
  const hitArea = scene.add
    .rectangle(0, 0, width, height, 0x000000, 0)
    .setInteractive({ useHandCursor: !disabled });

  const container = scene.add.container(x, y, [
    bgGfx,
    heading,
    copy,
    chipGfx,
    badgeLabel,
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
