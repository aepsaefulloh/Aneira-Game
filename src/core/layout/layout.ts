// Centralizes layout positions for the 390×844 base canvas.
// Using fractions of canvas dimensions instead of raw numbers means:
//  - positions are self-documenting (fraction × base = expected value)
//  - migrating to Phaser.Scale.EXPAND later only requires changing the
//    scale config, not touching every scene.
//
// At base resolution (390×844, FIT mode) all computed values match the
// original hardcoded constants exactly.

export interface AnimalFoodLayout {
  headerY: number;
  headerH: number;
  instructionY: number;
  progressY: number;
  animalTargetY: number;
  feedbackBubbleY: number;
  foodRowY: number;
  cardGap: number;
  dropZoneRadius: number;
}

export const computeAnimalFoodLayout = (
  width: number,
  height: number,
): AnimalFoodLayout => {
  // Three food cards, each 108px wide. Gap = centre-to-centre distance.
  // Ensures ≥18px edge margins at any canvas width.
  const cardGap = Math.max(100, Math.floor((width - 144) / 2));

  return {
    headerY:         Math.round(height * 0.062),  //  52 at h=844
    headerH:         Math.round(height * 0.097),  //  82 at h=844
    instructionY:    Math.round(height * 0.142),  // 120 at h=844
    progressY:       Math.round(height * 0.190),  // 160 at h=844
    animalTargetY:   Math.round(height * 0.393),  // 332 at h=844
    feedbackBubbleY: Math.round(height * 0.658),  // 555 at h=844
    foodRowY:        Math.round(height * 0.829),  // 700 at h=844
    cardGap,
    dropZoneRadius:  Math.min(150, Math.round(height * 0.178)),
  };
};

// Safe edge margins in game units — use when placing controls near edges.
export const SAFE_X = 24;
export const SAFE_Y_BTM = 32;
