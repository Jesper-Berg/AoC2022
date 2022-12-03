import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().split('\n');

const getPriority = (c) => {
  const val = c.charCodeAt(0) - 96;
  if (val > 0) return val;
  return val + 58;
};

const grouped = [];

for (let i = 0; i < input.length; i += 3) {
  grouped.push([input[i], input[i + 1], input[i + 2]]);
}

const findEqual = (first, second, third) => {
  for (const c of first) {
    if (second.includes(c)) {
      if (third.includes(c)) return c;
    }
  }
};

const equals = grouped.map((group) => findEqual(group[0], group[1], group[2]));

const summedPriority = equals.reduce(
  (partialSum, c) => partialSum + getPriority(c),
  0
);

console.log(summedPriority);
