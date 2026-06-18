export interface AgeGroup {
  id: string;
  label: string;
  minAge: number;
  maxAge: number;
  description: string;
  themeColor: number;
}

export interface GameCatalogEntry {
  id: string;
  ageGroupId: string;
  title: string;
  description: string;
  sceneKey: string;
  status: "planned" | "foundation" | "playable";
}
