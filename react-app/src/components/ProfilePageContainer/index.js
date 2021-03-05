import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import dateConverter from "../../services/dateConverter";
import { getAllDrawingsForUser } from "../../store/drawings";

const ProfilePageContainer = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const drawings = useSelector(state => state.drawings.userDrawings);

  useEffect(() => {
    dispatch(getAllDrawingsForUser(username));
  }, [dispatch, username]);

  if (!drawings) return "Loading";

  return (
    <>
      {drawings.map(drawing => (
        <>
          <img src={drawing.data_url} alt="drawing" />
          <p>{dateConverter(drawing.created_at)}</p>
        </>
      ))}
    </>
  );
};

export default ProfilePageContainer;
