import React from "react";
import { useOthelloGameState } from "../context/OthelloContext";
import { GameMenu } from "./GameMenu";

const basicStyle =
  "inline-flex justify-center rounded-md border border-transparent bg-sky-600 mx-1 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

export const GameExtraStats: React.FunctionComponent = () => {
  const { resetGame, passMyTurn } = useOthelloGameState();

  return (
    <>
      <div className="col-span-2 bg-[#303030] py-3 flex flex-col items-center rounded-md h-32 relative">
        <div className="flex">
          <button type="button" className={basicStyle}>
            Prev
          </button>
          <button
            type="button"
            onClick={() => resetGame()}
            className={`${basicStyle}`}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => passMyTurn()}
            className={`${basicStyle}`}
          >
            Pass
          </button>
          <button type="button" className={basicStyle}>
            Next
          </button>
        </div>
        <div className="flex h-full items-center">
          <div className="text-white text-opacity-50">
            a minute to learn, a lifetime to master
          </div>
        </div>
      </div>
      <GameMenu />
    </>
  );
};
