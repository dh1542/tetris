import { createBoard } from "./board.js";
import { createTetromino } from "./tetrominos.js";

const canvas = document.getElementById("canvas");

const board = createBoard(20, 10);
console.log(board);

drawBoard(board, canvas);
createTetromino(board, "I");
console.log(board);

drawBoard(board, canvas);

function drawBoard(board, canvas) {
  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    console.error("Could not get canvas context");
    return;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 0) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(j * 40, i * 40, 40, 40);
      } else if (board[i][j] == 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(j * 40, i * 40, 40, 40);
      }
    }
  }
}
