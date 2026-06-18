import Phaser from "phaser";
import { LanguageManager } from "../core/managers/LanguageManager";
import { SCENE_KEYS } from "../core/constants/scene.keys";
import { BRAND_THEME, toCssColor } from "../core/theme/age-themes";
import { UI_STRINGS } from "../data/ui-strings";
import { createBaseButton } from "../ui/components/BaseButton";
import { createLanguageSelector } from "../ui/components/LanguageSelector";
import { createSoundToggle } from "../ui/components/SoundToggle";
import { createSceneBackdrop } from "../ui/helpers/scene-layout";

export class HomeScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.HOME);
  }

  create(): void {
    const theme = BRAND_THEME;
    const { width, height } = this.scale;
    const cx = width / 2;

    createSceneBackdrop(this, theme.backgroundColor);

    // Decorative background blobs — warm, child-friendly
    this.add.ellipse(width * 0.9, height * 0.1, 220, 220, theme.secondaryColor, 0.22);
    this.add.ellipse(width * 0.08, height * 0.88, 190, 190, theme.accentColor, 0.2);
    this.add.ellipse(width * 0.15, height * 0.18, 100, 100, theme.primaryColor, 0.12);
    this.add.ellipse(width * 0.82, height * 0.8, 140, 140, theme.secondaryColor, 0.14);

    // Settings row: language selector and sound toggle at the top
    const settingsY = Math.round(height * 0.066);
    createLanguageSelector({
      scene: this,
      x: 80,
      y: settingsY,
      theme,
      onChange: () => this.scene.restart(),
    });
    createSoundToggle({ scene: this, x: width - 80, y: settingsY, theme });

    // Content card — groups title, tagline, and start button
    const cardW = width - 40;
    const cardH = Math.round(height * 0.62);
    const cardY = Math.round(height * 0.51);

    // Card shadow
    const shadowGfx = this.add.graphics();
    shadowGfx.fillStyle(0x9f8e7a, 0.1);
    shadowGfx.fillRoundedRect(cx - cardW / 2 + 5, cardY - cardH / 2 + 8, cardW, cardH, 28);

    // Card surface
    const cardGfx = this.add.graphics();
    cardGfx.fillStyle(theme.surfaceColor, 0.93);
    cardGfx.fillRoundedRect(cx - cardW / 2, cardY - cardH / 2, cardW, cardH, 28);
    cardGfx.lineStyle(2, theme.primaryColor, 0.15);
    cardGfx.strokeRoundedRect(cx - cardW / 2, cardY - cardH / 2, cardW, cardH, 28);

    // App title inside the card
    const titleY = Math.round(cardY - cardH / 2 + cardH * 0.2);
    this.add
      .text(cx, titleY, "Aneira Game", {
        color: toCssColor(theme.textColor),
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "42px",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    // Tagline / subtitle
    const subtitleY = Math.round(titleY + height * 0.088);
    this.add
      .text(cx, subtitleY, LanguageManager.t(UI_STRINGS.home.subtitle), {
        color: toCssColor(theme.mutedTextColor),
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "20px",
        align: "center",
        wordWrap: { width: cardW - 60 },
      })
      .setOrigin(0.5);

    // Soft separator dots between tagline and button
    const sepY = Math.round(subtitleY + height * 0.07);
    for (let i = -1; i <= 1; i++) {
      this.add.circle(cx + i * 14, sepY, 5, theme.accentColor, 0.45);
    }

    // Start button — the primary CTA, dominant inside the card
    const btnY = Math.round(cardY + cardH * 0.22);
    createBaseButton({
      scene: this,
      x: cx,
      y: btnY,
      width: 220,
      height: 68,
      label: LanguageManager.t(UI_STRINGS.home.start),
      onClick: () => this.scene.start(SCENE_KEYS.AGE_SELECT),
    });

    // Soft footer hint inside the card
    const hintY = Math.round(cardY + cardH / 2 - 32);
    this.add
      .text(cx, hintY, "Age 3–5 • Educational Games", {
        color: toCssColor(theme.mutedTextColor),
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "14px",
        align: "center",
      })
      .setOrigin(0.5)
      .setAlpha(0.5);
  }
}
