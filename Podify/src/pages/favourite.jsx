import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../home.css";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("a-z");

  // Sorting function for favourites
  const sortFavourites = (favourites) => {
    switch (sortCriteria) {
      case "a-z":
        return favourites.sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return favourites.sort((a, b) => b.title.localeCompare(a.title));
      case "recently-added":
        return favourites.sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        );
      case "furthest-added":
        return favourites.sort(
          (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
        );
      default:
        return favourites;
    }
  };

  // Fetch the favourites from localStorage
  const fetchFavourites = () => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    // Apply sorting to favourites after fetching
    const sortedFavourites = sortFavourites(storedFavourites);
    setFavourites(sortedFavourites);
  };

  // Fetch favourites on page load
  useEffect(() => {
    fetchFavourites();
  }, []);

  // Re-sort favourites whenever sortCriteria changes
  useEffect(() => {
    if (favourites.length > 0) {
      const sortedFavourites = sortFavourites([...favourites]);
      setFavourites(sortedFavourites);
      st;
    }
  }, [sortCriteria]);

  // Handle removing a single episode from favourites
  const handleRemoveFavourite = (episodeId) => {
    const updatedFavourites = favourites.filter(
      (episode) => episode.episodeId !== episodeId
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  // Handle resetting all favourites
  const handleResetFavourites = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all favourites?"
    );
    if (confirmed) {
      localStorage.removeItem("favourites");
      setFavourites([]);
    }
  };

  return (
    <div className="favourites">
      <h1>Your Favourite Episodes</h1>

      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="recently-added">Most Recently Added</option>
          <option value="furthest-added">Furthest Time Added</option>
        </select>
      </div>

      <button onClick={handleResetFavourites} className="reset-favourites">
        Reset All Favourites
      </button>

      <div className="podcast-previews">
        {favourites.length === 0 ? (
          <p>No favourite episodes yet!</p>
        ) : (
          favourites.map((episode) => (
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

                <button
                  className="remove-favourite"
                  onClick={() => handleRemoveFavourite(episode.episodeId)}
                >
                  Remove from Favourites
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
