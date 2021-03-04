import React, { useState } from "react";
import Sketch from "react-p5";

const Canvas = () => {
  const [lineColor, setLineColor] = useState("#000");
  const paths = [];
  let currentPath = [];
  let weight = 10;

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
        weight: weight,
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

  function mousePressed() {
    currentPath = [];
    paths.push(currentPath);
  }

  const handleWeight = () => {
    weight = 3;
  };

  return (
    <>
      <input type="color" onChange={e => setLineColor(e.target.value)} value={lineColor} />
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
    </>
  );
};

export default Canvas;
