import React from "react";
import "./CommentInput.css";

const CommentInput = () => {
  return (
    <div className="comment-input-container">
      <textarea className="input-bar-text"></textarea>
      <button className="input-bar-button">Post</button>
    </div>
  );
};

export default CommentInput;
