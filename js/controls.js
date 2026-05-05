import { drawBoard } from "./render.js";
import { gameState } from "./game.js";
import { CELL, isCurrentTetromine } from "./board.js";

export function registerControlFunctions(canvas) {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowRight":
                moveRight(gameState.board, canvas);
                break;
            case "ArrowLeft":
                moveLeft(gameState.board, canvas);
                break;
            case "ArrowUp":
                turnTetromino(gameState.board, canvas);
                break;
            case "ArrowDown":
                moveDown(gameState.board, canvas);
                break;
        }
    });
}

function turnTetromino(board, canvas) {
    const active = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (isCurrentTetromine(board[i][j])) {
                active.push({ i, j, value: board[i][j] });
            }
        }
    }

    if (active.length === 0) return;

    const minI = Math.min(...active.map(c => c.i));
    const maxI = Math.max(...active.map(c => c.i));
    const minJ = Math.min(...active.map(c => c.j));
    const maxJ = Math.max(...active.map(c => c.j));

    const centerI = (minI + maxI) / 2;
    const centerJ = (minJ + maxJ) / 2;

    const rotated = active.map(({ i, j, value }) => {
        const relI = i - centerI;
        const relJ = j - centerJ;

        return {
            i: Math.round(centerI + relJ),
            j: Math.round(centerJ - relI),
            value,
        };
    });

    for (const { i, j } of rotated) {
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
            return;
        }

        if (board[i][j] !== CELL.EMPTY && !isCurrentTetromine(board[i][j])) {
            return;
        }
    }

    const next = board.map(row => row.slice());

    for (const { i, j } of active) {
        next[i][j] = CELL.EMPTY;
    }

    for (const { i, j, value } of rotated) {
        next[i][j] = value;
    }

    copyBoard(next, board);
    drawBoard(board, canvas);
}

function moveDown(board, canvas) {
    if (!isTetrominoDownMovable(board)) return;

    const next = board.map(row => row.slice());

    for (let i = board.length - 1; i >= 0; i--) {
        for (let j = 0; j < board[i].length; j++) {
            if (isCurrentTetromine(board[i][j])) {
                next[i][j] = CELL.EMPTY;
                next[i + 1][j] = board[i][j];
            }
        }
    }

    copyBoard(next, board);
    drawBoard(board, canvas);
}

function moveRight(board, canvas) {
    if (!isTetrominoRightMovable(board)) return;

    const next = board.map(row => row.slice());

    for (let i = 0; i < board.length; i++) {
        for (let j = board[i].length - 1; j >= 0; j--) {
            if (isCurrentTetromine(board[i][j])) {
                next[i][j] = CELL.EMPTY;
                next[i][j + 1] = board[i][j];
            }
        }
    }

    copyBoard(next, board);
    drawBoard(board, canvas);
}

function moveLeft(board, canvas) {
    if (!isTetrominoLeftMovable(board)) return;

    const next = board.map(row => row.slice());

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (isCurrentTetromine(board[i][j])) {
                next[i][j] = CELL.EMPTY;
                next[i][j - 1] = board[i][j];
            }
        }
    }

    copyBoard(next, board);
    drawBoard(board, canvas);
}

function isTetrominoDownMovable(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (isCurrentTetromine(board[i][j])) {
                const nextI = i + 1;

                if (nextI >= board.length) return false;

                if (
                    board[nextI][j] !== CELL.EMPTY &&
                    !isCurrentTetromine(board[nextI][j])
                ) {
                    return false;
                }
            }
        }
    }

    return true;
}

function isTetrominoLeftMovable(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (isCurrentTetromine(board[i][j])) {
                const nextJ = j - 1;

                if (nextJ < 0) return false;

                if (
                    board[i][nextJ] !== CELL.EMPTY &&
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

                if (nextJ >= board[i].length) return false;

                if (
                    board[i][nextJ] !== CELL.EMPTY &&
                    !isCurrentTetromine(board[i][nextJ])
                ) {
                    return false;
                }
            }
        }
    }

    return true;
}

function copyBoard(source, target) {
    for (let i = 0; i < source.length; i++) {
        target[i] = source[i];
    }
}