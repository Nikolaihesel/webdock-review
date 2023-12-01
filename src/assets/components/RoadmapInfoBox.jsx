import React from 'react'

//Components
import Data from '../../data/post.json'
import PostMarkup from './PostMarkup'

function FeatureRequestContainer({title}) {

  return (


    <div>
         <div className="feature-container">
        <h3 className="feature-titles">{title}</h3>
        
      {
        Data.post.map((post, index) => (
          <PostMarkup
            key={index}
            title={post.title}
            status={post.status}
            classStatus={post.status}
            description={post.describe}
            id={post.id}
          />

        ))
      }
      </div>
    </div>
  )
}

export default FeatureRequestContainer