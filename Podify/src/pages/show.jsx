import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../show.css";

export default function ShowDetails() {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSeasons, setExpandedSeasons] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(
          `https://podcast-api.netlify.app/id/${id}`
        );
        setShowDetails(response.data);

        // Check if this show is already a favourite
        const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
        setIsFavourite(favourites.some((show) => show.id === id));
      } catch (error) {
        setError("Failed to fetch show details");
      }
    };
    fetchShowDetails();
  }, [id]);

  //   Toggle visibility for a season
  const toggleSeason = (seasonNumber) => {
    setExpandedSeasons((prevExpanded) => ({
      ...prevExpanded,
      [seasonNumber]: !prevExpanded[seasonNumber],
    }));
  };
  const handleFavourite = () => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    if (isFavourite) {
      // Remove from favourites if already favourited
      const updatedFavourites = favourites.filter((show) => show.id !== id);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      setIsFavourite(false);
    } else {
      // Add to favourites
      localStorage.setItem(
        "favourites",
        JSON.stringify([...favourites, showDetails])
      );
      setIsFavourite(true);
    }
  };

  console.log(showDetails);

  if (error) return <p>{error}</p>;
  if (!showDetails) return <div className="loader"></div>;

  return (
    <div className="show-details">
      <Link className="back-button" to="/">
        ← Back
      </Link>
      <h1>{showDetails.title}</h1>
      <img src={showDetails.image} alt={`${showDetails.title} cover`} />
      <p>{showDetails.description}</p>
      <button onClick={handleFavourite}>
        {isFavourite ? "Unfavourite" : "Add to Favourites"}
      </button>
      <h2>Seasons {showDetails.seasons.length}</h2>
      {showDetails.seasons && showDetails.seasons.length > 0 ? (
        showDetails.seasons.map((season) => (
          <div key={season.season} className="season">
            <h3 onClick={() => toggleSeason(season.season)}>
              Season {season.season}{" "}
              {expandedSeasons[season.season] ? "▲" : "▼"}
            </h3>
            {expandedSeasons[season.season] && (
              <ul>
                {season.episodes.map((episode) => (
                  <li key={episode.episode}>
                    <Link
                      to={`/show/${id}/season/${season.season}/episode/${episode.episode}`}
                    >
                      <strong>{episode.title}</strong>: {episode.description}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>No seasons available for this show.</p>
      )}
    </div>
  );
}
