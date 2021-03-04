import React from "react";

const DrawingView = ({ drawing }) => {
  return (
    <>
      <img src={drawing.data_url} alt="drawing" />
      <p>{drawing.caption}</p>
    </>
  );
};

export default DrawingView;
