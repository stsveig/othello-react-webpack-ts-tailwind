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

export function createInitialGameState(): GameState {
  return {
    board: createInitialBoard(),
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
