import { useState } from 'react'
import './App.css'
import Portal from './components/Portal'
import TriviaPage from './components/TriviaPage'

const apiUrl = 'https://opentdb.com/api.php?amount=5'

function App() {
  const [started, setStarted] = useState(true)

  function start() {
    // Fetch new questions first
    setStarted(true)
  }

  return (
    <div>
      {!started && <Portal start={start}/>}
      {started && <TriviaPage/>}
    </div>
  )
}

export default App
