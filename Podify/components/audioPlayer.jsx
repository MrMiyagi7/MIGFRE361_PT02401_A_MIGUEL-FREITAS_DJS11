import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer({ currentAudio, title, season }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //   Reset audio to the beginning and autoplay when currentAudio changes
  useEffect(() => {
    if (audioRef.current && currentAudio) {
      audioRef.current.pause(); // Stop the previous audio
      audioRef.current.currentTime = 0; // Start from the beginning
      audioRef.current.src = currentAudio; // Set new audio source
      audioRef.current.load(); // Reload to apply changes
      audioRef.current.play(); // Auto-play the new audio
      setIsPlaying(true); // Ensure the play button state is correct
    }
  }, [currentAudio]);

  // Update progress based on audio time update
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      audio.addEventListener("timeupdate", updateProgress);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  const handleProgressClick = (event) => {
    const clickPosition = event.nativeEvent.offsetX;
    const barWidth = event.target.clientWidth;
    const newTime = (clickPosition / barWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
