import React from "react";
import Comment from "../Comment";

const CommentDisplay = ({ comments }) => {
  return (
    <div style={{ padding: "1em 0" }}>
      {comments.map(comment => (
        <Comment comment={comment} />
      ))}
    </div>
  );
};

export default CommentDisplay;
