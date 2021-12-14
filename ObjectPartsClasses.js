import { checkIncludes } from "./functions.js";
import { BOARD_SIZE, SQR_SIZE } from "./constants.js";

const partImage = new Image();
partImage.src = "images/part.jpg";
const headImage = new Image();
headImage.src = "images/head.jpg";
const targetImage = new Image();
targetImage.src = "images/target.jpg";
const boardImage = new Image();
boardImage.src = "images/board.png";

class Part {
  _image = partImage;
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  show(ctx) {
    ctx.drawImage(this._image, this._x * SQR_SIZE + 12, this._y * SQR_SIZE + 7);
  }

  getX() {
    return this._x;
  }

  getY() {
    return this._y;
  }
}

class Board extends Part {
  _image = boardImage;
  static boardInstance;

  static getInstance() {
    if (!this.boardInstance) {
      this.boardInstance = new Board();
    }

    return this.boardInstance;
  }

  show(ctx) {
    ctx.drawImage(this._image, this._x * SQR_SIZE, this._y * SQR_SIZE);
  }
}

class Head extends Part {
  _image = headImage;

  setX(x) {
    this._x = x;
  }

  setY(y) {
    this._y = y;
  }
}

class Target extends Part {
  _image = targetImage;
  static targetInstance;

  static getInstance() {
    if (!this.targetInstance) {
      this.targetInstance = new Target();
    }

    return this.targetInstance;
  }

  newTarget(snake) {
    do {
      this._x = Math.floor(Math.random() * BOARD_SIZE);
      this._y = Math.floor(Math.random() * BOARD_SIZE);
    } while (checkIncludes(this, snake.getPartsCoordinates()));
  }
}

export { Part, Board, Head, Target };
