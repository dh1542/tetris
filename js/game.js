import { isBoardAdvanceable, advanceBoard } from "./board.js";
import { drawBoard } from "./render.js";

export function runGame(board, canvas) {
  let currentTimeou = 800;
  tetromineFallDown(board, currentTimeou);
}

export function tetromineFallDown(board, timeout) {
  setTimeout(() => {
    if (isBoardAdvanceable(board)) {
      advanceBoard(board);
      drawBoard(board, canvas);
      tetromineFallDown(board, timeout);
    } else {
      return false;
    }
  }, timeout);
}
