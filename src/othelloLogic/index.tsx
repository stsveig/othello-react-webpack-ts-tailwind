import { Cell, createInitialBoard, iterateOverCells, Piece } from "./board";

export type GameState = {
  board: Cell[][];
  state: "playerOneTurn" | "playerTwoTurn" | "gameOver";
} & (
  | {
      playerOnePiece: "black";
      playerTwoPiece: "white";
    }
  | {
      playerOnePiece: "white";
      playerTwoPiece: "black";
    }
);

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
    board: createInitialBoard(rowLength, colLength, initialCells),
    state: "playerOneTurn",
    playerOnePiece: "white",
    playerTwoPiece: "black",
  };
}

function getValidMovesForCurrentPiece(board: Cell[][], piece: Piece) {
  const validMoves = [];
  iterateOverCells(board, (cell) => {
    if (isMoveLegal(board, cell, piece)) {
      validMoves.push(cell);
    }
  });

  if (!validMoves.length) {
    return undefined;
  }

  return validMoves;
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
