import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllDrawingsForUser } from "../../store/drawings";
import { getOneUser } from "../../store/users";
import ProfileGallery from "../ProfileGallery";
import ProfileUserInfo from "../ProfileUserInfo";
import "./ProfilePageContainer.css";

const ProfilePageContainer = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const drawings = useSelector(state => state.drawings.userDrawings);
  const user = useSelector(state => state.otherUsers.singleOtherUser);

  useEffect(() => {
    dispatch(getAllDrawingsForUser(username));
    dispatch(getOneUser(username));
  }, [dispatch, username]);

  if (!drawings || !user) return "Loading";

  return (
    <div className="main">
      <ProfileUserInfo user={user} drawings={drawings} />
      <ProfileGallery drawings={drawings} />
    </div>
  );
};

export default ProfilePageContainer;
