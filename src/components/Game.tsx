import React from "react";

import { useOthelloGameState } from "../context/OthelloContext";
import Board from "./Board";

export function Game() {
  const gameState = useOthelloGameState();
  console.log(gameState);

  return (
    <div>
      <Board />
    </div>
  );
}
