import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneDrawing } from "../../store/drawings";
import DrawingView from "../DrawingView";

const DrawingPageContainer = () => {
  const { drawingId } = useParams();
  const dispatch = useDispatch();
  const drawing = useSelector(state => state.drawings.currentDrawing);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getOneDrawing(drawingId));
  }, []);

  if (!drawing) return <span>Loading...</span>;

  return (
    <div className="main">
      <DrawingView drawing={drawing} />
    </div>
  );
};

export default DrawingPageContainer;
