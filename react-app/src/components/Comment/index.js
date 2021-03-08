import React from "react";
import dateConverter from "../../services/dateConverter";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/comments";
import "./Comment.css";

const Comment = ({ comment, sessionUser }) => {
  const dispatch = useDispatch();
  const { drawingId } = useParams();

  const handleDeleteComment = () => {
    dispatch(deleteComment(drawingId, comment.id));
  };

  return (
    <div className="comment-container">
      <div className="comment-pic-container">
        <Link to={`/profile/${comment.username}`}>
          <img
            alt="profile"
            className="comment-prof-pic"
            src={comment.user_profile_img || "https://i.imgur.com/5NakJ8y.png"}
          />
        </Link>
      </div>
      <div className="comment-info">
        <Link to={`/profile/${comment.username}`}>
          <p className="comment-user">{comment.username}</p>
        </Link>
        <p className="comment-content">{comment.comment}</p>
        <p className="comment-date">{dateConverter(comment.created_at)}</p>
      </div>
      {sessionUser.id === comment.user_id && (
        <button className="comment-delete-btn" onClick={handleDeleteComment}>
          <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
};

export default Comment;
