import { useContext, useState } from 'react'

import './App.css'
import { Navbar } from '../components/Navbar'
import { TrashLocationForm } from '../components/TrashLocationForm'
import { TopSection } from '../components/topSection'
import { AuthenticationContext } from '../context/AuthenticationContext'

function App() {
  const [count, setCount] = useState(0)
  const { userChecked, loginOrLogout } = useContext(AuthenticationContext)
  console.log(userChecked)

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
