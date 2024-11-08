import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../home.css";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]); // State to store the favourites
  const [sortCriteria, setSortCriteria] = useState("a-z"); // State for sorting criteria

  // Function to convert date to a readable format

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
    setFavourites(sortedFavourites); // Set the sorted favourites into state
  };

  // Fetch favourites on page load
  useEffect(() => {
    fetchFavourites();
  }, []); // Fetch favourites once when the component mounts

  // Re-sort favourites whenever sortCriteria changes
  useEffect(() => {
    if (favourites.length > 0) {
      const sortedFavourites = sortFavourites([...favourites]); // Sort based on current sortCriteria
      setFavourites(sortedFavourites); // Update the state with the sorted list
    }
  }, [sortCriteria]); // Re-sort favourites when the sorting criteria changes

  // Handle removing a single episode from favourites
  const handleRemoveFavourite = (episodeId) => {
    const updatedFavourites = favourites.filter(
      (episode) => episode.episodeId !== episodeId
    );
    setFavourites(updatedFavourites); // Update the state
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites)); // Update localStorage
  };

  // Handle resetting all favourites
  const handleResetFavourites = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all favourites?"
    );
    if (confirmed) {
      localStorage.removeItem("favourites"); // Remove all favourites from localStorage
      setFavourites([]); // Clear the state
    }
  };

  return (
    <div className="favourites">
      <h1>Your Favourite Episodes</h1>

      {/* Sorting options */}
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

      {/* Reset button */}
      <button onClick={handleResetFavourites} className="reset-favourites">
        Reset All Favourites
      </button>

      {/* Display Favourites */}
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

                {/* Remove favourite button */}
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
