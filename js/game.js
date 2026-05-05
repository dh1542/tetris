import { CELL, advanceBoard, isBoardAdvanceable } from "./board.js";
import { drawBoard } from "./render.js";
import {
    createRandomTetromino,
    makeCurrentTetrominoToStatic,
} from "./tetrominos.js";

export const gameState = {
    board: null,
    score: 0,
};

export function runGame(board, canvas) {
    const currentTimeout = 1000;

    gameState.board = board;
    gameState.score = 0;

    createRandomTetromino(gameState.board);
    tetromineFallDown(canvas, currentTimeout);
}

export function tetromineFallDown(canvas, timeout) {
    setTimeout(() => {
        let nextBoard;

        if (isBoardAdvanceable(gameState.board)) {
            nextBoard = advanceBoard(gameState.board);
        } else {
            nextBoard = gameState.board.map(row => row.slice());

            makeCurrentTetrominoToStatic(nextBoard);

            const result = collectPointsAndDeleteFullLines(nextBoard);
            nextBoard = result.board;
            gameState.score += result.points;

            document.getElementById("score").textContent = gameState.score;

            createRandomTetromino(nextBoard);
        }

        gameState.board = nextBoard;

        drawBoard(gameState.board, canvas);
        tetromineFallDown(canvas, timeout);
    }, timeout);
}

export function collectPointsAndDeleteFullLines(board) {
    const cols = board[0].length;

    const remainingRows = board.filter(row => {
        return !row.every(cell => cell !== CELL.EMPTY);
    });

    const deletedLines = board.length - remainingRows.length;

    for (let i = 0; i < deletedLines; i++) {
        remainingRows.unshift(new Array(cols).fill(CELL.EMPTY));
    }

    return {
        board: remainingRows,
        points: calculatePoints(deletedLines),
        deletedLines,
    };
}

function calculatePoints(deletedLines) {
    switch (deletedLines) {
        case 1:
            return 100;
        case 2:
            return 300;
        case 3:
            return 500;
        case 4:
            return 800;
        default:
            return 0;
    }
}