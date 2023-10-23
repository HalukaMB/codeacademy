import { useState } from "react"
import BacksideCreate from "./Backside"
import FrontsideCreate from "./Frontside"
import CreateModal from "./Modal"
import {Character} from './App'



interface CardProps {
  character: Character
  functionToBeUsed: Function
}
  const CreateCard = ({character, functionToBeUsed, classSuffixToUse, setInToBackGround})=>{
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

