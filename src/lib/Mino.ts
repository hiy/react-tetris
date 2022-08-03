const MinoShapes = [
  [
    [0, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, -1],
  ],
  [
    [-1, 0],
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
];

class Mino {
  rot: number;
  shape: number[][];
  pos: number[][];
  prevPos: number[][];
  status: number; // 2: move 3: fix

  constructor() {
    this.rot = 0;
    this.shape = MinoShapes[Math.floor(Math.random() * MinoShapes.length)];
    this.pos = [];
    this.prevPos = [];
    const initialPos = [0, 5];
    for (const hw of this.shape) {
      this.pos.push([initialPos[0] + hw[0], initialPos[1] + hw[1]]);
    }
    this.status = 2;
  }

  move(direction: string) {
    this.prevPos = this.pos;
    this.pos = this.pos.map((hw) => {
      const h = hw[0];
      const w = hw[1];

      if (direction == "DOWN") {
        return [h + 1, w];
      } else if (direction == "RIGHT") {
        return [h, w + 1];
      } else if (direction == "LEFT") {
        return [h, w - 1];
      }
      return [0, 0];
    });
  }

  fall() {
    this.prevPos = this.pos;
    this.pos = this.pos.map((hw) => {
      const h = hw[0];
      const w = hw[1];

      return [h + 1, w];
    });
  }

  rotate() {
    this.prevPos = this.pos;
    this.shape = this.shape.map((hw) => {
      const y = hw[0];
      const x = hw[1];
      return [x, -y];
    });

    const initialPos = this.pos[0];
    this.pos = [];
    for (const hw of this.shape) {
      this.pos.push([initialPos[0] + hw[0], initialPos[1] + hw[1]]);
    }

    this.rot = (this.rot + 1) % 4;
  }

  calcNextRotatePos() {
    const nextShape = this.shape.map((hw) => {
      const y = hw[0];
      const x = hw[1];
      return [x, -y];
    });

    const initialPos = this.pos[0];
    const nextRotatePos = [];
    for (const hw of nextShape) {
      nextRotatePos.push([initialPos[0] + hw[0], initialPos[1] + hw[1]]);
    }

    return nextRotatePos;
  }

  fix() {
    this.prevPos = this.pos;
    this.status = 3;
  }
}

export default Mino;
