import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostManagement } from "../PostManagement";
import "../comments/comments.css";

function MakeComment() {
  const { user } = usePostManagement();
  const [comment, setComment] = useState("");
  const [showReplyField, setShowReplyField] = useState(false); // New state for showing/hiding reply field
  const [error, setError] = useState(null);
  const { postId } = useParams();

  const sendComment = async (comment) => {
    const response = await fetch(
      `http://45.136.70.229/api/posts/${postId}/comments`,
      {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      console.log("new comment added");
    }
  };

  const handleReply = (parentCommentId) => {
    setShowReplyField(!showReplyField); // Toggle show/hide state for reply field
    // Additional logic to handle the reply based on parentCommentId if needed
    console.log(`Replying to comment with ID: ${parentCommentId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      bodyText: comment,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      upvotes: 0,
    };
    sendComment(newComment);
    setComment("");
  };

  return (
    <div className="comment-form-container">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="comment"
          placeholder="Write comment here"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <button>Comment</button>
      </form>
      {/* Add a reply button */}
      <button onClick={() => handleReply(null)}>Reply</button>
      {/* Conditionally render the reply text field based on showReplyField state */}
      {showReplyField && (
        <form onSubmit={() => handleReply(/* Pass the parent comment ID */)}>
          <textarea
            type="text"
            name="reply"
            placeholder="Write reply here"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <button>Reply</button>
        </form>
      )}
    </div>
  );
}

export default MakeComment;
