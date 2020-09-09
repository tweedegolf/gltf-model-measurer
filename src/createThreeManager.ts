import { Object3D, AxesHelper, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useStore3D, Store3D } from "./store";
import {
  createCamera,
  createRenderer,
  createWorld,
  addModel,
  mirrorModel,
  setUpLighting,
  addSkyDome,
  addReferenceBox,
} from "./createThreeScene";

export type ThreeManager = {
  render: () => void;
  addObject: (o: Object3D) => void;
};

export const createThreeManager = (canvas: HTMLCanvasElement): void => {
  let raqId: number;
  let modelId: string;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scene = new Scene();
  const camera = createCamera(width, height);
  const renderer = createRenderer(canvas);
  const world = createWorld();
  const controls = new OrbitControls(camera, renderer.domElement);

  scene.add(world);
  scene.add(camera);
  scene.add(new AxesHelper(500));
  addReferenceBox(world, 100);
  addSkyDome(world);
  setUpLighting(scene, renderer.capabilities.maxTextureSize);

  useStore3D.subscribe(
    ({ width, height }) => {
      canvas.width = width;
      canvas.height = height;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    (state: Store3D) => {
      return { width: state.width, height: state.height };
    }
  );
  useStore3D.setState({ width: window.innerWidth, height: window.innerHeight, canvas });

  useStore3D.subscribe(
    ({ model, mirror, gen1 }) => {
      if (model === null) {
        return;
      } else if (model.uuid === modelId) {
        mirrorModel(model, mirror);
      } else {
        modelId = model.uuid;
        world.remove(world.children[2]);
        addModel(model, world, mirror, gen1);
      }
    },
    (state: Store3D) => ({ model: state.model, mirror: state.mirror, gen1: state.gen1 })
  );

  const render = () => {
    renderer.render(scene, camera);
    raqId = requestAnimationFrame(render);
  };
  render();
};
