# Roadmap

> This document follows `docs/WRITING_GUIDELINES.md`.

## 1.0 Project Foundation

Create the project structure, docs, toolchain, and shared shell scene baseline.

## 1.1 App Shell + Age Classification

Build the first navigable app shell:

- Home screen
- Age selection
- Game list by age
- Animal Food placeholder scene
- Result placeholder scene

## 1.2 Animal Food MVP

Implement the first playable Age 3 mini-game.

Scope:

- level data
- animal target
- draggable food cards
- answer checking
- correct/wrong feedback
- level progression
- result screen flow

## 1.3 Kids Friendly UI Feedback

### Indonesia

Meningkatkan UI dan feedback Animal Food agar lebih ramah untuk anak usia 3 tahun.

### English

Improve Animal Food UI and feedback so it feels more friendly for 3-year-old children.

## 1.4 Audio Animation Polish

Add simple motion, effects, and sound feedback.

- soft success, retry, and tap sounds
- safe mute toggle with saved preference
- lightweight level and result animations

## 1.4.1 Documentation Cleanup and UI Theme Alignment

### Indonesia

Merapikan dokumentasi utama dan menyelaraskan UI: pemilihan bahasa, sound toggle, dan tema per segmen umur. Tidak menambah game baru dan belum memulai Android.

### English

Clean up the main documentation and align the UI: language selection, sound toggle, and per-age-segment themes. No new game and no Android work yet.

## 1.4.2 Responsive Browser QA and Layout Stabilization

### Indonesia

Stabilkan layout di berbagai ukuran viewport. Perkenalkan layout helper untuk posisi berbasis fraksi, perbaiki footer button agar mengikuti tinggi canvas, dan buat Playwright test untuk screenshot QA di 6 viewport.

### English

Stabilize layout across viewport sizes. Introduce a layout helper for fraction-based positions, fix footer buttons to follow canvas height, and add a Playwright test for screenshot QA across 6 viewports.

## 1.5 Capacitor Android Build

Wrap the web app for Android packaging.

## 2.0 Next Age 3 Mini Game

Add another mini-game that reuses the shared shell and age-3 content patterns.
