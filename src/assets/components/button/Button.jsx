import React from 'react'

//css
import "./button.css" 

export function Button({ onClick, title }) { 
  return (
    <button className='RequestButton' onClick={onClick}>{title}</button>
  )
}

