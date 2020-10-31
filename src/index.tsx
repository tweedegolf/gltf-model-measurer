import "./styles/index.scss";
import React from "react";
import { render } from "react-dom";
import { useStore3D } from "./store";
import { ThreeContainer } from "./ThreeContainer";
// import { setupDropArea } from "./setupDropArea";
import { init } from "./loadModels";
import { models } from "./models";
import { Row } from "./types";

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
    const modelData = Object.values(models) as Row[];
    // console.log(modelData);
    useStore3D.setState({ modelData, modelIndex: 0 });
  }
);

window.addEventListener("resize", resize);
