import React from "react";
import "./comments.css";

function CommentMarkup({ Name, BodyText, replies }) {
  return (
    <div>
      <div className="comment">
        <p className="name">{Name}</p>
        <p className="body-text">{BodyText}</p>
      </div>

      {replies && (
        <div className="replies">
          {replies.map((reply) => (
            <CommentMarkup
              key={reply._id}
              Name={reply.Name}
              BodyText={reply.BodyText}
              replies={reply.replies} // Recursive rendering for nested replies
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentMarkup;
