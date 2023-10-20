import { useState } from "react"
import BacksideCreate from "./Backside"
import Backside from "./Backside"
import FrontsideCreate from "./Frontside"
import MoreInfoCreate from "./MoreInfo"

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
  const CreateCard = ({character}: CardProps)=>{
    const value = true
    
    const buildClassName=()=>{
      return 
    }

    const {id}=character
    return(<div className={buildClassName} id={String(id)}>
      <FrontsideCreate character={character}/>
      <br></br>
      <BacksideCreate character={character}/>
      <br></br>

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
