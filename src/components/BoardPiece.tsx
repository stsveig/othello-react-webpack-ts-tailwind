import React from "react";
import {
  useCurrentPieceTurn,
  useValidPieceMoves,
} from "../context/OthelloContext";
import {
  Cell,
  CellPosition,
  comapreTwoCellPositions,
} from "../othelloLogic/board";

type BoardPieceProps = {
  cell: Cell;
};

// BoardPiece UI = empty | black | white | valid move hint

const BoardPiece = ({ cell }: BoardPieceProps) => {
  const currentPieceTurn = useCurrentPieceTurn();

  const validMovesForCurrentTurn = useValidPieceMoves(currentPieceTurn);

  let pieceUI = "";
  const basicPieceStyle = "rounded-full w-[85%] h-[85%]";

  if (cell.state === "empty") {
    if (
      validMovesForCurrentTurn &&
      isCellValidMove(cell, validMovesForCurrentTurn)
    ) {
      pieceUI = "border border-[#303030] opacity-60";
    }
  } else {
    pieceUI = cell.state === "black" ? "bg-black" : "bg-white";
  }

  function isCellValidMove(cell: CellPosition, validMoves: CellPosition[]) {
    return validMoves.find((move) => comapreTwoCellPositions(move, cell));
  }

  return (
    <>
      <div className={`${pieceUI} ${basicPieceStyle}`}></div>
    </>
  );
};

export default BoardPiece;
