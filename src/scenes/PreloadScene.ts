import Phaser from "phaser";
import { AudioManager } from "../core/managers/AudioManager";
import { SCENE_KEYS } from "../core/constants/scene.keys";
import { ANIMAL_FOOD_ASSETS } from "../games/age-3/animal-food/animal-food.assets";
import { createSceneBackdrop, createSceneTitle } from "../ui/helpers/scene-layout";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.PRELOAD);
  }

  preload(): void {
    AudioManager.initialize();

    ANIMAL_FOOD_ASSETS.images.forEach((asset) => {
      this.load.image(asset.key, asset.path);
    });

    ANIMAL_FOOD_ASSETS.audio.forEach((asset) => {
      this.load.audio(asset.key, asset.path);
    });
  }

  create(): void {
    createSceneBackdrop(this, 0xfdf6ec);
    createSceneTitle(this, "Aneira Game", "Preparing the first playful learning world...");

    this.time.delayedCall(350, () => {
      this.scene.start(SCENE_KEYS.HOME);
    });
  }
}
