import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneDrawing } from "../../store/drawings";
import DrawingView from "../DrawingView";
import "./DrawingPageContainer.css";

const DrawingPageContainer = () => {
  const { drawingId } = useParams();
  const dispatch = useDispatch();
  const drawing = useSelector(state => state.drawings.currentDrawing);

  // dispatches thunk to grab info on specific drawing from DB
  useEffect(() => {
    dispatch(getOneDrawing(drawingId));
  }, [dispatch, drawingId]);

  if (!drawing) return <span>Loading...</span>;

  return (
    <div className="main drawing-page-container">
      <DrawingView drawing={drawing} />
    </div>
  );
};

export default DrawingPageContainer;
