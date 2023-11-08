import React, { createContext} from 'react'
import { useFetchAndWrangle } from '../hooks/useFetchAndWrangle';


export const ReducedDataContext = createContext({});


export const ReducedDataContextProvider = (props: Props) => {


  const {reducedData, countryFilter} =useFetchAndWrangle()


  return (
    <ReducedDataContext.Provider value={{reducedData, countryFilter}}>
            {props.children}
    </ReducedDataContext.Provider>
  )
}
