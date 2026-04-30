import { isBoardAdvanceable, advanceBoard } from "./board.js";
import { drawBoard } from "./render.js";
import { createTetromino, makeCurrentTetrominoToStatic } from "./tetrominos.js";

export function runGame(board, canvas) {
  let currentTimeou = 1000;
  tetromineFallDown(board, currentTimeou);
}

export function tetromineFallDown(board, timeout) {
  setTimeout(() => {
    if (isBoardAdvanceable(board)) {
      advanceBoard(board);
      drawBoard(board, canvas);
      tetromineFallDown(board, timeout);
    } else {
      makeCurrentTetrominoToStatic(board);
      createTetromino(board, "O");
      drawBoard(board, canvas);
      tetromineFallDown(board, timeout);
    }
  }, timeout);
}
