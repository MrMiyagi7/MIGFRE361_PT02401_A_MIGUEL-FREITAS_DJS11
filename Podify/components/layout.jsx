import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import AudioPlayer from "./audioPlayer";

export default function Layout() {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioTitle, setAudioTitle] = useState("");
  const [season, setSeason] = useState("");

  const handleAudioChange = (audioUrl, title, season) => {
    setCurrentAudio(audioUrl);
    setAudioTitle(title);
    setSeason(season);
  };

  return (
    <div className="site-wrapper">
      <Header />
      <main>
        <Outlet context={{ handleAudioChange }} />
      </main>
      <Footer />
      <AudioPlayer
        currentAudio={currentAudio}
        title={audioTitle}
        season={season}
      />
    </div>
  );
}
