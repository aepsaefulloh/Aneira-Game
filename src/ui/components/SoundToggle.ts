import Phaser from "phaser";
import { AudioManager } from "../../core/managers/AudioManager";
import { BRAND_THEME, toCssColor, type AgeTheme } from "../../core/theme/age-themes";

export type SoundToggleOptions = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  theme?: AgeTheme;
};

// Small, reusable setting. It should feel like a quiet preference, not a main
// action, so it stays compact and never dominates a header.
export const createSoundToggle = ({
  scene,
  x,
  y,
  theme = BRAND_THEME,
}: SoundToggleOptions): Phaser.GameObjects.Container => {
  const width = 116;
  const height = 44;

  const container = scene.add.container(x, y);
  container.setSize(width, height);

  const background = scene.add
    .rectangle(0, 0, width, height, theme.surfaceColor)
    .setStrokeStyle(3, theme.secondaryColor);

  const label = scene.add
    .text(0, 0, "", {
      color: toCssColor(theme.textColor),
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "18px",
      align: "center",
    })
    .setOrigin(0.5);

  container.add(background);
  container.add(label);

  const refresh = (): void => {
    const muted = AudioManager.isMuted();
    label.setText(muted ? "🔇 Off" : "🔊 On");
    background.setFillStyle(muted ? theme.surfaceColor : theme.secondaryColor, muted ? 1 : 0.45);
  };

  background.setInteractive({ useHandCursor: true });
  background.on("pointerup", () => {
    AudioManager.toggleMuted();
    // Play a soft tap only when turning sound on, so muting stays silent.
    if (!AudioManager.isMuted()) {
      AudioManager.play(scene, "animal-food-tap");
    }
    refresh();
  });

  refresh();
  return container;
};
