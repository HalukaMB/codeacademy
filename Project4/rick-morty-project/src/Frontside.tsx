import React from 'react'

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
  interface CharacterProps{
    character: Character

  }
export default function FrontsideCreate({character}:CharacterProps) {
  console.log(character.name)
  return (
    <div className='frontSide'>
    <img src={character.image}></img>
    </div>
  )
}