import Phaser from "phaser";
import { AudioManager } from "../core/managers/AudioManager";
import { LanguageManager } from "../core/managers/LanguageManager";
import { SCENE_KEYS } from "../core/constants/scene.keys";
import type { AgeGroupId } from "../core/types/age-group.type";
import { getAgeTheme } from "../core/theme/age-themes";
import { UI_STRINGS } from "../data/ui-strings";
import { createBaseButton } from "../ui/components/BaseButton";
import { createSceneBackdrop, createSceneTitle } from "../ui/helpers/scene-layout";

type ResultSceneData = {
  ageGroupId?: AgeGroupId;
  title?: string;
  message?: string;
};

export class ResultScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.RESULT);
  }

  create(data: ResultSceneData): void {
    const title = data.title ?? "Great Job!";
    const message = data.message ?? "You completed the game.";
    const ageGroupId = data.ageGroupId ?? "age-3";
    const theme = getAgeTheme(ageGroupId);

    createSceneBackdrop(this, theme.backgroundColor);
    this.add.ellipse(this.scale.width / 2, 180, 320, 170, theme.secondaryColor, 0.5);
    this.add.ellipse(this.scale.width / 2, 670, 360, 160, theme.accentColor, 0.28);
    createSceneTitle(this, title, message, theme);
    AudioManager.play(this, "animal-food-success");

    // Calm, gentle celebration — soft floating stars rather than a busy burst.
    for (let index = 0; index < 7; index += 1) {
      const x = 56 + index * 46;
      const y = index % 2 === 0 ? 206 : 228;
      const star = this.add.star(x, y, 5, 6, 12, 0xffd25b, 0.95);
      this.tweens.add({
        targets: star,
        y: y - 10,
        angle: 10,
        duration: 900 + index * 25,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1,
      });
    }

    createBaseButton({
      scene: this,
      x: this.scale.width / 2,
      y: 378,
      width: 220,
      height: 64,
      label: LanguageManager.t(UI_STRINGS.result.playAgain),
      onClick: () =>
        this.scene.start(SCENE_KEYS.ANIMAL_FOOD, {
          ageGroupId,
        }),
    });

    createBaseButton({
      scene: this,
      x: this.scale.width / 2,
      y: 458,
      width: 240,
      height: 68,
      label: LanguageManager.t(UI_STRINGS.result.backToGames),
      onClick: () =>
        this.scene.start(SCENE_KEYS.GAME_LIST, {
          ageGroupId,
        }),
    });

    createBaseButton({
      scene: this,
      x: this.scale.width / 2,
      y: 542,
      width: 180,
      height: 60,
      label: LanguageManager.t(UI_STRINGS.common.home),
      onClick: () => this.scene.start(SCENE_KEYS.HOME),
    });
  }
}
