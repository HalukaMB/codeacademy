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
export default function BacksideCreate({character}:Character) {
    const moreInfo=()=>{
        
    }
  function showMoreInfo(idOfCharacter){
    const moreInfoDiv=document.getElementById("moreInfo-" + String(idOfCharacter))
  }
  return (
    <>
    <div>{character.name}</div>
    <div onClick={()=>{}}>More Info</div>
    </>
  )
}