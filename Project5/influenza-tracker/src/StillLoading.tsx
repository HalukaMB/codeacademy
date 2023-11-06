import React from 'react'

const StillLoading = () => {
  return (
    <svg version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100"  xmlSpace="preserve">
    <circle fill="none" stroke="#ffffff" strokeWidth="1" strokeMiterlimit="10" strokeDasharray="10,10" cx="50" cy="50" r="39">
     {/* https://codepen.io/nikhil8krishnan/pen/rVoXJa */}
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="5s" 
         from="0 50 50"
         to="-360 50 50" 
         repeatCount="indefinite" />
  </circle>
  <text x="50%" y="50%" textAnchor="middle" stroke="#ffffff" strokeWidth="1px" dy=".02em">Loading</text>

  </svg>
  )
}

export default StillLoading