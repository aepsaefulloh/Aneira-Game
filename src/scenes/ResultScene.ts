import Phaser from "phaser";
import { AudioManager } from "../core/managers/AudioManager";
import { LanguageManager } from "../core/managers/LanguageManager";
import { SCENE_KEYS } from "../core/constants/scene.keys";
import type { AgeGroupId } from "../core/types/age-group.type";
import { getAgeTheme, toCssColor } from "../core/theme/age-themes";
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
    const { width, height } = this.scale;
    const cx = width / 2;

    createSceneBackdrop(this, theme.backgroundColor);

    // Background blobs
    this.add.ellipse(cx, Math.round(height * 0.21), 320, 170, theme.secondaryColor, 0.5);
    this.add.ellipse(cx, Math.round(height * 0.79), 360, 160, theme.accentColor, 0.28);

    createSceneTitle(this, title, message, theme);
    AudioManager.play(this, "animal-food-success");

    // Gentle floating stars
    for (let index = 0; index < 7; index += 1) {
      const sx = 56 + index * 46;
      const sy = Math.round(height * 0.248) + (index % 2 === 0 ? 0 : 22);
      const star = this.add.star(sx, sy, 5, 6, 12, 0xffd25b, 0.95);
      this.tweens.add({
        targets: star,
        y: sy - 10,
        angle: 10,
        duration: 900 + index * 25,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // Result card panel
    const cardW = width - 48;
    const cardH = Math.round(height * 0.32);
    const cardY = Math.round(height * 0.62);
    const cardGfx = this.add.graphics();
    cardGfx.fillStyle(theme.surfaceColor, 0.9);
    cardGfx.fillRoundedRect(cx - cardW / 2, cardY - cardH / 2, cardW, cardH, 24);
    cardGfx.lineStyle(2, theme.primaryColor, 0.15);
    cardGfx.strokeRoundedRect(cx - cardW / 2, cardY - cardH / 2, cardW, cardH, 24);

    // Score / congrats sub-text inside card
    this.add
      .text(cx, Math.round(cardY - cardH / 2 + 32), "🌟 Level Complete! 🌟", {
        color: toCssColor(theme.textColor),
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "20px",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    // Buttons stacked inside the card with consistent spacing
    const btn1Y = Math.round(cardY - cardH * 0.05);
    const btn2Y = Math.round(btn1Y + 78);

    createBaseButton({
      scene: this,
      x: cx,
      y: btn1Y,
      width: 220,
      height: 62,
      label: LanguageManager.t(UI_STRINGS.result.playAgain),
      onClick: () => this.scene.start(SCENE_KEYS.ANIMAL_FOOD, { ageGroupId }),
    });

    createBaseButton({
      scene: this,
      x: cx,
      y: btn2Y,
      width: 240,
      height: 62,
      label: LanguageManager.t(UI_STRINGS.result.backToGames),
      onClick: () => this.scene.start(SCENE_KEYS.GAME_LIST, { ageGroupId }),
    });

    createBaseButton({
      scene: this,
      x: cx,
      y: this.scale.height - 60,
      width: 180,
      height: 54,
      label: LanguageManager.t(UI_STRINGS.common.home),
      onClick: () => this.scene.start(SCENE_KEYS.HOME),
    });
  }
}
