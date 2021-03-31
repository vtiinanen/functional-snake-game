const {
  intercalate,
  update,
  pipe,
  repeat,
  dropFirst,
  head,
} = require("./helper");

const addSnake = (state) => {
  const snake = state.snake;
  const shead = head(snake);
  const sbody = dropFirst(1)(snake);
  const map = (fn) => (list) => list.map(fn);
  const addBodyParts = (pos) => update("x")(pos);
  const bodyUpdates = map(addBodyParts)(sbody);
  const addHead = update("O")(shead);
  return pipe(...bodyUpdates, addHead);
};

const addApple = (state) => {
  const apple = state.apple;
  return update("@")(apple);
};

const createWorld = (rows) => (columns) => (state) => {
  const repeatDot = repeat(".");
  const dotRows = repeatDot(rows);
  const dotCols = repeatDot(columns);
  const map = dotRows([]).map(() => dotCols([]));
  const mapWithStuff = pipe(addSnake(state), addApple(state))(map);
  return mapWithStuff;
};

const displayWorld = (matrix) => {
  insertSpace = intercalate(" ");
  insertLineBreak = intercalate("\r\n");
  str = insertLineBreak(matrix.map(insertSpace));
  console.clear();
  console.log(str);
};

const display = (rows) => (columns) => (state) => {
  return pipe(createWorld(rows)(columns), displayWorld)(state);
};

module.exports = {
  display,
};
