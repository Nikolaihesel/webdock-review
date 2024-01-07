import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostManagement } from "../services/PostManagement";
import MakeComment from "../services/comments/MakeComment";
import "./postDetail.css";
import CommentMarkup from "../services/comments/CommentMarkup";

const PostDetail = () => {
  const [admin, setAdmin] = useState(false);
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

  return (
    <>
      {" "}
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
          <MakeComment />

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
                />
                {admin && (
                  <button
                    onClick={() => {
                      handleCommentDelete(fetchedPosts._id, comment._id);
                      // You may want to refresh the comments after deletion
                      // You can fetch the updated comments or update the state accordingly
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
