import { Scene } from "phaser";
import superPeanutFont from "../../assets/fonts/SuperPeanut.ttf";
import superBrigadeFont from "../../assets/fonts/SuperBrigadeCondensed.otf";

export class Preloader extends Scene {
	constructor() {
		super("Preloader");
	}

	init() {
		const { width, height } = this.scale;
		this.add.image(0, 0, "menuBackground").setOrigin(0, 0).setDisplaySize(width, height);
		this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffff00);
		const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffff00);
		this.load.on("progress", (progress: number) => {
			bar.width = 4 + 460 * progress;
		});
	}

	preload() {
		this.load.font("super-peanut", superPeanutFont);
		this.load.font("super-brigade", superBrigadeFont);

		this.load.image("demon1", "assets/images/heads/dagi1.png");
		this.load.image("demon2", "assets/images/heads/dagi2.png");
		this.load.image("demon3", "assets/images/heads/en1.png");
		this.load.image("demon4", "assets/images/heads/en2.png");
		this.load.image("demon5", "assets/images/heads/szpeti1.png");
		this.load.image("demon6", "assets/images/heads/szpeti2.png");
		this.load.image("demon7", "assets/images/heads/yoko1.png");
		this.load.image("demon8", "assets/images/heads/yoko2.png");
		this.load.image("bullet", "assets/images/bullet1.png");
		this.load.image("cursor", "assets/images/cursor2v2.png");

		this.load.image("gameBackground", "assets/images/hatter_remaster.jpg");
		this.load.image("hudBackground", "assets/images/panel_jo.jpg");

		this.load.audio("bumm", "assets/sound/bumm1.wav");
		this.load.audio("emptygun", "assets/sound/emptygun1.wav");
		this.load.audio("shot", "assets/sound/gun_shot.wav");
		this.load.audio("headshot1", "assets/sound/headshot1.wav");
		this.load.audio("headshot2", "assets/sound/headshot2.wav");
		this.load.audio("headshot3", "assets/sound/headshot3.wav");
		this.load.audio("headshot4", "assets/sound/headshot4.wav");
		this.load.audio("headshot5", "assets/sound/headshot5.wav");
		this.load.audio("hover", "assets/sound/klop1.wav");
		this.load.audio("reload", "assets/sound/reload.wav");

		this.load.audio("evil_start", "assets/sound/ev_la.mp3");
		this.load.audio("evil1", "assets/sound/evil1.wav");
		this.load.audio("evil2", "assets/sound/evil2.wav");
		this.load.audio("killing_streak", "assets/sound/killing_streak.wav");
		this.load.audio("samantas_laugh", "assets/sound/samantas_laugh.wav");
		this.load.audio("unstoppable", "assets/sound/unstoppable.wav");

		this.load.audio("barking1", "assets/sound/barking1.wav");
		this.load.audio("barking2", "assets/sound/barking2.wav");
		this.load.audio("barking3", "assets/sound/barking3.wav");
		this.load.audio("barking4", "assets/sound/barking4.wav");
		this.load.audio("barking5", "assets/sound/barking5.wav");
		this.load.audio("barking6", "assets/sound/barking6.wav");
		this.load.audio("barking7", "assets/sound/barking7.wav");
		this.load.audio("barking8", "assets/sound/barking8.wav");
		this.load.audio("barking9", "assets/sound/barking9.wav");
		this.load.audio("barking11", "assets/sound/barking11.wav");
		this.load.audio("barking12", "assets/sound/barking12.wav");
		this.load.audio("barking13", "assets/sound/barking13.wav");
		this.load.audio("barking14", "assets/sound/barking14.wav");

		this.load.audio("thunder", "assets/sound/rain-and-thunder-sfx-12820.mp3");
        
		this.load.atlas("heads", "assets/atlas/ugarak_heads_atlas.png", "assets/atlas/ugarak_heads_atlas.json");
		this.load.atlas("flares", "assets/atlas/flares.png", "assets/atlas/flares.json");
	}

	create() {
		//  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
		//  For example, you can define global animations here, so we can use them in other scenes.

		//  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
		this.scene.start("MainMenu");
	}
}
