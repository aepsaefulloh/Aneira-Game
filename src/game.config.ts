import Phaser from "phaser";
import { SCENE_KEYS } from "./core/constants/scene.keys";
import { BootScene } from "./scenes/BootScene";
import { PreloadScene } from "./scenes/PreloadScene";
import { HomeScene } from "./scenes/HomeScene";
import { AgeSelectScene } from "./scenes/AgeSelectScene";
import { GameListScene } from "./scenes/GameListScene";
import { ResultScene } from "./scenes/ResultScene";
import { AnimalFoodScene } from "./games/age-3/animal-food/AnimalFoodScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 390,
  height: 844,
  backgroundColor: "#f8f1e7",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    BootScene,
    PreloadScene,
    HomeScene,
    AgeSelectScene,
    GameListScene,
    ResultScene,
    AnimalFoodScene,
  ],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

export const initialSceneKey = SCENE_KEYS.BOOT;
