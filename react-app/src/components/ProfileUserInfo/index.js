import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../store/users";
import "./ProfileUserInfo.css";

const ProfileUserInfo = ({ user, drawings }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // dispatches thunk to start "following" a user
  const handleNewFollow = () => {
    dispatch(
      followUser({
        userFollowing: sessionUser.id,
        userBeingFollowed: user.id,
      })
    );
  };

  const handleUnfollow = () => {
    dispatch(
      unfollowUser({
        userFollowing: sessionUser.id,
        userBeingFollowed: user.id,
      })
    );
  };

  // check if the user profile belongs to the logged in user
  // will determine if it should render follow button or not
  const isSameAsSessionUser = () => sessionUser.id === user.id;

  // check if logged-in user is already following the displayed user,
  // is a nested ternary in the component - only gets evaluated if
  // isSameAsSessionUser returns false
  const isAlreadyFollowing = () => user.followers.includes(sessionUser.id);

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
            <p className="profile-info-number">{user.followers.length}</p>
            <p className="profile-info-text">Followers</p>
          </div>
          <div>
            <p className="profile-info-number">{user.follows.length}</p>
            <p className="profile-info-text">Following</p>
          </div>
          <div>
            {isSameAsSessionUser() ? null : isAlreadyFollowing() ? (
              <button className="profile-follow-btn" onClick={handleUnfollow}>
                Unfollow
              </button>
            ) : (
              <button className="profile-follow-btn" onClick={handleNewFollow}>
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserInfo;
