/**
 * Creates a Tetromino on the board and modifies the board.
 * Returns true when successful and false when not placable -> means also game over
 */
export function createTetromino(board, tetrominoType) {
    if (isSpawnPositonValid(board)) {
        switch (tetrominoType) {
            case "I":
                spawnITetromino(board);
                return true;
            case "O":
                spawnOTetromino(board);
                return true;
            case "T":
                spawnTTetromino(board);
                return true;
            case "S":
                spawnSTetromino(board);
                return true;
            case "Z":
                spawnZTetromino(board);
                return true;
            case "J":
                spawnJTetromino(board);
                return true;
            case "L":
                spawnLTetromino(board);
                return true;
            default:
                return true;
        }
    }
    return false;
}


function isSpawnPositonValid(board) {
    for (let i = 0; i < 2; i++) {
        for (let j = 3; j < 6; j++) {
            if (board[i][j] === 1) {
                return false;
            }
        }
    }
    return true;
}

function spawnITetromino(board) {
    for (let i = 3; i < 7; i++) {
        board[1][i] = 2;
    }
}

function spawnOTetromino(board) {
    for (let i = 0; i < 2; i++) {
        for (let j = 4; j < 6; j++) {
            board[i][j] = 2;
        }
    }
}

function spawnTTetromino(board) {
    board[0][5] = 2;
    board[1][4] = 2;
    board[1][5] = 2;
    board[1][6] = 2;
}

function spawnSTetromino(board) {
    board[0][5] = 2;
    board[0][6] = 2;
    board[1][4] = 2;
    board[1][5] = 2;
}

function spawnZTetromino(board) {
    board[0][4] = 2;
    board[0][5] = 2;
    board[1][5] = 2;
    board[1][6] = 2;
}

function spawnJTetromino(board) {
    board[0][4] = 2;
    board[1][4] = 2;
    board[1][5] = 2;
    board[1][6] = 2;
}

function spawnLTetromino(board) {
    board[0][6] = 2;
    board[1][4] = 2;
    board[1][5] = 2;
    board[1][6] = 2;
}


export function makeCurrentTetrominoToStatic(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 2) {
                board[i][j] = 1;
            }
        }
    }
}



