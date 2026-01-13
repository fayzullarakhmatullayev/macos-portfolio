import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";

const useWindowStore = create(
  immer((set, get) => ({
    windows: Object.keys(WINDOW_CONFIG)
      .filter(key =>
        [
          "finder",
          "safari",
          "photos",
          "terminal",
          "contact",
          "resume"
        ].includes(key)
      )
      .map(key => ({
        id: key,
        type: key,
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: null
      })),
    nextZIndex: INITIAL_Z_INDEX + 1,
    cascadeOffset: 0,
    openWindow: (windowType, data = null) =>
      set(state => {
        // For singleton windows (finder, safari, photos, terminal, contact, resume)
        const singletonTypes = [
          "finder",
          "safari",
          "photos",
          "terminal",
          "contact",
          "resume"
        ];

        if (singletonTypes.includes(windowType)) {
          const existing = state.windows.find(w => w.type === windowType);
          if (existing) {
            existing.isOpen = true;
            existing.zIndex = state.nextZIndex++;
            existing.data = data ?? existing.data;
            return;
          }
        }

        const id = `${windowType}-${Date.now()}`;
        const offset = state.cascadeOffset;
        state.windows.push({
          id,
          type: windowType,
          isOpen: true,
          zIndex: state.nextZIndex++,
          data,
          position: {
            x: offset,
            y: offset
          }
        });

        state.cascadeOffset = (state.cascadeOffset + 30) % 300;
      }),
    closeWindow: id =>
      set(state => {
        const index = state.windows.findIndex(
          w => w.id === id || w.type === id
        );
        if (index === -1) return;

        const singletonTypes = [
          "finder",
          "safari",
          "photos",
          "terminal",
          "contact",
          "resume"
        ];
        if (singletonTypes.includes(state.windows[index].type)) {
          state.windows[index].isOpen = false;
          state.windows[index].zIndex = INITIAL_Z_INDEX;
        } else {
          state.windows.splice(index, 1);
        }
      }),
    focusWindow: id =>
      set(state => {
        const win = state.windows.find(w => w.id === id || w.type === id);
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      })
  }))
);

export default useWindowStore;
