import React, { createContext, useState } from 'react'

export const ReducedDataContext = createContext({});

/* Move the datawrangling to here */

export const ReducedDataContextProvider = (props: Props) => {

    const [reducedData, setReducedData] = useState<{}>("hello");


  return (
    <ReducedDataContext.Provider value={{reducedData}}>
            {props.children}
    </ReducedDataContext.Provider>
  )
}
