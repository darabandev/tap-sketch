import React from "react";
import Sketch from "react-p5";

const Canvas = () => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 400).parent(canvasParentRef);
    p5.strokeWeight(10);
    p5.stroke(0);
  };

  const draw = p5 => {
    p5.background(255, 130, 20);
    p5.ellipse(100, 100, 100);
    p5.ellipse(300, 100, 100);
  };

  //   const touchMoved = p5 => {
  //     p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  //     return false;
  //   };

  const mouseDragged = p5 => {
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    return false;
  };

  return <Sketch style={{ border: "1px solid black;" }} setup={setup} mouseDragged={mouseDragged} />;
};

export default Canvas;
