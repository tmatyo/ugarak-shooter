import { Scene, GameObjects, Cameras, Input } from "phaser";
import { crosshairCursor } from "../gameData";
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
  private speed: number = 2;

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

  private calculateSceneDuration(): number {
    const distance = this.worldWidth - this.scale.width;
    const frames = distance / this.speed;
    const fps = this.game.loop.actualFps || 60;
    return frames / fps;
  }

  update(time: number, delta: number) {
    this.fps.updateFps(this.game.loop.actualFps, 1000 / delta);
    if (this.camera.scrollX < this.worldWidth - this.scale.width) {
      this.camera.scrollX += this.speed;
    } else {
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
