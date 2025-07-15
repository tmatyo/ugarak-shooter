import { Scene, GameObjects, Cameras, Input } from "phaser";
import { crosshairCursor } from "../gameData";
import { Hud, Fps, Gun, Demon } from "../gameObjects";

export class Game extends Scene {
  camera: Cameras.Scene2D.Camera;
  demons: GameObjects.Sprite[] = [];
  bg: GameObjects.Image;
  worldWidth: number;
  hud: Hud;
  hudHeight: number = 0;
  fps: Fps;
  gun: Gun;
  demon: Demon;

  constructor() {
    super("Game");
  }

  create() {
    // world and bg
    this.bg = this.add.image(0, 0, "gameBackground").setOrigin(0, 0);
    this.worldWidth = (this.bg.width / this.bg.height) * this.scale.height;
    this.bg.setDisplaySize(this.worldWidth, this.scale.height);

    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, this.worldWidth, this.bg.height);

    // mini hud with FPS
    this.fps = new Fps(this);

    // hud with game data
    this.hud = new Hud(this, 0, this.scale.height - 90);
    this.hud.render();
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
    this.input.keyboard
      ?.addKey(Input.Keyboard.KeyCodes.SPACE)
      .on("down", () => this.gun.reload());
  }

  update(time: number, delta: number) {
    this.fps.updateFps(this.game.loop.actualFps, 1000 / delta);
    if (this.camera.scrollX < this.worldWidth - this.scale.width) {
      this.camera.scrollX += 2;
    } else {
      this.scene.stop("Game");
      this.scene.start("ScoreBoard");
      return;
    }
    if (Phaser.Math.Between(0, 100) < 5) {
      this.demon.spawn(this);
    }
  }
}
