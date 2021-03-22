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
              <p>
                <i className="fas fa-heart"></i> {drawing.likes}
              </p>
              <p>
                <i className="fas fa-comment"></i> {drawing.comments}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProfileGallery;
