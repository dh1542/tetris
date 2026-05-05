// grid description:
// 0: empty
// positive 2-8: active/falling tetromino
// negative -2 to -8: static/locked tetromino

export const CELL = {
    EMPTY: 0,

    I: 2,
    O: 3,
    T: 4,
    S: 5,
    Z: 6,
    J: 7,
    L: 8,
};

export function isCurrentTetromine(cell) {
    return cell >= CELL.I && cell <= CELL.L;
}

export function isStaticTetromino(cell) {
    return cell <= -CELL.I && cell >= -CELL.L;
}

export function isEmptyCell(cell) {
    return cell === CELL.EMPTY;
}

export function createBoard(rows, columns) {
    return Array.from({length: rows}, () => Array(columns).fill(CELL.EMPTY));
}

export function advanceBoard(board) {
    const rows = board.length;
    const cols = board[0].length;

    const next = board.map(row => row.slice());

    for (let i = rows - 1; i >= 0; i--) {
        for (let j = 0; j < cols; j++) {
            if (isCurrentTetromine(board[i][j])) {
                const nextI = i + 1;
                const cellValue = board[i][j];

                if (nextI < rows) {
                    next[i][j] = CELL.EMPTY;
                    next[nextI][j] = cellValue;
                }
            }
        }
    }

    return next;
}

/**
 * Decides if the active tetromino can fall down one row
 */
export function isBoardAdvanceable(board) {
    const rows = board.length;
    const cols = board[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (isCurrentTetromine(board[i][j])) {
                const nextI = i + 1;

                if (nextI >= rows) {
                    return false;
                }

                if (
                    !isEmptyCell(board[nextI][j]) &&
                    !isCurrentTetromine(board[nextI][j])
                ) {
                    return false;
                }
            }
        }
    }

    return true;
}