import Phaser from "phaser";

type FeedbackTone = "neutral" | "success" | "gentle";

export class FeedbackBubble extends Phaser.GameObjects.Container {
  private readonly bubble: Phaser.GameObjects.Rectangle;
  private readonly label: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const bubble = scene.add.rectangle(0, 0, 250, 54, 0xffffff, 0.95).setStrokeStyle(3, 0xe4c56f);
    const label = scene.add.text(0, 0, "", {
      color: "#5b4636",
      fontFamily: "Trebuchet MS, Verdana, sans-serif",
      fontSize: "20px",
      fontStyle: "bold",
      align: "center",
      wordWrap: { width: 210 },
    });
    label.setOrigin(0.5);

    super(scene, x, y, [bubble, label]);
    this.bubble = bubble;
    this.label = label;
    this.alpha = 0;
    this.setVisible(false);
    scene.add.existing(this);
  }

  show(message: string, tone: FeedbackTone = "neutral"): void {
    const palette = this.getPalette(tone);
    this.label.setText(message);
    this.label.setColor(palette.text);
    this.bubble.setFillStyle(palette.fill, 0.98);
    this.bubble.setStrokeStyle(3, palette.stroke);
    this.setVisible(true);
    this.scene.tweens.killTweensOf(this);
    this.alpha = 0;
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 140,
      ease: "Back.easeOut",
    });
  }

  hide(): void {
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 120,
      onComplete: () => this.setVisible(false),
    });
  }

  private getPalette(tone: FeedbackTone): { fill: number; stroke: number; text: string } {
    if (tone === "success") {
      return { fill: 0xf2ffe8, stroke: 0x9fd86d, text: "#42603a" };
    }

    if (tone === "gentle") {
      return { fill: 0xfff6e9, stroke: 0xe7c470, text: "#775d42" };
    }

    return { fill: 0xffffff, stroke: 0xe4c56f, text: "#5b4636" };
  }
}
