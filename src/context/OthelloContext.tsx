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
  doesTeamHaveValidMove,
  GameState,
  getOtherPiece,
  getScore,
  isCurrentPieceTurn,
} from "../othelloLogic";
import {
  CellPosition,
  MoveDirection,
  Piece,
  ValidMove,
} from "../othelloLogic/board";

export const ROW_LENGTH = 8;
export const COL_LENGTH = 8;

type OthelloContext = {
  game: GameState;
  applyMovesToBoard: (validMoves: ValidMove[]) => void;
};

const OthelloContext = createContext<OthelloContext | undefined>(undefined);

export function OthelloProvider({ children }: PropsWithChildren) {
  const [game, setGame] = useState(() =>
    createInitialGameState(ROW_LENGTH, COL_LENGTH)
  );

  // gameover
  // 1 - both players dont have a move
  // 2 - all the cells not empty

  // no valid moves to current player

  function applyMovesToBoard(validMoves: ValidMove[]) {
    const currentPiece = currentPieceTurn(game.state);

    if (currentPiece === "gameOver") return;

    const newBoard = [...game.board];

    validMoves.forEach(({ startPosition, endPosition, offset }) => {
      while (
        startPosition.row !== endPosition.row ||
        startPosition.col !== endPosition.col
      ) {
        newBoard[startPosition.row] = [...game.board[startPosition.row]];
        newBoard[startPosition.row][startPosition.col].state = currentPiece;
        startPosition.col += offset.col;
        startPosition.row += offset.row;
      }
    });

    // [] check if the other player have a valid move
    if (doesTeamHaveValidMove(newBoard, getOtherPiece(currentPiece))) {
      // found a valid move make the switch
    } else {
      // [] if not show a msg ?
      // [] check if current player have a valid move

      if (doesTeamHaveValidMove(newBoard, currentPiece)) {
        // found a valid move make the switch
      }
    }
    // no valid move for both player gameover

    setGame({ ...game, board: newBoard });
  }

  function switchTurn() {
    if (game.state === "gameOver") {
      setGame((prevGame) => ({
        ...prevGame,
        state: "gameOver",
      }));
    } else {
      const newTurnState =
        game.state === "blackTurn" ? "whiteTurn" : "blackTurn";
      setGame((prevGame) => ({
        ...prevGame,
        state: newTurnState,
      }));
    }
  }

  return (
    <OthelloContext.Provider
      value={{
        game,
        applyMovesToBoard,
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

//
export function useCurrentPieceTurn() {
  const { game } = useOthelloGameState();

  return useMemo(() => {
    return currentPieceTurn(game.state);
  }, [game.state]);
}

// not exp
export function useIsCurrentPieceTurn(piece: Piece) {
  const { game } = useOthelloGameState();

  return useMemo(() => {
    return isCurrentPieceTurn(game.state, piece);
  }, [game.state, piece]);
}

// expensive
export function usePieceScore(piece: Piece) {
  const { game } = useOthelloGameState();

  return useMemo(() => {
    return getScore(game.board, piece);
  }, [game.board, piece]);
}
