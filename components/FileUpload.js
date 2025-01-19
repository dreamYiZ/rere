"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import VideoEditor from "./VideoEditor";
import VideoPlayer from "./VideoPlayer";
import Timeline from "./Timeline";

const FileUpload = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.type === "video/mp4") {
        const url = URL.createObjectURL(file);
        const video = document.createElement("video");
        video.src = url;
        video.onloadedmetadata = () => {
          setVideoDuration(video.duration);
          setVideoSrc(url);
        };
      } else {
        alert("只支持 MP4 格式的视频文件！");
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center">
      {videoSrc && (
        <>
          <div className="mb-24">
            <VideoEditor videoSrc={videoSrc} />
          </div>
          <div className="mb-24">
            <VideoPlayer src={videoSrc} />
          </div>
          <div className="mb-24">
            <Timeline videoDuration={videoDuration} videoSrc={videoSrc} />
          </div>
        </>
      )}

      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #1976d2",
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} accept="video/mp4" />
        <Typography variant="h6">
          拖动视频文件到此处，或点击选择文件（仅支持MP4格式）
        </Typography>
      </Box>
    </div>
  );
};

export default FileUpload;
