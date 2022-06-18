import React from "react";
import { useOthelloGameState } from "../context/OthelloContext";

import BoardPiece from "./BoardPiece";

const Board: React.FunctionComponent = () => {
  const gameState = useOthelloGameState();

  return (
    <div
      className={`col-span-2 grid grid-cols-[repeat(8,_1fr)] max-h-full w-full aspect-square gap-[1px] select-none`}
    >
      {gameState.board.map((row) => {
        return row.map((cell) => {
          return <BoardPiece key={`${cell.row}-${cell.col}`} cell={cell} />;
        });
      })}
    </div>
  );
};

export default Board;
