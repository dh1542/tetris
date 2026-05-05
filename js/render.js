const CELL_SIZE = 40;

const COLORS = {
  0: "#111",        // empty (background)

  2: "#00f0f0",     // I - cyan
  3: "#f0f000",     // O - yellow
  4: "#a000f0",     // T - purple
  5: "#00f000",     // S - green
  6: "#f00000",     // Z - red
  7: "#0000f0",     // J - blue
  8: "#f0a000",     // L - orange
};

export function drawBoard(board, canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get canvas context");
    return;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];

      const color = COLORS[Math.abs(cell)] ?? "#555";

      ctx.fillStyle = color;
      ctx.fillRect(
          j * CELL_SIZE,
          i * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
      );

      ctx.strokeStyle = "#222";
      ctx.strokeRect(
          j * CELL_SIZE,
          i * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
      );
    }
  }
}