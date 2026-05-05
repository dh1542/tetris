import {createBoard} from "./board.js";
import {runGame} from "./game.js";
import {registerControlFunctions} from "./controls.js";

const canvas = document.getElementById("canvas");

if (!canvas) {
    throw new Error("Canvas element not found");
}

const board = createBoard(20, 10);

runGame(board, canvas);
registerControlFunctions(canvas);