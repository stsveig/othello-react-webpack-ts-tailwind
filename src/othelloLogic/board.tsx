export type Piece = "white" | "black";

export type CellState = Piece | "empty";

export type Cell = {
  row: number;
  col: number;
  state: CellState;
};

export function createInitialBoard(): Cell[][] {
  // TODO
  return [];
}

export function iterateOverCells(
  board: Cell[][],
  callback: (cell: Cell) => void
) {
  board.forEach((row) => {
    row.forEach((cell) => {
      callback(cell);
    });
  });
}
