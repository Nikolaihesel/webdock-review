import React from 'react'
import RoadmapPost from './RoadmapPost'
import Data from '../../data/post.json'

function FeatureReqContainer() {
  return (
    <div className='post-container'>
        {/*<ul>
            {
                Data.post.map((post, index) => (<li key={index}>{post.title}</li>))
            }
        </ul>*/}

        {
            Data.post.map((post, index) => (<RoadmapPost key={index}  title={post.title} status={post.status}/>))
        }

    </div>
  )
}

export default FeatureReqContainer