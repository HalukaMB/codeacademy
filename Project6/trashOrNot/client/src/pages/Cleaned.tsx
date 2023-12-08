import React, { useState } from 'react'
import { TopSection } from '../components/topSection'
import { CleanedLocationForm } from '../components/CleanedLocationForm';

export const Cleaned = () => {

  const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);

  return (
    <>

<TopSection></TopSection>
      <div className='reportSection'>
        <div className="cleanedReportStart">You want to report that there is no trash at a particular corner anymore. Have you... </div>
        <CleanedLocationForm></CleanedLocationForm>

      </div>    
      </>
  )
}
