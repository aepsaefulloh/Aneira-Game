import type { AgeGroupId } from "../../../core/types/age-group.type";
import type { GameModuleId } from "../../../core/types/game-module.type";
import type { LocalizedText } from "../../../core/types/localized-text.type";

export type AnimalFoodItemType = "animal" | "food";

export interface AnimalFoodItem {
  id: string;
  name: string;
  assetKey: string;
  type: AnimalFoodItemType;
}

export interface AnimalFoodLevel {
  id: string;
  animal: AnimalFoodItem;
  correctFoodId: string;
  foodOptions: AnimalFoodItem[];
  instructionText: LocalizedText;
  successText: LocalizedText;
}

export type AnimalFoodSceneData = {
  ageGroupId?: AgeGroupId;
  gameId?: GameModuleId;
};
