export function registerControls(eventTarget) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      eventTarget.dispatchEvent(new CustomEvent("moveTetrominoLeft"));
    }
    if (event.key === "ArrowRight") {
      eventTarget.dispatchEvent(new CustomEvent("moveTetrominoRight"));
    }
    if (event.key === "ArrowUp") {
      eventTarget.dispatchEvent(new CustomEvent("turnTetrominoRight"));
    }
    if (event.key === "ArrowDown") {
      eventTarget.dispatchEvent(new CustomEvent("turnTetrominoLeft"));
    }
  })
}
