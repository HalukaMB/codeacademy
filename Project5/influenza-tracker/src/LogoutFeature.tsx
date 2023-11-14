import React, { useContext } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'
import { ReducedDataContext } from './hooks/useFetchAndWrangle';

interface InnerObject{
    info: {"longname":string, "code":string}
    data: Record<number|string, number[]>
    matrixDots: string[][]
    objectInfected: Record<number|string, number>
    latestRatio: number
    weekBeforeRatio: number
  
  }

interface OuterObject{[key:string]:InnerObject}

const LogoutFeature = () => {
    const { user } = useContext(AuthenticationContext);
    const { favorites, changeFavorites } = useContext(AuthenticationContext)
    const { updateFavoritesChangeTime } = useContext(AuthenticationContext)
    const { reducedData } = useContext(ReducedDataContext) as Record<string, OuterObject>
    if(reducedData){
    console.log(reducedData)}

  
    const authenticationContext=useContext(AuthenticationContext)
    const removeCountry=(e:any)=>{
        const item = e.target.value

        const newFaves = favorites.filter((favourite)=>{
            return favourite !=item;
        })
        changeFavorites(newFaves)
        updateFavoritesChangeTime()
    
    }

    const changeStatus=()=>{

        if(user!=null){
            authenticationContext.logout()
            console.log("logging out")
        }
    }

    
  return (
    <>
    <div className="explainerBlock">Here is your list of bookmarked countries:</div>
    <button onClick={()=>{
    changeStatus()}
}>Log Out</button>
{favorites.map((element, index)=>{
    return(<button value={element} key={index} onClick={(removeCountry)}>{element}</button>)
})}

    </>
  )
}

export default LogoutFeature