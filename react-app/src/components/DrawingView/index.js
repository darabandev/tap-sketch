import React from "react";
import "./DrawingView.css";

const DrawingView = ({ drawing }) => {
  return (
    <div>
      <img className="drawing-img" src={drawing.data_url} alt="drawing" />
      <p>
        <span className="drawing-username">{drawing.username}</span>
        <span className="drawing-caption"> {drawing.caption}</span>
      </p>
      <p>{drawing.created_at}</p>
    </div>
  );
};

export default DrawingView;
