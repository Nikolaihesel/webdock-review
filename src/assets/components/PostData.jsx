import React from "react";
import {useState, useEffect } from 'react'
import PostMarkup from "./PostMarkup";
import Data from "../../data/post.json";

//css
import '../stylesheet/featureRequest.css'
function PostData() {


  const [posts, setPosts] = useState([])

  useEffect(() => {
    const addIdsToPosts = () => {
      const createPostId = Data.post.map((post, index) => ({
        ...post,
        id: index + 1, 
      }));

      setPosts(createPostId); 
    };

    addIdsToPosts();
  }, []);
const handleUpvote = (postId) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    )
  );
};




  return (
    <div className="post-container">
      {posts.map((post) => (
        <PostMarkup
          key={post.id}
          title={post.title}
          classStatus={post.status}
          status={post.status}
          description={post.description.substring(0,200)}
    
          Upvotes={post.upvotes}
           BtnFunction={() => handleUpvote(post.id)}
        />
      ))}
    </div>
  );
}

export default PostData;
