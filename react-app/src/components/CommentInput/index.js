import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postNewComment } from "../../store/comments";
import "./CommentInput.css";

const CommentInput = () => {
  const dispatch = useDispatch();
  const { drawingId } = useParams();
  const [commentText, setCommentText] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const userId = useSelector(state => state.session.user.id);

  useEffect(() => {
    if (commentText.length >= 1 && commentText.length <= 300) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [commentText]);

  const handlePost = () => {
    dispatch(postNewComment({ userId, drawingId, commentText }));
  };

  return (
    <div className="comment-input-container">
      <textarea
        className="input-bar-text"
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
      ></textarea>
      <button className="input-bar-button" onClick={handlePost} disabled={buttonDisabled}>
        Post
      </button>
    </div>
  );
};

export default CommentInput;
