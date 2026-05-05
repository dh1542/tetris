import { isBoardAdvanceable, advanceBoard } from "./board.js";
import { drawBoard } from "./render.js";
import { createTetromino, makeCurrentTetrominoToStatic } from "./tetrominos.js";

export const gameState = {
  board: null,
};

export function runGame(board, canvas) {
  const currentTimeout = 1000;
  gameState.board = board;
  tetromineFallDown(canvas, currentTimeout);
}

export function tetromineFallDown(canvas, timeout) {
  setTimeout(() => {
    let nextBoard;

    if (isBoardAdvanceable(gameState.board)) {
      nextBoard = advanceBoard(gameState.board);
    } else {
      nextBoard = gameState.board.map(row => row.slice());

      makeCurrentTetrominoToStatic(nextBoard);
      createTetromino(nextBoard, "O");
    }

    gameState.board = nextBoard;

    drawBoard(gameState.board, canvas);
    tetromineFallDown(canvas, timeout);
  }, timeout);
}