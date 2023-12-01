import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../stylesheet/featureRequest.css'
import '../stylesheet/dynamicClasses.css'

function RoadmapPost({id, user, title, description, category, status, userType, classStatus, Upvotes, BtnFunction}) {

  const navigate = useNavigate();

  return (
    <>

    <div className='post-wrapper'>
    <div className='post'>

      <h1 className="request-title" onClick={() => navigate ("/backendtest/post/"+id, {state: {postId: id }})} >{title}</h1>
      <p className={`request-status ${classStatus}`}>{status}</p>
      <p className="request-category">{category}</p>
      <p className="request-description">{description}...</p>

   
    </div>

    <div className="likes">
        <p className="upvotes">{Upvotes}</p>
      <button onClick={BtnFunction} className="placeholder-img">Like</button>
    </div>
    

    </div>
       <hr  className="post-end-line"/>
    </>
  )
}

export default RoadmapPost