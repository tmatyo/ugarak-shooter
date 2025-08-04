import { GameObjects, Scene } from "phaser";

export class Fps extends GameObjects.Container {
	private fpsText: GameObjects.Text;
	private fpsTextSize: number = 20;

	constructor(scene: Scene, x: number = 0, y: number = 0) {
		super(scene, x, y);
		this.scene.add.existing(this);
		this.createFpsText();
	}

	private createFpsText() {
		this.fpsText = this.scene.add
			.text(10, 10, "", {
				fontSize: `${this.fpsTextSize}px`,
				color: "#00ff00",
				stroke: "#000000",
				strokeThickness: 2,
				fontFamily: "super-brigade",
			})
			.setOrigin(0, 0)
			.setScrollFactor(0)
			.setDepth(1000);
		this.add(this.fpsText);
		this.fpsText.removeFromDisplayList();
	}

	public updateFps(fps1: number, fps2: number) {
		this.fpsText.setText(`Phaser FPS: ${fps1.toFixed(3)} Calculated FPS: ${fps2.toFixed(3)}`.toLowerCase());
	}
}
