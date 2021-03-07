import React from "react";
import dateConverter from "../../services/dateConverter";
import "./Comment.css";

const Comment = ({ comment, sessionUser }) => {
  return (
    <div className="comment-container">
      <div className="comment-pic-container">
        <img
          alt="profile"
          className="comment-prof-pic"
          src={comment.user_profile_img || "https://i.imgur.com/5NakJ8y.png"}
        />
      </div>
      <div className="comment-info">
        <p className="comment-user">{comment.username}</p>
        <p className="comment-content">{comment.comment}</p>
        <p className="comment-date">{dateConverter(comment.created_at)}</p>
      </div>
      {sessionUser.id === comment.user_id && (
        <button className="comment-delete-btn">
          <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
};

export default Comment;
