import React from 'react'

const PageButtons = ({pageNumber}) => {
  return (
    <>
    <div className="buttonBar">
    {(pageNumber>1)?<button className="pagebutton bg-orange-400" id="prev" onClick={()=>setPageNumber(pageNumber-1)}>&lt;&lt;</button>:<button className="pagebutton bg-orange-400 opacity-50" id="prev" disabled>&lt;&lt;</button>}
    {(pageNumber<42)?<button className="pagebutton  bg-orange-400"id="next" onClick={()=>setPageNumber(pageNumber+1)}>&gt;&gt;</button>:<button className="pagebutton bg-orange-400 opacity-50" id="prev" disabled>&gt;&gt;</button>}
    </div>
    </>
}

export default PageButtons