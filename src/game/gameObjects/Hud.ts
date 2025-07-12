import { Scene, GameObjects } from "phaser";

export class Hud extends GameObjects.Container {
  constructor(scene: Scene, x: number = 0, y: number = 0) {
    super(scene, x, y);
    this.scene.add.existing(this);
  }

  private score: number = 0;
  private scoreText: GameObjects.Text;
  private background: GameObjects.Image;
  private hudHeight: number = 90;
  private scoreTextSize: number = 50;

  private parseScoreText = () => `Score: ${this.score}`;

  private createBackground() {
    this.background = this.scene.add
      .image(0, 0, "hudBackground")
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDisplaySize(this.scene.cameras.main.width, this.hudHeight);
    this.add(this.background);
    this.background.removeFromDisplayList(); 
  }

  private createScoreText() {
    this.scoreText = this.scene.add
      .text(30, (this.hudHeight - this.scoreTextSize) / 2, this.parseScoreText(), {
        fontSize: `${this.scoreTextSize}px`,
        color: "#ffffff",
        fontFamily: "super-peanut",
        stroke: "#000000",
        strokeThickness: 10,
      })
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.add(this.scoreText);
    this.scoreText.removeFromDisplayList(); 
  }

  public render() {
    this.createBackground();
    this.createScoreText();
  }

  public getHudHeight(): number {
    return this.hudHeight;
  }

  public getScore(): number {
    return this.score;
  }

  public incrementScore() {
    this.score++;
    this.scoreText.setText(this.parseScoreText());
  }

  public resetScore() {
    this.score = 0;
    this.scoreText.setText(this.parseScoreText());
  }
}
