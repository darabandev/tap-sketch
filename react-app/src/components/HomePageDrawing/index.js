import React from "react";
import { Link } from "react-router-dom";
import "./HomePageDrawing.css";

const HomePageDrawing = ({ drawing }) => {
  return (
    <div className="drawing-card">
      <div className="card-above-img-container">
        <Link to={`/profile/${drawing.username}`}>
          <img className="card-profile-img" src="https://i.imgur.com/xAcplDO.jpg" alt="profile" />
        </Link>
        <Link to={`/profile/${drawing.username}`}>
          <p className="card-profile-username">{drawing.username}</p>
        </Link>
      </div>
      <Link to={`/drawings/${drawing.id}`}>
        <img className="card-img" src={drawing.data_url} alt="drawing" />
      </Link>
      <div className="card-below-img-container">
        <Link to={`/profile/${drawing.username}`}>
          <span className="card-profile-username">{drawing.username}</span>
        </Link>
        <span className="card-caption">{drawing.caption}</span>
      </div>
      <div className="card-likes-comments">
        <span className="card-likes">
          {drawing.likes} {drawing.likes === 1 ? "Like" : "Likes"}
        </span>
        <span>
          {drawing.comments} {drawing.comments === 1 ? "Comment" : "Comments"}
        </span>
      </div>
    </div>
  );
};

export default HomePageDrawing;
