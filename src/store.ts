import create from "zustand";
import { Object3D } from "three";

export type Store3D = {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  model: Object3D;
  mirror: boolean;
  gen1: boolean;
};

export const useStore3D = create<Store3D>(
  (set): Store3D => ({
    width: 10,
    height: 10,
    model: null,
    canvas: null,
    mirror: false,
    gen1: false,
  })
);
