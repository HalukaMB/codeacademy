import { useContext, useEffect } from 'react'
import { AuthenticationContext } from './context/AuthenticationContext'
import { ReducedDataContext } from './context/ReducedDataContext';
import CountryCardMain from './CountryCardMain';

interface InnerObject{
    info: {"longname":string, "code":string}
    data: Record<number|string, number[]>
    matrixDots: string[][]
    objectInfected: Record<number|string, number>
    latestRatio: number
    weekBeforeRatio: number
  }

  interface GetDataProps{
    countryFilter: Record<string, string>
    reducedData: Record<string, InnerObject>
  }
function LogoutFeature(){
    const { user } = useContext(AuthenticationContext);
    const { favorites, changeFavorites } = useContext(AuthenticationContext)
    const { updateFavoritesChangeTime } = useContext(AuthenticationContext)
    const { reducedData } = useContext(ReducedDataContext) as GetDataProps
    

    console.log(reducedData)
    const authenticationContext=useContext(AuthenticationContext)
    const removeCountry=(countryToRemove:string)=>{
  
        const item = countryToRemove

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

    const favoriteCountries = Object.keys(reducedData)
	.filter(key => favorites.includes(key))
	.reduce((obj, key) => {
		obj[key] = reducedData[key];
		return obj;}, {} as  Record<string, InnerObject>);

    console.log(favoriteCountries)

  return (
    <>
        <button className="logOutButton" onClick={()=>{
    changeStatus()}
}>Log out from your account</button>
    <div className="explainerBlock">Here is your list of bookmarked countries:</div>

        <div className='countrygrid'>

{Object.keys(favoriteCountries).map((element, index)=>{
    console.log(element)
    return(
        <div className="bookmarkDiv">

        <CountryCardMain  countryData={favoriteCountries[element]} key={"A"+index}></CountryCardMain>

    <button value={element} key={index} onClick={()=>removeCountry(element)}>Remove {element}</button>
    </div>
    )
})}
</div>
    </>
  )
}

export default LogoutFeature