import React from "react";
import Sketch from "react-p5";

const Canvas = () => {
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
        color: "#55ee00",
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

  //   const setup = (p5, canvasParentRef) => {
  //     p5.createCanvas(500, 400).parent(canvasParentRef);
  //     p5.strokeWeight(weight);
  //     p5.stroke(0);
  //   };

  //   const draw = p5 => {
  //     p5.background(255, 130, 20);
  //     p5.ellipse(100, 100, 100);
  //     p5.ellipse(300, 100, 100);
  //   };

  //   const touchMoved = p5 => {
  //     p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  //     return false;
  //   };

  const mouseDragged = p5 => {
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    return false;
  };

  const keyTyped = (key, p5) => {
    console.log(key, p5);
  };

  const handleWeight = () => {
    weight = 3;
  };

  return (
    <>
      <button onClick={handleWeight}>hi</button>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
    </>
  );
};

export default Canvas;
