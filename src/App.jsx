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
    <>
      {!started && <Portal start={start}/>}
      {started && <TriviaPage/>}
    </>
  )
}

export default App
