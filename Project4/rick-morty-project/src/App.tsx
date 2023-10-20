import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateCard from "./Card";

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
  const [rickAndMortyCharacters, setRickAndMortyCharacters]= useState<Character[]>([])
  const [showModal, setShowModal] = useState(false)

  const rickMortyUrl = "https://rickandmortyapi.com/api/character/"

  const fetchData = (url: string) => {
    console.log("fetchData is running")
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const characters=(result["results"]) as Character[];
        console.log(characters);
        setRickAndMortyCharacters(characters)
      });
  };
  useEffect(() => {
    fetchData(rickMortyUrl);
    console.log(rickAndMortyCharacters)   
  }, [])


  const toggleModal =()=>{
setShowModal(!showModal)
  }
  

  return (
    <>
      <div>{rickAndMortyCharacters.length&&rickAndMortyCharacters.map((singleCharacter)=>
      {return(
        <CreateCard key={singleCharacter.id} character={singleCharacter}/>)
      })
        }

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
