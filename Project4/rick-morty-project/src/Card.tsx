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

  const CreateCard = (element:Character)=>{
    console.log(element)
    return(<div>jicj</div>)
  
  }
  export default CreateCard
  