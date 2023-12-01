import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';


function PostDetail() {
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  return (
    <div></div>
  )
}



export default PostDetail;