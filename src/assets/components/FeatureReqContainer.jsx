import React from 'react'
import RoadmapPost from './RoadmapPost'
import Data from '../../data/post.json'





function FeatureReqContainer() {

  console.log(JSON.stringify(Data.post))

  return (
    <div className='post-container'>
        {
            Data.post.map((post, index) => (<RoadmapPost key={index} 
               title={post.title}
               classStatus={post.status} 
               status={post.status}
               description={post.description}

               
               
               />))
        }

    </div>
  )
}

export default FeatureReqContainer