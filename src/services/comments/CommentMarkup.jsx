import React from "react";
import "./comments.css";

function CommentMarkup({ Name, BodyText, replies }) {
  return (
    <div>
      <div className="comment">
        <p className="name">{Name}</p>
        <p className="body-text">{BodyText}</p>
      </div>

      {/* Tjekker for svar (replies) og viser dem rekursivt */}
      {replies && replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <CommentMarkup
              key={reply._id}
              Name={reply.user.name}
              BodyText={reply.bodyText}
              replies={reply.replies} // Viser svar til dette svar (rekursion)
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentMarkup;
