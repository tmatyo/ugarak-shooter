import { Scene, GameObjects } from "phaser";
import { copyrightTextStyle, copyrightText, titleTextStyle, buttonTextStyle } from "../gameData";

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

		this.add.image(0, 0, "menuBackground").setOrigin(0, 0).setDisplaySize(width, height);

		this.add.text(width - 30, 30, "Ugarak Shooter 2", titleTextStyle).setOrigin(1, 0);

		const playButton: GameObjects.Text = this.add
			.text(100, height - 200, "Play", buttonTextStyle)
			.setInteractive({ cursor: "pointer" })
			.setOrigin(0, 0)
			.on("pointerdown", () => {
				this.scene.stop("MainMenu");
				this.scene.start("Controls");
			})
			.on("pointerover", () => {
				playButton.setFontSize("40px");
				sfxHover.play({ volume: 0.5 });
			})
			.on("pointerout", () => {
				playButton.setFontSize("35px");
			});

		const aboutButton: GameObjects.Text = this.add
			.text(100, height - 120, "O hre", buttonTextStyle)
			.setInteractive({ cursor: "pointer" })
			.setOrigin(0, 0)
			.on("pointerdown", () => {
				this.scene.start("About");
			})
			.on("pointerover", () => {
				aboutButton.setFontSize("40px");
				sfxHover.play({ volume: 0.5 });
			})
			.on("pointerout", () => {
				aboutButton.setFontSize("35px");
			});

		const copyright: GameObjects.Text = this.add.text(0, 0, copyrightText, copyrightTextStyle);
		copyright.setPosition(width - copyright.width - 20, height - copyright.height - 20);
	}
}
