import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dateConverter from "../../services/dateConverter";
import { likeOneDrawing } from "../../store/drawings";
import { getCommentsForDrawing } from "../../store/comments";
import CommentInput from "../CommentInput";
import CommentDisplay from "../CommentDisplay";
import "./DrawingView.css";

const DrawingView = ({ drawing }) => {
  const comments = useSelector(state => state.comments);
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { drawingId } = useParams();
  const [showCommentInput, setShowCommentInput] = useState(false);

  useEffect(() => {
    dispatch(getCommentsForDrawing(drawingId));
  }, [dispatch, drawingId]);

  const handleCommentInput = () => {
    setShowCommentInput(prev => !prev);
  };

  const updateProfileImage = async () => {
    await fetch(`/api/drawings/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: sessionUser.id,
        drawing_id: drawing.id,
      }),
    });
  };

  const handleDrawingLike = () => {
    dispatch(likeOneDrawing({ userId: sessionUser.id, drawingId: drawing.id }));
  };

  return (
    <div>
      <img className="drawing-img" src={drawing.data_url} alt="drawing" />
      <div className="drawing-items">
        <div>
          <button className="drawing-btn" onClick={handleDrawingLike}>
            <i className="far fa-heart"></i>
          </button>
          <button className="drawing-btn" onClick={handleCommentInput}>
            <i className="far fa-comment"></i>
          </button>
          {drawing.user_id === sessionUser.id && (
            <button className="drawing-profile-btn" onClick={updateProfileImage}>
              Set Profile Image
            </button>
          )}
        </div>
        <p className="drawing-date">{dateConverter(drawing.created_at)}</p>
      </div>
      <p>
        <Link style={{ textDecoration: "none" }} to={`/profile/${drawing.username}`}>
          <span className="drawing-username">{drawing.username}</span>
        </Link>
        <span className="drawing-caption"> {drawing.caption}</span>
      </p>
      {showCommentInput && <CommentInput drawingId={drawingId} />}
      <CommentDisplay sessionUser={sessionUser} comments={comments} />
    </div>
  );
};

export default DrawingView;
