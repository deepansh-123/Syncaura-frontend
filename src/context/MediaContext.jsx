import React, { createContext, useContext, useState } from 'react';
import {
  getCameraAndMic,
  toggleAudioTrack,
  toggleVideoTrack,
  stopAllTracks,
  getScreenStream
} from '../services/mediaService';

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [localStream, setLocalStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // 🎥 Start Camera + Mic
  const startMedia = async () => {
    const stream = await getCameraAndMic();
    setLocalStream(stream);
  };

  // 🎤 Toggle Mic
  const toggleMic = () => {
    toggleAudioTrack(localStream, !isMicOn);
    setIsMicOn(!isMicOn);
  };

  // 📷 Toggle Camera
  const toggleCamera = () => {
    toggleVideoTrack(localStream, !isCameraOn);
    setIsCameraOn(!isCameraOn);
  };

  // 🖥 Screen Share
  const startScreenShare = async () => {
    const stream = await getScreenStream();
    setScreenStream(stream);
    setIsScreenSharing(true);

    stream.getVideoTracks()[0].onended = () => {
      stopScreenShare();
    };
  };

  const stopScreenShare = () => {
    stopAllTracks(screenStream);
    setScreenStream(null);
    setIsScreenSharing(false);
  };

  return (
    <MediaContext.Provider
      value={{
        localStream,
        screenStream,
        isMicOn,
        isCameraOn,
        isScreenSharing,
        startMedia,
        toggleMic,
        toggleCamera,
        startScreenShare,
        stopScreenShare,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
