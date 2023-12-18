import React, { useContext, useEffect, useState } from 'react'
import { TopSection } from '../components/topSection'
import { CleanedLocationForm } from '../components/CleanedLocationForm';
import checkedin from '../utils/checkedin';
import { LocationContext } from '../context/LocationContext';

export const Cleaned = () => {

  const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);
  checkedin()


  

  return (
    <>

<TopSection></TopSection>
      <div className='reportSection'>
        <div className="cleanedReportStart">
          <div className="reportHead">The city has become a bit cleaner!</div>
          Is this because you... ?</div>
        <CleanedLocationForm></CleanedLocationForm>

      </div>    
      </>
  )
}
