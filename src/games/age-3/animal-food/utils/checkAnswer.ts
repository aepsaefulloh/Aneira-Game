import type { AnimalFoodLevel } from "../animal-food.types";

export function checkAnimalFoodAnswer(
  level: AnimalFoodLevel,
  selectedFoodId: string,
): boolean {
  return level.correctFoodId === selectedFoodId;
}
