import { Scene, GameObjects } from "phaser";
import { buttonTextStyle, resultsTextStyle, titleTextStyle } from "../gameData";

type ScoreBoardPropsType = {
	score: number;
	shots: number;
	duration: number;
};

export class ScoreBoard extends Scene {
	private score: ScoreBoardPropsType["score"];
	private shots: ScoreBoardPropsType["shots"];
	private duration: ScoreBoardPropsType["duration"];

	constructor() {
		super("ScoreBoard");
	}

	init(data: ScoreBoardPropsType) {
		this.score = data.score;
		this.shots = data.shots;
		this.duration = data.duration;
	}

	create() {
		const { width, height } = this.scale;
		const sfxBumm = this.sound.add("bumm");
		const sfxHover = this.sound.add("hover");

		this.input.setDefaultCursor("default");
		this.add.image(0, 0, "menuBackground").setOrigin(0, 0).setDisplaySize(width, height);

		this.add.text(width - 30, 30, "Výsledky", titleTextStyle).setOrigin(1, 0);

		const nextToMenuButton: GameObjects.Text = this.add
			.text(width - 30, height - 30, "Restart", buttonTextStyle)
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
			.text(width - 230, height - 30, "Main Menu", buttonTextStyle)
			.setOrigin(1, 1)
			.setInteractive({ cursor: "pointer" })
			.on("pointerdown", () => {
				this.scene.start("MainMenu");
			})
			.on("pointerover", () => {
				backToMenuButton.setFontSize("40px");
				sfxHover.play({ volume: 0.5 });
			})
			.on("pointerout", () => {
				backToMenuButton.setFontSize("35px");
			});

		const bulletsShot: GameObjects.Text = this.add
			.text(50, 250, "Bullets shot:", resultsTextStyle)
			.setColor("#fff")
			.setOrigin(0, 0.5);
		const pointsEarned: GameObjects.Text = this.add
			.text(50, 350, "Points earned:", resultsTextStyle)
			.setColor("#fff")
			.setOrigin(0, 0.5);
		const successRate: GameObjects.Text = this.add
			.text(50, 450, "Success rate:", resultsTextStyle)
			.setColor("#fff")
			.setOrigin(0, 0.5);
		const shootingSpeed: GameObjects.Text = this.add
			.text(50, 550, "Shooting speed:", resultsTextStyle)
			.setColor("#fff")
			.setOrigin(0, 0.5);

		const renderResults = (x: number, y: number, text: string) => {
			this.add.text(x, y, text, resultsTextStyle).setColor("#ff0").setOrigin(0, 0.5);
			sfxBumm.play();
		};

		this.time.addEvent({
			delay: 2000,
			callback: () => renderResults(20 + bulletsShot.x + bulletsShot.width, bulletsShot.y, this.shots.toString()),
		});

		this.time.addEvent({
			delay: 3000,
			callback: () =>
				renderResults(20 + pointsEarned.x + pointsEarned.width, pointsEarned.y, this.score.toString()),
		});

		this.time.addEvent({
			delay: 4000,
			callback: () =>
				renderResults(
					20 + successRate.x + successRate.width,
					successRate.y,
					((this.score * 100) / this.shots).toFixed(2) + " %",
				),
		});

		this.time.addEvent({
			delay: 5000,
			callback: () =>
				renderResults(
					20 + shootingSpeed.x + shootingSpeed.width,
					shootingSpeed.y,
					(this.shots / this.duration).toFixed(2) + " shot/sec",
				),
		});
	}
}
