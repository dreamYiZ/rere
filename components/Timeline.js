"use client";
import React from "react";
import Time from "./Time";
import useTimeStore from "@/store/useTimeStore"; // Update the import path as needed

const Timeline = () => {
  const { timeArray } = useTimeStore();

  return (
    <div className="w-full flex items-center min-h-[300px] p-8 m-8">
      <div className="border border-blue-500 w-full min-h-[300px]">
        {timeArray.map((item) => (
          <Time
            key={item.id}
            startTime={item.startTime}
            endTime={item.endTime}
            mediaType={item.mediaType}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
