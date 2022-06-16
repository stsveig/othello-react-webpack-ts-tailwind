import {
  addOffsetToCellPosition,
  Cell,
  CellPosition,
  createInitialBoard,
  iterateOverCells,
  offSets,
  Piece,
} from "./board";

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

export function getValidPieceMoves(board: Cell[][], piece: Piece) {
  const validMoves: Cell[] = [];
  // const validMoves: CellPosition[] = [];

  console.log("my logic is fucked", board, piece);

  iterateOverCells(board, (cell: Cell) => {
    if (isPieceMoveLegal(board, cell, piece)) {
      validMoves.push(cell);
    }
  });

  if (!validMoves.length) {
    return undefined;
  }

  return validMoves;
}

function isPieceMoveLegal(board: Cell[][], cell: Cell, piece: Piece): boolean {
  if (cell.state !== "empty") return false;

  for (const offset of offSets) {
    if (!isMoveWithinBoard(cell, offset)) {
      continue;
    }

    // start testing direction -> one step at a time
    let nextCellPosition = addOffsetToCellPosition(cell, offset);
    let cellsTested = 0;

    const otherPiece = piece === "black" ? "white" : "black";

    while (
      board[nextCellPosition.row][nextCellPosition.col].state === otherPiece &&
      isMoveWithinBoard(nextCellPosition, offset)
    ) {
      // step into next position
      nextCellPosition = addOffsetToCellPosition(nextCellPosition, offset);
      cellsTested++;
    }

    if (
      cellsTested > 0 &&
      board[nextCellPosition.row][nextCellPosition.col].state === piece
    ) {
      // a valid move have being found
      return true;
    }
  }

  return false;
}

// function isCellEmpty(cell: Cell): boolean {
//   return cell.state === "empty";
// }

// TODO: check based on 8x8 board!
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

export function getScore(board: Cell[][], piece: Piece) {
  let score = 0;
  iterateOverCells(board, (cell) => {
    if (cell.state === piece) {
      score++;
    }
  });
  return score;
}
