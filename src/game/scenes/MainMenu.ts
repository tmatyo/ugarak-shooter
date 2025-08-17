import { Scene, GameObjects } from "phaser";
import { copyrightTextStyle, copyrightText, titleTextStyle, menuButtonTextStyle } from "../gameData";

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

		this.add.text(width - 30, 30, "Ugarak Shooter", titleTextStyle).setOrigin(1, 0);

		const { bStyle, bHoverSize, bNormalSize } = menuButtonTextStyle;

		const playButton: GameObjects.Text = this.add
			.text(100, height - 250, "Play", bStyle)
			.setInteractive({ cursor: "pointer" })
			.setOrigin(0, 0)
			.on("pointerdown", () => {
				this.scene.stop("MainMenu");
				this.scene.start("Controls");
			})
			.on("pointerover", () => {
				playButton.setFontSize(bHoverSize);
				sfxHover.play({ volume: 0.5 });
			})
			.on("pointerout", () => {
				playButton.setFontSize(bNormalSize);
			});

		const aboutButton: GameObjects.Text = this.add
			.text(100, height - 150, "O hre", bStyle)
			.setInteractive({ cursor: "pointer" })
			.setOrigin(0, 0)
			.on("pointerdown", () => {
				this.scene.start("About");
			})
			.on("pointerover", () => {
				aboutButton.setFontSize(bHoverSize);
				sfxHover.play({ volume: 0.5 });
			})
			.on("pointerout", () => {
				aboutButton.setFontSize(bNormalSize);
			});

		const copyright: GameObjects.Text = this.add.text(0, 0, copyrightText, copyrightTextStyle);
		copyright.setPosition(width - copyright.width - 20, height - copyright.height - 20);
	}
}
