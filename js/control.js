export function registerControls(eventTarget) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      eventTarget.dispatchEvent(new CustomEvent("moveTetrominoLeft"));
    }
    if (event.key === "ArrowRight") {
      eventTarget.dispatchEvent(new CustomEvent("moveTetrominoRight"));
    }
  });
}
