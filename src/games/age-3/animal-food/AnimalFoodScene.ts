import Phaser from "phaser";
import { AudioManager } from "../../../core/managers/AudioManager";
import { LanguageManager } from "../../../core/managers/LanguageManager";
import { SCENE_KEYS } from "../../../core/constants/scene.keys";
import type { AgeGroupId } from "../../../core/types/age-group.type";
import { getAgeTheme } from "../../../core/theme/age-themes";
import { UI_STRINGS } from "../../../data/ui-strings";
import { createBaseButton } from "../../../ui/components/BaseButton";
import { createSoundToggle } from "../../../ui/components/SoundToggle";
import { ANIMAL_FOOD_CONFIG } from "./animal-food.config";
import { ANIMAL_FOOD_LEVELS } from "./animal-food.levels";
import type { AnimalFoodLevel, AnimalFoodSceneData } from "./animal-food.types";
import { AnimalTarget } from "./components/AnimalTarget";
import { FeedbackBubble } from "./components/FeedbackBubble";
import { FoodCard } from "./components/FoodCard";
import { checkAnimalFoodAnswer } from "./utils/checkAnswer";
import { shuffleFoodOptions } from "./utils/shuffleFoodOptions";

export class AnimalFoodScene extends Phaser.Scene {
  private currentLevelIndex = 0;
  private currentLevel?: AnimalFoodLevel;
  private selectedAgeGroupId: AgeGroupId = "age-3";
  private isTransitioning = false;
  private completedCount = 0;
  private wrongAttemptCount = 0;

  private instructionText?: Phaser.GameObjects.Text;
  private progressText?: Phaser.GameObjects.Text;
  private feedbackBubble?: FeedbackBubble;
  private animalTarget?: AnimalTarget;
  private foodCards: FoodCard[] = [];
  private levelDecorations: Phaser.GameObjects.GameObject[] = [];

  init(data: AnimalFoodSceneData): void {
    this.selectedAgeGroupId = data.ageGroupId ?? "age-3";
  }

  constructor() {
    super(SCENE_KEYS.ANIMAL_FOOD);
  }

  create(): void {
    this.currentLevelIndex = 0;
    this.completedCount = 0;
    this.wrongAttemptCount = 0;
    this.isTransitioning = false;

    this.cameras.main.setBackgroundColor("#fef8ef");
    this.createStaticUi();
    this.registerDragHandlers();
    this.renderLevel();
  }

  private createStaticUi(): void {
    const { width, height } = this.scale;
    const theme = getAgeTheme(this.selectedAgeGroupId);

    this.add.rectangle(width / 2, height / 2, width, height, theme.backgroundColor).setOrigin(0.5);
    this.add.ellipse(width / 2, 180, width * 1.18, 250, 0xffefc9, 0.5);
    this.add.ellipse(width / 2, height - 40, width * 1.1, 180, 0xfde7b7, 0.38);
    this.add.rectangle(width / 2, 52, width - 26, 82, theme.surfaceColor).setStrokeStyle(2, theme.secondaryColor);

    createBaseButton({
      scene: this,
      x: 66,
      y: 50,
      width: 100,
      height: 46,
      label: LanguageManager.t(UI_STRINGS.common.back),
      onClick: () => {
        if (this.isTransitioning) {
          return;
        }

        this.scene.start(SCENE_KEYS.GAME_LIST, {
          ageGroupId: this.selectedAgeGroupId,
        });
      },
    });

    // Compact sound toggle: a quiet setting that does not dominate the header.
    createSoundToggle({
      scene: this,
      x: width - 70,
      y: 50,
      theme,
    });

    this.add
      .text(width / 2, 48, "Animal Food", {
        color: "#5b4636",
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "30px",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.instructionText = this.add
      .text(width / 2, 120, "", {
        color: "#5b4636",
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "28px",
        fontStyle: "bold",
        align: "center",
        wordWrap: { width: width - 48 },
      })
      .setOrigin(0.5);

    this.progressText = this.add
      .text(width / 2, 160, "", {
        color: "#7a6a5f",
        fontFamily: "Trebuchet MS, Verdana, sans-serif",
        fontSize: "17px",
        backgroundColor: "#fff8ea",
        align: "center",
      })
      .setOrigin(0.5);

    this.feedbackBubble = new FeedbackBubble(this, width / 2, ANIMAL_FOOD_CONFIG.feedbackY);
  }

  private registerDragHandlers(): void {
    this.input.on("dragstart", (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
      if (this.isTransitioning || !(gameObject instanceof FoodCard)) {
        return;
      }

      AudioManager.play(this, "animal-food-tap");
      gameObject.setDraggingState(true);
    });

    this.input.on("drag", (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
      if (this.isTransitioning || !(gameObject instanceof FoodCard)) {
        return;
      }

      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
      if (this.isTransitioning || !(gameObject instanceof FoodCard)) {
        return;
      }

      gameObject.setDraggingState(false);

      if (!this.isInsideDropZone(gameObject.x, gameObject.y)) {
        gameObject.resetPosition();
        return;
      }

      this.handleFoodDrop(gameObject.foodId, gameObject);
    });
  }

  private renderLevel(): void {
    this.clearLevelObjects();

    const level = ANIMAL_FOOD_LEVELS[this.currentLevelIndex];
    this.currentLevel = level;

    if (!level || !this.instructionText || !this.progressText || !this.feedbackBubble) {
      return;
    }

    this.instructionText.setText(level.instructionText);
    this.progressText.setText(`Level ${this.currentLevelIndex + 1} / ${ANIMAL_FOOD_LEVELS.length}`);
    this.feedbackBubble.hide();

    this.animalTarget = new AnimalTarget(this, this.scale.width / 2, ANIMAL_FOOD_CONFIG.animalTargetY, level.animal);

    const shuffledOptions = shuffleFoodOptions(level.foodOptions);
    const startX = 72;
    const gap = 123;

    this.foodCards = shuffledOptions.map((item, index) => {
      return new FoodCard(this, startX + gap * index, ANIMAL_FOOD_CONFIG.foodRowY, item);
    });

    this.renderPlayHint();
  }

  private clearLevelObjects(): void {
    this.animalTarget?.destroy();
    this.animalTarget = undefined;

    this.foodCards.forEach((card) => card.destroy());
    this.foodCards = [];
    this.levelDecorations.forEach((item) => item.destroy());
    this.levelDecorations = [];
  }

  private isInsideDropZone(x: number, y: number): boolean {
    if (!this.animalTarget) {
      return false;
    }

    const distance = Phaser.Math.Distance.Between(x, y, this.animalTarget.x, this.animalTarget.y);
    return distance <= ANIMAL_FOOD_CONFIG.dropZoneRadius;
  }

  private handleFoodDrop(selectedFoodId: string, foodCard: FoodCard): void {
    if (!this.currentLevel || this.isTransitioning) {
      return;
    }

    const isCorrect = checkAnimalFoodAnswer(this.currentLevel, selectedFoodId);

    if (isCorrect) {
      this.handleCorrectAnswer(foodCard);
      return;
    }

    this.handleWrongAnswer(foodCard);
  }

  private handleCorrectAnswer(foodCard: FoodCard): void {
    if (!this.currentLevel || !this.feedbackBubble || !this.animalTarget) {
      return;
    }

    this.isTransitioning = true;
    this.completedCount += 1;
    foodCard.playCorrectAnimation();
    this.animalTarget.playHappyAnimation();
    this.feedbackBubble.show(this.currentLevel.successText, "success");
    AudioManager.play(this, "animal-food-success");
    AudioManager.play(this, "animal-food-animal");
    this.playSuccessReward();
    this.cameras.main.flash(180, 255, 247, 226, false);

    this.time.delayedCall(ANIMAL_FOOD_CONFIG.levelTransitionDelayMs, () => {
      this.goToNextLevel();
    });
  }

  private handleWrongAnswer(foodCard: FoodCard): void {
    this.wrongAttemptCount += 1;
    this.feedbackBubble?.show(this.getWrongFeedbackText(), "gentle");
    AudioManager.play(this, "animal-food-wrong");
    foodCard.playWrongAnimation();

    this.time.delayedCall(ANIMAL_FOOD_CONFIG.wrongResetDelayMs, () => {
      foodCard.resetPosition();
      this.time.delayedCall(ANIMAL_FOOD_CONFIG.feedbackDurationMs, () => {
        this.feedbackBubble?.hide();
      });
    });
  }

  private goToNextLevel(): void {
    this.currentLevelIndex += 1;
    this.isTransitioning = false;

    if (this.currentLevelIndex >= ANIMAL_FOOD_LEVELS.length) {
      this.finishGame();
      return;
    }

    this.cameras.main.fadeIn(180, 253, 246, 234);
    this.renderLevel();
  }

  private finishGame(): void {
    this.scene.start(SCENE_KEYS.RESULT, {
      ageGroupId: this.selectedAgeGroupId,
      title: "Great Job!",
      message: "You helped all animals eat.",
    });
  }

  private renderPlayHint(): void {
    const hint = this.add.text(this.scale.width / 2, 610, "Drag a food card to the animal", {
      color: "#8d7a67",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "16px",
      align: "center",
    });
    hint.setOrigin(0.5);
    this.levelDecorations.push(hint);
  }

  private playSuccessReward(): void {
    const centerX = this.scale.width / 2;
    const centerY = 250;

    for (let index = 0; index < ANIMAL_FOOD_CONFIG.rewardParticleCount; index += 1) {
      const star = this.add.star(centerX, centerY, 5, 8, 14, 0xffdf70);
      const angle = Phaser.Math.DegToRad((360 / ANIMAL_FOOD_CONFIG.rewardParticleCount) * index);
      const distance = 55 + index * 4;
      this.levelDecorations.push(star);

      this.tweens.add({
        targets: star,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        alpha: 0,
        scaleX: 0.4,
        scaleY: 0.4,
        duration: 420,
        ease: "Cubic.easeOut",
        onComplete: () => star.destroy(),
      });
    }
  }

  private getWrongFeedbackText(): string {
    const messages = ["Try again", "Almost", "Let's try another one"];
    return messages[this.wrongAttemptCount % messages.length] ?? "Try again";
  }
}
