import React from "react";

import Board from "./Board";
import { GameExtraStats } from "./GameExtraStats";
import { GameStats } from "./GameStats";

export function Game() {
  return (
    <div className="relative pt-2 grid grid-cols-2 gap-2">
      <GameStats piece="black" />
      <GameStats piece="white" />
      <Board />
      <GameExtraStats />
    </div>
  );
}
