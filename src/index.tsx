import "./styles/index.scss";
import React from "react";
import { render } from "react-dom";
import { useStore3D } from "./store";
import { ThreeContainer } from "./ThreeContainer";
import { setupDropArea } from "./setupDropArea";
import { loadFiles } from "./loadModels";

const resize = () => {
  useStore3D.setState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
};

render(
  <>
    <ThreeContainer></ThreeContainer>
  </>,
  document.getElementById("app"),
  () => {
    setupDropArea();
    loadFiles();
  }
);

window.addEventListener("resize", resize);
