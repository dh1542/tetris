import {createBoard} from "./board.js";
import {createTetromino} from "./tetrominos.js";
import {runGame} from "./game.js";
import {registerControlFunctions} from "./controls.js";

const canvas = document.getElementById("canvas");

const board = createBoard(20, 10);
registerControlFunctions(board, canvas);

createTetromino(board, "J");
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
