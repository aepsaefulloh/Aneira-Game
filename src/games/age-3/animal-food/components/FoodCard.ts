import Phaser from "phaser";
import { ANIMAL_FOOD_CONFIG } from "../animal-food.config";
import type { AnimalFoodItem } from "../animal-food.types";

export class FoodCard extends Phaser.GameObjects.Container {
  public readonly foodId: string;
  private readonly homeX: number;
  private readonly homeY: number;
  private readonly cardBody: Phaser.GameObjects.Rectangle;
  private readonly glow: Phaser.GameObjects.Ellipse;

  constructor(scene: Phaser.Scene, x: number, y: number, item: AnimalFoodItem) {
    const children: Phaser.GameObjects.GameObject[] = [];
    super(scene, x, y, children);
    this.foodId = item.id;
    this.homeX = x;
    this.homeY = y;

    scene.add.existing(this);

    const shadow = scene.add
      .ellipse(0, ANIMAL_FOOD_CONFIG.foodCardHeight / 2 - 4, ANIMAL_FOOD_CONFIG.foodCardWidth - 10, 18, 0xcba861, 0.22);
    const card = scene.add
      .rectangle(0, 0, ANIMAL_FOOD_CONFIG.foodCardWidth, ANIMAL_FOOD_CONFIG.foodCardHeight, 0xfffcf7)
      .setStrokeStyle(3, 0xe3c176);

    const glow = scene.add.ellipse(0, -22, 60, 44, 0xfff0c4, 0.6);
    const iconBg = scene.add.circle(0, -22, 32, 0xfff4d6);
    this.cardBody = card;
    this.glow = glow;
    this.add([shadow, card, glow, iconBg]);

    if (scene.textures.exists(item.assetKey)) {
      const image = scene.add.image(0, -22, item.assetKey);
      image.setDisplaySize(50, 50);
      this.add(image);
    } else {
      const icon = scene.add.text(0, -24, item.name.slice(0, 1), {
        color: "#6d543f",
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "38px",
        fontStyle: "bold",
      });
      icon.setOrigin(0.5);
      this.add(icon);
    }

    const label = scene.add.text(0, 34, item.name, {
      color: "#5b4636",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "19px",
      fontStyle: "bold",
      align: "center",
      wordWrap: { width: ANIMAL_FOOD_CONFIG.foodCardWidth - 12 },
    });
    label.setOrigin(0.5);
    this.add(label);

    this.setSize(ANIMAL_FOOD_CONFIG.foodCardWidth, ANIMAL_FOOD_CONFIG.foodCardHeight);
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -ANIMAL_FOOD_CONFIG.foodCardWidth / 2,
        -ANIMAL_FOOD_CONFIG.foodCardHeight / 2,
        ANIMAL_FOOD_CONFIG.foodCardWidth,
        ANIMAL_FOOD_CONFIG.foodCardHeight,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    scene.input.setDraggable(this);
  }

  resetPosition(): void {
    this.scene.tweens.add({
      targets: this,
      x: this.homeX,
      y: this.homeY,
      duration: 180,
      ease: "Sine.easeOut",
    });
  }

  playWrongAnimation(): void {
    this.scene.tweens.add({
      targets: this,
      x: this.x + 10,
      duration: 50,
      yoyo: true,
      repeat: 3,
      ease: "Sine.easeInOut",
    });
  }

  playCorrectAnimation(): void {
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.1,
      scaleY: 1.1,
      angle: 6,
      duration: 140,
      yoyo: true,
      ease: "Back.easeOut",
    });
  }

  setDraggingState(isDragging: boolean): void {
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      scaleX: isDragging ? 1.06 : 1,
      scaleY: isDragging ? 1.06 : 1,
      duration: 120,
      ease: "Sine.easeOut",
    });

    this.cardBody.setFillStyle(isDragging ? 0xfff7e7 : 0xfffcf7);
    this.glow.setAlpha(isDragging ? 0.92 : 0.6);
    if (isDragging) {
      this.setDepth(20);
    } else {
      this.setDepth(0);
    }
  }
}
