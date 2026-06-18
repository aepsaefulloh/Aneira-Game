# Writing Guidelines — Aneira Game

## Purpose / Tujuan

### Indonesia

Dokumen ini menjelaskan aturan bahasa dan penulisan dokumentasi untuk **Aneira Game**.

Tujuannya adalah menjaga dokumentasi tetap bilingual, rapi, dan konsisten tanpa membuat setiap file phase menjadi terlalu panjang.

### English

This document defines the language and writing rules for **Aneira Game** documentation.

The goal is to keep documentation bilingual, clean, and consistent without making every phase file too long.

---

## Language Policy / Kebijakan Bahasa

### Indonesia

Aneira Game menggunakan dokumentasi bilingual:

1. Bahasa Indonesia
2. English

Bahasa Indonesia digunakan agar konteks produk mudah dipahami oleh pemilik project.

English digunakan agar instruksi teknis tetap jelas untuk AI coding tools dan developer workflow.

### English

Aneira Game uses bilingual documentation:

1. Indonesian
2. English

Indonesian is used so the product context is easy for the project owner to understand.

English is used so technical instructions remain clear for AI coding tools and developer workflows.

---

## Language Order / Urutan Bahasa

### Indonesia

Gunakan urutan berikut dalam dokumentasi:

```txt
Indonesia first
English second
```

### English

Use the following order in documentation:

```txt
Indonesian first
English second
```

---

## Recommended Section Format / Format Section yang Disarankan

### Indonesia

Gunakan format seperti ini untuk section penting:

```md
## Objective / Tujuan

### Indonesia

Tuliskan penjelasan dalam Bahasa Indonesia.

### English

Write the explanation in English.
```

### English

Use this format for important sections:

```md
## Objective / Tujuan

### Indonesia

Write the explanation in Indonesian.

### English

Write the explanation in English.
```

---

## Documents That Must Follow This Guideline / Dokumen yang Wajib Mengikuti Guideline Ini

### Indonesia

Dokumen berikut harus mengikuti aturan bilingual:

```txt
docs/BRD.md
docs/ARCHITECTURE.md
docs/DESIGN.md
docs/GAME_DESIGN.md
docs/TECHNICAL_DECISIONS.md
docs/ROADMAP.md
docs/plan/*.md
```

### English

The following documents must follow the bilingual rules:

```txt
docs/BRD.md
docs/ARCHITECTURE.md
docs/DESIGN.md
docs/GAME_DESIGN.md
docs/TECHNICAL_DECISIONS.md
docs/ROADMAP.md
docs/plan/*.md
```

---

## Phase Document Rule / Aturan Dokumen Phase

### Indonesia

Dokumen phase di dalam `docs/plan` harus tetap ringkas.

Jangan mengulang semua aturan bilingual di setiap file phase.

Setiap file phase cukup menambahkan referensi berikut di bagian atas:

```md
> This document follows `docs/WRITING_GUIDELINES.md`.
```

Setelah itu, tulis hanya konten yang spesifik untuk phase tersebut.

### English

Phase documents inside `docs/plan` should remain concise.

Do not repeat all bilingual rules in every phase file.

Each phase file only needs to add this reference at the top:

```md
> This document follows `docs/WRITING_GUIDELINES.md`.
```

After that, write only the content specific to that phase.

---

## Recommended Phase File Format / Format File Phase yang Disarankan

### Indonesia

Gunakan struktur ini untuk dokumen phase:

```md
# 1.x — Phase Title

> This document follows `docs/WRITING_GUIDELINES.md`.

## Status

Planned

## Phase Type

...

## Objective / Tujuan

### Indonesia

...

### English

...

## Scope / Cakupan

### Indonesia

...

### English

...

## Out of Scope / Di Luar Cakupan

### Indonesia

...

### English

...

## Required Files / File yang Dibutuhkan

...

## Acceptance Criteria / Kriteria Selesai

### Indonesia

...

### English

...

## Manual Test Flow / Alur Manual Testing

### Indonesia

...

### English

...
```

### English

Use this structure for phase documents:

```md
# 1.x — Phase Title

> This document follows `docs/WRITING_GUIDELINES.md`.

## Status

Planned

## Phase Type

...

## Objective / Tujuan

### Indonesia

...

### English

...

## Scope / Cakupan

### Indonesia

...

### English

...

## Out of Scope / Di Luar Cakupan

### Indonesia

...

### English

...

## Required Files / File yang Dibutuhkan

...

## Acceptance Criteria / Kriteria Selesai

### Indonesia

...

### English

...

## Manual Test Flow / Alur Manual Testing

### Indonesia

...

### English

...
```

---

## Keep Phase Plans Concise / Buat Phase Plan Tetap Ringkas

### Indonesia

Phase plan harus cukup detail untuk dieksekusi oleh AI coding tool, tetapi tidak perlu mengulang semua konteks project.

Gunakan referensi ke dokumen global jika dibutuhkan.

Contoh:

```md
> Follow `CLAUDE.md` and `docs/WRITING_GUIDELINES.md`.
```

Hindari mengulang:

* seluruh visi produk
* seluruh aturan bilingual
* seluruh arsitektur project
* seluruh roadmap
* aturan coding yang sudah ada di `CLAUDE.md`

### English

Phase plans should be detailed enough for an AI coding tool to execute, but they should not repeat the entire project context.

Use references to global documents when needed.

Example:

```md
> Follow `CLAUDE.md` and `docs/WRITING_GUIDELINES.md`.
```

Avoid repeating:

* the entire product vision
* all bilingual rules
* the full project architecture
* the entire roadmap
* coding rules already defined in `CLAUDE.md`

---

## Code Language Rules / Aturan Bahasa untuk Code

### Indonesia

Gunakan English untuk code.

Gunakan English untuk:

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
* default code comments

Contoh:

```ts
export interface AnimalFoodLevel {
  id: string
  correctFoodId: string
  foodOptions: AnimalFoodItem[]
}
```

### English

Use English for code.

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
* default code comments

Example:

```ts
export interface AnimalFoodLevel {
  id: string
  correctFoodId: string
  foodOptions: AnimalFoodItem[]
}
```

---

## Code Comments / Komentar Code

### Indonesia

Gunakan English untuk komentar code secara default.

Gunakan Bahasa Indonesia hanya jika konteksnya sangat spesifik ke produk dan lebih mudah dipahami dalam Bahasa Indonesia.

Komentar harus menjelaskan alasan, bukan mengulang apa yang sudah jelas dari code.

Contoh yang baik:

```ts
// Keep the drop zone forgiving for young children.
```

Contoh yang kurang perlu:

```ts
// Set x position.
```

### English

Use English for code comments by default.

Use Indonesian only when the context is very product-specific and easier to understand in Indonesian.

Comments should explain why, not repeat what is already obvious from the code.

Good example:

```ts
// Keep the drop zone forgiving for young children.
```

Less useful example:

```ts
// Set x position.
```

---

## User-Facing Text / Teks yang Dilihat User

### Indonesia

Teks yang tampil di game sebaiknya disiapkan agar bisa mendukung bilingual.

Contoh:

```txt
English: What does the rabbit eat?
Indonesian: Kelinci makan apa?
```

Untuk MVP awal, English-only masih boleh jika struktur code disiapkan agar teks bisa dipindahkan ke data/config.

Hindari menaruh teks panjang langsung di scene jika teks tersebut mungkin berubah atau diterjemahkan.

### English

User-facing game text should be prepared for bilingual support.

Example:

```txt
English: What does the rabbit eat?
Indonesian: Kelinci makan apa?
```

For the early MVP, English-only is acceptable if the code structure is prepared so text can be moved into data/config.

Avoid placing long text directly inside scenes if the text may change or be translated.

---

## Suggested User-Facing Text Structure / Struktur Teks User-Facing yang Disarankan

### Indonesia

Untuk data game, gunakan struktur yang mudah dikembangkan menjadi bilingual.

Contoh sederhana:

```ts
export interface LocalizedText {
  id: string
  en: string
  idn: string
}
```

Atau untuk level data:

```ts
instructionText: {
  en: 'What does the rabbit eat?',
  idn: 'Kelinci makan apa?'
}
```

Catatan:

* `idn` digunakan untuk Bahasa Indonesia agar tidak bentrok dengan field `id`.
* Jangan gunakan key `id` untuk language code karena `id` sudah umum dipakai sebagai identifier.

### English

For game data, use a structure that can be extended into bilingual support.

Simple example:

```ts
export interface LocalizedText {
  id: string
  en: string
  idn: string
}
```

Or for level data:

```ts
instructionText: {
  en: 'What does the rabbit eat?',
  idn: 'Kelinci makan apa?'
}
```

Note:

* `idn` is used for Indonesian to avoid conflict with the `id` field.
* Do not use `id` as the language code because `id` is commonly used as an identifier.

---

## Technical Documentation Tone / Gaya Dokumentasi Teknis

### Indonesia

Dokumentasi harus memiliki gaya:

* jelas
* praktis
* ringkas
* mudah dieksekusi
* cocok untuk vibe coding
* tidak terlalu akademik
* tidak terlalu abstrak

Hindari penjelasan panjang yang tidak membantu implementasi.

### English

Documentation should be:

* clear
* practical
* concise
* executable
* suitable for vibe coding
* not too academic
* not too abstract

Avoid long explanations that do not help implementation.

---

## BRD Writing Rule / Aturan Penulisan BRD

### Indonesia

`docs/BRD.md` harus menjelaskan kebutuhan bisnis dan produk dengan bahasa yang mudah dipahami.

BRD boleh lebih konseptual dibanding phase plan, tetapi tetap harus ringkas.

BRD harus mencakup:

* product summary
* target users
* goals
* MVP scope
* out of scope
* success criteria

### English

`docs/BRD.md` should explain business and product requirements in easy-to-understand language.

The BRD can be more conceptual than phase plans, but it should remain concise.

The BRD should include:

* product summary
* target users
* goals
* MVP scope
* out of scope
* success criteria

---

## Architecture Writing Rule / Aturan Penulisan Architecture

### Indonesia

`docs/ARCHITECTURE.md` harus menjelaskan struktur aplikasi, module, dan flow teknis.

Architecture doc harus membantu AI coding tool memahami:

* folder structure
* scene flow
* game module structure
* shared core layer
* data layer
* UI layer
* asset structure

### English

`docs/ARCHITECTURE.md` should explain the application structure, modules, and technical flow.

The architecture document should help AI coding tools understand:

* folder structure
* scene flow
* game module structure
* shared core layer
* data layer
* UI layer
* asset structure

---

## Design Writing Rule / Aturan Penulisan Design

### Indonesia

`docs/DESIGN.md` harus menjelaskan arah visual dan UX.

Design doc harus fokus pada:

* child-friendly UI
* mobile portrait layout
* touch target size
* visual tone
* color direction
* accessibility for young children
* feedback behavior

### English

`docs/DESIGN.md` should explain the visual and UX direction.

The design document should focus on:

* child-friendly UI
* mobile portrait layout
* touch target size
* visual tone
* color direction
* accessibility for young children
* feedback behavior

---

## Game Design Writing Rule / Aturan Penulisan Game Design

### Indonesia

`docs/GAME_DESIGN.md` harus menjelaskan mekanik game dan learning goals.

Game design doc harus mencakup:

* mini-game concept
* age target
* gameplay loop
* rules
* feedback
* levels
* difficulty
* child-friendly constraints

### English

`docs/GAME_DESIGN.md` should explain game mechanics and learning goals.

The game design document should include:

* mini-game concept
* age target
* gameplay loop
* rules
* feedback
* levels
* difficulty
* child-friendly constraints

---

## Technical Decisions Writing Rule / Aturan Penulisan Technical Decisions

### Indonesia

`docs/TECHNICAL_DECISIONS.md` harus mencatat keputusan teknis penting.

Gunakan format sederhana:

```md
## TD-001: Decision Title

### Indonesia

Keputusan:
...

Alasan:
...

### English

Decision:
...

Reason:
...
```

### English

`docs/TECHNICAL_DECISIONS.md` should record important technical decisions.

Use a simple format:

```md
## TD-001: Decision Title

### Indonesia

Keputusan:
...

Alasan:
...

### English

Decision:
...

Reason:
...
```

---

## Roadmap Writing Rule / Aturan Penulisan Roadmap

### Indonesia

`docs/ROADMAP.md` harus menjelaskan rencana pengembangan berdasarkan phase.

Roadmap harus mudah dibaca dan tidak terlalu detail.

Detail implementasi tetap berada di `docs/plan`.

### English

`docs/ROADMAP.md` should explain the development plan by phase.

The roadmap should be easy to read and not too detailed.

Implementation details should stay inside `docs/plan`.

---

## Acceptance Criteria Rule / Aturan Acceptance Criteria

### Indonesia

Setiap phase plan harus memiliki acceptance criteria.

Acceptance criteria harus spesifik, bisa dicek, dan berhubungan langsung dengan scope phase.

Contoh:

```md
## Acceptance Criteria / Kriteria Selesai

### Indonesia

- Animal Food bisa dibuka dari Age 3 game list.
- Food card bisa di-drag.
- Jawaban benar lanjut ke level berikutnya.

### English

- Animal Food can be opened from the Age 3 game list.
- Food cards can be dragged.
- Correct answers move to the next level.
```

### English

Every phase plan must include acceptance criteria.

Acceptance criteria should be specific, testable, and directly related to the phase scope.

Example:

```md
## Acceptance Criteria / Kriteria Selesai

### Indonesia

- Animal Food bisa dibuka dari Age 3 game list.
- Food card bisa di-drag.
- Jawaban benar lanjut ke level berikutnya.

### English

- Animal Food can be opened from the Age 3 game list.
- Food cards can be dragged.
- Correct answers move to the next level.
```

---

## Manual Test Flow Rule / Aturan Manual Test Flow

### Indonesia

Jika phase menghasilkan fitur yang bisa dijalankan, tambahkan manual test flow.

Contoh:

````md
## Manual Test Flow / Alur Manual Testing

### Indonesia

```txt
HomeScene
→ Start
→ Age 3
→ Animal Food
→ Drag correct food
→ ResultScene
````

### English

```txt
HomeScene
→ Start
→ Age 3
→ Animal Food
→ Drag correct food
→ ResultScene
```

`````

### English

If a phase produces a runnable feature, add a manual test flow.

Example:

````md
## Manual Test Flow / Alur Manual Testing

### Indonesia

```txt
HomeScene
→ Start
→ Age 3
→ Animal Food
→ Drag correct food
→ ResultScene
`````

### English

```txt
HomeScene
→ Start
→ Age 3
→ Animal Food
→ Drag correct food
→ ResultScene
```

````

---

## File Naming Rule / Aturan Nama File

### Indonesia

Gunakan lowercase dan kebab-case untuk file dokumentasi.

Contoh:

```txt
1.2-animal-food-mvp.md
1.3-kids-friendly-ui-feedback.md
```

Gunakan uppercase hanya untuk dokumen utama yang sudah disepakati:

```txt
BRD.md
ARCHITECTURE.md
DESIGN.md
GAME_DESIGN.md
TECHNICAL_DECISIONS.md
ROADMAP.md
WRITING_GUIDELINES.md
```

### English

Use lowercase and kebab-case for planning document files.

Examples:

```txt
1.2-animal-food-mvp.md
1.3-kids-friendly-ui-feedback.md
```

Use uppercase only for agreed main documents:

```txt
BRD.md
ARCHITECTURE.md
DESIGN.md
GAME_DESIGN.md
TECHNICAL_DECISIONS.md
ROADMAP.md
WRITING_GUIDELINES.md
```

---

## Final Reminder / Pengingat Akhir

### Indonesia

Dokumentasi harus membantu project bergerak cepat.

Jangan membuat dokumen terlalu panjang jika aturan tersebut sudah ada di dokumen global.

Gunakan:

```txt
CLAUDE.md
docs/WRITING_GUIDELINES.md
```

sebagai sumber aturan utama.

### English

Documentation should help the project move quickly.

Do not make documents too long if the rules already exist in global documents.

Use:

```txt
CLAUDE.md
docs/WRITING_GUIDELINES.md
```

as the main rule sources.
````
