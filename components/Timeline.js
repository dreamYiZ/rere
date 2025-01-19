"use client";
import Time from "./Time";
import { useState, useEffect } from "react";
import { generateUUID } from "@/util";

const Timeline = ({ videoDuration, videoSrc }) => {
  const [timeArray, setTimeArray] = useState([]);

  useEffect(() => {
    if (videoDuration > 0) {
      const newTimeArray = [
        {
          id: generateUUID(),
          startTime: 0,
          endTime: videoDuration,
          mediaFile: videoSrc,
          mediaType: "mp4",
        },
      ];
      setTimeArray(newTimeArray);
    }
  }, [videoDuration, videoSrc]);

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
