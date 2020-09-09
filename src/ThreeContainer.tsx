import React, { useEffect, RefObject, useRef } from "react";
import { createThreeManager } from "./createThreeManager";
// import { useStore, Store } from "../store";

export const ThreeContainer = (): JSX.Element => {
  const ref: RefObject<HTMLCanvasElement> = useRef();
  // const width = useStore((state: Store) => state.width);
  // const height = useStore((state: Store) => state.height);
  // const style = {
  //   width: `${width}px`,
  //   height: `${height}px`,
  // };
  // useStore.subscribe(console.log, (state: Store) => `${state.width} x ${state.height}`);
  // console.log(width, height);
  useEffect(() => {
    if (ref.current) {
      console.log("create Threejs canvas");
      createThreeManager(ref.current);
      // dispatch(setThreeContainerRef(ref.current));
    }
  }, [ref.current]);

  return <canvas id="three-container" ref={ref} />;
};
