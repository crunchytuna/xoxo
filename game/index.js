import { Map } from 'immutable';

const flip = function(turn) {
  if (turn === 'X') {
    return 'O';
  } else return 'X';
};

// action creator

export const move = (turn, position) => ({
  type: 'move',
  position: position,
  turn: turn,
});

function turnReducer(turn = 'X', action) {
  if (action.type === 'move') {
    return flip(turn);
  } else return turn;
}

function boardReducer(board = Map(), action) {
  if (action.type === 'move') return board.setIn(action.position, action.turn);
  return board;
}

const streak = (board, firstCoord, ...remainingCoords) => {
  let xCount = 0;
  let oCount = 0;
  const args = [firstCoord, ...remainingCoords];
  for (let i = 0; i < args.length; i++) {
    if (board.getIn(args[i]) === 'X') {
      xCount++;
      if (xCount === 3) return 'X';
    } else if (board.getIn(args[i]) === 'O') {
      oCount++;
      if (oCount === 3) return 'O';
    }
  }
  return undefined;
};

const winner = function(board) {
  let result = streak(board, [0, 0], [0, 1], [0, 2]);
  if (result) {
    return result;
  }

  result = streak(board, [1, 0], [1, 1], [1, 2]);
  if (result) {
    return result;
  }
  result = streak(board, [2, 0], [2, 1], [2, 2]);
  if (result) {
    return result;
  }
  result = streak(board, [0, 0], [1, 0], [2, 0]);
  if (result) {
    return result;
  }

  result = streak(board, [0, 1], [1, 1], [2, 1]);
  if (result) {
    return result;
  }

  result = streak(board, [0, 2], [1, 2], [2, 2]);
  if (result) {
    return result;
  }

  result = streak(board, [0, 0], [1, 1], [2, 2]);
  if (result) {
    return result;
  }
  result = streak(board, [0, 2], [1, 1], [2, 0]);
  if (result) {
    return result;
  }
  // console.log('hi im inside winner');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board.getIn([i, j])) {
        return null;
      }
    }
  }

  return 'draw';
};

export default function reducer(state = {}, action) {
  // console.log('hi, my names josh im in the reducer');
  const newBoard = boardReducer(state.board, action);
  // console.log('hi im inbetween new board and winnner state', newBoard);
  const winnerState = winner(newBoard);
  // console.log(winner(newBoard));
  return {
    board: newBoard,
    turn: turnReducer(state.turn, action),
    winner: winnerState,
  };
}
