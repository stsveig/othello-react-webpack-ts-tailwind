import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useMemo,
} from "react";

import {
  createInitialGameState,
  getPieceFromTurnState,
  doesPieceHasValidMove,
  GameState,
  getOtherPlayer,
  getScore,
  isCurrentPieceTurn,
  PieceTurn,
} from "../othelloLogic";
import { Cell, Piece, ValidMove } from "../othelloLogic/board";

export const ROW_LENGTH = 8;
export const COL_LENGTH = 8;

type OthelloContext = {
  game: GameState;
  resetGame: () => void;
  passMyTurn: () => void;
  toggleVanillaOthello: () => void;
  applyMovesToBoard: (validMoves: ValidMove[]) => void;
};

const OthelloContext = createContext<OthelloContext | undefined>(undefined);

export function OthelloProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState(() =>
    createInitialGameState(ROW_LENGTH, COL_LENGTH)
  );

  function applyMovesToBoard(validMoves: ValidMove[]) {
    if (game.state !== "gameOver") {
      const turnState = game.state;
      const newBoard = [...game.board];

      makeTheFlip(validMoves, newBoard, turnState);

      if (doesPlayerHaveValidMove(newBoard, getOtherPlayer(turnState))) {
        setGame((prevGame) => {
          return {
            ...prevGame,
            board: newBoard,
            state: getOtherPlayer(turnState),
          };
        });
        // no valid moves to other player, turn goes back to current player
      } else if (doesPlayerHaveValidMove(newBoard, turnState)) {
        setGame((prevGame) => {
          return {
            ...prevGame,
            board: newBoard,
            state: turnState,
          };
        });
      } else {
        gameOver(newBoard);
      }
    }
  }

  function makeTheFlip(
    validMoves: ValidMove[],
    newBoard: Cell[][],
    turnState: PieceTurn
  ) {
    validMoves.forEach(({ startPosition, endPosition, offset }) => {
      while (
        startPosition.row !== endPosition.row ||
        startPosition.col !== endPosition.col
      ) {
        newBoard[startPosition.row] = [...game.board[startPosition.row]];
        newBoard[startPosition.row][startPosition.col].state =
          getPieceFromTurnState(turnState);
        startPosition.col += offset.col;
        startPosition.row += offset.row;
      }
    });
  }

  function doesPlayerHaveValidMove(
    newBoard: Cell[][],
    turnState: PieceTurn
  ): boolean {
    return doesPieceHasValidMove(newBoard, getPieceFromTurnState(turnState));
  }

  function gameOver(board: Cell[][]) {
    setGame({ ...game, board: board, state: "gameOver" });
  }

  function resetGame() {
    setGame(createInitialGameState(ROW_LENGTH, COL_LENGTH));
  }

  function passMyTurn() {
    if (game.state !== "gameOver")
      setGame({ ...game, state: getOtherPlayer(game.state) });
  }

  function toggleVanillaOthello() {
    setGame({ ...game, vanillaOthello: !game.vanillaOthello });
  }

  return (
    <OthelloContext.Provider
      value={{
        game,
        resetGame,
        passMyTurn,
        applyMovesToBoard,
        toggleVanillaOthello,
      }}
    >
      {children}
    </OthelloContext.Provider>
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
  const { game } = useOthelloGameState();

  return useMemo(() => {
    return getScore(game.board, piece);
  }, [game.board, piece]);
}

export function useWinner() {
  let winner: Piece | "draw";
  const scoreBlack = usePieceScore("black");
  const scoreWhite = usePieceScore("white");

  if (scoreBlack === scoreWhite) {
    return "draw";
  } else {
    winner = scoreBlack > scoreWhite ? "black" : "white";
  }

  return winner;
}

export function useIsCurrentPieceTurn(piece: Piece) {
  const { game } = useOthelloGameState();

  return useMemo(() => {
    return isCurrentPieceTurn(game.state, piece);
  }, [game.state, piece]);
}
