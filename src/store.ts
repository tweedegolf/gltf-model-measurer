import create from "zustand";
import { Object3D } from "three";

export type Store3D = {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  model: Object3D;
  mirror: boolean;
  gen1: boolean;
  configUrl: string;
  modelData: RowData[];
  modelIndex: number;
  loadModels: (url: string) => void;
};

export type ModelData = {
  id: string;
  title: string;
  model: string;
  dimensions: {
    width: number;
    height: number;
    height3d: number;
  };
  rotation: [number, number, number];
  translation: [number, number, number];
  scale: number;
};

export type RowData = {
  id: string;
  title: string;
  params: {
    width: number;
    height: number;
    height3d: number;
    start?: number;
  };
  params_3d: {
    "3d-params": {
      model: string;
      scale: number;
      width: number;
      translation: [number, number, number];
      rotation: [number, number, number];
    };
  };
};

export const useStore3D = create<Store3D>(
  (set): Store3D => ({
    width: 10,
    height: 10,
    model: null,
    canvas: null,
    mirror: false,
    gen1: false,
    configUrl: "./model_dimensions.json",
    modelData: null,
    modelIndex: -1,
    loadModels: async url => {
      const data = await fetch(url).then(response => response.json());
      set({ modelData: data, modelIndex: 0 });
    },
  })
);
