import React, { useState } from "react";
import { useOthelloGameState } from "../context/OthelloContext";
import { Cell } from "../othelloLogic/board";

import BoardPiece from "./BoardPiece";

const Board: React.FunctionComponent = () => {
  const gameState = useOthelloGameState();

  function handleCellClick(cell: Cell) {
    console.log(cell);
  }

  return (
    <div className="">
      <div
        // place-items-center
        // items-center justify-center
        className={`bg-neutral-700 grid grid-cols-[repeat(8,_1fr)] gap-1 place-items-center aspect-square max-h-screen mx-auto max-w-lg select-none`}
      >
        {gameState.board.map((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                id={`${rowIndex}-${colIndex}`}
                // place-items-center
                // items-center justify-center
                className="bg-green-600 hover:bg-green-500 w-full h-full cursor-pointer "
                onClick={() => handleCellClick(cell)}
              >
                <BoardPiece cell={cell} />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Board;
