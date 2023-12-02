import React from "react";
import {useState, useEffect } from 'react'
import PostMarkup from "./PostMarkup";
import Data from "../../data/post.json";

//css
import '../stylesheet/featureRequest.css'
function PostData({MenuHeading, hrClass}) {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  


  // useEffect(() => {
  //   const addIdsToPosts = () => {
  //     const createPostId = Data.post.map((post, index) => ({
  //       ...post,
  //       id: index + 1, 
  //       upvoted: false, // Track whether the post has been upvoted by the user   
  //     }));

  //     setPosts(createPostId); 
  //   };

  //   addIdsToPosts();
  // }, []);



  //upvote
const handleUpvote = (postId) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.id === postId && !post.upvoted 
        ? { ...post, upvotes: post.upvotes + 1, upvoted: true } 
        : post
    )
  );
};



 const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);




  return (
    <div className="post-container">
      <div className="post-container-heading">
       <h2>{MenuHeading}</h2> {/* Pagination btn starts here*/}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
          (_, index) => (
            <li key={index}>
              <button 
                className={currentPage === index + 1 ? 'current-btn' : ''}
              onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          )
        )}
      </ul>
      </div>
       <hr className={`${hrClass}`}/>
      {currentPosts.map((post) => (
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
