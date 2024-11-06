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

  return (
    <div className="favourites">
      <h1>Your Favourite Shows</h1>
      <div className="podcast-previews">
        {favourites.map((show) => (
          <Link to={`/show/${show.id}`} key={show.id}>
            <div className="podcast-card">
              <div className="podcast-info">
                <img src={show.image} alt={`${show.title} cover`} />
                <h3>{show.title}</h3>
                <p className="podcast-description">{show.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
