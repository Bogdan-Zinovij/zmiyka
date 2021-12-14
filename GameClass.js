import { checkIncludes, checkHeadPosition } from "./functions.js";
import { PLAY_SPEED, CONTROLS, NUM_START_PARTS, BOARD_SIZE } from "./constants.js";

class Game {
  scoreElement = document.querySelector("#score-value");
  buttonStart = document.querySelector("#button-start");

  static gameInstance;
  key = "";
  ctx;
  _snake;
  _target;
  _board;
  _isGameActive;

  static getInstance() {
    if (!this.gameInstance) {
      this.gameInstance = new Game();
    }

    return this.gameInstance;
  }

  init(snake, target, board, ctx) {
    this._snake = snake;
    this._target = target;
    this._board = board;
    this.ctx = ctx;
    this.handleKeyDown();
    this.handleButtonPress();
    this.startNewGame();
  }

  drawing() {
    if (this.key !== "") {
      this._snake.move(this.key);

      if (checkIncludes(this._target, this._snake.getPartsCoordinates())) {
        this._target.newTarget(this._snake);
        this._snake.eatTarget();
      }
    }

    this.ctx.clearRect(0, 0, 900, 900);
    this._board.show(this.ctx);
    this._target.show(this.ctx);
    this._snake.show(this.ctx);
    this.ctx.clearRect(458, 0, 900, 900);
    this.ctx.clearRect(0, 455, 900, 900);
    this.getScore();
    if (!checkHeadPosition(this._snake.getPartsCoordinates()) && this._isGameActive) {
      setTimeout(this.drawing.bind(this), PLAY_SPEED);
    }
  }

  startNewGame() {
    this._isGameActive = true;
    this.key = "";
    this._snake.init();
    this._target.newTarget(this._snake);
    setTimeout(this.drawing.bind(this), 0);
  }

  endGame(){
    this._isGameActive = false;
  }

  handleKeyDown() {
    document.addEventListener("keydown", (event) => {
      if (CONTROLS.includes(event.code)) {
        this.key = event.code;
      }
    });
  }

  getScore() {
    this.scoreElement.textContent = this._snake.getSize() - NUM_START_PARTS;
    if(this.scoreElement.textContent === (BOARD_SIZE**2 - NUM_START_PARTS)) {
      alert('You won this game!');
      this.endGame();
    }
  }

  handleButtonPress() {
    this.buttonStart.addEventListener("click", (event) => {
      this.endGame();
      setTimeout(()=>{
        this.startNewGame();
      }, PLAY_SPEED);
    });
  }
}

export { Game };
