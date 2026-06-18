import Phaser from "phaser";
import { LanguageManager } from "../core/managers/LanguageManager";
import { SCENE_KEYS } from "../core/constants/scene.keys";
import { BRAND_THEME } from "../core/theme/age-themes";
import { UI_STRINGS } from "../data/ui-strings";
import { createBaseButton } from "../ui/components/BaseButton";
import { createLanguageSelector } from "../ui/components/LanguageSelector";
import { createSoundToggle } from "../ui/components/SoundToggle";
import { createSceneBackdrop, createSceneTitle } from "../ui/helpers/scene-layout";

export class HomeScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.HOME);
  }

  create(): void {
    const theme = BRAND_THEME;
    const { width } = this.scale;

    createSceneBackdrop(this, theme.backgroundColor);

    // Settings row: language selector and sound toggle live together, away
    // from the main Start CTA so they never compete with it.
    createLanguageSelector({
      scene: this,
      x: 78,
      y: 56,
      theme,
      onChange: () => this.scene.restart(),
    });

    createSoundToggle({
      scene: this,
      x: width - 78,
      y: 56,
      theme,
    });

    // App name stays as the brand; the tagline is bilingual.
    createSceneTitle(
      this,
      "Aneira Game",
      LanguageManager.t(UI_STRINGS.home.subtitle),
      theme,
    );

    createBaseButton({
      scene: this,
      x: width / 2,
      y: 380,
      width: 240,
      height: 76,
      label: LanguageManager.t(UI_STRINGS.home.start),
      onClick: () => this.scene.start(SCENE_KEYS.AGE_SELECT),
    });
  }
}
