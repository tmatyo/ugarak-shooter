import { Scene, GameObjects } from "phaser";
import { copyrightTextStyle, copyrightText } from "../gameData";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    const { width, height } = this.scale;
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

    const playButton: GameObjects.Image = this.add
      .image(-30, height / 2 - 75, "playButton")
      .setInteractive({ cursor: "pointer" })
      .setOrigin(0, 0)
      .on("pointerdown", () => {
        this.scene.stop("MainMenu");
        this.scene.start("Controls");
      })
      .on("pointerover", () => {
        playButton.setPosition(-15, height / 2 - 75);
        sfxHover.play({volume: 0.5});
      })
      .on("pointerout", () => {
        playButton.setPosition(-30, height / 2 - 75);
      });

    const aboutButton: GameObjects.Image = this.add
      .image(-50, height / 2 + 75, "aboutButton")
      .setInteractive({ cursor: "pointer" })
      .setOrigin(0, 0)
      .on("pointerdown", () => {
        this.scene.start("About");
      })
      .on("pointerover", () => {
        aboutButton.setPosition(-35, height / 2 + 75);
        sfxHover.play({volume: 0.5});
      })
      .on("pointerout", () => {
        aboutButton.setPosition(-50, height / 2 + 75);
      });

    const copyright: GameObjects.Text = this.add.text(
      0,
      0,
      copyrightText,
      copyrightTextStyle
    );
    copyright.setPosition(
      width - copyright.width - 20,
      height - copyright.height - 20
    );
  }
}
