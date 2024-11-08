import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  if (favourites.length === 0) {
    return <p>No favourites added yet.</p>;
  }
  console.log(favourites);

  return (
    <div className="favourites">
      <h1>Your Favourite Episodes</h1>
      <div className="podcast-previews">
        {favourites.map((episode) => (
          <Link
            to={`/show/${episode.showId}/season/${episode.seasonNumber}/episode/${episode.episodeId}`}
            key={episode.episodeId}
          >
            <div className="podcast-card">
              <div className="podcast-info">
                <img src={episode.image} alt={`${episode.title} cover`} />
                <h3>{episode.title}</h3>
                <p className="podcast-description">{episode.description}</p>
                <p>{episode.showTitle}</p>
                <p>Episode {episode.episodeId}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
