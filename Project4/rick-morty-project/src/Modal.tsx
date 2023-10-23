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
  
  interface ModalProps {
    character: Character
  }
const CreateModal=({character, functionToReset})=>{
    console.log(character)
    return(<div className="modal bg-slate-300">
           <h1>{character.name}</h1>
           <img src={character.image} className="imageModal"></img>

           <div>{character.species}</div>
           <div>{character.location.name}</div>
           <button onClick={()=>functionToReset(null)}>Show Less</button>


      
</div>)
}
export default CreateModal