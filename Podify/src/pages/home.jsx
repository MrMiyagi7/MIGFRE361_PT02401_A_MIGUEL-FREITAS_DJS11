import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../home.css";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [genres] = useState([
    { id: 1, title: "Personal Growth" },
    { id: 2, title: "Investigative Journalism" },
    { id: 3, title: "History" },
    { id: 4, title: "Comedy" },
    { id: 5, title: "Entertainment" },
    { id: 6, title: "Business" },
    { id: 7, title: "Fiction" },
    { id: 8, title: "News" },
    { id: 9, title: "Kids and Family" },
  ]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(
          /* used axios hook to handle api fetch instead of using .then blocks (simplyfies api fetch)*/ "https://podcast-api.netlify.app"
        );
        const sortedPodcasts = response.data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setPodcasts(sortedPodcasts);
      } catch (error) {
        setError("Failed to fetch podcasts");
      }
    };

    fetchPodcasts();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="podcast-previews">
      {podcasts.length === 0 ? (
        <p>Loading podcasts...</p>
      ) : (
        podcasts.map((podcast) => (
          <Link to={`/show/${podcast.id}`} key={podcast.id}>
            <div key={podcast.id} className="podcast-card">
              <div className="podcast-info">
                <img src={podcast.image} alt={`${podcast.title} cover`} />
                <h3>{podcast.title}</h3>
                <p className="podcast-description">{podcast.description}</p>
          <div className="loader"></div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
