import React from 'react'

import '../stylesheet/featureRequest.css'

function RoadmapPost({id, user, title, description, category, status, userType}) {



  return (
    <div>

      <h1 className="request-title">{title}</h1>
      <p className="request-status">{status}</p>
      <p className="request-category">{category}</p>
      <p className="request-description">{description}</p>

      <hr  className="post-end-line"/>

     
    </div>
  )
}

export default RoadmapPost