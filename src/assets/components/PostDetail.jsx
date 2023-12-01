import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import TestBackend from '../../routes/TestBackend';

function PostDetail() {
  // Get the userId param from the URL.
  let { postId } = useParams();
  
  return (
    <div></div>
  )
}
