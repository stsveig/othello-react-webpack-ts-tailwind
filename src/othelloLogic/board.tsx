export type Piece = "white" | "black";

export type CellState = Piece | "empty";

export type CellPosition = {
  row: number;
  col: number;
};

type Move = {
  // start: CellPosition;
  endPosition: CellPosition;
  offset: MoveDirection;
};

export type ValidMove = Move;

export type Cell = {
  row: number;
  col: number;
  state: CellState;
};

export function createInitialBoard(
  rowLength: number,
  colLength: number,
  initialCells: Cell[]
): Cell[][] {
  const initialBoard: Cell[][] = Array.from({ length: rowLength }).map(
    (_, row) =>
      Array.from({ length: colLength }).map((_, col) => {
        return { row, col, state: "empty" };
      })
  );

  putInitialCellsToBoard(initialCells, initialBoard);

  return initialBoard;
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

function putInitialCellsToBoard(initialCells: Cell[], initialBoard: Cell[][]) {
  initialCells.forEach(({ row, col, state }) => {
    initialBoard[row][col].state = state;
  });
}

export const offSets = [
  { row: -1, col: -1 },
  { row: 0, col: -1 },
  { row: 1, col: -1 },
  { row: -1, col: 0 },
  { row: 1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: 1 },
  { row: 1, col: 1 },
] as const;

export type MoveDirection = typeof offSets[number];

export function addOffsetToCellPosition(
  cell: CellPosition,
  offset: MoveDirection
): CellPosition {
  return { row: cell.row + offset.row, col: cell.col + offset.col };
}

export function subtractOffsetFromCellPosition(
  cell: CellPosition,
  offset: MoveDirection
): CellPosition {
  return { row: cell.row - offset.row, col: cell.col - offset.col };
}

export function comapreTwoCellPositions(
  posA: CellPosition,
  posB: CellPosition
) {
  return posA.col === posB.col && posA.row === posB.row;
}
