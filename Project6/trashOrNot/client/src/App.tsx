import { useState } from 'react'

import './App.css'
import { Navbar } from './components/Navbar'
import { TrashLocationForm } from './components/TrashLocationForm'
import { TopSection } from './components/topSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TopSection></TopSection>
      <div className='reportField'>
        <div>Report us a place where you found some trash</div>
      </div>
      <TrashLocationForm></TrashLocationForm>
    </>
  )
}

export default App
