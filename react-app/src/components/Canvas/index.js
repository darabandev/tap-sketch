import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sketch from "react-p5";
import { createNewDrawing } from "../../store/drawings";

const Canvas = () => {
  const dispatch = useDispatch();
  const { username, id } = useSelector(state => state.session.user);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineWeight, setLineWeight] = useState(10);
  const [caption, setCaption] = useState("");
  const paths = [];
  let currentPath = [];

  const setup = (p5, canvasParentRef) => {
    if (window.innerWidth <= 1000) {
      p5.createCanvas(window.innerWidth, window.innerWidth).parent(canvasParentRef);
    } else {
      p5.createCanvas(600, 600).parent(canvasParentRef);
    }
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
    const dataUrl = canvas.toDataURL();

    dispatch(createNewDrawing({ id, username, caption, dataUrl }));
  };

  const windowResized = p5 => {
    if (p5.windowWidth < 1000) {
      p5.resizeCanvas(window.innerWidth, window.innerWidth);
    } else {
      p5.resizeCanvas(600, 600);
    }
  };

  return (
    <>
      <div className="canvas-draw-tools">
        <input type="color" onChange={e => setLineColor(e.target.value)} value={lineColor} />
        <input type="range" min="1" max="20" value={lineWeight} onChange={e => setLineWeight(e.target.value)} />
      </div>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} windowResized={windowResized} />
      <div className="canvas-upload-tools">
        <input type="text" value={caption} onChange={e => setCaption(e.target.value)} />
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  );
};

export default Canvas;
