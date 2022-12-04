import fs from 'fs';

const input = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map((pair) =>
    pair
      .split(',')
      .map((section) => section.split('-').map((strNum) => parseInt(strNum)))
  );

const overlapCount = input.reduce(
  (count, pair) =>
    count +
    !!(
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
      (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][0])
    ),
  0
);

console.log(overlapCount);
