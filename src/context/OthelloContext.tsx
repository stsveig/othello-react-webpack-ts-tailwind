import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useMemo,
} from "react";

import {
  createInitialGameState,
  currentPieceTurn,
  GameState,
  getScore,
  getValidPieceMoves,
  isCurrentPieceTurn,
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

export function useCurrentPieceTurn() {
  const state = useOthelloGameState();

  return useMemo(() => {
    return currentPieceTurn(state.state);
  }, [state.state]);
}

export function useIsCurrentPieceTurn(piece: Piece) {
  const state = useOthelloGameState();

  return useMemo(() => {
    return isCurrentPieceTurn(state.state, piece);
  }, [piece, state.state]);
}

export function useValidPieceMoves(piece: Piece) {
  const state = useOthelloGameState();

  return useMemo(() => {
    return getValidPieceMoves(state.board, piece);
  }, [piece, state.board]);
}

export function usePieceScore(piece: Piece) {
  const state = useOthelloGameState();

  return useMemo(() => {
    return getScore(state.board, piece);
  }, [piece, state.board]);
}
