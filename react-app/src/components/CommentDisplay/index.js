import React from "react";
import Comment from "../Comment";

const CommentDisplay = ({ comments, sessionUser }) => {
  return (
    <div style={{ padding: "1em 0" }}>
      {comments.map(comment => (
        <Comment key={comment.id} sessionUser={sessionUser} comment={comment} />
      ))}
    </div>
  );
};

export default CommentDisplay;
