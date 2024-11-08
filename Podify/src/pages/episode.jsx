import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import "../episode.css";
import ShowDetails from "./show";

export default function EpisodeDetails() {
  const { id, seasonNumber, episodeId } = useParams();
  const [season, setSeason] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState(null);
  const { handleAudioChange } = useOutletContext();

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      try {
        const response = await axios.get(
          `https://podcast-api.netlify.app/id/${id}`
        );
        const showDetails = response.data;

        // Find the selected season and episode
        const selectedSeason = showDetails.seasons.find(
          (season) => season.season === parseInt(seasonNumber)
        );

        if (selectedSeason) {
          const selectedEpisode = selectedSeason.episodes.find(
            (ep) => ep.episode === parseInt(episodeId)
          );

          setSeason(selectedSeason);
          setEpisode(selectedEpisode);
          handleAudioChange(
            selectedEpisode.file,
            selectedEpisode.title,
            showDetails.title
          );
          console.log(season);
        }
      } catch (error) {
        setError("Failed to load episode details.");
      }
    };

    fetchEpisodeDetails();
  }, [id, seasonNumber, episodeId]);

  if (error) return <p>{error}</p>;
  if (!episode || !season) return <div className="loader"></div>;

  return (
    <div className="episode-details">
      <Link className="back-button" to={`/show/${id}`}>
        ← Back
      </Link>

      {/* Display the season-specific cover image */}
      <img src={season.image} alt={`Season ${season.season} cover`} />

      <h2>{episode.title}</h2>
      <p>{episode.description}</p>

      <h3>All Other Episodes in Season {season.season}</h3>
      <ul>
        {season.episodes
          .filter((ep) => ep.episode !== parseInt(episodeId)) // Exclude the current episode
          .map((ep) => (
            <li key={ep.episode}>
              <Link
                to={`/show/${id}/season/${season.season}/episode/${ep.episode}`}
              >
                Ep.{ep.episode} {ep.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
