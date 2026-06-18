import { SCENE_KEYS } from "../core/constants/scene.keys";
import type { GameModule } from "../core/types/game-module.type";

export const GAME_CATALOG: GameModule[] = [
  {
    id: "animal-food",
    title: "Animal Food",
    subtitle: "Feed the animal with the correct food.",
    ageGroupId: "age-3",
    sceneKey: SCENE_KEYS.ANIMAL_FOOD,
    thumbnailKey: "animal-food-thumbnail",
    status: "available",
  },
  {
    id: "animal-sound",
    title: "Animal Sound",
    subtitle: "Guess the animal from the sound.",
    ageGroupId: "age-3",
    sceneKey: "AnimalSoundScene",
    thumbnailKey: "animal-sound-thumbnail",
    status: "coming-soon",
  },
  {
    id: "color-match",
    title: "Color Match",
    subtitle: "Match objects with the same color.",
    ageGroupId: "age-3",
    sceneKey: "ColorMatchScene",
    thumbnailKey: "color-match-thumbnail",
    status: "coming-soon",
  },
  {
    id: "shape-match",
    title: "Shape Match",
    subtitle: "Match simple shapes.",
    ageGroupId: "age-3",
    sceneKey: "ShapeMatchScene",
    thumbnailKey: "shape-match-thumbnail",
    status: "coming-soon",
  },
];
