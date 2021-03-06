import React, { useState } from "react";
import { Link } from "react-router-dom";
import dateConverter from "../../services/dateConverter";
import CommentInput from "../CommentInput";
import "./DrawingView.css";

const DrawingView = ({ drawing }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleCommentInput = () => {
    setShowCommentInput(prev => !prev);
  };

  return (
    <div>
      <img className="drawing-img" src={drawing.data_url} alt="drawing" />
      <div className="drawing-items">
        <div>
          <button className="drawing-btn">
            <i class="far fa-heart"></i>
          </button>
          <button className="drawing-btn" onClick={handleCommentInput}>
            <i class="far fa-comment"></i>
          </button>
        </div>
        <p className="drawing-date">{dateConverter(drawing.created_at)}</p>
      </div>
      <p>
        <Link style={{ textDecoration: "none" }} to={`/profile/${drawing.username}`}>
          <span className="drawing-username">{drawing.username}</span>
        </Link>
        <span className="drawing-caption"> {drawing.caption}</span>
      </p>
      {showCommentInput && <CommentInput />}
    </div>
  );
};

export default DrawingView;
