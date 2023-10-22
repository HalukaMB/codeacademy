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
  
  interface SearchbarProps {
    character: Character
  }

const Searchbar = (Characters) => {
  return (
    <div>Searchbar</div>
  )
}

export default Searchbar