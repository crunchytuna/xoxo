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
  // TODO
  if (action.type === 'move') {
    return {
      board: state.board.setIn(action.position, action.turn),
      turn: flip(state.turn),
    };
  } else return state;
}

// const winner = function () {
//   streak(00,01,02)
//   streak(10,11,12)

// }
