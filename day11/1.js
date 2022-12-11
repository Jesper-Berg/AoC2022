import fs from 'fs';

const input = fs.readFileSync('./input.txt').toString().split('\n\n');

class Monkey {
  constructor(
    index,
    items,
    operation,
    testNum,
    trueMonkeyIndex,
    falseMonkeyIndex
  ) {
    this.index = index;
    this.items = items;
    this.operation = operation;
    this.testNum = testNum;
    this.trueMonkeyIndex = trueMonkeyIndex;
    this.falseMonkeyIndex = falseMonkeyIndex;
    this.inspected = 0;
  }

  printMonkey(small = true) {
    const monkey = {
      index: this.index,
      items: this.items,
      inspected: this.inspected,
    };
    if (small) console.log(monkey);
    else
      console.log({
        ...monkey,
        operation: this.operation,
        testNum: this.testNum,
        trueMonkeyIndex: this.trueMonkeyIndex,
        falseMonkeyIndex: this.falseMonkeyIndex,
      });
  }

  throwItems() {
    this.items.forEach((item) => {
      const old = item;
      let newWorry;
      eval(this.operation);
      newWorry = Math.floor(newWorry / 3);
      const isDivisible = !(newWorry % this.testNum);
      if (isDivisible) monkeys[this.trueMonkeyIndex].items.push(newWorry);
      else monkeys[this.falseMonkeyIndex].items.push(newWorry);
      this.inspected++;
    });
    this.items = [];
  }
}

const monkeys = input.map((monkey) => {
  const digitRegex = /(\d+)/g;
  const monkeyLine = monkey.split('\n');
  const index = parseInt(monkeyLine[0].match(digitRegex)[0]);
  const items = monkeyLine[1]
    .match(digitRegex)
    .map((numStr) => parseInt(numStr));
  const operation = `newWorry${monkeyLine[2]
    .split('Operation: ')[1]
    .substring(3)}`;
  const testNum = parseInt(monkeyLine[3].match(digitRegex)[0]);
  const trueMonkeyIndex = parseInt(monkeyLine[4].match(digitRegex)[0]);
  const falseMonkeyIndex = parseInt(monkeyLine[5].match(digitRegex)[0]);
  return new Monkey(
    index,
    items,
    operation,
    testNum,
    trueMonkeyIndex,
    falseMonkeyIndex
  );
});

for (let i = 1; i <= 20; i++) {
  monkeys.forEach((monkey) => monkey.throwItems());
}

const sorted = monkeys.map((monkey) => monkey.inspected).sort((a, b) => b - a);

console.log(sorted[0] * sorted[1]);
