import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowedUsers } from "../../store/users";

const HomePageContainer = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFollowedUsers(sessionUser.id));
  });

  if (!sessionUser) return <span>Loading...</span>;

  return <h1>Hey</h1>;
};

export default HomePageContainer;
