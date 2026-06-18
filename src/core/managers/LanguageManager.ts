import type { Language, LocalizedText } from "../types/localized-text.type";
import { getStorageString, setStorageString } from "../utils/storage";

// Lightweight language state for the MVP. This is intentionally not a full
// localization framework (out of scope) — it only remembers the chosen
// language and resolves LocalizedText for user-facing shell text.
export class LanguageManager {
  private static readonly storageKey = "language";
  private static readonly fallback: Language = "en";
  private static current: Language = "en";
  private static initialized = false;

  static initialize(): void {
    if (this.initialized) {
      return;
    }

    const stored = getStorageString(this.storageKey, this.fallback);
    this.current = stored === "idn" ? "idn" : "en";
    this.initialized = true;
  }

  static getLanguage(): Language {
    this.initialize();
    return this.current;
  }

  static setLanguage(language: Language): void {
    this.initialize();
    this.current = language;
    setStorageString(this.storageKey, language);
  }

  static t(text: LocalizedText): string {
    return text[this.getLanguage()];
  }
}
