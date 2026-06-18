import type { AgeGroup } from "../core/types/age-group.type";

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: "age-3",
    label: "3 Years Old",
    shortLabel: "Age 3",
    description: "Simple matching, sounds, colors, and object recognition.",
    minAge: 3,
    maxAge: 3,
    status: "available",
  },
  {
    id: "age-4",
    label: "4 Years Old",
    shortLabel: "Age 4",
    description: "Counting, memory, sorting, and simple routines.",
    minAge: 4,
    maxAge: 4,
    status: "coming-soon",
  },
  {
    id: "age-5",
    label: "5 Years Old",
    shortLabel: "Age 5",
    description: "Letters, numbers, patterns, puzzles, and stories.",
    minAge: 5,
    maxAge: 5,
    status: "coming-soon",
  },
];
