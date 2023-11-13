import React from 'react'

//css
import "../stylesheet/roadmap.css" 

export function Button({ onClick, title }) { 
  return (
    <button className='RequestButton' onClick={onClick}>{title}</button>
  )
}

