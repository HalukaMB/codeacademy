import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Characters from "./Characters";
import CreateCard from "./Card";

interface CatData {
  fact: string;
  length: number;
}
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
function App() {
  const [count, setCount] = useState(0);
  const [rickAndMortyCharacters, setRickAndMortyCharacters]= useState<Character[]>([])
  const catUrl = "https://catfact.ninja/fact";
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
    fetchData(rickMortyUrl)
   
  }, [])
  console.log(rickAndMortyCharacters)
  
  const someData = {
    name:"asdasd",
    age:34
  }
  return (
    <>
      <div>
        <Characters favNumber={5}someInfo={someData}/>
        <CreateCard elements={rickAndMortyCharacters}/>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is by one {count}
        </button>
       
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
