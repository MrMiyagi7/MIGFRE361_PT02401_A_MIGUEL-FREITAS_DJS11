import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EpisodeDetails() {
  const { id, seasonNumber, episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState(null);
