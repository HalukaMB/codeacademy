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
export default function FrontsideCreate(character: Character) {
  return (
    <>
    <img src={character.image}></img>
    </>
  )
}