import { create } from 'zustand';

const useTimeStore = create((set) => ({
  timeArray: [],
  timeScaleRate: 3, // Default value

  add: (item) => set((state) => ({
    timeArray: [...state.timeArray, { ...item, mainTrack: state.timeArray.length === 0 }]
  })),
  
  remove: (item) => set((state) => ({
    timeArray: state.timeArray.filter((i) => i !== item)
  })),
  
  removeAll: () => set({ timeArray: [] }),
  
  edit: (index, newItem) => set((state) => ({
    timeArray: state.timeArray.map((item, i) => i === index ? newItem : item)
  })),
  
  setTimeScaleRate: (rate) => set(() => ({ timeScaleRate: rate })),
}));

export default useTimeStore;
