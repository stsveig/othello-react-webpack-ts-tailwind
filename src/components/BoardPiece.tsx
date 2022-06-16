import React from "react";
import { Cell } from "../othelloLogic/board";

type BoardPieceProps = {
  cell: Cell;
};

const BoardPiece = ({ cell }: BoardPieceProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${cell.state === "empty" ? "opacity-0" : ""} `}
      viewBox="0 0 20 20"
      fill={cell.state}
    >
      <circle cx="10" cy="10" r="9" />
    </svg>
  );
};

export default BoardPiece;
