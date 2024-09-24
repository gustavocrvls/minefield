function getField() {
  return Array(5)
    .fill()
    .map(() =>
      Array(5)
        .fill()
        .map(
          () =>
            new Object({
              isMine: false,
              isOpen: false,
              value: 0,
            })
        )
    );
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getBombPosition(min, max) {
  return Math.floor(random(min, max)) - 1;
}

// check rows
function checkYAxis(minefield, y, x) {
  return minefield.slice(y - 1 > 0 ? y - 1 : 0, y + 2).reduce((acc, curr) => {
    acc += checkXAxis(curr, x);
    return acc;
  }, 0);
}

// check columns
function checkXAxis(minefieldRow = [], x) {
  return minefieldRow
    .slice(x - 1 > 0 ? x - 1 : 0, x + 2)
    .filter((y) => y.isMine).length;
}

function fillBombs(field = [[]]) {
  const minefield = field.map((row) => {
    const bombPosition = getBombPosition(0, 5);

    if (bombPosition < 0) {
      return row;
    }

    const newRow = [...row];
    newRow[bombPosition].isMine = true;

    return newRow;
  });

  return minefield;
}

export { checkYAxis, fillBombs, getField };
