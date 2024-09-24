import { useState } from "react";
import { checkYAxis, fillBombs, getField } from "../lib/minefield";

export function useMinefield() {
  const [minefield, setMinefield] = useState(fillBombs(getField()));

  function open(row, col) {
    const field = [...minefield];

    field[row][col].isOpen = true;
    field[row][col].value = checkYAxis(minefield, row, col);

    setMinefield([...field]);
  }

  return {
    minefield,
    open,
  };
}
