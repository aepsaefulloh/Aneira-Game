import Phaser from "phaser";
import { ANIMAL_FOOD_CONFIG } from "../animal-food.config";
import type { AnimalFoodItem } from "../animal-food.types";

export class AnimalTarget extends Phaser.GameObjects.Container {
  private pulseTween?: Phaser.Tweens.Tween;
  private idleTween?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number, item: AnimalFoodItem) {
    const children: Phaser.GameObjects.GameObject[] = [];
    super(scene, x, y, children);
    scene.add.existing(this);

    const glow = scene.add.ellipse(0, 6, ANIMAL_FOOD_CONFIG.dropZoneRadius * 2.05, ANIMAL_FOOD_CONFIG.dropZoneRadius * 1.5, 0xfff3cf, 0.6);
    const outer = scene.add.circle(0, 0, ANIMAL_FOOD_CONFIG.dropZoneRadius, 0xf8efd9, 0.82);
    outer.setStrokeStyle(5, 0xe7c36d, 0.95);

    const card = scene.add
      .rectangle(0, 10, ANIMAL_FOOD_CONFIG.animalTargetSize, ANIMAL_FOOD_CONFIG.animalTargetSize, 0xfffdf8)
      .setStrokeStyle(4, 0xe7c166);
    const shadow = scene.add.rectangle(0, 24, ANIMAL_FOOD_CONFIG.animalTargetSize - 10, ANIMAL_FOOD_CONFIG.animalTargetSize - 18, 0xdab976, 0.16);

    this.add([glow, shadow, outer, card]);

    if (scene.textures.exists(item.assetKey)) {
      const image = scene.add.image(0, -10, item.assetKey);
      image.setDisplaySize(ANIMAL_FOOD_CONFIG.animalTargetSize - 36, ANIMAL_FOOD_CONFIG.animalTargetSize - 36);
      this.add(image);
    } else {
      const badge = scene.add.circle(0, -8, 52, 0xffefbf);
      const initial = scene.add.text(0, -16, item.name.slice(0, 1), {
        color: "#6d543f",
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "60px",
        fontStyle: "bold",
      });
      const eyeLeft = scene.add.circle(-14, 10, 4, 0x6d543f);
      const eyeRight = scene.add.circle(14, 10, 4, 0x6d543f);
      const smile = scene.add.ellipse(0, 26, 28, 12, 0x6d543f, 0.16);
      initial.setOrigin(0.5);
      this.add([badge, initial, eyeLeft, eyeRight, smile]);
    }

    const label = scene.add.text(0, 112, item.name, {
      color: "#5b4636",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "28px",
      fontStyle: "bold",
      align: "center",
    });
    label.setOrigin(0.5);
    this.add(label);

    this.idleTween = scene.tweens.add({
      targets: this,
      y: y - 5,
      duration: 1400,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
  }

  playHappyAnimation(): void {
    this.pulseTween?.stop();
    this.pulseTween = this.scene.tweens.add({
      targets: this,
      scaleX: 1.08,
      scaleY: 1.08,
      y: this.y - 16,
      duration: 180,
      yoyo: true,
      repeat: 1,
      ease: "Back.easeOut",
    });
  }
}
