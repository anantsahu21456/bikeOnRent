import React from 'react'

function GoToTop() {
    const gototop = ()=>{
        window.scrollTo({top: 0, left:0, behavior: 'smooth'});
    }
  return (
    <div id='gototop'>
        <button id='gototop-btn' onClick={gototop}>🔝</button>
      
    </div>
  )
}

export default GoToTop
