import React from 'react'

import '../stylesheet/featureRequest.css'
import '../stylesheet/dynamicClasses.css'

function RoadmapPost({id, user, title, description, category, status, userType, classStatus}) {



  return (
    <div>

      <h1 className="request-title">{title}</h1>
      <p className={`request-status ${classStatus}`}>{status}</p>
      <p className="request-category">{category}</p>
      <p className="request-description">{description}</p>

      <hr  className="post-end-line"/>

     
    </div>
  )
}

export default RoadmapPost