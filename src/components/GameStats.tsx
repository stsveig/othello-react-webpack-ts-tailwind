import React from "react";
import {
  useIsCurrentPieceTurn,
  usePieceScore,
} from "../context/OthelloContext";
import { Piece } from "../othelloLogic/board";

type GameStatsPorps = {
  piece: Piece;
};

export const GameStats: React.FunctionComponent<GameStatsPorps> = ({
  piece,
}) => {
  const isMyTurn = useIsCurrentPieceTurn(piece);
  const myScore = usePieceScore(piece);

  return (
    <div className="bg-[#303030] rounded-md flex items-center h-32 relative">
      <div className={`bg-${piece} ml-[35%] rounded-full w-12 h-12`}></div>
      <div className="ml-4 text-slate-200 text-3xl ">{myScore}</div>
      <div
        className={`${
          isMyTurn ? "" : "hidden"
        } bg-sky-600 rounded-full px-1 text-xs absolute bottom-1 left-[35%]`}
      >
        Your turn
      </div>
    </div>
  );
};
