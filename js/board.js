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
        next[i][j] = 0;
        next[i + 1][j] = 2;
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

export function registerControlFunctions(board, canvas) {
  document.addEventListener("keydown", (event) => {
    console.log(event);
    const eventType = event.key;
    switch (eventType) {
      case "ArrowRight":
        moveRight(gameState.board, canvas);
        break;
      case "ArrowLeft":
        moveLeft(gameState.board, canvas);
        break;
      case "ArrowUp":
        turnTetromino(gameState.board);
        break;
      case "ArrowDown":
        moveDown(gameState.board);
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

/**
 * Moves the active tetromino to the right
 */
function moveRight(board, canvas) {
  if (!isTetrominoRightMovable(board)) {
    return;
  }

  const next = board.map(row => row.slice());

  for (let i = 0; i < board.length; i++) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      if (isCurrentTetromine(board[i][j])) {
        next[i][j] = 0;
        next[i][j + 1] = 2;
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    board[i] = next[i];
  }

  drawBoard(board, canvas);
}


/**
 * Moves the active tetromino to the left
 */
function moveLeft(board, canvas) {
  if (!isTetrominoLeftMovable(board)) {
    return;
  }

  const next = board.map(row => row.slice());

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (isCurrentTetromine(board[i][j])) {
        next[i][j] = 0;
        next[i][j - 1] = 2;
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    board[i] = next[i];
  }

  drawBoard(board, canvas);
}

function isTetrominoLeftMovable(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (isCurrentTetromine(board[i][j])) {
        const nextJ = j - 1;

        if (nextJ < 0) {
          return false;
        }

        if (
            board[i][nextJ] !== 0 &&
            !isCurrentTetromine(board[i][nextJ])
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

function isTetrominoRightMovable(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (isCurrentTetromine(board[i][j])) {
        const nextJ = j + 1;

        if (nextJ >= board[i].length) {
          return false;
        }

        if (
            board[i][nextJ] !== 0 &&
            !isCurrentTetromine(board[i][nextJ])
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

function isCurrentTetromine(boardIdentifier) {
  if (boardIdentifier === 2) {
    return true;
  }
  return false;
}

