import Field from "./Field";
import Mino from "./Mino";

type GameOption = {
  controlOption: {
    upKey: string;
    downKey: string;
    leftKey: string;
    rightKey: string;
    rotateKey: string;
  };
  divisionSize: {
    width: number;
    height: number;
  };
};

class Tetris {
  field: Field;
  currentMino: Mino;
  isStarted: Boolean;
  isPaused: Boolean;
  controlOption: {
    upKey: string;
    downKey: string;
    leftKey: string;
    rightKey: string;
    rotateKey: string;
  };
  divisionSize: {
    width: number;
    height: number;
  };

  constructor(opts: GameOption) {
    this.controlOption = opts.controlOption;
    this.divisionSize = opts.divisionSize;
    this.field = new Field(this.controlOption, this.divisionSize);
    this.currentMino = new Mino();
    this.isStarted = true;
    this.isPaused = false;
  }

  start() {}

  pause() {}

  draw() {
    return this.field.draw(this.currentMino);
  }

  moveMino(keyCode: string) {
    if (this.field.isMovable(keyCode, this.currentMino)) {
      if (keyCode == this.controlOption.downKey) {
        this.currentMino.move("DOWN");
      } else if (keyCode == this.controlOption.leftKey) {
        this.currentMino.move("LEFT");
      } else if (keyCode == this.controlOption.rightKey) {
        this.currentMino.move("RIGHT");
      }

      return true;
    }
    return false;
  }

  fallMino() {
    if (this.field.isMovable(this.controlOption.downKey, this.currentMino)) {
      this.currentMino.fall();
      return true;
    }
    return false;
  }

  rotateMino() {
    if (this.field.isMovable(this.controlOption.rotateKey, this.currentMino)) {
      this.currentMino.rotate();
      return true;
    }
    return false;
  }

  fixMino() {
    this.currentMino.fix();
  }

  createMino() {
    this.currentMino = new Mino();
  }

  evalLines() {
    this.field.evalLines();
  }

  isGameOver() {
    return this.field.isGameOver();
  }
}

export default Tetris;
