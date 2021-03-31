const { display } = require("./src/ui");
const { initialState, step, direction, addMove } = require("./src/snake");
const readline = require("readline");

const COLUMNS = 15;
const ROWS = 15;
const SPEED = 125;

let mState = initialState;

const setupInput = () => {
  readline.emitKeypressEvents(process.stdin);

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  process.stdin.on("keypress", (_, key) => {
    if (key.ctrl && key.name === "c") process.exit();

    const options = {
      UP: addMove(direction.NORTH),
      LEFT: addMove(direction.WEST),
      DOWN: addMove(direction.SOUTH),
      RIGHT: addMove(direction.EAST),
    };

    const move = options[key.name.toUpperCase()];
    mState = (move == null) ? mState : move(mState);
  });
};

const renderGame = display(COLUMNS)(ROWS);
const nextState = step(COLUMNS)(ROWS);

const runGameLoop = () => {
  setInterval(() => {
    renderGame(mState);
    mState = nextState(mState);
  }, SPEED);
};

setupInput();
runGameLoop();
