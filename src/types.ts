import { Object3D } from "three";

export type Store3D = {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  model: Object3D;
  mirror: boolean;
  gen1: boolean;
  // configUrl: string;
  modelData: Row2[];
  modelIndex: number;
  loadModels: (url: string) => void;
};

// export type ModelData = {
//   id: string;
//   title: string;
//   model: string;
//   dimensions: {
//     width: number;
//     height: number;
//     height3d: number;
//   };
//   rotation: [number, number, number];
//   translation: [number, number, number];
//   scale: number;
// };

export type ModelData = {
  id: number;
  params: {
    type3d: string;
    model: string;
    scale: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    translation: { x: number; y: number; z: number };
    dimensions: { x: number; y: number; z: number };
    layer?: number;
    interval?: number;
  };
};

export type RowData = {
  id: number;
  title: string;
  params: {
    width: number;
    height: number;
    height3d: number;
    start?: number;
  };
  params_3d: {
    "3d-type": string;
    "3d-params": {
      model: string;
      scale: number;
      width: number;
      translation: [number, number, number];
      rotation: [number, number, number];
    };
  };
};

export type Row = {
  id: number;
  title: string;
  params: {
    width?: number;
    height?: number | string;
    height3d?: number;
    interval?: string;
    overlap?: number;
    start?: number;
    "3d-type"?: string;
    "3d-params"?: object;
    fill?: any;
  };
  params_3d: {
    slug?: string;
    title?: string;
    "3d-type"?: string;
    "3d-params": {
      model: string;
      scale?: number;
      translation?: number[];
      rotation?: number[];
      width?: number;
      height?: number | string;
      layer?: number;
      texture?: string;
      textureScale?: number;
      start?: number;
    };
  };
};

export type Row2 = {
  id: number;
  params: {
    type3d: string;
    model: string;
    scale: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    translation: { x: number; y: number; z: number };
    dimensions: { x: number; y: number; z: number };
    layer?: number;
    interval?: number;
  };
};
