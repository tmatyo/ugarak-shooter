import { Scene, GameObjects } from "phaser";
import { buttonTextStyle, controlsHint, titleTextStyle } from "../gameData";

export class Controls extends Scene {
  constructor() {
    super("Controls");
  }

  create() {
    const { width, height } = this.scale;
    const { padding, textureName, backgroundColor, backgroundOpacity } =
      controlsHint;

    const sfxHover = this.sound.add("hover");
    this.input.once("pointerdown", () => {
      if (this.sound.locked) {
        this.sound.unlock();
      }
    });

    this.add
      .image(0, 0, "menuBackground")
      .setOrigin(0, 0)
      .setDisplaySize(width, height);

    this.add
      .text(width - 30, 30, "Ako na to?", titleTextStyle)
      .setOrigin(1, 0);
      
    const nextToMenuButton: GameObjects.Text = this.add
      .text(width - 30, height - 30, "Next", buttonTextStyle)
      .setOrigin(1, 1)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.scene.start("Game");
      })
      .on("pointerover", () => {
        nextToMenuButton.setFontSize("40px");
        sfxHover.play({ volume: 0.5 });
      })
      .on("pointerout", () => {
        nextToMenuButton.setFontSize("35px");
      });

    const backToMenuButton: GameObjects.Text = this.add
      .text(width - 230, height - 30, "Back", buttonTextStyle)
      .setOrigin(1, 1)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.scene.start("About");
      })
      .on("pointerover", () => {
        backToMenuButton.setFontSize("40px");
        sfxHover.play({ volume: 0.5 });
      })
      .on("pointerout", () => {
        backToMenuButton.setFontSize("35px");
      });

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
  }
}
