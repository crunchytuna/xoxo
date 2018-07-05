import { Map } from 'immutable';
let board = Map();

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

export default function reducer(state = { board: board, turn: 'X' }, action) {
  if (action.type === 'move') {
    return {
      board: state.board.setIn(action.position, action.turn),
      turn: flip(state.turn),
    };
  } else return state;
}


const streak = (board, firstCoord, ...remainingCoords) => {
  let xCount = 0;
  let oCount = 0;

  for (let i = 1; i < arguments.length; i++) {
    if (board.getIn(arguments[i]) === 'X') {
      xCount++;
      if (xCount === 3) return 'X';
    } else if (board.getIn(arguments[i]) === 'O') {
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

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; i++) {
      if (board.hasIn([i][j]) === null) {
        return null;
      }
    }
  }


  return 'draw'

};
