import React from "react";
import "./ProfileUserInfo.css";

const ProfileUserInfo = ({ user, drawings }) => {
  return (
    <div className="profile-user-info">
      <div className="profile-pic-container">
        <img src="https://i.imgur.com/N2Fd2if.jpg" className="profile-pic" alt="profile pic" />
      </div>
      <div className="profile-info-container">
        <div>
          <h1>{user.username}</h1>
        </div>
        <div className="profile-info-items">
          <div>
            <p className="profile-info-number">{drawings.length}</p>
            <p className="profile-info-text">Drawings</p>
          </div>
          <div>
            <p className="profile-info-number">{drawings.length}</p>
            <p className="profile-info-text">Followers</p>
          </div>
          <div>
            <p className="profile-info-number">{drawings.length}</p>
            <p className="profile-info-text">Following</p>
          </div>
          <div>
            <button className="profile-follow-btn">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserInfo;