import Phaser from "phaser";
import { LanguageManager } from "../core/managers/LanguageManager";
import { SCENE_KEYS } from "../core/constants/scene.keys";
import { BRAND_THEME, getAgeTheme } from "../core/theme/age-themes";
import { AGE_GROUPS } from "../data/age-groups";
import { UI_STRINGS } from "../data/ui-strings";
import { createAgeCard } from "../ui/components/AgeCard";
import { createBaseButton } from "../ui/components/BaseButton";
import { createSceneBackdrop, createSceneTitle } from "../ui/helpers/scene-layout";

export class AgeSelectScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.AGE_SELECT);
  }

  create(): void {
    createSceneBackdrop(this, BRAND_THEME.backgroundColor);
    createSceneTitle(
      this,
      LanguageManager.t(UI_STRINGS.ageSelect.title),
      LanguageManager.t(UI_STRINGS.ageSelect.subtitle),
      BRAND_THEME,
    );

    const availableLabel = LanguageManager.t(UI_STRINGS.common.available);
    const comingSoonLabel = LanguageManager.t(UI_STRINGS.common.comingSoon);

    AGE_GROUPS.forEach((group, index) => {
      const theme = getAgeTheme(group.id);
      createAgeCard({
        scene: this,
        x: this.scale.width / 2,
        y: 250 + index * 160,
        width: 320,
        height: 128,
        label: `${group.shortLabel} — ${theme.name}`,
        description: group.description,
        status: group.status,
        theme,
        badgeText: group.status === "available" ? availableLabel : comingSoonLabel,
        onClick: () => {
          if (group.status === "available") {
            this.scene.start(SCENE_KEYS.GAME_LIST, { ageGroupId: group.id });
          }
        },
      });
    });

    createBaseButton({
      scene: this,
      x: this.scale.width / 2,
      y: 760,
      width: 180,
      height: 58,
      label: LanguageManager.t(UI_STRINGS.common.home),
      onClick: () => this.scene.start(SCENE_KEYS.HOME),
    });
  }
}
