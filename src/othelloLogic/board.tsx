export type Piece = "white" | "black";

export type CellState = Piece | "empty";

export type Cell = {
  row: number;
  col: number;
  state: CellState;
};

export function createInitialBoard(rowLength = 8, colLength = 8): Cell[][] {
  const initialCells: Cell[][] = Array.from({ length: rowLength }).map(
    (_, row) =>
      Array.from({ length: colLength }).map((_, col) => {
        return { row, col, state: "empty" };
      })
  );
  return initialCells;
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
