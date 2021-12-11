import { checkIncludes } from "./functions.js";
import { boardsize, sqrsize } from "./constants.js";

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
    ctx.drawImage(this._image, this._x * sqrsize + 12, this._y * sqrsize + 7);
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
    ctx.drawImage(this._image, this._x * sqrsize, this._y * sqrsize);
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
      this._x = Math.floor(Math.random() * boardsize);
      this._y = Math.floor(Math.random() * boardsize);
    } while (checkIncludes(this, snake.getPartsCoordinates()));
  }
}

export { Part, Board, Head, Target };
