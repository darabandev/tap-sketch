import React from "react";

const HomePageDrawing = ({ drawing }) => {
  return (
    <div>
      <h1>{drawing.caption}</h1>
      <h1>{drawing.username}</h1>
    </div>
  );
};

export default HomePageDrawing;
