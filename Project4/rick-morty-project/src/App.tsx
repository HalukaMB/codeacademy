import { useEffect, useState } from "react";
import "./App.css";
import CreateCard from "./Card";
import CreateModal from "./Modal";
import SearchbarCreate from "./Searchbar"
import PageNav from "./PageNav";
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


  const fetchData = (url: string) => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const characters = (result["results"]) as Character[];
        setRickAndMortyCharacters(characters)
      });
  };
  useEffect(() => {
    fetchData(rickMortyUrl+"?page="+String(pageNumber));
  }, [pageNumber])
  return (
    <>
      <SearchbarCreate searchWordUpdate={setSearchWord}></SearchbarCreate>
      <div className="grid">{rickAndMortyCharacters.length && rickAndMortyCharacters.map((singleCharacter) => {
        if(singleCharacter.name.toLowerCase().includes(searchWord)){
        return (
          showModalCharacter?(
          <CreateCard key={singleCharacter.id} character={singleCharacter} functionToBeUsed={setShowModalCharacter} classSuffixToUse="behind" />
          ):(
          <CreateCard key={singleCharacter.id} character={singleCharacter} functionToBeUsed={setShowModalCharacter}  classSuffixToUse="regular" />
          )
          )}
      })}
      
      </div>
      <div>
        {showModalCharacter !== null && <CreateModal character={showModalCharacter} functionToReset={setShowModalCharacter} />}
      </div>

      <PageNav pageNumber={pageNumber} setPageNumber={setPageNumber}></PageNav>

    </>
  );
}

export default App;
