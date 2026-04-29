import { createBoard, registerControlFunctions } from "./board.js";
import { drawBoard } from "./render.js";
import { createTetromino } from "./tetrominos.js";
import { advanceBoard } from "./board.js";

const canvas = document.getElementById("canvas");

const board = createBoard(20, 10);
registerControlFunctions(board);

console.log(board);
drawBoard(board, canvas);
createTetromino(board, "I");
drawBoard(board, canvas);
advanceBoard(board);
drawBoard(board, canvas);
advanceBoard(board);
drawBoard(board, canvas);
advanceBoard(board);
drawBoard(board, canvas);
advanceBoard(board);
drawBoard(board, canvas);
