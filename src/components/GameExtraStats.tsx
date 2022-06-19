import React from "react";
import { useOthelloGameState } from "../context/OthelloContext";
import { GameMenu } from "./GameMenu";

const basicStyle =
  "inline-flex justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

export const GameExtraStats: React.FunctionComponent = () => {
  const { game } = useOthelloGameState();

  return (
    <>
      <div className="col-span-2 bg-[#303030] py-3 flex flex-col items-center rounded-md h-32 relative">
        <div className="flex">
          <button type="button" className={basicStyle}>
            Prev
          </button>
          <button type="button" className={`${basicStyle} mx-2`}>
            Reset
          </button>
          <button type="button" className={basicStyle}>
            Next
          </button>
          {/* <div className="absolute top-[10px] right-2 flex items-center justify-center">
            <button
              type="button"
              // onClick={openModal}
              className="transform rotate-90 aspect-square rounded-md bg-[#222] bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              |||
            </button>
          </div> */}
        </div>
        <div className="flex h-full items-center">
          <div className="text-white">Sorry, No valid moves 3..2..1..</div>
        </div>
      </div>
      <GameMenu />
    </>
  );
};
