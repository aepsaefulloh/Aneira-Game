# CLAUDE.md — Aneira Game
## Session Start

For every new session:

1. Read all files under `docs/` before planning, coding, or making product decisions.
2. Treat `docs/` as the source of truth for product, design, architecture, roadmap, and implementation phases.
3. Review `docs/plan/` in sequence to understand current scope and delivery order.
4. Btw i'm already installed rtk and graphify


## Project Overview

Aneira Game is a children’s educational mini-game platform.

The app contains multiple simple educational mini-games grouped by age classification.

Initial target:

* App name: **Aneira Game**
* First age group: **Age 3**
* First mini-game: **Animal Food**
* First core mechanic: **drag and drop the correct food to the matching animal**

This project should be built incrementally using phase-based vibe coding.

---

## Product Direction

Aneira Game is not a single game.

Aneira Game is a scalable collection of educational mini-games for children.

The app should support:

* age-based game classification
* multiple mini-game modules
* simple and safe gameplay
* child-friendly UI
* reusable assets
* bilingual documentation
* future Android APK build using Capacitor

---

## Target Users

Primary user:

* children aged 3–5 years old

Initial user:

* children aged 3 years old

Secondary user:

* parents or guardians who select the game category

---

## First Game: Animal Food

Animal Food is a simple drag-and-drop game where children match animals with their correct food.

Examples:

```txt
Rabbit   → Carrot
Monkey   → Banana
Cat      → Fish
Dog      → Bone
Cow      → Grass
Chicken  → Corn
Panda    → Bamboo
Elephant → Leaves
```

The game should be:

* simple
* forgiving
* colorful
* friendly
* touch-friendly
* suitable for children around 3 years old

---

## Tech Stack

Use:

```txt
TypeScript
Vite
Phaser 3
```

Use later:

```txt
Capacitor
Android Studio
```

Do not use for the game prototype unless explicitly requested:

```txt
Nuxt
Next.js
React
Vue
Backend framework
Database
```

---

## Development Style

Work phase by phase.

Do not implement everything at once.

Each phase must:

* have clear scope
* be documented inside `docs/plan`
* keep the code simple
* avoid over-engineering
* preserve future scalability
* include acceptance criteria
* include manual testing flow when relevant

---

## Vibe Coding Rules

This project is designed to work well with vibe coding.

When implementing a phase:

1. Read `CLAUDE.md`
2. Read related documents inside `docs/`
3. Read the current phase file inside `docs/plan`
4. Implement only the current phase scope
5. Do not add features outside the phase unless required
6. Update related documentation after implementation
7. Keep the code simple and maintainable
8. Prefer working gameplay over premature abstraction

---

## Coding Principles

Follow these principles:

* simple architecture first
* data-driven game configuration
* reusable scenes and components
* mobile portrait first
* touch-friendly interactions
* no unnecessary dependencies
* no backend for MVP
* no login for MVP
* no ads for MVP
* no analytics for MVP unless explicitly requested
* no complex state management unless needed
* no premature optimization

---

## Child-Friendly Game Rules

For children around 3 years old:

* no timer
* no lives
* no punishment
* no game over
* no complex text
* no small buttons
* no cluttered layout
* no aggressive sound effects
* no dark or scary visuals

Feedback should be positive and gentle. See `docs/GAME_DESIGN.md` for full feedback rules.

Correct answer feedback may include:

* happy animation
* positive sound
* short praise text
* continue to next level

Wrong answer feedback should include:

* gentle shake
* food returns to original position
* friendly message such as `Try again`
* no penalty

Avoid words like:

```txt
Wrong
Failed
Bad
Game Over
```

---

## UI Consistency Rules

Keep the UI consistent across scenes. See `docs/DESIGN.md` for full detail.

* large touch targets (min ~44px height)
* the primary CTA is the most dominant element on a screen
* settings (language, sound) live in a header/settings row, away from the main action
* rounded cards and buttons, gentle pastel colors, generous spacing
* no tiny controls near the drag area

## Theme System Direction

Each age segment has its own theme identity. Themes live in `src/core/theme/age-themes.ts`.

* `Age 3` — Animal Friends (implemented)
* `Age 4` — Creative Discovery (documented, future)
* `Age 5` — Learning Adventure (documented, future)

Scenes derive their theme from the selected age via `getAgeTheme()`; pre-age shell scenes use `BRAND_THEME`. Keep the theme simple — no CSS-like systems inside Phaser.

## Language Selection Rules

* bilingual user-facing text uses `LocalizedText` (`{ en, idn }`); use `idn`, not `id`.
* shell UI strings live in `src/data/ui-strings.ts`; resolve with `LanguageManager.t()`.
* the language selector is a `[ IDN | EN ]` pill (`src/ui/components/LanguageSelector.ts`), large enough to tap and not competing with the main CTA.
* for MVP it appears on HomeScene and affects shell text; gameplay text may stay English-only if structured for later.

## Sound Control Rules

* the sound toggle is a small setting, never a main action (`src/ui/components/SoundToggle.ts`).
* it is compact, consistently placed, and not near the drag area.
* preference persists via `localStorage` through `AudioManager`.
* missing audio must never crash the game; muting is silent.

## App Flow

Initial MVP flow:

```txt
HomeScene
↓
AgeSelectScene
↓
GameListScene
↓
AnimalFoodScene
↓
ResultScene
```

Future flow:

```txt
HomeScene
↓
AgeSelectScene
↓
GameListScene by Age
↓
MiniGameScene
↓
ResultScene
```

---

## Folder Rules

Use this main source structure:

```txt
src/
├── main.ts
├── game.config.ts
├── core/
├── data/
├── scenes/
├── ui/
└── games/
    └── age-3/
        └── animal-food/
```

Use this structure for the Animal Food module:

```txt
src/games/age-3/animal-food/
├── AnimalFoodScene.ts
├── animal-food.types.ts
├── animal-food.levels.ts
├── animal-food.assets.ts
├── animal-food.config.ts
├── components/
└── utils/
```

Do not place all mini-game logic inside one global `GameScene`.

Each mini-game should own its own:

* scene
* config
* levels
* types
* assets manifest
* components
* utilities

---

## Asset Rules

Use this asset structure:

```txt
public/assets/
├── common/
│   ├── audio/
│   ├── icons/
│   ├── backgrounds/
│   └── ui/
└── games/
    └── age-3/
        └── animal-food/
            ├── animals/
            ├── foods/
            └── audio/
```

During early development, placeholder graphics are allowed.

Real assets can be added later.

The game must not crash if optional image or audio assets are missing during development.

If real textures are missing, use placeholder shapes and text.

---

## Documentation Rules

Keep documentation inside `docs/`.

Required documents:

```txt
docs/
├── BRD.md
├── ARCHITECTURE.md
├── DESIGN.md
├── GAME_DESIGN.md
├── TECHNICAL_DECISIONS.md
├── ROADMAP.md
├── WRITING_GUIDELINES.md
└── plan/
```

Each new development phase must create or update a file inside:

```txt
docs/plan/
```

Example:

```txt
docs/plan/1.0-project-foundation.md
docs/plan/1.1-app-shell-age-classification.md
docs/plan/1.2-animal-food-mvp.md
```

---

## Language and Documentation Rules

This project uses bilingual documentation.

Main documentation languages:

1. Indonesian
2. English

All important product, planning, architecture, design, and game design documents should support both languages.

Use this order:

```txt
Indonesia first
English second
```

Do not repeat full bilingual rules inside every phase file.

Instead, each phase file should reference:

```txt
docs/WRITING_GUIDELINES.md
```

At the top of each phase document, include:

```md
> This document follows `docs/WRITING_GUIDELINES.md`.
```

Then write only phase-specific content.

Claude Code must follow the bilingual writing rules from `docs/WRITING_GUIDELINES.md` when creating or updating documentation.

---

## Code Language Rules

For code, use English.

Use English for:

* file names
* folder names
* variable names
* function names
* class names
* TypeScript types
* TypeScript interfaces
* config keys
* asset keys
* scene keys
* code comments by default

Indonesian may be used only when the context is specifically product-related and easier to explain in Indonesian.

---

## User-Facing Text Rules

User-facing game text should be prepared for bilingual support where possible.

Examples:

```txt
English: What does the rabbit eat?
Indonesian: Kelinci makan apa?
```

For early MVP, English-only user-facing text is acceptable if the structure is prepared for bilingual content later.

Avoid hardcoding long user-facing text directly inside scenes when it can be stored in data or config.

---

## Current MVP Goal

The first successful MVP is:

A child can open Aneira Game, select Age 3, open Animal Food, drag the correct food to the animal, receive positive feedback, and continue through several animal levels until the result screen.

---

## Current Phase Roadmap

Initial roadmap:

```txt
1.0 — Project Foundation
1.1 — App Shell + Age Classification
1.2 — Animal Food MVP
1.3 — Kids-Friendly UI Feedback
1.4 — Audio and Animation Polish
1.4.1 — Documentation Cleanup + UI Theme Alignment
1.4.2 — Responsive Browser QA + Layout Stabilization
1.5 — Capacitor Android Build
2.0 — Second Age 3 Mini Game
```

---

## Do Not Build Yet

Do not build these features in the MVP unless explicitly requested:

* user account
* database
* cloud sync
* multiplayer
* leaderboard
* ads
* payment
* complex parent dashboard
* external CMS
* advanced analytics
* complex localization system
* advanced asset pipeline

---

## Implementation Reminder

This project must stay simple enough for vibe coding.

Prioritize:

1. working gameplay
2. clean structure
3. reusable mini-game architecture
4. child-friendly experience
5. concise documentation
6. Android packaging later

Do not over-engineer the foundation before the first playable mini-game works.

---

## Responsive Layout Rules

Before doing any Android/Capacitor work, responsive web layout must be stable.

Scene layout rules:

- All Y positions must be derived from `scale.height` fractions — never hardcoded pixel constants.
- Footer buttons use `y: this.scale.height - offset`.
- Use `computeAnimalFoodLayout(width, height)` from `src/core/layout/layout.ts` for AnimalFood scene positions.
- Run `bun run test:responsive` (Playwright) to verify layout at 6 viewport sizes before shipping a visual change.

---

## UI Consistency Rules

- Do not use emoji as structural icons. Use SVG or text labels instead (`no-emoji-icons` rule).
- Sound toggle text: `"Sound On"` / `"Sound Off"` — not emoji.
- Language selector pill: `[ IDN | EN ]` — plain text, no emoji.

---

## Theme System Direction

Themes are defined in `src/core/theme/age-themes.ts`.

- `BRAND_THEME` = Age-3 theme, used before an age segment is selected.
- `getAgeTheme(ageGroupId)` returns the theme for a given age segment.
- Shell scenes before age selection use `BRAND_THEME`.
- Shell scenes after age selection use `getAgeTheme(ageGroupId)`.
- AnimalFoodScene always uses the Age-3 theme.
- `toCssColor(hexNumber)` converts Phaser hex color numbers to CSS color strings.

---

## Language Selection Rules

- Language state is managed by `LanguageManager` (static class, `localStorage` persistence).
- `LanguageManager.t(localizedText)` returns the string in the current language.
- `LocalizedText` uses `{ en: string; idn: string }` — use `idn` not `id` (avoids identifier conflicts).
- The language selector is a pill `[ IDN | EN ]` rendered by `createLanguageSelector()`.
- All user-facing text must come from `UI_STRINGS` (bilingual) — not hardcoded strings inside scenes.

---

## Sound Control Rules

- Audio state is managed by `AudioManager` (static class, `localStorage` persistence).
- Sound toggle uses plain text pill rendered by `createSoundToggle()`.
- Missing audio assets must never crash the game.
