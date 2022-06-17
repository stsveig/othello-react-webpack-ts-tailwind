import React from "react";
import { Cell } from "../othelloLogic/board";

type BoardPieceProps = {
  cell: Cell;
};

const BoardPiece = ({ cell }: BoardPieceProps) => {
  let pieceColor = "";
  if (cell.state === "empty") {
    //
  } else {
    pieceColor = cell.state === "black" ? "bg-black" : "bg-white";
  }

  return (
    <>
      <div className={`${pieceColor} rounded-full w-[90%] h-[90%]`}></div>
    </>
  );
};

export default BoardPiece;
