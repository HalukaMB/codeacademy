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
/* How do I have to declare here the interface definition */
  const CreateCard = ({character, functionToBeUsed, classSuffixToUse})=>{
    console.log(classSuffixToUse)
    const value = true;
    const buildClassName=()=>{
      return 
    }

    const {id}=character
    const classNameToEnter=`singleCard ${classSuffixToUse}`
    return(<div className={classNameToEnter} id={String(id)}>
      <div className="innerSingleCard">
      <FrontsideCreate character={character}/>
      <BacksideCreate character={character} functionToBeUsed={functionToBeUsed}/>
      </div>
{/*       {FrontsideCreate(character)}
{BacksideCreate(character)}
 */}      
      <br></br>
    </div>)
  
  }
  export default CreateCard
/*   
<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
    <div class="flip-card-back">
      <h1>John Doe</h1>
      <p>Architect & Engineer</p>
      <p>We love that guy</p>
    </div>
  </div> 
  </div>*/
