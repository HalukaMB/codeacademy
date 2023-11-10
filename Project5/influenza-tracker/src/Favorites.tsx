import React from 'react'

const Favorites = ({favorites}:string[]) => {
    favorites.map((element)=>{
        return(<button onClick={(removeCountry)}>{element}</button>)
})}

export default Favorites