// grid description:
// 0: empty
// 1: cell is blocked
// 2: falling piece

export function createBoard(rows, columns) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

export function advanceBoard(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 2) {
        board[i + 1][j] = 3;
        board[i][j] = 0;
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 3) {
        board[i + 1][j] = 2;
        board[i][j] = 0;
      }
    }
  }
}




/** Decides if a tetromino is able to fall down one row */
export function isBoardAdvanceable(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 2 && i != board.length - 1) {
        if (board[i + 1][j] == 1) {
          return false;
        }
      }
      if (board[i][j] == 2 && i == board.length - 1) {
        return false;
      }
    }
  }
  return true;
}


