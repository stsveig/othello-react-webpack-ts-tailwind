import React from "react";
import {
  useCurrentPieceTurn,
  useOthelloGameState,
} from "../context/OthelloContext";
import { getValidMovesForCell } from "../othelloLogic";
import { Cell, ValidMove } from "../othelloLogic/board";

type BoardPieceProps = {
  cell: Cell;
};

const BoardPiece = ({ cell }: BoardPieceProps) => {
  const { board } = useOthelloGameState();
  const currentPieceTurn = useCurrentPieceTurn();

  let validMoves: ValidMove[] = [];

  let pieceStyle = "";

  const basicPieceStyle = "rounded-full w-[85%] h-[85%]";

  if (cell.state === "empty") {
    if (currentPieceTurn === "gameOver") {
      // game is over Board Piece UI
    } else {
      validMoves = getValidMovesForCell(cell, board, currentPieceTurn);
      if (validMoves.length) {
        pieceStyle = "border border-[#303030] opacity-60";
      }
    }
  } else {
    pieceStyle = cell.state === "black" ? "bg-black" : "bg-white";
  }

  function handleCellClick(cell: Cell) {
    console.log(cell);
  }

  return (
    <>
      <div
        className="bg-green-600 hover:bg-green-500 w-full cursor-pointer aspect-square flex items-center justify-center"
        onClick={() => handleCellClick(cell)}
      >
        <div className={`${basicPieceStyle} ${pieceStyle}`}></div>
      </div>
    </>
  );
};

export default BoardPiece;
