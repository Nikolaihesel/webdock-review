import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostManagement } from "../services/PostManagement";
import MakeComment from "../services/comments/MakeComment";
import "./postDetail.css";
import CommentMarkup from "../services/comments/CommentMarkup";

const PostDetail = () => {
  const [admin, setAdmin] = useState(false);
  // 2 ny const 
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
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

  // 2 nye const
  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };

  // tilføj function
  const sendReply = async (commentId) => {
    try {
      // Udfør et API-opkald til din backend for at tilføje svaret til den pågældende kommentar
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId: commentId, // Erstat med det aktuelle kommentar-id, som du svarer på
          reply: replyText, // Brug replyText-variablen, der indeholder det skrevne svar
        }),
      });
  
      // Tjek om svaret blev sendt korrekt (status 200)
      if (response.ok) {
        // Hvis svaret blev sendt med succes, nulstil replyText og luk svareboksen
        setReplyText('');
        setShowReplyBox(false);
        // Du kan også udføre en handling, f.eks. opdatering af kommentarlisten efter tilføjelse af svaret
      } else {
        // Håndter fejl, hvis svaret ikke blev sendt korrekt
        throw new Error('Svar kunne ikke sendes');
      }
    } catch (error) {
      console.error('Fejl ved afsendelse af svar:', error);
      // Håndter fejl, f.eks. visning af en fejlbesked til brugeren
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
  
          {/* Loop through comments and display the reply box under each comment */}
          {fetchedPosts?.comments &&
            fetchedPosts.comments.map((comment) => (
              <div key={comment._id} className="comment-container">
                <CommentMarkup
                  Name={comment.user.name}
                  BodyText={comment.bodyText}
                />
  
                {/* Add a "Reply" button to each comment */}
                <button onClick={toggleReplyBox} className="reply-button">
                  Reply
                </button>
  
                {/* Display the reply box if showReplyBox is true */}
                {showReplyBox && (
                  <div className="reply-box">
                    <textarea
                      value={replyText}
                      onChange={handleReplyTextChange}
                      placeholder="Write your reply here..."
                    ></textarea>
                    {/* Call sendReply function with commentId when clicking the button */}
                    <button onClick={() => sendReply(comment._id)}>Send Reply</button>
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
        </div>
      </div>
    </>
  );
};

export default PostDetail;
