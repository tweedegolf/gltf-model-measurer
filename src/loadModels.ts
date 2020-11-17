import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Box3 } from "three";
import { isNil } from "ramda";
import { useStore3D } from "./store";
// import { Data } from "./types";
import { download } from "./download";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
loader.setDRACOLoader(dracoLoader);
const collectJSON = [];

const loadModel = async (data: any, index: number) => {
  // console.log(data.title, data.params_3d);
  if (!isNil(data.params.model) || !isNil(data.params.children)) {
    // console.log("already updated", data.title);
    // useStore3D.setState({ modelIndex: index + 1 });
    setTimeout(() => {
      useStore3D.setState({ modelIndex: index + 1 });
    }, 5);
    return;
  }

  const modelName = data.params.model;
  try {
    // console.log("LOADING", data.id, modelName);
    const model = await loader.loadAsync(`models/${modelName}`);
    const scene = model["scene"];
    // console.log(data.scale);
    // const { rotation = [0, 0, 0], scale = 100, translation = [0, 0, 0] } = data.params;
    // const { rotation = [0, 0, 0], scale = 100, translation = [0, 0, 0] } = params3D;
    // const { rotation = [0, 0, 0], translation = [0, 0, 0] } = params3D;
    const scale = 100;
    // scene.rotation.x = rotation[0];
    // scene.rotation.y = rotation[1];
    // scene.rotation.z = rotation[2];

    // scene.position.x = translation[0];
    // scene.position.y = translation[1];
    // scene.position.z = translation[2];
    scene.scale.x = scale; // / 100;
    scene.scale.y = scale; // / 100;
    scene.scale.z = scale; // / 100;

    const bbox = new Box3().setFromObject(scene);
    const x = bbox.max.x - bbox.min.x;
    const y = bbox.max.y - bbox.min.y;
    const z = bbox.max.z - bbox.min.z;
    data.params.dimensions = { x, y, z };
    // console.log(performance.now(), modelName);

    // console.log(width, height, height3d);
    collectJSON.push(data);

    setTimeout(() => {
      useStore3D.setState({ model: scene, modelIndex: index + 1 });
      // useStore3D.setState({ modelIndex: index + 1 });
      // useStore3D.setState({ model: scene });
    }, 25);
  } catch (e) {
    console.error(`"${modelName}" could not be found`, e);
    useStore3D.setState({ modelIndex: index + 1 });
  }
};

export const init = () => {
  useStore3D.subscribe(
    (index: number) => {
      const max = useStore3D.getState().modelData.length;
      const data = useStore3D.getState().modelData[index];
      // console.log(index, max);
      if (index >= 0 && data && index < max) {
        loadModel(data, index);
      } else {
        // const dimensions = collectJSON.reduce((acc, val) => {
        //   acc[val.id] = val;
        //   return acc;
        // }, {});
        // download(JSON.stringify(dimensions), "dimensions.json");
        download(JSON.stringify(collectJSON), "dimensions.json");
      }
    },
    state => {
      // console.log(state.modelIndex);
      return state.modelIndex;
      // if (
      //   // init &&
      //   // state.modelData !== null &&
      //   state.modelIndex >= 0 &&
      //   state.modelIndex < useStore3D.getState().modelData.length
      // ) {
      //   return [state.modelIndex, state.modelData[state.modelIndex]];
      //   // loadModel(state.modelData[state.modelIndex], state.modelIndex);
      //   // init = false;
      //   // const modelIndex = state.modelData.findIndex(
      //   //   data => data.params_3d["3d-params"].model === "bolboom.1.glb"
      //   // );
      //   // loadModel(state.modelData[modelIndex], modelIndex);
      // } else if (state.modelData !== null && state.modelIndex === state.modelData.length) {
      //   // return [null, null];
      //   download(JSON.stringify(collectJSON), "dimensions.json");
      // }
    }
    // shallow
  );

  // const data = await fetch(url).then(response => response.json());
  // console.log(data);
};
