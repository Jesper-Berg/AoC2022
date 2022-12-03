import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((pack) => [
    pack.substring(0, pack.length / 2),
    pack.substring(pack.length / 2),
  ]);

const getPriority = (c) => {
  const val = c.charCodeAt(0) - 96;
  if (val > 0) return val;
  return val + 58;
};

const findEqual = (first, second) => {
  for (const item of first) {
    if (second.includes(item)) return item;
  }
};

const equals = input.map((pack) => findEqual(pack[0], pack[1]));

const summedPriority = equals.reduce(
  (partialSum, c) => partialSum + getPriority(c),
  0
);

console.log(summedPriority);
