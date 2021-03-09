import React from "react";
import { Link } from "react-router-dom";
import "./HomePageDrawing.css";

const HomePageDrawing = ({ drawing }) => {
  return (
    <div className="drawing-card">
      <div className="card-above-img-container">
        <img className="card-profile-img" src="https://i.imgur.com/xAcplDO.jpg" />
        <p className="card-profile-username">{drawing.username}</p>
      </div>
      <Link to={`/drawings/${drawing.id}`}>
        <img className="card-img" src={drawing.data_url} alt="drawing" />
      </Link>
      <div className="card-below-img-container">
        <span className="card-profile-username">{drawing.username}</span>
        <span>{drawing.caption}</span>
      </div>
      <div className="card-likes-comments">
        <span>{drawing.likes} Likes</span>
        <span>{drawing.comments} Comments</span>
      </div>
    </div>
  );
};

export default HomePageDrawing;
