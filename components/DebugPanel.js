// components/DebugPanel.js

"use client";
import React from 'react';
import useTimeStore from '@/store/useTimeStore';

const DebugPanel = () => {
  const removeAll = useTimeStore(state => state.removeAll);

  const handleClearLocalStorage = () => {
    localStorage.removeItem('time-storage'); // Clear the specific storage item
    removeAll(); // Clear the store state
    console.log('Local storage and state have been cleared');
  };

  return (
    <div className="p-4">
      <button
        className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-700"
        onClick={handleClearLocalStorage}
      >
        Clear Local Storage
      </button>
    </div>
  );
};

export default DebugPanel;
