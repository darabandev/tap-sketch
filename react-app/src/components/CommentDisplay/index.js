import React from "react";
import Comment from "../Comment";

const CommentDisplay = ({ comments }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment comment={comment} />
      ))}
    </div>
  );
};

export default CommentDisplay;
