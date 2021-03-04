import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneDrawing } from "../../store/drawings";

const DrawingPageContainer = () => {
  const { drawingId } = useParams();
  const dispatch = useDispatch();
  const drawing = useSelector(state => state.drawings.currentDrawing);

  useEffect(() => {
    dispatch(getOneDrawing(drawingId));
  }, []);

  if (!drawing) return <span>Loading...</span>;

  return (
    <>
      <h1>{drawing.caption}</h1>
      <img src={drawing.data_uri} alt="drawing" />
    </>
  );
};

export default DrawingPageContainer;
