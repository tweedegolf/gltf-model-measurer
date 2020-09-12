import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Box3 } from "three";
import { useStore3D, Store3D, ModelData } from "./store";
import { download } from "./download";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
loader.setDRACOLoader(dracoLoader);
const collectJSON = [];

const loadModel = async (data: ModelData, index: number) => {
  try {
    const model = await loader.loadAsync(`models/${data.model}`);
    const scene = model["scene"];
    // console.log(data.scale);
    const { rotation = [0, 0, 0], scale = 100, translation = [0, 0, 0] } = data;
    scene.rotation.x = rotation[0];
    scene.rotation.y = rotation[1];
    scene.rotation.z = rotation[2];
    scene.position.x = translation[0];
    scene.position.y = translation[1];
    scene.position.z = translation[2];
    scene.scale.x = scale; // / 100;
    scene.scale.y = scale; // / 100;
    scene.scale.z = scale; // / 100;

    const bbox = new Box3().setFromObject(scene);
    const width = Math.round((bbox.max.x - bbox.min.x) * 2);
    const height = Math.round((bbox.max.y - bbox.min.y) * 2);
    const height3d = Math.round((bbox.max.z - bbox.min.z) * 2);
    // console.log(width, height, height3d);
    collectJSON.push({
      id: data.id,
      title: data.title,
      width,
      height,
      height3d,
    });

    setTimeout(() => {
      useStore3D.setState({ model: scene, modelIndex: index + 1 });
    }, 25);
  } catch (e) {
    console.error(`"${data.model}" could not be found`, e.message);
    useStore3D.setState({ modelIndex: index + 1 });
  }
};

export const loadFiles = async () => {
  const url = useStore3D.getState().configUrl;
  // useStore3D.subscribe(
  //   modelData => {
  //     // console.log(modelData[0]);
  //     // loadModel(modelData[0], 0);
  //     useStore3D.setState({ modelIndex: 0 });
  //   },
  //   state => state.modelData
  // );
  useStore3D.getState().loadModels(url);

  useStore3D.subscribe(
    // ([index, data]) => {
    //   loadModel(data, index);
    // },
    state => {
      if (
        state.modelData !== null &&
        state.modelIndex >= 0 &&
        state.modelIndex < state.modelData.length
      ) {
        // return [state.modelIndex, state.modelData[state.modelIndex]];
        loadModel(state.modelData[state.modelIndex], state.modelIndex);
      } else if (state.modelData !== null && state.modelIndex === state.modelData.length) {
        // return [null, null];
        download(JSON.stringify(collectJSON), "dimensions.json");
      }
    }
  );

  // const data = await fetch(url).then(response => response.json());
  // console.log(data);
};
