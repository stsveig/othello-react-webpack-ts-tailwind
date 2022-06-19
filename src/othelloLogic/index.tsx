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

export type Team = string;

export type TurnState = PieceTurn | "gameOver";

export type Winner = Piece | "draw" | undefined;

export type PieceTurn = "whiteTurn" | "blackTurn";

export type GameState = {
  winner: Winner;
  board: Cell[][];
  whiteTeam: Team;
  blackTeam: Team;
  state: TurnState;
  vanillaOthello: boolean;
};

const initialCells: Cell[] = [
  { row: 3, col: 3, state: "white" },
  { row: 4, col: 4, state: "white" },
  { row: 3, col: 4, state: "black" },
  { row: 4, col: 3, state: "black" },
];

export function createInitialGameState(
  rowLength: number,
  colLength: number,
  vanillaOthello = false
): GameState {
  return {
    winner: undefined,
    blackTeam: "user",
    state: "blackTurn",
    vanillaOthello: vanillaOthello,
    whiteTeam: "another user",
    board: createInitialBoard(rowLength, colLength, initialCells),
  };
}

export function doesPieceHasValidMove(board: Cell[][], piece: Piece): boolean {
  let hasValidMove = false;
  iterateOverCells(board, (cell) => {
    if (getValidMovesForCell(cell, board, piece).length > 0) {
      hasValidMove = true;
    }
  });
  return hasValidMove;
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

    if (isValidMove(currentPieceTurn, board, cellsTested, endPosition)) {
      validMoves.push({
        startPosition: { row: cell.row, col: cell.col },
        endPosition,
        offset,
      });
    }
  }

  return validMoves;
}

function isValidMove(
  piece: Piece,
  board: Cell[][],
  cellsTested: number,
  endPosition: CellPosition
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

// [] based on 8x8 board!
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

export function getPieceFromTurnState(pieceTurn: PieceTurn): Piece {
  if (pieceTurn === "blackTurn") {
    return "black";
  }
  return "white";
}

export function getOtherPiece(piece: Piece) {
  return piece === "black" ? "white" : "black";
}

export function getOtherPlayer(turn: PieceTurn): PieceTurn {
  return turn === "blackTurn" ? "whiteTurn" : "blackTurn";
}
