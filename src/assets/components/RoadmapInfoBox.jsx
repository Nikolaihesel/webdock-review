import React from 'react'

//Components
import RoadmapPost from './PostMarkup'
import Data from '../../data/post.json'

function FeatureRequestContainer({title}) {

  return (


    <div>
         <div className="feature-container">
        <h3 className="feature-titles">{title}</h3>
        
      {
        Data.post.map((post, index) => (
          <RoadmapPost
            key={index}
            title={post.title}
            status={post.status}
            classStatus={post.status}
            description={post.describe}
          />

        ))
      }
      </div>
    </div>
  )
}

export default FeatureRequestContainer