import Phaser from "phaser";
import { LanguageManager } from "../core/managers/LanguageManager";
import { SCENE_KEYS } from "../core/constants/scene.keys";
import type { AgeGroupId } from "../core/types/age-group.type";
import { getAgeTheme } from "../core/theme/age-themes";
import { AGE_GROUPS } from "../data/age-groups";
import { GAME_CATALOG } from "../data/game-catalog";
import { UI_STRINGS } from "../data/ui-strings";
import { createBaseButton } from "../ui/components/BaseButton";
import { createGameCard } from "../ui/components/GameCard";
import { createSceneBackdrop, createSceneTitle } from "../ui/helpers/scene-layout";

type GameListSceneData = {
  ageGroupId?: AgeGroupId;
};

export class GameListScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.GAME_LIST);
  }

  create(data: GameListSceneData): void {
    const ageGroupId = data.ageGroupId ?? "age-3";
    const ageGroup = AGE_GROUPS.find((entry) => entry.id === ageGroupId) ?? AGE_GROUPS[0];
    const theme = getAgeTheme(ageGroup.id);
    const entries = GAME_CATALOG.filter((entry) => entry.ageGroupId === ageGroup.id);

    createSceneBackdrop(this, theme.backgroundColor);
    createSceneTitle(
      this,
      `${ageGroup.shortLabel} ${LanguageManager.t(UI_STRINGS.common.games)}`,
      LanguageManager.t(UI_STRINGS.gameList.subtitle),
      theme,
    );

    const availableLabel = LanguageManager.t(UI_STRINGS.common.available);
    const comingSoonLabel = LanguageManager.t(UI_STRINGS.common.comingSoon);

    entries.forEach((entry, index) => {
      createGameCard({
        scene: this,
        x: this.scale.width / 2,
        y: 220 + index * 138,
        width: 320,
        height: 110,
        title: entry.title,
        subtitle: entry.subtitle,
        status: entry.status,
        theme,
        badgeText: entry.status === "available" ? availableLabel : comingSoonLabel,
        onClick: () =>
          this.scene.start(entry.sceneKey, {
            ageGroupId,
            gameId: entry.id,
          }),
      });
    });

    createBaseButton({
      scene: this,
      x: this.scale.width / 2,
      y: 790,
      width: 180,
      height: 54,
      label: LanguageManager.t(UI_STRINGS.common.back),
      onClick: () => this.scene.start(SCENE_KEYS.AGE_SELECT),
    });
  }
}
