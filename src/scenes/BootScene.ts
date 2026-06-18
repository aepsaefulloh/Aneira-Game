import Phaser from "phaser";
import { SCENE_KEYS } from "../core/constants/scene.keys";

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.BOOT);
  }

  create(): void {
    this.scene.start(SCENE_KEYS.PRELOAD);
  }
}
