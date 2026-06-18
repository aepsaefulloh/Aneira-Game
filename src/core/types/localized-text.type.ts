export type Language = "en" | "idn";

// User-facing text prepared for bilingual support.
// `idn` is used for Indonesian to avoid confusion with identifier `id` fields.
export interface LocalizedText {
  en: string;
  idn: string;
}
