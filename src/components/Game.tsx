import React from "react";

import { useOthelloGameState } from "../context/OthelloContext";
import Board from "./Board";
import { GameStats } from "./GameStats";

export function Game() {
  const gameState = useOthelloGameState();
  console.log(gameState);

  return (
    <div className="bg-emerald-900 flex flex-col items-center h-full">
      <GameStats />
      <Board />
    </div>
  );
}
