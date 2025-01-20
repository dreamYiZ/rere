"use client";
import React from "react";
import Time from "./Time";
import useTimeStore from "@/store/useTimeStore"; // Update the import path as needed

const Timeline = () => {
  const { timeArray, timeScaleRate } = useTimeStore();

  // Generate a time scale based on the longest track duration
  const maxTime = timeArray.reduce((max, item) => Math.max(max, item.endTime), 0) + 100;
  const timeScale = [];
  for (let i = 0; i <= maxTime; i += timeScaleRate) {
    timeScale.push(i);
  }

  // Function to format seconds as hh:mm:ss
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="w-full flex flex-col items-center min-h-[300px] p-8 m-8">
      <div className="w-full overflow-x-scroll">
        <div className="relative">
          {/* Time Scale */}
          <div className="flex border-b border-gray-300 relative">
            {timeScale.map((time, index) => (
              <div
                key={time}
                className="flex-grow text-center"
                style={{ width: '40px' ,position: 'relative' }}
              >
                {index % 10 === 0 ? (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: "12px"
                      }}
                    >
                      {formatTime(time)}
                    </div>
                    <div
                      style={{
                        height: '15px',
                        width: '2px',
                        backgroundColor: 'black',
                        margin: '0 auto',
                      }}
                    />
                  </>
                ) : (
                  <div
                    style={{
                      height: '10px',
                      width: '1px',
                      backgroundColor: 'gray',
                      margin: '0 auto',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Track Container */}
          <div className="border border-blue-500 min-h-[300px] relative">
            {timeArray.map((item, index) => (
              <div
                key={item.id}
                className="absolute"
                style={{
                  top: `${index * 40}px`,  // Adjust vertical spacing based on index
                  left: `${(item.startTime / maxTime) * 100}%`,
                  width: `${((item.endTime - item.startTime) / maxTime) * 100}%`,
                  height: "40px",
                }}
              >
                <Time
                  timeItem={item}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  mediaFile={item.mediaFile} // Pass file address to Time component
                  mediaType={item.mediaType}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
