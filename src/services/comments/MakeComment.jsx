import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostManagement } from "../PostManagement";
import "../comments/comments.css";

function MakeComment() {
  const { user } = usePostManagement();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  const sendComment = async (comment) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        // Update the local state with the new comment
        setComments((prevComments) => [...prevComments, json]);
        console.log("New comment added");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
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

      {/* Display existing comments and the newly added comment */}
      <div className="comments-container">
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.user.name}:</p>
            <p>{comment.bodyText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MakeComment;
