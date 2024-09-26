import { useState } from "react";
import { openRow, startField } from "../lib/minefield";

const FIELD_SIZE = 9;

export function useMinefield() {
  const [minefield, setMinefield] = useState(startField(FIELD_SIZE));

  function open(row, col) {
    let field = [...minefield];

    console.log(row, col);

    openRow(field, row, col);

    setMinefield([...field]);
  }

  return {
    minefield,
    open,
  };
}
