import React from 'react'

function RoadmapPost({id, user, title, description, category, status, userType}) {



  return (
    <div>
      <h1 className="requestTitle">{title}</h1>
      <p className="requestStatus">{status}</p>
    </div>
  )
}

export default RoadmapPost