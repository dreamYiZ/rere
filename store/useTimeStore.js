import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const logChanges = async (timeArray, timeScaleRate) => {
  await fetch('/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ timeArray, timeScaleRate }),
  });
};

const useTimeStore = create(
  persist(
    (set, get) => ({
      timeArray: [],
      timeScaleRate: 3, // Default value

      add: (item) => {
        set((state) => {
          const newTimeArray = [...state.timeArray, { ...item, mainTrack: state.timeArray.length === 0 }];
          logChanges(newTimeArray, state.timeScaleRate);
          return { timeArray: newTimeArray };
        });
      },
      
      remove: (item) => {
        set((state) => {
          const newTimeArray = state.timeArray.filter((i) => i !== item);
          logChanges(newTimeArray, state.timeScaleRate);
          return { timeArray: newTimeArray };
        });
      },
      
      removeAll: () => {
        set(() => {
          logChanges([], get().timeScaleRate);
          return { timeArray: [] };
        });
      },
      
      edit: (index, newItem) => {
        set((state) => {
          const newTimeArray = state.timeArray.map((item, i) => i === index ? newItem : item);
          logChanges(newTimeArray, state.timeScaleRate);
          return { timeArray: newTimeArray };
        });
      },
      
      setTimeScaleRate: (rate) => {
        set((state) => {
          logChanges(state.timeArray, rate);
          return { timeScaleRate: rate };
        });
      },
    }),
    {
      name: 'time-storage', // Name of the item in the storage (must be unique)
      getStorage: () => localStorage, // Specify `localStorage` as the storage
    }
  )
);

export default useTimeStore;
