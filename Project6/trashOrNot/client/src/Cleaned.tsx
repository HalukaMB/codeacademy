import React, { useState } from 'react'
import { TopSection } from './components/topSection'
import { CleanedLocationForm } from './components/CleanedLocationForm';

export const Cleaned = () => {

  const [previousPositions, setPreviousPositions] = useState<[number, number][] | null>(null);

  return (
    <>

<TopSection></TopSection>
      <div className='reportSection'>
        <div>You have picked up some trash or see that someone has cleaned it up?</div>
        <CleanedLocationForm></CleanedLocationForm>

      </div>    
      </>
  )
}
