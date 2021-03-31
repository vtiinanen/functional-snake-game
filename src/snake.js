const { rnd, modulo, pipe, head, dropLast, sEqual, some } = require("./helper");

const point = (x, y) => {
  return { x: x, y: y };
};

const direction = {
  NORTH: point(0, -1),
  SOUTH: point(0, 1),
  WEST: point(-1, 0),
  EAST: point(1, 0),
};

const initialState = {
  snake: [point(4, 3), point(3, 3), point(2, 3)],
  apple: point(5, 5),
  move: direction.EAST,
};

const randomPos = (pos) => rnd(0)(pos - 1);

const isValidMove = (direction, move) =>
  direction.x + move.x !== 0 && direction.y + move.y !== 0;

const addMove = (direction) => (state) => {
  const isValid = isValidMove(direction, state.move);
  const newState = { ...state, move: direction };
  return isValid ? newState : state;
};

const willCrash = (cols, rows, state) => {
  const coordNextHead = nextHead(cols)(rows)(state);
  const snake = state.snake;
  const snakeCollision = sEqual(coordNextHead);
  const result = some(snakeCollision)(snake);
  return result;
};

const nextHead = (cols) => (rows) => ({ move, snake }) => {
  return point(
    modulo(cols)(head(snake).x + move.x),
    modulo(rows)(head(snake).y + move.y)
  );
};

const willEat = sEqual;

const nextSnake = (cols) => (rows) => (state) => {
  const bWillCrash = willCrash(cols, rows, state);
  const coordNextHead = nextHead(cols)(rows)(state);
  const snake = state.snake;
  const apple = state.apple;
  const newState = {
    ...state,
    snake: willEat(coordNextHead)(apple)
      ? [coordNextHead, ...snake]
      : [coordNextHead, ...dropLast(1)(snake)],
  };
  return bWillCrash ? initialState : newState;
};

const nextApple = (cols) => (rows) => (state) => {
  const snake = state.snake;
  const apple = state.apple;
  const bWillEat = willEat(head(snake))(apple);
  const newState = { ...state, apple: point(randomPos(cols), randomPos(rows)) };
  return bWillEat ? newState : state;
};

const step = (cols) => (rows) => (state) =>
  pipe(nextSnake(cols)(rows), nextApple(cols)(rows))(state);

module.exports = { initialState, addMove, direction, step };
