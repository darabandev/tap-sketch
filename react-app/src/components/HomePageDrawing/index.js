import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePageDrawing.css";

const HomePageDrawing = ({ drawing }) => {
  const [profileImg, setProfileImg] = useState("https://i.imgur.com/5NakJ8y.png");

  useEffect(() => {
    const getProfileImage = async id => {
      const res = await fetch(`/api/users/image/${id}`);
      const data = await res.json();
      setProfileImg(data.profile_img);
    };

    getProfileImage(drawing.user_id);
  }, [drawing.user_id]);

  return (
    <div className="drawing-card">
      <div className="card-above-img-container">
        <Link to={`/profile/${drawing.username}`}>
          <img className="card-profile-img" src={profileImg || "https://i.imgur.com/5NakJ8y.png"} alt="profile" />
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
