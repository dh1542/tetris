import { createBoard, registerControlFunctions } from "./board.js";
import { drawBoard } from "./render.js";
import { createTetromino } from "./tetrominos.js";
import { advanceBoard } from "./board.js";
import { runGame } from "./game.js";

const canvas = document.getElementById("canvas");

const board = createBoard(20, 10);
registerControlFunctions(board, canvas);

createTetromino(board, "I");
runGame(board, canvas);

// console.log(board);
// drawBoard(board, canvas);

// drawBoard(board, canvas);
// advanceBoard(board);
// drawBoard(board, canvas);
// advanceBoard(board);
// drawBoard(board, canvas);
// advanceBoard(board);
// drawBoard(board, canvas);
// advanceBoard(board);
// drawBoard(board, canvas);
