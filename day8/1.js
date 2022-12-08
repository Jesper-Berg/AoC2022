import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().split('\n');

const grid = input.map((row) =>
  row.split('').map((tree) => ({
    height: tree,
    visible: undefined,
  }))
);

const checkRight = (height, row, col) => {
  while (++col < grid[row].length)
    if (height <= grid[row][col].height) return false;
  return true;
};

const checkLeft = (height, row, col) => {
  while (--col > -1) if (height <= grid[row][col].height) return false;
  return true;
};

const checkUp = (height, row, col) => {
  while (--row > -1) if (height <= grid[row][col].height) return false;
  return true;
};

const checkDown = (height, row, col) => {
  while (++row < grid.length) if (height <= grid[row][col].height) return false;
  return true;
};

const isVisible = (height, row, col) => {
  return (
    row === 0 ||
    col === 0 ||
    row === grid.length - 1 ||
    col === grid[0].length - 1 ||
    checkRight(height, row, col) ||
    checkLeft(height, row, col) ||
    checkUp(height, row, col) ||
    checkDown(height, row, col)
  );
};

grid.forEach((treeRow, row) =>
  treeRow.forEach(
    (tree, col) => (tree.visible = isVisible(tree.height, row, col))
  )
);

console.log(
  grid
    .map((row) =>
      row.reduce((partialSum, tree) => partialSum + !!tree.visible, 0)
    )
    .reduce((partialSum, curr) => partialSum + curr, 0)
);
