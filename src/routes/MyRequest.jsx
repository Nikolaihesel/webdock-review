import React from 'react'
import '../assets/stylesheet/myrequest.css'

//Components
import FeatureContainer from '../assets/components/RoadmapInfoBox'

function MyRequest() {
  return (
    <div className="mr-container">
      <div className="double-container">
        <div className='mr-boxes'>
        <FeatureContainer title="Created Request" />
        </div>

        <div className='mr-boxes'>
        <FeatureContainer title="Upvoted Request" />
        </div>

      </div>

    </div>
  )
}

export default MyRequest