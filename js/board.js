import { drawBoard } from "./render.js";

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

export function registerControlFunctions(board, canvas) {
  document.addEventListener("keydown", (event) => {
    console.log(event);
    const eventType = event.key;
    switch (eventType) {
      case "ArrowRight":
        moveRight(board, canvas);
        break;
      case "ArrowLeft":
        moveLeft(board, canvas);
        break;
      case "ArrowUp":
        turnTetromino(board);
        break;
      case "ArrowDown":
        moveDown(board);
        break;
    }
  });
}

/**
 Turns the active tetromino to the right for 90 degrees **/
function turnTetromino(board) {
  console.log("turning tetromino");
}

/**
 Turns the active tetromino to the left for 90 degrees **/
function moveDown(board) {
  console.log("move tetromino down");
}

function moveRight(board, canvas) {
  if (!isTetrominoRightMovable(board)) {
    return;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (board[i][j] === 2) {
        board[i][j + 1] = 2;
        board[i][j] = 0;
      }
    }
  }

  drawBoard(board, canvas);
}

/**
 Moves the active tetromino to the left **/
function moveLeft(board, canvas) {
  if (!isTetrominoLeftMovable(board)) {
    return;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 2) {
        board[i][j - 1] = 2;
        board[i][j] = 0;
      }
    }
  }

  drawBoard(board, canvas);
}

function isTetrominoRightMovable(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (isCurrentTetromine(board[i][j]) && j + 1 >= board[i].length) {
        return false;
      }
    }
  }

  return true;
}

function isTetrominoLeftMovable(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (isCurrentTetromine(board[i][j]) && j - 1 < 0) {
        return false;
      }
    }
  }

  return true;
}

function isCurrentTetromine(boardIdentifier) {
  if (boardIdentifier == 2) {
    return true;
  }
  return false;
}

