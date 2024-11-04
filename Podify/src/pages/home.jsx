import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [podcasts, setpodcasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get("https://podcast-api.netlify.app");
        const sortedPodcasts = response.data.sort((a, b) =>
          a.title.locaCompare(b.title)
        );
        setpodcasts(sortedPodcasts);
      } catch (error) {
        setError("Failed to Fetch podcasts");
      }
    };

    fetchPodcasts();
  }, []);

  if (error) return <p>{error}</p>;
}
