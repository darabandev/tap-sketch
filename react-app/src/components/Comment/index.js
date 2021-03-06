import React from "react";
import dateConverter from "../../services/dateConverter";

const Comment = ({ comment }) => {
  return (
    <div className="comment-container">
      <img src={comment.user_profile_img || "https://i.imgur.com/5NakJ8y.png"} />
      <div className="comment-info">
        <p>{comment.username}</p>
        <p>{comment.comment}</p>
        <p>{dateConverter(comment.created_at)}</p>
      </div>
    </div>
  );
};

export default Comment;
