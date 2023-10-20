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
export default function MoreInfoCreate(character: Character) {
    return (
        <div className='moreInfo' id={"moreInfo-" + String(character.id)}>
            <div>{character.name}</div>
            <img src={character.image}></img>
            <div>Species: {character.species}</div>
        </div>
    )
}