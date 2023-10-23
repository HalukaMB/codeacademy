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
export default function BacksideCreate({ character,functionToBeUsed}) {
 
  return (
    <div className='backSide'>
      <h1>{character.name}</h1>
      <div onClick={() => {console.log(character.name);
      functionToBeUsed(character)
      }}>More Info</div>
</div>
  )
}