import create from "zustand";
import { Store3D } from "./types";

export const useStore3D = create<Store3D>(
  (set): Store3D => ({
    width: 10,
    height: 10,
    model: null,
    canvas: null,
    mirror: false,
    gen1: false,
    // configUrl: "./model_dimensions.json",
    modelData: null,
    modelIndex: -1,
    loadModels: async url => {
      const data = await fetch(url).then(response => response.json());
      set({ modelData: data, modelIndex: 0 });
    },
  })
);
