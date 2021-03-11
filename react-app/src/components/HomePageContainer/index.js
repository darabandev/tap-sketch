import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowedUsers } from "../../store/users";
import HomePageDrawing from "../HomePageDrawing";
import UserSuggestions from "../UserSuggestions";

const HomePageContainer = () => {
  const sessionUser = useSelector(state => state.session.user);
  const followedUsers = useSelector(state => state.otherUsers.manyOtherUsers);
  const [drawingsReady, setDrawingsReady] = useState(false);
  const { pageNumber } = useParams();
  const dispatch = useDispatch();

  // grabs all drawings from users the session user is currently following
  useEffect(() => {
    async function getTheDrawings() {
      const res = await dispatch(getAllFollowedUsers(sessionUser.id));
      setDrawingsReady(true);
      return res;
    }

    getTheDrawings();
  }, [dispatch, sessionUser]);

  // grabs 10 results from the total drawings array based on what page user is on
  // ex: grabs results 1-10 on page 1, results 11-20 on page 2, etc.
  const determineDrawingsToUse = pageNum => [pageNum * 10 - 10, pageNum * 10];

  if (!sessionUser || !drawingsReady) return <span>Loading...</span>;

  return (
    <div className="main">
      {followedUsers.drawings.length === 0 && <UserSuggestions />}
      {followedUsers.drawings.slice(...determineDrawingsToUse(pageNumber)).map(drawing => (
        <HomePageDrawing key={drawing.id} drawing={drawing} />
      ))}
      {pageNumber > 1 && <Link to={`/page/${parseInt(pageNumber) - 1}`}>Previous</Link>}
      {followedUsers.drawings.length > pageNumber * 10 && <Link to={`/page/${parseInt(pageNumber) + 1}`}>Next</Link>}
    </div>
  );
};

export default HomePageContainer;
