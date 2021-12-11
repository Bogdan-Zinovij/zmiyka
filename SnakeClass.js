import { Head, Part } from "./ObjectPartsClasses.js";

class Snake {
  static snakeInstance;
  _parts = [];
  _lastPart;
  _head;

  static getInstance() {
    if (!this.snakeInstance) {
      this.snakeInstance = new Snake();
    }

    return this.snakeInstance;
  }

  init() {
    const size = this.getSize();
    for (let i = 0; i < size; i++) {
      this._parts.shift();
    }

    for (let i = 3; i < 6; i++) {
      const part = new Part(5, i);
      this._parts.push(part);
    }

    this._head = new Head(5, 6);
    this._parts.push(this._head);
  }

  move(key) {
    this._lastPart = this._parts.shift();
    this._parts.pop();
    this._parts.push(new Part(this._head.getX(), this._head.getY()));

    switch (key) {
      case "ArrowUp":
        this._head.setY(this._head.getY() - 1);
        break;

      case "ArrowDown":
        this._head.setY(this._head.getY() + 1);
        break;

      case "ArrowRight":
        this._head.setX(this._head.getX() + 1);
        break;

      case "ArrowLeft":
        this._head.setX(this._head.getX() - 1);
        break;
    }

    this._parts.push(this._head);
  }

  eatTarget() {
    this._parts.unshift(this._lastPart);
  }

  show(ctx) {
    for (let i = 0; i < this.getSize(); i++) {
      this._parts[i].show(ctx);
    }
  }

  getPartsCoordinates() {
    const coordinates = [];
    for (const part of this._parts) {
      coordinates.push([part.getX(), part.getY()]);
    }

    return coordinates;
  }

  getSize() {
    return this._parts.length;
  }
}

export { Snake };
