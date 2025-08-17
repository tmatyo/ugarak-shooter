import { Scene, GameObjects, Cameras, Input, Sound } from "phaser";
import { crosshairCursor, evilLaughSounds } from "../gameData";
import { Hud, Fps, Gun, Demon } from "../gameObjects";

export class Game extends Scene {
	private camera: Cameras.Scene2D.Camera;
	private bg: GameObjects.Image;
	private worldWidth: number;
	private hud: Hud;
	private hudHeight: number = 0;
	private fps: Fps;
	private gun: Gun;
	private demon: Demon;
	private speed: number = 120;
	private evilSounds: Record<string, Sound.BaseSound> = {};
	private evilSoundsIteration: number = 0;

	constructor() {
		super("Game");
	}

	setupSoundFx() {
		this.sound.add("evil_start").play({ volume: 0.5 });
		evilLaughSounds.forEach((sfx) => {
			this.evilSounds[sfx] = this.sound.add(sfx);
		});
	}

	create() {
		// world and bg
		this.bg = this.add.image(0, 0, "gameBackground").setOrigin(0, 0);
		this.worldWidth = (this.bg.width / this.bg.height) * this.scale.height;
		this.bg.setDisplaySize(this.worldWidth, this.scale.height);

		this.camera = this.cameras.main;
		this.camera.setBounds(0, 0, this.worldWidth, this.bg.height);

		// setup sfx and play initial sound
		this.setupSoundFx();

		// mini hud with FPS
		this.fps = new Fps(this);

		// hud with game data
		this.hud = new Hud(this, 0, this.scale.height - 90);
		this.hudHeight = this.hud.getHudHeight();

		// setup gun
		this.gun = new Gun(this, this.hud);

		// setup demons
		this.demon = new Demon({
			scene: this,
			hudHeight: this.hudHeight,
			hud: this.hud,
			gun: this.gun,
		});

		// spawn demons
		this.time.addEvent({
			delay: Phaser.Math.Between(2000, 5000),
			callback: () => this.demon.spawn(this),
			loop: true,
		});

		// setup evil sounds
		const duration = this.calculateSceneDuration();
		this.time.addEvent({
			delay: Math.floor(duration / evilLaughSounds.length) * 1000,
			callback: () => {
				if (this.evilSoundsIteration >= evilLaughSounds.length) {
					this.evilSoundsIteration = 0;
				}
				
				this.evilSounds[evilLaughSounds[this.evilSoundsIteration]].play({
					volume: 0.5,
				});
				this.evilSoundsIteration++;
			},
			loop: true,
		});

		// controls
		this.input.setDefaultCursor(crosshairCursor);
		this.input.mouse?.disableContextMenu();
		this.input.on("pointerdown", (pointer: Input.Pointer) => {
			if (pointer.leftButtonDown()) {
				this.gun.shoot();
			}

			if (pointer.rightButtonDown()) {
				this.gun.reload();
			}
		});
		this.input.keyboard?.addKey(Input.Keyboard.KeyCodes.SPACE).on("down", () => this.gun.reload());
	}

	private calculateSceneDuration(): number {
		const distance = this.worldWidth - this.scale.width;
		return distance / this.speed;
	}

	update(time: number, delta: number) {
		this.fps.updateFps(this.game.loop.actualFps, 1000 / delta);
		if (this.camera.scrollX < this.worldWidth - this.scale.width) {
			this.camera.scrollX += this.speed * (delta / 1000);
		} else {
			this.sound.stopAll();
			this.scene.stop("Game");
			this.scene.start("ScoreBoard", {
				score: this.hud.getScore(),
				shots: this.gun.getShotsFired(),
				duration: this.calculateSceneDuration(),
			});
			return;
		}
		if (Phaser.Math.Between(0, 100) < 5) {
			this.demon.spawn(this);
		}
	}
}
