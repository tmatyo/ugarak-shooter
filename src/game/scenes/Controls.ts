import { Scene, GameObjects } from "phaser";
import { controlsHint } from "../gameData";

export class Controls extends Scene {
  constructor() {
    super("Controls");
  }

  create() {
    const { width, height } = this.scale;
    const { padding, textureName, backgroundColor, backgroundOpacity } = controlsHint;

    const sfxHover = this.sound.add("hover");
    this.input.once("pointerdown", () => {
      if (this.sound.locked) {
        this.sound.unlock();
      }
    });

    this.add
      .image(0, 0, "controlsBackground")
      .setOrigin(0, 0)
      .setDisplaySize(width, height);

    const text: GameObjects.Text = this.add
      .text(0, 0, controlsHint.text, controlsHint.style)
      .setWordWrapWidth(width - 80);

    const graphics: GameObjects.Graphics = this.add.graphics();
    graphics.fillStyle(backgroundColor, backgroundOpacity);
    graphics.fillRoundedRect(
      0,
      0,
      text.width + padding * 2,
      text.height + padding * 2,
      padding / 2
    );
    graphics.generateTexture(
      textureName,
      text.width + padding * 2,
      text.height + padding * 2
    );
    graphics.destroy();

    const textBackground: GameObjects.Image = this.add
      .image(0, 0, textureName)
      .setOrigin(0, 0);
    text.setPosition(padding, padding);

    this.add.container(30 - padding / 2, 450, [textBackground, text]);

    const backToMenuButton: GameObjects.Image = this.add
      .image(width - 250, height - 50, "menuButton")
      .setInteractive({ cursor: "pointer" })
      .setOrigin(0.5)
      .setDisplaySize(100, 50)
      .on("pointerdown", () => {
        this.scene.start("MainMenu");
      })
      .on("pointerover", () => {
        backToMenuButton.setDisplaySize(110, 55);
        sfxHover.play({volume: 0.5});
      })
      .on("pointerout", () => {
        backToMenuButton.setDisplaySize(100, 50);
      });

    const nextToMenuButton: GameObjects.Image = this.add
      .image(width - 100, height - 50, "nextButton")
      .setInteractive({ cursor: "pointer" })
      .setOrigin(0.5)
      .setDisplaySize(100, 50)
      .on("pointerdown", () => {
        this.scene.start("Game");
      })
      .on("pointerover", () => {
        nextToMenuButton.setDisplaySize(110, 55);
        sfxHover.play({volume: 0.5});
      })
      .on("pointerout", () => {
        nextToMenuButton.setDisplaySize(100, 50);
      });
  }
}
