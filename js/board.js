// grid description:
// 0: empty
// 1: cell is blocked
// 2: falling piece



export function createBoard(rows, columns){
  return new Array(rows).fill(new Array(columns).fill(0));
}
