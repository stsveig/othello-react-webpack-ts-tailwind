import {
  addOffsetToCellPosition,
  Cell,
  CellPosition,
  createInitialBoard,
  iterateOverCells,
  offSets,
  Piece,
  subtractOffsetFromCellPosition,
  ValidMove,
} from "./board";

export type PieceTurn = "whiteTurn" | "blackTurn";

export type TurnState = PieceTurn | "gameOver";

export type GameState = {
  board: Cell[][];
  // state: "playerOneTurn" | "playerTwoTurn" | "gameOver";
  // state: "opponentOneTurn" | "opponentTwoTurn" | "gameOver";
  state: TurnState;
} & {
  whiteTeam: string;
  blackTeam: string;
};
// | {
//     playerOnePiece: "white";
//     playerTwoPiece: "black";
//   }

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
    state: "blackTurn",
    blackTeam: "user",
    whiteTeam: "another user",
  };
}

export function setValidPieceMoves(board: Cell[][], piece: Piece) {
  const otherPiece = getOtherPiece(piece);
  // iterating each cell
  iterateOverCells(board, (cell) => {
    // [] is cell empty if not return -> next cell
    if (cell.state !== "empty") return;
    // iterating each offset
    for (const offset of offSets) {
      // [] is move within board
      if (!isMoveWithinBoard(cell, offset)) {
        continue;
      }
      // [] is current offset valid move
      const { endPosition, cellsTested } = testOffsetForValidMove(
        board,
        cell,
        offset,
        otherPiece
      );
      // [] if a valid move have being found
      if (isValidMove(board, endPosition, cellsTested, piece)) {
        // [] set valid move on the cell
        setValidMoveToCell(cell, endPosition, offset, piece);
      }
    }
  });
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
  offset: CellPosition,
  otherPiece: Piece
) {
  let nextCellPosition = addOffsetToCellPosition(cell, offset);
  let cellsTested = 0;

  // start testing direction -> one step at a time
  while (
    board[nextCellPosition.row][nextCellPosition.col].state === otherPiece &&
    isMoveWithinBoard(nextCellPosition, offset)
  ) {
    // step into next position
    nextCellPosition = addOffsetToCellPosition(nextCellPosition, offset);
    cellsTested++;
  }

  return { endPosition: nextCellPosition, cellsTested };
}

function setValidMoveToCell(
  startPosition: CellPosition,
  endPosition: CellPosition,
  offset: CellPosition,
  piece: Piece
) {
  if (piece === "black") {
    const validBlackMove: ValidMove = {
      start: { row: startPosition.row, col: startPosition.col },
      end: { row: endPosition.row, col: endPosition.col },
      offset,
    };
    console.log(validBlackMove);
  } else {
    const validWhiteMove: ValidMove = {
      start: { row: startPosition.row, col: startPosition.col },
      end: { row: endPosition.row, col: endPosition.col },
      offset,
    };
    console.log(validWhiteMove);
  }
}

function flipCells() {
  // only if a valid move have being found
  if (
    cellsTested > 0 &&
    newBoard[nextCellPosition.row][nextCellPosition.col].state === piece
  ) {
    for (; cellsTested > 0; cellsTested--) {
      nextCellPosition = subtractOffsetFromCellPosition(
        nextCellPosition,
        offset
      );
      newBoard[nextCellPosition.row][nextCellPosition.col].state = piece;
    }
  }
}

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
  return turn.split("Turn")[0] !== piece;
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
