import Phaser from "phaser";
import { AudioManager } from "../../core/managers/AudioManager";
import { BRAND_THEME, toCssColor, type AgeTheme } from "../../core/theme/age-themes";

export type SoundToggleOptions = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  theme?: AgeTheme;
};

export const createSoundToggle = ({
  scene,
  x,
  y,
  theme = BRAND_THEME,
}: SoundToggleOptions): Phaser.GameObjects.Container => {
  const w = 120;
  const h = 44;
  const r = h / 2;

  const container = scene.add.container(x, y);
  container.setSize(w, h);

  const pillGfx = scene.add.graphics();

  const label = scene.add
    .text(0, 0, "", {
      color: toCssColor(theme.textColor),
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "16px",
      fontStyle: "bold",
      align: "center",
    })
    .setOrigin(0.5);

  // Transparent hit Rectangle on top for interaction
  const hitArea = scene.add
    .rectangle(0, 0, w, h, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  container.add(pillGfx);
  container.add(label);
  container.add(hitArea);

  const refresh = (): void => {
    const muted = AudioManager.isMuted();
    pillGfx.clear();
    if (muted) {
      pillGfx.fillStyle(theme.surfaceColor, 0.95);
      pillGfx.fillRoundedRect(-w / 2, -h / 2, w, h, r);
      pillGfx.lineStyle(2, theme.secondaryColor, 0.5);
      pillGfx.strokeRoundedRect(-w / 2, -h / 2, w, h, r);
    } else {
      pillGfx.fillStyle(theme.secondaryColor, 0.55);
      pillGfx.fillRoundedRect(-w / 2, -h / 2, w, h, r);
      pillGfx.lineStyle(2, theme.secondaryColor, 0.9);
      pillGfx.strokeRoundedRect(-w / 2, -h / 2, w, h, r);
    }
    label.setText(muted ? "Sound Off" : "Sound On");
    label.setColor(muted ? toCssColor(theme.mutedTextColor) : toCssColor(theme.textColor));
  };

  hitArea.on("pointerup", () => {
    AudioManager.toggleMuted();
    if (!AudioManager.isMuted()) {
      AudioManager.play(scene, "animal-food-tap");
    }
    refresh();
  });

  refresh();
  return container;
};
