import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostManagement } from "../services/PostManagement";
import MakeComment from "../services/comments/MakeComment";
import CommentMarkup from "../services/comments/CommentMarkup";
import "./postDetail.css";

const PostDetail = () => {
  const [admin, setAdmin] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [replyText, setReplyText] = useState(""); // Tilstand for tekstfeltet

  const { postId } = useParams();
  const navigate = useNavigate();
  const {
    fetchPostsById,
    fetchedPosts,
    user,
    handleDelete,
    handleLike,
    handleCommentDelete,
  } = usePostManagement();

  useEffect(() => {
    fetchPostsById(postId);
  }, [postId]);

  const handleToggle = () => {
    setAdmin(!admin);
  };

  const handleReply = (parentCommentId) => {
    setShowReplyForm(true);
    setParentCommentId(parentCommentId);
  };

  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = () => {
    // Her kan du håndtere logikken for at sende svaret til backenden
    // F.eks. bruge fetch og sende replyText og parentCommentId
    console.log("Reply text:", replyText);
    console.log("Parent comment ID:", parentCommentId);

    // Nulstil tilstandene efter at svaret er sendt
    setShowReplyForm(false);
    setReplyText("");
    setParentCommentId(null);
  };

  const sendReply = async (replyData) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${parentCommentId}/replies`, {
        method: "POST",
        body: JSON.stringify(replyData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        // Handle error here if needed
        console.error("Error posting reply:", json.error);
      } else {
        // Handle successful reply submission
        console.log("New reply added:", json);
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <>
      <div className="toggle-box">
        <input
          id="admin-toggle"
          type="checkbox"
          checked={admin}
          onChange={handleToggle}
        />
        <label htmlFor="admin-toggle" className="toggle-label"></label>
      </div>
      <div className="post-full-view" key={fetchedPosts?._id}>
        <label>{admin ? "admin" : "Not admin"}</label>
        <h1 className="post-title">{fetchedPosts?.title}</h1>
        <p className="post-author">
          {" "}
          By <i>{fetchedPosts.user ? fetchedPosts.user.name : "user"}</i>
        </p>
        <p className="post-body">{fetchedPosts?.bodyText}</p>
        <div className="post-details">
          <button
            onClick={() => handleLike(fetchedPosts?._id)}
            className="upvote-button"
          >
            Upvote ({fetchedPosts?.upvotes})
          </button>
          {admin && (
            <button
              onClick={() => {
                handleDelete(fetchedPosts?._id);
                navigate("/");
              }}
              className="delete-button"
            >
              Delete Post
            </button>
          )}
          <div className="post-meta">
            <p className="post-comments">
              {" "}
              {fetchedPosts.comments ? fetchedPosts.comments.length : ""}{" "}
              Comments
            </p>
            <p className="post-tag">{fetchedPosts?.tag}</p>
          </div>
        </div>
        {/* Comment Section */}
        <div className="comments-section">
          <MakeComment
            parentCommentId={parentCommentId}
            showReplyForm={showReplyForm}
            setShowReplyForm={setShowReplyForm}
          />

          <br />

          {fetchedPosts?.comments && fetchedPosts.comments.length > 0 ? (
            <h2>Comments</h2>
          ) : (
            <h2>No one has commented yet</h2>
          )}

          {fetchedPosts?.comments &&
            fetchedPosts.comments.map((comment) => (
              <div key={comment._id} className="comment-container">
                <CommentMarkup
                  Name={comment.user.name}
                  BodyText={comment.bodyText}
                  replies={comment.replies} // Assuming replies are available in comments
                />
                <button
                  onClick={() => handleReply(comment._id)}
                  className="reply-button"
                >
                  Reply
                </button>

                {/* Tjek for showReplyForm og vis tekstfeltet, hvis det er sandt */}
                {showReplyForm && parentCommentId === comment._id && (
                  <div className="reply-text-field">
                    <textarea
                      value={replyText}
                      onChange={handleReplyTextChange}
                      placeholder="Type your reply here..."
                    ></textarea>
                    <button onClick={handleReplySubmit}>Submit Reply</button>
                  </div>
                )}

                {admin && (
                  <button
                    onClick={() => {
                      handleCommentDelete(fetchedPosts._id, comment._id);
                    }}
                    className="delete-button comment-delete-button"
                  >
                    Delete Comment
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
