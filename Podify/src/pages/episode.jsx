import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EpisodeDetails() {
  const { id, seasonNumber, episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await axios.get(
          `https://podcast-api.netlify.app/id/${id}`
        );
        const showDetails = response.data;
        const selectedSeason = showDetails.seasons.find(
          (season) => season.season === parseInt(seasonNumber)
        );
        const selectedEpisode = selectedSeason.episodes.find(
          (ep) => ep.episode === parseInt(episodeId)
        );

        setEpisode(selectedEpisode);
