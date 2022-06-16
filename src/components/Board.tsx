import React from "react";
import { useOthelloGameState } from "../context/OthelloContext";
import { Cell } from "../othelloLogic/board";

import BoardPiece from "./BoardPiece";

const Board: React.FunctionComponent = () => {
  const gameState = useOthelloGameState();

  function handleCellClick(cell: Cell) {
    console.log(cell);
  }

  return (
    <div
      // place-items-center
      // aspect-square items-center justify-center
      className={`bg-neutral-700 grid grid-cols-[repeat(8,_1fr)] max-h-full w-full aspect-square gap-1 select-none`}
    >
      {gameState.board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              id={`${rowIndex}-${colIndex}`}
              // place-items-center
              // items-center justify-center
              className="bg-green-600 hover:bg-green-500 cursor-pointer aspect-square"
              onClick={() => handleCellClick(cell)}
            >
              <BoardPiece cell={cell} />
            </div>
          );
        });
      })}
    </div>
  );
};

export default Board;
