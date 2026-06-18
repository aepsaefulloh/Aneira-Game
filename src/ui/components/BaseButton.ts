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
  const baseColor = disabled ? 0xd9d4cb : 0x8fcdf2;
  const hoverColor = disabled ? baseColor : 0xa9dcfb;
  const pressedColor = disabled ? baseColor : 0x73b7e0;
  const strokeColor = disabled ? 0xb9b1a6 : 0x527892;
  const textColor = disabled ? "#867f74" : "#294458";

  const shadow = scene.add.rectangle(0, 7, width, height, disabled ? 0xc8c0b5 : 0x6ea8ca, 0.45);

  const background = scene.add
    .rectangle(0, 0, width, height, baseColor)
    .setStrokeStyle(3, strokeColor);

  const text = scene.add
    .text(0, 0, label, {
      color: textColor,
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "24px",
      fontStyle: "bold",
      align: "center",
    })
    .setOrigin(0.5);

  const shine = scene.add.ellipse(-width * 0.16, -height * 0.18, width * 0.38, height * 0.32, 0xffffff, 0.28);

  const container = scene.add.container(x, y, [shadow, background, shine, text]) as BaseButtonControl;
  container.setSize(width, height);
  container.setData("labelText", text);
  container.setLabel = (nextLabel: string) => {
    text.setText(nextLabel);
  };

  background.setInteractive({ useHandCursor: !disabled });
  background
    .on("pointerdown", () => {
      if (disabled) {
        return;
      }

      shadow.y = 3;
      container.y = y + 2;
      background.setFillStyle(pressedColor);
    })
    .on("pointerup", () => {
      if (disabled) {
        return;
      }

      shadow.y = 7;
      container.y = y;
      background.setFillStyle(hoverColor);
      AudioManager.play(scene, "animal-food-tap");
      onClick();
    })
    .on("pointerover", () => {
      background.setFillStyle(disabled ? baseColor : hoverColor);
    })
    .on("pointerout", () => {
      shadow.y = 7;
      container.y = y;
      background.setFillStyle(baseColor);
    });

  return container;
};
