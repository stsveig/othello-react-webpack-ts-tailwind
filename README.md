# Welcome to Othello App

## [live app](https://playothello.netlify.app/)

### Othello (a.k.a Reversi)

Othello is a strategy board game for two players played on an 8x8 board.

![current UI](currentUI.png)

[https://en.wikipedia.org/wiki/Reversi#Rules](https://en.wikipedia.org/wiki/Reversi#Rules)

[https://www.eothello.com/](https://www.eothello.com/)

### how to run

```
nvm use
npm i
npm start
```

### Cell

- Cell - row, col, state
- Cell Position - row, col
- Piece - "black" | "white"
- Cell State - Piece | “empty”

- offset (-1,0|-1,-1|-1,+1|…)

- addOffsetToPoint(cell, offset)
- subtractOffsetToPoint(cell, offset)

### Game & Board

- Team - WIP
- Board - Cell[][]
- Winner - Piece | "draw" | undefined
- Turn State - Piece Turn | "gameOver"
- Piece Turn - "whiteTurn" | "blackTurn"
- Valid Move - startPosition, endPosition, offset
- Game State - winner, board, whiteTeam, blackTeam, state, vanillaOthello

- class Game | React state with helper functions

- iterateOverCells(board, callBack) => void
- putInitialCellsToBoard(initialCells, initialBoard)
- createInitialBoard(rowLength, colLength, initialCells) => Board
- testOffsetForValidMove(board, cell, offset, otherPiece) => endPosition, cellsTested

- doesPieceHasValidMove(board, piece) => boolean
- getValidMovesForCell(cell, board, currentPieceTurn) => ValidMove[]
- isValidMove(piece, board, cellsTested, endPosition)
- isMoveWithinBoard(cellPosition, offset) => boolean

## Features

- [ ] login
- [x] pass turn
- [x] new game/reset
- [ ] Offline support
- [ ] custome size for the board
- [x] same machine human vs human

- [ ] team ? player[]
- [ ] player vs team | team vs team
- [ ] player ? [ human | bot(ai) | websocket ]
- [ ] turn time / max turn time

- [ ] Move history
- [ ] keyboard support
- [ ] Customize players | icons | users
- [ ] Local Storage (users, last game, history)

- [ ] audio ?
- [ ] best move, rank system for each cell… depends on the game ?
- [ ] random cells hiding things (good or bad, cancel the turn, flip disks with opponent color…), maybe not :)
- [ ]

## UI

### basic UI for playground

- [x] reset button
- [x] current turn
- [x] end game stats
- [x] next & prev buttons
- [x] hints for valid moves
- [x] Grid layout with board & pieces
- [ ]

### UI to Implement

- [x] valid box
- [x] Mouse click
- [x] pass button
- [x] non valid box
- [x] mobile support
  - [x] horizontal
  - [ ] vertical
- [x] menu for toggling Vanilla Othello
- [ ] Transition on the box’s when mouse over
- [ ] Icon | svg | emoji of each player piece ???
- [ ]

### raw thoughts

- [x] get legal moves | needs board & player
  - iterate through all cells
  - check to find legal moves
  - return them
- [x] is move legal | is legal move | move is legal :) needs position, board & player
  - We can put pieces in empty cells
  - Test **For** every direction(offset) **Of** offsets
    - check **If** step Is Legal With position & offset
      - continue → skip this direction if not a legal move
    - stepping one square from position towards offset (start count)
    - take a step in the same direction as long as it’s legal (inside the board and the pieces belongs to the opponent
      - step into the next cell and count++
    - **if** we **moved X steps** and the last cell belongs to og player → move is legal
  - no legal move is found in either direction → this move is illegal
- [x] is step legal | … needs position & offset
  - check for board edges
- [x] move | needs position, board, player
  - before calling this block, make sure you can move
  - similar to is move legal test **For** every direction(offset) **Of** offsets
    - check **If** step Is Legal With position & offset
      - continue → skip this direction if not a legal move
    - stepping one square from position towards offset (start count)
    - take a step in the same direction as long as it’s legal (inside the board and the pieces belongs to the opponent
      - step into the next cell and count++
    - **if** we **moved X steps** and the last cell belongs to the player who started the move
      - flip the row of legal move
- [x] Lets PLAY
  - set board
  - set first player
  - game is **ON**…
  - check for legal moves of the player on board
    - **if** no legal move → switch player
  - **if** none of the player can’t make a legal move → game is over
  - get new move position from player (human, AI, server,…)
  - make the move
  - turn switch (player)
- [x] get score
