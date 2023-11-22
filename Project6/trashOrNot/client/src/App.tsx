import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapElement from './Components/MapElement'
import { Navbar } from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="topSection">
        <Navbar></Navbar>
        <h1>Clean Berlin</h1>
      </div>
      <div className='reportField'>
        <div>Report us a place where you found some</div>
        <form>
        <input></input>
        <MapElement></MapElement>
        </form>
      </div>
    </>
  )
}

export default App
