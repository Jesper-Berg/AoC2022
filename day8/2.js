import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().split('\n');

const grid = input.map((row) =>
  row.split('').map((tree) => ({
    height: tree,
    score: undefined,
  }))
);

const checkRight = (height, row, col) => {
  let score = 0;
  while (++col < grid[row].length) {
    score++;
    if (height <= grid[row][col].height) break;
  }
  return score;
};

const checkLeft = (height, row, col) => {
  let score = 0;
  while (--col > -1) {
    score++;
    if (height <= grid[row][col].height) break;
  }
  return score;
};

const checkUp = (height, row, col) => {
  let score = 0;
  while (--row > -1) {
    score++;
    if (height <= grid[row][col].height) break;
  }
  return score;
};

const checkDown = (height, row, col) => {
  let score = 0;
  while (++row < grid.length) {
    score++;
    if (height <= grid[row][col].height) break;
  }
  return score;
};

const getScore = (height, row, col) => {
  return (
    checkRight(height, row, col) *
    checkLeft(height, row, col) *
    checkUp(height, row, col) *
    checkDown(height, row, col)
  );
};

grid.forEach((treeRow, row) =>
  treeRow.forEach((tree, col) => (tree.score = getScore(tree.height, row, col)))
);

console.log(Math.max(...grid.flatMap((row) => row.map((tree) => tree.score))));
