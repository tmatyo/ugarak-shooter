import { Scene, GameObjects, Cameras } from "phaser";
import { demonImages, crosshairCursor } from "../gameData";
import { Hud } from "../gameObjects/Hud";
import { Fps } from "../gameObjects/Fps";

const TWEENEASES = [
  "Linear",
  "Sine",
  "Quad",
  "Cubic",
  "Quart",
  "Quint",
  "Expo",
  "Circ",
  "Back",
  "Elastic",
  "Bounce",
];

export class Game extends Scene {
  camera: Cameras.Scene2D.Camera;
  demons: GameObjects.Sprite[] = [];
  bg: GameObjects.Image;
  worldWidth: number;
  hud: Hud;
  hudHeight: number;
  fps: Fps;

  constructor() {
    super("Game");
  }

  newCoordinatesInsideCamera(scene: Scene) {
    const cam = scene.cameras.main;
    const camMinX = cam.scrollX + 50;
    const camMaxX = cam.scrollX + cam.width - 100;
    const camMinY = cam.scrollY + 50;
    const camMaxY = cam.scrollY + cam.height - 100 - this.hudHeight;

    return {
      x: Phaser.Math.Between(camMinX, camMaxX),
      y: Phaser.Math.Between(camMinY, camMaxY),
    };
  }

  spawnDemon(scene: Scene) {
    const startPoint = this.newCoordinatesInsideCamera(this);
    const endPoint = this.newCoordinatesInsideCamera(this);

    const demon = scene.add
      .sprite(
        startPoint.x,
        startPoint.y,
        demonImages[Phaser.Math.Between(0, demonImages.length - 1)]
      )
      .setOrigin(0.5)
      .setScale(Phaser.Math.Between(0.5, 1.5))
      .setInteractive()
      .on("pointerdown", () => this.onShot(demon))
      .on("tap", () => this.onShot(demon));

    scene.physics.add.existing(demon);

    this.tweens.add({
      targets: demon,
      x: endPoint.x,
      y: endPoint.y,
      duration: Phaser.Math.Between(1000, 5000),
      ease: TWEENEASES[Phaser.Math.Between(0, TWEENEASES.length - 1)],
      repeat: -1,
      yoyo: false,
    });

    this.demons.push(demon);
  }

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

  onShot(demon: GameObjects.Sprite) {
    demon.setTint(0xff0000);
    this.time.delayedCall(300, () => {
      demon.clearTint();
      demon.destroy();
      this.hud.incrementScore();
      this.demons = this.demons.filter((d) => d !== demon);
      console.log("Demon destroyed, remaining:", this.demons.length);
      //this.spawnDemon(this);
    });
  }

  addMovement(demon: GameObjects.Sprite) {
    const veloX = Phaser.Math.Between(-500, 500);
    const veloY = Phaser.Math.Between(-500, 500);
    console.log(`Demon velocity: ${veloX}, ${veloY}`);
    const vector = this.physics.velocityFromAngle(veloX, veloY);
    (demon.body as Phaser.Physics.Arcade.Body).setVelocity(vector.x, vector.y);
  }

  create() {
    this.bg = this.add.image(0, 0, "gameBackground").setOrigin(0, 0);
    this.worldWidth = (this.bg.width / this.bg.height) * this.scale.height;
    this.bg.setDisplaySize(this.worldWidth, this.scale.height);

    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, this.worldWidth, this.bg.height);

    this.fps = new Fps(this);

    this.hud = new Hud(this, 0, this.scale.height - 90);
    this.hud.render();
    this.hudHeight = this.hud.getHudHeight();

    this.input.setDefaultCursor(crosshairCursor);

    this.spawnDemon(this);

    this.time.addEvent({
      delay: Phaser.Math.Between(2000, 5000),
      callback: () => this.spawnDemon(this),
      loop: true,
    });
  }

  update(delta: number) {
    this.fps.updateFps(this.game.loop.actualFps, 1000 / delta);
    if (this.camera.scrollX < this.worldWidth - this.scale.width) {
      this.camera.scrollX += 2;
    } else {
      console.log("Demon list", this.demons);
      this.scene.stop("Game");
      this.scene.start("ScoreBoard");
      return;
    }
    if (Phaser.Math.Between(0, 100) < 5) {
      this.spawnDemon(this);
    }
  }
}
