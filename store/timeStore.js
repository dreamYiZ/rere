import { create } from 'zustand';

const useTimeStore = create((set) => ({
  timeArray: [],
  
  add: (item) => set((state) => ({ timeArray: [...state.timeArray, item] })),
  
  remove: (item) => set((state) => ({ 
    timeArray: state.timeArray.filter((i) => i !== item)
  })),
  
  removeAll: () => set({ timeArray: [] }),
  
  edit: (index, newItem) => set((state) => ({
    timeArray: state.timeArray.map((item, i) => i === index ? newItem : item)
  })),
}));

export default useTimeStore;
