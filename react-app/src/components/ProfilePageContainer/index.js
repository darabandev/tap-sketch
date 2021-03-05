import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAllDrawingsForUser } from "../../store/drawings";
import "./ProfilePageContainer.css";

const ProfilePageContainer = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const drawings = useSelector(state => state.drawings.userDrawings);

  useEffect(() => {
    dispatch(getAllDrawingsForUser(username));
  }, [dispatch, username]);

  if (!drawings) return "Loading";

  return (
    <div className="main">
      <div className="profile-drawing-container">
        {drawings.map(drawing => (
          <div className="profile-drawing-item">
            <Link to={`/drawings/${drawing.id}`}>
              <img src={drawing.data_url} alt="drawing" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePageContainer;
