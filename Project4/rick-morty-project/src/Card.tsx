import { useState } from "react"
import BacksideCreate from "./Backside"
import FrontsideCreate from "./Frontside"
import CreateModal from "./Modal"

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

interface CardProps {
  character: Character
}
  const CreateCard = ({character, functionToBeUsed, classSuffixToUse, setInToBackGround})=>{
    console.log(classSuffixToUse)
    setInToBackGround()
    const {id}=character
    const classNameToEnter=`singleCard ${classSuffixToUse}`
    return(<div className={classNameToEnter} id={String(id)}>
      <div className="innerSingleCard">
      <FrontsideCreate character={character}/>
      <BacksideCreate character={character} functionToBeUsed={functionToBeUsed}/>
      </div>  
      <br></br>
    </div>)
  
  }
  export default CreateCard

