import {
  addOffsetToCellPosition,
  Cell,
  CellPosition,
  createInitialBoard,
  iterateOverCells,
  MoveDirection,
  offSets,
  Piece,
  ValidMove,
} from "./board";

export type PieceTurn = "whiteTurn" | "blackTurn";

export type TurnState = PieceTurn | "gameOver";

export type GameState = {
  board: Cell[][];
  state: TurnState;
  whiteTeam: string;
  blackTeam: string;
};

const initialCells: Cell[] = [
  { row: 3, col: 3, state: "white" },
  { row: 4, col: 4, state: "white" },
  { row: 3, col: 4, state: "black" },
  { row: 4, col: 3, state: "black" },
];

export function createInitialGameState(
  rowLength: number,
  colLength: number
): GameState {
  return {
    blackTeam: "user",
    state: "blackTurn",
    whiteTeam: "another user",
    board: createInitialBoard(rowLength, colLength, initialCells),
  };
}

export function getValidMovesForCell(
  cell: Cell,
  board: Cell[][],
  currentPieceTurn: Piece
): ValidMove[] {
  const validMoves: ValidMove[] = [];

  if (cell.state !== "empty") return [];

  const otherPiece = getOtherPiece(currentPieceTurn);

  for (const offset of offSets) {
    if (!isMoveWithinBoard(cell, offset)) {
      continue;
    }

    const { endPosition, cellsTested } = testOffsetForValidMove(
      board,
      cell,
      offset,
      otherPiece
    );

    if (isValidMove(board, endPosition, cellsTested, currentPieceTurn)) {
      validMoves.push({ endPosition, offset });
    }
  }

  return validMoves;
}

function isValidMove(
  board: Cell[][],
  endPosition: CellPosition,
  cellsTested: number,
  piece: Piece
) {
  return (
    cellsTested > 0 && board[endPosition.row][endPosition.col].state === piece
  );
}

function testOffsetForValidMove(
  board: Cell[][],
  cell: CellPosition,
  offset: MoveDirection,
  otherPiece: Piece
) {
  let nextCellPosition = addOffsetToCellPosition(cell, offset);
  let cellsTested = 0;

  while (
    board[nextCellPosition.row][nextCellPosition.col].state === otherPiece &&
    isMoveWithinBoard(nextCellPosition, offset)
  ) {
    nextCellPosition = addOffsetToCellPosition(nextCellPosition, offset);
    cellsTested++;
  }

  return { endPosition: nextCellPosition, cellsTested };
}

// function flipCells(board, endPosition, offset, cellsTested, piece) {
//   const newBoard = [...board];

//   for (; cellsTested > 0; cellsTested--) {
//     endPosition = subtractOffsetFromCellPosition(endPosition, offset);
//     newBoard[endPosition.row][endPosition.col].state = piece;
//   }

//   return newBoard;
// }

// [] check based on 8x8 board!
function isMoveWithinBoard(
  { col, row }: CellPosition,
  offset: CellPosition
): boolean {
  if (col === 0 && offset.col === -1) return false;
  if (col === 7 && offset.col === 1) return false;
  if (row === 0 && offset.row === -1) return false;
  if (row === 7 && offset.row === 1) return false;

  return true;
}

export function currentPieceTurn(turnState: TurnState): Piece | "gameOver" {
  if (turnState === "gameOver") {
    return "gameOver";
  } else {
    if (turnState === "blackTurn") {
      return "black";
    }
    return "white";
  }
}

export function isCurrentPieceTurn(turn: TurnState, piece: Piece): boolean {
  if (turn === "gameOver") return false;
  if (turn === "blackTurn" && piece === "black") return true;
  if (turn === "whiteTurn" && piece === "white") return true;
  return false;
}

export function getScore(board: Cell[][], piece: Piece) {
  let score = 0;
  iterateOverCells(board, (cell) => {
    if (cell.state === piece) {
      score++;
    }
  });
  return score;
}

function getOtherPiece(piece: Piece) {
  return piece === "black" ? "white" : "black";
}
