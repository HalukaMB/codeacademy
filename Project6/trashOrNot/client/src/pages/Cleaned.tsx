import React, { useContext, useEffect, useState } from 'react'
import { TopSection } from '../components/topSection'
import { CleanedLocationForm } from '../components/CleanedLocationForm';
import checkedin from '../hooks/checkedin';
import { LocationContext } from '../context/LocationContext';

export const Cleaned = () => {

  const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);
  checkedin()


  

  return (
    <>

<TopSection></TopSection>
      <div className='reportSection'>
        <div className="cleanedReportStart">
          <div className="reportHead">The city is cleaner now...</div>
          ... because you ... </div>
        <CleanedLocationForm></CleanedLocationForm>

      </div>    
      </>
  )
}
