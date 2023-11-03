import React, { createContext, useEffect, useState } from 'react'
import { readRemoteFile } from 'react-papaparse';
import { useFetchAndWrangle } from '../hooks/useFetchAndWrangle';
import {CountryFilterType} from "../types/typedefinitions"


export const ReducedDataContext = createContext({});


export const ReducedDataContextProvider = (props: Props) => {


  const {reducedData, countryFilter} =useFetchAndWrangle()


  return (
    <ReducedDataContext.Provider value={{reducedData, countryFilter}}>
            {props.children}
    </ReducedDataContext.Provider>
  )
}
