import React from 'react'


//Components
import FeatureContainer from '../assets/components/FeatureRequestContainer'

import '../assets/stylesheet/roadmap.css'
import RequestButton from '../assets/components/RequestButton'

function Roadmap() {

  
  return (
    <div className="roadmap-container"> 
      <div className="triple-container">
     <FeatureContainer title="Most Liked" />

     <FeatureContainer title="Coming Soon" />

     <FeatureContainer title="New In" />
    </div>

     <div className="ImpleRequest">
      <FeatureContainer title="Implemented request" />
     </div>
      <RequestButton />
     </div>

  )
}


export default Roadmap