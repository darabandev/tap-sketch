import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sketch from "react-p5";
import { createNewDrawing } from "../../store/drawings";

const Canvas = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id);
  const [lineColor, setLineColor] = useState("#000");
  const [lineWeight, setLineWeight] = useState(10);
  const [caption, setCaption] = useState("");
  const paths = [];
  let currentPath = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = p5 => {
    p5.noFill();

    if (p5.mouseIsPressed) {
      const point = {
        x: p5.mouseX,
        y: p5.mouseY,
        color: lineColor,
        weight: lineWeight,
      };
      currentPath.push(point);
    }

    paths.forEach(path => {
      p5.beginShape();
      path.forEach(point => {
        p5.stroke(point.color);
        p5.strokeWeight(point.weight);
        p5.vertex(point.x, point.y);
      });
      p5.endShape();
    });
  };

  const mousePressed = () => {
    currentPath = [];
    paths.push(currentPath);
  };

  const handleSave = () => {
    const canvas = document.querySelector("canvas");
    const dataUri = canvas.toDataURL();

    dispatch(createNewDrawing({ userId, caption, dataUri }));
  };

  return (
    <>
      <input type="color" onChange={e => setLineColor(e.target.value)} value={lineColor} />
      <button onClick={handleSave}>hi</button>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
      <input type="text" value={caption} onChange={e => setCaption(e.target.value)} />
    </>
  );
};

export default Canvas;
