// components/VideoPlayer.js
import React from "react";

const VideoPlayer = ({ src }) => {
  return (
    <div className="mt-4">
      <video controls width="600">
        <source src={src} type="video/mp4" />
        抱歉，您的浏览器不支持嵌入视频。
      </video>
    </div>
  );
};

export default VideoPlayer;
