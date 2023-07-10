import { useState } from 'react'
import './App.css'
import Portal from './components/Portal'
import TriviaPage from './components/TriviaPage'

function App() {
  const [started, setStarted] = useState(false)

  function start() {
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
