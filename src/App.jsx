import { useState } from 'react'
import './App.css'
import Portal from './components/Portal'
import TriviaPage from './components/TriviaPage'

function App() {
  const [started, setStarted] = useState(true)

  function start() {
    setStarted(true)
  }

  return (
    <div>
      {!started && <Portal start={start}/>}
      <div className='trivia-page'>
        {started && <TriviaPage/>}
      </div>
    </div>
  )
}

export default App
