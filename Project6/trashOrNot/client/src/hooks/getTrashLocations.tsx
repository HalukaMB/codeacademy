import React from 'react'

const baseUrl=(import.meta.env.VITE_BASE_URL_API)
const  getTrashLocations = async() => {

    const trashUrl=baseUrl+"locations/trash"

    const response = await fetch(trashUrl)
    const trashLocations = await response.json();
  return (
    trashLocations
  )
}

export default getTrashLocations