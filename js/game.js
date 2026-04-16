import { drawBoard, isBoardAdvanceable, advanceBoard } from "./board.js";

export function runGame(board, canvas) {
  let currentTimeou = 800;
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
