import './App.css'
import { TrashLocationForm } from '../components/TrashLocationForm'
import { TopSection } from '../components/TopSection'
import checkedin from '../hooks/checkedin'

function App() {

  checkedin()
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
