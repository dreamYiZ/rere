// components/VideoEditor.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const VideoEditor = ({ videoSrc }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!videoSrc) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const video = document.createElement("video");
    video.src = videoSrc;
    video.play();

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
      }, 1600)
    };
  }, [videoSrc]);

  return <div ref={mountRef} />;
};

export default VideoEditor;
