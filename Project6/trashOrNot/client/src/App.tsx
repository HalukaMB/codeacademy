import { useState } from 'react'

import './App.css'
import { Navbar } from './components/Navbar'
import { TrashLocationForm } from './components/TrashLocationForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="topSection">
        <Navbar></Navbar>
        <h1>Clean Berlin</h1>
      </div>
      <div className='reportField'>
        <div>Report us a place where you found some trash</div>
      </div>
      <TrashLocationForm></TrashLocationForm>
    </>
  )
}

export default App
