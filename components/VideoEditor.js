import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VideoEditor = ({ videoSrc }) => {
  const mountRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!videoSrc) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const video = document.createElement("video");
    video.src = videoSrc;
    // video.play();
    video.volume = volume;
    videoRef.current = video;

    const texture = new THREE.VideoTexture(video);
    const geometry = new THREE.PlaneGeometry(4, 2.25);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      setTimeout(() => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }, 1600);
    };
  }, [videoSrc, volume]);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div>
      <div ref={mountRef} />
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <label>
          Volume:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </label>
      </div>
    </div>
  );
};

export default VideoEditor;
