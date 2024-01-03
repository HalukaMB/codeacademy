import { useContext, useEffect, useState } from 'react'

import './App.css'
import { Navbar } from '../components/Navbar'
import { TrashLocationForm } from '../components/TrashLocationForm'
import { TopSection } from '../components/topSection'
import { AuthenticationContext } from '../context/AuthenticationContext'
import checkedinhook from '../utils/checkedin_hook'

function App() {
  const [count, setCount] = useState(0)

  checkedinhook()

  

  return (
    <>
      <TopSection></TopSection>
      <div className='reportSection'>
        <div className="reportHead">Report us a place where you found some trash</div>
        <div className="reportSubHead">Either by pointing to a new spot on the map or by clicking on an existing pin and increasing its urgency:</div>
      <TrashLocationForm></TrashLocationForm>
      </div>

    </>
  )
}

export default App
