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
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = currentAudio;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
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
  };

  return (
    <div className="audio-player">
      <div className="audio-info">
        {currentAudio ? (
          <div>
            <strong>{season}:</strong>
            <strong className="episode-title"> {title}</strong>
          </div>
        ) : (
          <div>No audio playing</div>
        )}
      </div>
      <div className="controls">
        <audio ref={audioRef} preload="auto" key={currentAudio} />
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="progress-bar" onClick={handleProgressClick}>
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
