import { Scene } from "phaser";

type ScoreBoardPropsType = {
  score: number;
  shots: number;
  duration: number;
};

export class ScoreBoard extends Scene {
  private score: ScoreBoardPropsType["score"];
  private shots: ScoreBoardPropsType["shots"];
  private duration: ScoreBoardPropsType["duration"];

  constructor() {
    super("ScoreBoard");
  }

  init(data: ScoreBoardPropsType) {
    this.score = data.score;
    this.shots = data.shots;
    this.duration = data.duration;
  }

  create() {
    const { width, height } = this.scale;

    this.input.setDefaultCursor("default");
    this.add
      .image(0, 0, "scoreBackground")
      .setOrigin(0, 0)
      .setDisplaySize(width, height);

    const backToMenuButton = this.add
      .image(width - 250, height - 50, "menuButton")
      .setInteractive({ cursor: "pointer" })
      .setOrigin(0.5)
      .setDisplaySize(100, 50)
      .on("pointerdown", () => {
        this.scene.start("MainMenu");
      })
      .on("pointerover", () => {
        backToMenuButton.setDisplaySize(110, 55);
      })
      .on("pointerout", () => {
        backToMenuButton.setDisplaySize(100, 50);
      });

    const renderResults = (x: number, y: number, text: string) => {
      this.add
        .text(x, y, text, {
          fontSize: "55px",
          color: "#ff0",
          fontFamily: "super-peanut",
          stroke: "#000000",
          strokeThickness: 10,
          align: "center",
        })
        .setOrigin(0.5);
    };

    this.time.addEvent({
      delay: 2000,
      callback: () => renderResults(270, 300, this.shots.toString()),
    });

    this.time.addEvent({
      delay: 3000,
      callback: () => renderResults(380, 420, this.score.toString()),
    });

    this.time.addEvent({
      delay: 4000,
      callback: () =>
        renderResults(520, 540, ((this.score * 100) / this.shots).toFixed(2)),
    });

    this.time.addEvent({
      delay: 5000,
      callback: () =>
        renderResults(520, 660, (this.shots / this.duration).toFixed(2)),
    });
  }
}
