import "./App.css";
import { useMinefield } from "./hooks/useMinefield";

function App() {
  const { minefield, open } = useMinefield();

  return (
    <div>
      Minefield!
      {minefield.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} style={{ display: "flex" }}>
          {row.map((col, colIndex) => (
            <div key={`row-${colIndex}`}>
              <button
                onClick={() => open(rowIndex, colIndex)}
                style={col.isMine && col.isOpen ? { background: "red" } : {}}
              >
                {col.isOpen && <span>{col.isMine ? "*" : col.value}</span>}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
