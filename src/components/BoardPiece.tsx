import React from "react";
import { useCurrentPieceTurn } from "../context/OthelloContext";
import { Cell, Piece } from "../othelloLogic/board";

type BoardPieceProps = {
  cell: Cell;
};

// BoardPiece UI = empty | black | white | valid move hint

const BoardPiece = ({ cell }: BoardPieceProps) => {
  const currentPieceTurn = useCurrentPieceTurn();

  let pieceStyle = "";

  const basicPieceStyle = "rounded-full w-[85%] h-[85%]";

  if (cell.state === "empty") {
    if (currentPieceTurn === "gameOver") {
      // game is over Board Piece UI
    } else {
      // current piece is 'black' | 'white'
      if (isCellHasValidMovesFor(currentPieceTurn, cell)) {
        pieceStyle = "border border-[#303030] opacity-60";
      }
    }
  } else {
    pieceStyle = cell.state === "black" ? "bg-black" : "bg-white";
  }

  function isCellHasValidMovesFor(currentPieceTurn: Piece, cell: Cell) {
    if (currentPieceTurn === "black") {
      return cell.validBlackMoves?.length;
    } else {
      return cell.validWhiteMoves?.length;
    }
  }

  return (
    <>
      <div className={`${basicPieceStyle} ${pieceStyle}`}></div>
    </>
  );
};

export default BoardPiece;
