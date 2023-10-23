import React from 'react'
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
interface CharacterProps {
  character: Character

}
export default function BacksideCreate({character,functionToBeUsed}) {
 
  return (
    <div className='backSide'>
      <div className="text-2xl mt-4">{character.name}</div>
      <button className="mt-4" onClick={() => {console.log(character.name);
      functionToBeUsed(character)
      }}>More Info</button>
</div>
  )
}