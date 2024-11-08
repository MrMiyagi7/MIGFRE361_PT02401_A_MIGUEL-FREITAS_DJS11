import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer({ currentAudio, title, season }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
