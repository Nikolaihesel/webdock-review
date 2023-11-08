import React from 'react'
import RoadmapPost from './RoadmapPost'
import Data from '../../data/post.json'



function FeatureReqContainer() {
  return (
    <div className='post-container'>
        {
            Data.post.map((post, index) => (<RoadmapPost key={index} 
               title={post.title} 
               status={post.status}
       
               description={post.description}

               
               
               />))
        }

    </div>
  )
}

export default FeatureReqContainer