import React from "react";
import { Transition } from "@headlessui/react";
import { useOthelloGameState } from "../context/OthelloContext";
import { getPieceFromTurnState, getValidMovesForCell } from "../othelloLogic";
import { Cell, ValidMove } from "../othelloLogic/board";

type BoardPieceProps = {
  cell: Cell;
};

const BoardPiece = ({ cell }: BoardPieceProps) => {
  const { game, applyMovesToBoard } = useOthelloGameState();
  let validMoves: ValidMove[] = [];

  if (game.state !== "gameOver") {
    validMoves = getValidMovesForCell(
      cell,
      game.board,
      getPieceFromTurnState(game.state)
    );
  }

  let pieceStyle = "";
  const basicPieceStyle = "rounded-full w-[85%] h-[85%]";

  if (cell.state === "empty") {
    if (validMoves.length) {
      pieceStyle = "border border-[#303030] opacity-60 cursor-pointer";
    }
  } else {
    pieceStyle = cell.state === "black" ? "bg-black" : "bg-white";
  }

  function handleCellClick() {
    if (game.state !== "gameOver" && validMoves.length) {
      applyMovesToBoard(validMoves);
    }
  }

  return (
    <>
      <div
        className="bg-green-600 w-full  aspect-square flex items-center justify-center"
        onClick={() => handleCellClick()}
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
