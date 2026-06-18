# DESIGN — UI & Visual Direction

> This document follows `docs/WRITING_GUIDELINES.md`.

## Visual Identity / Identitas Visual

### Indonesia

Aneira Game harus terasa: lucu, lembut, hangat, ceria, aman, sederhana, dan ramah anak.

Aplikasi tidak boleh terasa seperti menu game generik. Setiap segmen umur memiliki tema sendiri.

### English

Aneira Game should feel: cute, soft, warm, playful, safe, simple, and child-friendly.

The app must not feel like a generic game menu. Each age segment has its own theme identity.

## Device Target / Target Perangkat

Mobile portrait first. Reference layout: `390 x 844`. The game scales responsively for different mobile screens.

## Child-Friendly Design Principles / Prinsip Desain Ramah Anak

Use:

- large buttons and large touch targets
- soft rounded cards with gentle shadows
- bright but gentle pastel colors
- simple backgrounds and friendly empty space
- clear visual hierarchy
- large animal and food illustrations
- short, readable labels

Avoid:

- clutter and too many options on screen
- tiny text and tiny controls
- harsh colors or scary visuals
- complex navigation

## Layout Rules / Aturan Layout

- One main task per screen.
- Settings (language, sound) live in a header/settings row, away from the main action area.
- The primary CTA (e.g. Start) is the most visually dominant element on a screen.
- Keep generous spacing around draggable elements.

## Touch Target Rules / Aturan Touch Target

- Minimum comfortable interactive size is ~44px height.
- Buttons and cards are large and well-spaced.
- No tiny controls near the drag area in gameplay.

## Color Usage / Penggunaan Warna

Colors come from the age theme system (see below). General intent:

```txt
Background: warm, soft tone per age segment
Surface:    near-white card surface
Primary:    main button / active highlight
Secondary:  warm accent (badges, sound toggle)
Accent:     success / available accent
Text:       dark, soft, high-contrast on surface
Muted text: secondary copy
```

## Typography Direction / Arah Tipografi

- Font family: `Trebuchet MS, Verdana, sans-serif` (rounded, friendly, widely available).
- Titles: bold, ~36px. Subtitles: ~20px. Body/labels: 16–24px.
- Never use tiny text for user-facing content.

## Button Style / Gaya Tombol

- Rounded rectangle with soft drop shadow and a light shine highlight.
- Clear pressed and hover states.
- Disabled buttons are visibly muted but not broken-looking.
- See `src/ui/components/BaseButton.ts`.

## Card Style / Gaya Card

- Rounded surface, themed stroke, optional theme swatch.
- Available cards use the age accent color; coming-soon cards are softer but still readable.
- See `AgeCard.ts` and `GameCard.ts`.

## Feedback Style / Gaya Feedback

- Feedback is immediate, positive, and gentle.
- Correct: happy animation, soft success sound, short praise, advance.
- Wrong: gentle shake, food returns, friendly retry message, no penalty.
- Celebration on the result screen stays calm (soft floating stars), never overwhelming.

## Age Segment Theme System / Sistem Tema Segmen Umur

### Indonesia

Setiap segmen umur memiliki tema sendiri agar terasa berbeda dan intensional. Tema didefinisikan di `src/core/theme/age-themes.ts`.

### English

Each age segment has its own theme so the app feels distinct and intentional. Themes are defined in `src/core/theme/age-themes.ts`.

```txt
Age 3 — Animal Friends
- soft farm / animal / nature feeling
- warm pastel background, rounded cards, playful accents

Age 4 — Creative Discovery (future)
- creative classroom feeling, slightly more colorful

Age 5 — Learning Adventure (future)
- adventure / puzzle feeling, slightly more structured
```

Only Age 3 is fully used today. Age 4 and Age 5 are documented future directions. Keep the theme simple — do not build CSS-like systems inside Phaser.

Theme shape:

```ts
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
```

## Language Selector Design / Desain Pemilih Bahasa

### Indonesia

Language selector berupa pill `[ IDN | EN ]`. Harus cukup besar untuk disentuh, tidak bersaing dengan CTA utama, dan ditempatkan konsisten (mulai dari HomeScene).

### English

The language selector is a pill `[ IDN | EN ]`. It must be large enough to tap, must not compete with the main CTA, and is placed consistently (starting from HomeScene).

Rules:

- Rounded pill style, active language clearly highlighted, inactive still readable.
- No tiny text, no complicated dropdown for now.
- For MVP it only needs to appear on HomeScene and affect shell user-facing text.
- See `src/ui/components/LanguageSelector.ts`.

## Sound Toggle Design / Desain Sound Toggle

### Indonesia

Sound toggle terasa seperti setting kecil, bukan aksi utama. Tetap kompak dan tidak mendominasi header.

### English

The sound toggle feels like a small setting, not a main action. It stays compact and never dominates the header.

Rules:

- Compact pill showing `🔊 On` / `🔇 Off` (emoji used because it suits the playful style).
- Comfortable touch target, consistent placement across scenes.
- Not placed too close to the drag area.
- Remembers preference via `localStorage`; missing audio must never crash the game.
- See `src/ui/components/SoundToggle.ts`.

## Settings Row Layout / Layout Baris Pengaturan

```txt
[ IDN | EN ]            [ 🔊 On ]
```

On small screens the controls may stack neatly:

```txt
[ IDN | EN ]
[ 🔊 On ]
```
