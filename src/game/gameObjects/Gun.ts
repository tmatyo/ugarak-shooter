import { Scene, GameObjects, Sound } from "phaser";
import { Hud } from "./Hud";
import { gunSfx, demonScreams } from "../gameData";

export class Gun extends GameObjects.Container {
  private hud: Hud;
  private magazineSize: number = 15;
  private numberOfBullets: number = this.magazineSize;
  private shotsFired: number = 0;
  private gunSounds: Record<string, Sound.BaseSound> = {};
  private demonScreamSounds: Record<string, Sound.BaseSound> = {};

  constructor(scene: Scene, hud: Hud) {
    super(scene, 0, 0);
    this.scene.add.existing(this);
    this.hud = hud;
    this.hud.renderBullets(this.magazineSize);
    this.createSounds(scene);
  }

  private createSounds(scene: Scene) {
    gunSfx.forEach((sound) => {
      this.gunSounds[sound] = scene.sound.add(sound);
    });
    demonScreams.forEach((scream) => {
      this.demonScreamSounds[scream] = scene.sound.add(scream);
    });
  }

  public reload() {
    this.gunSounds.reload.play();
    this.numberOfBullets = this.magazineSize;
    this.hud.reloadBullets();
  }

  public shoot() {
    if (this.numberOfBullets > 0) {
      this.gunSounds.shot.play();
      this.numberOfBullets--;
      this.shotsFired++;
      this.hud.decrementBullets(this.numberOfBullets);
      this.scene.time.delayedCall(Phaser.Math.Between(700, 2000), () =>
        this.demonScreamSounds[
          demonScreams[Phaser.Math.Between(0, demonScreams.length - 1)]
        ].play({ volume: 0.7 })
      );
    } else {
      this.gunSounds.emptygun.play();
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
