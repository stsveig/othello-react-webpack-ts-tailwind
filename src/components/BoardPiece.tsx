import React from "react";
import { Transition } from "@headlessui/react";
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
  const { game, applyMovesToBoard } = useOthelloGameState();
  const currentPieceTurn = useCurrentPieceTurn();

  const validMoves: ValidMove[] = getValidMovesForCell(
    cell,
    game.board,
    currentPieceTurn
  );

  let pieceStyle = "";
  const basicPieceStyle = "rounded-full w-[85%] h-[85%]";

  if (cell.state === "empty") {
    if (validMoves.length) {
      pieceStyle = "border border-[#303030] opacity-60 cursor-pointer";
    }
  } else {
    pieceStyle = cell.state === "black" ? "bg-black" : "bg-white";
  }

  function handleCellClick(cell: Cell) {
    if (game.state !== "gameOver") {
      if (validMoves.length) {
        applyMovesToBoard(validMoves);
      } else {
        console.log("no valid moves");
      }
    }
  }

  return (
    <>
      <div
        className="bg-green-600 w-full  aspect-square flex items-center justify-center"
        onClick={() => handleCellClick(cell)}
      >
        <Transition
          as="div"
          show={
            cell.state === "black" ||
            cell.state === "white" ||
            cell.state === "empty"
          }
          enter="transition duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={`${basicPieceStyle} ${pieceStyle}`}
        ></Transition>
      </div>
    </>
  );
};

export default BoardPiece;
