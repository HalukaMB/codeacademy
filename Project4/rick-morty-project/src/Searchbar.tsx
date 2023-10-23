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
    searchWordUpdate: Function
  }

const SearchbarCreate = ({searchWordUpdate}) => {
  return (
    <div className="searchBar pb-5">
    <input className="w-3/4 text-orange-500" id="searchBar" type="text" placeholder="Search.." onChange={(e)=>{
      let searchWord=(e.target.value)
      searchWordUpdate(searchWord)
      }} />
  </div>
  )
}

export default SearchbarCreate