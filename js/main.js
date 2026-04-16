import {
  createBoard,
  drawBoard,
  isBoardAdvanceable,
  advanceBoard,
} from "./board.js";
import { tetromineFallDown } from "./game.js";
import { createTetromino } from "./tetrominos.js";

const canvas = document.getElementById("canvas");

const board = createBoard(20, 10);
console.log(board);

drawBoard(board, canvas);
createTetromino(board, "I");

tetromineFallDown(board, 1000);
