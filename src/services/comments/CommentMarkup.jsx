import React from "react";
import "./comments.css";
import CommentReply from './CommentReply';

function CommentMarkup({ Name, BodyText, replies }) {
  return (
    <div>
      <div className="comment">
        <p className="name">{Name}</p>
        <p className="body-text">{BodyText}</p>
      </div>
      <CommentReply />
     
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
