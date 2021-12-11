import { Snake } from "./SnakeClass.js";
import { Game } from "./GameClass.js";
import { Board, Target } from "./ObjectPartsClasses.js";

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const game = Game.getInstance();
game.init(Snake.getInstance(), Target.getInstance(), Board.getInstance(), ctx);
