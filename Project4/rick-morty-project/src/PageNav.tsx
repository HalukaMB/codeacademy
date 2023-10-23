import React from 'react'

const PageNav = ({pageNumber,setPageNumber}) => {
  return (
    <div className="buttonBar pt-4">
         {(pageNumber>1)?<button className="pagebutton bg-orange-400 ml-5" id="prev" onClick={()=>setPageNumber(pageNumber-1)}>&lt;&lt;</button>:<button className="pagebutton bg-orange-400 opacity-50 ml-5" id="prev" disabled>&lt;&lt;</button>}
      {(pageNumber<42)?<button className="pagebutton  bg-orange-400 mr-5"id="next" onClick={()=>setPageNumber(pageNumber+1)}>&gt;&gt;</button>:<button className="pagebutton bg-orange-400 opacity-50 mr-5" id="prev" disabled>&gt;&gt;</button>}
     
              </div>


    )
}

export default PageNav