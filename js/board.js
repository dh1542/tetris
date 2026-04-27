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


export function registerControlFunctions(board) {
  document.addEventListener('keydown', (board, event) => {
    const eventType = event.type;

    switch (eventType) {
      case 'ArrowRight':
        moveRight(board);
      case 'ArrowLeft':
        moveLeft(board);
      case 'ArrowUp':
        turnTetromino(board);
      case 'ArrowDown':
        moveDown(board);
      default:
        return;
    }
  })



}


/**
 Turns the active tetromino to the right for 90 degrees **/
function turnTetromino(board) {

}



/**
 Turns the active tetromino to the left for 90 degrees **/
function moveDown(board) { }



/**
 Moves the active tetromino to the right **/
function moveRight(board) {


}



/**
 Moves the active tetromino to the left **/
function moveLeft(board) {


}
