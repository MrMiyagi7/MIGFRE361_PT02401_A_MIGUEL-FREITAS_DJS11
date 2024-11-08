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
  const handleRemoveFavourite = (episodeId) => {
    const updatedFavourites = favourites.filter(
      (episode) => episode.episodeId !== episodeId
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites)); // Update localStorage
  };

  return (
    <div className="favourites">
      <h1>Your Favourite Episodes</h1>
      <div className="podcast-previews">
        {favourites.map((episode) => (
          <div className="podcast-card" key={episode.episodeId}>
            <div className="podcast-info-favourite">
              <Link
                to={`/show/${episode.showId}/season/${episode.seasonNumber}/episode/${episode.episodeId}`}
              >
                <img src={episode.image} alt={`${episode.title} cover`} />
                <h3>{episode.title}</h3>
                <h3>{episode.showTitle}</h3>
                <h4>Episode {episode.episodeId}</h4>
                <h4>
                  Added on: <strong>{episode.addedAt}</strong>
                </h4>
              </Link>
              {/* Remove button outside the Link component */}
              <button
                className="remove-favourite"
                onClick={() => handleRemoveFavourite(episode.episodeId)}
              >
                Remove from Favourites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
