import { useStore3D, Store3D } from "./store";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

type ModelData = {
  id: string;
  title: string;
  model: string;
  dimensions: {
    width: number;
    height: number;
    height3d: number;
  };
};

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
loader.setDRACOLoader(dracoLoader);

const loadModel = async (data: ModelData, index: number) => {
  try {
    const model = await loader.loadAsync(`models/${data.model}`);
    setTimeout(() => {
      useStore3D.setState({ model: model["scene"], modelIndex: index + 1 });
    }, 100);
  } catch (e) {
    console.error(`"${data.model}" could not be found`);
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
      if (state.modelIndex >= 0 && state.modelData !== null) {
        // return [state.modelIndex, state.modelData[state.modelIndex]];
        loadModel(state.modelData[state.modelIndex], state.modelIndex);
      } else {
        // return [null, null];
      }
    }
  );

  // const data = await fetch(url).then(response => response.json());
  // console.log(data);
};
