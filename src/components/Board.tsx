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
      className={` grid grid-cols-[repeat(8,_1fr)] max-h-full w-full aspect-square gap-[1px] select-none`}
    >
      {gameState.board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              id={`${rowIndex}-${colIndex}`}
              className="bg-green-600 hover:bg-green-500 w-full cursor-pointer aspect-square"
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
