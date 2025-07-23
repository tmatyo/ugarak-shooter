import { Scene, GameObjects, Sound } from "phaser";
import { Hud } from "./Hud";
import { gunSounds } from "../gameData";

export class Gun extends GameObjects.Container {
  private hud: Hud;
  private magazineSize: number = 15;
  private numberOfBullets: number = this.magazineSize;
  private shotsFired: number = 0;
  private sounds: Record<string, Sound.BaseSound> = {};

  constructor(scene: Scene, hud: Hud) {
    super(scene, 0, 0);
    this.scene.add.existing(this);
    this.hud = hud;
    this.hud.renderBullets(this.magazineSize);
    this.createSounds(scene);
  }

  private createSounds(scene: Scene) {
    gunSounds.forEach((sound) => {
      this.sounds[sound] = scene.sound.add(sound);
    });
  }

  public reload() {
    this.sounds.reload.play();
    this.numberOfBullets = this.magazineSize;
    this.hud.reloadBullets();
  }

  public shoot() {
    if (this.numberOfBullets > 0) {
      this.sounds.shot.play();
      this.numberOfBullets--;
      this.shotsFired++;
      this.hud.decrementBullets(this.numberOfBullets);
    } else {
      this.sounds.emptygun.play();
      console.warn("CLICK!", "No bullets left to shoot!");
    }
  }

  public getNumberOfBullets(): number {
    return this.numberOfBullets;
  }

  public getShotsFired(): number {
    return this.shotsFired;
  }

  public isMagazineEmpty(): boolean {
    return this.numberOfBullets <= 0;
  }
}
