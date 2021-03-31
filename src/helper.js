const modulo = (x) => (y) => ((y % x) + x) % x;
const add = (x) => (y) => x + y;
const inc = add(1);
const subs = (x) => (y) => x - y;
const diff = (x) => (y) => y - x;
const rnd = (min) => (max) => Math.floor(Math.random() * max) + min;
const equals = (x) => (y) => x === y;

const compose = (...funcs) => (args) => {
  return funcs.reduceRight((arg, fn) => fn(arg), args);
};

const pipe = (...funcs) => (args) => funcs.reduce((arg, fn) => fn(arg), args);

const update = (str) => (pos) => (matrix) => {
  matrix[pos.y][pos.x] = str;
  return [...matrix];
};

const repeat = (item) => (n) => (list) => {
  return n < 1 ? list : repeat(item)(n - 1)([...list, item]);
};

const intercalate = (str) => (xs) => xs.join(str);

const head = (list) => list[0];
const find = (fn) => (list) => list.find(fn);
const some = (fn) => (list) => list.some(fn);
const dropLast = (n) => (list) => list.slice(0, list.length - n);
const dropFirst = (n) => (list) => list.slice(n, list.length);

const sEqual = (object1) => (object2) => {
  /*
   *   Shallow Equality
   */
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

module.exports = {
  modulo,
  rnd,
  intercalate,
  update,
  add,
  subs,
  inc,
  diff,
  compose,
  pipe,
  repeat,
  equals,
  head,
  find,
  dropLast,
  dropFirst,
  sEqual,
  some,
};
