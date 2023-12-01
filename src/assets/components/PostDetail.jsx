import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';

function PostDetail() {
  // Get the userId param from the URL.
  let { id } = useParams();

 const [fetchedPost, setFetchedPost] = useState(null);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/posts/"+id)
      .then((res) => res.json())
      .then((data) => {
        setFetchedPost(data)
        setIsLoading(false)
        console.log(data)
      })
      .catch(() => setIsLoading(false))
  }, [])

  return (
    <div>
      {isLoading ? (
      <div>
       loading 
      </div>  
      ) : (
      <div> {/*vis post med comments*/}
        {fetchedPost.title} 
        
       
       {fetchedPost.comments?.map((comment) => (
        <div key={comment._id}>{comment.bodyText}</div>
       ))} 

      </div> 
      )}
    </div>
  )
}



export default PostDetail;