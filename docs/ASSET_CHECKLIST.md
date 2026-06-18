# ASSET CHECKLIST — Aneira Game

> This document follows `docs/WRITING_GUIDELINES.md`.

Checklist ini melacak semua aset yang dibutuhkan untuk proyek Aneira Game.
Update status setiap kali aset ditambahkan, diganti, atau dihapus.

This checklist tracks all assets required for the Aneira Game project.
Update the status whenever an asset is added, replaced, or removed.

---

## Status Legend / Legenda Status

| Symbol | Meaning |
|--------|---------|
| ⬜ | Needed — not started yet |
| 🔄 | In progress — being sourced or created |
| 🟨 | Placeholder — temporary shape or color used in code |
| ✅ | Ready — real asset in place and tested |
| ⏭️ | Skipped — not needed for current phase |

---

## Asset Usage Rules / Aturan Penggunaan Aset

### Indonesia

1. Setiap aset yang diunduh **harus** dicatat sumber dan lisensinya di tabel bagian bawah dokumen ini.
2. Prioritaskan aset berlisensI **CC0** (public domain) atau lisensi yang aman untuk penggunaan komersial.
3. Aset placeholder (bentuk atau warna sementara di kode) **tidak boleh** digunakan dalam build produksi final.
4. Jangan simpan aset besar (>500KB) di folder yang tidak terdaftar di sini.
5. Nama file harus **lowercase**, menggunakan tanda hubung (`-`), tanpa spasi. Contoh: `rabbit.png`, `correct-answer.mp3`.

### English

1. Every downloaded asset **must** have its source and license recorded in the tracking table at the bottom of this document.
2. Prioritize assets licensed as **CC0** (public domain) or licenses that are safe for commercial use.
3. Placeholder assets (temporary shapes or colors in code) **must not** be used in the final production build.
4. Do not store large files (>500 KB) in folders not listed here.
5. File names must be **lowercase**, hyphen-separated, no spaces. Example: `rabbit.png`, `correct-answer.mp3`.

---

## Recommended Asset Folder Structure / Struktur Folder Aset yang Disarankan

```
public/assets/
├── common/
│   ├── audio/
│   │   ├── ui/           ← button tap, generic UI sounds
│   │   └── shared/       ← sounds used across multiple games
│   ├── icons/            ← app icon, favicon
│   ├── branding/         ← logo, splash, cover image
│   └── ui/               ← buttons, panels, toggle graphics
└── games/
    └── age-3/
        └── animal-food/
            ├── animals/  ← rabbit, monkey, cat, dog, cow, chicken, panda, elephant
            ├── foods/    ← carrot, banana, fish, bone, grass, corn, bamboo, leaves
            └── audio/    ← animal sounds, game feedback sounds
```

---

## 1. Branding / General Assets / Aset Branding Umum

Aset identitas visual aplikasi yang digunakan di luar gameplay.
Visual identity assets used outside of gameplay.

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| App Logo | ⬜ | `logo.png` | PNG (transparent) | — | — | `common/branding/` | Used on HomeScene and splash |
| App Icon (Android) | ⬜ | `icon-512.png` | PNG 512×512 | — | — | `common/icons/` | Required for Capacitor APK |
| App Icon (Favicon) | ⬜ | `favicon.ico` | ICO or PNG 32×32 | — | — | `public/` | Browser tab icon |
| Splash / Cover Image | ⬜ | `splash.png` | PNG 1080×1920 | — | — | `common/branding/` | Full-screen splash for Android |
| Loading Screen Background | ⬜ | `loading-bg.png` | PNG | — | — | `common/branding/` | Used during Phaser preload |

---

## 2. UI Assets / Aset Antarmuka

Aset tombol, panel, kartu, dan kontrol UI yang digunakan di seluruh scene.
Button, panel, card, and UI control assets used across all scenes.

> **Note**: Phase 1.4.2 — buttons, cards, and controls are currently drawn with Phaser `Graphics` (code-only, no image files). These entries track future image replacements if real artwork is added.

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| Primary Button (normal) | 🟨 | `btn-primary.png` | PNG (9-slice) | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Primary Button (pressed) | 🟨 | `btn-primary-pressed.png` | PNG (9-slice) | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Secondary Button | 🟨 | `btn-secondary.png` | PNG (9-slice) | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Card Panel Surface | 🟨 | `card-surface.png` | PNG (9-slice) | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Age Card | 🟨 | `card-age.png` | PNG (9-slice) | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Game Card | 🟨 | `card-game.png` | PNG (9-slice) | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Language Selector Pill | 🟨 | `pill-lang.png` | PNG | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Sound Toggle (on) | 🟨 | `toggle-sound-on.png` | PNG | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Sound Toggle (off) | 🟨 | `toggle-sound-off.png` | PNG | Code (Phaser Graphics) | — | `common/ui/` | Currently drawn in code |
| Drop Zone Circle | 🟨 | `drop-zone.png` | PNG (transparent) | Code (Phaser Graphics) | — | `common/ui/` | Target ring on AnimalFoodScene |
| Star (celebration) | 🟨 | `star.png` | PNG (transparent) | Code (Phaser `star`) | — | `common/ui/` | Used in ResultScene |
| Progress Dot (active) | 🟨 | `dot-active.png` | PNG | Code (Phaser Graphics) | — | `common/ui/` | Level progress indicator |
| Progress Dot (inactive) | 🟨 | `dot-inactive.png` | PNG | Code (Phaser Graphics) | — | `common/ui/` | Level progress indicator |

---

## 3. Background and Decorative Assets / Aset Latar dan Dekoratif

Aset latar belakang dan elemen dekoratif untuk setiap scene.
Background and decorative element assets for each scene.

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| HomeScene Background | 🟨 | `bg-home.png` | PNG | Code (solid color) | — | `common/backgrounds/` | Currently warm cream flat color |
| AgeSelectScene Background | 🟨 | `bg-age-select.png` | PNG | Code (solid color) | — | `common/backgrounds/` | |
| GameListScene Background | 🟨 | `bg-game-list.png` | PNG | Code (solid color) | — | `common/backgrounds/` | |
| AnimalFoodScene Background | 🟨 | `bg-animal-food.png` | PNG | Code (solid color) | — | `games/age-3/animal-food/` | |
| ResultScene Background | 🟨 | `bg-result.png` | PNG | Code (solid color) | — | `common/backgrounds/` | |
| Decorative Farm/Nature Blob 1 | ⬜ | `decor-blob-1.png` | PNG (transparent) | — | — | `common/ui/` | Background accent, top-right |
| Decorative Farm/Nature Blob 2 | ⬜ | `decor-blob-2.png` | PNG (transparent) | — | — | `common/ui/` | Background accent, bottom-left |
| Grass / Ground Strip | ⬜ | `ground-strip.png` | PNG | — | — | `games/age-3/animal-food/` | Bottom edge of AnimalFoodScene |
| Sun / Sky Accent | ⬜ | `sky-accent.png` | PNG (transparent) | — | — | `games/age-3/animal-food/` | Soft sky decoration |
| Small Flower 1 | ⬜ | `flower-1.png` | PNG (transparent) | — | — | `games/age-3/animal-food/` | Decorative element |
| Small Flower 2 | ⬜ | `flower-2.png` | PNG (transparent) | — | — | `games/age-3/animal-food/` | Decorative element |
| Tree / Bush Accent | ⬜ | `tree-accent.png` | PNG (transparent) | — | — | `games/age-3/animal-food/` | Background tree silhouette |

---

## 4. Animal Food — Animal Assets / Aset Binatang

Ilustrasi binatang untuk game Animal Food. Harus ramah anak, lucu, dan jelas terlihat di layar kecil.
Animal illustrations for the Animal Food game. Must be child-friendly, cute, and clearly visible on small screens.

**Target size**: 200×200 px minimum. Transparent background (PNG). Facing forward or slight left/right tilt.

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| Rabbit | 🟨 | `rabbit.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/animals/` | Matches with Carrot |
| Monkey | 🟨 | `monkey.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/animals/` | Matches with Banana |
| Cat | 🟨 | `cat.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/animals/` | Matches with Fish |
| Dog | 🟨 | `dog.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/animals/` | Matches with Bone |
| Cow | 🟨 | `cow.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/animals/` | Matches with Grass |
| Chicken | 🟨 | `chicken.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/animals/` | Matches with Corn |
| Panda | 🟨 | `panda.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/animals/` | Matches with Bamboo |
| Elephant | 🟨 | `elephant.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/animals/` | Matches with Leaves |

---

## 5. Animal Food — Food Assets / Aset Makanan

Ilustrasi makanan untuk game Animal Food. Harus jelas, berwarna cerah, dan mudah dikenali anak usia 3 tahun.
Food illustrations for the Animal Food game. Must be clear, brightly colored, and easily recognizable to 3-year-old children.

**Target size**: 120×120 px minimum. Transparent background (PNG).

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| Carrot | 🟨 | `carrot.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/foods/` | Pair: Rabbit |
| Banana | 🟨 | `banana.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/foods/` | Pair: Monkey |
| Fish | 🟨 | `fish.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/foods/` | Pair: Cat |
| Bone | 🟨 | `bone.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/foods/` | Pair: Dog |
| Grass | 🟨 | `grass.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/foods/` | Pair: Cow |
| Corn | 🟨 | `corn.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/foods/` | Pair: Chicken |
| Bamboo | 🟨 | `bamboo.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/foods/` | Pair: Panda |
| Leaves | 🟨 | `leaves.png` | PNG (transparent) | Code (letter placeholder) | — | `games/age-3/animal-food/foods/` | Pair: Elephant |

---

## 6. Audio Assets / Aset Audio

Suara untuk feedback gameplay dan antarmuka. Semua suara harus ramah anak — lembut, tidak mengagetkan.
Sounds for gameplay feedback and UI. All sounds must be child-friendly — gentle, not startling.

**Format preference**: `.ogg` (primary) + `.mp3` (fallback). Keep files under 200 KB each.

### 6a. Common UI Sounds / Suara UI Umum

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| Button Tap | 🟨 | `tap.ogg` | OGG + MP3 | Phaser fallback tone | — | `common/audio/ui/` | Used on every button press |
| Scene Transition | ⬜ | `scene-transition.ogg` | OGG + MP3 | — | — | `common/audio/ui/` | Soft whoosh or chime |

### 6b. Animal Food — Feedback Sounds / Suara Feedback Game

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| Correct Answer | 🟨 | `correct-answer.ogg` | OGG + MP3 | Phaser fallback tone | — | `games/age-3/animal-food/audio/` | Happy, short chime |
| Wrong Answer / Try Again | 🟨 | `wrong-answer.ogg` | OGG + MP3 | Phaser fallback tone | — | `games/age-3/animal-food/audio/` | Gentle, soft bump |
| Level Complete | 🟨 | `level-complete.ogg` | OGG + MP3 | Phaser fallback tone | — | `games/age-3/animal-food/audio/` | Short upbeat jingle |
| Celebration (Result) | 🟨 | `celebration.ogg` | OGG + MP3 | Phaser fallback tone | — | `games/age-3/animal-food/audio/` | Cheerful melody, ≤3 sec |
| Food Drag Start | ⬜ | `drag-start.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Subtle pickup sound |
| Food Drag Drop (miss) | ⬜ | `drag-drop-miss.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Soft thud |

### 6c. Animal Food — Animal Sounds / Suara Binatang

Suara binatang singkat yang diputar saat anak berhasil menjawab dengan benar.
Short animal sounds played when a child answers correctly.

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| Rabbit Sound | ⬜ | `rabbit.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Soft nose-twitching or hop sound |
| Monkey Sound | ⬜ | `monkey.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Gentle "ooh-ooh" |
| Cat Sound | ⬜ | `cat.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Soft meow |
| Dog Sound | ⬜ | `dog.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Friendly woof |
| Cow Sound | ⬜ | `cow.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Soft moo |
| Chicken Sound | ⬜ | `chicken.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Gentle cluck |
| Panda Sound | ⬜ | `panda.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Soft bleat or munch |
| Elephant Sound | ⬜ | `elephant.ogg` | OGG + MP3 | — | — | `games/age-3/animal-food/audio/` | Gentle trumpet |

---

## 7. Optional FX / Animation Assets / Aset Efek dan Animasi Opsional

Aset tambahan untuk animasi dan efek visual. Belum diperlukan untuk MVP.
Additional assets for animations and visual effects. Not required for MVP.

| Asset Name | Status | File Name | Format | Source | License | Path | Notes |
|---|---|---|---|---|---|---|---|
| Confetti Particle | ⬜ | `confetti.png` | PNG (spritesheet) | — | — | `common/ui/` | For ResultScene celebration |
| Heart Burst Particle | ⬜ | `heart-burst.png` | PNG (spritesheet) | — | — | `common/ui/` | Correct answer extra polish |
| Sparkle Particle | ⬜ | `sparkle.png` | PNG (spritesheet) | — | — | `common/ui/` | Drop zone success effect |
| Animal Idle Animation | ⬜ | `rabbit-idle.png` | PNG (spritesheet) | — | — | `games/age-3/animal-food/animals/` | Optional breathing/blinking loop |
| Food Bounce Animation | ⬜ | `food-idle.png` | PNG (spritesheet) | — | — | `games/age-3/animal-food/foods/` | Optional idle bounce loop |
| Background Music (loop) | ⬜ | `bgm-gameplay.ogg` | OGG + MP3 | — | — | `common/audio/shared/` | Gentle loop, child-friendly, ≤2 MB |
| Background Music (menu) | ⬜ | `bgm-menu.ogg` | OGG + MP3 | — | — | `common/audio/shared/` | Light, soft loop for HomeScene |

---

## 8. Source and License Tracking Table / Tabel Sumber dan Lisensi

> **Wajib diisi** untuk setiap aset yang diunduh atau dibeli dari sumber luar.
> **Required** for every asset downloaded or purchased from an external source.

| # | Asset File | Source Name | Source URL | License | License URL | Date Added | Added By | Notes |
|---|---|---|---|---|---|---|---|---|
| — | *(none yet)* | — | — | — | — | — | — | All assets are currently code-generated placeholders |

### Approved License Types / Jenis Lisensi yang Disetujui

| License | Commercial Use | Attribution Required | Notes |
|---------|---------------|---------------------|-------|
| **CC0** | ✅ Yes | ❌ No | Best choice — public domain |
| **CC BY 4.0** | ✅ Yes | ✅ Yes | Credit the author in app or docs |
| **CC BY-SA 4.0** | ✅ Yes | ✅ Yes | Share-alike — derivative must use same license |
| **Royalty-Free (purchased)** | ✅ Yes | ❌ Usually no | Keep purchase receipt and license PDF |
| **OFL (fonts)** | ✅ Yes | ✅ Yes | Open Font License — standard for fonts |

### Rejected License Types / Jenis Lisensi yang Ditolak

| License | Why Rejected |
|---------|-------------|
| CC BY-NC (Non-Commercial) | Cannot be used if app generates revenue |
| Editorial Use Only | Not allowed for game assets |
| Freepik Free License (unattributed) | Requires attribution; check current terms carefully |
| Stock art with per-seat restriction | May not cover all team members |

---

## Recommended Free Asset Sources / Sumber Aset Gratis yang Disarankan

| Source | URL | Good For | License |
|--------|-----|----------|---------|
| OpenGameArt.org | `opengameart.org` | Game sprites, audio, backgrounds | Mostly CC0 / CC BY |
| Freesound.org | `freesound.org` | Sound effects, animal sounds | CC0 / CC BY (per asset) |
| Kenney.nl | `kenney.nl` | UI kits, characters, icons, audio | CC0 |
| itch.io (free asset packs) | `itch.io` | Game art, UI, animations | Varies — check each pack |
| Pixabay | `pixabay.com` | Photos, illustrations, audio | Pixabay License (commercial OK) |
| Unsplash | `unsplash.com` | Photos only | Unsplash License (commercial OK) |
| Google Fonts | `fonts.google.com` | Fonts | OFL / Apache 2.0 |

> Always verify the license of each **individual asset** before use, even on CC0-primary sites. Some contributors apply stricter terms.

---

*Last updated: 2026-06-19*
