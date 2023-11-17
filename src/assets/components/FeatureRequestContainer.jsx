import React from 'react'

//Components
import RoadmapPost from './RoadmapPost'
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

     {/*  <div className="feature-requests">     
        {post.map((post, index) => (
          <div className="feature-request" key={index}>
              <p className="feature-post-user">{post.user}</p>
              <p className="feature-post-title">{post.title}</p>
              <p className="feature-post-desc">{post.description}</p>
              <p className="feature-post-catergory">{post.category}</p>

              <hr />

            </div>
        ))}
        </div> */}
      </div>
    </div>
  )
}

export default FeatureRequestContainer