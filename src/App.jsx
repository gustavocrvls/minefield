import "./App.css";
import { useMinefield } from "./hooks/useMinefield";

function App() {
  const { minefield, open } = useMinefield();

  return (
    <div>
      <h1>Minefield!</h1>
      <div className="field">
        {minefield.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: "flex" }}>
            {row.map((col, colIndex) => (
              <div key={`col-${rowIndex}---${colIndex}`} className="cell">
                <button
                  onClick={() => open(rowIndex, colIndex)}
                  style={col.isMine && col.isOpen ? { background: "red" } : {}}
                  className={
                    (col.isOpen ? "isOpen" : "") +
                    (col.isOpen && col.isMine ? " isMine" : "")
                  }
                >
                  {col.isOpen && (
                    <span>
                      {col.isMine ? "*" : col.value === 0 ? "" : col.value}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
