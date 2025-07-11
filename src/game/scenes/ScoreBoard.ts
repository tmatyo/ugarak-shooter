import { Scene } from "phaser";

export class ScoreBoard extends Scene {
  constructor() {
    super("ScoreBoard");
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(
      width / 2,
      height / 2,
      "Game Over\nYour Score: 100", // Replace with actual score
      { fontSize: '32px', color: '#fff', align: 'center' }
    ).setOrigin(0.5);

    this.input.setDefaultCursor("default");

    const backToMenuButton = this.add
      .image(width - 250, height - 50, "menuButton")
      .setInteractive({ cursor: "pointer" })
      .setOrigin(0.5)
      .setDisplaySize(100, 50)
      .on("pointerdown", () => {
        this.scene.start("MainMenu");
      })
      .on("pointerover", () => {
        backToMenuButton.setDisplaySize(110, 55);
      })
      .on("pointerout", () => {
        backToMenuButton.setDisplaySize(100, 50);
      });
  }
}