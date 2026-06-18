import type { LocalizedText } from "../core/types/localized-text.type";

// Bilingual user-facing text for the shared shell scenes.
// Game-specific text (e.g. Animal Food levels) stays inside its own module.
export const UI_STRINGS = {
  home: {
    subtitle: {
      en: "Little games for little learners",
      idn: "Permainan kecil untuk pembelajar kecil",
    },
    start: {
      en: "Start",
      idn: "Mulai",
    },
  },
  ageSelect: {
    title: {
      en: "Choose Age",
      idn: "Pilih Umur",
    },
    subtitle: {
      en: "Pick a learning stage to explore.",
      idn: "Pilih tahap belajar untuk dijelajahi.",
    },
  },
  gameList: {
    subtitle: {
      en: "Choose a game to play.",
      idn: "Pilih permainan untuk dimainkan.",
    },
  },
  result: {
    playAgain: {
      en: "Play Again",
      idn: "Main Lagi",
    },
    backToGames: {
      en: "Back to Games",
      idn: "Kembali ke Permainan",
    },
  },
  common: {
    home: {
      en: "Home",
      idn: "Beranda",
    },
    back: {
      en: "Back",
      idn: "Kembali",
    },
    comingSoon: {
      en: "Coming Soon",
      idn: "Segera Hadir",
    },
    available: {
      en: "Available",
      idn: "Tersedia",
    },
    games: {
      en: "Games",
      idn: "Permainan",
    },
  },
} satisfies Record<string, Record<string, LocalizedText>>;
