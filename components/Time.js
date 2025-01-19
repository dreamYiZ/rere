"use client"

import { useState, useRef } from 'react';

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

const TimeLineCenter = ({ onMouseDown, left, width }) => (
  <div
    className="h-10 bg-green-500 cursor-move absolute rounded-l"
    style={{ left: left + 16, width: width - 16 }}
    onMouseDown={onMouseDown}
  ></div>
);

const TimeLineRight = ({ onMouseDown, left }) => (
  <div
    className="w-4 h-10 bg-blue-500 cursor-ew-resize absolute rounded-r"
    style={{ left: left }}
    onMouseDown={onMouseDown}
  ></div>
);

export default function Time() {
  const [width, setWidth] = useState(200);
  const [left, setLeft] = useState(0);

  const dragging = useRef(false);

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
        }
      } else if (side === 'right') {
        const newWidth = startWidth + delta;
        if (newWidth >= 0) {
          setWidth(newWidth);
        }
      }
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
      <TimeLineCenter width={width} onMouseDown={handleDrag} left={left} />
      <TimeLineRight onMouseDown={handleMouseDown('right')} left={left + width} />
    </TimeLineOuter>
  );
}
