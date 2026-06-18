import type { AgeGroupId } from "../types/age-group.type";

export type AgeThemeKey = AgeGroupId;

export interface AgeTheme {
  key: AgeThemeKey;
  name: string;
  backgroundColor: number;
  surfaceColor: number;
  primaryColor: number;
  secondaryColor: number;
  textColor: number;
  mutedTextColor: number;
  accentColor: number;
}

// Each age segment has its own identity so the app does not feel like a
// generic game menu. Only Age 3 is fully used today; Age 4 and Age 5 are
// documented future directions kept simple on purpose.
export const AGE_THEMES: Record<AgeThemeKey, AgeTheme> = {
  "age-3": {
    key: "age-3",
    name: "Animal Friends",
    backgroundColor: 0xfef6e9,
    surfaceColor: 0xfffdf6,
    primaryColor: 0x8fcdf2,
    secondaryColor: 0xf6c97a,
    textColor: 0x5b4636,
    mutedTextColor: 0x8d7a67,
    accentColor: 0x9bd6a3,
  },
  "age-4": {
    key: "age-4",
    name: "Creative Discovery",
    backgroundColor: 0xeaf3fb,
    surfaceColor: 0xffffff,
    primaryColor: 0x7bb8e8,
    secondaryColor: 0xf2a6c2,
    textColor: 0x3f4a5a,
    mutedTextColor: 0x7d8696,
    accentColor: 0xf6b85f,
  },
  "age-5": {
    key: "age-5",
    name: "Learning Adventure",
    backgroundColor: 0xeef0fb,
    surfaceColor: 0xffffff,
    primaryColor: 0x8a86e0,
    secondaryColor: 0x6fc3c0,
    textColor: 0x37314f,
    mutedTextColor: 0x77738c,
    accentColor: 0xf2c14e,
  },
};

// Neutral brand theme for shell scenes shown before an age is chosen (HomeScene).
export const BRAND_THEME: AgeTheme = AGE_THEMES["age-3"];

export const getAgeTheme = (key: AgeThemeKey | undefined): AgeTheme =>
  (key && AGE_THEMES[key]) || BRAND_THEME;

// Phaser text styles expect CSS color strings, so expose a small helper.
export const toCssColor = (color: number): string =>
  `#${color.toString(16).padStart(6, "0")}`;
