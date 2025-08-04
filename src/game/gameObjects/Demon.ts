import { GameObjects, Scene, Sound } from "phaser";
import { demonImages, tweenEases, demonSounds } from "../gameData";
import { Hud, Gun } from "../gameObjects";

type DemonPropsType = {
	scene: Scene;
	hudHeight?: number;
	x?: number;
	y?: number;
	hud: Hud;
	gun: Gun;
};

export class Demon extends GameObjects.Container {
	private hudHeight: number;
	private demons: GameObjects.Sprite[] = [];
	private hud: Hud;
	private gun: Gun;
	private headShotSounds: Record<string, Sound.BaseSound> = {};

	constructor({ scene, hudHeight = 100, x = 0, y = 0, hud, gun }: DemonPropsType) {
		super(scene, x, y);
		this.hudHeight = hudHeight;
		this.hud = hud;
		this.gun = gun;
		this.createSounds(scene);
	}

	private createSounds(scene: Scene) {
		demonSounds.forEach((sfx) => {
			this.headShotSounds[sfx] = scene.sound.add(sfx);
		});
	}

	private newCoordinatesInsideCamera(scene: Scene) {
		const cam = scene.cameras.main;
		const camMinX = cam.scrollX + cam.width;
		const camMaxX = cam.scrollX + cam.width * 1.5;
		const camMinY = cam.scrollY + 50;
		const camMaxY = cam.scrollY + cam.height - 100 - this.hudHeight;

		return {
			x: Phaser.Math.Between(camMinX, camMaxX),
			y: Phaser.Math.Between(camMinY, camMaxY),
		};
	}

	private onHit(demon: GameObjects.Sprite) {
		const magazineIsEmpty = this.gun.isMagazineEmpty();
		if (magazineIsEmpty) {
			return;
		}
		demon.setTint(0xff0000);
		this.scene.time.delayedCall(300, () => {
			this.headShotSounds[demonSounds[Phaser.Math.Between(0, demonSounds.length - 1)]].play({
				volume: demon.scale * 0.5,
			});
			demon.clearTint();
			demon.destroy();
			this.hud.incrementScore();
			this.demons = this.demons.filter((d) => d !== demon);
			console.log("Demon destroyed, remaining:", this.demons.length);
		});
	}

	public spawn(scene: Scene) {
		const startPoint = this.newCoordinatesInsideCamera(scene);
		const endPoint = this.newCoordinatesInsideCamera(scene);

		const demon = scene.add
			.sprite(startPoint.x, startPoint.y, demonImages[Phaser.Math.Between(0, demonImages.length - 1)])
			.setOrigin(0.5)
			.setScale(Phaser.Math.Between(0.5, 1.5))
			.setInteractive()
			.on("pointerdown", () => this.onHit(demon))
			.on("tap", () => this.onHit(demon));

		scene.physics.add.existing(demon);
		scene.tweens.add({
			targets: demon,
			x: endPoint.x,
			y: endPoint.y,
			duration: Phaser.Math.Between(1000, 5000),
			ease: tweenEases[Phaser.Math.Between(0, tweenEases.length - 1)],
			repeat: -1,
			yoyo: false,
		});

		this.demons.push(demon);
		//demon.removeFromDisplayList();
	}

	public getDemons(): GameObjects.Sprite[] {
		return this.demons;
	}

	//   private addMovement(demon: GameObjects.Sprite) {
	//     const veloX = Phaser.Math.Between(-500, 500);
	//     const veloY = Phaser.Math.Between(-500, 500);
	//     console.log(`Demon velocity: ${veloX}, ${veloY}`);
	//     const vector = this.scene.physics.velocityFromAngle(veloX, veloY);
	//     (demon.body as Phaser.Physics.Arcade.Body).setVelocity(vector.x, vector.y);
	//   }

	//   respawnDemons(scene: Scene, demon: GameObjects.Sprite) {
	//     if (
	//       demon.x < 0 ||
	//       demon.x > scene.cameras.main.width ||
	//       demon.y < 0 ||
	//       demon.y > scene.cameras.main.height
	//     ) {
	//       const { x, y } = this.newCoordinatesInsideCamera(this);
	//       demon.setPosition(x, y);
	//     }
	//   }
}
