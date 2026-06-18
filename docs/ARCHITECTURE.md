# ARCHITECTURE

> This document follows `docs/WRITING_GUIDELINES.md`.

## Direction / Arah

### Indonesia

Project menggunakan struktur aplikasi Phaser modular dengan shell bersama dan modul mini-game yang terisolasi. Hindari over-engineering.

### English

The project uses a modular Phaser application structure with a shared shell and isolated mini-game modules. Avoid over-engineering.

## Source Layout / Struktur Sumber

```txt
src/
|-- main.ts
|-- game.config.ts
|-- core/
|   |-- constants/      # scene keys
|   |-- managers/       # AudioManager, LanguageManager, progress-manager
|   |-- theme/          # age-themes (age segment theme system)
|   |-- types/          # shared types (age group, game module, localized text)
|   `-- utils/          # storage, scale helpers
|-- data/               # app-level data: age-groups, game-catalog, ui-strings
|-- scenes/             # shell scenes for navigation and app flow
|-- ui/
|   |-- components/     # BaseButton, AgeCard, GameCard, LanguageSelector, SoundToggle
|   `-- helpers/        # scene-layout (backdrop + title)
`-- games/
    `-- age-3/
        `-- animal-food/
```

## Responsibilities / Tanggung Jawab

- `core/`: shared constants, helpers, types, managers, and the theme system.
- `data/`: app-level catalog data, age definitions, and bilingual UI strings.
- `scenes/`: shell scenes for navigation and app flow.
- `ui/`: reusable scene drawing helpers and UI components.
- `games/`: self-contained game modules grouped by age.

## App Shell / Shell Aplikasi

Shared navigation scenes are separated from mini-game modules.

`HomeScene`, `AgeSelectScene`, `GameListScene`, and `ResultScene` are app-level scenes.
`AnimalFoodScene` is a mini-game scene under the Age 3 module.

## Scene Flow / Alur Scene

```txt
BootScene
-> PreloadScene
-> HomeScene
-> AgeSelectScene
-> GameListScene
-> MiniGameScene (AnimalFoodScene)
-> ResultScene
```

## Game Module Architecture / Arsitektur Modul Game

```txt
src/games/age-3/animal-food/
|-- AnimalFoodScene.ts
|-- animal-food.types.ts
|-- animal-food.levels.ts
|-- animal-food.assets.ts
|-- animal-food.config.ts
|-- components/
`-- utils/
```

Each game owns its own scene, level data, config, types, assets manifest, components, and utilities. Do not place all mini-game logic inside a global `GameScene`.

## Data-Driven Game Catalog / Katalog Game Berbasis Data

- `data/age-groups.ts`: age segments and availability status.
- `data/game-catalog.ts`: games per age group, each with its `sceneKey` and status.
- `GameListScene` renders the catalog filtered by the selected age group.

## Shared UI Components / Komponen UI Bersama

- `BaseButton`: primary rounded button with press/hover states.
- `AgeCard` / `GameCard`: themed selection cards with availability badges.
- `LanguageSelector`: `[ IDN | EN ]` pill.
- `SoundToggle`: compact sound on/off pill.
- `scene-layout`: themed backdrop and title helpers.

## Shared Managers / Manager Bersama

- `AudioManager`: play sounds, mute state, `localStorage` persistence, safe fallback when audio assets are missing.
- `LanguageManager`: current language (`en` | `idn`), `localStorage` persistence, `t()` resolver for `LocalizedText`.
- `progress-manager`: lightweight progress helper.

## State Direction / Arah State

### Indonesia

State sederhana disimpan di manager statis ringan, bukan state management kompleks.

### English

Simple state lives in lightweight static managers, not a complex state-management library.

- Language state: `LanguageManager` (persisted, default `en`). Shell scenes read it through `UI_STRINGS` + `t()`.
- Audio state: `AudioManager` (persisted mute flag).
- Theme state: derived from the selected age group via `getAgeTheme()`; shell scenes before an age is chosen use `BRAND_THEME`.

## Asset Structure / Struktur Aset

```txt
public/assets/
|-- common/
`-- games/age-3/animal-food/
```

Missing optional image or audio assets must never crash the game; use placeholder shapes and synthesized fallback tones.

## Responsive Architecture / Arsitektur Responsif

### Indonesia

Layout dibangun di atas canvas Phaser dengan mode `Scale.FIT`. Semua posisi scene harus diturunkan dari `scale.width` / `scale.height` — bukan konstanta pixel tetap.

### English

Layout is built on a Phaser canvas in `Scale.FIT` mode. All scene positions must be derived from `scale.width` / `scale.height` — never hardcoded pixel constants.

Rules:

- `src/core/layout/layout.ts` — exports `computeAnimalFoodLayout(w, h)` and shared safe-margin constants `SAFE_X`, `SAFE_Y_BTM`.
- Footer buttons: `y: this.scale.height - offset` pattern across all scenes.
- `src/main.ts` — `#app` container capped at `maxWidth: 480px` with flex centering on `body` so the portrait canvas stays in a centered column on desktop/tablet.
- Do not hardcode `y: 760` or similar constants — always derive from `scale.height`.

### Playwright QA / QA Playwright

Responsive screenshots are captured by `tests/responsive/responsive-layout.spec.ts` using `bun run test:responsive`. Evidence is saved to `evidence/responsive/` (gitignored). The test navigates the full flow: Home → AgeSelect → GameList → AnimalFood across the six viewport targets documented in `docs/DESIGN.md`.
