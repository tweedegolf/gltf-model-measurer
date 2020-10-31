import "./styles/index.scss";
import React from "react";
import { render } from "react-dom";
import { useStore3D } from "./store";
import { ThreeContainer } from "./ThreeContainer";
// import { setupDropArea } from "./setupDropArea";
import { init } from "./loadModels";
import { models } from "./models";

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
    // setupDropArea();
    init();
    useStore3D.setState({ modelData: Object.values(models), modelIndex: 0 });
  }
);

window.addEventListener("resize", resize);
