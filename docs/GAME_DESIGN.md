# GAME DESIGN

> This document follows `docs/WRITING_GUIDELINES.md`.

## Platform Concept / Konsep Platform

### Indonesia

Aneira Game adalah platform berisi banyak mini-game edukatif sederhana, dikelompokkan berdasarkan umur. Bukan satu game tunggal.

### English

Aneira Game is a platform of many simple educational mini-games, grouped by age. It is not a single game.

## Age-Based Grouping / Pengelompokan Berdasarkan Umur

- Age 3 — Animal Friends (available)
- Age 4 — Creative Discovery (future)
- Age 5 — Learning Adventure (future)

Each age group has its own game list and theme. The first game lives under Age 3.

## First Mini-Game: Animal Food / Mini-Game Pertama

### Indonesia

Animal Food adalah game drag-and-drop sederhana: anak menyeret makanan yang benar ke animal yang cocok.

### English

Animal Food is a simple drag-and-drop game: the child drags the correct food to the matching animal.

Target age: 3 years old.

Learning goals: animal recognition, food recognition, object matching, hand-eye coordination.

## Core Loop / Inti Permainan

```txt
Show animal
-> Show three food options
-> Child drags a food
-> Check answer
-> Show friendly feedback
-> Continue to next level
```

## Rules / Aturan

- One animal per level, three food options per level.
- No timer, no lives, no scoring penalty, no game over.
- The child can always try again.

## Correct Answer Behavior / Perilaku Jawaban Benar

- Animal plays a happy animation, food snaps to the animal.
- Soft success sound and short positive message.
- Game advances to the next level.

## Wrong Answer Behavior / Perilaku Jawaban Salah

- Food gently shakes and returns to its original position.
- Friendly message such as `Try again`.
- No penalty. Avoid words like Wrong, Failed, Bad, or Game Over.

## Progress Behavior / Perilaku Progres

- Levels advance one by one (e.g. `Level 1 / 8`).
- After the last animal, the game moves to the Result screen.
- The Result screen offers Play Again, Back to Games, and Home.

## Sound and Animation Behavior / Perilaku Suara dan Animasi

- Sounds are soft, short, and non-startling (success, gentle retry, quiet tap).
- Animations are lightweight and support feedback, not distract from it.
- Sound is easy to mute and safe to keep off; muting is silent.
- Missing audio or image assets must never block gameplay.

## Initial Levels / Level Awal

```txt
Rabbit   -> Carrot
Monkey   -> Banana
Cat      -> Fish
Dog      -> Bone
Cow      -> Grass
Chicken  -> Corn
Panda    -> Bamboo
Elephant -> Leaves
```

## Bilingual Note / Catatan Bilingual

For the MVP, gameplay instruction and success text may stay English-only, but should be structured so it can move into a `LocalizedText` (`{ en, idn }`) shape later. See `docs/WRITING_GUIDELINES.md`.
