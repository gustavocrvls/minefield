const field = Array(5)
  .fill()
  .map(() => Array(5).fill());

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getBombPosition(min, max) {
  return Math.floor(random(min, max)) - 1;
}

function fillBombs(field = [[]]) {
  const minefield = field.map((row) => {
    const bombPosition = getBombPosition(0, 5);

    if (bombPosition < 0) {
      return row;
    }

    const newRow = [...row];
    newRow[bombPosition] = "bomb";

    return newRow;
  });

  return minefield;
}

export { field, fillBombs };
