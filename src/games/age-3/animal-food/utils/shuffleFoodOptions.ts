import type { AnimalFoodItem } from "../animal-food.types";

export function shuffleFoodOptions(items: AnimalFoodItem[]): AnimalFoodItem[] {
  return [...items].sort(() => Math.random() - 0.5);
}
