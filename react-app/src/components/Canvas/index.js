import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Sketch from "react-p5";
import { createNewDrawing } from "../../store/drawings";
import "./Canvas.css";

const Canvas = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, id } = useSelector(state => state.session.user);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [lineColor, setLineColor] = useState("#000000");
  const [lineWeight, setLineWeight] = useState(10);
  const [caption, setCaption] = useState("");
  const paths = [];
  let currentPath = [];

  // monitors length of caption and disables submit button if caption
  // is too short or too long
  useEffect(() => {
    if (caption.length >= 1 && caption.length <= 200) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [caption]);

  // p5.js func - creates a canvas at the specified dimensions
  // creates 600px * 600px canvas on full screen size
  // creates full-window size canvas on mobile screen size
  const setup = (p5, canvasParentRef) => {
    if (window.innerWidth <= 1000) {
      p5.createCanvas(window.innerWidth, window.innerWidth).parent(canvasParentRef);
    } else {
      p5.createCanvas(600, 600).parent(canvasParentRef);
    }
  };

  // allows users to draw lines on the canvas
  const draw = p5 => {
    p5.noFill();

    if (p5.mouseIsPressed) {
      // creates new point/line every time mouse is clicked, "color"
      // and "weight" properties allow users to change appearance of line
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

  // p5.js func - adds individual line to collection of lines
  const mousePressed = () => {
    currentPath = [];
    paths.push(currentPath);
  };

  // utilizies built-in canvas function to save visual drawing in the
  // form of text to be stored in the database - can then be used as
  // a src attribute inside of an img tag
  const handleSave = () => {
    const canvas = document.querySelector("canvas");
    const dataUrl = canvas.toDataURL();

    dispatch(createNewDrawing({ id, username, caption, dataUrl }));
    history.push(`/profile/${username}`);
  };

  // makes canvas responsive to window size but currently compromises contents
  // of the drawing
  const windowResized = p5 => {
    if (p5.windowWidth < 1000) {
      p5.resizeCanvas(window.innerWidth, window.innerWidth);
    } else {
      p5.resizeCanvas(600, 600);
    }
  };

  return (
    <div className="canvas-tools-container">
      <div className="canvas-draw-tools">
        <div>
          <input type="color" onChange={e => setLineColor(e.target.value)} value={lineColor} />
          <p>Color</p>
        </div>
        <div>
          <input type="range" min="1" max="100" value={lineWeight} onChange={e => setLineWeight(e.target.value)} />
          <p>Thickness</p>
        </div>
      </div>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} windowResized={windowResized} />
      <div className="canvas-upload-tools">
        <textarea
          type="text"
          className="input-bar-text"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="Please enter a caption."
        ></textarea>
        <button onClick={handleSave} disabled={buttonDisabled} className="input-bar-button">
          POST
        </button>
      </div>
    </div>
  );
};

export default Canvas;
