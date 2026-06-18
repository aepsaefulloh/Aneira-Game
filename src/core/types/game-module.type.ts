import type { AgeGroupId } from "./age-group.type";

export type GameModuleId =
  | "animal-food"
  | "animal-sound"
  | "color-match"
  | "shape-match";

export interface GameModule {
  id: GameModuleId;
  title: string;
  subtitle: string;
  ageGroupId: AgeGroupId;
  sceneKey: string;
  thumbnailKey: string;
  status: "available" | "locked" | "coming-soon";
}
