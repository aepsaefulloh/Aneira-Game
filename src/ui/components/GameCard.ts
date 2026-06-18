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
  const fillColor = disabled ? 0xf0ede6 : theme.surfaceColor;
  const strokeColor = disabled ? 0xcbc3b7 : theme.accentColor;
  // Coming soon games stay visible but softer so the page never feels broken.
  const badgeColor = disabled ? 0xe0ddd7 : theme.accentColor;

  const background = scene.add
    .rectangle(0, 0, width, height, fillColor)
    .setStrokeStyle(3, strokeColor);
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
    .text(-width / 2 + 20, -height / 2 + 58, subtitle, {
      color: disabled ? "#928a80" : "#6c5a4d",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "17px",
      wordWrap: { width: width - 40 },
    })
    .setOrigin(0, 0);
  const badge = scene.add
    .rectangle(width / 2 - 74, -height / 2 + 24, 120, 34, badgeColor, disabled ? 1 : 0.5)
    .setStrokeStyle(2, disabled ? 0xb8b2a7 : theme.accentColor);
  const badgeLabel = scene.add
    .text(width / 2 - 74, -height / 2 + 24, badgeText, {
      color: disabled ? "#6f685f" : "#395442",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "14px",
      fontStyle: "bold",
    })
    .setOrigin(0.5);

  const container = scene.add.container(x, y, [background, heading, copy, badge, badgeLabel]);
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
