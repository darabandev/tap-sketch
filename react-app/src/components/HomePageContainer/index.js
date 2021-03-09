import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowedUsers } from "../../store/users";
import HomePageDrawing from "../HomePageDrawing";

const HomePageContainer = () => {
  const sessionUser = useSelector(state => state.session.user);
  const followedUsers = useSelector(state => state.otherUsers.manyOtherUsers);
  const [drawingsReady, setDrawingsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTheDrawings() {
      const res = await dispatch(getAllFollowedUsers(sessionUser.id));
      setDrawingsReady(true);
      return res;
    }

    getTheDrawings();
  }, [dispatch, sessionUser]);

  if (!sessionUser || !drawingsReady) return <span>Loading...</span>;

  return (
    <div className="main">
      {followedUsers.drawings.map(drawing => (
        <HomePageDrawing key={drawing.id} drawing={drawing} />
      ))}
    </div>
  );
};

export default HomePageContainer;
