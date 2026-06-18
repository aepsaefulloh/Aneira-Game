import Phaser from "phaser";
import { AudioManager } from "../../core/managers/AudioManager";

export type BaseButtonOptions = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type BaseButtonControl = Phaser.GameObjects.Container & {
  setLabel: (label: string) => void;
};

export const createBaseButton = ({
  scene,
  x,
  y,
  width,
  height,
  label,
  onClick,
  disabled = false,
}: BaseButtonOptions): BaseButtonControl => {
  const radius = Math.min(height / 2, 20);
  const baseColor = disabled ? 0xd9d4cb : 0x8fcdf2;
  const hoverColor = disabled ? baseColor : 0xa9dcfb;
  const pressedColor = disabled ? baseColor : 0x73b7e0;
  const strokeColor = disabled ? 0xb9b1a6 : 0x527892;
  const shadowColor = disabled ? 0xc8c0b5 : 0x5e9dbf;
  const textColor = disabled ? "#867f74" : "#294458";

  // Shadow rounded rect (no interaction)
  const shadowGfx = scene.add.graphics();
  const drawShadow = (oy = 6): void => {
    shadowGfx.clear();
    shadowGfx.fillStyle(shadowColor, 0.38);
    shadowGfx.fillRoundedRect(-width / 2, -height / 2 + oy, width, height, radius);
  };
  drawShadow();

  // Button body (rounded rect)
  const bgGfx = scene.add.graphics();
  const drawBg = (color: number): void => {
    bgGfx.clear();
    bgGfx.fillStyle(color, 1);
    bgGfx.fillRoundedRect(-width / 2, -height / 2, width, height, radius);
    bgGfx.lineStyle(2.5, strokeColor, disabled ? 0.45 : 1);
    bgGfx.strokeRoundedRect(-width / 2, -height / 2, width, height, radius);
  };
  drawBg(baseColor);

  // Soft shine on top-left corner
  const shine = scene.add.ellipse(
    -width * 0.18,
    -height * 0.22,
    width * 0.4,
    height * 0.3,
    0xffffff,
    0.2,
  );

  const text = scene.add
    .text(0, 0, label, {
      color: textColor,
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: `${Math.round(Math.min(24, height * 0.37))}px`,
      fontStyle: "bold",
      align: "center",
    })
    .setOrigin(0.5);

  // Invisible transparent Rectangle as the hit area on top
  const hitArea = scene.add
    .rectangle(0, 0, width, height, 0x000000, 0)
    .setInteractive({ useHandCursor: !disabled });

  const container = scene.add.container(x, y, [
    shadowGfx,
    bgGfx,
    shine,
    text,
    hitArea,
  ]) as BaseButtonControl;
  container.setSize(width, height);
  container.setData("labelText", text);
  container.setLabel = (nextLabel: string) => {
    text.setText(nextLabel);
  };

  hitArea
    .on("pointerdown", () => {
      if (disabled) return;
      drawShadow(2);
      container.y = y + 3;
      drawBg(pressedColor);
    })
    .on("pointerup", () => {
      if (disabled) return;
      drawShadow(6);
      container.y = y;
      drawBg(hoverColor);
      AudioManager.play(scene, "animal-food-tap");
      onClick();
    })
    .on("pointerover", () => {
      if (!disabled) drawBg(hoverColor);
    })
    .on("pointerout", () => {
      drawShadow(6);
      container.y = y;
      drawBg(baseColor);
    });

  return container;
};
