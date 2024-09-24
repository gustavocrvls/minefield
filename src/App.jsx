import './App.css'
import { useMinefield } from './hooks/useMinefield'

function App() {
  const { minefield } = useMinefield();

  console.log(minefield);

  return (
    <div>
      Minefield!
      {minefield.map((row, index) => (
        <div key={`row-${index}`} style={{display: 'flex'}}>
          {row.map((col, colIndex) => (
            <div  key={`row-${colIndex}`}>
              <button>{col}</button>
            </div>
          )) }
        </div>
      ))}
    </div>
  )
}

export default App
