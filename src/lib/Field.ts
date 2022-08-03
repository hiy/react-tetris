import Mino from "./Mino";

class Field {
  data: number[][];
  controlOption: {
    upKey: string;
    downKey: string;
    leftKey: string;
    rightKey: string;
    rotateKey: string;
  };

  constructor(controlOption: {
    upKey: string;
    downKey: string;
    leftKey: string;
    rightKey: string;
    rotateKey: string;
  }) {
    this.controlOption = controlOption;
    this.data = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  draw(mino: Mino) {
    const prevData = this.data;

    try {
      for (const hw of mino.prevPos) {
        this.data[hw[0]][hw[1]] = 0;
      }

      for (const hw of mino.pos) {
        this.data[hw[0]][hw[1]] = mino.status;
      }
    } catch {
      return prevData;
    }

    return this.data;
  }

  isMovable(keyCode: string, mino: Mino) {
    let nextPos: number[][] = [];
    if (keyCode == this.controlOption.rotateKey) {
      nextPos = mino.calcNextRotatePos();
    } else {
      nextPos = mino.pos.map((hw) => {
        const h = hw[0];
        const w = hw[1];
        if (keyCode == this.controlOption.downKey) {
          return [h + 1, w];
        } else if (keyCode == this.controlOption.leftKey) {
          return [h, w - 1];
        } else if (keyCode == this.controlOption.rightKey) {
          return [h, w + 1];
        } else {
          return [0, 0];
        }
      });
    }

    for (const hw of nextPos) {
      const h = hw[0];
      const w = hw[1];
      if ([0, 2].includes(this.data[h][w])) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  }

  isGameOver() {
    for (let i = 1; i < this.data[0].length - 1; i++) {
      if (![0, 2].includes(this.data[0][i])) {
        return true;
      }
    }

    return false;
  }

  evalLines() {
    const eraseLines = [];
    for (let i = 0; i < this.data.length - 1; i++) {
      const row = this.data[i];
      let isErase = true;
      for (let j = 0; j < row.length; j++) {
        const block = row[j];
        if ([0, 2].includes(block)) {
          isErase = false;
          break;
        }
      }
      if (isErase) eraseLines.push(i);
    }

    for (let i = 0; i < eraseLines.length; i++) {
      const index = eraseLines[i];
      this.data.splice(index, 1);
      this.data.unshift([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    }
  }
}

export default Field;
