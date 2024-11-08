import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import "../episode.css";

export default function EpisodeDetails() {
  const { id, seasonNumber, episodeId } = useParams();
  const [season, setSeason] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const { handleAudioChange } = useOutletContext();

  // Fetch episode details and check if it's in favourites
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

          // Check if the episode is in favourites
          const savedFavourites =
            JSON.parse(localStorage.getItem("favourites")) || [];
          const episodeInFavourites = savedFavourites.some(
            (fav) => fav.episodeId === selectedEpisode.episode
          );
          setIsFavourite(episodeInFavourites);
        }
      } catch (error) {
        setError("Failed to load episode details.");
      }
    };

    fetchEpisodeDetails();
  }, [id, seasonNumber, episodeId, handleAudioChange]);

  console.log(episode);
  // Handle adding/removing episode from favourites
  const handleFavourite = () => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    let updatedFavourites;

    if (isFavourite) {
      // Remove from favourites
      updatedFavourites = savedFavourites.filter(
        (fav) => fav.episodeId !== episode.episode
      );
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      setIsFavourite(false);
    } else {
      // Add to favourites
      const episodeDetails = {
        episodeId: episode.episode,
        showId: id,
        title: episode.title,
        description: episode.description,
        image: season.image,
        seasonNumber: season.season,
        showTitle: season.title,
        addedAt: new Date().toLocaleString(),
      };
      updatedFavourites = [...savedFavourites, episodeDetails];
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      setIsFavourite(true);
    }
  };

  if (error) return <p>{error}</p>;
  if (!episode || !season) return <div className="loader"></div>;

  return (
    <div className="episode-details">
      <Link className="back-button" to={`/show/${id}`}>
        ← Back
      </Link>

      <img src={season.image} alt={`Season ${season.season} cover`} />

      <h2>{episode.title}</h2>
      <p>{episode.description}</p>

      <button onClick={handleFavourite}>
        {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
      </button>

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
