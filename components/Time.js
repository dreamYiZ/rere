"use client";
import { useState, useRef, useEffect } from 'react';
import useTimeStore from "@/store/useTimeStore"; // Update the import path as needed

const TimeLineOuter = ({ children }) => (
  <div className="w-full p-8 m-8 relative">{children}</div>
);

const TimeLineInner = ({ width, left }) => (
  <div
    className="bg-gray-200 h-10 absolute"
    style={{ width: width, left: left }}
  ></div>
);

const TimeLineLeft = ({ onMouseDown, left }) => (
  <div
    className="w-4 h-10 bg-blue-500 cursor-ew-resize absolute rounded-l"
    style={{ left: left }}
    onMouseDown={onMouseDown}
  ></div>
);

const TimeLineCenter = ({ onMouseDown, left, width, fileName, duration }) => (
  <div
    className="h-10 bg-green-500 cursor-move absolute rounded-l"
    style={{ left: left + 16, width: width - 16 }}
    onMouseDown={onMouseDown}
  >
    <div className="absolute inset-0 flex items-center justify-center text-black">
      {fileName} - {duration}

      现在秒可能是小数，不需要是小数
    </div>
  </div>
);

const TimeLineRight = ({ onMouseDown, left }) => (
  <div
    className="w-4 h-10 bg-blue-500 cursor-ew-resize absolute rounded-r"
    style={{ left: left }}
    onMouseDown={onMouseDown}
  ></div>
);

const Time = ({ mediaFile, timeItem }) => {
  const { timeScaleRate } = useTimeStore();
  const { id, fileName: fName } = timeItem;
  const [clipDuration, setClipDuration] = useState(0);
  const [clipStart, setClipStart] = useState(0);
  const [clipEnd, setClipEnd] = useState(0);
  const [width, setWidth] = useState(200);
  const [left, setLeft] = useState(0);
  const [fileName, setFileName] = useState('');
  const videoRef = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    if (mediaFile) {
      const video = document.createElement('video');
      video.src = mediaFile;
      video.onloadedmetadata = () => {
        setClipDuration(video.duration);
        setClipEnd(video.duration);

        // Adjust the width based on the timeScaleRate
        const scaleRate = timeScaleRate; 
        setWidth((video.duration / scaleRate)); // Adjust width
        setFileName(fName); // Extract file name from URL
      };
      videoRef.current = video;
    }
  }, [mediaFile, timeScaleRate]);

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    
    return `${h}:${m}:${s}`;
  };

  const handleMouseDown = (side) => (event) => {
    const startX = event.clientX;
    const startWidth = width;
    const startLeft = left;

    dragging.current = true;

    const onMouseMove = (moveEvent) => {
      if (!dragging.current) return;

      const delta = moveEvent.clientX - startX;
      if (side === 'left') {
        const newWidth = startWidth - delta;
        const newLeft = startLeft + delta;
        if (newWidth >= 0) {
          setWidth(newWidth);
          setLeft(newLeft);
          setClipStart(clipStart + delta / 10); // Adjust start time based on delta
        }
      } else if (side === 'right') {
        const newWidth = startWidth + delta;
        if (newWidth >= 0) {
          setWidth(newWidth);
          setClipEnd(clipEnd + delta / 10); // Adjust end time based on delta
        }
      }
      setClipDuration(clipEnd - clipStart); // Update clip duration
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleDrag = (event) => {
    const startX = event.clientX;
    const startLeft = left;

    dragging.current = true;

    const onMouseMove = (moveEvent) => {
      if (!dragging.current) return;

      const delta = moveEvent.clientX - startX;
      setLeft(startLeft + delta);
      setClipStart(clipStart + delta / 10); // Adjust start time based on delta
      setClipEnd(clipEnd + delta / 10); // Adjust end time based on delta
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <TimeLineOuter>
      <TimeLineInner width={width} left={left} />
      <TimeLineLeft onMouseDown={handleMouseDown('left')} left={left} />
      <TimeLineCenter
        width={width}
        onMouseDown={handleDrag}
        left={left}
        fileName={fileName}
        duration={formatDuration(clipDuration)}
      />
      <TimeLineRight onMouseDown={handleMouseDown('right')} left={left + width} />
    </TimeLineOuter>
  );
};

export default Time;
