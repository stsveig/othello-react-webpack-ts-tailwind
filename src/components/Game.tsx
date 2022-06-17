import React from "react";

import Board from "./Board";
import { GameStats } from "./GameStats";

export function Game() {
  return (
    // <div className="flex flex-col items-center h-full">
    <div className="pt-2 grid grid-cols-2 gap-2">
      <GameStats piece="black" />
      <GameStats piece="white" />
      <Board />
    </div>
  );
}
