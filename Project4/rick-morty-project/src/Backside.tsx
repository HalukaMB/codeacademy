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
export default function BacksideCreate(character: Character) {
    const moreInfo=()=>{
        
    }
  return (
    <>
    <div>{character.name}</div>
    <div onClick={()=>{console.log(character.name)}}>More Info</div>
    </>
  )
}