import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useMemo,
} from "react";

import {
  createInitialGameState,
  GameState,
  getScore,
  Piece,
} from "../othelloLogic";

const OthelloContext = createContext<GameState | undefined>(undefined);

export function OthelloProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState(createInitialGameState);

  return (
    <OthelloContext.Provider value={game}>{children}</OthelloContext.Provider>
  );
}

export function useOthelloGameState() {
  const value = useContext(OthelloContext);

  if (!value) {
    throw new Error("YOU DIDNT USE THE PROVIDER");
  }

  return value;
}

export function usePieceScore(piece: Piece) {
  const state = useOthelloGameState();

  return useMemo(() => {
    getScore(state.board, piece);
  }, [piece, state.board]);
}
