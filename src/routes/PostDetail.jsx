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

  // forbedring
  const sendReply = async (postId, commentId, reply) => {
    
    try {
      // Udfør et API-opkald til backend for at tilføje svaret til kommentaren
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId: commentId, 
          reply: reply, 
        }),
      });
  
      // Tjek om svaret blev sendt korrekt
      if (response.ok) {
        // Hvis svaret blev sendt med succes, nulstil replyText og luk svareboksen
        setReplyText('');
        setShowReplyBox(false);
      
      } else {
        // Håndter fejl, hvis svaret ikke blev sendt korrekt
        throw new Error('Svar kunne ikke sendes');
      }
    } catch (error) {
      console.error('Fejl ved afsendelse af svar:', error);
      // Håndter fejl, f.eks. visning af en fejlbesked til brugeren
    }
  };

  const handleSubmit = async (e, commentId) => {
    e.preventDefault();
    const newReply = {
      postId,
      commentId,
      reply: {
        bodyText: replyText,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    };
    try {
      await sendReply(newReply);
      setReplyText('');
      setShowReplyBox(false);
    } catch (error) {
      console.error('Fejl ved håndtering af svar:', error);
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

                {/* Reply under hver knap */}
                <button onClick={toggleReplyBox} className="reply-button">
                  Reply
                </button>

                {showReplyBox && (
                  <form onSubmit={handleSubmit}>
                    <textarea 
                    type="text"
                    name="reply"
                    placeholder="Write your reply here"
                    onChange= {handleReplyTextChange} //setReplyText(e.target.value)}
                    value={replyText}>
                    </textarea>
                    <button>Send Reply</button>
                  </form>
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
