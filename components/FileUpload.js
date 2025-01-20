"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import VideoPlayer from "./VideoPlayer";
import { generateUUID } from "@/util";
import useTimeStore from "@/store/useTimeStore"; // Update the import path as needed

const FileUpload = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const { add } = useTimeStore();

  // useEffect(() => {
    // const storedVideo = localStorage.getItem("videoData");
    // if (storedVideo) {
      // const { url, duration, name } = JSON.parse(storedVideo);
      // setVideoSrc(url);
      // setVideoDuration(duration);
      // add({
      //   id: generateUUID(),
      //   startTime: 0,
      //   endTime: duration,
      //   mediaFile: url,
      //   mediaType: "mp4",
      //   fileName: name
      // });
    // }
  // }, [add]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.type === "video/mp4") {
        const url = URL.createObjectURL(file);
        const video = document.createElement("video");
        video.src = url;
        video.onloadedmetadata = () => {
          const duration = video.duration;
          setVideoDuration(duration);
          setVideoSrc(url);

          add({
            id: generateUUID(),
            startTime: 0,
            endTime: duration,
            mediaFile: url,
            mediaType: "mp4",
            fileName: file.name
          });

          // localStorage.setItem("videoData", JSON.stringify({
          //   url,
          //   duration,
          //   name: file.name
          // }));
        };
      } else {
        alert("只支持 MP4 格式的视频文件！");
      }
    });
  }, [add]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center">
      {videoSrc && (
        <>
          <div className="mb-24">
            <VideoPlayer src={videoSrc} />
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
