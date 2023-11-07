import React from 'react'


//Components
import FeatureContainer from '../assets/components/FeatureRequestContainer'

import '../assets/stylesheet/roadmap.css'
import RequestButton from '../assets/components/RequestButton'

function Roadmap() {

  
  return (
    <div className="roadmap-container"> 
        <div className="triple-container">
            <div className='mostLiked'>
                <FeatureContainer title="Most Liked" />
            </div>

            <div className='comingSoon'>
                <FeatureContainer title="Coming Soon" />
            </div>

            <div className='newIn'>
                <FeatureContainer title="New In" />
            </div>
        </div>

        <div className="ImpleRequest">
            <FeatureContainer title="Implemented request" />
        </div>

        <div className="CenterButton">
            <RequestButton /> 
        </div>
      
     </div>

  )
}


export default Roadmap