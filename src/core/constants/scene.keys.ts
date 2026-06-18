export const SCENE_KEYS = {
  BOOT: "BootScene",
  PRELOAD: "PreloadScene",
  HOME: "HomeScene",
  AGE_SELECT: "AgeSelectScene",
  GAME_LIST: "GameListScene",
  RESULT: "ResultScene",
  ANIMAL_FOOD: "AnimalFoodScene",
} as const;

export type SceneKey = (typeof SCENE_KEYS)[keyof typeof SCENE_KEYS];
