import { Scene, GameObjects } from "phaser";
import { Hud } from "./Hud";

export class Gun extends GameObjects.Container {
  private hud: Hud;
  private magazineSize: number = 15;
  private numberOfBullets: number = this.magazineSize;

  constructor(scene: Scene, hud: Hud) {
    super(scene, 0, 0);
    this.scene.add.existing(this);
    this.hud = hud;
    this.hud.renderBullets(this.magazineSize);
  }

  public reload() {
    this.numberOfBullets = this.magazineSize;
    this.hud.reloadBullets();
  }

  public shoot() {
    if (this.numberOfBullets > 0) {
      this.numberOfBullets--;
      this.hud.decrementBullets(this.numberOfBullets);
    } else {
      console.warn("CLICK!", "No bullets left to shoot!");
    }
  }

  public getNumberOfBullets(): number {
    return this.numberOfBullets;
  }

  public isMagazineEmpty(): boolean {
    return this.numberOfBullets <= 0;
  }
}
