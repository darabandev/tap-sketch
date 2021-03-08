import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followNewUser } from "../../store/follows";
import "./ProfileUserInfo.css";

const ProfileUserInfo = ({ user, drawings }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // dispatches thunk to start "following" a user
  const handleNewFollow = () => {
    dispatch(
      followNewUser({
        userFollowing: sessionUser.id,
        userBeingFollowed: user.id,
      })
    );
  };

  return (
    <div className="profile-user-info">
      <div className="profile-pic-container">
        <img src={user.profile_img || "https://i.imgur.com/5NakJ8y.png"} className="profile-pic" alt="profile pic" />
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
            <p className="profile-info-number">0</p>
            <p className="profile-info-text">Followers</p>
          </div>
          <div>
            <p className="profile-info-number">0</p>
            <p className="profile-info-text">Following</p>
          </div>
          <div>
            <button className="profile-follow-btn" onClick={handleNewFollow}>
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserInfo;
