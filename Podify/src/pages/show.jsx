import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ShowDetails() {
  const { id } = useParams(); // Extract show ID from URL parameters
  const [showDetails, setShowDetails] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSeasons, setExpandedSeasons] = useState({});

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(
          "https://podcast-api.netlify.app/id/${id}"
        );
        setShowDetails(response.data);
      } catch (error) {
        setError("Failed to fetch show details");
      }
    };
    fetchShowDetails();
  }, [id]);

  // Toggle visibility for a season
  const toggleSeason = (seasonNumber) => {
    setExpandedSeasons((prevExpanded) => ({
      ...prevExpanded,
      [seasonNumber]: !prevExpanded[seasonNumber],
    }));
  };

  if (error) return <p>{error}</p>;
  if (!showDetails) return <p>Loading show details...</p>;

  return (
    <div className="show-details">
      <h1>{showDetails.title}</h1>
      <img src={showDetails.image} alt={`${showDetails.title} cover`} />
      <p>{showDetails.description}</p>

      <h2>Seasons</h2>
      {showDetails.seasons && showDetails.seasons.length > 0 ? (
        showDetails.seasons.map((season, index) => (
          <div key={season.season} className="season">
            <h3 onClick={() => toggleSeason(season.season)}>
              Season {season.season}{" "}
              {expandedSeasons[season.season] ? "▲" : "▼"}
            </h3>
            {expandedSeasons[season.season] && (
              <ul>
                {season.episodes.map((episode) => (
                  <li key={episode.id}>
                    <strong>{episode.title}</strong>: {episode.description}
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
