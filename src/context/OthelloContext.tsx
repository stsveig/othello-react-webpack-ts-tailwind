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
  getValidPieceMoves,
} from "../othelloLogic";
import { Piece } from "../othelloLogic/board";

const ROW_LENGTH = 8;
const COL_LENGTH = 8;

const OthelloContext = createContext<GameState | undefined>(undefined);

export function OthelloProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState(() =>
    createInitialGameState(ROW_LENGTH, COL_LENGTH)
  );

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

export function useValidPieceMoves(piece: Piece) {
  const state = useOthelloGameState();

  return useMemo(() => {
    getValidPieceMoves(state.board, piece);
  }, [piece, state.board]);
}

export function usePieceScore(piece: Piece) {
  const state = useOthelloGameState();

  return useMemo(() => {
    getScore(state.board, piece);
  }, [piece, state.board]);
}
