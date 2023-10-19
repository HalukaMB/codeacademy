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

  const CreateCard = (elements:Character[])=>{
    console.log(elements)
    elements.map(()=>{
    return(<div>element</div>)}
    )
  }
  export default CreateCard
  