import {advanceBoard, CELL, createBoard, isBoardAdvanceable} from "./board.js";
import {drawBoard, drawGameOver} from "./render.js";
import {createRandomTetromino, makeCurrentTetrominoToStatic,} from "./tetrominos.js";

export const gameState = {
    board: null,
    score: 0,
    isGameOver: false,
    canvas: null,
    timeout: 1000,
    timerId: null,
};

export function runGame(board, canvas) {
    gameState.board = board;
    gameState.canvas = canvas;
    gameState.score = 0;
    gameState.isGameOver = false;

    updateScoreDisplay();

    createRandomTetromino(gameState.board);
    drawBoard(gameState.board, gameState.canvas);
    tetromineFallDown();
}

export function restartGame() {
    if (gameState.timerId) {
        clearTimeout(gameState.timerId);
    }

    gameState.board = createBoard(20, 10);
    gameState.score = 0;
    gameState.isGameOver = false;

    updateScoreDisplay();

    createRandomTetromino(gameState.board);
    drawBoard(gameState.board, gameState.canvas);
    tetromineFallDown();
}

export function tetromineFallDown() {
    if (gameState.isGameOver) return;

    gameState.timerId = setTimeout(() => {
        if (gameState.isGameOver) return;

        let nextBoard;

        if (isBoardAdvanceable(gameState.board)) {
            nextBoard = advanceBoard(gameState.board);
        } else {
            nextBoard = gameState.board.map(row => row.slice());

            makeCurrentTetrominoToStatic(nextBoard);

            const result = collectPointsAndDeleteFullLines(nextBoard);
            nextBoard = result.board;
            gameState.score += result.points;

            updateScoreDisplay();

            const wasCreated = createRandomTetromino(nextBoard);

            if (!wasCreated) {
                gameState.isGameOver = true;
                gameState.board = nextBoard;

                drawBoard(gameState.board, gameState.canvas);
                drawGameOver(gameState.canvas);
                return;
            }
        }

        gameState.board = nextBoard;

        drawBoard(gameState.board, gameState.canvas);
        tetromineFallDown();
    }, gameState.timeout);
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

function updateScoreDisplay() {
    const scoreElement = document.getElementById("score");

    if (scoreElement) {
        scoreElement.textContent = gameState.score;
    }
}