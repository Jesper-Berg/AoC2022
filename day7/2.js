import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().split('\n').slice(1);

class Node {
  constructor(name, parent, depth = 1, size = null) {
    this.name = name;
    this.size = size;
    this.parent = parent;
    this.children = [];
    this.depth = depth;
  }

  isDir() {
    return this.children.length !== 0;
  }

  sumSmallSize() {
    return (
      (this.size <= 100000 && this.isDir() ? this.size : 0) +
      this.children
        .map((child) => child.sumSmallSize())
        .reduce((partialSum, curr) => partialSum + curr, 0)
    );
  }

  calculateSize() {
    if (this.size) return this.size;
    this.size = this.children
      .map((child) => child.calculateSize())
      .reduce((partialSum, curr) => partialSum + curr, 0);
    return this.size;
  }

  toString() {
    return `- ${this.name} (${this.isDir() ? 'dir' : 'file'}${
      this.size ? `, size=${this.size}` : ''
    })${this.children.map(
      (child) => `\n${''.padEnd(this.depth * 2)}${child.toString()}`
    )}`;
  }

  getDirs() {
    const dirs = [];
    if (this.isDir()) dirs.push(this.size);
    dirs.push(...this.children.map((child) => child.getDirs()));
    return dirs.flat();
  }
}

class Tree {
  constructor(name) {
    this.root = new Node(name, null);
  }

  toString() {
    return this.root.toString();
  }
}

const dirTree = new Tree('/');
let currentDir = dirTree.root;

const handleInstruction = (instruction) => {
  const splitInstruction = instruction.split(' ');
  if (instruction.includes('$')) {
    if (instruction.includes('ls')) return;
    if (instruction.includes('..')) {
      currentDir = currentDir.parent;
      return;
    }
    currentDir = currentDir.children.find(
      (child) => child.name === splitInstruction[2]
    );
    return;
  }
  let newNode;
  if (instruction.includes('dir')) {
    newNode = new Node(splitInstruction[1], currentDir, currentDir.depth + 1);
  } else {
    newNode = new Node(
      splitInstruction[1],
      currentDir,
      currentDir.depth + 1,
      parseInt(splitInstruction[0])
    );
  }
  currentDir.children.push(newNode);
};

input.forEach((instruction) => {
  handleInstruction(instruction);
});

dirTree.root.calculateSize();

const dirSizes = dirTree.root.getDirs().sort((a, b) => a - b);

console.log(dirSizes.find((size) => size > dirTree.root.size - 40000000));
