import React, { useState } from "react";
import Sketch from "react-p5";

const Canvas = () => {
  const [lineColor, setLineColor] = useState("#000");
  const [lineWeight, setLineWeight] = useState(10);
  const paths = [];
  let currentPath = [];
  let myBall;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    myBall = p5.background;
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

  function mousePressed(p5) {
    currentPath = [];
    paths.push(currentPath);
    console.log(p5);
  }

  const handleSave = () => {
    const canvas = document.querySelector("canvas");
    const dataUrl = canvas.toDataURL();

    console.log(dataUrl);
  };

  return (
    <>
      <input type="color" onChange={e => setLineColor(e.target.value)} value={lineColor} />
      <button onClick={handleSave}>hi</button>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
    </>
  );
};

export default Canvas;
