import './App.css'
import { useMinefield } from './hooks/useMinefield'

function App() {
  const { field } = useMinefield();

  return (
    <div>
      Minefield!
      {field.map((row, index) => (
        <div key={`row-${index}`} style={{display: 'flex'}}>
          {row.map((col, colIndex) => (
            <div  key={`row-${colIndex}`}>
              <button></button>
            </div>
          )) }
        </div>
      ))}
    </div>
  )
}

export default App
