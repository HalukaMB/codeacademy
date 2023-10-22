import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateCard from "./Card";
import CreateModal from "./Modal";

export interface Root {
  info: Info
  results: Character[]
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: any
}

export interface Character {
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

export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

function App() {
  const [rickAndMortyCharacters, setRickAndMortyCharacters] = useState<Character[]>([])
  const [showModalCharacter, setShowModalCharacter] = useState<Character>(null)
  const [searchWord, setSearchWord] = useState<String>("")


  const toggleModal = (selectedCharacter: Character) => {
    setShowModalCharacter(selectedCharacter)
  }


  const rickMortyUrl = "https://rickandmortyapi.com/api/character/"

  const fetchData = (url: string) => {
    console.log("fetchData is running")
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const characters = (result["results"]) as Character[];
        console.log(characters);
        setRickAndMortyCharacters(characters)
      });
  };
  useEffect(() => {
    fetchData(rickMortyUrl);
    console.log(rickAndMortyCharacters)
  }, [])



  const chosenCharacter = {
    name: "hola"
  }



  return (
    <>
      <div>
        <input id="searchBar" type="text" placeholder="Search.." onChange={(e)=>{
          let searchWord=(e.target.value)
          setSearchWord(searchWord)
          }} />
      </div>

      <div className="grid">{rickAndMortyCharacters.length && rickAndMortyCharacters.map((singleCharacter) => {
        if(singleCharacter.name.toLowerCase().includes(searchWord)){

        return (
          <CreateCard key={singleCharacter.id} character={singleCharacter} functionToBeUsed={toggleModal} />
          
          )}
      })}
      
      </div>
      <div>

        {showModalCharacter !== null && <CreateModal character={showModalCharacter} />}
      </div>


    </>
  );
}

export default App;
