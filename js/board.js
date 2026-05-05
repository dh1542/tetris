import { drawBoard } from "./render.js";
import { gameState } from "./game.js";

// grid description:
// 0: empty
// 1: cell is blocked
// 2: falling piece

export function createBoard(rows, columns) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

export function advanceBoard(board) {
  const rows = board.length;
  const cols = board[0].length;

  const next = board.map(row => row.slice());

  for (let i = rows - 1; i >= 0; i--) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === 2) {
        const nextI = i + 1;
        if (nextI < rows) {
          next[i][j] = 0;
          next[nextI][j] = 2;
        }
      }
    }
  }

  return next;
}

/** Decides if a tetromino is able to fall down one row */
export function isBoardAdvanceable(board) {
  const rows = board.length;
  const cols = board[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === 2) {
        const nextI = i + 1;

        if (nextI >= rows) {
          return false;
        }

        if (board[nextI][j] !== 0 && board[nextI][j] !== 2) {
          return false;
        }
      }
    }
  }

  return true;
}


