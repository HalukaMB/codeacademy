import { useContext, useEffect, useState } from 'react'

import './App.css'
import { Navbar } from '../components/Navbar'
import { TrashLocationForm } from '../components/TrashLocationForm'
import { TopSection } from '../components/topSection'
import { AuthenticationContext } from '../context/AuthenticationContext'
import checkedin from '../utils/checkedin'

function App() {
  const [count, setCount] = useState(0)
  const { userChecked, setUserChecked } = useContext(AuthenticationContext)
  console.log(userChecked)
  checkedin()
  

  return (
    <>
      <TopSection></TopSection>
      <div className='reportSection'>
        <div>Report us a place where you found some trash</div>
      <TrashLocationForm></TrashLocationForm>
      </div>

    </>
  )
}

export default App
