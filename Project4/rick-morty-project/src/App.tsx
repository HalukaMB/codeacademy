import { useEffect, useState } from "react";
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
  const [searchWord, setSearchWord] = useState<string>("")
  const [pageNumber,setPageNumber]=useState<number>(1)
  const [showModalCharacter, setShowModalCharacter] = useState<Character>(null)
  const rickMortyUrl="https://rickandmortyapi.com/api/character/"
  const [counter,setCounter]=useState(0)
  /* what has to be done with this function? */
  let count = 0
  const setInToBackGround=()=>{
    console.log("intoBackground")
/*     setCounter((prevValue)=>prevValue+1)
 */  }
  console.log(counter)


  const fetchData = (url: string) => {
    console.log("fetchData is running")
    console.log(url)
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        const characters = (result["results"]) as Character[];
        console.log(characters);
        setRickAndMortyCharacters(characters)
      });
  };
  useEffect(() => {
    fetchData(rickMortyUrl+"?page="+String(pageNumber));
    console.log(rickAndMortyCharacters)
  }, [pageNumber])


  console.log(rickAndMortyCharacters)

  const chosenCharacter = {
    name: "This is what should be displayed"
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
          showModalCharacter?(
          <CreateCard key={singleCharacter.id} character={singleCharacter} functionToBeUsed={setShowModalCharacter} setInToBackGround={setInToBackGround} classSuffixToUse="behind" />
          ):(
          <CreateCard key={singleCharacter.id} character={singleCharacter} functionToBeUsed={setShowModalCharacter} setInToBackGround={setInToBackGround} classSuffixToUse="regular" />
          )
          )}
      })}
      
      </div>
      <div>
        {showModalCharacter !== null && <CreateModal character={showModalCharacter} functionToReset={setShowModalCharacter} />}
      </div>
      <div className="buttonBar">
      {(pageNumber>2)?<button className="pagebutton bg-orange-400" id="prev" onClick={()=>setPageNumber(pageNumber-1)}>Previous</button>:<button className="pagebutton bg-orange-400 opacity-50" id="prev" disabled>Previous</button>}
      {(pageNumber<42)?<button className="pagebutton  bg-orange-400"id="next" onClick={()=>setPageNumber(pageNumber+1)}>Next</button>:<button className="pagebutton bg-orange-400 opacity-50" id="prev" disabled>Next</button>}
      </div>


    </>
  );
}

export default App;
