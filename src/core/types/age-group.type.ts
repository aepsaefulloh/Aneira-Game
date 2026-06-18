export type AgeGroupId = "age-3" | "age-4" | "age-5";

export interface AgeGroup {
  id: AgeGroupId;
  label: string;
  shortLabel: string;
  description: string;
  minAge: number;
  maxAge: number;
  status: "available" | "coming-soon";
}
