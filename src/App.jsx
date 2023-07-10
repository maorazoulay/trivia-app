import { useState } from 'react'
import './App.css'
import Portal from './components/Portal'
import Trivia from './components/Trivia'
import LoadingPage from './components/LoadingPage'

function App() {
  const [started, setStarted] = useState(false)
  const [showLoading, setShowLoadingPage] = useState(false)

  function start() {
    setStarted(true)
    toggleLoadingPage(true)
  }

  function toggleLoadingPage(shouldLoad){
    setShowLoadingPage(shouldLoad)
  }

  return (
    <>
      {!started && <Portal start={start}/>}
      {started && showLoading && <LoadingPage />}
      {started && !showLoading && <Trivia toggleLoadingPage={toggleLoadingPage}/>}
    </>
  )
}

export default App
