/**
 * Creates a Tetromino on the board and modifies the board.
 * Returns true when successful and false when not placable -> means also game over
 */
export function createTetromino(board, tetrominoType) {
  if (isSpawnPositonValid(board)) {
    switch (tetrominoType) {
      case "I":
        spawnITetromino(board);
        return true;
      case "O":
        spawnOTetromino(board);
        return true;
      default:
        return true;
    }
  }

  return false;
}



function isSpawnPositonValid(board) {
  for (let i = 0; i < 2; i++) {
    for (let j = 3; j < 6; j++) {
      if (board[i][j] === 1) {
        return false;
      }
    }
  }
  return true;
}

function spawnITetromino(board) {
  for (let i = 3; i < 7; i++) {
    board[1][i] = 2;
  }
}

function spawnOTetromino(board) {
  for (let i = 0; i < 2; i++) {
    for (let j = 4; j < 6; j++) {
      board[i][j] = 2;
    }
  }
}

export function makeCurrentTetrominoToStatic(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 2) {
        board[i][j] = 1;
      }
    }
  }
}



