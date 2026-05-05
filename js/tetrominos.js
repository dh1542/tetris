import {CELL, isCurrentTetromine} from "./board.js";

const TETROMINO_TYPES = ["O", "T", "S", "Z", "J", "L", "I"];

function getRandomTetrominoType() {
    const index = Math.floor(Math.random() * TETROMINO_TYPES.length);
    return TETROMINO_TYPES[index];
}

export function createRandomTetromino(board) {
    const type = getRandomTetrominoType();

    if (!isSpawnPositionValid(board, type)) {
        return false;
    }

    switch (type) {
        case "I":
            spawnITetromino(board);
            break;
        case "O":
            spawnOTetromino(board);
            break;
        case "T":
            spawnTTetromino(board);
            break;
        case "S":
            spawnSTetromino(board);
            break;
        case "Z":
            spawnZTetromino(board);
            break;
        case "J":
            spawnJTetromino(board);
            break;
        case "L":
            spawnLTetromino(board);
            break;
    }

    return true;
}

function canPlaceCells(board, cells) {
    return cells.every(({i, j}) => {
        return board[i][j] === CELL.EMPTY;
    });
}

function placeCells(board, cells, value) {
    for (const {i, j} of cells) {
        board[i][j] = value;
    }
}

function isSpawnPositionValid(board, type) {
    return canPlaceCells(board, getTetrominoSpawnCells(type));
}

function getTetrominoSpawnCells(type) {
    switch (type) {
        case "I":
            return [
                {i: 1, j: 3},
                {i: 1, j: 4},
                {i: 1, j: 5},
                {i: 1, j: 6},
            ];
        case "O":
            return [
                {i: 0, j: 4},
                {i: 0, j: 5},
                {i: 1, j: 4},
                {i: 1, j: 5},
            ];
        case "T":
            return [
                {i: 0, j: 5},
                {i: 1, j: 4},
                {i: 1, j: 5},
                {i: 1, j: 6},
            ];
        case "S":
            return [
                {i: 0, j: 5},
                {i: 0, j: 6},
                {i: 1, j: 4},
                {i: 1, j: 5},
            ];
        case "Z":
            return [
                {i: 0, j: 4},
                {i: 0, j: 5},
                {i: 1, j: 5},
                {i: 1, j: 6},
            ];
        case "J":
            return [
                {i: 0, j: 4},
                {i: 1, j: 4},
                {i: 1, j: 5},
                {i: 1, j: 6},
            ];
        case "L":
            return [
                {i: 0, j: 6},
                {i: 1, j: 4},
                {i: 1, j: 5},
                {i: 1, j: 6},
            ];
        default:
            return [];
    }
}

function spawnITetromino(board) {
    placeCells(board, getTetrominoSpawnCells("I"), CELL.I);
}

function spawnOTetromino(board) {
    placeCells(board, getTetrominoSpawnCells("O"), CELL.O);
}

function spawnTTetromino(board) {
    placeCells(board, getTetrominoSpawnCells("T"), CELL.T);
}

function spawnSTetromino(board) {
    placeCells(board, getTetrominoSpawnCells("S"), CELL.S);
}

function spawnZTetromino(board) {
    placeCells(board, getTetrominoSpawnCells("Z"), CELL.Z);
}

function spawnJTetromino(board) {
    placeCells(board, getTetrominoSpawnCells("J"), CELL.J);
}

function spawnLTetromino(board) {
    placeCells(board, getTetrominoSpawnCells("L"), CELL.L);
}


export function makeCurrentTetrominoToStatic(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (isCurrentTetromine(board[i][j])) {
                board[i][j] = -board[i][j];
            }
        }
    }
}