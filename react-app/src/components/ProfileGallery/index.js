import React from "react";
import { Link } from "react-router-dom";
import "./ProfileGallery.css";

const ProfileGallery = ({ drawings }) => {
  return (
    <div className="profile-drawing-container">
      {drawings.map(drawing => (
        <div key={drawing.id} className="profile-drawing-item">
          <Link to={`/drawings/${drawing.id}`}>
            <img src={drawing.data_url} alt="drawing" />
            <div className="middle">
              <p>Likes {drawing.likes}</p>
              <p>Comments {drawing.comments}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProfileGallery;
